/* Anchor payment Worker (Cloudflare Workers).

   POST /verify   { reference }   Authorization: Bearer <Firebase ID token>

   1. Confirms who is calling (Firebase ID token -> user id).
   2. Asks Paystack whether that reference really succeeded, in naira, for at
      least the price, and was started by this same user (metadata.uid).
   3. Records the reference in payments/{reference} (so it can only ever be
      used once) and extends entitlements/{uid} by ACCESS_DAYS, in one
      Firestore commit.
   4. Adds one subscription to the partner code that referred the user.

   Responses: { ok: true, expiresAt } or { ok: false, error, final }.
   final: true means retrying will never help, so the app stops retrying.

   Secrets (wrangler secret put ...): PAYSTACK_SECRET_KEY, GCP_SERVICE_ACCOUNT
   Vars (wrangler.toml): FIREBASE_PROJECT_ID, FIREBASE_API_KEY,
                         ALLOWED_ORIGINS, PRICE_KOBO, ACCESS_DAYS            */

const DAY_MS = 86400000;

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request, env);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    const url = new URL(request.url);
    if (url.pathname !== '/verify' || request.method !== 'POST') {
      return json({ ok: false, error: 'Not found', final: true }, 404, cors);
    }
    try {
      return await verify(request, env, cors);
    } catch (err) {
      console.error('verify failed', err && err.stack || err);
      return json({ ok: false, error: 'Payment server error. Anchor will retry.', final: false }, 500, cors);
    }
  }
};

async function verify(request, env, cors) {
  // 1. Who is calling?
  const idToken = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  const uid = idToken ? await firebaseUidFromToken(idToken, env) : null;
  if (!uid) return json({ ok: false, error: 'Not signed in.', final: false }, 401, cors);

  let body;
  try { body = await request.json(); } catch { body = {}; }
  const reference = typeof body.reference === 'string' ? body.reference : '';
  if (!/^[A-Za-z0-9_.=-]{1,100}$/.test(reference)) {
    return json({ ok: false, error: 'Invalid payment reference.', final: true }, 400, cors);
  }

  // 2. Did Paystack really take the money?
  const ps = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}` }
  });
  const psBody = await ps.json().catch(() => ({}));
  if (!ps.ok || !psBody.status || !psBody.data) {
    // Paystack answers 400/404 for references it has never seen.
    const final = ps.status === 400 || ps.status === 404;
    return json({ ok: false, error: final ? 'Paystack has no record of this payment.' : 'Paystack is unavailable.', final }, final ? 402 : 502, cors);
  }
  const tx = psBody.data;
  if (tx.status !== 'success') {
    const final = ['failed', 'abandoned', 'reversed'].includes(tx.status);
    return json({ ok: false, error: `Payment is ${tx.status}.`, final }, 402, cors);
  }
  const price = Number(env.PRICE_KOBO || 200000);
  if (tx.currency !== 'NGN' || Number(tx.amount) < price) {
    return json({ ok: false, error: 'Payment amount or currency does not match the price.', final: true }, 402, cors);
  }
  let meta = tx.metadata || {};
  if (typeof meta === 'string') { try { meta = JSON.parse(meta); } catch { meta = {}; } }
  if (meta.uid !== uid) {
    return json({ ok: false, error: 'This payment belongs to a different account.', final: true }, 403, cors);
  }
  const referrer = /^[a-z0-9_-]{1,64}$/.test(String(meta.referrer || '').toLowerCase())
    ? String(meta.referrer).toLowerCase()
    : 'direct';

  // 3. Record the payment once and extend access, atomically.
  const fs = await firestore(env);
  const current = await fs.get(`entitlements/${uid}`);
  const currentExp = current ? Date.parse(current.fields?.expiresAt?.timestampValue || '') || 0 : 0;
  const expiresAt = new Date(Math.max(Date.now(), currentExp) + Number(env.ACCESS_DAYS || 30) * DAY_MS);

  const commit = await fs.commit([
    {
      update: {
        name: fs.name(`payments/${reference}`),
        fields: {
          uid: { stringValue: uid },
          amount: { integerValue: String(tx.amount) },
          currency: { stringValue: tx.currency },
          referrer: { stringValue: referrer },
          paidAt: { stringValue: String(tx.paid_at || '') }
        }
      },
      currentDocument: { exists: false },          // each reference counts once
      updateTransforms: [{ fieldPath: 'recordedAt', setToServerValue: 'REQUEST_TIME' }]
    },
    {
      update: {
        name: fs.name(`entitlements/${uid}`),
        fields: {
          active: { booleanValue: true },
          source: { stringValue: 'paystack' },
          reference: { stringValue: reference },
          referrer: { stringValue: referrer },
          expiresAt: { timestampValue: expiresAt.toISOString() }
        }
      },
      updateTransforms: [{ fieldPath: 'grantedAt', setToServerValue: 'REQUEST_TIME' }]
    }
  ]);

  if (!commit.ok) {
    if (commit.status === 409 || /ALREADY_EXISTS|FAILED_PRECONDITION/.test(commit.text)) {
      // Reference already recorded. Same user -> it was applied earlier (e.g.
      // the app retried after a dropped connection); report success.
      const prior = await fs.get(`payments/${reference}`);
      if (prior && prior.fields?.uid?.stringValue === uid) {
        const ent = await fs.get(`entitlements/${uid}`);
        return json({ ok: true, expiresAt: ent?.fields?.expiresAt?.timestampValue || null, alreadyApplied: true }, 200, cors);
      }
      if (prior) return json({ ok: false, error: 'This payment was already used.', final: true }, 409, cors);
    }
    throw new Error(`Firestore commit ${commit.status}: ${commit.text}`);
  }

  // 4. Credit the partner (best effort; a deleted code simply doesn't exist).
  await fs.commit([{
    transform: {
      document: fs.name(`referrals/${referrer}`),
      fieldTransforms: [
        { fieldPath: 'subs', increment: { integerValue: '1' } },
        { fieldPath: 'lastUpdated', setToServerValue: 'REQUEST_TIME' }
      ]
    },
    currentDocument: { exists: true }
  }]).catch(() => {});

  return json({ ok: true, expiresAt: expiresAt.toISOString() }, 200, cors);
}

/* ── Firebase Auth: verify the caller's ID token ──────────────────────
   accounts:lookup only succeeds for a valid, unexpired, unrevoked token of
   this project, so no JWT library is needed. */
async function firebaseUidFromToken(idToken, env) {
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(env.FIREBASE_API_KEY)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken })
  });
  if (!res.ok) return null;
  const data = await res.json().catch(() => ({}));
  return data.users && data.users[0] && data.users[0].localId || null;
}

/* ── Firestore REST with a service account ──────────────────────────── */
let cachedToken = null;

async function googleAccessToken(env) {
  if (cachedToken && cachedToken.exp > Date.now() + 60000) return cachedToken.token;
  const sa = JSON.parse(env.GCP_SERVICE_ACCOUNT);
  const now = Math.floor(Date.now() / 1000);
  const enc = (obj) => b64url(new TextEncoder().encode(JSON.stringify(obj)));
  const unsigned = `${enc({ alg: 'RS256', typ: 'JWT' })}.${enc({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/datastore',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600
  })}`;
  const key = await crypto.subtle.importKey('pkcs8', pemToDer(sa.private_key),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(unsigned));
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${b64url(new Uint8Array(sig))}`
    })
  });
  const data = await res.json();
  if (!res.ok || !data.access_token) throw new Error(`Google token error ${res.status}`);
  cachedToken = { token: data.access_token, exp: Date.now() + (data.expires_in || 3600) * 1000 };
  return cachedToken.token;
}

async function firestore(env) {
  const token = await googleAccessToken(env);
  const root = `projects/${env.FIREBASE_PROJECT_ID}/databases/(default)/documents`;
  const base = `https://firestore.googleapis.com/v1/${root}`;
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  return {
    name: (path) => `${root}/${path}`,
    async get(path) {
      const res = await fetch(`${base}/${path}`, { headers });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Firestore get ${res.status}`);
      return res.json();
    },
    async commit(writes) {
      const res = await fetch(`${base}:commit`, { method: 'POST', headers, body: JSON.stringify({ writes }) });
      return { ok: res.ok, status: res.status, text: res.ok ? '' : await res.text() };
    }
  };
}

/* ── helpers ───────────────────────────────────────────────────────── */
function b64url(bytes) {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function pemToDer(pem) {
  const b64 = pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
  return {
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : (allowed[0] || 'null'),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin'
  };
}

function json(obj, status, headers) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json' }
  });
}

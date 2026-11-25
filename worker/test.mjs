// Exercises src/index.js against fake Paystack / Google / Firestore.
// Run from the repo root:  node worker/test.mjs   (Node 20+, no installs)
import { generateKeyPairSync } from 'node:crypto';
import assert from 'node:assert/strict';

const { default: worker } = await import('./src/index.js');

const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
const env = {
  PAYSTACK_SECRET_KEY: 'sk_test_x',
  GCP_SERVICE_ACCOUNT: JSON.stringify({ client_email: 'sa@test', private_key: privateKey.export({ type: 'pkcs8', format: 'pem' }) }),
  FIREBASE_PROJECT_ID: 'proj', FIREBASE_API_KEY: 'k',
  ALLOWED_ORIGINS: 'https://app.test', PRICE_KOBO: '200000', ACCESS_DAYS: '30'
};

// ── fake backends ──
let docs = {};           // path -> fields
let tx = {};             // reference -> paystack data
const commits = [];
globalThis.fetch = async (url, opts = {}) => {
  url = String(url);
  const J = (o, s = 200) => new Response(JSON.stringify(o), { status: s });
  if (url.includes('accounts:lookup')) {
    const { idToken } = JSON.parse(opts.body);
    return idToken.startsWith('tok-') ? J({ users: [{ localId: idToken.slice(4) }] }) : J({ error: {} }, 400);
  }
  if (url.includes('api.paystack.co')) {
    const ref = decodeURIComponent(url.split('/').pop());
    return tx[ref] ? J({ status: true, data: tx[ref] }) : J({ status: false, message: 'Transaction reference not found' }, 400);
  }
  if (url.includes('oauth2.googleapis.com')) {
    const assertion = new URLSearchParams(opts.body).get('assertion');
    assert.equal(assertion.split('.').length, 3, 'JWT has 3 parts');
    return J({ access_token: 'at', expires_in: 3600 });
  }
  if (url.includes('firestore.googleapis.com')) {
    const root = '/v1/projects/proj/databases/(default)/documents';
    if (url.endsWith(':commit')) {
      const { writes } = JSON.parse(opts.body);
      commits.push(writes);
      // check preconditions first (atomic)
      for (const w of writes) {
        const name = (w.update?.name || w.transform?.document).split('/documents/')[1];
        if (w.currentDocument?.exists === false && docs[name]) return J({ error: { status: 'ALREADY_EXISTS' } }, 409);
        if (w.currentDocument?.exists === true && !docs[name]) return J({ error: { status: 'NOT_FOUND' } }, 404);
      }
      for (const w of writes) {
        if (w.update) docs[w.update.name.split('/documents/')[1]] = w.update.fields;
        if (w.transform) {
          const d = docs[w.transform.document.split('/documents/')[1]];
          for (const t of w.transform.fieldTransforms) if (t.increment) d[t.fieldPath] = { integerValue: String(Number(d[t.fieldPath]?.integerValue || 0) + 1) };
        }
      }
      return J({});
    }
    const path = url.split(root + '/')[1];
    return docs[path] ? J({ fields: docs[path] }) : J({ error: {} }, 404);
  }
  throw new Error('unexpected fetch ' + url);
};

const call = (body, token = 'tok-alice', origin = 'https://app.test') => worker.fetch(new Request('https://w/verify', {
  method: 'POST', headers: { Authorization: 'Bearer ' + token, Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body)
}), env).then(async (r) => ({ status: r.status, body: await r.json(), cors: r.headers.get('Access-Control-Allow-Origin') }));

const good = (uid, extra = {}) => ({ status: 'success', currency: 'NGN', amount: 200000, metadata: { uid, referrer: 'brohq' }, paid_at: 'now', ...extra });

let r;
docs['referrals/brohq'] = { subs: { integerValue: '0' } };

// 1. not signed in
r = await call({ reference: 'A1' }, 'bad'); assert.equal(r.status, 401); assert.equal(r.body.final, false);
// 2. unknown reference
r = await call({ reference: 'NOPE' }); assert.equal(r.body.ok, false); assert.equal(r.body.final, true);
// 3. success
tx.A1 = good('alice');
r = await call({ reference: 'A1' }); assert.equal(r.body.ok, true, JSON.stringify(r.body));
assert.equal(r.cors, 'https://app.test');
const exp1 = Date.parse(docs['entitlements/alice'].expiresAt.timestampValue);
assert.ok(Math.abs(exp1 - (Date.now() + 30 * 864e5)) < 5000, '30 days from now');
assert.equal(docs['referrals/brohq'].subs.integerValue, '1', 'partner credited');
// 4. same reference again by same user -> idempotent ok, no double credit
r = await call({ reference: 'A1' }); assert.equal(r.body.ok, true); assert.equal(r.body.alreadyApplied, true);
assert.equal(docs['referrals/brohq'].subs.integerValue, '1', 'no double credit');
assert.equal(Date.parse(docs['entitlements/alice'].expiresAt.timestampValue), exp1, 'no double extension');
// 5. someone else tries alice's reference
r = await call({ reference: 'A1' }, 'tok-mallory'); assert.equal(r.status, 403); assert.equal(r.body.final, true);
// 6. renewal stacks on remaining time
tx.A2 = good('alice');
r = await call({ reference: 'A2' }); assert.equal(r.body.ok, true);
const exp2 = Date.parse(docs['entitlements/alice'].expiresAt.timestampValue);
assert.ok(Math.abs(exp2 - (exp1 + 30 * 864e5)) < 5000, 'stacks to 60 days');
// 7. underpaid (old USD bug: 299 kobo)
tx.B1 = good('bob', { amount: 299 });
r = await call({ reference: 'B1' }, 'tok-bob'); assert.equal(r.body.ok, false); assert.equal(r.body.final, true); assert.ok(!docs['entitlements/bob']);
// 8. wrong currency
tx.B2 = good('bob', { currency: 'USD', amount: 999999 });
r = await call({ reference: 'B2' }, 'tok-bob'); assert.equal(r.body.ok, false);
// 9. pending payment is not final, failed payment is final
tx.B3 = good('bob', { status: 'ongoing' });
r = await call({ reference: 'B3' }, 'tok-bob'); assert.equal(r.body.final, false);
tx.B4 = good('bob', { status: 'failed' });
r = await call({ reference: 'B4' }, 'tok-bob'); assert.equal(r.body.final, true);
// 10. referrer that doesn't exist / is deleted -> payment still succeeds
tx.C1 = good('carol', { metadata: { uid: 'carol', referrer: 'ghost' } });
r = await call({ reference: 'C1' }, 'tok-carol'); assert.equal(r.body.ok, true); assert.ok(!docs['referrals/ghost']);
// 11. bad reference format, bad origin, wrong route
r = await call({ reference: '../../x' }); assert.equal(r.status, 400);
r = await call({ reference: 'A1' }, 'tok-alice', 'https://evil.test'); assert.equal(r.cors, 'https://app.test');
const nf = await worker.fetch(new Request('https://w/other', { method: 'GET' }), env); assert.equal(nf.status, 404);
const pre = await worker.fetch(new Request('https://w/verify', { method: 'OPTIONS', headers: { Origin: 'https://app.test' } }), env); assert.equal(pre.status, 204);

console.log('worker: all 11 scenarios passed');

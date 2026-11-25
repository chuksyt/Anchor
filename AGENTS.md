# Anchor — rules for agents

Plain static PWA: `index.html` + `styles.css` + `app.js` (one IIFE), no build step,
no npm in the app. Firebase compat SDK from gstatic. Serve with `serve.cmd`
(localhost:8777). Setup and architecture: `README.md`. Current state and open
work: `PROGRESS.md`. Read both before suggesting changes.

## Public repo

`github.com/chuksyt/Anchor` is public. Code and commit messages carry only
public values: the Firebase web config and the Paystack `pk_` key are public by
design. Secret keys (`sk_…`, service-account JSON) live only in Worker secrets
(`wrangler secret put`). Access control lives in `firestore.rules`, never in a
client-side PIN or password.

## Paid access: three files move together

Access is granted by the server and cached on the device:

- `worker/src/index.js` verifies Paystack payments and writes `entitlements/{uid}`.
- `firestore.rules` lets a client write an entitlement only while redeeming an
  unused `passcodes/{code}` in the same batch.
- `app.js` §14c (`redeemPasscode`, `refreshEntitlement`, `applyLock`) reads it back.

A change to the entitlement shape, price (`PRICE_KOBO`), or access length
(`ACCESS_DAYS`) touches all three. Run `node worker/test.mjs` after changing
the Worker, and test rules in the Firebase Rules Playground or emulator before
`firebase deploy --only firestore:rules`.

## Sync

`save()` uploads only after `syncFromCloud` has reconciled the device and the
account (`syncReady`, `S.syncUid`). Any new sign-in path goes through
`onAuthStateChanged` → `syncFromCloud`; a guest becomes an account by
`linkWithPopup` / `linkWithCredential` so the uid (and paid access) is kept.

## Conventions

- Text from users, imports or Firestore goes through `esc()` before `innerHTML`.
- Bump `CACHE` in `sw.js` whenever a shell file changes, or installed apps keep
  the old version.
- Commits: conventional prefixes (`feat:`, `fix:`, `docs:`), authored by the
  owner alone — no AI co-author trailers or "Generated with" footers.

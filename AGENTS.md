# Anchor — rules for agents

Plain static PWA: `index.html` + `styles.css` + `app.js` (one IIFE), no build step,
no npm in the app. Firebase compat SDK from gstatic. Serve with `serve.cmd`
(localhost:8777). Setup and architecture: `README.md`. Current state and open
work: `PROGRESS.md`. Read both before suggesting changes.

## Public repo

`github.com/chuksyt/Anchor` is public. Code and commit messages carry only
public values (the Firebase web config is public by design). Access control
lives in `firestore.rules`, never in a client-side PIN or password.

## Paid access: rules and app move together

Payment is manual (WhatsApp → admin-issued passcode). Access lives in
`entitlements/{uid}` and is cached on the device:

- `firestore.rules` lets a client write an entitlement only while redeeming an
  unused `passcodes/{code}` in the same batch, for at most 31 days.
- `app.js` §14c (`redeemPasscode`, `refreshEntitlement`, `applyLock`) writes
  and reads it.

A change to the entitlement shape or access length (`ACCESS_DAYS`) touches
both. Test rules in the Firebase Rules Playground or emulator before
`firebase deploy --only firestore:rules`. Card payments were removed on
2026-11-25; the Paystack + Worker version is in commit `673b011`.

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

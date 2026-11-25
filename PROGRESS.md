# Progress

Last updated: 2026-11-25

## Status

The app works offline, syncs to Firebase, and has a 7-day trial followed by a
₦2,000/month subscription paid **manually over WhatsApp** for a single-use
passcode. The paywall, admin portal and sync were rebuilt on 2026-11-25 (see
"Recent changes"). **`firestore.rules` is written but not deployed yet**, so
passcodes and the admin portal depend on the steps below.

## Setup still to do

Commands are in the README's "Setup checklist".

- [ ] Test `firestore.rules` (Rules Playground or emulator), then deploy them.
      They were written without an emulator run.
- [ ] Sign in at `admin.html` and create `admins/<your uid>` in the Firebase console.
- [ ] Create partner codes in the admin portal (plus `direct` to count unreferred visits).
- [ ] Issue one passcode and redeem it end to end.

## Known limitations

- **Offline bypass.** A user who edits their own `localStorage` and stays
  offline can get past the paywall on their device. Nobody gets server-side
  access or partner credit without a passcode you issued.
- **Trial restarts.** The trial is measured from `firstRun`, which resets on
  "Erase all data" or a new device.
- **Visit counts** go up on every app open through a partner link, not per
  unique visitor, and any signed-in client can add +1.
- **Legacy unlocks** (from before server checks) are honoured until
  `LEGACY_UNLOCK_GRACE_END` = 2026-12-31; then those users need a passcode.
- **USD/GBP prices** shown are hard-coded estimates (`CURRENCIES` in `app.js`);
  the price is always ₦2,000.
- **Card payments** are off. Paystack + a verifying Cloudflare Worker were built
  and tested against mocks, then removed until they can be confirmed end to
  end; the code is in commit `673b011`. A real payment, live keys and a webhook
  are needed before turning them back on.
- The old admin PIN is still in the git history; it no longer opens anything.

## Recent changes (2026-11-25)

- Card/Paystack payment removed; WhatsApp + passcode is the only way to pay.
  `worker/` deleted (recoverable from `673b011`).
- "Choose Habits to Track" button now opens the habit picker.
- Passcodes are real single-use codes issued in the admin portal; any-4-character
  unlock removed. Each gives 30 days and stacks on renewal.
- Paywall cannot be dismissed once the trial ends and no access is valid; it
  offers WhatsApp, Passcode, Sign in, Export.
- Admin portal uses Google sign-in + `admins/{uid}`; PIN and in-app admin panel removed.
- `firestore.rules` added; "Erase all data" now deletes the cloud copy and signs out.
- Sync keeps the newer copy and asks when device and account data differ;
  Link Account links the guest instead of replacing it.
- User text escaped before rendering; import accepts the exported
  `{app, schema, state}` format and ignores unlock flags in backups.
- Fixed: logo clicks threw an error (undeclared variable); Paystack could open twice.
- README and manifest no longer claim data stays on the device.

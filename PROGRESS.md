# Progress

Last updated: 2026-11-25

## Status

The app works offline, syncs to Firebase, and has a 7-day trial followed by a
₦2,000/month subscription. The paywall, admin portal and sync were rebuilt on
2026-11-25 (see "Recent changes"). **The server half is written but not
deployed yet**, so the steps below are needed before charging real money.

## Setup still to do

Commands are in the README's "Setup checklist".

- [ ] Test `firestore.rules` (Rules Playground or emulator), then deploy them.
      They were written without an emulator run.
- [ ] Sign in at `admin.html` and create `admins/<your uid>` in the Firebase console.
- [ ] Create partner codes in the admin portal (plus `direct` to count unreferred visits).
- [ ] Deploy the payment Worker (`worker/`) with `PAYSTACK_SECRET_KEY` and
      `GCP_SERVICE_ACCOUNT`; set `ALLOWED_ORIGINS` to the live app address.
- [ ] Put the Worker URL in `PAYMENT_API` in `app.js`.
- [ ] Do one real ₦2,000 payment and one passcode redemption end to end.
- [ ] Switch Paystack to live keys (`pk_live_` in `app.js`, `sk_live_` in the Worker).

## Known limitations

- **Offline bypass.** A user who edits their own `localStorage` and stays
  offline can get past the paywall on their device. Nobody gets server-side
  access, passcodes or partner credit without paying.
- **Trial restarts.** The trial is measured from `firstRun`, which resets on
  "Erase all data" or a new device.
- **Visit counts** go up on every app open through a partner link, not per
  unique visitor, and any signed-in client can add +1.
- **Legacy unlocks** (from before server checks) are honoured until
  `LEGACY_UNLOCK_GRACE_END` = 2026-12-31; then those users need a passcode.
- **USD/GBP prices** shown are hard-coded estimates (`CURRENCIES` in `app.js`);
  everyone is charged ₦2,000.
- **Paystack webhook** not used. If a user pays and never reopens the app, the
  payment is recorded at Paystack but not applied until they return.
- The old admin PIN is still in the git history; it no longer opens anything.

## Recent changes (2026-11-25)

- Passcodes are real single-use codes issued in the admin portal; any-4-character
  unlock removed.
- Paywall cannot be dismissed once the trial ends and no access is valid; it
  offers Pay, Passcode, Sign in, Export.
- Card payments always charge ₦2,000 in NGN (USD/GBP were charged ₦2.99/₦2.49).
- Payments verified by a Cloudflare Worker before access is granted; each
  reference counts once; access lasts 30 days and stacks on renewal.
- Admin portal uses Google sign-in + `admins/{uid}`; PIN and in-app admin panel removed.
- `firestore.rules` added; "Erase all data" now deletes the cloud copy and signs out.
- Sync keeps the newer copy and asks when device and account data differ;
  Link Account links the guest instead of replacing it.
- User text escaped before rendering; import accepts the exported
  `{app, schema, state}` format and ignores unlock flags in backups.
- Fixed: logo clicks threw an error (undeclared variable); Paystack could open twice.
- README and manifest no longer claim data stays on the device.

# Anchor

A single-purpose habit tracker: how many days you've opened it, how many days
you've been porn-free, and how many days you haven't masturbated.

No accounts, no server, no network calls. Everything is stored in your browser's
`localStorage` under one key (`anchor.state.v1`).

## Running it

Double-click `index.html`. That's it.

If you'd rather serve it (needed if you ever add modules or a service worker):

```
python -m http.server 8777
```

then open <http://127.0.0.1:8777>.

> **Note:** `file://` and `http://localhost` are separate origins, so they keep
> separate data. Pick one and stick with it.

## What it does

| Feature | Behaviour |
| --- | --- |
| **Visit streak** | Increments once per calendar day you open the page. A skipped day resets it to 1. |
| **Clean counters** | Time-based — days elapsed since `since`. Seeded at **2 days** for both, as of first run. |
| **Daily check-in** | Only unlocks at **8pm** — a day can't be claimed before it's over. Before then it offers yesterday, if that's still unconfirmed. Leaving a box unchecked offers to reset that counter instead. |
| **Reset** | Available any time. Marks that day as a break and restarts the count from the *following* day. Saves the old run as your record. |
| **Heatmap** | Last 18 weeks. Clean / checked-in / reset / upcoming. **Click any past day** to view details, confirm clean, or log a past slip with notes. |
| **Reset notes** | Every reset can carry a free-text note (where you were, what set it off). Shown under its log entry. |
| **When it hits** | Urges ridden out, plotted by hour of day, with resets as a status mark below the baseline. Names your peak hour once there are ≥3 urges. Has a table view. |
| **Milestones** | 1, 3, 7, 14, 21, 30, 60, 90, 180, 365 — track each habit's milestones **independently** (via tabs) or combined! |
| **Back-Log System** | Missed logging for a few days? An alert banner lets you 1-tap confirm all missed days as clean or review day-by-day without losing your streak. |
| **Urge mode** | Full-screen 4-4-6 paced breathing (4 cycles) plus rotating grounding prompts. Pressing **"I'm alright now"** logs it as an urge ridden out, with the cycle count. Escape just exits and logs nothing. |
| **Erase all data** | Wipes localStorage and reseeds. |

Dates are keyed on your **local** calendar day, so a streak ticks over at your
midnight, not UTC's.

## Installing it as an app

PWAs are **not allowed on `file://`** — they need a secure origin. Double-click
**`serve.cmd`**, which serves the folder on `localhost:8777` (a secure origin) and
opens it. Then use Chrome's install icon in the address bar.

Once installed it works with **no server running and no network** — the service
worker (`sw.js`) precaches the whole shell. Verified by stopping the server and
reloading.

Remember `file://` and `localhost` keep **separate** data. If you've been using
`file://`, Export first, then Import after installing.

## Files

```
index.html            structure only
styles.css            all presentation — tokens at the top
app.js                state, rendering, interaction (one IIFE, no dependencies)
sw.js                 service worker — precaches the shell for offline use
manifest.webmanifest  PWA metadata
icons/                generated PNG icons
serve.cmd             one-click localhost server (needed only to install)
```

## Things worth reading if you're studying the CSS

- **Fluid type & spacing** — `--step-*` and `--space-*` use `clamp()`, so nothing
  jumps at a breakpoint. There is exactly one media query for layout.
- **Layered ambience** — a canvas particle field, three blurred colour blobs, and
  an SVG noise overlay. The grain is what stops the gradients from banding.
- **Intrinsic layout** — `repeat(auto-fit, minmax(min(280px, 100%), 1fr))` handles
  the responsive grids without breakpoints. The `min()` prevents overflow on
  narrow screens.
- **SVG ring progress** — one `stroke-dasharray` equal to the circumference, with
  `stroke-dashoffset` animated by JS.
- **Specificity trap (fixed here)** — `.btn:hover` outranks `.btn--primary`, so a
  bare hover rule silently erased the gradient. See the `:not()` scoping in
  `styles.css`.
- **`prefers-reduced-motion`** is honoured throughout, including disabling the
  canvas entirely.
- **The chart is one series, so it needs no legend colour-matching game.** Bars
  encode magnitude; resets are a *reserved status mark* placed below the baseline
  so they can never be misread as height on the same scale. Only the peak bar is
  directly labelled — never a number on every bar.
- **The bar colour (`#8b5cf6`) was validated, not eyeballed** — it passes the
  OKLCH lightness band, chroma floor, and 3:1 contrast against *both* the dark and
  light surfaces, so one value serves both themes.

## Known constraints

- Private/incognito windows may block `localStorage`; you'll get a toast if a
  save fails.
- Clearing browser site data deletes your streaks. **Use Export** — it downloads
  a plain JSON file (~1 KB) containing the whole state:

```json
{
  "app": "anchor", "schema": 1,
  "exportedAt": "2026-07-20T06:02:19.020Z",
  "timezoneOffsetMinutes": -60,
  "state": {
    "version": 1,
    "firstRun": "2026-07-20",
    "lastOpen": "2026-07-20",
    "visitStreak": 1, "bestVisit": 1,
    "openDays": ["2026-07-20"],
    "tracks": {
      "porn":  { "since": "2026-07-18", "best": 2 },
      "nofap": { "since": "2026-07-18", "best": 2 }
    },
    "checkins": { "2026-07-19": true },
    "relapses": [ { "date": "2026-07-18", "track": "porn" } ],
    "log": [ { "ts": 1784527313000, "msg": "Opened the app." } ]
  }
}
```

  Import validates the shape before overwriting and asks first. Since it's plain
  text you can also hand-edit it — e.g. correct a `since` date you got wrong.

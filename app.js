/* ===============================================================
   ANCHOR - application logic
   No frameworks, no build step, no network. State lives in
   localStorage under a single key and is the source of truth for
   every pixel on screen.
   =============================================================== */

(() => {
'use strict';

const KEY = 'anchor.state.v1';
const TRACKS = ['porn', 'nofap', 'paidsex'];
const LABEL = { porn: 'Porn-free', nofap: 'No masturbation', paidsex: 'No paid sex' };

function getActiveTracks() {
  if (typeof S !== 'undefined' && S && S.user && Array.isArray(S.user.activeTracks) && S.user.activeTracks.length > 0) {
    return S.user.activeTracks;
  }
  return TRACKS;
}
const MILESTONES = [1, 3, 7, 14, 21, 30, 60, 90, 180, 365];
const MILESTONE_NAMES = {
  1: 'First day down',      3: 'Past the first wobble',  7: 'One week',
  14: 'Two weeks',          21: 'Habit forming',         30: 'One month',
  60: 'Two months',         90: 'Ninety days',          180: 'Half a year',
  365: 'A full year'
};

const TRIGGER_STRATEGIES = {
  night: {
    title: 'Late night in bed 🌙',
    tips: [
      'Charge phone across the room in Airplane Mode before lying down. Keep your hands visible above covers.',
      'Leave your phone outside your bedroom 30 minutes before sleep. Read a physical book instead.',
      'When an urge strikes in bed, sit up immediately and put your feet flat on the cold floor.',
      'Set a strict sleep schedule: in bed by 10:30 PM, phone out of arm’s reach.'
    ]
  },
  stress: {
    title: 'Stress & Anxiety 😔',
    tips: [
      'Do 30 seconds of cold water facial splash or 4-7-8 breathing to activate your parasympathetic nervous system.',
      'Stress is physical tension. Do 10 deep belly breaths and unclench your jaw right now.',
      'Write down what is stressing you on paper. Brain dump the anxiety instead of soothing with pleasure.',
      'Go for a brisk 5-minute walk outside. Physical movement releases cortisol faster than isolation.'
    ]
  },
  boredom: {
    title: 'Boredom & Idle time 🛋️',
    tips: [
      'Do 15 push-ups or squats immediately or step into a public room. Never remain isolated with unstructured time.',
      'Boredom is a signal to create, not consume. Pick up a skill, clean your desk, or call a friend.',
      'Change your location right now. Walk into the kitchen or step outside for fresh air.',
      'Schedule your evening hour-by-hour so idle time doesn’t become high-risk time.'
    ]
  },
  social: {
    title: 'Social media & feeds 📱',
    tips: [
      'Log out of trigger apps immediately, switch your phone screen to Grayscale, and take a 15-minute screen blackout.',
      'Unfollow or mute any account that triggers arousal or body comparison.',
      'Replace endless scrolling with a dedicated reading app or podcast.',
      'Put app timers on social media apps (max 15 mins/day) or delete them from your home screen.'
    ]
  },
  fatigue: {
    title: 'Alcohol & Fatigue 🍾',
    tips: [
      'Drink a large glass of ice water and go straight to sleep. Avoid solo late-night drinking.',
      'Exhaustion lowers your willpower guard rails. When tired, lie down to sleep—never scroll.',
      'If you’ve been drinking, turn off your phone before entering your bedroom.',
      'Recognize HALT: Hungry, Angry, Lonely, Tired. Address the physical fatigue directly.'
    ]
  },
  lonely: {
    title: 'Loneliness & Pain 💔',
    tips: [
      'Reach out to a friend or accountability contact, listen to an uplifting podcast, or write in your journal.',
      'Compulsive outlets isolate you further. Real connection is the true antidote to loneliness.',
      'Join an online support group or call someone you care about right now.',
      'Treat yourself with compassion. Acknowledge the emotional pain without escaping into habit.'
    ]
  }
};

function getDailyTriggerTip(tKey) {
  const strat = TRIGGER_STRATEGIES[tKey];
  if (!strat || !strat.tips || !strat.tips.length) return strat?.tip || '';
  const dStr = today();
  let hash = 0;
  for (let i = 0; i < dStr.length; i++) hash += dStr.charCodeAt(i);
  const idx = hash % strat.tips.length;
  return strat.tips[idx];
}

/* -- Date helpers ---------------------------------------------
   Everything is keyed on the LOCAL calendar date (YYYY-MM-DD) so
   a streak ticks over at your midnight, not UTC's.            */
const dayMs = 86_400_000;
const key   = (d) => {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};
const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const today = () => key(new Date());
const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return key(d); };
const diffDays = (a, b) => Math.round((parse(b) - parse(a)) / dayMs);

/* -- State ----------------------------------------------------
   Seeded on first run with clean days already banked. */
function seed() {
  const t = today();
  return {
    version: 1,
    firstRun:   t,
    lastOpen:   null,
    visitStreak: 0,
    bestVisit:   0,
    openDays:   [],
    tracks: {
      porn:    { since: t, best: 0 },
      nofap:   { since: t, best: 0 },
      paidsex: { since: t, best: 0 }
    },
    checkins: {},          // 'YYYY-MM-DD' -> true
    relapses: [],          // { date, track }
    urges:    [],          // { ts, cycles, note } - urges you sat through
    log: [],               // { ts, msg, note }
    user: {
      name: '',
      gender: 'him',
      theme: 'dark',
      triggers: ['night'],
      trigger: 'night',
      activeTracks: ['porn', 'nofap', 'paidsex'],
      onboarded: false,
      unlocked: false,
      unlockKey: '',
      referrer: 'direct'
    },
    partners: {
      direct: { visits: 1, subs: 0 }
    },
    deletedPartners: []
  };
}

let S;
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    S = raw ? JSON.parse(raw) : seed();
  } catch { S = seed(); }
  if (!S || S.version !== 1) S = seed();
  // Backfill fields added after a save was written, so older data loads safely.
  if (!S.tracks) S.tracks = {};
  if (!S.tracks.porn) S.tracks.porn = { since: today(), best: 0 };
  if (!S.tracks.nofap) S.tracks.nofap = { since: today(), best: 0 };
  if (!S.tracks.paidsex) S.tracks.paidsex = { since: today(), best: 0 };
  if (!S.user) S.user = { name: '', gender: 'him', theme: 'dark', triggers: ['night'], onboarded: false };
  if (!S.user.activeTracks || !Array.isArray(S.user.activeTracks) || S.user.activeTracks.length === 0) {
    S.user.activeTracks = ['porn', 'nofap', 'paidsex'];
  }
  if (!S.user.triggers || !Array.isArray(S.user.triggers)) {
    S.user.triggers = S.user.trigger ? [S.user.trigger] : ['night'];
  }
  if (!S.user.theme) S.user.theme = 'dark';
  if (!S.partners) {
    S.partners = { direct: { visits: S.openDays?.length || 1, subs: S.user.unlocked ? 1 : 0 } };
  }
  if (!Array.isArray(S.deletedPartners)) S.deletedPartners = [];
  if (!S.relapses || !Array.isArray(S.relapses)) {
    S.relapses = [];
  } else {
    // Purge any legacy unconfirmed seed relapses from older local storage sessions
    S.relapses = S.relapses.filter((r) => r && r.note);
  }
  if (!Array.isArray(S.urges)) S.urges = [];
}

/* === Firebase Cloud Database & Realtime Sync Engine =========== */
let db = null, auth = null, currentUser = null;

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD-0T6byubzr4un2DG6uRk2SdnZ_d4zFCA",
  authDomain: "anchor-c0d11.firebaseapp.com",
  projectId: "anchor-c0d11",
  storageBucket: "anchor-c0d11.firebasestorage.app",
  messagingSenderId: "353466821039",
  appId: "1:353466821039:web:a05ac44b47e0d6ef5b675a",
  measurementId: "G-S9E978L2X3"
};

function initFirebase() {
  if (typeof firebase !== 'undefined') {
    try {
      if (!firebase.apps.length && FIREBASE_CONFIG && FIREBASE_CONFIG.projectId && !FIREBASE_CONFIG.projectId.includes("YOUR_API_KEY")) {
        firebase.initializeApp(FIREBASE_CONFIG);
      }
      if (firebase.apps.length) {
        db = firebase.firestore();
        auth = firebase.auth();

        auth.onAuthStateChanged((user) => {
          if (user) {
            currentUser = user;
            syncFromCloud(user.uid);
          } else {
            auth.signInAnonymously().catch(() => {});
          }
        });
      }
    } catch (e) {
      console.warn('Firebase init fallback to local storage:', e);
    }
  }
}

function syncFromCloud(uid) {
  if (!db) return;
  db.collection('users').doc(uid).get().then((doc) => {
    if (doc.exists) {
      const remoteState = doc.data()?.state;
      if (remoteState && remoteState.tracks) {
        S = { ...seed(), ...remoteState, version: 1 };
        try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {}
        renderAll();
      }
    } else {
      save();
    }
  }).catch(() => {});
}

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch { toast('Could not save — is storage full or private mode on?'); }

  if (db && currentUser) {
    try {
      db.collection('users').doc(currentUser.uid).set({
        state: S,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } catch {}
  }
}

function logIt(msg, note = '') {
  S.log.unshift(note ? { ts: Date.now(), msg, note } : { ts: Date.now(), msg });
  S.log = S.log.slice(0, 60);
}

/* 24h clock -> readable hour, e.g. 0 -> "12am", 15 -> "3pm" */
const fmtHour = (h) => `${h % 12 === 0 ? 12 : h % 12}${h < 12 ? 'am' : 'pm'}`;

/* -- Derived values ------------------------------------------ */
const cleanDays = (track) => Math.max(0, diffDays(S.tracks[track].since, today()));
const nextMilestone = (n) => MILESTONES.find((m) => m > n) ?? null;

/* -- DOM shorthand ------------------------------------------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* === 1. Visit streak =========================================
   Runs once per page load. Consecutive calendar days extend the
   streak; a gap resets it to 1.                               */
function registerVisit() {
  const t = today();
  if (S.lastOpen === t) return;

  if (S.lastOpen === addDays(t, -1)) S.visitStreak += 1;
  else                               S.visitStreak = 1;

  S.lastOpen = t;
  S.bestVisit = Math.max(S.bestVisit, S.visitStreak);
  if (!S.openDays.includes(t)) S.openDays.push(t);
  S.openDays = S.openDays.slice(-500);

  logIt(S.visitStreak > 1
    ? `Opened the app — ${S.visitStreak} days running.`
    : 'Opened the app.');
  save();
}

/* === 2. Rendering =========================================== */
const CIRC = 2 * Math.PI * 88;   // ring circumference, matches the SVG r

function getTrackLabel(track) {
  if (S.user?.gender === 'her') {
    if (track === 'porn') return 'Erotica & Porn-free';
    if (track === 'nofap') return 'Self-love & Balance';
    if (track === 'paidsex') return 'Healthy Boundaries';
  }
  return LABEL[track];
}

function renderRings() {
  const active = getActiveTracks();
  TRACKS.forEach((track) => {
    const card = $(`.ring-card[data-track="${track}"]`);
    if (!card) return;
    if (!active.includes(track)) {
      card.hidden = true;
      card.style.display = 'none';
      return;
    }
    card.hidden = false;
    card.style.display = '';

    const days = cleanDays(track);
    const next = nextMilestone(days);

    // Progress calculation: percentage towards next milestone (or 100% if all milestones cleared)
    const pct = next ? Math.min(1, Math.max(0.06, days / next)) : 1;

    const fill = $(`.ring-card[data-track="${track}"] .ring__fill`);
    if (fill) {
      fill.style.strokeDashoffset = String(CIRC * (1 - Math.min(1, pct)));
    }

    const titleEl = $(`.ring-card[data-track="${track}"] .ring-card__title`);
    if (titleEl) titleEl.textContent = getTrackLabel(track);

    countTo($(`[data-count="${track}"]`), days);
    $(`[data-unit="${track}"]`).textContent = days === 1 ? 'day' : 'days';
    const gap = next ? next - days : 0;
    $(`[data-next="${track}"]`).textContent = next
      ? `Day ${next} is ${gap === 1 ? 'tomorrow' : `${gap} days away`}`
      : 'Every milestone cleared';
  });
}

/* Animated number roll - small touch, big perceived quality.
   rAF is throttled in background tabs and disabled for reduced-motion
   users, so in those cases write the value straight out. Correctness
   first; the flourish is optional. */
function countTo(el, target) {
  const from = Number(el.dataset.val ?? 0);
  el.dataset.val = String(target);
  if (from === target || document.hidden ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = String(target);
    return;
  }
  const t0 = performance.now(), dur = 900;
  const tick = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);           // easeOutCubic
    el.textContent = String(Math.round(from + (target - from) * eased));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function renderTop() {
  $('#visitStreak').textContent = S.visitStreak;
  $('#pillDate').textContent = new Date().toLocaleDateString(undefined, {
    weekday: 'long', day: 'numeric', month: 'long'
  });
}

/* Which day is the check-in actually about?
   A day can only be confirmed once it is over. Before the evening
   cutoff there is nothing honest to claim about today, so the button
   offers yesterday instead (if that is still unconfirmed). Returns
   null when there is nothing to confirm right now. */
const CHECKIN_HOUR = 20;   // 8pm - "the day is effectively done"

function checkinTarget() {
  const t = today(), y = addDays(t, -1);
  const lateEnough = new Date().getHours() >= CHECKIN_HOUR;
  const claimable = (d) =>
    !S.checkins[d] &&
    d >= S.firstRun &&
    !S.relapses.some((r) => r.date === d);

  if (lateEnough && claimable(t)) return t;
  if (claimable(y)) return y;
  return null;
}

function renderToday() {
  const t = today();
  const target = checkinTarget();
  const btn = $('#btnCheckin');
  const title = $('#todayTitle');
  const dayName = (d) => parse(d).toLocaleDateString(undefined, { weekday: 'long' });
  const active = getActiveTracks();

  btn.classList.remove('is-done', 'is-waiting');
  btn.dataset.target = target ?? '';

  if (target === t) {
    title.textContent = 'Close out today';
    btn.textContent = 'Close out today';
    $('#checkinState').textContent = 'Today is nearly over — call it';
  } else if (target) {
    title.textContent = `Yesterday — ${dayName(target)}`;
    btn.textContent = `Confirm ${dayName(target)}`;
    $('#checkinState').textContent = 'Still unconfirmed';
  } else if (S.checkins[t]) {
    title.textContent = 'Today';
    btn.textContent = 'Today is logged';
    btn.classList.add('is-done');
    $('#checkinState').textContent = 'Checked in ✓';
  } else {
    const hrs = CHECKIN_HOUR - new Date().getHours();
    title.textContent = 'Today — still in progress';
    btn.textContent = `Check in after ${CHECKIN_HOUR - 12}pm`;
    btn.classList.add('is-waiting');
    $('#checkinState').textContent =
      `The day isn't done. ${hrs} ${hrs === 1 ? 'hour' : 'hours'} to go.`;
  }

  // Boxes describe the day being claimed, so relabel them to match.
  const past = target && target !== t;
  $('.check[data-check="porn"] .check__text strong').textContent =
    past ? 'Stayed away from porn all day' : 'Stayed away from porn today';
  $('.check[data-check="nofap"] .check__text strong').textContent =
    past ? "Didn't masturbate all day" : "Didn't masturbate today";
  $('.check[data-check="paidsex"] .check__text strong').textContent =
    past ? "No paid sex / hookups all day" : "No paid sex / hookups today";

  const locked = !target;

  TRACKS.forEach((track) => {
    const checkRow = $(`.check[data-check="${track}"]`);
    if (checkRow) {
      checkRow.hidden = !active.includes(track);
      checkRow.style.display = active.includes(track) ? '' : 'none';
    }
    $$(`[data-relapse="${track}"]`).forEach((b) => {
      b.hidden = !active.includes(track);
      b.style.display = active.includes(track) ? '' : 'none';
    });

    if (!active.includes(track)) return;

    const ckId = track === 'porn' ? '#ckPorn' : track === 'nofap' ? '#ckFap' : '#ckPaidSex';
    const ck = $(ckId);
    if (!ck) return;

    const hasRelapseToday = S.relapses.some((r) => r.date === t && r.track === track);
    const sub = $(`.check[data-check="${track}"] .check__text small`);

    if (hasRelapseToday) {
      ck.checked = false;
      ck.disabled = true;
      if (sub) sub.textContent = 'Reset today — counter restarts tomorrow';
    } else if (locked) {
      ck.disabled = true;
      ck.checked = !!S.checkins[t];
    } else {
      ck.disabled = false;
    }
  });
}

function renderChaserBanner() {
  const banner = $('#chaserBanner');
  if (!banner) return;
  // Ensure chaser banner is hidden unless a real user relapse is explicitly logged
  const recentRelapses = (S.relapses || []).filter((r) => r && r.ts && (Date.now() - r.ts) <= 48 * 3600 * 1000 && r.note);
  if (!recentRelapses.length) {
    banner.hidden = true;
    banner.style.display = 'none';
    return;
  }
  banner.hidden = false;
  banner.style.display = '';
}

function renderBacklogBanner() {
  const banner = $('#backlogBanner');
  if (!banner) return;
  const missed = getUnconfirmedPastDays().filter((d) => d !== today());

  if (!missed.length) {
    banner.hidden = true;
    banner.style.display = 'none';
    return;
  }

  banner.hidden = false;
  banner.style.display = '';

  const titleEl = $('#backlogTitle');
  const subEl = $('#backlogSub');
  if (titleEl) {
    titleEl.textContent = `${missed.length} Missed ${missed.length === 1 ? 'Check-in' : 'Check-ins'} Detected`;
  }
  if (subEl) {
    const dateNames = missed.slice(-3).map((d) => {
      return parse(d).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    }).join(', ');
    const more = missed.length > 3 ? ` +${missed.length - 3} more` : '';
    subEl.textContent = `Unconfirmed days: ${dateNames}${more}. Did you stay clean?`;
  }
}

function confirmAllMissedDays() {
  const missed = getUnconfirmedPastDays().filter((d) => d !== today());
  if (!missed.length) {
    toast('No missed past days to confirm.');
    return;
  }

  missed.forEach((d) => {
    S.checkins[d] = true;
  });

  const active = getActiveTracks();
  active.forEach((track) => {
    if (diffDays(S.tracks[track].since, today()) === 0) {
      S.tracks[track].since = addDays(today(), -1);
    }
  });

  logIt(`Back-logged & confirmed ${missed.length} clean ${missed.length === 1 ? 'day' : 'days'}.`);
  save();
  renderAll();
  burst();
  toast(`All ${missed.length} missed days confirmed clean! 🎉`);
}

function openBacklogModal() {
  const modal = $('#backlogModal');
  const listContainer = $('#backlogDaysList');
  if (!modal || !listContainer) return;

  const missed = getUnconfirmedPastDays().filter((d) => d !== today());
  if (!missed.length) {
    toast('All past days are already confirmed! 🎉');
    return;
  }

  listContainer.innerHTML = '';
  missed.forEach((d) => {
    const card = document.createElement('div');
    card.style.cssText = 'background:var(--bg-2); border:1px solid var(--stroke-hi); border-radius:var(--radius); padding:0.65rem 0.85rem; display:grid; gap:0.4rem;';
    const dayLabel = parse(d).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    
    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <strong style="color:var(--cyan-soft); font-size:var(--step--1);">${dayLabel}</strong>
        <label style="display:flex; align-items:center; gap:0.4rem; font-size:0.8rem; cursor:pointer; color:var(--ink);">
          <input type="checkbox" class="backlog-day-cb" data-date="${d}" checked />
          <span>Mark Clean ✓</span>
        </label>
      </div>
    `;
    listContainer.append(card);
  });

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeBacklogModal() {
  const modal = $('#backlogModal');
  if (modal) modal.hidden = true;
  document.body.style.overflow = '';
}

function saveBacklogModal() {
  const checkedBoxes = $$('.backlog-day-cb:checked');
  if (!checkedBoxes.length) {
    closeBacklogModal();
    return;
  }

  let count = 0;
  checkedBoxes.forEach((cb) => {
    const d = cb.dataset.date;
    if (d) {
      S.checkins[d] = true;
      count++;
    }
  });

  logIt(`Back-logged ${count} clean ${count === 1 ? 'day' : 'days'}.`);
  save();
  closeBacklogModal();
  renderAll();
  burst();
  toast(`${count} past ${count === 1 ? 'day' : 'days'} confirmed clean! 🎉`);
}

let activeDayLogDate = null;
function openDayLogModal(d) {
  if (!d || d > today()) return;
  activeDayLogDate = d;

  const modal = $('#dayLogModal');
  if (!modal) return;

  const dateObj = parse(d);
  const formattedDate = dateObj.toLocaleDateString(undefined, {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  $('#dayLogTitle').textContent = formattedDate;

  const statusBadge = $('#dayLogStatusBadge');
  const isChecked = !!S.checkins[d];
  const dateRelapses = S.relapses.filter((r) => r.date === d);

  if (dateRelapses.length) {
    const relLabels = dateRelapses.map((r) => getTrackLabel(r.track) || r.track).join(', ');
    statusBadge.innerHTML = `<span class="day-log-status-pill day-log-status-pill--relapse">⚠️ Slip: ${relLabels}</span>`;
  } else if (isChecked) {
    statusBadge.innerHTML = `<span class="day-log-status-pill day-log-status-pill--confirmed">✓ Checked In Clean</span>`;
  } else {
    statusBadge.innerHTML = `<span class="day-log-status-pill day-log-status-pill--clean">⏳ Unconfirmed Clean</span>`;
  }

  const active = getActiveTracks();
  TRACKS.forEach((track) => {
    const row = $(`[data-day-check="${track}"]`);
    if (row) {
      row.hidden = !active.includes(track);
      row.style.display = active.includes(track) ? '' : 'none';
    }
    const lbl = $(`#dayLabel${track === 'porn' ? 'Porn' : track === 'nofap' ? 'Fap' : 'PaidSex'}`);
    if (lbl) lbl.textContent = getTrackLabel(track);

    const ckId = track === 'porn' ? '#dayCkPorn' : track === 'nofap' ? '#dayCkFap' : '#dayCkPaidSex';
    const ck = $(ckId);
    if (ck) {
      const hasRelapseOnDate = dateRelapses.some((r) => r.track === track);
      ck.checked = !hasRelapseOnDate;
    }
  });

  const noteInput = $('#dayLogNote');
  if (noteInput) {
    const existingNote = dateRelapses.map((r) => r.note).filter(Boolean).join('; ');
    noteInput.value = existingNote || '';
  }

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeDayLogModal() {
  const modal = $('#dayLogModal');
  if (modal) modal.hidden = true;
  document.body.style.overflow = '';
  activeDayLogDate = null;
}

function saveDayLogClean() {
  if (!activeDayLogDate) return;
  const d = activeDayLogDate;
  const note = $('#dayLogNote')?.value.trim() || '';

  S.relapses = S.relapses.filter((r) => r.date !== d);
  S.checkins[d] = true;

  const active = getActiveTracks();
  active.forEach((track) => {
    if (diffDays(S.tracks[track].since, d) === 0) {
      S.tracks[track].since = addDays(d, -1);
    }
  });

  logIt(`Marked ${d} confirmed clean.`, note);
  save();
  closeDayLogModal();
  renderAll();
  burst();
  toast(`Date ${d} confirmed clean! ✓`);
}

function logDaySlip() {
  if (!activeDayLogDate) return;
  const d = activeDayLogDate;
  const active = getActiveTracks();
  const ok = {
    porn: $('#dayCkPorn')?.checked ?? true,
    nofap: $('#dayCkFap')?.checked ?? true,
    paidsex: $('#dayCkPaidSex')?.checked ?? true
  };
  const slipped = active.filter((k) => !ok[k]);
  const note = $('#dayLogNote')?.value.trim() || '';

  if (!slipped.length) {
    toast('Uncheck the habit(s) that slipped on this date first.');
    return;
  }

  closeDayLogModal();
  confirmDialog(
    `Log slip on ${d}?`,
    `You indicated a slip on ${slipped.map((k) => getTrackLabel(k)).join(' and ')}. Counter for that track will restart from ${addDays(d, 1)}.`,
    'Log Slip',
    (confirmNote) => {
      slipped.forEach((k) => {
        relapse(k, d, false, confirmNote || note);
      });
    },
    { field: { label: 'What set it off?', placeholder: 'Reflect honestly on triggers...' } }
  );
}

function clearDayLog() {
  if (!activeDayLogDate) return;
  const d = activeDayLogDate;
  delete S.checkins[d];
  S.relapses = S.relapses.filter((r) => r.date !== d);
  save();
  closeDayLogModal();
  renderAll();
  toast(`Cleared log status for ${d}.`);
}

function renderHeatmap() {
  const grid = $('#heatmap');
  grid.textContent = '';
  const t = today();
  const relapsesByDate = {};
  S.relapses.forEach((r) => {
    if (!relapsesByDate[r.date]) relapsesByDate[r.date] = [];
    relapsesByDate[r.date].push(r);
  });

  // Wind back 17 weeks, then to the Sunday of that week so columns align.
  let start = addDays(t, -119);
  start = addDays(start, -parse(start).getDay());

  const frag = document.createDocumentFragment();
  for (let i = 0; i < 126; i++) {
    const d = addDays(start, i);
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.setAttribute('role', 'gridcell');

    let state = 'none';
    let note = '';
    const dateRelapses = relapsesByDate[d] || [];

    if (d > t) {
      cell.classList.add('cell--future');
      state = 'Upcoming';
    } else if (dateRelapses.length) {
      cell.classList.add('cell--relapse');
      state = `Reset: ${dateRelapses.map((r) => LABEL[r.track] || r.track).join(', ')}`;
      note = dateRelapses.map((r) => r.note).filter(Boolean).join('; ');
    } else if (S.checkins[d]) {
      cell.classList.add('cell--confirmed');
      state = 'Checked in ✓';
    } else if (d >= S.firstRun || TRACKS.some((k) => d >= S.tracks[k]?.since)) {
      cell.classList.add('cell--clean');
      state = 'Clean';
    }
    if (d === t) cell.classList.add('cell--today');

    cell.dataset.date = d;
    cell.dataset.state = state;
    if (note) cell.dataset.note = note;

    cell.title = `${parse(d).toLocaleDateString(undefined,
      { weekday: 'short', day: 'numeric', month: 'short' })} — ${state}${note ? ` ("${note}")` : ''}`;
    cell.setAttribute('aria-label', cell.title);

    if (d <= t) {
      cell.setAttribute('tabindex', '0');
      cell.setAttribute('role', 'button');
      cell.addEventListener('click', () => openDayLogModal(d));
      cell.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDayLogModal(d);
        }
      });
    }

    frag.append(cell);
  }
  grid.append(frag);
  grid.parentElement.scrollLeft = grid.parentElement.scrollWidth;
}

function renderStats() {
  const active = getActiveTracks();
  const p = cleanDays('porn'), f = cleanDays('nofap'), x = cleanDays('paidsex');
  // A record is set simply by time passing, so promote it on every render.
  const before = (S.tracks.porn.best || 0) + (S.tracks.nofap.best || 0) + (S.tracks.paidsex.best || 0);
  S.tracks.porn.best    = Math.max(S.tracks.porn.best || 0, p);
  S.tracks.nofap.best   = Math.max(S.tracks.nofap.best || 0, f);
  S.tracks.paidsex.best = Math.max(S.tracks.paidsex.best || 0, x);
  if (S.tracks.porn.best + S.tracks.nofap.best + S.tracks.paidsex.best !== before) save();

  $('#stBestPorn').textContent  = S.tracks.porn.best;
  $('#stBestFap').textContent   = S.tracks.nofap.best;
  $('#stBestVisit').textContent = S.bestVisit;
  // A "clean day" is a full day clean on active tracks, so count minimum clean days across active tracks
  $('#stTotalDays').textContent = Math.min(...active.map(cleanDays));
  $('#stCheckins').textContent  = Object.keys(S.checkins).length;
  $('#stUrges').textContent     = S.urges.length;
  $('#stResets').textContent    = S.relapses.length;
}

function renderMilestones() {
  const active = getActiveTracks();
  const tabsContainer = $('#milestoneTabs');
  
  if (selectedMilestoneTrack !== 'combined' && !active.includes(selectedMilestoneTrack)) {
    selectedMilestoneTrack = 'combined';
  }

  // Render milestone track tabs
  if (tabsContainer) {
    tabsContainer.innerHTML = '';
    
    if (active.length > 1) {
      const combinedDays = Math.min(...active.map(cleanDays));
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ms-tab' + (selectedMilestoneTrack === 'combined' ? ' is-active' : '');
      btn.dataset.msTrack = 'combined';
      btn.innerHTML = `⚡ Combined <span class="ms-tab__badge">${combinedDays}d</span>`;
      btn.addEventListener('click', () => {
        selectedMilestoneTrack = 'combined';
        renderMilestones();
      });
      tabsContainer.append(btn);
    }

    active.forEach((track) => {
      const days = cleanDays(track);
      const icon = track === 'porn' ? '🌸' : track === 'nofap' ? '⚡' : '🛡️';
      const label = getTrackLabel(track);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ms-tab' + (selectedMilestoneTrack === track ? ' is-active' : '');
      btn.dataset.msTrack = track;
      btn.innerHTML = `${icon} ${label} <span class="ms-tab__badge">${days}d</span>`;
      btn.addEventListener('click', () => {
        selectedMilestoneTrack = track;
        renderMilestones();
      });
      tabsContainer.append(btn);
    });
  }

  let currentStreak = 0;
  let activeTitle = '';
  if (selectedMilestoneTrack === 'combined') {
    currentStreak = Math.min(...active.map(cleanDays));
    activeTitle = 'All Habits Combined';
  } else {
    currentStreak = cleanDays(selectedMilestoneTrack);
    activeTitle = getTrackLabel(selectedMilestoneTrack);
  }

  const next = nextMilestone(currentStreak);

  const labelEl = $('#msActiveLabel');
  const statEl = $('#msCurrentDays');
  const badgeEl = $('#msNextBadge');
  const fillEl = $('#msBarFill');
  const subEl = $('#milestoneSubtitle');

  if (subEl) {
    subEl.textContent = selectedMilestoneTrack === 'combined'
      ? 'Based on all active habits synced'
      : `Tracking ${activeTitle} progression`;
  }
  if (labelEl) labelEl.textContent = `${activeTitle} Streak`;
  if (statEl) statEl.textContent = String(currentStreak);

  if (badgeEl && fillEl) {
    if (next) {
      const gap = next - currentStreak;
      const prevMilestones = MILESTONES.filter((m) => m <= currentStreak);
      const prevMilestone = prevMilestones.length ? prevMilestones[prevMilestones.length - 1] : 0;
      const progressFraction = Math.min(1, Math.max(0.06, (currentStreak - prevMilestone) / (next - prevMilestone)));
      fillEl.style.width = `${progressFraction * 100}%`;
      badgeEl.textContent = `Next: Day ${next} (${MILESTONE_NAMES[next]}) — ${gap === 1 ? 'tomorrow' : `${gap} days away`}`;
    } else {
      fillEl.style.width = '100%';
      badgeEl.textContent = 'All milestones cleared! 👑';
    }
  }

  const list = $('#milestones');
  if (!list) return;
  list.textContent = '';

  MILESTONES.forEach((m) => {
    const isHit = currentStreak >= m;
    const li = document.createElement('li');
    li.className = 'ms' + (isHit ? ' is-hit' : '') + (m === next ? ' is-next' : '');
    li.innerHTML = `
      <span class="ms__dot"></span>
      <span class="ms__name">${MILESTONE_NAMES[m]}</span>
      <span class="ms__days">${isHit ? '✓ achieved' : `day ${m}`}</span>`;
    list.append(li);
  });
}

function renderLog() {
  const ul = $('#log');
  ul.textContent = '';
  if (!S.log.length) {
    ul.innerHTML = '<li class="log__empty">Nothing logged yet.</li>';
    return;
  }
  S.log.forEach(({ ts, msg, note }) => {
    const li = document.createElement('li');
    const when = new Date(ts).toLocaleString(undefined,
      { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    li.innerHTML = `<span class="log__time">${when}</span><span class="log__msg"></span>`;
    const body = li.lastElementChild;
    body.textContent = msg;                  // textContent = no HTML injection
    if (note) {
      const n = document.createElement('span');
      n.className = 'log__note';
      n.textContent = `"${note}"`;           // ditto - never innerHTML user text
      body.append(n);
    }
    ul.append(li);
  });
}

/* ── Hour-of-day pattern ──────────────────────────────────────
   One series (urges you sat through) as bars; resets ride below
   the baseline as a reserved status mark, so they never read as
   magnitude on the same scale. */
function renderPattern() {
  const urges = Array(24).fill(0);
  const slips = Array(24).fill(0);
  S.urges.forEach((u) => { urges[new Date(u.ts).getHours()]++; });
  S.relapses.forEach((r) => { if (r.ts) slips[new Date(r.ts).getHours()]++; });

  const totalU = S.urges.length;
  const totalS = slips.reduce((a, b) => a + b, 0);
  const peak = urges.indexOf(Math.max(...urges));
  const max = Math.max(1, ...urges);

  const chart = $('#chart'), axis = $('#chartAxis'), lead = $('#chartLead');
  chart.textContent = ''; axis.textContent = '';

  $('#chartLegend').hidden = !(totalU || totalS);

  if (!totalU && !totalS) {
    lead.textContent =
      'Nothing logged yet. Ride out an urge, or log a reset, and your pattern builds here.';
  } else if (totalU < 3) {
    lead.innerHTML = `<b>${totalU}</b> urge${totalU === 1 ? '' : 's'} logged so far. ` +
      `A few more and the shape of your day starts showing.`;
  } else {
    lead.innerHTML = `Most urges hit around <b>${fmtHour(peak)}</b>. ` +
      `That is the hour worth planning around.`;
  }

  for (let h = 0; h < 24; h++) {
    const col = document.createElement('div');
    col.className = 'col' + (urges[h] ? '' : ' col--empty');
    col.title = `${fmtHour(h)} — ${urges[h]} urge${urges[h] === 1 ? '' : 's'}` +
                (slips[h] ? `, ${slips[h]} reset${slips[h] === 1 ? '' : 's'}` : '');

    const bar = document.createElement('div');
    bar.className = 'col__bar';
    bar.style.height = urges[h] ? `${(urges[h] / max) * 100}%` : '2px';
    col.append(bar);

    // Direct-label the peak only, never every bar.
    if (urges[h] && h === peak && totalU >= 3) {
      const lbl = document.createElement('span');
      lbl.className = 'col__peak';
      lbl.textContent = urges[h];
      col.append(lbl);
    }
    if (slips[h]) {
      const dot = document.createElement('span');
      dot.className = 'col__slip';
      col.append(dot);
    }
    chart.append(col);

    const tick = document.createElement('span');
    tick.textContent = h % 3 === 0 ? fmtHour(h) : '';
    axis.append(tick);
  }

  // Table view: only hours that actually carry data.
  const tb = $('#chartTableBody');
  tb.textContent = '';
  const rows = [...Array(24).keys()].filter((h) => urges[h] || slips[h]);
  if (!rows.length) {
    tb.innerHTML = '<tr><td colspan="3">No entries yet.</td></tr>';
  } else {
    rows.forEach((h) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${fmtHour(h)}</td><td>${urges[h]}</td><td>${slips[h]}</td>`;
      tb.append(tr);
    });
  }
}

const WISDOM_PROMPTS = [
  { text: "Real intimacy is built on trust, respect, and mutual affection—not isolated transactions.", cat: "Authentic Intimacy" },
  { text: "Urges are physical waves of energy. You don't have to fight them; you just have to let them pass.", cat: "Emotional Resilience" },
  { text: "Protecting your peace of mind and finances today is the greatest gift you can give yourself tomorrow.", cat: "Value Alignment" },
  { text: "Sex in a healthy relationship deepens connection; compulsive outlets only increase isolation.", cat: "Healthy Boundaries" },
  { text: "A slip-up is a single moment, not a lifetime sentence. Reset calmly, learn the trigger, and keep moving forward.", cat: "Growth Mindset" },
  { text: "Self-mastery isn't about perfection; it's about choosing who you want to be when uncomfortable feelings arise.", cat: "Self-Mastery" },
  { text: "When you feel bored or lonely, seek human connection or physical movement instead of digital quick fixes.", cat: "Habit Replacement" },
  { text: "Your financial stability and self-respect are worth far more than a 10-minute impulse.", cat: "Financial Peace" }
];

let currentWisdomIdx = null;
function renderWisdom(forceNext = false) {
  const quoteEl = $('#wisdomText'), catEl = $('#wisdomCat');
  if (!quoteEl || !catEl) return;

  if (forceNext || currentWisdomIdx === null) {
    if (forceNext) {
      currentWisdomIdx = (currentWisdomIdx + 1) % WISDOM_PROMPTS.length;
    } else {
      const dStr = today();
      let hash = 0;
      for (let i = 0; i < dStr.length; i++) hash += dStr.charCodeAt(i);
      currentWisdomIdx = hash % WISDOM_PROMPTS.length;
    }
  }

  const p = WISDOM_PROMPTS[currentWisdomIdx];
  quoteEl.textContent = `"${p.text}"`;
  catEl.textContent = p.cat;
}

function renderHeroLine() {
  const active = getActiveTracks();
  const low = Math.min(...active.map(cleanDays));
  const lines =
    low === 0 ? ['Day zero is not failure. It is the start of the next run.',
                 'The streak that lasts usually begins right after one that broke.']
  : low < 3   ? ['The hardest stretch is the one you are standing in.',
                 'Two or three days in, the noise is loudest. Keep walking.']
  : low < 7   ? ['Your brain is starting to notice you mean it.',
                 'Momentum is real now. Protect it.']
  : low < 30  ? ['This is no longer an attempt. It is a pattern.',
                 'You have proven you can. Now prove you will.']
  :             ['You are not resisting anymore. You are just someone who does not do that.',
                 'This is who you are now. Keep the receipts coming.'];
  $('#heroLine').textContent = lines[Math.floor(Math.random() * lines.length)];
}

function renderAll() {
  renderChaserBanner();
  renderBacklogBanner();
  renderGreeting();
  renderTop(); renderRings(); renderToday();
  renderWisdom();
  renderTriggerPlaybook();
  renderHeatmap(); renderStats(); renderPattern();
  renderMilestones(); renderLog();

  if (isTrialEnded() && !S.user.unlocked) {
    openSubModal();
  }
}

/* === 3. Actions ============================================= */
function doCheckin() {
  const target = checkinTarget();
  if (!target) { toast('Nothing to confirm right now.'); return; }

  const active = getActiveTracks();
  const ok = {
    porn: $('#ckPorn')?.checked ?? true,
    nofap: $('#ckFap')?.checked ?? true,
    paidsex: $('#ckPaidSex')?.checked ?? true
  };
  const slipped = active.filter((k) => !ok[k]);
  const when = target === today() ? 'today' : 'that day';

  if (slipped.length) {
    confirmDialog(
      'Log a reset?',
      `You left ${slipped.map((k) => LABEL[k]).join(' and ')} unchecked. ` +
      `That marks ${when} as a break and restarts ` +
      `${slipped.length > 1 ? 'those counters' : 'that counter'} from zero.`,
      'Yes, reset',
      (note) => { slipped.forEach((k) => relapse(k, target, true, note)); },
      { field: { label: 'What was going on?',
                 placeholder: 'Where were you, what time, what set it off?' } }
    );
    return;
  }

  S.checkins[target] = true;
  // Advance clean streak counter on confirmed clean days
  active.forEach((track) => {
    if (diffDays(S.tracks[track].since, target) === 0) {
      S.tracks[track].since = addDays(target, -1);
    }
  });
  const msgs = active.map((t) => `${cleanDays(t)}d ${t === 'porn' ? 'porn-free' : t === 'nofap' ? 'abstinent' : 'paid-sex free'}`).join(', ');
  logIt(`Confirmed ${target} clean — ${msgs}.`);
  save(); renderAll(); burst();
  toast(target === today() ? 'Day closed out. That one is yours.' : 'Yesterday confirmed.');
}

/* `when` is the day the break happened - not necessarily today, since
   you might be confirming yesterday. The counter restarts from the day
   AFTER it, because the break day itself was never clean. */
function relapse(track, when = today(), silent = false, note = '') {
  const had = Math.max(0, diffDays(S.tracks[track].since, when));
  const restart = addDays(when, 1);

  S.tracks[track].best = Math.max(S.tracks[track].best, had);
  if (restart > S.tracks[track].since) S.tracks[track].since = restart;

  const existing = S.relapses.find((r) => r.date === when && r.track === track);
  if (existing) { if (note) existing.note = note; }
  else S.relapses.push({ date: when, track, ts: Date.now(), note: note || undefined });
  delete S.checkins[when];

  logIt(`Reset ${LABEL[track]} on ${when} after ${had} ${had === 1 ? 'day' : 'days'}.`, note);
  save();
  $('#ckPorn').checked = false; $('#ckFap').checked = false;
  if ($('#ckPaidSex')) $('#ckPaidSex').checked = false;
  renderAll(); renderHeroLine();
  toast(silent
    ? 'Logged honestly. That matters more than the number.'
    : `${LABEL[track]} reset. Your best run of ${S.tracks[track].best} still stands.`);
}

/* -- Backup ---------------------------------------------------
   The export is the entire state object, verbatim, wrapped with a
   little provenance. It is plain readable JSON - open it in any
   editor and you can see (and hand-edit) every day you logged. */
function exportData() {
  const payload = {
    app: 'anchor',
    schema: 1,
    exportedAt: new Date().toISOString(),
    timezoneOffsetMinutes: new Date().getTimezoneOffset(),
    state: S
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `anchor-backup-${today()}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Backup saved to your downloads.');
}

function importData(file) {
  const reader = new FileReader();
  reader.onerror = () => toast('Could not read that file.');
  reader.onload = () => {
    let payload;
    try { payload = JSON.parse(reader.result); }
    catch { toast("That file isn't valid JSON."); return; }

    const incoming = payload?.state ?? payload;
    const looksRight = incoming && incoming.tracks &&
      TRACKS.every((k) => typeof incoming.tracks[k]?.since === 'string');
    if (!looksRight) { toast("That doesn't look like an Anchor backup."); return; }

    confirmDialog(
      'Replace everything?',
      `This backup has ${Object.keys(incoming.checkins ?? {}).length} check-ins and ` +
      `${(incoming.relapses ?? []).length} resets. It will overwrite what is here now.`,
      'Import it',
      () => {
        S = { ...seed(), ...incoming, version: 1 };
        if (!Array.isArray(S.urges)) S.urges = [];
        save(); registerVisit(); renderAll(); renderHeroLine();
        toast('Backup restored.');
      }
    );
  };
  reader.readAsText(file);
}

function wipe() {
  localStorage.removeItem(KEY);
  S = seed();
  registerVisit();
  save(); renderAll(); renderHeroLine();
  toast('Everything erased. Fresh start.');
}

/* === 4. Feedback: toast, modal, sparks ====================== */
let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('is-up');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-up'), 3600);
}

/* `opts.field` adds an optional free-text box; its value is handed to
   the callback. Used to capture what was going on during a reset. */
let onConfirm = null;
function confirmDialog(title, body, yesLabel, cb, opts = {}) {
  $('#modalTitle').textContent = title;
  $('#modalBody').textContent  = body;
  $('#modalYes').textContent   = yesLabel;

  const field = $('#modalField'), input = $('#modalInput');
  input.value = '';
  field.hidden = !opts.field;
  if (opts.field) {
    $('#modalFieldLabel').textContent = opts.field.label;
    input.placeholder = opts.field.placeholder ?? '';
  }

  onConfirm = cb;
  $('#modal').hidden = false;
  (opts.field ? input : $('#modalNo')).focus();
}
function closeModal() { $('#modal').hidden = true; onConfirm = null; }

/* Particle burst from the check-in button. */
function burst() {
  const r = $('#btnCheckin').getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  const colors = ['#67e8f9', '#a78bfa', '#22d3ee', '#f0abfc', '#ffffff'];
  for (let i = 0; i < 28; i++) {
    const s = document.createElement('span');
    const a = Math.random() * Math.PI * 2;
    const d = 90 + Math.random() * 150;
    s.className = 'spark';
    s.style.cssText =
      `left:${cx}px;top:${cy}px;background:${colors[i % colors.length]};` +
      `--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;` +
      `animation-delay:${Math.random() * 120}ms`;
    document.body.append(s);
    setTimeout(() => s.remove(), 1400);
  }
}

/* === 5. Urge mode - paced breathing + grounding prompts ===== */
const PROMPTS = [
  'The wave peaks in about ten minutes. You only have to outlast it.',
  'You are not fighting a craving. You are watching one pass.',
  'Stand up. Leave this room. The thought does not follow well.',
  'Whatever you are about to feel afterwards — you already know it. Skip to knowing it.',
  'Name five things you can see right now. Out loud.',
  'The version of you tomorrow morning is watching this exact moment.',
  'Put your phone in another room. Sixty seconds. That is the whole plan.',
  'You have already done two days. This is the same decision, again.',
  'Cold water on your face. Ten deep breaths. Then decide.',
  'Urges are weather, not orders.'
];

const TOTAL_CYCLES = 4;
let breathTimer = null, breathCycles = 0;

function switchUrgeTab(step) {
  $$('.urge-tab').forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.step === String(step));
  });
  $$('.urge-step-panel').forEach((panel) => {
    panel.hidden = panel.id !== `urgeStep${step}`;
  });
}

function renderUrgeCircuitChecklist() {
  const container = $('#circuitChecklist');
  if (!container) return;

  const userTriggers = S.user.triggers && S.user.triggers.length > 0 ? S.user.triggers : ['night'];
  const personalizedItems = userTriggers.map((tKey) => {
    const strat = TRIGGER_STRATEGIES[tKey];
    if (!strat) return '';
    const tip = getDailyTriggerTip(tKey);
    return `
      <label class="circuit-check" style="border-left: 2px solid var(--violet); padding-left: 0.5rem; margin-top: 0.2rem;">
        <input type="checkbox" class="cb-item" />
        <span><strong>${strat.title}:</strong> ${tip}</span>
      </label>
    `;
  }).join('');

  container.innerHTML = `
    <span class="circuit-checklist__title">Emergency Circuit Breakers</span>
    <label class="circuit-check">
      <input type="checkbox" class="cb-item" />
      <span>Move to a public space or open room where isolation is broken</span>
    </label>
    <label class="circuit-check">
      <input type="checkbox" class="cb-item" />
      <span>Take a 30-second cold water facial splash to reset heart rate</span>
    </label>

    <span class="circuit-checklist__title" style="margin-top:0.6rem; color:var(--violet-soft);">Your Trigger Action Plan</span>
    ${personalizedItems}
  `;

  $$('#circuitChecklist input').forEach((ck) => {
    ck.addEventListener('change', () => {
      ck.closest('.circuit-check')?.classList.toggle('is-checked', ck.checked);
    });
  });
}

function renderTriggerPlaybook() {
  const container = $('#triggerPlaybookContent');
  if (!container) return;

  const userTriggers = S.user.triggers && S.user.triggers.length > 0 ? S.user.triggers : ['night'];
  const cards = userTriggers.map((tKey) => {
    const strat = TRIGGER_STRATEGIES[tKey];
    if (!strat) return '';
    const tip = getDailyTriggerTip(tKey);
    return `
      <div style="background:var(--bg-2); border:1px solid var(--stroke-hi); padding:0.65rem 0.85rem; border-radius:var(--radius); display:grid; gap:0.2rem;">
        <strong style="color:var(--ink); font-size:var(--step--1);">${strat.title}</strong>
        <p style="color:var(--ink-dim); font-size:0.8rem; margin:0; line-height:1.4;">${tip}</p>
      </div>
    `;
  }).join('');

  container.innerHTML = cards || '<p style="color:var(--ink-faint); font-size:0.8rem;">No triggers selected yet. Tap Edit triggers to set your focus areas.</p>';
}

function openUrge() {
  checkSubLock(() => {
    $('#urge').hidden = false;
    document.body.style.overflow = 'hidden';
    switchUrgeTab(1);
    breathCycles = 0;
    $('#breathCycles').textContent = '1';
    if ($('#urgeNoteInput')) $('#urgeNoteInput').value = '';
    renderUrgeCircuitChecklist();
    nextPrompt();
    runBreath();
  });
}

/* `declared` = you pressed "I'm alright now" rather than pressing Escape.
   Only that counts as riding it out; bailing with Escape logs nothing. */
function closeUrge(declared = false) {
  if (declared) {
    const note = $('#urgeNoteInput')?.value.trim() || '';
    S.urges.push({ ts: Date.now(), cycles: breathCycles, note: note || undefined });
    logIt(
      breathCycles
        ? `Rode out an urge — ${breathCycles} breathing ${breathCycles === 1 ? 'cycle' : 'cycles'}.`
        : 'Rode out an urge.',
      note
    );
    save(); renderStats(); renderLog();
    toast('Logged. That one you sat through.');
  }
  $('#urge').hidden = true;
  document.body.style.overflow = '';
  clearTimeout(breathTimer);
  $('#breather').className = 'breather';
}

/* 4s in, 4s hold, 6s out - slow exhale is what calms the system.
   The counter shows the cycle you are IN, not cycles finished, so it
   reads 1 immediately instead of sitting on 0 for fourteen seconds. */
function runBreath() {
  const el = $('#breather'), word = $('#breathWord');
  const phase = (cls, text, ms, next) => {
    el.className = 'breather ' + cls;
    word.textContent = text;
    breathTimer = setTimeout(next, ms);
  };
  const cycle = () => {
    $('#breathCycles').textContent =
      String(Math.min(breathCycles + 1, TOTAL_CYCLES));
    phase('is-in', 'Breathe in', 4000, () =>
    phase('is-hold', 'Hold', 4000, () =>
    phase('', 'Breathe out', 6000, () => {
      breathCycles++;
      if (breathCycles >= TOTAL_CYCLES) {
        word.textContent = 'Well done';
        $('#breathCycles').textContent = String(TOTAL_CYCLES);
        toast('Four cycles — about a minute you did not act on it.');
      } else cycle();
    })));
  };
  cycle();
}

function nextPrompt() {
  const el = $('#urgePrompt');
  el.style.opacity = '0';
  setTimeout(() => {
    let p; do { p = PROMPTS[Math.floor(Math.random() * PROMPTS.length)]; }
    while (p === el.textContent && PROMPTS.length > 1);
    el.textContent = p;
    el.style.transition = 'opacity .5s';
    el.style.opacity = '1';
  }, 220);
}

/* === 6. Ambient particle field ============================== */
function startField() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = document.getElementById('field');
  const ctx = c.getContext('2d');
  let w, h, dots, raf;

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = c.width  = innerWidth  * dpr;
    h = c.height = innerHeight * dpr;
    c.style.width = innerWidth + 'px';
    c.style.height = innerHeight + 'px';
    const count = Math.round((innerWidth * innerHeight) / 22000);
    dots = Array.from({ length: Math.min(count, 130) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.16 * dpr,
      vy: (Math.random() - 0.5) * 0.16 * dpr,
      r: (Math.random() * 1.5 + 0.4) * dpr,
      a: Math.random() * 0.5 + 0.15
    }));
  };

  const frame = () => {
    ctx.clearRect(0, 0, w, h);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = w; else if (d.x > w) d.x = 0;
      if (d.y < 0) d.y = h; else if (d.y > h) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(190, 215, 255, ${d.a})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  };

  addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(frame);
  });
  resize(); frame();
}

/* === 7. Scroll reveal ======================================= */
function startReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el) => io.observe(el));
}

/* === Referral & Referral Tracking =========================== */
function checkReferral() {
  const params = new URLSearchParams(window.location.search);
  let ref = (params.get('ref') || params.get('code') || S.user.referrer || 'direct').toLowerCase().trim();
  
  if (S.deletedPartners && S.deletedPartners.includes(ref)) {
    ref = 'direct';
  }

  S.user.referrer = ref;
  if (!S.partners) S.partners = {};
  if (!S.partners[ref]) {
    S.partners[ref] = { visits: 0, subs: 0 };
  }
  S.partners[ref].visits = (S.partners[ref].visits || 0) + 1;
  save();

  if (db && ref !== 'direct') {
    try {
      db.collection('deleted_referrals').doc(ref).get().then((doc) => {
        if (doc.exists && doc.data()?.disabled) {
          if (!S.deletedPartners) S.deletedPartners = [];
          if (!S.deletedPartners.includes(ref)) S.deletedPartners.push(ref);
          delete S.partners[ref];
          S.user.referrer = 'direct';
          save();
          return;
        }
        db.collection('referrals').doc(ref).set({
          visits: firebase.firestore.FieldValue.increment(1),
          lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      }).catch(() => {});
    } catch {}
  }
}

/* === Greeting & Theme Renderer ============================= */
function renderGreeting() {
  const el = $('#userGreeting');
  if (!el) return;
  const name = S.user.name ? S.user.name.trim() : '';
  const hr = new Date().getHours();
  const icon = hr < 12 ? '☀️' : hr < 17 ? '⚡' : '🌙';
  const timeStr = hr < 12 ? 'Good morning' : hr < 17 ? 'Stay steady' : 'Good evening';
  const streak = Math.min(...TRACKS.map(cleanDays));
  
  if (name) {
    el.innerHTML = streak >= 7 
      ? `<span class="pill pill--greeting">${icon} ${timeStr},&nbsp;<strong>${name}</strong>! &nbsp;•&nbsp; <span style="color:var(--cyan-soft); font-weight:700;">${streak}d clean</span></span>` 
      : `<span class="pill pill--greeting">${icon} ${timeStr},&nbsp;<strong>${name}</strong>!</span>`;
  } else {
    el.innerHTML = `<span class="pill pill--greeting">${icon} Welcome to&nbsp;<strong>Anchor</strong>!</span>`;
  }

  document.documentElement.setAttribute('data-user-gender', S.user.gender || 'him');
  document.documentElement.setAttribute('data-theme', S.user.theme || 'dark');
  
  if (streak >= 30) {
    document.documentElement.setAttribute('data-theme-style', 'gold');
  } else {
    document.documentElement.removeAttribute('data-theme-style');
  }
}

/* === Onboarding Controller ================================== */
let currentObStep = 1;

function openOnboarding(step = 1) {
  currentObStep = step;
  $('#onboarding').hidden = false;
  document.body.style.overflow = 'hidden';

  const nameInput = $('#obName');
  if (nameInput) nameInput.value = S.user.name || '';

  $$('.onboarding-option[data-gender]').forEach((btn) => {
    btn.classList.toggle('is-selected', btn.dataset.gender === (S.user.gender || 'him'));
  });

  $$('.onboarding-option[data-theme-mode]').forEach((btn) => {
    btn.classList.toggle('is-selected', btn.dataset.themeMode === (S.user.theme || 'dark'));
  });

  const userTriggers = S.user.triggers || ['night'];
  $$('.onboarding-option[data-trigger]').forEach((btn) => {
    btn.classList.toggle('is-selected', userTriggers.includes(btn.dataset.trigger));
  });

  switchObStep(step);
}

function switchObStep(step) {
  currentObStep = step;
  const pct = (step / 5) * 100;
  $('#onboardingProgress').style.width = `${pct}%`;
  
  for (let i = 1; i <= 5; i++) {
    const el = $(`#obStep${i}`);
    if (el) el.hidden = (i !== step);
  }
}

function finishOnboarding() {
  const nameInput = $('#obName');
  if (nameInput && nameInput.value.trim()) S.user.name = nameInput.value.trim();
  
  const selGenderBtn = $('.onboarding-option.is-selected[data-gender]');
  if (selGenderBtn) S.user.gender = selGenderBtn.dataset.gender;

  const selThemeBtn = $('.onboarding-option.is-selected[data-theme-mode]');
  if (selThemeBtn) S.user.theme = selThemeBtn.dataset.themeMode;

  const active = [];
  if ($('#obCkPorn')?.checked) active.push('porn');
  if ($('#obCkFap')?.checked) active.push('nofap');
  if ($('#obCkPaidSex')?.checked) active.push('paidsex');
  S.user.activeTracks = active.length > 0 ? active : ['porn'];

  const selTriggerBtns = $$('.onboarding-option.is-selected[data-trigger]');
  S.user.triggers = Array.from(selTriggerBtns).map((btn) => btn.dataset.trigger);
  if (S.user.triggers.length === 0) S.user.triggers = ['night'];

  S.user.onboarded = true;
  save();

  $('#onboarding').hidden = true;
  document.body.style.overflow = '';
  renderAll();
  
  // Launch feature tour immediately after onboarding
  openTour(1);
}

/* === Interactive Dashboard Tour Controller ==================== */
let currentTourStep = 1;

function openTour(step = 1) {
  const modal = $('#tourModal');
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  // Inject track definitions based on user gender and active tracks
  const defsEl = $('#tourTrackDefinitions');
  if (defsEl) {
    const isHer = (S.user.gender === 'her');
    const active = getActiveTracks();
    let html = '';
    if (active.includes('porn')) {
      html += `
      <div class="onboarding-option" style="cursor:default; padding:0.6rem;">
        <span class="onboarding-option__icon">${isHer ? '🌸' : '⚡'}</span>
        <div>
          <strong style="color:var(--ink); display:block; margin-bottom:0.1rem;">${isHer ? 'Erotica & Porn-free' : 'Porn-free'}</strong>
          <div style="color:var(--ink-dim); font-size:0.78rem;">${isHer ? 'Quitting explicit videos, smut novels (Wattpad/AO3), and romance erotica.' : 'Quitting adult video content, explicit feeds, and digital triggers.'}</div>
        </div>
      </div>`;
    }
    if (active.includes('nofap')) {
      html += `
      <div class="onboarding-option" style="cursor:default; padding:0.6rem;">
        <span class="onboarding-option__icon">${isHer ? '🌸' : '⚡'}</span>
        <div>
          <strong style="color:var(--ink); display:block; margin-bottom:0.1rem;">${isHer ? 'Self-love & Balance' : 'No masturbation'}</strong>
          <div style="color:var(--ink-dim); font-size:0.78rem;">${isHer ? 'Overcoming compulsive solo masturbation and using sexual pleasure as an emotional crutch.' : 'Overcoming compulsive PMO, solo coping, and brain fog dopamine crashes.'}</div>
        </div>
      </div>`;
    }
    if (active.includes('paidsex')) {
      html += `
      <div class="onboarding-option" style="cursor:default; padding:0.6rem;">
        <span class="onboarding-option__icon">${isHer ? '🌸' : '⚡'}</span>
        <div>
          <strong style="color:var(--ink); display:block; margin-bottom:0.1rem;">${isHer ? 'Healthy Boundaries' : 'No paid sex'}</strong>
          <div style="color:var(--ink-dim); font-size:0.78rem;">${isHer ? 'Protecting yourself from toxic hookup culture, transactional validation, and high-risk intimacy.' : 'Abstaining from prostitution, escorts, and transactional hookups.'}</div>
        </div>
      </div>`;
    }
    defsEl.innerHTML = html;
  }

  switchTourStep(step);
}

function switchTourStep(step) {
  currentTourStep = step;
  const pct = (step / 4) * 100;
  const progFill = $('#tourProgress');
  if (progFill) progFill.style.width = `${pct}%`;

  for (let i = 1; i <= 4; i++) {
    const el = $(`#tourStep${i}`);
    if (el) el.hidden = (i !== step);
  }

  const backBtn = $('#btnTourBack');
  if (backBtn) backBtn.hidden = (step === 1);

  const nextBtn = $('#btnTourNext');
  if (nextBtn) {
    if (step === 4) {
      nextBtn.innerHTML = `<span class="btn__glow"></span>Finish Guide 🚀`;
    } else {
      nextBtn.innerHTML = `<span class="btn__glow"></span>Next ➔`;
    }
  }
}

function finishTour() {
  S.user.tourCompleted = true;
  save();
  const modal = $('#tourModal');
  if (modal) modal.hidden = true;
  document.body.style.overflow = '';
}

/* === Subscription Trial & Lock ============================= */
function isTrialEnded() {
  return diffDays(S.firstRun, today()) >= 2;
}

function openSubModal() {
  const modal = $('#subModal');
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  const name = S.user.name ? encodeURIComponent(S.user.name) : 'User';
  const ref = S.user.referrer ? encodeURIComponent(S.user.referrer) : 'direct';
  const waUrl = `https://wa.me/2348021184502?text=Hello!%20I%20am%20${name}%20(Ref:%20${ref}).%20I%20want%20to%20get%20my%20Anchor%20Monthly%20Passcode%20(₦2,000)`;
  const payBtn = $('#btnPayWhatsApp');
  if (payBtn) payBtn.href = waUrl;
}

function closeSubModal() {
  $('#subModal').hidden = true;
  document.body.style.overflow = '';
}

function unlockApp(key) {
  const cleanKey = (key || '').toUpperCase().trim();
  if (cleanKey.length >= 4) {
    S.user.unlocked = true;
    S.user.unlockKey = cleanKey;
    const ref = S.user.referrer || 'direct';
    if (!S.partners) S.partners = {};
    if (!S.partners[ref]) S.partners[ref] = { visits: 1, subs: 0 };
    S.partners[ref].subs = (S.partners[ref].subs || 0) + 1;
    save();

    if (db) {
      try {
        db.collection('referrals').doc(ref.toLowerCase()).set({
          subs: firebase.firestore.FieldValue.increment(1),
          lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      } catch {}
    }

    closeSubModal();
    toast('Lifetime Access Unlocked! 🎉');
    renderAll();
    return true;
  }
  toast('Invalid passcode. Check your WhatsApp confirmation.');
  return false;
}

function checkSubLock(actionCallback) {
  if (!isTrialEnded() || S.user.unlocked) {
    actionCallback();
  } else {
    openSubModal();
  }
}

/* === Secret Admin Dashboard ================================ */
let brandClickCount = 0;

function openAdmin() {
  const pin = prompt('Enter Admin Master PIN:');
  if (pin !== '9999' && pin !== '2026') {
    toast('Invalid Admin PIN.');
    return;
  }
  $('#adminModal').hidden = false;
  document.body.style.overflow = 'hidden';
  renderAdminTable();
}

function closeAdmin() {
  $('#adminModal').hidden = true;
  document.body.style.overflow = '';
}

function deletePartner(code) {
  const cleanCode = (code || '').toLowerCase().trim();
  if (!cleanCode) return;
  
  if (cleanCode === 'direct') {
    toast('Cannot delete default "direct" channel.');
    return;
  }

  if (!confirm(`Delete partner code "${cleanCode.toUpperCase()}"? Analytics & payouts for this code will be permanently disabled.`)) {
    return;
  }

  if (S.partners && S.partners[cleanCode]) {
    delete S.partners[cleanCode];
  }

  if (!Array.isArray(S.deletedPartners)) S.deletedPartners = [];
  if (!S.deletedPartners.includes(cleanCode)) {
    S.deletedPartners.push(cleanCode);
  }
  save();

  if (db) {
    try {
      db.collection('referrals').doc(cleanCode).delete();
      db.collection('deleted_referrals').doc(cleanCode).set({
        disabled: true,
        deletedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) {}
  }

  toast(`Partner code "${cleanCode.toUpperCase()}" deleted.`);
  updateAdminUI();
}

function renderAdminTable() {
  if (!S.partners) S.partners = { direct: { visits: 1, subs: 0 } };
  
  if (db) {
    try {
      db.collection('referrals').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          const data = doc.data();
          const code = doc.id;
          if (S.deletedPartners && S.deletedPartners.includes(code)) return;
          if (!S.partners[code]) S.partners[code] = { visits: 0, subs: 0 };
          if (data.visits) S.partners[code].visits = data.visits;
          if (data.subs) S.partners[code].subs = data.subs;
        });
        updateAdminUI();
      }, () => updateAdminUI());
    } catch {
      updateAdminUI();
    }
  } else {
    updateAdminUI();
  }
}

function updateAdminUI() {
  let totalVisits = 0, totalSubs = 0;
  Object.entries(S.partners).forEach(([code, p]) => {
    if (S.deletedPartners && S.deletedPartners.includes(code)) return;
    totalVisits += p.visits || 0;
    totalSubs += p.subs || 0;
  });

  const grossRev = totalSubs * 2000;
  const netProfit = grossRev * 0.5;

  if ($('#adminTotalVisits')) $('#adminTotalVisits').textContent = String(totalVisits);
  if ($('#adminTotalSubs')) $('#adminTotalSubs').textContent = String(totalSubs);
  if ($('#adminTotalRev')) $('#adminTotalRev').textContent = `₦${grossRev.toLocaleString()}`;
  if ($('#adminNetProfit')) $('#adminNetProfit').textContent = `₦${netProfit.toLocaleString()}`;

  const tbody = $('#adminPartnerTableBody');
  if (!tbody) return;

  const validEntries = Object.entries(S.partners).filter(([code]) => {
    return !S.deletedPartners || !S.deletedPartners.includes(code);
  });

  const rows = validEntries.map(([code, p]) => {
    const pRev = (p.subs || 0) * 2000;
    const pPayout = pRev * 0.5;
    const deleteBtn = code !== 'direct'
      ? `<button class="btn-delete-partner" data-delete-partner="${code}" style="background:rgba(244,63,94,0.1); border:1px solid rgba(244,63,94,0.3); color:#f87171; cursor:pointer; font-size:0.75rem; padding:0.25rem 0.5rem; border-radius:var(--radius); font-weight:600;" title="Delete Partner Code">🗑️ Delete</button>`
      : `<span style="color:var(--ink-faint); font-size:0.75rem;">Default</span>`;
    return `
      <tr>
        <td><strong>${code.toUpperCase()}</strong></td>
        <td>${p.visits || 0}</td>
        <td>${p.subs || 0}</td>
        <td>₦${pRev.toLocaleString()}</td>
        <td>₦${pPayout.toLocaleString()}</td>
        <td style="text-align:right;">${deleteBtn}</td>
      </tr>
    `;
  });

  tbody.innerHTML = rows.join('') || '<tr><td colspan="6">No partner traffic logged yet.</td></tr>';

  $$('.btn-delete-partner').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const code = e.currentTarget.dataset.deletePartner;
      deletePartner(code);
    });
  });
}

function generatePasscode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'ANC-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const field = $('#adminGenKey');
  if (field) field.value = code;
  toast(`Passcode generated: ${code}`);
}

/* === Dedicated Partner Portal Controller ================= ===== */
let currentPartnerCode = '';

function openPartnerModal(code = '') {
  const modal = $('#partnerModal');
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  const cleanCode = (code || '').toLowerCase().trim();
  if (cleanCode) {
    const input = $('#partnerCodeInput');
    if (input) input.value = cleanCode;
    fetchPartnerStats(cleanCode);
  } else {
    const promptBlock = $('#partnerCodePromptBlock');
    const statsBlock = $('#partnerStatsBlock');
    if (promptBlock) promptBlock.hidden = false;
    if (statsBlock) statsBlock.hidden = true;
  }
}

function closePartnerModal() {
  const modal = $('#partnerModal');
  if (modal) modal.hidden = true;
  document.body.style.overflow = '';
}

function fetchPartnerStats(code) {
  const cleanCode = (code || '').toLowerCase().trim();
  if (!cleanCode) {
    toast('Please enter your referral code.');
    return;
  }

  if (S.deletedPartners && S.deletedPartners.includes(cleanCode)) {
    toast('This partner referral code has been deactivated by Admin.');
    const promptBlock = $('#partnerCodePromptBlock');
    const statsBlock = $('#partnerStatsBlock');
    if (promptBlock) promptBlock.hidden = false;
    if (statsBlock) statsBlock.hidden = true;
    return;
  }

  currentPartnerCode = cleanCode;
  const activeCodeEl = $('#partnerActiveCode');
  if (activeCodeEl) activeCodeEl.textContent = cleanCode.toUpperCase();
  const shareUrl = `${window.location.origin}${window.location.pathname}?ref=${cleanCode}`;
  const shareUrlInput = $('#partnerShareUrl');
  if (shareUrlInput) shareUrlInput.value = shareUrl;

  const renderStats = (visits, subs) => {
    if ($('#partnerVisits')) $('#partnerVisits').textContent = String(visits || 0);
    if ($('#partnerSubs')) $('#partnerSubs').textContent = String(subs || 0);
    const payout = (subs || 0) * 1000; // 50% of ₦2,000
    if ($('#partnerPayout')) $('#partnerPayout').textContent = `₦${payout.toLocaleString()}`;
    if ($('#partnerCodePromptBlock')) $('#partnerCodePromptBlock').hidden = true;
    if ($('#partnerStatsBlock')) $('#partnerStatsBlock').hidden = false;
  };

  const localVisits = S.partners?.[cleanCode]?.visits || 0;
  const localSubs = S.partners?.[cleanCode]?.subs || 0;
  renderStats(localVisits, localSubs);

  if (db) {
    try {
      db.collection('referrals').doc(cleanCode).onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          renderStats(data.visits || 0, data.subs || 0);
        }
      }, () => {});
    } catch {}
  }
}

/* === Dedicated Settings Controller ========================== */
function openSettings() {
  const modal = $('#settingsModal');
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  const active = getActiveTracks();
  const ckPorn = $('#setCkPorn');
  if (ckPorn) {
    ckPorn.checked = active.includes('porn');
    ckPorn.closest('.circuit-check')?.classList.toggle('is-checked', ckPorn.checked);
  }
  const ckFap = $('#setCkFap');
  if (ckFap) {
    ckFap.checked = active.includes('nofap');
    ckFap.closest('.circuit-check')?.classList.toggle('is-checked', ckFap.checked);
  }
  const ckPaidSex = $('#setCkPaidSex');
  if (ckPaidSex) {
    ckPaidSex.checked = active.includes('paidsex');
    ckPaidSex.closest('.circuit-check')?.classList.toggle('is-checked', ckPaidSex.checked);
  }

  $$('.onboarding-option[data-set-theme]').forEach((btn) => {
    btn.classList.toggle('is-selected', btn.dataset.setTheme === (S.user.theme || 'dark'));
  });

  const userTriggers = S.user.triggers || ['night'];
  $$('.onboarding-option[data-set-trigger]').forEach((btn) => {
    btn.classList.toggle('is-selected', userTriggers.includes(btn.dataset.setTrigger));
  });
}

function closeSettings() {
  const modal = $('#settingsModal');
  if (modal) modal.hidden = true;
  document.body.style.overflow = '';
}

function saveSettings() {
  const active = [];
  if ($('#setCkPorn')?.checked) active.push('porn');
  if ($('#setCkFap')?.checked) active.push('nofap');
  if ($('#setCkPaidSex')?.checked) active.push('paidsex');
  if (active.length === 0) {
    toast('Please keep at least 1 active boundary tracked.');
    return;
  }
  S.user.activeTracks = active;

  const selThemeBtn = $('.onboarding-option.is-selected[data-set-theme]');
  if (selThemeBtn) S.user.theme = selThemeBtn.dataset.setTheme;

  const selTriggerBtns = $$('.onboarding-option.is-selected[data-set-trigger]');
  S.user.triggers = Array.from(selTriggerBtns).map((btn) => btn.dataset.setTrigger);
  if (S.user.triggers.length === 0) S.user.triggers = ['night'];

  save();
  closeSettings();
  renderAll();
  toast('Preferences saved! 🎉');
}

/* === Data Erasure & Security Reset Controller ================= */
function openResetDataModal() {
  const modal = $('#resetDataModal');
  if (!modal) return;
  modal.hidden = false;

  const input = $('#resetDataPhraseInput');
  if (input) input.value = '';

  const confirmBtn = $('#btnConfirmResetData');
  if (confirmBtn) {
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = '0.4';
    confirmBtn.style.cursor = 'not-allowed';
  }
}

function closeResetDataModal() {
  const modal = $('#resetDataModal');
  if (modal) modal.hidden = true;
}

function executeDataErasure() {
  const input = $('#resetDataPhraseInput');
  const phrase = (input?.value || '').trim().toLowerCase();

  if (phrase !== 'delete my data') {
    toast('Please type "delete my data" to confirm.');
    return;
  }

  // Delete document in Cloud Firestore if connected
  if (db && currentUser) {
    try {
      db.collection('users').doc(currentUser.uid).delete();
    } catch (e) {}
  }

  // Sign out of Firebase Auth to unbind current Cloud UID
  if (auth) {
    try {
      auth.signOut();
    } catch (e) {}
  }

  // Erase device local storage
  try {
    localStorage.clear();
  } catch (e) {
    console.error(e);
  }

  // Re-seed default state with onboarded = false
  S = seed();
  S.user.onboarded = false;
  save();

  // Close modals
  closeResetDataModal();
  closeSettings();
  renderAll();

  // Redirect directly to Onboarding Step 1
  openOnboarding(1);
  toast('All data erased. Welcome to a fresh start! 🌱');
}

/* === 8. Wiring ============================================== */
function bind() {
  $('#btnSettings')?.addEventListener('click', openSettings);
  $('#btnEditPlaybookTriggers')?.addEventListener('click', openSettings);
  $('#btnSettingsClose')?.addEventListener('click', closeSettings);
  $('#btnSaveSettings')?.addEventListener('click', saveSettings);
  $('#btnReplayTour')?.addEventListener('click', () => {
    closeSettings();
    openTour(1);
  });
  $('#btnOpenResetData')?.addEventListener('click', openResetDataModal);
  $('#btnResetDataClose')?.addEventListener('click', closeResetDataModal);
  $('#btnCancelResetData')?.addEventListener('click', closeResetDataModal);
  $('#btnConfirmResetData')?.addEventListener('click', executeDataErasure);
  $('#resetDataPhraseInput')?.addEventListener('input', (e) => {
    const val = (e.target.value || '').trim().toLowerCase();
    const btn = $('#btnConfirmResetData');
    if (btn) {
      if (val === 'delete my data') {
        btn.disabled = false;
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
      } else {
        btn.disabled = true;
        btn.style.opacity = '0.4';
        btn.style.cursor = 'not-allowed';
      }
    }
  });
  $('#btnTourClose')?.addEventListener('click', finishTour);
  $('#btnTourBack')?.addEventListener('click', () => switchTourStep(Math.max(1, currentTourStep - 1)));
  $('#btnTourNext')?.addEventListener('click', () => {
    if (currentTourStep >= 4) {
      finishTour();
    } else {
      switchTourStep(currentTourStep + 1);
    }
  });
  $('.brand__mark')?.addEventListener('click', () => {
    brandClickCount++;
    if (brandClickCount >= 5) {
      brandClickCount = 0;
      openAdmin();
    }
  });

  // Settings modal option selections
  $$('.onboarding-option[data-set-theme]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.onboarding-option[data-set-theme]').forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
    });
  });
  $$('.onboarding-option[data-set-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('is-selected');
    });
  });

  // Onboarding option selections
  $$('.onboarding-option[data-theme-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.onboarding-option[data-theme-mode]').forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      S.user.theme = btn.dataset.themeMode;
      save();
      renderGreeting();
    });
  });
  $$('.onboarding-option[data-gender]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.onboarding-option[data-gender]').forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      S.user.gender = btn.dataset.gender;
      save();
      renderGreeting();
      renderRings();
    });
  });
  $$('.onboarding-option[data-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('is-selected');
    });
  });

  $('#btnObNext1')?.addEventListener('click', () => switchObStep(2));
  $('#btnObBack2')?.addEventListener('click', () => switchObStep(1));
  $('#btnObNext2')?.addEventListener('click', () => switchObStep(3));
  $('#btnObBack3')?.addEventListener('click', () => switchObStep(2));
  $('#btnObNext3')?.addEventListener('click', () => {
    const active = [];
    if ($('#obCkPorn')?.checked) active.push('porn');
    if ($('#obCkFap')?.checked) active.push('nofap');
    if ($('#obCkPaidSex')?.checked) active.push('paidsex');
    if (active.length === 0) {
      toast('Please select at least 1 boundary to track.');
      return;
    }
    switchObStep(4);
  });
  $('#btnObBack4')?.addEventListener('click', () => switchObStep(3));
  $('#btnObNext4')?.addEventListener('click', () => switchObStep(5));
  $('#btnObBack5')?.addEventListener('click', () => switchObStep(4));
  $('#btnObFinish')?.addEventListener('click', finishOnboarding);

  // Sub Lock Modal
  $('#btnSubClose')?.addEventListener('click', closeSubModal);
  $('#btnSubUnlock')?.addEventListener('click', () => {
    const input = $('#subKeyInput');
    if (input) unlockApp(input.value);
  });

  // Admin Modal
  $('#btnAdminClose')?.addEventListener('click', closeAdmin);
  $('#btnGenPasscode')?.addEventListener('click', generatePasscode);

  // Partner Modal
  $('#btnPartnerClose')?.addEventListener('click', closePartnerModal);
  $('#btnCheckPartnerStats')?.addEventListener('click', () => {
    const input = $('#partnerCodeInput');
    if (input) fetchPartnerStats(input.value);
  });
  $('#btnCopyPartnerUrl')?.addEventListener('click', () => {
    const input = $('#partnerShareUrl');
    if (input && input.value) {
      navigator.clipboard.writeText(input.value).then(() => toast('Partner link copied! 📋')).catch(() => {
        input.select();
        document.execCommand('copy');
        toast('Partner link copied! 📋');
      });
    }
  });

  $('#btnCheckin').addEventListener('click', doCheckin);
  $('#btnUrge').addEventListener('click', openUrge);
  $('#btnUrgeDone').addEventListener('click', () => closeUrge(true));
  $('#btnUrgeClose')?.addEventListener('click', () => closeUrge(false));
  $('#btnNextPrompt').addEventListener('click', nextPrompt);

  $$('#circuitChecklist input').forEach((input) => {
    input.addEventListener('change', (e) => {
      const label = e.target.closest('.circuit-check');
      if (label) label.classList.toggle('is-checked', e.target.checked);
    });
  });

  $$('[data-relapse]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const track = btn.dataset.relapse;
      confirmDialog(
        `Reset ${LABEL[track]}?`,
        `Your current run of ${cleanDays(track)} days ends and today is marked as a break. ` +
        `Your record stays saved.`,
        'Reset it',
        (note) => relapse(track, today(), false, note),
        { field: { label: 'What was going on?',
                   placeholder: 'Where were you, what time, what set it off?' } }
      );
    });
  });

  $('#btnExport').addEventListener('click', exportData);
  $('#btnImport').addEventListener('click', () => $('#fileImport').click());
  $('#fileImport').addEventListener('change', (e) => {
    const f = e.target.files?.[0];
    if (f) importData(f);
    e.target.value = '';           // allow re-picking the same file
  });

  $('#btnWipe').addEventListener('click', openResetDataModal);

  $('#modalYes').addEventListener('click', () => {
    const cb = onConfirm;
    const note = $('#modalInput').value.trim();
    closeModal();
    cb?.(note);
  });

  $('#btnChartTable').addEventListener('click', (e) => {
    const t = $('#chartTable');
    t.hidden = !t.hidden;
    e.target.textContent = t.hidden ? 'Show table' : 'Hide table';
    e.target.setAttribute('aria-expanded', String(!t.hidden));
  });
  $('#modalNo')?.addEventListener('click', closeModal);
  $('#modal')?.addEventListener('click', (e) => { if (e.target.id === 'modal') closeModal(); });

  // Backlog and Day Log Modal Bindings
  $('#btnQuickConfirmAll')?.addEventListener('click', confirmAllMissedDays);
  $('#btnOpenBacklogModal')?.addEventListener('click', openBacklogModal);
  $('#btnBacklogModalClose')?.addEventListener('click', closeBacklogModal);
  $('#btnBacklogModalCancel')?.addEventListener('click', closeBacklogModal);
  $('#btnConfirmSelectedBacklog')?.addEventListener('click', saveBacklogModal);

  $('#btnDayLogClose')?.addEventListener('click', closeDayLogModal);
  $('#btnSaveDayClean')?.addEventListener('click', saveDayLogClean);
  $('#btnLogDayRelapse')?.addEventListener('click', logDaySlip);
  $('#btnClearDayLog')?.addEventListener('click', clearDayLog);

  $('#dayLogModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'dayLogModal') closeDayLogModal();
  });
  $('#backlogModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'backlogModal') closeBacklogModal();
  });

  addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!$('#modal').hidden) closeModal();
    else if (!$('#dayLogModal').hidden) closeDayLogModal();
    else if (!$('#backlogModal').hidden) closeBacklogModal();
    else if (!$('#urge').hidden) closeUrge();
  });

  $('#btnFloatUrge')?.addEventListener('click', openUrge);
  $('#btnNextWisdom')?.addEventListener('click', () => renderWisdom(true));

  $$('.urge-tab').forEach((tab) => {
    tab.addEventListener('click', () => switchUrgeTab(tab.dataset.step));
  });

  window.addEventListener('scroll', () => {
    const floatBar = $('#floatBar');
    const hero = $('#hero');
    if (!floatBar || !hero) return;
    const heroBottom = hero.getBoundingClientRect().bottom;
    floatBar.classList.toggle('is-visible', heroBottom < 0);
  }, { passive: true });

  const tooltip = $('#cellTooltip');
  if (tooltip) {
    const heatmap = $('#heatmap');
    heatmap?.addEventListener('mouseover', (e) => {
      const cell = e.target.closest('.cell');
      if (!cell || !cell.dataset.date) return;
      const dateStr = parse(cell.dataset.date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
      tooltip.innerHTML = `
        <span class="cell-tooltip__date">${dateStr}</span>
        <span class="cell-tooltip__status">${cell.dataset.state || ''}</span>
        ${cell.dataset.note ? `<span class="cell-tooltip__note">"${cell.dataset.note}"</span>` : ''}
      `;
      const rect = cell.getBoundingClientRect();
      tooltip.style.left = `${Math.min(window.innerWidth - 290, Math.max(10, rect.left - 80))}px`;
      tooltip.style.top = `${Math.max(10, rect.top - 70)}px`;
      tooltip.classList.add('is-show');
    });
    heatmap?.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget?.closest('#heatmap')) {
        tooltip.classList.remove('is-show');
      }
    });
  }

  // A tab left open overnight should notice the new day.
  setInterval(() => {
    if (S.lastOpen !== today()) { registerVisit(); renderAll(); }
  }, 60_000);

  setInterval(renderChaserBanner, 30_000);

  // Coming back to a backgrounded tab repaints from state, since any
  // rAF-driven values were frozen while it was hidden.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    if (S.lastOpen !== today()) registerVisit();
    renderAll();
  });

  // Another tab changed the data? Stay in sync.
  addEventListener('storage', (e) => {
    if (e.key === KEY) { load(); renderAll(); }
  });
}

/* === 9. Offline / installable ===============================
   Service workers are forbidden on file://, so this is a no-op
   when you just double-click index.html. Serve the folder over
   localhost (or any https host) and the app becomes installable
   and works with no network at all. */
function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  const okOrigin = location.protocol === 'https:' ||
                   ['localhost', '127.0.0.1'].includes(location.hostname);
  if (!okOrigin) return;
  navigator.serviceWorker.register('./sw.js').catch(() => {
    /* Offline support is a bonus; never let it break the app. */
  });
}

/* -- Boot ----------------------------------------------------- */
load();
initFirebase();
checkReferral();
registerVisit();
bind();
renderAll();
renderHeroLine();
startField();
startReveal();
registerSW();

if (!S.user.onboarded) {
  openOnboarding(1);
}

if (window.location.hash === '#admin') {
  openAdmin();
}

if (window.location.hash.startsWith('#partner')) {
  const hash = window.location.hash;
  const match = hash.match(/code=([^&]+)/) || hash.match(/ref=([^&]+)/);
  const code = match ? match[1] : '';
  openPartnerModal(code);
}

})();

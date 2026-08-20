/* ===============================================================
   ANCHOR - streaks that hold
   Universal Habit Mastery & Recovery Architecture
   =============================================================== */

(() => {
'use strict';

const KEY = 'anchor.state.v1';

/* === Pure Minimalist Geometric SVGs Library (Zero AI Emojis) == */
const SVGS = {
  // Utility SVGs
  edit: `<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  crown: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle; display:inline-block;"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>`,

  // Triggers
  night: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  social: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>`,
  stress: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  boredom: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  financial: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><path d="M15 9.5c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5 0 1.5 4.5 1 4.5 2.5 0 .8-.7 1.5-1.5 1.5h-3c-.8 0-1.5-.7-1.5-1.5"/></svg>`,
  social_pressure: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  fatigue: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="10" x="2" y="7" rx="2"/><line x1="22" x2="22" y1="11" y2="13"/><line x1="6" y1="12" x2="10" y2="12"/></svg>`,
  cravings: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  lonely: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,

  // Habits
  screentime: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="3"/><circle cx="12" cy="11" r="4"/><polyline points="12 9 12 11 14 11"/></svg>`,
  doomscrolling: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  gaming: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="6"/></svg>`,
  bingetv: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="7" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
  gambling: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 8h.01"/><path d="M16 8h.01"/><path d="M12 12h.01"/><path d="M8 16h.01"/><path d="M16 16h.01"/></svg>`,
  porn: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
  nofap: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  paidsex: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
  smoking: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><path d="M18 8c0-2.5-2-2.5-2-5"/><path d="M22 8c0-2.5-2-2.5-2-5"/></svg>`,
  alcohol: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 22 8 0"/><path d="M12 15v7"/><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9C7.5 6 7 8 7 10a5 5 0 0 0 5 5Z"/></svg>`,
  junkfood: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a9 9 0 0 0-9 9c0 4.97 4.03 9 9 9s9-4.03 9-9a9 9 0 0 0-9-9Z"/><path d="M9 12h6"/></svg>`,
  nailbiting: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`,
  spending: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  workout: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14"/><path d="M2 20h20"/><path d="M14 12v.01"/></svg>`,
  reading: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 2v20"/></svg>`,
  meditation: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
  hydration: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  sleep: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  deepwork: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`
};

/* === Comprehensive Habit Library & Multi-Mode Definitions ===== */
const HABIT_LIBRARY = {
  // ── Mode: Limit (Screen Time & Device Budget) ───────────────
  screentime: {
    id: 'screentime',
    name: 'Screen Time Cap',
    mode: 'limit',
    defaultTarget: 60,
    unit: 'mins',
    cat: 'digital',
    desc: 'Keep total daily phone and device screen time strictly under budget.'
  },
  doomscrolling: {
    id: 'doomscrolling',
    name: 'Social Media & Doomscrolling',
    mode: 'limit',
    defaultTarget: 30,
    unit: 'mins',
    cat: 'digital',
    desc: 'Cap Instagram, TikTok, Twitter/X, and short-form video reels.'
  },
  gaming: {
    id: 'gaming',
    name: 'Video Games Moderation',
    mode: 'limit',
    defaultTarget: 60,
    unit: 'mins',
    cat: 'digital',
    desc: 'Moderate gaming sessions to reclaim daytime focus hours.'
  },
  bingetv: {
    id: 'bingetv',
    name: 'Binge TV / Streaming',
    mode: 'limit',
    defaultTarget: 60,
    unit: 'mins',
    cat: 'digital',
    desc: 'Cap passive TV, Netflix, and late-night YouTube rabbit holes.'
  },

  // ── Mode: Abstinence (Sobriety & Abstinence Streaks) ────────
  gambling: {
    id: 'gambling',
    name: 'No Gambling & Sports Betting',
    mode: 'abstinence',
    cat: 'sobriety',
    desc: 'Zero sports bets, casino games, slot machines, or risky day-trading.',
    unit: 'days'
  },
  porn: {
    id: 'porn',
    name: 'Porn-free',
    herName: 'Erotica & Porn-free',
    mode: 'abstinence',
    cat: 'recovery',
    desc: 'Quitting explicit videos, erotic fiction, and digital triggers.',
    unit: 'days'
  },
  nofap: {
    id: 'nofap',
    name: 'No Masturbation',
    herName: 'Self-love & Balance',
    mode: 'abstinence',
    cat: 'recovery',
    desc: 'No compulsive solo coping; resetting dopamine receptor sensitivity.',
    unit: 'days'
  },
  paidsex: {
    id: 'paidsex',
    name: 'No Paid Sex / Hookups',
    herName: 'Healthy Boundaries',
    mode: 'abstinence',
    cat: 'recovery',
    desc: 'Protecting finances, emotional health, and authentic intimacy.',
    unit: 'days'
  },
  smoking: {
    id: 'smoking',
    name: 'Smoke & Vape-Free',
    mode: 'abstinence',
    cat: 'sobriety',
    desc: 'Zero nicotine, cigarettes, cigars, or vaping puffs.',
    unit: 'days'
  },
  alcohol: {
    id: 'alcohol',
    name: 'Alcohol-Free Sobriety',
    mode: 'abstinence',
    cat: 'sobriety',
    desc: 'Zero alcohol, beer, wine, cocktails, or spirits.',
    unit: 'days'
  },
  junkfood: {
    id: 'junkfood',
    name: 'No Junk Food & Sugar Binges',
    mode: 'abstinence',
    cat: 'wellness',
    desc: 'Clean eating without late-night sugar & ultra-processed bingeing.',
    unit: 'days'
  },
  nailbiting: {
    id: 'nailbiting',
    name: 'No Nail Biting / Picking',
    mode: 'abstinence',
    cat: 'wellness',
    desc: 'Overcoming nervous, subconscious body-focused habits.',
    unit: 'days'
  },
  spending: {
    id: 'spending',
    name: 'No Impulse Shopping',
    mode: 'abstinence',
    cat: 'wellness',
    desc: 'Intentional budget adherence without emotional checkout clicks.',
    unit: 'days'
  },

  // ── Mode: Build (Positive Daily Momentum) ───────────────────
  workout: {
    id: 'workout',
    name: 'Daily Exercise & Movement',
    mode: 'build',
    defaultTarget: 30,
    unit: 'mins',
    cat: 'wellness',
    desc: 'Consistent daily workout, run, stretch, or gym training.'
  },
  reading: {
    id: 'reading',
    name: 'Daily Book Reading',
    mode: 'build',
    defaultTarget: 20,
    unit: 'mins',
    cat: 'wellness',
    desc: 'Expand your mind with insightful physical books or educational reading.'
  },
  meditation: {
    id: 'meditation',
    name: 'Mindfulness & Meditation',
    mode: 'build',
    defaultTarget: 10,
    unit: 'mins',
    cat: 'wellness',
    desc: 'Daily conscious breathwork, presence, and calm stillness.'
  },
  hydration: {
    id: 'hydration',
    name: 'Daily Hydration (2-3L)',
    mode: 'build',
    defaultTarget: 8,
    unit: 'glasses',
    cat: 'wellness',
    desc: 'Drink ample clean water throughout the morning and afternoon.'
  },
  sleep: {
    id: 'sleep',
    name: 'In Bed by 11:00 PM',
    mode: 'build',
    defaultTarget: 1,
    unit: 'target',
    cat: 'wellness',
    desc: 'Disciplined sleep schedule without phones or screens in bed.'
  },
  deepwork: {
    id: 'deepwork',
    name: 'Deep Work Focus Block',
    mode: 'build',
    defaultTarget: 60,
    unit: 'mins',
    cat: 'wellness',
    desc: 'Uninterrupted focus session dedicated to your core project or mission.'
  }
};

function getHabitMeta(id) {
  if (HABIT_LIBRARY[id]) return HABIT_LIBRARY[id];
  return {
    id,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    mode: 'abstinence',
    cat: 'wellness',
    unit: 'days',
    desc: 'Habit anchor'
  };
}

function getTrackLabel(id) {
  const meta = getHabitMeta(id);
  if (S?.user?.gender === 'her' && meta.herName) return meta.herName;
  return meta.name;
}

function getHabitActionLabel(id) {
  if (id === 'porn') return S?.user?.gender === 'her' ? 'Stayed away from erotica & porn' : 'Stayed away from porn';
  if (id === 'nofap') return S?.user?.gender === 'her' ? 'Maintained self-love & balance' : 'Stayed away from masturbation';
  if (id === 'paidsex') return S?.user?.gender === 'her' ? 'Maintained healthy boundaries' : 'Stayed away from paid sex/hookups';
  if (id === 'gambling') return 'Stayed away from gambling';
  if (id === 'smoking') return 'Stayed away from smoking/vaping';
  if (id === 'alcohol') return 'Stayed away from alcohol';
  if (id === 'junkfood') return 'Stayed away from junk food';
  return `Stayed away from ${getTrackLabel(id)}`;
}

function getHabitResetLabel(id) {
  if (id === 'porn') return 'Reset Porn';
  if (id === 'nofap') return 'Reset Masturbation';
  if (id === 'paidsex') return 'Reset Paid Sex / Hookups';
  if (id === 'gambling') return 'Reset Gambling';
  if (id === 'smoking') return 'Reset Smoking';
  if (id === 'alcohol') return 'Reset Alcohol';
  if (id === 'junkfood') return 'Reset Junk Food';
  return `Reset ${getTrackLabel(id)}`;
}

function getHabitSvg(id) {
  return SVGS[id] || `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
}

function getActiveTracks() {
  if (typeof S !== 'undefined' && S && S.user && Array.isArray(S.user.activeTracks)) {
    return S.user.activeTracks;
  }
  return [];
}

// Urge-eligible habits are habits with impulses/cravings (Abstinence and Screen Time Limits)
function getUrgeEligibleTracks() {
  const active = getActiveTracks();
  return active.filter((id) => {
    const mode = getHabitMode(id);
    return mode === 'abstinence' || mode === 'limit';
  });
}

const MILESTONES = [1, 3, 7, 14, 21, 30, 60, 90, 180, 365];
const MILESTONE_NAMES = {
  1: 'First day down',      3: 'Past the first wobble',  7: 'One week',
  14: 'Two weeks',          21: 'Habit forming',         30: 'One month',
  60: 'Two months',         90: 'Ninety days',          180: 'Half a year',
  365: 'A full year'
};

const MILESTONE_PERKS = {
  7: {
    id: 'day7',
    badgeSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#cd7f32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    title: '7-Day Milestone: Momentum Builder',
    subtitle: '1 Week on Track',
    desc: 'You have cleared the acute impulse resistance window. Your prefrontal cortex is taking back intentional control.',
    perk: 'Unlocked: Detailed 24-Hour Slip & Urge Pattern Analytics and Deep Circuit Breaker Toolkit.'
  },
  14: {
    id: 'day14',
    badgeSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    title: '14-Day Milestone: Cognitive Clarity',
    subtitle: '2 Weeks Strong',
    desc: 'Prefrontal cortex regulation is cementing. Compulsive impulses are losing their automatic grip.',
    perk: 'Unlocked: Guided Coherence Respiration Engine and Emergency Audio Circuit Breakers.'
  },
  30: {
    id: 'day30',
    badgeSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    title: '30-Day Milestone: Royal Gold Edition',
    subtitle: '1 Month Mastered — Prestige Tier',
    desc: 'A full month of continuous discipline and self-mastery. You have proven that impulse is no match for your resolve.',
    perk: 'Unlocked: Prestige Royal Gold Theme & Golden Status Badge across the entire app!',
    hasTheme: true
  },
  60: {
    id: 'day60',
    badgeSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/></svg>`,
    title: '60-Day Milestone: Iron Will',
    subtitle: '2 Months Strong',
    desc: 'Healthy baseline neural pathways have cemented. Identity shift from "trying to moderate" to "someone who is free".',
    perk: 'Unlocked: Advanced Relapse Prevention Matrix and Long-term Identity Anchor.'
  },
  90: {
    id: 'day90',
    badgeSvg: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#e879f9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    title: '90-Day Milestone: Dopamine Reboot Master',
    subtitle: '3 Months — Complete Mastery',
    desc: 'Full clinical dopamine reboot achieved. Focus capacity and cognitive drive restored to natural peak.',
    perk: 'Unlocked: Master Reboot Seal & Permanent Anchor Legend Status.'
  }
};

/* === Habit-Specific AI Reflections & Psychology ============== */
const HABIT_WISDOM_DATABASE = {
  gambling: [
    { text: "The house always wins by mathematics, not luck. The only way to beat the bookie or casino is to never place the bet.", cat: "Financial Mastery" },
    { text: "Chasing a loss is the brain's desperation to escape regret. The fastest way to win your money back is to keep your earnings in your bank.", cat: "Gambling Recovery" },
    { text: "Variable reward schedules trigger the highest dopamine spikes in neuroscience. Recognizing the psychological trap is how you disarm it.", cat: "Neuroscience of Betting" },
    { text: "Gambling sells the fantasy of financial freedom while methodically draining your real financial sovereignty.", cat: "Wealth & Integrity" },
    { text: "When the urge to gamble strikes, remind yourself: no amount of winnings was ever enough to make you stop in the past.", cat: "Clarity on Cravings" }
  ],
  screentime: [
    { text: "Your attention is your life. Algorithms are engineered to monetize your time by trapping your brain in infinite scroll loops.", cat: "Digital Sovereignty" },
    { text: "Turn your display to Grayscale. Color is an artificial dopamine trigger; black & white restores conscious choice.", cat: "Attention Defense" },
    { text: "Capping screen time creates the mental stillness required for deep thinking, creative work, and real life relationships.", cat: "Deep Focus" }
  ],
  doomscrolling: [
    { text: "Doomscrolling numbs discomfort without providing real rest. Step away from the screen and engage with physical reality.", cat: "Digital Detox" },
    { text: "You don't need to know what everyone is outraged about today. Guard your mental peace like your life depends on it.", cat: "Mindful Consumption" },
    { text: "Replace 30 minutes of passive feed scrolling with 15 minutes of a physical book or quiet contemplation.", cat: "Habit Replacement" }
  ],
  gaming: [
    { text: "Virtual achievements provide artificial dopamine without building real-world capacity. Reclaim your daytime momentum.", cat: "Focus & Reality" }
  ],
  bingetv: [
    { text: "Passive autoplay is designed to keep you seated. Choose active rest, sleep, or creative pursuits.", cat: "Intentional Living" }
  ],
  porn: [
    { text: "Pixelated arousal hijacks your natural mating drive. Real intimacy, confidence, and self-respect are built on truth, not artificial superstimuli.", cat: "Dopamine Reboot" },
    { text: "Urges are physical waves of neurochemical energy. You don't have to fight the wave; you just have to outlast the 10-minute crest.", cat: "Emotional Resilience" },
    { text: "The 48-hour chaser effect after a slip is neurological downregulation. Stay hyper-vigilant during the reset window.", cat: "Relapse Prevention" }
  ],
  nofap: [
    { text: "Self-discipline is choosing what you want most over what you want right now. Channel your vitality into your mission.", cat: "Energy Transmutation" },
    { text: "When loneliness or boredom strikes, seek real human connection or physical training rather than solo coping.", cat: "Authentic Drive" }
  ],
  paidsex: [
    { text: "Transactional intimacy leaves the soul empty. Honor your personal dignity and build genuine connection.", cat: "Self-Respect" }
  ],
  smoking: [
    { text: "Nicotine creates the very anxiety it pretends to relieve. Every craving you ride out is the addiction losing its power.", cat: "Nicotine Freedom" },
    { text: "A physical craving lasts 3 to 5 minutes whether you smoke or not. Drink a glass of ice water and outlast the clock.", cat: "Craving Management" }
  ],
  alcohol: [
    { text: "Sobriety gives you tomorrow morning back. Alcohol borrows happiness from tomorrow with compound interest.", cat: "Sober Clarity" },
    { text: "You don't need liquid confidence; you need authentic presence, honest self-trust, and nervous system regulation.", cat: "Authentic Living" }
  ],
  sleep: [
    { text: "Sleep is the foundation of cognitive willpower and emotional regulation. Everything looks clearer after 8 hours in bed.", cat: "Circadian Rhythm" },
    { text: "Artificial blue light after 10:00 PM suppresses melatonin and tricks your brain into thinking it is noon. Protect your rest.", cat: "Sleep Hygiene" }
  ],
  junkfood: [
    { text: "Sugar binges are emotional soothing in disguise. Feed your soul with rest, hydration, and connection, not ultra-processed carbs.", cat: "Nutritional Discipline" },
    { text: "Close the kitchen at 8:00 PM. Nighttime cravings are almost always fatigue masquerading as hunger.", cat: "Circadian Health" }
  ],
  spending: [
    { text: "Practice the 48-hour cooling rule on non-essential purchases. True wealth is having money you don't need to show off.", cat: "Financial Peace" }
  ],
  workout: [
    { text: "Movement is medicine for the mind. When you lack motivation, just put your shoes on and do the first 5 minutes.", cat: "Physical Momentum" }
  ],
  reading: [
    { text: "Reading physical books rebuilds sustained attention spans that modern digital feeds deliberately fragment.", cat: "Cognitive Expansion" }
  ],
  meditation: [
    { text: "Between stimulus and response there is a space. In that space lies your freedom and your power to choose.", cat: "Mindful Presence" }
  ],
  general: [
    { text: "Consistency beats intensity every single time. Small daily anchors compound into massive life transformations.", cat: "Compounding Habits" },
    { text: "A slip-up is a data point, not a verdict. Analyze the trigger, reset with integrity, and keep moving forward.", cat: "Growth Mindset" }
  ]
};

/* === Habit-Specific Trigger Playbook Strategies =============== */
const TRIGGER_STRATEGIES = {
  financial: {
    title: 'Loss chasing & Betting urges',
    svgKey: 'financial',
    cat: 'gambling',
    tips: [
      'Stop immediately. Delete gambling and betting apps from your phone right now and block betting URLs on your browser.',
      'Recognize "tilt": emotional distress after a loss makes you bet irrationally. Close your banking app and step outside.',
      'Remember: no past win ever made you quit. Every dollar kept in your account is a guaranteed 100% return.',
      'Transfer tempting cash into a locked savings vault or hand temporary card control to an accountability partner.'
    ]
  },
  social: {
    title: 'Notifications & Feeds',
    svgKey: 'social',
    cat: 'digital',
    tips: [
      'Switch phone display to Grayscale immediately. Color stimulates dopamine; black & white kills compulsive scrolling.',
      'Put app timers on social media apps (max 15 mins/day) or delete them from your home screen.',
      'Take a 20-minute screen blackout. Leave the device in a drawer and focus on physical reality.',
      'Unfollow or mute any account that triggers envy, gambling tips, or mindless scrolling.'
    ]
  },
  night: {
    title: 'Late night in bed',
    svgKey: 'night',
    cat: 'recovery',
    tips: [
      'Charge phone across the room in Airplane Mode before lying down. Keep your hands visible above covers.',
      'Leave your phone outside your bedroom 30 minutes before sleep. Read a physical book instead.',
      'When an urge strikes in bed, sit up immediately and put your feet flat on the cold floor.',
      'Set a strict sleep schedule: in bed by 10:30 PM, phone out of arm’s reach.'
    ]
  },
  stress: {
    title: 'Stress & Anxiety',
    svgKey: 'stress',
    cat: 'general',
    tips: [
      'Do 30 seconds of cold water facial splash or 4-7-8 breathing to activate your parasympathetic nervous system.',
      'Stress is physical tension. Do 10 deep belly breaths and unclench your jaw right now.',
      'Write down what is stressing you on paper. Brain dump the anxiety instead of escaping into compulsive habits.',
      'Go for a brisk 5-minute walk outside. Physical movement releases cortisol faster than isolation.'
    ]
  },
  boredom: {
    title: 'Boredom & Idle time',
    svgKey: 'boredom',
    cat: 'general',
    tips: [
      'Do 15 push-ups or squats immediately or step into a public room. Never remain isolated with unstructured time.',
      'Boredom is a signal to create, not consume. Pick up a book, clean your desk, or call a friend.',
      'Change your location right now. Walk into the kitchen or step outside for fresh air.',
      'Schedule your evening hour-by-hour so idle time doesn’t become high-risk time.'
    ]
  },
  social_pressure: {
    title: 'Social parties & Peer pressure',
    svgKey: 'social_pressure',
    cat: 'sobriety',
    tips: [
      'Order sparkling water with lime immediately. Having a glass in hand stops 90% of people from offering drinks.',
      'You never owe anyone an explanation for prioritizing your clarity and discipline.',
      'Have an exit strategy ready. If an environment compromises your sobriety or values, leave with dignity.',
      'Remind yourself how incredible you will feel tomorrow morning when you wake up fresh and clear-headed.'
    ]
  },
  fatigue: {
    title: 'Fatigue & Low energy',
    svgKey: 'fatigue',
    cat: 'general',
    tips: [
      'Drink a large glass of ice water and lie down to sleep. Never scroll or browse when exhausted.',
      'Exhaustion lowers your prefrontal willpower guard rails. Recognize physical tiredness as HALT (Tired).',
      'Take a 15-minute power nap or take a cool shower to reset alertness without dopamine spikes.',
      'Close all screens off 30 minutes before bed.'
    ]
  },
  cravings: {
    title: 'Emotional eating & Cravings',
    svgKey: 'cravings',
    cat: 'wellness',
    tips: [
      'Drink a large glass of cold water and wait 10 minutes. 80% of sugar cravings are mild dehydration.',
      'Brush your teeth with mint toothpaste immediately. It resets your palate and signals the end of eating.',
      'Ask yourself: "Am I truly hungry, or am I bored, stressed, or lonely?"',
      'Keep junk food out of the house so you never have to fight friction at your weakest moments.'
    ]
  },
  lonely: {
    title: 'Loneliness & Isolation',
    svgKey: 'lonely',
    cat: 'general',
    tips: [
      'Reach out to a close friend or accountability contact, listen to an uplifting podcast, or write in your journal.',
      'Compulsive digital escapes and betting isolate you further. Real human connection is the antidote.',
      'Step outside into a public cafe, library, or park. Being around people breaks the isolation loop.',
      'Treat yourself with compassion. Acknowledge the emotional pain without running into old habits.'
    ]
  }
};

function getDailyTriggerTip(tKey) {
  const strat = TRIGGER_STRATEGIES[tKey];
  if (!strat || !strat.tips || !strat.tips.length) return '';
  const dStr = today();
  let hash = 0;
  for (let i = 0; i < dStr.length; i++) hash += dStr.charCodeAt(i);
  const idx = hash % strat.tips.length;
  return strat.tips[idx];
}

/* === Ultra-Smart Habit-Tailored Urge Protocols =============== */
const HABIT_URGE_PROTOCOLS = {
  gambling: {
    realityCheck: '<strong>Financial Reality Check:</strong> The house wins by math. A bet cannot fix a past loss; it only steals tomorrow’s peace. Close banking & betting apps right now.',
    cadenceName: 'Box Breathing for Impulse De-escalation (4s In • 4s Hold • 4s Out • 4s Hold)',
    inTime: 4000, holdTime: 4000, outTime: 4000, holdPostTime: 4000,
    prompts: [
      'The bookie wants you to tilt. Walking away right now is a guaranteed 100% financial win.',
      'Every dollar left in your account is freedom. Put the phone down.',
      'No win in the past ever made you stop. Skip the cycle.',
      'Stand up, leave the room, and take 10 deep breaths.'
    ],
    circuitBreakers: [
      'Delete gambling, betting, and trading apps from your phone immediately.',
      'Step away from your laptop and phone for 15 minutes.',
      'Move to a public space or call an accountability contact.',
      'Acknowledge "tilt": loss chasing produces 100% negative mathematical outcome.'
    ]
  },

  screentime: {
    realityCheck: '<strong>Attention Defense Check:</strong> Algorithms are engineered to monetize your time by trapping your brain. Reclaim your sovereignty.',
    cadenceName: 'Coherence Respiration (4s In • 4s Hold • 6s Slow Exhale)',
    inTime: 4000, holdTime: 4000, outTime: 6000, holdPostTime: 0,
    prompts: [
      'Turn your phone display to Grayscale right now. Color is an artificial dopamine trap.',
      'Put your phone in another room for 15 minutes. Notice how quickly the phantom pull dissolves.',
      'Passive feed scrolling numbs discomfort without giving you real rest.',
      'Step outside or pick up a physical book for 10 minutes.'
    ],
    circuitBreakers: [
      'Switch phone display to Grayscale (Accessibility Shortcut).',
      'Place device in a closed drawer or across the room.',
      'Do 15 push-ups or gentle physical stretches right now.',
      'Step outside into natural light and look at the distant horizon.'
    ]
  },

  doomscrolling: {
    realityCheck: '<strong>Digital Detox Check:</strong> Passive feed outrage drains mental clarity. Real life is happening in physical space.',
    cadenceName: 'Coherence Respiration (4s In • 4s Hold • 6s Slow Exhale)',
    inTime: 4000, holdTime: 4000, outTime: 6000, holdPostTime: 0,
    prompts: [
      'You do not need to know what social media is outraged about today.',
      'Close all browser tabs and app feeds. Your peace of mind comes first.',
      'Sixty seconds of screen blackout resets your attention span.',
      'Stand up and drink a large glass of cold water.'
    ],
    circuitBreakers: [
      'Close social media apps and lock phone screen.',
      'Splash cold water on face for 30 seconds.',
      'Write down on paper what you actually need to accomplish today.',
      'Put phone on Airplane Mode for the next 30 minutes.'
    ]
  },

  gaming: {
    realityCheck: '<strong>Focus & Momentum Check:</strong> Virtual gaming points provide artificial achievement while real-world goals stall. Turn off the console right now.',
    cadenceName: 'Focus Reset Breath (4s In • 4s Hold • 6s Out)',
    inTime: 4000, holdTime: 4000, outTime: 6000, holdPostTime: 0,
    prompts: [
      'Save game or close client immediately.',
      'Stand up and stretch your neck and shoulders.',
      'Real-world progress builds permanent satisfaction.',
      'Step outside into natural light.'
    ],
    circuitBreakers: [
      'Save game and power off computer/console.',
      'Walk out of the room for 15 minutes.',
      'Drink a large glass of cold water.',
      'Engage in a physical real-world task.'
    ]
  },

  bingetv: {
    realityCheck: '<strong>Intentional Time Check:</strong> Autoplay streaming feeds passive consumption. Reclaim your evening for rest, learning, or connection.',
    cadenceName: 'Evening Calming Breath (4s In • 4s Hold • 6s Out)',
    inTime: 4000, holdTime: 4000, outTime: 6000, holdPostTime: 0,
    prompts: [
      'Stop autoplay and turn off the TV.',
      'Put the remote control in another room.',
      'One more episode never feels as good as a full night of sleep.',
      'Pick up a physical book instead.'
    ],
    circuitBreakers: [
      'Turn off the screen and place remote out of reach.',
      'Dim room lights to begin winding down.',
      'Drink herbal tea or cold water.',
      'Begin your evening bedtime routine.'
    ]
  },

  porn: {
    realityCheck: '<strong>Clarity & Intimacy Check:</strong> Pixelated arousal is artificial dopamine. Real confidence, self-respect, and intimacy are built on truth.',
    cadenceName: 'Urge Surfing Breathing (4s In • 4s Hold • 6s Slow Exhale)',
    inTime: 4000, holdTime: 4000, outTime: 6000, holdPostTime: 0,
    prompts: [
      'The wave peaks in about ten minutes. You only have to outlast it.',
      'Whatever you are about to feel afterwards — you already know it. Skip to knowing it.',
      'Stand up. Leave this room. The thought does not follow well.',
      'Cold water on your face. Ten deep breaths. Then decide.'
    ],
    circuitBreakers: [
      'Take a 2-minute cold shower or splash cold water on face.',
      'Move to a public space (living room, cafe, gym) where isolation is broken.',
      'Do 20 rapid squats or push-ups to transmute physical energy.',
      'Leave your phone outside the room.'
    ]
  },

  nofap: {
    realityCheck: '<strong>Vitality & Drive Check:</strong> Compulsive solo coping drains dopamine receptors and motivation. Transmute this physical energy into your mission.',
    cadenceName: 'Energy Transmutation Breath (4s In • 4s Hold • 6s Out)',
    inTime: 4000, holdTime: 4000, outTime: 6000, holdPostTime: 0,
    prompts: [
      'Channel this drive into physical exercise or creative work.',
      'The temporary relief lasts 5 seconds; the clarity lasts days.',
      'Step out of bedroom immediately.',
      'Take 10 deep belly breaths.'
    ],
    circuitBreakers: [
      'Do 20 push-ups or bodyweight squats immediately.',
      'Leave the room and go to a shared space.',
      'Wash hands and face with cold water.',
      'Focus on your long-term discipline goals.'
    ]
  },

  paidsex: {
    realityCheck: '<strong>Dignity & Boundary Check:</strong> Transactional intimacy leaves an emotional void. Protect your finances, personal health, and authentic self-worth.',
    cadenceName: 'Grounding Centering Breath (4s In • 4s Hold • 6s Out)',
    inTime: 4000, holdTime: 4000, outTime: 6000, holdPostTime: 0,
    prompts: [
      'Close all communication and messaging apps right now.',
      'Your dignity and financial peace are worth far more than a fleeting encounter.',
      'Reach out to a trusted friend or family member.',
      'Take a walk outside in public air.'
    ],
    circuitBreakers: [
      'Delete messaging and contact apps immediately.',
      'Leave the current physical location or hotel room.',
      'Lock your credit cards / banking access.',
      'Call an accountability contact or mentor.'
    ]
  },

  alcohol: {
    realityCheck: '<strong>Sober Clarity Check:</strong> Alcohol borrows happiness from tomorrow with compound interest. Drink cold water; this craving will peak and dissolve in minutes.',
    cadenceName: 'Parasympathetic Calming Breath (4s In • 4s Hold • 6s Out)',
    inTime: 4000, holdTime: 4000, outTime: 6000, holdPostTime: 0,
    prompts: [
      'A craving lasts 3 to 5 minutes whether you drink or not.',
      'Tomorrow morning is waiting for you fresh, sharp, and clear.',
      'Order or pour sparkling water with ice and lime.',
      'You never owe anyone an explanation for prioritizing your clarity.'
    ],
    circuitBreakers: [
      'Drink a tall glass of ice-cold sparkling water with lime.',
      'Leave the high-risk environment or party immediately.',
      'Call your accountability partner or sober friend.',
      'Focus on how good tomorrow morning will feel waking up clean.'
    ]
  },

  smoking: {
    realityCheck: '<strong>Nicotine Freedom Check:</strong> The craving is the addiction dying. Every urge you outlast permanently weakens the neural receptor loop.',
    cadenceName: 'Deep Oxygenation Breath (4s In • 4s Hold • 6s Out)',
    inTime: 4000, holdTime: 4000, outTime: 6000, holdPostTime: 0,
    prompts: [
      'Take 10 deep belly breaths of clean fresh air.',
      'Drink a large glass of ice water through a straw.',
      'A nicotine craving peaks for 3 minutes. Outlast the timer.',
      'Your lungs and cardiovascular stamina thank you right now.'
    ],
    circuitBreakers: [
      'Drink a tall glass of ice water immediately.',
      'Chew sugar-free mint gum or eat a healthy snack.',
      'Step into fresh air and take 10 deep breaths.',
      'Wash your hands and face with cool water.'
    ]
  },

  junkfood: {
    realityCheck: '<strong>Nutritional Discipline Check:</strong> Late-night cravings are emotional soothing seeking dopamine, not true hunger. Drink water and brush your teeth.',
    cadenceName: 'Craving Delay Breath (4s In • 4s Hold • 6s Out)',
    inTime: 4000, holdTime: 4000, outTime: 6000, holdPostTime: 0,
    prompts: [
      'Drink a tall glass of cold water and wait 10 minutes.',
      'Brush your teeth with mint toothpaste — it signals the kitchen is closed.',
      'Ask yourself: "Am I truly hungry, or am I bored, stressed, or tired?"',
      'The momentary taste is not worth breaking your energy and gut health.'
    ],
    circuitBreakers: [
      'Drink a large glass of cold water.',
      'Brush your teeth immediately with mint toothpaste.',
      'Step out of the kitchen and into another room.',
      'Set a 10-minute timer before making any food decision.'
    ]
  },

  nailbiting: {
    realityCheck: '<strong>Subconscious Habit Interruption:</strong> Notice the hand-to-face reflex. Unclench your jaw and keep hands occupied.',
    cadenceName: 'Pattern Interruption Breath (4s In • 4s Hold • 4s Out)',
    inTime: 4000, holdTime: 4000, outTime: 4000, holdPostTime: 0,
    prompts: [
      'Clench your hands into fists for 5 seconds, then relax completely.',
      'Apply hand lotion or grab a stress ball/pen.',
      'Notice the physical trigger without acting on autopilot.',
      'Keep your hands resting flat on your desk or lap.'
    ],
    circuitBreakers: [
      'Clench fists for 5 seconds and slowly release.',
      'Apply hand cream or moisturizer.',
      'Hold an object (pen, stress ball, tea mug) in both hands.',
      'Take 3 deep conscious breaths.'
    ]
  },

  spending: {
    realityCheck: '<strong>Financial Sovereignty Check:</strong> Impulse purchases provide temporary dopamine followed by buyer’s remorse. Practice the 48-hour cooling rule.',
    cadenceName: 'Impulse Cooling Breath (4s In • 4s Hold • 6s Out)',
    inTime: 4000, holdTime: 4000, outTime: 6000, holdPostTime: 0,
    prompts: [
      'Close shopping app/browser tab immediately.',
      'Apply the 48-Hour Cooling Rule: if you still need it in 2 days, re-evaluate.',
      'Check your bank account balance and celebrate your savings discipline.',
      'Transfer the amount of the tempting purchase into your savings vault.'
    ],
    circuitBreakers: [
      'Close shopping cart and browser tab immediately.',
      'Write the item name down on a 48-hour waitlist.',
      'Calculate how many hours of work the item costs.',
      'Step away from your phone and computer.'
    ]
  },

  general: {
    realityCheck: '<strong>Grounding Reality Check:</strong> Urges are temporary neurochemical weather, not commands. You only have to outlast the wave.',
    cadenceName: 'Coherence Respiration (4s In • 4s Hold • 6s Slow Exhale)',
    inTime: 4000, holdTime: 4000, outTime: 6000, holdPostTime: 0,
    prompts: [
      'You are not fighting a craving. You are watching one pass.',
      'Stand up. Leave this room. The thought does not follow well.',
      'Name five things you can see right now. Out loud.',
      'The version of you tomorrow morning is watching this exact moment.'
    ],
    circuitBreakers: [
      'Do 10 deep belly breaths (4s in, 4s hold, 6s out).',
      'Change physical location or step outside for fresh air.',
      'Splash cold water on face and drink a glass of water.',
      'Write down your current thoughts in the Urge Journal.'
    ]
  }
};

/* -- Date helpers --------------------------------------------- */
const dayMs = 86_400_000;
const key   = (d) => {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};
const parse = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const today = () => key(new Date());
const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return key(d); };
const diffDays = (a, b) => Math.round((parse(b) - parse(a)) / dayMs);

/* -- State Initialization (0 selected by default) ------------- */
function seed() {
  const t = today();
  return {
    version: 1,
    firstRun:   t,
    lastOpen:   null,
    visitStreak: 0,
    bestVisit:   0,
    openDays:   [],
    tracks: {},
    dailyLogs: {},
    checkins: {},
    relapses: [],
    urges:    [],
    log: [],
    user: {
      name: '',
      gender: 'him',
      theme: 'dark',
      triggers: [],       // 0 selected by default!
      activeTracks: [],   // 0 selected by default!
      onboarded: false,
      unlocked: false,
      unlockKey: '',
      goldThemeUnlocked: false,
      goldThemeActive: false
    },
    partners: {
      direct: { visits: 1, subs: 0 }
    },
    deletedPartners: [],
    seenPerks: []
  };
}

let S;
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    S = raw ? JSON.parse(raw) : seed();
  } catch { S = seed(); }
  if (!S || S.version !== 1) S = seed();

  if (!S.tracks) S.tracks = {};
  if (!S.dailyLogs) S.dailyLogs = {};

  Object.keys(HABIT_LIBRARY).forEach((id) => {
    const meta = HABIT_LIBRARY[id];
    if (!S.tracks[id]) {
      S.tracks[id] = {
        since: today(),
        best: 0,
        target: meta?.defaultTarget || 1,
        mode: meta?.mode || 'abstinence'
      };
    }
  });

  if (!S.user) S.user = { name: '', gender: 'him', theme: 'dark', triggers: [], onboarded: false, activeTracks: [] };
  if (!S.user.gender) S.user.gender = 'him';
  if (!Array.isArray(S.user.activeTracks)) S.user.activeTracks = [];
  if (!Array.isArray(S.user.triggers)) S.user.triggers = [];
  if (!S.user.theme) S.user.theme = 'dark';
  if (!Array.isArray(S.seenPerks)) S.seenPerks = [];
  if (typeof S.user.goldThemeUnlocked !== 'boolean') S.user.goldThemeUnlocked = false;
  if (typeof S.user.goldThemeActive !== 'boolean') S.user.goldThemeActive = false;
  if (!S.partners) S.partners = { direct: { visits: S.openDays?.length || 1, subs: S.user.unlocked ? 1 : 0 } };
  if (!Array.isArray(S.deletedPartners)) S.deletedPartners = [];
  if (!Array.isArray(S.relapses)) S.relapses = [];
  if (!Array.isArray(S.urges)) S.urges = [];
}

/* === Firebase Realtime Sync Engine ============================ */
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
      if (!firebase.apps.length && FIREBASE_CONFIG?.projectId && !FIREBASE_CONFIG.projectId.includes("YOUR_API_KEY")) {
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
      console.warn('Firebase sync fallback to local storage:', e);
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
        if (isTrialEnded() && !S.user?.unlocked) {
          openSubModal();
        }
      }
    } else {
      save();
    }
  }).catch(() => {});
}

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); }
  catch { toast('Could not save — storage issue or private mode.'); }

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

/* === Habit Streak & Progress Calculation Engine =============== */
function getHabitTarget(id) {
  if (S.tracks[id]?.target != null) return S.tracks[id].target;
  const meta = getHabitMeta(id);
  return meta.defaultTarget || 1;
}

function getHabitMode(id) {
  if (S.tracks[id]?.mode) return S.tracks[id].mode;
  const meta = getHabitMeta(id);
  return meta.mode || 'abstinence';
}

function getDailyLogValue(dateStr, id) {
  return S.dailyLogs[dateStr]?.[id];
}

function setDailyLogValue(dateStr, id, val) {
  if (!S.dailyLogs[dateStr]) S.dailyLogs[dateStr] = {};
  S.dailyLogs[dateStr][id] = val;
  save();
}

function habitStreak(id) {
  const mode = getHabitMode(id);
  const t = today();
  
  if (mode === 'abstinence') {
    const since = S.tracks[id]?.since || S.firstRun || t;
    return Math.max(0, diffDays(since, t));
  }

  const target = getHabitTarget(id);
  let streak = 0;

  const todayVal = getDailyLogValue(t, id);
  if (todayVal !== undefined) {
    if (mode === 'limit' && todayVal <= target) streak++;
    else if (mode === 'build' && (todayVal === true || todayVal >= target)) streak++;
  }

  for (let i = 1; i <= 365; i++) {
    const d = addDays(t, -i);
    if (d < (S.firstRun || t)) break;
    const val = getDailyLogValue(d, id);
    if (val === undefined) {
      if (S.checkins[d]) {
        streak++;
        continue;
      }
      break;
    }
    if (mode === 'limit') {
      if (val <= target) streak++;
      else break;
    } else if (mode === 'build') {
      if (val === true || val >= target) streak++;
      else break;
    }
  }

  return streak;
}

const nextMilestone = (n) => MILESTONES.find((m) => m > n) ?? null;

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* === Animated Number Counter (Original Smooth Feel) ========== */
function countTo(el, target) {
  if (!el) return;
  const from = Number(el.dataset.val ?? 0);
  el.dataset.val = String(target);
  if (from === target || document.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = String(target);
    return;
  }
  const t0 = performance.now(), dur = 900;
  const tick = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = String(Math.round(from + (target - from) * eased));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* === 1. Visit Streak ========================================= */
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
    ? `Opened Anchor — ${S.visitStreak} days running.`
    : 'Opened Anchor.');
  save();
}

/* === 2. Water Wave Animation with Calming Breathing Cadence === */
let waveRaf = null;
let waveParticles = [];

function initWaveCanvas() {
  const canvas = document.getElementById('waveCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height, step = 0;

  if (waveRaf) {
    cancelAnimationFrame(waveRaf);
    waveRaf = null;
  }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.width = window.innerWidth * dpr;
    height = canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    waveParticles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: height * 0.4 + Math.random() * (height * 0.6),
      r: Math.random() * 2.8 + 1,
      speed: Math.random() * 0.7 + 0.3,
      alpha: Math.random() * 0.5 + 0.2
    }));
  };

  const drawWave = (offsetY, amp, freq, speed, color1, color2) => {
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x <= width; x += 8) {
      const y = offsetY + Math.sin(x * freq + step * speed) * amp + Math.cos(x * freq * 0.6 + step * speed * 0.8) * (amp * 0.4);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, offsetY - amp, 0, height);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    ctx.fillStyle = grad;
    ctx.fill();
  };

  const animate = () => {
    const landing = document.getElementById('welcomeLanding');
    const onboarding = document.getElementById('onboarding');
    
    const shouldAnimate = (landing && !landing.hidden) || (onboarding && !onboarding.hidden);

    if (!shouldAnimate) {
      canvas.style.opacity = '0';
      if (waveRaf) {
        cancelAnimationFrame(waveRaf);
        waveRaf = null;
      }
      return;
    }

    canvas.style.opacity = '1';
    ctx.clearRect(0, 0, width, height);
    step += 0.016;

    // Calming breathing cadence modulation (swells in 4s inhale, gently settles in 6s exhale)
    const breathFactor = (Math.sin(step * 0.38) + 1) / 2;

    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#030612');
    bgGrad.addColorStop(0.5, '#061326');
    bgGrad.addColorStop(1, '#011512');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    const baseH = height * 0.52 - (breathFactor * 35);

    // Layer 1: Deep Indigo Ocean Swell
    drawWave(baseH + 110, 60 + breathFactor * 15, 0.0018, 0.55, 'rgba(49, 46, 129, 0.65)', 'rgba(15, 23, 42, 0.95)');
    // Layer 2: Radiant Deep Violet / Ocean Blue
    drawWave(baseH + 45, 45 + breathFactor * 12, 0.003, 0.85, 'rgba(79, 70, 229, 0.55)', 'rgba(30, 27, 75, 0.85)');
    // Layer 3: Vibrant Glowing Aqua / Cyan
    drawWave(baseH - 25, 35 + breathFactor * 10, 0.0045, 1.15, 'rgba(6, 182, 212, 0.52)', 'rgba(12, 74, 96, 0.9)');
    // Layer 4: Luminous Emerald & Sky Blue Crest
    drawWave(baseH - 75, 22 + breathFactor * 8, 0.006, 1.45, 'rgba(56, 189, 248, 0.42)', 'rgba(5, 150, 105, 0.35)');

    for (const p of waveParticles) {
      p.y -= p.speed * (1 + breathFactor * 0.6);
      if (p.y < height * 0.35) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(165, 243, 252, ${p.alpha})`;
      ctx.fill();
    }

    waveRaf = requestAnimationFrame(animate);
  };

  window.addEventListener('resize', resize, { passive: true });
  resize();
  animate();
}

/* === 3. Dashboard Hero Rings (Original Milestone Progress Formula) === */
const CIRC = 2 * Math.PI * 88;

function renderRings() {
  const container = $('#ringsContainer');
  if (!container) return;

  const active = getActiveTracks();
  container.innerHTML = '';

  if (active.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 2.2rem 1.5rem; background: var(--glass); border: 1px dashed var(--stroke); border-radius: var(--radius-lg); text-align: center;">
        <p style="color: var(--ink); font-size: 1rem; font-weight:600; margin-bottom: 0.3rem;">No active habits selected yet</p>
        <p style="color: var(--ink-dim); font-size: 0.85rem; margin-bottom: 1.2rem;">Choose what you want to quit, moderate, or build daily to unlock your progress dashboard.</p>
        <button class="btn btn--primary" onclick="window.openHabitPickerModal()">
          <span class="btn__glow"></span>Choose Habits to Track ➔
        </button>
      </div>
    `;
    return;
  }

  active.forEach((trackId, index) => {
    const meta = getHabitMeta(trackId);
    const mode = getHabitMode(trackId);
    const target = getHabitTarget(trackId);
    const streak = habitStreak(trackId);
    const next = nextMilestone(streak);
    const label = getTrackLabel(trackId);
    const iconSvg = getHabitSvg(trackId);

    const card = document.createElement('article');
    card.className = `ring-card cascade-flow cascade-delay-${Math.min(index + 3, 6)}`;
    card.dataset.track = trackId;

    // Classic 3-color rotation as on the original site
    const fillClass = index % 3 === 0 ? 'ring__fill--violet' : index % 3 === 1 ? 'ring__fill--cyan' : 'ring__fill--emerald';

    // Original formula: percentage towards next milestone (or 100% if all cleared)
    const ringPct = next ? Math.min(1, Math.max(0.06, streak / next)) : 1;
    const gap = next ? next - streak : 0;
    const subText = next ? `Day ${next} is ${gap === 1 ? 'tomorrow' : `${gap} days away`}` : 'Milestones cleared';

    let actionBtnHtml = '';
    const isDone = Boolean(getDailyLogValue(today(), trackId));

    if (mode === 'build') {
      actionBtnHtml = `<button class="btn ${isDone ? 'btn--ghost' : 'btn--primary'} ring-action-btn" onclick="window.toggleBuildHabit('${trackId}')">${isDone ? 'Mark Undone' : 'Complete Goal ✓'}</button>`;
    } else if (mode === 'limit') {
      actionBtnHtml = `<button class="btn btn--ghost ring-action-btn" onclick="window.openTimeLogModal('${trackId}')">+ Log Time</button>`;
    }

    const strokeOffset = CIRC * (1 - Math.min(1, ringPct));

    let targetPill = '';
    if (mode === 'limit') {
      targetPill = ` • <span style="cursor:pointer; color:var(--cyan-soft); font-weight:600;" onclick="window.openTargetModal('${trackId}')" title="Change Screen Time Cap">Cap: ${target}m ${SVGS.edit}</span>`;
    } else if (mode === 'build') {
      targetPill = ` • <span style="cursor:pointer; color:var(--cyan-soft); font-weight:600;" onclick="window.openTargetModal('${trackId}')" title="Change Daily Goal Target">Goal: ${target}m ${SVGS.edit}</span>`;
    }

    card.innerHTML = `
      <div class="ring-wrap">
        <svg class="ring" viewBox="0 0 200 200" role="img" aria-label="${label} progress">
          <circle class="ring__track" cx="100" cy="100" r="88" />
          <circle class="ring__fill ${fillClass}" cx="100" cy="100" r="88" style="stroke-dashoffset: ${strokeOffset};" />
        </svg>
        <div class="ring-face">
          <span class="ring-face__num" data-count="${trackId}">0</span>
          <span class="ring-face__unit" data-unit="${trackId}">${streak === 1 ? 'day' : 'days'}</span>
        </div>
      </div>
      <h2 class="ring-card__title" style="display:flex; align-items:center; gap:0.45rem; justify-content:center;">
        <span style="display:inline-flex; align-items:center; color:var(--cyan-soft);">${iconSvg}</span>
        <span>${label}</span>
      </h2>
      <p class="ring-card__sub">${subText}${targetPill}</p>
      ${actionBtnHtml}
    `;

    container.append(card);

    // Roll number counter like original site
    const countEl = card.querySelector(`[data-count="${trackId}"]`);
    if (countEl) countTo(countEl, streak);
  });
}

function renderTop() {
  $('#visitStreak').textContent = S.visitStreak;
  $('#pillDate').textContent = new Date().toLocaleDateString(undefined, {
    weekday: 'long', day: 'numeric', month: 'long'
  });
}

const CHECKIN_HOUR = 20;

function checkinTarget() {
  const t = today(), y = addDays(t, -1);
  const lateEnough = new Date().getHours() >= CHECKIN_HOUR;
  const claimable = (d) => !S.checkins[d] && d >= S.firstRun;

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
    const hrs = Math.max(1, CHECKIN_HOUR - new Date().getHours());
    title.textContent = 'Today — in progress';
    btn.textContent = `Check in after ${CHECKIN_HOUR - 12}pm`;
    btn.classList.add('is-waiting');
    $('#checkinState').textContent = `Day in progress (${hrs} ${hrs === 1 ? 'hour' : 'hours'} to close-out).`;
  }

  const grid = $('#todayGrid');
  const resetBtnsContainer = $('#todayResetBtns');
  if (!grid) return;

  grid.innerHTML = '';
  if (resetBtnsContainer) resetBtnsContainer.innerHTML = '';

  if (active.length === 0) {
    grid.innerHTML = `<p style="color:var(--ink-dim); font-size:0.88rem; padding:0.5rem 0;">No active habits yet. Use the "Manage Habits" button to choose your habits.</p>`;
    return;
  }

  active.forEach((trackId) => {
    const meta = getHabitMeta(trackId);
    const mode = getHabitMode(trackId);
    const label = getTrackLabel(trackId);
    const habitTarget = getHabitTarget(trackId);
    const iconSvg = getHabitSvg(trackId);

    if (mode === 'abstinence') {
      const row = document.createElement('label');
      row.className = 'check';
      row.dataset.check = trackId;
      const isChecked = S.checkins[target || t] || !S.relapses.some(r => r.date === (target || t) && r.track === trackId);
      
      row.innerHTML = `
        <input type="checkbox" id="ck_${trackId}" ${isChecked ? 'checked' : ''} />
        <span class="check__box" aria-hidden="true"></span>
        <span class="check__text">
          <strong style="display:flex; align-items:center; gap:0.4rem;">
            <span style="color:var(--cyan-soft); display:inline-flex;">${iconSvg}</span>
            ${getHabitActionLabel(trackId)}
          </strong>
          <small>${meta.desc || 'Zero engagement, maintained discipline.'}</small>
        </span>
      `;
      grid.append(row);

      if (resetBtnsContainer) {
        const rBtn = document.createElement('button');
        rBtn.className = 'btn btn--danger-ghost';
        rBtn.dataset.relapse = trackId;
        rBtn.textContent = getHabitResetLabel(trackId);
        rBtn.addEventListener('click', () => confirmRelapse(trackId));
        resetBtnsContainer.append(rBtn);
      }
    } else if (mode === 'limit') {
      const row = document.createElement('div');
      row.className = 'today-habit-row';
      const logged = getDailyLogValue(today(), trackId) ?? 0;
      const isOver = logged > habitTarget;

      row.innerHTML = `
        <div class="today-habit-row__left">
          <span class="today-habit-row__icon">${iconSvg}</span>
          <div class="today-habit-row__info">
            <strong>${label}</strong>
            <small style="display:flex; align-items:center; gap:0.35rem;">
              <span>Daily Limit: Max ${habitTarget} ${meta.unit || 'mins'}</span>
              <button class="habit-target-pill-btn" onclick="window.openTargetModal('${trackId}')" title="Change max screen time limit">${habitTarget}m ${SVGS.edit}</button>
            </small>
          </div>
        </div>
        <div class="today-time-control">
          <button class="quick-stepper-btn" onclick="window.stepHabitTime('${trackId}', -15)">-15m</button>
          <span class="today-time-badge ${isOver ? 'is-over' : ''}" onclick="window.openTimeLogModal('${trackId}')" title="Click to log exact minutes">
            ${logged}m / ${habitTarget}m ${isOver ? SVGS.alert : '✓'}
          </span>
          <button class="quick-stepper-btn" onclick="window.stepHabitTime('${trackId}', 15)">+15m</button>
        </div>
      `;
      grid.append(row);
    } else if (mode === 'build') {
      const row = document.createElement('div');
      row.className = 'today-habit-row';
      const isDone = Boolean(getDailyLogValue(today(), trackId));

      row.innerHTML = `
        <div class="today-habit-row__left">
          <span class="today-habit-row__icon">${iconSvg}</span>
          <div class="today-habit-row__info">
            <strong>${label}</strong>
            <small>Daily Goal: ${habitTarget} ${meta.unit || 'mins'}</small>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:0.4rem;">
          <button class="btn btn--ghost" style="padding:0.35rem 0.65rem; font-size:0.78rem; display:inline-flex; align-items:center; gap:0.3rem;" onclick="window.openTargetModal('${trackId}')">
            ${habitTarget}m ${SVGS.edit}
          </button>
          <button class="btn ${isDone ? 'btn--ghost' : 'btn--primary'}" style="padding:0.4rem 0.9rem; font-size:0.82rem;" onclick="window.toggleBuildHabit('${trackId}')">
            ${isDone ? '✓ Completed' : 'Mark Done'}
          </button>
        </div>
      `;
      grid.append(row);
    }
  });
}

/* === 4. Time Logger & Target Modals =========================== */
let activeTimeLogHabit = null;

window.openTimeLogModal = function(habitId) {
  activeTimeLogHabit = habitId;
  const meta = getHabitMeta(habitId);
  const target = getHabitTarget(habitId);
  const currentVal = getDailyLogValue(today(), habitId) ?? 0;

  const modal = $('#timeLogModal');
  if (!modal) return;

  $('#timeLogTitle').textContent = `Log ${meta.name}`;
  $('#timeLogSubtitle').textContent = `Record time spent today (Goal: Stay under ${target} ${meta.unit || 'mins'}):`;
  $('#timeLogManualInput').value = currentVal;
  updateTimeLogModalUI(currentVal, target, meta.unit || 'mins');

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
};

function updateTimeLogModalUI(val, target, unit) {
  val = Math.max(0, Number(val) || 0);
  $('#timeLogDisplay').innerHTML = `${val} <span style="font-size:1.1rem; font-weight:500; color:var(--ink-dim);">${unit}</span>`;
  
  const statusEl = $('#timeLogLimitStatus');
  if (statusEl) {
    if (val <= target) {
      statusEl.textContent = `✓ Under daily target (${target - val} ${unit} buffer remaining)`;
      statusEl.style.color = 'var(--emerald-soft)';
    } else {
      statusEl.innerHTML = `<span style="display:inline-flex; align-items:center; gap:0.3rem; color:var(--rose);">${SVGS.alert} Exceeded daily target by ${val - target} ${unit}</span>`;
      statusEl.style.color = 'var(--rose)';
    }
  }
}

let activeTargetModalHabit = null;

window.openTargetModal = function(habitId) {
  activeTargetModalHabit = habitId;
  const meta = getHabitMeta(habitId);
  const currentTarget = getHabitTarget(habitId);

  const modal = $('#targetModal');
  if (!modal) return;

  $('#targetModalTitle').textContent = `Set Target: ${meta.name}`;
  $('#targetModalSubtitle').textContent = `Customize your daily ${meta.mode === 'limit' ? 'maximum cap' : 'goal duration'} (${meta.unit || 'mins'}):`;
  $('#targetModalManualInput').value = currentTarget;
  updateTargetModalUI(currentTarget, meta.unit || 'mins');

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
};

function updateTargetModalUI(val, unit = 'mins') {
  val = Math.max(1, Number(val) || 1);
  const display = $('#targetModalDisplay');
  if (display) {
    display.innerHTML = `${val} <span style="font-size:1.1rem; font-weight:500; color:var(--ink-dim);">${unit}</span>`;
  }
  $$('.target-preset-btn').forEach((btn) => {
    btn.classList.toggle('is-selected', Number(btn.dataset.target) === val);
  });
}

window.stepObHabitTarget = function(habitId, delta) {
  const currentTarget = getHabitTarget(habitId);
  const newTarget = Math.max(5, currentTarget + delta);
  if (!S.tracks[habitId]) S.tracks[habitId] = { since: today(), best: 0, target: newTarget, mode: getHabitMode(habitId) };
  S.tracks[habitId].target = newTarget;
  save();
  const valEl = document.getElementById(`obTargetVal_${habitId}`);
  if (valEl) {
    const meta = getHabitMeta(habitId);
    valEl.textContent = `${newTarget} ${meta.unit || 'mins'}`;
  }
};

window.stepHabitTime = function(habitId, delta) {
  const currentVal = getDailyLogValue(today(), habitId) ?? 0;
  const newVal = Math.max(0, currentVal + delta);
  setDailyLogValue(today(), habitId, newVal);
  renderAll();
  toast(`${getTrackLabel(habitId)} updated to ${newVal} mins`);
};

window.toggleBuildHabit = function(habitId) {
  const currentVal = Boolean(getDailyLogValue(today(), habitId));
  setDailyLogValue(today(), habitId, !currentVal);
  renderAll();
  toast(!currentVal ? `✓ ${getTrackLabel(habitId)} logged as completed today!` : `${getTrackLabel(habitId)} marked uncompleted.`);
};

/* === 5. Heatmap Calendar ===================================== */
function renderHeatmap() {
  const grid = $('#heatmap');
  if (!grid) return;
  grid.textContent = '';
  const t = today();

  const relapsesByDate = {};
  S.relapses.forEach((r) => {
    if (!relapsesByDate[r.date]) relapsesByDate[r.date] = [];
    relapsesByDate[r.date].push(r);
  });

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
      state = `Reset: ${dateRelapses.map((r) => getTrackLabel(r.track)).join(', ')}`;
      note = dateRelapses.map((r) => r.note).filter(Boolean).join('; ');
    } else if (S.checkins[d]) {
      cell.classList.add('cell--confirmed');
      state = 'Checked in ✓ (On track)';
    } else if (d >= (S.firstRun || t)) {
      cell.classList.add('cell--clean');
      state = 'On Track';
    }

    if (d === t) cell.classList.add('cell--today');

    cell.dataset.date = d;
    cell.dataset.state = state;
    if (note) cell.dataset.note = note;

    cell.title = `${parse(d).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })} — ${state}${note ? ` ("${note}")` : ''}`;
    cell.setAttribute('aria-label', cell.title);

    if (d <= t) {
      cell.setAttribute('tabindex', '0');
      cell.setAttribute('role', 'button');
      cell.addEventListener('click', () => openDayLogModal(d));
    }

    frag.append(cell);
  }
  grid.append(frag);
  if (grid.parentElement) grid.parentElement.scrollLeft = grid.parentElement.scrollWidth;
}

/* === 6. Records & Stats ====================================== */
function renderStats() {
  const active = getActiveTracks();
  let maxBest = 0;

  active.forEach((trackId) => {
    const curStreak = habitStreak(trackId);
    if (!S.tracks[trackId]) S.tracks[trackId] = { since: today(), best: 0, target: getHabitTarget(trackId), mode: getHabitMode(trackId) };
    S.tracks[trackId].best = Math.max(S.tracks[trackId].best || 0, curStreak);
    maxBest = Math.max(maxBest, S.tracks[trackId].best);
  });

  save();

  $('#stBestStreak').textContent = maxBest;
  $('#stActiveCount').textContent = active.length;
  $('#stBestVisit').textContent  = S.bestVisit;
  $('#stTotalDays').textContent  = active.length > 0 ? Math.max(...active.map(habitStreak), 0) : 0;
  $('#stCheckins').textContent   = Object.keys(S.checkins).length;
  $('#stUrges').textContent      = S.urges.length;
  $('#stResets').textContent     = S.relapses.length;
}

/* === 7. Milestones =========================================== */
let selectedMilestoneTrack = null;

function renderMilestones() {
  const active = getActiveTracks();
  const tabsContainer = $('#milestoneTabs');
  
  if (!selectedMilestoneTrack || !active.includes(selectedMilestoneTrack)) {
    selectedMilestoneTrack = active[0] || null;
  }

  if (tabsContainer) {
    tabsContainer.innerHTML = '';
    active.forEach((trackId) => {
      const meta = getHabitMeta(trackId);
      const streak = habitStreak(trackId);
      const label = getTrackLabel(trackId);
      const iconSvg = getHabitSvg(trackId);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'ms-tab' + (selectedMilestoneTrack === trackId ? ' is-active' : '');
      btn.innerHTML = `<span style="display:inline-flex; align-items:center; margin-right:0.3rem;">${iconSvg}</span> ${label} <span class="ms-tab__badge">${streak}d</span>`;
      btn.addEventListener('click', () => {
        selectedMilestoneTrack = trackId;
        renderMilestones();
      });
      tabsContainer.append(btn);
    });
  }

  if (!selectedMilestoneTrack) {
    $('#milestones').innerHTML = `<li style="color:var(--ink-dim); padding:1rem 0;">Select habits to unlock milestone achievements.</li>`;
    return;
  }

  const currentStreak = habitStreak(selectedMilestoneTrack);
  const next = nextMilestone(currentStreak);

  const labelEl = $('#msActiveLabel');
  const statEl = $('#msCurrentDays');
  const badgeEl = $('#msNextBadge');
  const fillEl = $('#msBarFill');
  const subEl = $('#milestoneSubtitle');

  if (labelEl) labelEl.textContent = `${getTrackLabel(selectedMilestoneTrack)} Streak`;
  if (statEl) statEl.textContent = currentStreak;

  if (badgeEl) {
    badgeEl.textContent = next ? `Next: Day ${next}` : 'All Milestones Cleared';
  }

  if (fillEl) {
    const prevMilestone = [...MILESTONES].reverse().find((m) => m <= currentStreak) || 0;
    const targetMilestone = next || 365;
    const progress = Math.min(100, Math.max(0, ((currentStreak - prevMilestone) / (targetMilestone - prevMilestone)) * 100));
    fillEl.style.width = `${next ? progress : 100}%`;
  }

  if (subEl) {
    subEl.textContent = next
      ? `${next - currentStreak} days until next tier achievement`
      : 'Mastery tier unlocked!';
  }

  const list = $('#milestones');
  if (!list) return;
  list.innerHTML = '';

  MILESTONES.forEach((m) => {
    const isHit = currentStreak >= m;
    const isNext = (next === m);
    const perk = MILESTONE_PERKS[m];

    const li = document.createElement('li');
    li.className = 'ms' + (isHit ? ' is-hit' : isNext ? ' is-next' : '');

    li.innerHTML = `
      <span class="ms__dot" aria-hidden="true"></span>
      <div class="ms__info">
        <span class="ms__name">Day ${m} — ${MILESTONE_NAMES[m] || 'Achievement'}</span>
        ${perk ? `<button type="button" class="ms__perk-btn ${isHit ? '' : 'is-locked'}" onclick="window.viewMilestonePerk(${m})">${perk.badgeSvg} ${perk.subtitle}</button>` : ''}
      </div>
      <span class="ms__days">${isHit ? '✓ Reached' : isNext ? 'Next goal' : `${m - currentStreak}d away`}</span>
    `;
    list.append(li);
  });
}

window.viewMilestonePerk = function(milestoneDay) {
  const perk = MILESTONE_PERKS[milestoneDay];
  if (!perk) return;
  const modal = $('#milestonePerkModal');
  if (!modal) return;

  $('#perkModalIcon').innerHTML = perk.badgeSvg;
  $('#perkModalTitle').textContent = perk.title;
  $('#perkModalSubtitle').textContent = perk.subtitle;

  $('#perkModalBody').innerHTML = `
    <p style="color:var(--ink); font-size:var(--step--1); line-height:1.5; margin-bottom:0.8rem;">
      ${perk.desc}
    </p>
    <div style="background:var(--glass); border:1px solid var(--stroke-hi); border-radius:12px; padding:0.85rem; margin-bottom:1rem;">
      <strong style="color:var(--cyan-soft); font-size:0.84rem; display:block; margin-bottom:0.25rem;">PERK REWARD:</strong>
      <p style="color:var(--ink-dim); font-size:0.8rem; margin:0; line-height:1.45;">${perk.perk}</p>
    </div>
  `;

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
};

/* === 8. Smart Multi-Habit Urge Mode Engine =================== */
const TOTAL_CYCLES = 4;
let breathTimer = null, breathCycles = 0;
let currentUrgeHabitId = null;

function renderUrgeControls() {
  const urgeEligible = getUrgeEligibleTracks();
  const hasUrgeHabits = urgeEligible.length > 0;

  const btnUrge = $('#btnUrge');
  const btnFloatUrge = $('#btnFloatUrge');

  if (btnUrge) {
    btnUrge.style.display = hasUrgeHabits ? '' : 'none';
  }
  if (btnFloatUrge) {
    btnFloatUrge.style.display = hasUrgeHabits ? '' : 'none';
  }
}

function switchUrgeTab(step) {
  $$('.urge-tab').forEach((tab) => {
    tab.classList.toggle('is-active', tab.dataset.step === String(step));
  });
  $$('.urge-step-panel').forEach((panel) => {
    panel.hidden = panel.id !== `urgeStep${step}`;
  });
}

function selectUrgeHabit(habitId) {
  currentUrgeHabitId = habitId;
  
  // Highlight active habit pill in selector
  $$('.urge-habit-pill').forEach((pill) => {
    pill.classList.toggle('is-active', pill.dataset.habitId === habitId);
  });

  const protocol = HABIT_URGE_PROTOCOLS[habitId] || HABIT_URGE_PROTOCOLS.general;
  
  // Update Reality Check Box
  const realityEl = $('#urgeRealityText');
  if (realityEl) realityEl.innerHTML = protocol.realityCheck;

  // Update Cadence Label
  const cadenceEl = $('#breathCadenceLabel');
  if (cadenceEl) cadenceEl.textContent = protocol.cadenceName;

  // Render Step 2 Circuit Breakers
  const checklistContainer = $('#circuitChecklist');
  if (checklistContainer) {
    checklistContainer.innerHTML = `
      <span class="circuit-checklist__title">Emergency Action Steps for ${getTrackLabel(habitId)}</span>
      ${protocol.circuitBreakers.map(text => `
        <label class="circuit-check">
          <input type="checkbox" class="cb-item" />
          <span>${text}</span>
        </label>
      `).join('')}
    `;
  }

  // Update prompt
  nextPrompt();
  
  // Restart breath cycle for new cadence
  clearTimeout(breathTimer);
  breathCycles = 0;
  runBreath();
}

function renderUrgeHabitSelector() {
  const container = $('#urgeHabitPills');
  if (!container) return;
  container.innerHTML = '';

  const urgeEligible = getUrgeEligibleTracks();
  const habitList = urgeEligible.length > 0 ? urgeEligible : ['gambling'];

  if (!habitList.includes(currentUrgeHabitId)) {
    currentUrgeHabitId = habitList[0];
  }

  habitList.forEach((id) => {
    const meta = getHabitMeta(id);
    const label = getTrackLabel(id);
    const iconSvg = getHabitSvg(id);

    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `urge-habit-pill ${id === currentUrgeHabitId ? 'is-active' : ''}`;
    pill.dataset.habitId = id;
    pill.innerHTML = `<span style="display:inline-flex; align-items:center; color:var(--cyan-soft);">${iconSvg}</span> <span>${label}</span>`;
    
    pill.addEventListener('click', () => {
      selectUrgeHabit(id);
    });

    container.append(pill);
  });
}

function runBreath() {
  const el = $('#breather'), word = $('#breathWord');
  if (!el || !word) return;

  const protocol = HABIT_URGE_PROTOCOLS[currentUrgeHabitId] || HABIT_URGE_PROTOCOLS.general;
  const inMs = protocol.inTime || 4000;
  const holdMs = protocol.holdTime || 4000;
  const outMs = protocol.outTime || 6000;

  const phase = (cls, text, ms, next) => {
    el.className = 'breather ' + cls;
    word.textContent = text;
    breathTimer = setTimeout(next, ms);
  };

  const cycle = () => {
    const cyclesEl = $('#breathCycles');
    if (cyclesEl) cyclesEl.textContent = String(Math.min(breathCycles + 1, TOTAL_CYCLES));
    phase('is-in', 'Breathe in', inMs, () =>
    phase('is-hold', 'Hold', holdMs, () =>
    phase('', 'Breathe out', outMs, () => {
      breathCycles++;
      if (breathCycles >= TOTAL_CYCLES) {
        word.textContent = 'Well done';
        if (cyclesEl) cyclesEl.textContent = String(TOTAL_CYCLES);
        toast(`Four cycles complete — impulse de-escalated.`);
      } else cycle();
    })));
  };
  cycle();
}

function nextPrompt() {
  const el = $('#urgePrompt');
  if (!el) return;
  const protocol = HABIT_URGE_PROTOCOLS[currentUrgeHabitId] || HABIT_URGE_PROTOCOLS.general;
  const pool = protocol.prompts || [
    'You are not fighting a craving. You are watching one pass.',
    'Stand up. Leave this room. The thought does not follow well.',
    'Name five things you can see right now. Out loud.',
    'The version of you tomorrow morning is watching this exact moment.'
  ];

  el.style.opacity = '0';
  setTimeout(() => {
    let p;
    do { p = pool[Math.floor(Math.random() * pool.length)]; }
    while (p === el.textContent && pool.length > 1);
    el.textContent = p;
    el.style.transition = 'opacity .5s';
    el.style.opacity = '1';
  }, 220);
}

function openUrge() {
  const urgeEligible = getUrgeEligibleTracks();
  if (urgeEligible.length === 0) {
    toast('No abstinence or limit habits currently active.');
    return;
  }

  $('#urge').hidden = false;
  document.body.style.overflow = 'hidden';
  switchUrgeTab(1);
  breathCycles = 0;
  if ($('#breathCycles')) $('#breathCycles').textContent = '1';
  if ($('#urgeNoteInput')) $('#urgeNoteInput').value = '';

  currentUrgeHabitId = urgeEligible[0];

  renderUrgeHabitSelector();
  selectUrgeHabit(currentUrgeHabitId);
}

function closeUrge(declared = false) {
  if (declared) {
    const note = $('#urgeNoteInput')?.value.trim() || '';
    const targetLabel = getTrackLabel(currentUrgeHabitId);
    S.urges.push({ ts: Date.now(), habit: currentUrgeHabitId, cycles: breathCycles, note: note || undefined });
    logIt(
      breathCycles
        ? `Rode out an urge for ${targetLabel} — ${breathCycles} breathing ${breathCycles === 1 ? 'cycle' : 'cycles'}.`
        : `Rode out an urge for ${targetLabel}.`,
      note
    );
    save();
    renderAll();
    toast(`Logged. That urge for ${targetLabel} was sat through.`);
  }
  $('#urge').hidden = true;
  document.body.style.overflow = '';
  clearTimeout(breathTimer);
  const breather = $('#breather');
  if (breather) breather.className = 'breather';
}

/* === 9. Habit-Tailored AI Wisdom & Playbooks ================= */
let currentWisdomIdx = 0;

function getWisdomForActiveHabits() {
  const active = getActiveTracks();
  let pool = [];

  active.forEach((trackId) => {
    if (HABIT_WISDOM_DATABASE[trackId]) {
      pool.push(...HABIT_WISDOM_DATABASE[trackId]);
    }
  });

  if (pool.length === 0) {
    pool = HABIT_WISDOM_DATABASE.general;
  }
  return pool;
}

function renderWisdom(forceNext = false) {
  const quoteEl = $('#wisdomText'), catEl = $('#wisdomCat');
  if (!quoteEl || !catEl) return;

  const pool = getWisdomForActiveHabits();
  if (forceNext) {
    currentWisdomIdx = (currentWisdomIdx + 1) % pool.length;
  } else {
    const dStr = today();
    let hash = 0;
    for (let i = 0; i < dStr.length; i++) hash += dStr.charCodeAt(i);
    currentWisdomIdx = hash % pool.length;
  }

  const p = pool[currentWisdomIdx] || pool[0];
  quoteEl.textContent = `"${p.text}"`;
  catEl.textContent = p.cat;
}

function renderTriggerPlaybook() {
  const container = $('#triggerPlaybookContent');
  if (!container) return;

  const userTriggers = S.user.triggers || [];
  container.innerHTML = '';

  if (userTriggers.length === 0) {
    container.innerHTML = `<p style="color:var(--ink-dim); font-size:0.82rem; margin:0.2rem 0;">No triggers configured yet. Click "Edit triggers" to select your high-risk moments.</p>`;
    return;
  }

  userTriggers.forEach((tKey) => {
    const strat = TRIGGER_STRATEGIES[tKey];
    if (!strat) return;
    const tip = getDailyTriggerTip(tKey);
    const svgIcon = SVGS[strat.svgKey] || SVGS.stress;

    const card = document.createElement('div');
    card.style.cssText = 'background:var(--glass); border:1px solid var(--stroke); border-radius:12px; padding:0.75rem 0.95rem;';
    card.innerHTML = `
      <div style="font-size:0.85rem; font-weight:700; color:var(--cyan-soft); margin-bottom:0.25rem; display:flex; align-items:center; gap:0.4rem;">
        <span style="color:var(--cyan-soft);">${svgIcon}</span>
        <span>${strat.title}</span>
      </div>
      <p style="font-size:0.8rem; color:var(--ink-dim); margin:0; line-height:1.4;">
        <strong>Action Anchor:</strong> ${tip}
      </p>
    `;
    container.append(card);
  });
}

function renderHeroLine() {
  const active = getActiveTracks();
  const maxStreak = active.length > 0 ? Math.max(...active.map(habitStreak), 0) : 0;
  const lines =
    maxStreak === 0 ? ['Day zero is not failure. It is the beginning of momentum.',
                       'The streak that lasts starts right after the decision to commit.']
  : maxStreak < 3   ? ['The hardest stretch is the one right now. Guard your attention.',
                       'Two or three days in, dopamine resistance peaks. Keep walking.']
  : maxStreak < 7   ? ['Your brain is starting to notice you mean business.',
                       'Momentum is real now. Protect your peace.']
  : maxStreak < 30  ? ['This is no longer an attempt. It is an identity shift.',
                       'You have proven you can. Now prove you will stay anchored.']
  :                   ['You are no longer fighting old habits. You are living as who you chose to be.',
                       'Unbroken discipline. Keep building your masterpiece.'];
  $('#heroLine').textContent = lines[Math.floor(Math.random() * lines.length)];
}

function renderGreeting() {
  const name = S?.user?.name ? S.user.name.trim() : '';
  const greetingEl = $('#userGreeting');
  if (!greetingEl) return;

  const hr = new Date().getHours();
  const timeWord = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening';
  const greetingText = name ? `${timeWord}, ${name}. Stay anchored.` : `${timeWord}. Stay anchored.`;
  greetingEl.innerHTML = `<span class="brand__mark" aria-hidden="true" style="width:8px; height:8px; flex-shrink:0; opacity:0.85;"></span> <span>${greetingText}</span>`;
}

function renderLog() {
  const ul = $('#log');
  if (!ul) return;
  ul.textContent = '';
  if (!S.log.length) {
    ul.innerHTML = '<li class="log__empty">Nothing logged yet.</li>';
    return;
  }
  const frag = document.createDocumentFragment();
  S.log.slice(0, 35).forEach((item) => {
    const li = document.createElement('li');
    li.className = 'log__item';
    const d = new Date(item.ts);
    const timeStr = d.toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
    });
    li.innerHTML = `
      <span class="log__time">${timeStr}</span>
      <span class="log__msg">${item.msg}</span>
      ${item.note ? `<blockquote class="log__note">${item.note}</blockquote>` : ''}
    `;
    frag.append(li);
  });
  ul.append(frag);
}

function renderAll() {
  document.documentElement.setAttribute('data-theme', S.user.theme || 'dark');
  document.documentElement.setAttribute('data-user-gender', S.user.gender || 'him');
  renderTop();
  renderGreeting();
  renderRings();
  renderToday();
  renderHeatmap();
  renderStats();
  renderMilestones();
  renderTriggerPlaybook();
  renderWisdom();
  renderLog();
  renderSettingsActiveBadges();
  renderUrgeControls();
}

/* === 10. Relapse & Reset Engine ============================== */
function confirmRelapse(trackId) {
  const modal = $('#modal');
  const title = $('#modalTitle');
  const body = $('#modalBody');
  const field = $('#modalField');
  const input = $('#modalInput');

  title.textContent = `Reset ${getTrackLabel(trackId)}?`;
  body.textContent = 'Slip-ups happen. Honest tracking is how you actually build unbreakable discipline.';
  field.hidden = false;
  input.value = '';

  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  const yesBtn = $('#modalYes'), noBtn = $('#modalNo');
  
  const cleanup = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    yesBtn.onclick = null;
    noBtn.onclick = null;
  };

  noBtn.onclick = cleanup;
  yesBtn.onclick = () => {
    const note = input.value.trim();
    const t = today();
    S.relapses.push({
      date: t,
      track: trackId,
      hour: new Date().getHours(),
      note
    });

    if (!S.tracks[trackId]) S.tracks[trackId] = { since: t, best: 0 };
    S.tracks[trackId].since = t;
    logIt(`Reset ${getTrackLabel(trackId)}.`, note);
    save();
    cleanup();
    renderAll();
    toast(`Reset logged for ${getTrackLabel(trackId)}. Re-anchor today!`);
  };
}

/* === 11. Onboarding & Welcome Flow =========================== */
let currentObStep = 1;
let selectedObCategory = 'all';

function openWelcomeLanding() {
  const landing = $('#welcomeLanding');
  if (!landing) return;
  landing.hidden = false;
  document.body.style.overflow = 'hidden';
  initWaveCanvas();
}

function closeWelcomeLanding() {
  const landing = $('#welcomeLanding');
  if (landing) landing.hidden = true;
}

function openOnboarding(step = 1) {
  closeWelcomeLanding();
  const ob = $('#onboarding');
  if (!ob) return;
  ob.hidden = false;
  document.body.style.overflow = 'hidden';

  // When opening onboarding as a new setup, ensure clean slate (0 selected) if not completed
  if (!S.user.onboarded) {
    S.user.activeTracks = [];
    S.user.triggers = [];
  }

  $('#obName').value = S.user.name || '';
  
  $$('#obGenderOptions button[data-gender]').forEach((btn) => {
    btn.classList.toggle('is-selected', btn.dataset.gender === (S.user.gender || 'him'));
  });

  $$('#obStep1 .onboarding-option[data-theme-mode]').forEach((btn) => {
    btn.classList.toggle('is-selected', btn.dataset.themeMode === (S.user.theme || 'dark'));
  });

  renderObHabitPicker();
  renderInteractiveTriggers('obTriggersList');
  switchObStep(step);
  initWaveCanvas();
}

function switchObStep(step) {
  currentObStep = step;
  const pct = (step / 5) * 100;
  $('#onboardingProgress').style.width = `${pct}%`;

  for (let i = 1; i <= 5; i++) {
    const el = $(`#obStep${i}`);
    if (el) el.hidden = (i !== step);
  }

  if (step === 3) {
    renderObHabitPicker();
  }

  if (step === 4) {
    renderInteractiveTriggers('obTriggersList');
  }

  if (step === 5) {
    renderObBlueprintSummary();
  }
}

function renderObHabitPicker() {
  const grid = $('#obHabitGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const active = S.user.activeTracks || [];
  const allHabitKeys = Object.keys(HABIT_LIBRARY);

  const filtered = selectedObCategory === 'all'
    ? allHabitKeys
    : allHabitKeys.filter((k) => HABIT_LIBRARY[k].cat === selectedObCategory);

  filtered.forEach((id) => {
    const meta = HABIT_LIBRARY[id];
    const isSel = active.includes(id);
    const mode = meta.mode || 'abstinence';
    const target = getHabitTarget(id);
    const label = getTrackLabel(id);
    const iconSvg = getHabitSvg(id);

    const card = document.createElement('div');
    card.className = `habit-picker-card ${isSel ? 'is-selected' : ''}`;
    card.dataset.habitId = id;

    const tagClass = mode === 'abstinence' ? 'habit-tag--abstinence' : mode === 'limit' ? 'habit-tag--limit' : 'habit-tag--build';
    const tagLabel = mode === 'abstinence' ? 'Clean Streak' : mode === 'limit' ? 'Daily Limit' : 'Daily Goal';

    let targetSetterHtml = '';
    if (mode === 'limit' || mode === 'build') {
      targetSetterHtml = `
        <div class="habit-target-inline-setter" onclick="event.stopPropagation()">
          <span style="font-size:0.78rem; color:var(--ink-dim);">${mode === 'limit' ? 'Daily Cap:' : 'Daily Target:'}</span>
          <button type="button" class="inline-step-btn" onclick="window.stepObHabitTarget('${id}', -15)">-</button>
          <span class="inline-target-val" id="obTargetVal_${id}">${target} ${meta.unit || 'mins'}</span>
          <button type="button" class="inline-step-btn" onclick="window.stepObHabitTarget('${id}', 15)">+</button>
        </div>
      `;
    }

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
        <div class="habit-picker-card__left">
          <span class="habit-picker-card__icon">${iconSvg}</span>
          <div>
            <div class="habit-picker-card__name">
              ${label}
              <span class="habit-tag ${tagClass}">${tagLabel}</span>
            </div>
            <div class="habit-picker-card__desc">${meta.desc}</div>
          </div>
        </div>
        <input type="checkbox" class="cb-habit-toggle" ${isSel ? 'checked' : ''} style="transform:scale(1.25); cursor:pointer;" />
      </div>
      ${isSel ? targetSetterHtml : ''}
    `;

    card.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'input' || e.target.closest('.habit-target-inline-setter')) return;
      const ck = card.querySelector('.cb-habit-toggle');
      ck.checked = !ck.checked;
      toggleObHabitSelection(id, ck.checked);
      renderObHabitPicker();
    });

    const ck = card.querySelector('.cb-habit-toggle');
    ck.addEventListener('change', () => {
      toggleObHabitSelection(id, ck.checked);
      renderObHabitPicker();
    });

    grid.append(card);
  });

  const countBadge = $('#obSelectedHabitsCount');
  if (countBadge) countBadge.textContent = `${active.length} selected`;
}

function toggleObHabitSelection(id, isSelected) {
  if (!Array.isArray(S.user.activeTracks)) S.user.activeTracks = [];
  if (isSelected) {
    if (!S.user.activeTracks.includes(id)) S.user.activeTracks.push(id);
  } else {
    S.user.activeTracks = S.user.activeTracks.filter((k) => k !== id);
  }
  const countBadge = $('#obSelectedHabitsCount');
  if (countBadge) countBadge.textContent = `${S.user.activeTracks.length} selected`;
}

function renderInteractiveTriggers(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const userTriggers = S.user.triggers || [];
  const triggerKeys = Object.keys(TRIGGER_STRATEGIES);

  triggerKeys.forEach((tKey) => {
    const strat = TRIGGER_STRATEGIES[tKey];
    const isSel = userTriggers.includes(tKey);
    const svgIcon = SVGS[strat.svgKey] || SVGS.stress;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `trigger-card-btn ${isSel ? 'is-selected' : ''}`;
    btn.dataset.trigger = tKey;

    btn.innerHTML = `
      <span class="trigger-card-btn__icon">${svgIcon}</span>
      <span style="flex:1;">${strat.title}</span>
      <span class="trigger-card-btn__check" style="font-size:0.85rem; color:${isSel ? 'var(--cyan-soft)' : 'transparent'}; font-weight:700;">✓</span>
    `;

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextSel = !btn.classList.contains('is-selected');
      btn.classList.toggle('is-selected', nextSel);
      
      const checkEl = btn.querySelector('.trigger-card-btn__check');
      if (checkEl) checkEl.style.color = nextSel ? 'var(--cyan-soft)' : 'transparent';

      if (!Array.isArray(S.user.triggers)) S.user.triggers = [];
      if (nextSel) {
        if (!S.user.triggers.includes(tKey)) S.user.triggers.push(tKey);
      } else {
        S.user.triggers = S.user.triggers.filter((k) => k !== tKey);
      }
    });

    container.append(btn);
  });
}

function renderObBlueprintSummary() {
  const el = $('#obBlueprintSummary');
  if (!el) return;
  const active = S.user.activeTracks || [];

  if (active.length === 0) {
    el.innerHTML = `<p style="color:var(--ink-dim); margin:0;">No habits selected yet. Click "Back" to choose habits.</p>`;
    return;
  }

  let html = `<strong style="color:var(--cyan-soft); display:block; margin-bottom:0.4rem;">Your Tailored Habit System:</strong><ul style="padding-left:1.2rem; margin:0.4rem 0;">`;
  active.forEach((id) => {
    const meta = getHabitMeta(id);
    const mode = getHabitMode(id);
    const target = getHabitTarget(id);
    const label = getTrackLabel(id);
    html += `<li><strong>${label}</strong> — ${mode === 'limit' ? `Cap at ${target} mins/day (Screen Time budget)` : mode === 'build' ? `Goal: ${target} ${meta.unit || 'mins'}/day` : 'Consecutive clean days'}</li>`;
  });
  html += `</ul><p style="margin:0.5rem 0 0; color:var(--ink-dim); font-size:0.8rem;">Smart tracking and daily reflections are ready.</p>`;
  el.innerHTML = html;
}

function finishOnboarding() {
  const nameInput = $('#obName');
  if (nameInput?.value.trim()) S.user.name = nameInput.value.trim();

  const selThemeBtn = $('#obStep1 .onboarding-option.is-selected[data-theme-mode]');
  if (selThemeBtn) S.user.theme = selThemeBtn.dataset.themeMode;

  S.user.onboarded = true;
  save();

  $('#onboarding').hidden = true;
  document.body.style.overflow = '';
  renderAll();
  initWaveCanvas();
  toast('Welcome to Anchor! Your habits are now live.');
}

/* === 12. Settings Modal & Habit Picker Popover =============== */
function openSettings() {
  const modal = $('#settingsModal');
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  renderSettingsActiveBadges();

  // Render Account & Cloud Sync info
  const accName = $('#settingsAccountName');
  const accEmail = $('#settingsAccountEmail');
  const accBtn = $('#btnSettingsAccountAction');

  if (currentUser && !currentUser.isAnonymous) {
    if (accName) accName.textContent = currentUser.displayName || S.user.name || 'Anchor User';
    if (accEmail) accEmail.textContent = currentUser.email || 'Cloud Synced';
    if (accBtn) {
      accBtn.textContent = 'Sign Out';
      accBtn.onclick = () => {
        if (auth) {
          auth.signOut().then(() => {
            currentUser = null;
            openSettings();
            toast('Signed out.');
          });
        }
      };
    }
  } else {
    if (accName) accName.textContent = S.user.name ? `${S.user.name} (Guest)` : 'Guest Mode';
    if (accEmail) accEmail.textContent = 'Saved on this device only';
    if (accBtn) {
      accBtn.textContent = 'Link Account';
      accBtn.onclick = () => {
        openLinkAccountModal();
      };
    }
  }

  $$('#settingsGenderOptions button[data-set-gender]').forEach((btn) => {
    btn.classList.toggle('is-selected', btn.dataset.setGender === (S.user.gender || 'him'));
  });

  $$('#settingsModal .onboarding-option[data-set-theme]').forEach((btn) => {
    btn.classList.toggle('is-selected', btn.dataset.setTheme === (S.user.theme || 'dark'));
  });

  renderInteractiveTriggers('settingsTriggersList');
}

function openLinkAccountModal() {
  const modal = $('#linkAccountModal');
  if (!modal) return;
  const errEl = $('#linkAccountError');
  if (errEl) { errEl.textContent = ''; errEl.hidden = true; }
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeLinkAccountModal() {
  const modal = $('#linkAccountModal');
  if (modal) modal.hidden = true;
  if ($('#settingsModal') && !$('#settingsModal').hidden) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function renderSettingsActiveBadges() {
  const container = $('#settingsActiveBadges');
  if (!container) return;
  container.innerHTML = '';

  const active = getActiveTracks();
  if (active.length === 0) {
    container.innerHTML = `<span style="color:var(--ink-faint); font-size:0.8rem;">No active habits selected.</span>`;
    return;
  }

  active.forEach((trackId) => {
    const meta = getHabitMeta(trackId);
    const mode = getHabitMode(trackId);
    const target = getHabitTarget(trackId);
    const label = getTrackLabel(trackId);
    const iconSvg = getHabitSvg(trackId);

    const pill = document.createElement('span');
    pill.className = 'settings-habit-pill';
    pill.innerHTML = `
      <span class="settings-habit-pill__icon" style="color:var(--cyan-soft);">${iconSvg}</span>
      <span>${label}</span>
      <span class="settings-habit-pill__mode" style="cursor:pointer; display:inline-flex; align-items:center; gap:0.25rem;" onclick="window.openTargetModal('${trackId}')">${mode === 'limit' ? `${target}m ${SVGS.edit}` : mode === 'build' ? `${target}m ${SVGS.edit}` : 'clean'}</span>
    `;
    container.append(pill);
  });
}

let activeHabitPickerCategory = 'all';
function openHabitPickerModal() {
  const modal = $('#habitPickerModal');
  if (!modal) return;
  renderHabitPickerGrid();
  modal.hidden = false;
}

function renderHabitPickerGrid() {
  const grid = $('#habitPickerGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const active = S.user.activeTracks || [];
  const allHabitKeys = Object.keys(HABIT_LIBRARY);

  const filtered = activeHabitPickerCategory === 'all'
    ? allHabitKeys
    : allHabitKeys.filter((k) => HABIT_LIBRARY[k].cat === activeHabitPickerCategory);

  filtered.forEach((id) => {
    const meta = HABIT_LIBRARY[id];
    const isAct = active.includes(id);
    const mode = getHabitMode(id);
    const target = getHabitTarget(id);
    const label = getTrackLabel(id);
    const iconSvg = getHabitSvg(id);

    const row = document.createElement('div');
    row.style.cssText = 'display:flex; align-items:center; justify-content:space-between; background:var(--glass); border:1px solid var(--stroke); border-radius:10px; padding:0.6rem 0.8rem;';

    row.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.6rem;">
        <input type="checkbox" class="cb-modal-habit" data-habit-id="${id}" ${isAct ? 'checked' : ''} style="transform:scale(1.2); cursor:pointer;" />
        <span style="color:var(--cyan-soft); display:inline-flex; align-items:center;">${iconSvg}</span>
        <div>
          <strong style="font-size:0.88rem; color:var(--ink);">${label}</strong>
          <span style="font-size:0.75rem; color:var(--ink-dim); display:block;">${mode === 'limit' ? `Limit: Max ${target} mins/day` : mode === 'build' ? `Goal: ${target} ${meta.unit || 'mins'}` : 'Clean streak counter'}</span>
        </div>
      </div>
      ${mode === 'limit' || mode === 'build' ? `
        <div style="display:flex; align-items:center; gap:0.3rem;">
          <input type="number" class="input-field" style="width:65px; font-size:0.8rem; padding:0.25rem 0.4rem; text-align:center;" value="${target}" min="5" max="720" onchange="window.updateHabitTarget('${id}', this.value)" />
          <span style="font-size:0.75rem; color:var(--ink-faint);">mins</span>
        </div>
      ` : ''}
    `;

    row.querySelector('.cb-modal-habit').addEventListener('change', (e) => {
      toggleSettingHabit(id, e.target.checked);
    });

    grid.append(row);
  });
}

function toggleSettingHabit(id, isChecked) {
  if (!Array.isArray(S.user.activeTracks)) S.user.activeTracks = [];
  if (isChecked) {
    if (!S.user.activeTracks.includes(id)) S.user.activeTracks.push(id);
  } else {
    S.user.activeTracks = S.user.activeTracks.filter((k) => k !== id);
  }
  save();
  renderAll();
}

window.updateHabitTarget = function(id, val) {
  const num = Math.max(1, Number(val) || 30);
  if (!S.tracks[id]) S.tracks[id] = { since: today(), best: 0, target: num, mode: getHabitMode(id) };
  S.tracks[id].target = num;
  save();
  renderAll();
  toast(`Target updated to ${num} mins for ${getTrackLabel(id)}!`);
};

/* === 13. Day Log Modal ======================================= */
function openDayLogModal(dateStr) {
  const modal = $('#dayLogModal');
  if (!modal) return;

  $('#dayLogTitle').textContent = parse(dateStr).toLocaleDateString(undefined, {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const active = getActiveTracks();
  const checksContainer = $('#dayLogChecksContainer');
  checksContainer.innerHTML = '';

  active.forEach((trackId) => {
    const meta = getHabitMeta(trackId);
    const mode = getHabitMode(trackId);
    const label = getTrackLabel(trackId);
    const iconSvg = getHabitSvg(trackId);
    const isClean = !S.relapses.some(r => r.date === dateStr && r.track === trackId);

    const displayTitle = mode === 'abstinence' ? getHabitActionLabel(trackId) : `${label} (${mode})`;

    const labelEl = document.createElement('label');
    labelEl.className = 'check';
    labelEl.innerHTML = `
      <input type="checkbox" id="dayCk_${trackId}" ${isClean ? 'checked' : ''} />
      <span class="check__box" aria-hidden="true"></span>
      <span class="check__text">
        <strong style="display:flex; align-items:center; gap:0.4rem;">
          <span style="color:var(--cyan-soft);">${iconSvg}</span>
          ${displayTitle}
        </strong>
      </span>
    `;
    checksContainer.append(labelEl);
  });

  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  $('#btnSaveDayClean').onclick = () => {
    S.checkins[dateStr] = true;
    save();
    modal.hidden = true;
    document.body.style.overflow = '';
    renderAll();
    toast(`Confirmed ${dateStr} as on track ✓`);
  };

  $('#btnClearDayLog').onclick = () => {
    delete S.checkins[dateStr];
    S.relapses = S.relapses.filter(r => r.date !== dateStr);
    save();
    modal.hidden = true;
    document.body.style.overflow = '';
    renderAll();
    toast(`Cleared log status for ${dateStr}`);
  };

  $('#btnDayLogClose').onclick = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
  };
}

function toast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('is-visible');
  setTimeout(() => t.classList.remove('is-visible'), 3200);
}

/* === 14. Event Bindings ====================================== */
function bind() {
  // Brand Click -> 5 rapid clicks triggers Secret Admin Panel!
  const handleBrandClick = () => {
    brandClickCount++;
    if (brandClickTimer) clearTimeout(brandClickTimer);
    brandClickTimer = setTimeout(() => { brandClickCount = 0; }, 3000);

    if (brandClickCount >= 5) {
      brandClickCount = 0;
      openAdmin();
      return;
    }

    if (!S.user.onboarded) {
      openWelcomeLanding();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  $('#btnBrandHome')?.addEventListener('click', handleBrandClick);
  $$('.brand').forEach((el) => el.addEventListener('click', handleBrandClick));
  $$('.brand__mark').forEach((el) => el.addEventListener('click', handleBrandClick));
  $$('.brand__name').forEach((el) => el.addEventListener('click', handleBrandClick));
  $$('.welcome-landing__brand-badge').forEach((el) => el.addEventListener('click', handleBrandClick));
  $$('.onboarding__brand').forEach((el) => el.addEventListener('click', handleBrandClick));

  // Subscription Lock Modal Handlers
  $('#btnSubClose')?.addEventListener('click', closeSubModal);
  $('#btnPayPaystack')?.addEventListener('click', payWithPaystack);
  $('#btnSubUnlock')?.addEventListener('click', () => {
    const input = $('#subKeyInput');
    if (input) unlockApp(input.value);
  });
  $$('.curr-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setCurrency(btn.dataset.currency);
    });
  });

  // Admin Modal Handlers
  $('#btnAdminClose')?.addEventListener('click', closeAdmin);
  $('#btnGenPasscode')?.addEventListener('click', generatePasscode);

  // Partner Portal Modal Handlers
  $('#btnPartnerClose')?.addEventListener('click', closePartnerModal);
  $('#btnCheckPartnerStats')?.addEventListener('click', () => {
    const input = $('#partnerCodeInput');
    if (input) fetchPartnerStats(input.value);
  });
  $('#btnCopyPartnerUrl')?.addEventListener('click', () => {
    const input = $('#partnerShareUrl');
    if (input && input.value) {
      navigator.clipboard.writeText(input.value).then(() => toast('Partner link copied!')).catch(() => {
        input.select();
        document.execCommand('copy');
        toast('Partner link copied!');
      });
    }
  });

  $('#btnOpenHabitsFromToday')?.addEventListener('click', () => {
    openHabitPickerModal();
  });

  // Welcome Landing Page Actions & Authentication
  let authMode = 'signup';

  const setAuthMode = (mode) => {
    authMode = mode;
    const isSignup = mode === 'signup';
    $('#tabAuthSignup')?.classList.toggle('is-active', isSignup);
    $('#tabAuthSignin')?.classList.toggle('is-active', !isSignup);
    
    if ($('#authNameGroup')) $('#authNameGroup').style.display = isSignup ? 'block' : 'none';
    if ($('#authCardTitle')) $('#authCardTitle').textContent = isSignup ? 'Create your Account' : 'Welcome Back';
    if ($('#authCardSubtitle')) $('#authCardSubtitle').textContent = isSignup 
      ? 'Sync and protect your habit streaks across all your devices.' 
      : 'Sign in to access your synced streaks and habits.';
    if ($('#btnAuthSubmitText')) $('#btnAuthSubmitText').textContent = isSignup ? 'Create Account & Start ➔' : 'Sign In to Anchor ➔';
    if ($('#googleBtnText')) $('#googleBtnText').textContent = isSignup ? 'Continue with Google' : 'Sign in with Google';
    if ($('#btnForgotPass')) $('#btnForgotPass').style.display = isSignup ? 'none' : 'inline-block';
    
    const switchEl = $('#authFooterSwitch');
    if (switchEl) {
      switchEl.innerHTML = isSignup
        ? 'Already have an account? <button type="button" class="linkbtn auth-link-inline" id="linkSwitchToSignin">Sign In</button>'
        : 'Don\'t have an account? <button type="button" class="linkbtn auth-link-inline" id="linkSwitchToSignup">Create Account</button>';
      $('#linkSwitchToSignin')?.addEventListener('click', () => setAuthMode('signin'));
      $('#linkSwitchToSignup')?.addEventListener('click', () => setAuthMode('signup'));
    }

    const errEl = $('#authErrorMessage');
    if (errEl) {
      errEl.textContent = '';
      errEl.hidden = true;
    }
  };

  const showAuthError = (msg) => {
    const errEl = $('#authErrorMessage');
    if (!errEl) return;
    errEl.textContent = msg;
    errEl.hidden = false;
  };

  $('#tabAuthSignup')?.addEventListener('click', () => setAuthMode('signup'));
  $('#tabAuthSignin')?.addEventListener('click', () => setAuthMode('signin'));
  $('#linkSwitchToSignin')?.addEventListener('click', () => setAuthMode('signin'));

  // Password visibility toggle
  $('#btnTogglePassword')?.addEventListener('click', () => {
    const input = $('#authPasswordInput');
    if (!input) return;
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    const eye = $('#pwdEyeSvg');
    if (eye) {
      eye.innerHTML = isPass
        ? '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>'
        : '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>';
    }
  });

  // 1-Click Google Sign In
  $('#btnGoogleAuth')?.addEventListener('click', () => {
    const errEl = $('#authErrorMessage');
    if (errEl) { errEl.textContent = ''; errEl.hidden = true; }

    if (!auth) {
      showAuthError('Google Sign-In is initializing. Please try again in a moment.');
      return;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    const btn = $('#btnGoogleAuth');
    if (btn) btn.disabled = true;

    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      if (user.displayName && !S.user.name) {
        S.user.name = user.displayName;
      }
      closeWelcomeLanding();
      document.body.style.overflow = '';
      if (!S.user.onboarded) {
        openOnboarding(1);
      } else {
        renderAll();
        initWaveCanvas();
      }
      toast(`Welcome, ${user.displayName || user.email}!`);
    }).catch((error) => {
      if (error.code !== 'auth/popup-closed-by-user') {
        showAuthError(error.message || 'Google sign-in failed. Please check your connection.');
      }
    }).finally(() => {
      if (btn) btn.disabled = false;
    });
  });

  // Email / Password Form Submit
  $('#welcomeAuthForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const errEl = $('#authErrorMessage');
    if (errEl) { errEl.textContent = ''; errEl.hidden = true; }

    const email = $('#authEmailInput')?.value.trim();
    const password = $('#authPasswordInput')?.value;
    const name = $('#authNameInput')?.value.trim();

    if (!email) {
      showAuthError('Please enter your email address.');
      return;
    }
    if (!password || password.length < 6) {
      showAuthError('Password must be at least 6 characters.');
      return;
    }

    if (!auth) {
      showAuthError('Auth service is loading. Please try again.');
      return;
    }

    const btn = $('#btnAuthSubmit');
    if (btn) btn.disabled = true;

    if (authMode === 'signup') {
      auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        const user = cred.user;
        if (name) {
          user.updateProfile({ displayName: name }).catch(() => {});
          S.user.name = name;
        }
        closeWelcomeLanding();
        document.body.style.overflow = '';
        openOnboarding(1);
        toast(`Account created! Welcome, ${name || email}`);
      }).catch((err) => {
        showAuthError(err.message || 'Failed to create account.');
      }).finally(() => {
        if (btn) btn.disabled = false;
      });
    } else {
      auth.signInWithEmailAndPassword(email, password).then((cred) => {
        const user = cred.user;
        closeWelcomeLanding();
        document.body.style.overflow = '';
        if (!S.user.onboarded) {
          openOnboarding(1);
        } else {
          renderAll();
          initWaveCanvas();
        }
        toast(`Signed in as ${user.displayName || user.email}`);
      }).catch((err) => {
        showAuthError(err.message || 'Invalid email or password.');
      }).finally(() => {
        if (btn) btn.disabled = false;
      });
    }
  });

  // Forgot password
  $('#btnForgotPass')?.addEventListener('click', () => {
    const email = $('#authEmailInput')?.value.trim();
    if (!email) {
      showAuthError('Please enter your email above, then click Forgot.');
      return;
    }
    if (!auth) return;
    auth.sendPasswordResetEmail(email).then(() => {
      toast(`Password reset link sent to ${email}`);
    }).catch((err) => {
      showAuthError(err.message || 'Could not send reset email.');
    });
  });

  // Continue as Guest CTA
  $('#btnAuthGuest')?.addEventListener('click', () => {
    openOnboarding(1);
  });

  $('#btnLandingExplore')?.addEventListener('click', () => {
    closeWelcomeLanding();
    document.body.style.overflow = '';
    renderAll();
    initWaveCanvas();
  });

  $('#btnLandingImport')?.addEventListener('click', () => {
    $('#fileImport')?.click();
  });

  // Topbar Settings
  $('#btnSettings')?.addEventListener('click', openSettings);
  $('#btnSettingsClose')?.addEventListener('click', () => {
    $('#settingsModal').hidden = true;
    document.body.style.overflow = '';
  });

  // Dedicated Link Account Modal Handlers
  $('#btnLinkAccountClose')?.addEventListener('click', closeLinkAccountModal);
  $('#btnLinkAccountCancel')?.addEventListener('click', closeLinkAccountModal);

  // Link Account: Google Auth
  $('#btnLinkGoogleAuth')?.addEventListener('click', () => {
    const errEl = $('#linkAccountError');
    if (errEl) { errEl.textContent = ''; errEl.hidden = true; }

    if (!auth) {
      if (errEl) { errEl.textContent = 'Auth service is loading. Please try again in a moment.'; errEl.hidden = false; }
      return;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    const btn = $('#btnLinkGoogleAuth');
    if (btn) btn.disabled = true;

    auth.signInWithPopup(provider).then((result) => {
      const user = result.user;
      currentUser = user;
      if (user.displayName && !S.user.name) {
        S.user.name = user.displayName;
      }
      save(); // Immediately uploads existing streaks to this user's cloud document
      closeLinkAccountModal();
      openSettings();
      toast(`Account linked! Streaks backed up as ${user.displayName || user.email}`);
    }).catch((error) => {
      if (error.code !== 'auth/popup-closed-by-user') {
        if (errEl) { errEl.textContent = error.message || 'Google sign-in failed.'; errEl.hidden = false; }
      }
    }).finally(() => {
      if (btn) btn.disabled = false;
    });
  });

  // Link Account: Email & Password
  $('#linkAccountForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const errEl = $('#linkAccountError');
    if (errEl) { errEl.textContent = ''; errEl.hidden = true; }

    const email = $('#linkEmailInput')?.value.trim();
    const password = $('#linkPasswordInput')?.value;

    if (!email || !password || password.length < 6) {
      if (errEl) { errEl.textContent = 'Please enter a valid email and a password of at least 6 characters.'; errEl.hidden = false; }
      return;
    }

    if (!auth) return;
    const btn = $('#btnSubmitLinkAccount');
    if (btn) btn.disabled = true;

    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      currentUser = cred.user;
      save(); // Sync existing streaks
      closeLinkAccountModal();
      openSettings();
      toast(`Account linked! Streaks backed up as ${email}`);
    }).catch((err) => {
      if (err.code === 'auth/email-already-in-use') {
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
          currentUser = cred.user;
          syncFromCloud(currentUser.uid);
          closeLinkAccountModal();
          openSettings();
          toast(`Signed in & synced as ${email}`);
        }).catch((signInErr) => {
          if (errEl) { errEl.textContent = signInErr.message || 'Incorrect password for this existing account.'; errEl.hidden = false; }
        });
      } else {
        if (errEl) { errEl.textContent = err.message || 'Could not link account.'; errEl.hidden = false; }
      }
    }).finally(() => {
      if (btn) btn.disabled = false;
    });
  });

  // Settings: Habit Picker button
  $('#btnOpenHabitPickerModal')?.addEventListener('click', openHabitPickerModal);
  $('#btnHabitPickerClose')?.addEventListener('click', () => {
    $('#habitPickerModal').hidden = true;
    renderSettingsActiveBadges();
  });
  $('#btnHabitPickerSave')?.addEventListener('click', () => {
    $('#habitPickerModal').hidden = true;
    renderAll();
    toast('Habit preferences updated!');
  });

  // Category filter tabs in Habit Picker Modal
  $$('#habitPickerCategoryTabs .cat-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('#habitPickerCategoryTabs .cat-tab').forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      activeHabitPickerCategory = tab.dataset.pickerCat;
      renderHabitPickerGrid();
    });
  });

  // Onboarding Navigation
  $('#btnObNext1')?.addEventListener('click', () => switchObStep(2));
  $('#btnObBack2')?.addEventListener('click', () => switchObStep(1));
  $('#btnObNext2')?.addEventListener('click', () => switchObStep(3));
  $('#btnObBack3')?.addEventListener('click', () => switchObStep(2));
  $('#btnObNext3')?.addEventListener('click', () => switchObStep(4));
  $('#btnObBack4')?.addEventListener('click', () => switchObStep(3));
  $('#btnObNext4')?.addEventListener('click', () => switchObStep(5));
  $('#btnObBack5')?.addEventListener('click', () => switchObStep(4));
  $('#btnObFinish')?.addEventListener('click', finishOnboarding);

  // Category filter tabs in Onboarding
  $$('#obCategoryTabs .cat-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('#obCategoryTabs .cat-tab').forEach((t) => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      selectedObCategory = tab.dataset.cat;
      renderObHabitPicker();
    });
  });

  // For Him / For Her in Onboarding Step 2
  $$('#obGenderOptions button[data-gender]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('#obGenderOptions button[data-gender]').forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      S.user.gender = btn.dataset.gender;
      document.documentElement.setAttribute('data-user-gender', S.user.gender);
      renderObHabitPicker();
    });
  });

  // For Him / For Her in Settings
  $$('#settingsGenderOptions button[data-set-gender]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('#settingsGenderOptions button[data-set-gender]').forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      S.user.gender = btn.dataset.setGender;
      document.documentElement.setAttribute('data-user-gender', S.user.gender);
      save();
      renderAll();
    });
  });

  // Theme Toggles in Onboarding
  $$('#obStep1 .onboarding-option[data-theme-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('#obStep1 .onboarding-option[data-theme-mode]').forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      S.user.theme = btn.dataset.themeMode;
      document.documentElement.setAttribute('data-theme', S.user.theme);
    });
  });

  // Theme Toggles in Settings
  $$('#settingsModal .onboarding-option[data-set-theme]').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('#settingsModal .onboarding-option[data-set-theme]').forEach((b) => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      S.user.theme = btn.dataset.setTheme;
      document.documentElement.setAttribute('data-theme', S.user.theme);
      save();
    });
  });

  $('#btnSaveSettings')?.addEventListener('click', () => {
    save();
    $('#settingsModal').hidden = true;
    document.body.style.overflow = '';
    renderAll();
    toast('Settings saved successfully!');
  });

  // Target Goal Modal controls
  $('#btnTargetModalClose')?.addEventListener('click', () => {
    $('#targetModal').hidden = true;
    document.body.style.overflow = '';
  });
  $('#btnTargetModalCancel')?.addEventListener('click', () => {
    $('#targetModal').hidden = true;
    document.body.style.overflow = '';
  });
  $('#btnTargetMinus')?.addEventListener('click', () => {
    const input = $('#targetModalManualInput');
    const meta = getHabitMeta(activeTargetModalHabit);
    const val = Math.max(5, (Number(input.value) || 0) - 15);
    input.value = val;
    updateTargetModalUI(val, meta.unit || 'mins');
  });
  $('#btnTargetPlus')?.addEventListener('click', () => {
    const input = $('#targetModalManualInput');
    const meta = getHabitMeta(activeTargetModalHabit);
    const val = (Number(input.value) || 0) + 15;
    input.value = val;
    updateTargetModalUI(val, meta.unit || 'mins');
  });
  $$('.target-preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = $('#targetModalManualInput');
      const val = Number(btn.dataset.target) || 30;
      input.value = val;
      const meta = getHabitMeta(activeTargetModalHabit);
      updateTargetModalUI(val, meta.unit || 'mins');
    });
  });
  $('#targetModalManualInput')?.addEventListener('input', (e) => {
    const meta = getHabitMeta(activeTargetModalHabit);
    updateTargetModalUI(e.target.value, meta.unit || 'mins');
  });
  $('#btnTargetModalSave')?.addEventListener('click', () => {
    if (!activeTargetModalHabit) return;
    const val = Math.max(1, Number($('#targetModalManualInput')?.value) || 30);
    window.updateHabitTarget(activeTargetModalHabit, val);
    $('#targetModal').hidden = true;
    document.body.style.overflow = '';
  });

  // Time Log Modal controls
  $('#btnTimeLogClose')?.addEventListener('click', () => {
    $('#timeLogModal').hidden = true;
    document.body.style.overflow = '';
  });
  $('#btnTimeLogCancel')?.addEventListener('click', () => {
    $('#timeLogModal').hidden = true;
    document.body.style.overflow = '';
  });
  $('#btnTimeMinus')?.addEventListener('click', () => {
    const input = $('#timeLogManualInput');
    const val = Math.max(0, (Number(input.value) || 0) - 15);
    input.value = val;
    updateTimeLogModalUI(val, getHabitTarget(activeTimeLogHabit), 'mins');
  });
  $('#btnTimePlus')?.addEventListener('click', () => {
    const input = $('#timeLogManualInput');
    const val = (Number(input.value) || 0) + 15;
    input.value = val;
    updateTimeLogModalUI(val, getHabitTarget(activeTimeLogHabit), 'mins');
  });
  $$('.quick-time-btn:not(.target-preset-btn)').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = $('#timeLogManualInput');
      let val = Number(input.value) || 0;
      if (btn.dataset.add) val += Number(btn.dataset.add);
      else if (btn.dataset.set) val = Number(btn.dataset.set);
      input.value = val;
      updateTimeLogModalUI(val, getHabitTarget(activeTimeLogHabit), 'mins');
    });
  });
  $('#timeLogManualInput')?.addEventListener('input', (e) => {
    updateTimeLogModalUI(e.target.value, getHabitTarget(activeTimeLogHabit), 'mins');
  });
  $('#btnTimeLogSave')?.addEventListener('click', () => {
    if (!activeTimeLogHabit) return;
    const val = Math.max(0, Number($('#timeLogManualInput')?.value) || 0);
    setDailyLogValue(today(), activeTimeLogHabit, val);
    $('#timeLogModal').hidden = true;
    document.body.style.overflow = '';
    renderAll();
    toast(`Saved ${val} mins for ${getTrackLabel(activeTimeLogHabit)}!`);
  });

  // Today checkin action
  $('#btnCheckin')?.addEventListener('click', () => {
    const target = checkinTarget();
    if (!target) {
      toast('Check in unlocks after 8:00 PM when today is complete!');
      return;
    }
    S.checkins[target] = true;
    logIt(`Checked in for ${target} — all active anchors held.`);
    save();
    renderAll();
    toast('Great job! Day successfully confirmed.');
  });

  // Urge protocol handlers
  $('#btnUrge')?.addEventListener('click', openUrge);
  $('#btnFloatUrge')?.addEventListener('click', openUrge);
  $('#btnUrgeClose')?.addEventListener('click', () => closeUrge(false));
  $('#btnUrgeDone')?.addEventListener('click', () => closeUrge(true));
  $('#btnNextPrompt')?.addEventListener('click', nextPrompt);

  $$('.urge-tab').forEach((tab) => {
    tab.addEventListener('click', () => switchUrgeTab(tab.dataset.step));
  });

  // Wisdom
  $('#btnNextWisdom')?.addEventListener('click', () => renderWisdom(true));

  // Edit triggers shortcut
  $('#btnEditPlaybookTriggers')?.addEventListener('click', openSettings);

  // Replay tour button
  $('#btnReplayTour')?.addEventListener('click', () => {
    $('#settingsModal').hidden = true;
    openOnboarding(1);
  });

  // Perk Close
  $('#btnPerkClose')?.addEventListener('click', () => {
    $('#milestonePerkModal').hidden = true;
    document.body.style.overflow = '';
  });
  $('#btnPerkTopClose')?.addEventListener('click', () => {
    $('#milestonePerkModal').hidden = true;
    document.body.style.overflow = '';
  });
  $('#btnPerkAction')?.addEventListener('click', () => {
    S.user.goldThemeActive = true;
    document.documentElement.setAttribute('data-theme-style', 'gold');
    save();
    $('#milestonePerkModal').hidden = true;
    document.body.style.overflow = '';
    toast('Royal Gold Edition theme activated!');
  });

  // Export / Import
  $('#btnExport')?.addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anchor-backup-${today()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  $('#btnImport')?.addEventListener('click', () => $('#fileImport')?.click());
  $('#fileImport')?.addEventListener('change', (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => {
      try {
        const incoming = JSON.parse(ev.target.result);
        if (incoming && incoming.tracks) {
          S = { ...seed(), ...incoming, version: 1 };
          save();
          renderAll();
          closeWelcomeLanding();
          toast('Data imported successfully!');
        }
      } catch {
        toast('Invalid backup file.');
      }
    };
    r.readAsText(f);
  });

  // Erase All Data in Settings & Activity Log
  const triggerResetModal = () => {
    $('#settingsModal').hidden = true;
    $('#resetDataModal').hidden = false;
    $('#resetDataPhraseInput').value = '';
    const btn = $('#btnConfirmResetData');
    btn.disabled = true;
    btn.style.opacity = '0.4';
    btn.style.cursor = 'not-allowed';
    document.body.style.overflow = 'hidden';
  };

  $('#btnOpenResetData')?.addEventListener('click', triggerResetModal);
  $('#btnWipe')?.addEventListener('click', triggerResetModal);

  $('#btnResetDataClose')?.addEventListener('click', () => {
    $('#resetDataModal').hidden = true;
    document.body.style.overflow = '';
  });
  $('#btnCancelResetData')?.addEventListener('click', () => {
    $('#resetDataModal').hidden = true;
    document.body.style.overflow = '';
  });
  $('#resetDataPhraseInput')?.addEventListener('input', (e) => {
    const btn = $('#btnConfirmResetData');
    if (e.target.value.toLowerCase().trim() === 'delete my data') {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
    } else {
      btn.disabled = true;
      btn.style.opacity = '0.4';
      btn.style.cursor = 'not-allowed';
    }
  });
  $('#btnConfirmResetData')?.addEventListener('click', () => {
    localStorage.removeItem(KEY);
    S = seed();
    save();
    $('#resetDataModal').hidden = true;
    document.body.style.overflow = '';
    renderAll();
    openWelcomeLanding();
    toast('All data has been erased successfully.');
  });
}


/* === 14b. Referral & Referral Tracking Engine ================ */
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

  // If admin parameter is in URL, navigate to standalone admin page
  if (params.has('admin')) {
    window.location.href = 'admin.html';
    return;
  }

  // If partner parameter is in URL, auto-open partner portal
  if (params.has('partner')) {
    openPartnerModal(params.get('partner') || '');
  }
}

/* === 14c. Subscription 7-Day Free Trial & Currency System === */
const PAYSTACK_PUBLIC_KEY = 'pk_test_e903b70f371c2bcb30ec49b9bd845804035e78df';

const CURRENCIES = {
  NGN: { symbol: '₦', amount: '2,000', display: '₦2,000', name: 'NGN' },
  USD: { symbol: '$', amount: '2.99', display: '$2.99', name: 'USD' },
  GBP: { symbol: '£', amount: '2.49', display: '£2.49', name: 'GBP' }
};

function isTrialEnded() {
  const start = S.firstRun || S.user?.joinedDate || today();
  return diffDays(start, today()) >= 7;
}

function detectUserCurrency() {
  if (S.user.currency && CURRENCIES[S.user.currency]) {
    return S.user.currency;
  }
  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
    if (tz.includes('lagos') || tz.includes('accra') || tz.includes('nairobi') || tz.includes('cairo') || tz.includes('africa')) {
      return 'NGN';
    }
    if (tz.includes('london') || tz.includes('europe/london') || tz.includes('belfast')) {
      return 'GBP';
    }
  } catch {}
  return 'USD';
}

function renderSubPrice() {
  const currCode = S.user.currency || detectUserCurrency();
  const c = CURRENCIES[currCode] || CURRENCIES.NGN;
  
  const priceDisplay = $('#subPriceDisplay');
  if (priceDisplay) {
    priceDisplay.innerHTML = `${c.display} <span style="font-size:1rem; font-weight:normal; color:var(--ink-dim);">/ month</span>`;
  }

  const payPaystackText = $('#btnPayPaystackText');
  if (payPaystackText) {
    payPaystackText.textContent = `Pay Securely with Card / Transfer (${c.display})`;
  }

  const payText = $('#btnPayText');
  if (payText) {
    payText.textContent = `Alternative: Pay via WhatsApp (${c.display})`;
  }

  const name = S.user.name ? encodeURIComponent(S.user.name) : 'User';
  const ref = S.user.referrer ? encodeURIComponent(S.user.referrer) : 'direct';
  const waUrl = `https://wa.me/2348021184502?text=Hello!%20I%20am%20${name}%20(Ref:%20${ref}).%20I%20want%20to%20get%20my%20Anchor%20Monthly%20Passcode%20(${encodeURIComponent(c.display)})`;
  const payBtn = $('#btnPayWhatsApp');
  if (payBtn) payBtn.href = waUrl;

  const emailInput = $('#subEmailInput');
  if (emailInput && !emailInput.value) {
    emailInput.value = S.user.email || currentUser?.email || '';
  }

  $$('.curr-btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.currency === currCode);
  });
}

function loadPaystackScript(callback) {
  if (typeof PaystackPop !== 'undefined') {
    callback();
    return;
  }
  const existing = document.getElementById('paystack-inline-js');
  if (existing) {
    existing.addEventListener('load', callback);
    return;
  }
  const s = document.createElement('script');
  s.id = 'paystack-inline-js';
  s.src = 'https://js.paystack.co/v1/inline.js';
  s.onload = callback;
  s.onerror = () => toast('Unable to load Paystack payment gateway. Check your internet connection.');
  document.head.appendChild(s);
}

function payWithPaystack() {
  loadPaystackScript(() => {
    try {
      const currCode = S.user.currency || detectUserCurrency();
      const c = CURRENCIES[currCode] || CURRENCIES.NGN;
      
      let amountMinor = 200000; // default 2,000 NGN in kobo
      if (currCode === 'USD') amountMinor = 299; // $2.99
      if (currCode === 'GBP') amountMinor = 249; // £2.49

      const emailInput = $('#subEmailInput');
      const email = (emailInput?.value || '').trim() || S.user.email || currentUser?.email || 'user@anchor-habits.app';

      if (typeof PaystackPop === 'undefined') {
        toast('Paystack payment gateway is loading. Please try again.');
        return;
      }

      const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: amountMinor,
        currency: currCode === 'NGN' ? 'NGN' : 'NGN', // Starter accounts default to NGN settlement
        ref: 'ANC_' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
          custom_fields: [
            { display_name: "User ID", variable_name: "user_id", value: currentUser?.uid || S.firstRun || 'guest' },
            { display_name: "Referrer", variable_name: "referrer", value: S.user.referrer || 'direct' },
            { display_name: "Subscriber Name", variable_name: "subscriber_name", value: S.user.name || 'Anchor User' }
          ]
        },
        callback: function(response) {
          const paymentRef = response.reference || 'PAYSTACK-SUCCESS';
          unlockApp(paymentRef);
          toast('Payment successful! Full Access Unlocked.');
        },
        onClose: function() {
          toast('Payment window closed.');
        }
      });

      handler.openIframe();
    } catch (err) {
      console.error('Paystack Launch Error:', err);
      toast('Payment error: ' + (err.message || 'Could not launch payment window.'));
    }
  });
}

function setCurrency(code) {
  if (CURRENCIES[code]) {
    S.user.currency = code;
    save();
    renderSubPrice();
  }
}

function openSubModal() {
  const modal = $('#subModal');
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  renderSubPrice();
}

function closeSubModal() {
  $('#subModal').hidden = true;
  document.body.style.overflow = '';
}

window.openSubModal = openSubModal;
window.closeSubModal = closeSubModal;
window.isTrialEnded = isTrialEnded;
window.unlockApp = unlockApp;
window.payWithPaystack = payWithPaystack;

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
    toast('Full Access Unlocked!');
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

/* === 14d. Secret Admin Dashboard ============================ */
function openAdmin() {
  const pin = (prompt('Enter Admin Master PIN:') || '').trim().toLowerCase();
  const validPins = ['4397'];
  if (S.user?.adminPin) validPins.push(String(S.user.adminPin).toLowerCase());
  
  if (!validPins.includes(pin)) {
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
  if (S.partners) {
    Object.entries(S.partners).forEach(([code, p]) => {
      if (S.deletedPartners && S.deletedPartners.includes(code)) return;
      totalVisits += p.visits || 0;
      totalSubs += p.subs || 0;
    });
  }

  const grossRev = totalSubs * 2000;
  const netProfit = grossRev * 0.5;

  if ($('#adminTotalVisits')) $('#adminTotalVisits').textContent = String(totalVisits);
  if ($('#adminTotalSubs')) $('#adminTotalSubs').textContent = String(totalSubs);
  if ($('#adminTotalRev')) $('#adminTotalRev').textContent = `₦${grossRev.toLocaleString()}`;
  if ($('#adminNetProfit')) $('#adminNetProfit').textContent = `₦${netProfit.toLocaleString()}`;

  const tbody = $('#adminPartnerTableBody');
  if (!tbody) return;

  const validEntries = Object.entries(S.partners || {}).filter(([code]) => {
    return !S.deletedPartners || !S.deletedPartners.includes(code);
  });

  const rows = validEntries.map(([code, p]) => {
    const pRev = (p.subs || 0) * 2000;
    const pPayout = pRev * 0.5;
    const deleteBtn = code !== 'direct'
      ? `<button class="btn-delete-partner" data-delete-partner="${code}" style="background:rgba(244,63,94,0.1); border:1px solid rgba(244,63,94,0.3); color:#f87171; cursor:pointer; font-size:0.75rem; padding:0.25rem 0.5rem; border-radius:var(--radius); font-weight:600;" title="Delete Partner Code">Delete</button>`
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

/* === 14e. Dedicated Partner Portal Controller =============== */
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
  if ($('#settingsModal') && !$('#settingsModal').hidden) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
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


/* === 15. Ambient Particle Field ============================== */
function startField() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = document.getElementById('field');
  if (!c) return;
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

function startReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el) => io.observe(el));
}

function registerSW() {
  if (!('serviceWorker' in navigator)) return;
  if (['localhost', '127.0.0.1'].includes(location.hostname)) {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      for (let reg of regs) reg.unregister();
    });
    if (typeof caches !== 'undefined') {
      caches.keys().then((keys) => {
        for (let k of keys) caches.delete(k);
      });
    }
    return;
  }
  if (location.protocol === 'https:') {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
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
initWaveCanvas();

// Check 7-Day Subscription Free Trial
if (isTrialEnded() && !S.user?.unlocked) {
  openSubModal();
}

// Show Welcome Landing if user is not onboarded
if (!S.user.onboarded) {
  openWelcomeLanding();
}

})();

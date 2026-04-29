// Shared data + helpers for NL Tracker

const SKILLS = {
  listen:  { key: 'listen',  label: 'Luisteren',   short: 'L', icon: '◐', color: 'oklch(0.72 0.14 55)' },
  read:    { key: 'read',    label: 'Lezen',       short: 'R', icon: '▤', color: 'oklch(0.70 0.10 220)' },
  write:   { key: 'write',   label: 'Schrijven',   short: 'W', icon: '✎', color: 'oklch(0.70 0.08 150)' },
  grammar: { key: 'grammar', label: 'Grammatica',  short: 'G', icon: '§', color: 'oklch(0.65 0.11 305)' },
};

const TAGS = ['Podcast', 'Boek', 'Artikel', 'Video', 'Gesprek', 'Oefening', 'Cursus', 'App'];

// Seeded 42-day history (so numbers feel real, not randomly jumpy)
function seedHistory() {
  const days = 42;
  const today = new Date(); today.setHours(0,0,0,0);
  const hist = [];
  // deterministic pseudo-random
  let s = 17;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    const dow = d.getDay();
    // base pattern: weekdays lighter, weekends heavier; occasional 0
    let base = dow === 0 || dow === 6 ? 140 : 80;
    base += (rnd() - 0.4) * 90;
    if (rnd() < 0.12) base = 0;                    // skip days
    if (i < 6 && rnd() < 0.3) base *= 1.4;         // recent ramp
    const total = Math.max(0, Math.round(base));
    const listen  = Math.round(total * (0.35 + rnd() * 0.2));
    const read    = Math.round(total * (0.15 + rnd() * 0.2));
    const write   = Math.round(Math.max(0, total - listen - read) * (0.4 + rnd() * 0.3));
    const grammar = Math.max(0, total - listen - read - write);
    const anki    = total > 0 ? Math.round(15 + rnd() * 35) : (rnd() < 0.6 ? Math.round(10 + rnd()*20) : 0);
    hist.push({
      date: d.toISOString().slice(0,10),
      dow,
      total, listen, read, write, grammar, anki,
    });
  }
  return hist;
}

const HISTORY = seedHistory();
const TODAY = HISTORY[HISTORY.length - 1];

// Compute streak (days in a row with any minutes, ending today or yesterday)
function computeStreak(hist) {
  let streak = 0;
  for (let i = hist.length - 1; i >= 0; i--) {
    if (hist[i].total > 0) streak++;
    else break;
  }
  return streak;
}

function fmtMin(m) {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  if (h === 0) return `${mm}m`;
  if (mm === 0) return `${h}u`;
  return `${h}u ${mm}m`;
}

function fmtH(m) {
  return (m / 60).toFixed(1);
}

// Today's recent log entries (for the Overview timeline)
const RECENT = [
  { t: '09:12', skill: 'listen',  mins: 28, tag: 'Podcast',  note: 'NPR Radio 1 — ochtendnieuws' },
  { t: '13:40', skill: 'read',    mins: 22, tag: 'Artikel',  note: 'NRC — opinie' },
  { t: '19:05', skill: 'grammar', mins: 15, tag: 'Oefening', note: 'Werkwoordstijden — B1 hoofdstuk 4' },
];

Object.assign(window, { SKILLS, TAGS, HISTORY, TODAY, RECENT, computeStreak, fmtMin, fmtH });

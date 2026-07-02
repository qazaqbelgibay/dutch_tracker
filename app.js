/* ════════════════════════════════════════════════════════════
   Language Tracker — application logic
   Multi-language: one IndexedDB per tracked language, fully
   separate data/settings. UI language & theme follow the
   selected language (see i18n.js).
   ════════════════════════════════════════════════════════════ */

// ══════════════════════════════════════════════════
// LANGUAGE STATE
// ══════════════════════════════════════════════════
const LANG_STORE_KEY = 'tracker_lang';
let L = LANGS[localStorage.getItem(LANG_STORE_KEY)] || LANGS.nl;

function t(key, params) {
  let s = (I18N[L.code] && I18N[L.code][key]) || I18N.nl[key] || key;
  if (params) for (const [k, v] of Object.entries(params)) s = s.replaceAll('{' + k + '}', v);
  return s;
}

function skillInfo(skill) {
  const meta = SKILL_META[skill] || SKILL_META.grammar;
  return {
    ...meta,
    label: t('skill_' + skill),
    short: t('skill_' + skill + '_s')
  };
}

// ══════════════════════════════════════════════════
// DATABASE (IndexedDB, one per language)
// ══════════════════════════════════════════════════
const DB_VERSION = 3;
let db;

function openDB(dbName) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(dbName, DB_VERSION);
    req.onupgradeneeded = e => {
      const d = e.target.result;
      const oldV = e.oldVersion;
      if (oldV < 1) {
        const s = d.createObjectStore('logs', { keyPath: 'id', autoIncrement: true });
        s.createIndex('date', 'date');
        s.createIndex('skill', 'skill');
        d.createObjectStore('settings', { keyPath: 'key' });
      }
      if (oldV < 2) {
        try {
          const logsStore = e.target.transaction.objectStore('logs');
          logsStore.createIndex('tags', 'tags', { multiEntry: true });
        } catch (err) {}
      }
      if (oldV < 3) {
        const goalsStore = d.createObjectStore('goals', { keyPath: 'id' });
        goalsStore.createIndex('status', 'status');
        const progressStore = d.createObjectStore('goal_progress', { keyPath: 'id' });
        progressStore.createIndex('goalId', 'goalId');
        progressStore.createIndex('date', 'date');
        if (d.objectStoreNames.contains('vocab')) d.deleteObjectStore('vocab');
        if (d.objectStoreNames.contains('anki')) d.deleteObjectStore('anki');
        const ankiStore = d.createObjectStore('anki', { keyPath: 'id', autoIncrement: true });
        ankiStore.createIndex('date', 'date');
      }
    };
    req.onsuccess = e => { db = e.target.result; resolve(db); };
    req.onerror = e => reject(e.target.error);
  });
}

function dbPut(store, data) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const r = tx.objectStore(store).put(data);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

function dbDelete(store, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const r = tx.objectStore(store).delete(id);
    r.onsuccess = () => resolve();
    r.onerror = () => reject(r.error);
  });
}

function dbGetAll(store) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const r = tx.objectStore(store).getAll();
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

function dbGet(store, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const r = tx.objectStore(store).get(key);
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

function dbClear(store) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const r = tx.objectStore(store).clear();
    r.onsuccess = () => resolve();
    r.onerror = () => reject(r.error);
  });
}

// ══════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════
let extendDayPastMidnight = false;
const fmtDate = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const today = () => {
  const now = new Date();
  if (extendDayPastMidnight && now.getHours() < 3) {
    const d = new Date(now);
    d.setDate(d.getDate() - 1);
    return fmtDate(d);
  }
  return fmtDate(now);
};
const genId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const fmtHours = mins => mins >= 60 ? `${(mins / 60).toFixed(1)}${t('hours_short')}` : `${mins}min`;

const GOAL_COLORS = {
  '--amber': { color: 'var(--amber)', fill: 'var(--amber-glow)' },
  '--teal': { color: 'var(--teal)', fill: 'var(--teal-dim)' },
  '--blue': { color: 'var(--blue)', fill: 'var(--blue-dim)' },
  '--purple': { color: 'var(--purple)', fill: 'var(--purple-dim)' },
  '--red': { color: 'var(--red)', fill: 'var(--red-dim)' }
};

let hourGoal = 2;
let weekOffset = 0;
let lastAction = null;
let currentPeriod = 'week';
let statsTagFilter = null;
let statsSkillFilter = null;
let isPassive = false;
let isTimerPassive = false;

function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 1800);
}

function showUndo(text, action) {
  lastAction = action;
  const bar = document.getElementById('undoBar');
  document.getElementById('undoText').textContent = text;
  bar.classList.add('show');
  clearTimeout(bar._timer);
  bar._timer = setTimeout(() => { bar.classList.remove('show'); lastAction = null; }, 5000);
}

async function undoLast() {
  if (!lastAction) return;
  await lastAction();
  lastAction = null;
  document.getElementById('undoBar').classList.remove('show');
  showToast(t('t_undone'));
  refreshAll();
}

// ══════════════════════════════════════════════════
// LANGUAGE / THEME APPLICATION
// ══════════════════════════════════════════════════
function renderLangSwitch() {
  const wrap = document.getElementById('langSwitch');
  wrap.innerHTML = Object.values(LANGS).map(lang =>
    `<button class="lang-btn ${lang.code === L.code ? 'active' : ''}" onclick="switchLang('${lang.code}')">
      <span>${lang.flag}</span><span>${lang.short}</span>
    </button>`
  ).join('');
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  document.getElementById('calcHint').innerHTML = t('calc_hint');
}

function skillOptionsHtml(includeAll) {
  let html = includeAll ? `<option value="">${t('all_skills')}</option>` : '';
  SKILLS.forEach(s => { html += `<option value="${s}">${t('skill_' + s)}</option>`; });
  return html;
}

function renderSkillChips(containerId, context) {
  const el = document.getElementById(containerId);
  el.innerHTML = SKILLS.map((s, i) =>
    `<button type="button" class="skill-chip ${i === 0 ? 'active' : ''}" data-skill="${s}"
       onclick="pickSkill('${context}','${s}',this)">
       <span class="chip-letter">${t('skill_' + s + '_s')}</span>${t('skill_' + s)}</button>`
  ).join('');
}

function renderTagPills(containerId) {
  const el = document.getElementById(containerId);
  el.innerHTML = L.tags.map(tag =>
    `<span class="tag-pill" data-tag="${tag}" onclick="toggleTag(this)">${tag.charAt(0).toUpperCase() + tag.slice(1)}</span>`
  ).join('');
}

function populateSelects() {
  document.getElementById('timerSkill').innerHTML = skillOptionsHtml(false);
  document.getElementById('manualSkill').innerHTML = skillOptionsHtml(false);
  document.getElementById('calcSkill').innerHTML = skillOptionsHtml(false);
  document.getElementById('editSkill').innerHTML = skillOptionsHtml(false);
  document.getElementById('goalSkillFilter').innerHTML = skillOptionsHtml(true);
  document.getElementById('goalRecurringSkillFilter').innerHTML = skillOptionsHtml(true);
  document.getElementById('goalStreakSkillFilter').innerHTML = skillOptionsHtml(true);
  document.getElementById('goalUnit').innerHTML =
    L.unitOptions.map(u => `<option value="${u.value}">${t(u.key)}</option>`).join('');
  document.getElementById('goalRecurringUnit').innerHTML =
    L.recurringUnitOptions.map(u => `<option value="${u.value}">${t(u.key)}</option>`).join('');
}

function updateThemeMeta() {
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  document.getElementById('themeColorMeta').setAttribute('content', bg);
}

function applyLanguage() {
  const root = document.documentElement;
  root.lang = L.code;
  Object.keys(LANGS).forEach(code => root.classList.remove('lang-' + code));
  root.classList.add('lang-' + L.code);

  document.getElementById('wordmark').textContent = L.wordmark;
  document.getElementById('docTitle').textContent = L.title;
  document.title = L.title;
  document.getElementById('flagStripes').innerHTML =
    L.stripes.map(c => `<i style="background:${c}"></i>`).join('');
  document.getElementById('versionTag').textContent = `${L.short}_TRACKER · V4 · OFFLINE`;
  document.getElementById('dataNote').innerHTML = t('data_note', { lang: L.name });

  const hd = document.getElementById('headerDate');
  hd.textContent = new Date().toLocaleDateString(L.locale, { weekday: 'long', day: 'numeric', month: 'long' });

  renderLangSwitch();
  applyI18n();
  renderQuickAdd();
  renderSkillChips('timerChips', 'timer');
  renderSkillChips('manualChips', 'manual');
  renderTagPills('manualTags');
  renderTagPills('editTags');
  populateSelects();
  onSkillChange();
  onTimerSkillChange();
  updateThemeMeta();
}

async function switchLang(code) {
  if (code === L.code || !LANGS[code]) return;
  if (timerRunning || timerSeconds > 0) { showToast(t('t_stop_timer')); return; }

  localStorage.setItem(LANG_STORE_KEY, code);
  if (db) { try { db.close(); } catch (e) {} }
  L = LANGS[code];

  // Reset transient per-language state
  weekOffset = 0;
  statsTagFilter = null;
  statsSkillFilter = null;
  calcValues = [];
  isPassive = false;
  isTimerPassive = false;
  lastAction = null;
  document.getElementById('undoBar').classList.remove('show');
  closeEditModal();
  closeGoalModal();
  closeGoalProgressModal();

  await openDB(L.dbName);
  await loadSettings();
  if (L.code === 'nl') await migrateExistingGoals();
  applyLanguage();
  calcRender();
  document.getElementById('manualDate').value = today();
  document.getElementById('ankiDate').value = today();
  document.getElementById('manualMinutes').value = '';
  document.getElementById('manualNotes').value = '';
  document.querySelectorAll('.manual-form .qa-chip').forEach(c => c.classList.remove('selected'));
  historySearch = '';
  document.getElementById('historySearch').value = '';
  showArchivedGoals = false;
  refreshDashboard();
  if (document.getElementById('viewStats').classList.contains('active')) refreshStats();
}

// ══════════════════════════════════════════════════
// QUICK ADD (one-tap logging on the dashboard)
// ══════════════════════════════════════════════════
let qaMinutes = 15;

function renderQuickAdd() {
  const minsRow = document.getElementById('qaMinsRow');
  minsRow.innerHTML = [10, 15, 20, 30, 45, 60].map(m =>
    `<button type="button" class="qa-chip ${m === qaMinutes ? 'selected' : ''}" onclick="qaSetMins(${m}, this)">${m}m</button>`
  ).join('');
  document.getElementById('qaSkillGrid').innerHTML = SKILLS.map(s => {
    const sc = skillInfo(s);
    return `<button type="button" class="qa-skill-btn" onclick="quickLog('${s}', qaMinutes)">
      <span class="qa-ic">${sc.icon}</span>${sc.label}</button>`;
  }).join('');
}

function qaSetMins(m, el) {
  qaMinutes = m;
  document.querySelectorAll('#qaMinsRow .qa-chip').forEach(c => c.classList.toggle('selected', c === el));
}

// ══════════════════════════════════════════════════
// ACHIEVEMENT BADGES
// ══════════════════════════════════════════════════
function computeBestStreak(logs) {
  const dates = [...new Set(logs.map(l => l.date))].sort();
  let best = 0, run = 0, prev = null;
  for (const ds of dates) {
    if (prev) {
      const nd = new Date(prev + 'T00:00:00');
      nd.setDate(nd.getDate() + 1);
      run = fmtDate(nd) === ds ? run + 1 : 1;
    } else run = 1;
    best = Math.max(best, run);
    prev = ds;
  }
  return best;
}

function computeBadgeMetrics(logs, ankiEntries) {
  const byDate = {};
  logs.forEach(l => { byDate[l.date] = (byDate[l.date] || 0) + l.minutes; });

  // Max distinct skills practised within a single ISO week
  const weekSkills = {};
  logs.forEach(l => {
    const wk = l.date.slice(0, 4) + '-' + getISOWeek(new Date(l.date + 'T00:00:00'));
    (weekSkills[wk] = weekSkills[wk] || new Set()).add(l.skill);
  });

  // Longest run of consecutive days meeting the daily goal
  const goalMin = hourGoal * 60;
  const goalDates = Object.keys(byDate).filter(dt => byDate[dt] >= goalMin).sort();
  let pBest = 0, pRun = 0, pPrev = null;
  for (const ds of goalDates) {
    if (pPrev) {
      const nd = new Date(pPrev + 'T00:00:00');
      nd.setDate(nd.getDate() + 1);
      pRun = fmtDate(nd) === ds ? pRun + 1 : 1;
    } else pRun = 1;
    pBest = Math.max(pBest, pRun);
    pPrev = ds;
  }

  return {
    sessions: logs.length,
    streak: computeBestStreak(logs),
    hours: logs.reduce((s, l) => s + l.minutes, 0) / 60,
    maxday: Math.max(0, ...Object.values(byDate)) / 60,
    allskills: Math.max(0, ...Object.values(weekSkills).map(s => s.size)),
    anki: ankiEntries.reduce((s, a) => s + (a.cards || 0), 0),
    perfectweek: pBest
  };
}

function renderBadges(metrics) {
  const grid = document.getElementById('badgesGrid');
  grid.innerHTML = BADGE_DEFS.map(b => {
    const val = metrics[b.metric] || 0;
    const earned = val >= b.target;
    return `<div class="badge-tile ${earned ? 'earned' : 'locked'}">
      <span class="badge-ic">${b.icon}</span>
      <div class="badge-name">${t(b.nameKey)}</div>
      <div class="badge-desc">${t(b.descKey)}</div>
      <div class="badge-progress">${earned ? '✓' : Math.floor(val) + '/' + b.target}</div>
    </div>`;
  }).join('');
}

async function checkNewBadges(metrics) {
  let seen = [];
  try {
    const s = await dbGet('settings', 'badges_earned');
    if (s && Array.isArray(s.value)) seen = s.value;
  } catch (e) {}
  const earned = BADGE_DEFS.filter(b => (metrics[b.metric] || 0) >= b.target).map(b => b.id);
  const fresh = earned.filter(id => !seen.includes(id));
  if (fresh.length === 0) return;
  // Announce at most one per refresh to avoid toast spam
  const def = BADGE_DEFS.find(b => b.id === fresh[0]);
  setTimeout(() => showToast(`${def.icon} ${t('t_new_badge', { name: t(def.nameKey) })}`), 700);
  await dbPut('settings', { key: 'badges_earned', value: [...new Set([...seen, ...earned])] });
}

// ══════════════════════════════════════════════════
// DAILY REMINDER (in-app; notification when permitted)
// ══════════════════════════════════════════════════
let reminderEnabled = false;
let reminderTime = '19:00';

function toggleReminder() {
  reminderEnabled = !reminderEnabled;
  document.getElementById('reminderToggle').classList.toggle('on', reminderEnabled);
  dbPut('settings', { key: 'reminderEnabled', value: reminderEnabled });
  if (reminderEnabled && 'Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

function updateReminderTime(v) {
  reminderTime = v || '19:00';
  dbPut('settings', { key: 'reminderTime', value: reminderTime });
}

async function checkReminder() {
  if (!reminderEnabled || !db) return;
  const now = new Date();
  const [h, m] = reminderTime.split(':').map(Number);
  if (now.getHours() < h || (now.getHours() === h && now.getMinutes() < m)) return;
  const d = today();
  try {
    const last = await dbGet('settings', 'reminderLast');
    if (last && last.value === d) return;
    await dbPut('settings', { key: 'reminderLast', value: d });
    const logs = await dbGetAll('logs');
    if (logs.some(l => l.date === d)) return; // already studied today
    const msg = t('reminder_msg');
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(L.title, { body: msg });
    } else {
      showToast(msg);
    }
  } catch (e) {}
}

// ══════════════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════════════
function switchTab(name, btn) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('view' + name).classList.add('active');
  btn.classList.add('active');
  document.getElementById('content').scrollTop = 0;
  if (name === 'Dashboard') refreshDashboard();
  if (name === 'Stats') refreshStats();
}

// ══════════════════════════════════════════════════
// QUICK LOG
// ══════════════════════════════════════════════════
async function quickLog(skill, minutes, passive) {
  const entry = { date: today(), skill, minutes, tags: [], notes: '', passive: !!passive, timestamp: Date.now() };
  const id = await dbPut('logs', entry);
  const s = skillInfo(skill);
  showToast(`${s.icon} +${minutes} min ${s.label}${passive ? ` (${t('passive_tag')})` : ''}`);
  showUndo(`${s.icon} +${minutes}min`, () => dbDelete('logs', id));
  refreshAll();
}

// ══════════════════════════════════════════════════
// TIMER (STOPWATCH)
// ══════════════════════════════════════════════════
let timerInterval = null;
let timerSeconds = 0;
let timerRunning = false;

function timerUpdateDisplay() {
  const h = Math.floor(timerSeconds / 3600);
  const m = Math.floor((timerSeconds % 3600) / 60);
  const s = timerSeconds % 60;
  document.getElementById('timerDisplay').textContent =
    String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function timerStart() {
  if (timerRunning) return;
  timerRunning = true;
  document.getElementById('timerDisplay').classList.add('running');
  document.getElementById('timerDisplay').classList.remove('paused');
  document.getElementById('timerStartBtn').style.display = 'none';
  document.getElementById('timerPauseBtn').style.display = '';
  document.getElementById('timerStopBtn').style.display = '';
  document.getElementById('timerSaveSection').style.display = 'none';
  timerInterval = setInterval(() => { timerSeconds++; timerUpdateDisplay(); }, 1000);
}

function timerPause() {
  if (!timerRunning) return;
  timerRunning = false;
  clearInterval(timerInterval);
  document.getElementById('timerDisplay').classList.remove('running');
  document.getElementById('timerDisplay').classList.add('paused');
  document.getElementById('timerPauseBtn').style.display = 'none';
  document.getElementById('timerStartBtn').style.display = '';
}

function timerStop() {
  timerRunning = false;
  clearInterval(timerInterval);
  document.getElementById('timerDisplay').classList.remove('running', 'paused');
  document.getElementById('timerStartBtn').style.display = 'none';
  document.getElementById('timerPauseBtn').style.display = 'none';
  document.getElementById('timerStopBtn').style.display = 'none';
  if (timerSeconds > 0) {
    const mins = Math.round(timerSeconds / 60);
    document.getElementById('timerResultTime').textContent = mins > 0 ? mins + ' min' : '< 1 min';
    document.getElementById('timerSaveSection').style.display = '';
  } else {
    timerReset();
  }
}

function timerSave() {
  const mins = Math.max(1, Math.round(timerSeconds / 60));
  const skill = document.getElementById('timerSkill').value;
  const passive = skill === 'listening' && isTimerPassive;
  quickLog(skill, mins, passive);
  isTimerPassive = false;
  const tp = document.getElementById('timerPassiveToggle');
  if (tp) tp.classList.remove('on');
  timerReset();
}

function timerDiscard() { timerReset(); }

function timerReset() {
  timerSeconds = 0;
  timerRunning = false;
  clearInterval(timerInterval);
  timerUpdateDisplay();
  document.getElementById('timerDisplay').classList.remove('running', 'paused');
  document.getElementById('timerStartBtn').style.display = '';
  document.getElementById('timerPauseBtn').style.display = 'none';
  document.getElementById('timerStopBtn').style.display = 'none';
  document.getElementById('timerSaveSection').style.display = 'none';
}

// ══════════════════════════════════════════════════
// VIDEO LENGTH CALCULATOR
// ══════════════════════════════════════════════════
let calcValues = [];

// Accepts "12:34" (12 min 34 sec), "1:02:30" (h:m:s) or decimal minutes ("24.5")
function parseCalcInput() {
  const input = document.getElementById('calcInput');
  const raw = input.value.trim().replace(',', '.');
  if (!raw) return null;
  let val;
  if (raw.includes(':')) {
    const parts = raw.split(':').map(p => parseFloat(p));
    if (parts.some(isNaN)) return null;
    if (parts.length === 3) val = parts[0] * 60 + parts[1] + parts[2] / 60;
    else val = parts[0] + parts[1] / 60;
  } else {
    val = parseFloat(raw);
  }
  return (isNaN(val) || val <= 0) ? null : val;
}

function fmtCalcVal(v) {
  const sign = v < 0 ? '−' : '+';
  const abs = Math.abs(v);
  const m = Math.floor(abs);
  const s = Math.round((abs - m) * 60);
  return s > 0 ? `${sign}${m}:${String(s).padStart(2, '0')}` : `${sign}${m}m`;
}

function calcAdd() {
  const val = parseCalcInput();
  if (val === null) { showToast(t('t_fill_time')); return; }
  calcValues.push(val);
  calcAfterInput();
}

function calcSubtract() {
  const val = parseCalcInput();
  if (val === null) { showToast(t('t_fill_time')); return; }
  calcValues.push(-val);
  calcAfterInput();
}

function calcAfterInput() {
  const input = document.getElementById('calcInput');
  input.value = '';
  input.focus();
  calcRender();
}

function calcRemoveEntry(index) {
  calcValues.splice(index, 1);
  calcRender();
}

function calcClear() {
  calcValues = [];
  calcRender();
}

function calcRender() {
  const total = calcValues.reduce((s, v) => s + v, 0);
  document.getElementById('calcTotal').textContent = total.toFixed(1);
  const alt = document.getElementById('calcTotalAlt');
  if (alt) {
    if (total > 0) {
      const m = Math.floor(total);
      const s = Math.round((total - m) * 60);
      alt.textContent = `= ${m} min ${String(s).padStart(2, '0')} sec`;
    } else {
      alt.textContent = '';
    }
  }
  document.getElementById('calcEntries').innerHTML = calcValues.map((v, i) =>
    '<span class="calc-entry' + (v < 0 ? ' neg' : '') + '">' + fmtCalcVal(v) +
    '<button class="calc-entry-remove" onclick="calcRemoveEntry(' + i + ')">&times;</button></span>'
  ).join('');
}

function calcTransfer() {
  const total = calcValues.reduce((s, v) => s + v, 0);
  if (total <= 0) { showToast(t('t_no_values')); return; }
  const rounded = Math.round(total);
  document.getElementById('manualMinutes').value = rounded;
  showToast(t('t_transferred', { n: rounded }));
  document.getElementById('manualMinutes').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function calcSaveSession() {
  const total = calcValues.reduce((s, v) => s + v, 0);
  if (total <= 0) { showToast(t('t_no_values')); return; }
  const mins = Math.max(1, Math.round(total));
  const skill = document.getElementById('calcSkill').value;
  quickLog(skill, mins);
  calcClear();
}

// ── Skill chips & quick minutes ──
function pickSkill(context, skill, el) {
  const selId = context === 'timer' ? 'timerSkill' : 'manualSkill';
  document.getElementById(selId).value = skill;
  el.parentElement.querySelectorAll('.skill-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  if (context === 'timer') onTimerSkillChange(); else onSkillChange();
}

function quickMins(n, el) {
  document.getElementById('manualMinutes').value = n;
  el.parentElement.querySelectorAll('.qa-chip').forEach(c => c.classList.toggle('selected', c === el));
}

// ── Tags & Manual Entry ──
function toggleTag(el) {
  el.classList.toggle('selected');
}

function getSelectedTags() {
  return [...document.querySelectorAll('#manualTags .tag-pill.selected')].map(el => el.dataset.tag);
}

async function saveManualEntry() {
  const date = document.getElementById('manualDate').value;
  const skill = document.getElementById('manualSkill').value;
  const minutes = parseInt(document.getElementById('manualMinutes').value) || 0;
  const notes = document.getElementById('manualNotes').value.trim();
  const tags = getSelectedTags();

  if (!date) { showToast(t('t_pick_date')); return; }
  if (minutes === 0) { showToast(t('t_fill_minutes')); return; }

  const passive = skill === 'listening' && isPassive;
  const entry = { date, skill, minutes, tags, notes, passive, timestamp: Date.now() };
  const id = await dbPut('logs', entry);

  const s = skillInfo(skill);
  showToast(`${s.icon} ${t('t_saved')}`);
  showUndo(t('t_manual_undo'), () => dbDelete('logs', id));

  document.getElementById('manualMinutes').value = '';
  document.getElementById('manualNotes').value = '';
  document.querySelectorAll('#manualTags .tag-pill').forEach(p => p.classList.remove('selected'));
  document.querySelectorAll('.manual-form .qa-chip').forEach(c => c.classList.remove('selected'));
  isPassive = false;
  const pt = document.getElementById('passiveToggle');
  if (pt) pt.classList.remove('on');
  refreshAll();
}

// ── Passive Listening Toggle ──
function togglePassive() {
  isPassive = !isPassive;
  document.getElementById('passiveToggle').classList.toggle('on', isPassive);
}
function toggleTimerPassive() {
  isTimerPassive = !isTimerPassive;
  document.getElementById('timerPassiveToggle').classList.toggle('on', isTimerPassive);
}
function onSkillChange() {
  const skill = document.getElementById('manualSkill').value;
  document.getElementById('passiveToggleWrap').style.display = skill === 'listening' ? '' : 'none';
  if (skill !== 'listening') { isPassive = false; document.getElementById('passiveToggle').classList.remove('on'); }
}
function onTimerSkillChange() {
  const skill = document.getElementById('timerSkill').value;
  document.getElementById('timerPassiveWrap').style.display = skill === 'listening' ? '' : 'none';
  if (skill !== 'listening') { isTimerPassive = false; document.getElementById('timerPassiveToggle').classList.remove('on'); }
}
function onEditSkillChange() {
  const skill = document.getElementById('editSkill').value;
  document.getElementById('editPassiveWrap').style.display = skill === 'listening' ? '' : 'none';
}

// ── Anki Log ──
async function saveAnkiEntry() {
  const date = document.getElementById('ankiDate').value;
  const cards = parseInt(document.getElementById('ankiCards').value) || 0;
  if (!date) { showToast(t('t_pick_date')); return; }
  if (cards === 0) { showToast(t('t_fill_cards')); return; }
  const entry = { date, cards, timestamp: Date.now() };
  const id = await dbPut('anki', entry);
  showToast(t('t_anki_saved'));
  showUndo(t('t_anki_undo'), () => dbDelete('anki', id));
  document.getElementById('ankiCards').value = '';
  refreshAll();
}

// ── Edit Entry ──
let editingEntryId = null;
let editPassiveState = false;

async function editEntry(id) {
  const entry = await dbGet('logs', id);
  if (!entry) { showToast(t('t_not_found')); return; }
  editingEntryId = id;
  document.getElementById('editEntryId').value = id;
  document.getElementById('editDate').value = entry.date;
  document.getElementById('editSkill').value = entry.skill;
  document.getElementById('editMinutes').value = entry.minutes;
  document.getElementById('editNotes').value = entry.notes || '';
  editPassiveState = !!entry.passive;
  document.getElementById('editPassiveToggle').classList.toggle('on', editPassiveState);
  document.getElementById('editPassiveWrap').style.display = entry.skill === 'listening' ? '' : 'none';
  document.querySelectorAll('#editTags .tag-pill').forEach(p => {
    p.classList.toggle('selected', (entry.tags || []).includes(p.dataset.tag));
  });
  document.getElementById('editModal').classList.add('show');
}

function toggleEditPassive() {
  editPassiveState = !editPassiveState;
  document.getElementById('editPassiveToggle').classList.toggle('on', editPassiveState);
}

function closeEditModal() {
  document.getElementById('editModal').classList.remove('show');
  editingEntryId = null;
}

async function saveEdit() {
  const id = editingEntryId;
  if (!id) return;
  const oldEntry = await dbGet('logs', id);
  const date = document.getElementById('editDate').value;
  const skill = document.getElementById('editSkill').value;
  const minutes = parseInt(document.getElementById('editMinutes').value) || 0;
  const notes = document.getElementById('editNotes').value.trim();
  const tags = [...document.querySelectorAll('#editTags .tag-pill.selected')].map(el => el.dataset.tag);
  const passive = skill === 'listening' && editPassiveState;
  if (!date || minutes === 0) { showToast(t('t_fill_date_min')); return; }
  const updated = { ...oldEntry, date, skill, minutes, notes, tags, passive, timestamp: Date.now() };
  await dbPut('logs', updated);
  showToast(t('t_updated'));
  showUndo(t('t_edit_undo'), () => dbPut('logs', oldEntry));
  closeEditModal();
  refreshAll();
}

// ══════════════════════════════════════════════════
// DASHBOARD REFRESH
// ══════════════════════════════════════════════════
// Compute the effective daily goal in hours from pinned total goals with a deadline.
// Falls back to the manual hourGoal setting if no relevant big goals exist.
async function computeEffectiveDailyGoal(logs) {
  let goals = [];
  try { goals = await dbGetAll('goals'); } catch (e) {}
  const relevantGoals = goals.filter(g =>
    g.status === 'active' &&
    g.pinToDashboard &&
    g.type === 'total' &&
    g.deadline &&
    g.metrics && g.metrics.some(m => m.source === 'auto_hours' && m.unit === L.hoursUnit)
  );
  if (relevantGoals.length === 0) return hourGoal;

  let ankiEntries = [];
  let progressEntries = [];
  try { ankiEntries = await dbGetAll('anki'); } catch (e) {}
  try { progressEntries = await dbGetAll('goal_progress'); } catch (e) {}

  let totalPace = 0;
  for (const goal of relevantGoals) {
    const progress = await computeGoalProgress(goal, logs, ankiEntries, progressEntries);
    for (const p of progress) {
      if (p.unit === L.hoursUnit) {
        const pace = computeDailyPace(goal, p);
        if (pace && !pace.expired && pace.needed > 0) totalPace += parseFloat(pace.needed);
      }
    }
  }
  return totalPace > 0 ? totalPace : hourGoal;
}

async function refreshDashboard() {
  const d = today();

  const logs = await dbGetAll('logs');
  const todayLogs = logs.filter(l => l.date === d);
  const totalMin = todayLogs.reduce((s, l) => s + l.minutes, 0);
  document.getElementById('todayHours').textContent = (totalMin / 60).toFixed(1);
  document.getElementById('heroUnit').textContent = t('hours_unit');

  renderTodaySessions(todayLogs);

  const allTotalMin = logs.reduce((s, l) => s + l.minutes, 0);
  document.getElementById('totalStudyHours').textContent = (allTotalMin / 60).toFixed(2);
  document.getElementById('totalHoursUnit').textContent = ' ' + t('hours_short');

  let ankiEntries = [];
  try { ankiEntries = await dbGetAll('anki'); } catch (e) {}
  const todayAnki = ankiEntries.filter(a => a.date === d).reduce((s, a) => s + (a.cards || 0), 0);
  document.getElementById('todayAnki').textContent = todayAnki;

  await renderGoals(logs);

  const effectiveDailyGoal = await computeEffectiveDailyGoal(logs);

  const streak = calcStreak(logs);
  document.getElementById('streakCount').textContent = streak;
  const bestStreak = computeBestStreak(logs);
  document.getElementById('streakBest').textContent =
    bestStreak > 0 && bestStreak !== streak ? t('best_streak', { n: bestStreak }) : '';

  // Streak-at-risk banner: nothing logged today, active streak, evening
  const riskBlock = document.getElementById('riskBannerBlock');
  const showRisk = totalMin === 0 && streak > 0 && new Date().getHours() >= 17;
  riskBlock.style.display = showRisk ? '' : 'none';
  if (showRisk) document.getElementById('riskBanner').textContent = t('risk_banner', { n: streak });

  checkNewBadges(computeBadgeMetrics(logs, ankiEntries));

  renderWeekGrid(logs, effectiveDailyGoal);

  // Goal ring
  const goalPct = Math.min(100, (totalMin / (effectiveDailyGoal * 60)) * 100);
  document.getElementById('goalCurrent').textContent = (totalMin / 60).toFixed(1);
  document.getElementById('dailyGoalDisplay').textContent = `/ ${effectiveDailyGoal.toFixed(1)}${t('hours_short')}`;
  document.getElementById('goalPct').textContent = Math.round(goalPct) + '%';
  const circumference = 213.6;
  document.getElementById('goalRing').style.strokeDashoffset = circumference * (1 - goalPct / 100);
  let goalColor, goalMsg;
  if (goalPct === 0) { goalColor = 'var(--text3)'; goalMsg = t('goal_msg_0'); }
  else if (goalPct < 25) { goalColor = 'var(--red)'; goalMsg = t('goal_msg_25'); }
  else if (goalPct < 50) { goalColor = 'var(--accent)'; goalMsg = t('goal_msg_50'); }
  else if (goalPct < 75) { goalColor = 'var(--accent)'; goalMsg = t('goal_msg_75'); }
  else if (goalPct < 100) { goalColor = 'var(--blue)'; goalMsg = t('goal_msg_99'); }
  else { goalColor = 'var(--teal)'; goalMsg = t('goal_msg_100'); }
  document.getElementById('goalRing').style.stroke = goalColor;
  document.getElementById('goalPct').style.color = goalColor;
  document.getElementById('goalMsg').textContent = goalMsg;
  const goalLeftEl = document.getElementById('goalLeft');
  if (goalLeftEl) {
    if (goalPct >= 100) {
      goalLeftEl.textContent = '';
    } else {
      const hoursLeft = Math.max(0, effectiveDailyGoal - totalMin / 60);
      goalLeftEl.textContent = t('left_to_go', { n: hoursLeft.toFixed(1) });
    }
  }

  renderSkillBars('skillBarsTotal', logs, null, true);
}

function calcStreak(logs) {
  const dates = [...new Set(logs.map(l => l.date))].sort().reverse();
  if (dates.length === 0) return 0;
  const d = today();
  let streak = 0;
  let checkDate = new Date(d);
  if (!dates.includes(d)) checkDate.setDate(checkDate.getDate() - 1);
  for (let i = 0; i < 1000; i++) {
    const ds = checkDate.toISOString().split('T')[0];
    if (dates.includes(ds)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function renderSkillBars(containerId, logs, maxMin, showTotal) {
  const container = document.getElementById(containerId);
  let totalAll = 0;
  const mins = {};
  SKILLS.forEach(s => {
    mins[s] = logs.filter(l => l.skill === s).reduce((sum, l) => sum + l.minutes, 0);
    totalAll += mins[s];
  });

  const listenActive = logs.filter(l => l.skill === 'listening' && !l.passive).reduce((s, l) => s + l.minutes, 0);
  const listenPassive = logs.filter(l => l.skill === 'listening' && l.passive).reduce((s, l) => s + l.minutes, 0);

  let html = '';
  SKILLS.forEach(s => {
    const m = mins[s];
    const sc = skillInfo(s);
    const pct = maxMin ? Math.min(100, (m / maxMin) * 100 * 4) : (totalAll ? (m / totalAll) * 100 : 0);
    const timeStr = showTotal ? fmtHours(m) : `${m}min`;
    html += `
      <div class="skill-bar-wrap">
        <div class="skill-bar-header">
          <div class="skill-bar-name"><span class="dot" style="background:${sc.color}"></span>${sc.label}</div>
          <div class="skill-bar-time">${timeStr}</div>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" style="width:${Math.max(pct, m > 0 ? 3 : 0)}%;background:${sc.color}"></div>
        </div>
      </div>`;

    if (s === 'listening' && (listenActive > 0 || listenPassive > 0)) {
      const rows = [
        { label: t('active_label'), v: listenActive, color: 'var(--teal)' },
        { label: t('passive_label'), v: listenPassive, color: 'rgba(45,212,168,0.5)' }
      ];
      for (const r of rows) {
        if (r.v <= 0) continue;
        const rPct = maxMin ? Math.min(100, (r.v / maxMin) * 100 * 4) : (totalAll ? (r.v / totalAll) * 100 : 0);
        html += `<div class="skill-bar-wrap" style="margin-left:20px;margin-top:-4px">
          <div class="skill-bar-header">
            <div class="skill-bar-name" style="font-size:11px;color:var(--text3)">${r.label}</div>
            <div class="skill-bar-time" style="font-size:10px">${showTotal ? fmtHours(r.v) : r.v + 'min'}</div>
          </div>
          <div class="skill-bar-track" style="height:4px">
            <div class="skill-bar-fill" style="width:${Math.max(rPct, 3)}%;background:${r.color}"></div>
          </div>
        </div>`;
      }
    }
  });

  if (showTotal && totalAll > 0) {
    html += `<div class="skill-total">${t('total_label')}: ${(totalAll / 60).toFixed(1)}${t('hours_short')}</div>`;
  }
  container.innerHTML = html;
}

function renderTodaySessions(todayLogs) {
  const wrap = document.getElementById('todaySessions');
  if (!wrap) return;
  const countEl = document.getElementById('todaySessionCount');
  const sorted = [...todayLogs].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  const totalMin = sorted.reduce((s, l) => s + l.minutes, 0);
  if (countEl) {
    countEl.textContent = sorted.length ? `${sorted.length} · ${fmtHours(totalMin)}` : '';
  }
  if (sorted.length === 0) {
    wrap.innerHTML = `<div class="empty-state">${t('sessions_empty')}</div>`;
    return;
  }
  let html = '';
  for (const log of sorted) {
    const sc = skillInfo(log.skill);
    const tm = log.timestamp
      ? new Date(log.timestamp).toLocaleTimeString(L.locale, { hour: '2-digit', minute: '2-digit' })
      : '—';
    const meta = [...(log.tags || []), log.passive ? t('passive_tag') : null].filter(Boolean).join(' · ');
    html += `<div class="session-row">
      <span class="session-time mono">${tm}</span>
      <span class="session-chip" style="background:${sc.bg};color:${sc.color}">${sc.short}</span>
      <div class="session-info">
        <div class="session-skill">${sc.label}${meta ? ` <span class="session-meta">· ${meta}</span>` : ''}</div>
        ${log.notes ? `<div class="session-note">${log.notes}</div>` : ''}
      </div>
      <span class="session-mins mono">${log.minutes}m</span>
      <button class="row-action" onclick="editEntry(${log.id})" title="${t('edit_action')}">✎</button>
    </div>`;
  }
  wrap.innerHTML = html;
}

function renderWeekGrid(logs, effectiveDailyGoal) {
  const goal = effectiveDailyGoal || hourGoal;
  const grid = document.getElementById('weekGrid');
  const todayStr = today();
  const todayDate = new Date(todayStr + 'T00:00:00');

  const dayOfWeek = todayDate.getDay();
  const monday = new Date(todayDate);
  monday.setDate(todayDate.getDate() - ((dayOfWeek + 6) % 7) + weekOffset * 7);

  const weekNum = getISOWeek(monday);
  const titleEl = document.getElementById('weekTitle');
  if (titleEl) titleEl.textContent = weekOffset === 0 ? t('week_now', { n: weekNum }) : t('week_label', { n: weekNum });
  const nextBtn = document.getElementById('weekNextBtn');
  if (nextBtn) nextBtn.disabled = weekOffset === 0;

  let html = '';
  let weekTotalMins = 0;

  for (let i = 0; i < 7; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const ds = fmtDate(date);
    const dayMins = logs.filter(l => l.date === ds).reduce((s, l) => s + l.minutes, 0);
    const hours = (dayMins / 60).toFixed(1);
    const isToday = ds === todayStr;
    const isFuture = ds > todayStr;

    let cls = 'empty';
    if (!isFuture && dayMins > 0) {
      if (dayMins >= goal * 60) cls = 'good';
      else if (dayMins >= goal * 30) cls = 'mid';
      else cls = 'low';
    }

    html += `
      <div class="week-cell ${cls} ${isToday ? 'today' : ''}">
        <span class="day-name">${L.dayNames[i]}</span>
        <span class="day-hours">${isFuture ? '–' : hours}</span>
      </div>`;
    if (!isFuture) weekTotalMins += dayMins;
  }
  html += `<div class="week-total">${t('week_total', { n: (weekTotalMins / 60).toFixed(1) })}</div>`;
  grid.innerHTML = html;

  // Weekly goal summary
  const weeklyTarget = goal * 7;
  const weekHours = weekTotalMins / 60;
  const weekPct = Math.min(100, (weekHours / weeklyTarget) * 100);
  const summaryEl = document.getElementById('weekGoalSummary');
  if (summaryEl) {
    const summaryColor = weekPct >= 100 ? 'var(--teal)' : weekPct >= 50 ? 'var(--accent)' : 'var(--text3)';
    const weekLeft = Math.max(0, weeklyTarget - weekHours);
    summaryEl.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:12px">
        <span style="color:var(--text3);font-weight:600">${t('week_goal')}</span>
        <span class="mono" style="color:${summaryColor};font-weight:700">${weekHours.toFixed(1)} / ${weeklyTarget.toFixed(1)}${t('hours_short')}</span>
      </div>
      <div class="goal-progress-track" style="margin-bottom:${weekPct < 100 ? '4px' : '8px'}">
        <div class="goal-progress-fill" style="width:${weekPct}%;background:${summaryColor}"></div>
      </div>
      ${weekPct < 100 && weekOffset === 0 ? `<div class="mono" style="text-align:right;margin-bottom:8px;font-size:11px;color:var(--text3)">${t('left_to_go', { n: weekLeft.toFixed(1) })}</div>` : ''}`;
  }
}

// ══════════════════════════════════════════════════
// STATS / CHARTS
// ══════════════════════════════════════════════════
function setPeriod(p, btn) {
  currentPeriod = p;
  document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  refreshStats();
}

async function refreshStats() {
  const allLogs = await dbGetAll('logs');

  // Tag filter pills
  const allTags = [...new Set(allLogs.flatMap(l => l.tags || []))].sort();
  const filterContainer = document.getElementById('statsTagFilter');
  let filterHtml = '<span class="tag-pill' + (!statsTagFilter ? ' selected' : '') + '" onclick="setStatsTagFilter(null, this)">' + t('all_label') + '</span>';
  allTags.forEach(tag => {
    filterHtml += '<span class="tag-pill' + (statsTagFilter === tag ? ' selected' : '') + '" data-tag="' + tag + '" onclick="setStatsTagFilter(\'' + tag + '\', this)">' + tag.charAt(0).toUpperCase() + tag.slice(1) + '</span>';
  });
  filterContainer.innerHTML = filterHtml;

  // Skill filter pills for the history list
  const skillPills = document.getElementById('statsSkillPills');
  if (skillPills) {
    let sHtml = '<span class="tag-pill' + (!statsSkillFilter ? ' selected' : '') + '" onclick="setStatsSkillFilter(null, this)">' + t('all_label') + '</span>';
    SKILLS.forEach(key => {
      sHtml += '<span class="tag-pill' + (statsSkillFilter === key ? ' selected' : '') + '" onclick="setStatsSkillFilter(\'' + key + '\', this)">' + t('skill_' + key) + '</span>';
    });
    skillPills.innerHTML = sHtml;
  }

  const logs = statsTagFilter
    ? allLogs.filter(l => (l.tags || []).includes(statsTagFilter))
    : allLogs;

  const now = new Date();
  let startDate;
  if (currentPeriod === 'week') {
    startDate = new Date(now); startDate.setDate(now.getDate() - 6);
  } else if (currentPeriod === 'month') {
    startDate = new Date(now); startDate.setDate(now.getDate() - 29);
  } else {
    const allDates = logs.map(l => l.date);
    startDate = allDates.length ? new Date(allDates.sort()[0]) : new Date(now);
  }
  startDate.setHours(0, 0, 0, 0);

  const dates = [];
  const d = new Date(startDate);
  const endDate = new Date(now);
  endDate.setHours(23, 59, 59, 999);
  while (d <= endDate) {
    dates.push(fmtDate(d));
    d.setDate(d.getDate() + 1);
  }

  const hoursData = dates.map(dt => {
    const mins = logs.filter(l => l.date === dt).reduce((s, l) => s + l.minutes, 0);
    return mins / 60;
  });

  const skillTotals = {};
  SKILLS.forEach(s => {
    const filtered = logs.filter(l => l.date >= dates[0] && l.date <= dates[dates.length - 1] && l.skill === s);
    skillTotals[s] = filtered.reduce((sum, l) => sum + l.minutes, 0);
  });

  const tagTotals = {};
  const periodLogs = logs.filter(l => dates.length > 0 && l.date >= dates[0] && l.date <= dates[dates.length - 1]);
  periodLogs.forEach(l => {
    (l.tags || []).forEach(tag => { tagTotals[tag] = (tagTotals[tag] || 0) + l.minutes; });
  });

  drawBarChart('hoursChart', dates, hoursData, 'var(--accent)', hourGoal);
  drawDonutChart('skillChart', skillTotals);
  drawTagChart(tagTotals);
  renderHistory(dates, logs);

  // Fixed-window widgets (independent of period/tag filters)
  renderSummaryTiles(allLogs);
  renderHeatmap(allLogs);
  let ankiEntries = [];
  try { ankiEntries = await dbGetAll('anki'); } catch (e) {}
  renderBadges(computeBadgeMetrics(allLogs, ankiEntries));
}

// ── Summary tiles: this week vs last, 30-day averages ──
function renderSummaryTiles(logs) {
  const el = document.getElementById('summaryTiles');
  const dayStr = off => { const d = new Date(); d.setDate(d.getDate() + off); return fmtDate(d); };
  const minsBetween = (from, to) => logs.filter(l => l.date >= from && l.date <= to).reduce((s, l) => s + l.minutes, 0);
  const t0 = today();

  const last7 = minsBetween(dayStr(-6), t0);
  const prev7 = minsBetween(dayStr(-13), dayStr(-7));
  let deltaHtml = `<div class="summary-delta">${t('summary_vs')}: —</div>`;
  if (prev7 > 0) {
    const pct = Math.round(((last7 - prev7) / prev7) * 100);
    const cls = pct > 0 ? 'up' : pct < 0 ? 'down' : '';
    deltaHtml = `<div class="summary-delta ${cls}">${pct >= 0 ? '+' : ''}${pct}% ${t('summary_vs')}</div>`;
  }

  const from30 = dayStr(-29);
  const logs30 = logs.filter(l => l.date >= from30 && l.date <= t0);
  const last30 = logs30.reduce((s, l) => s + l.minutes, 0);
  const activeDays = new Set(logs30.map(l => l.date)).size;
  const skillMins = {};
  logs30.forEach(l => { skillMins[l.skill] = (skillMins[l.skill] || 0) + l.minutes; });
  const top = Object.entries(skillMins).sort((a, b) => b[1] - a[1])[0];
  const topInfo = top ? skillInfo(top[0]) : null;

  el.innerHTML = `
    <div class="card summary-tile">
      <span class="eyebrow">${t('summary_week')}</span>
      <div class="summary-val">${(last7 / 60).toFixed(1)}<span class="sm">${t('hours_short')}</span></div>
      ${deltaHtml}
    </div>
    <div class="card summary-tile">
      <span class="eyebrow">${t('summary_avg')}</span>
      <div class="summary-val">${(last30 / 30 / 60).toFixed(1)}<span class="sm">${t('hours_short')}</span></div>
    </div>
    <div class="card summary-tile">
      <span class="eyebrow">${t('summary_active')}</span>
      <div class="summary-val">${activeDays}<span class="sm">/30</span></div>
    </div>
    <div class="card summary-tile">
      <span class="eyebrow">${t('summary_top')}</span>
      <div class="summary-val" style="font-size:17px;line-height:1.3">${topInfo ? topInfo.icon + ' ' + topInfo.label : '—'}</div>
      ${top ? `<div class="summary-delta">${fmtHours(top[1])}</div>` : ''}
    </div>`;
}

// ── GitHub-style activity heatmap, last 16 weeks ──
function renderHeatmap(logs) {
  const grid = document.getElementById('heatmapGrid');
  const byDate = {};
  logs.forEach(l => { byDate[l.date] = (byDate[l.date] || 0) + l.minutes; });
  const todayStr = today();
  const todayDate = new Date(todayStr + 'T00:00:00');
  const start = new Date(todayDate);
  start.setDate(todayDate.getDate() - ((todayDate.getDay() + 6) % 7) - 15 * 7);

  const goalMin = hourGoal * 60;
  const d = new Date(start);
  let html = '';
  for (let i = 0; i < 16 * 7; i++) {
    const ds = fmtDate(d);
    const mins = byDate[ds] || 0;
    let cls = '';
    if (ds > todayStr) cls = 'future';
    else if (mins >= goalMin) cls = 'good';
    else if (mins >= goalMin / 2) cls = 'mid';
    else if (mins > 0) cls = 'low';
    html += `<span class="hm-cell ${cls}${ds === todayStr ? ' today' : ''}" title="${ds} · ${(mins / 60).toFixed(1)}${t('hours_short')}"></span>`;
    d.setDate(d.getDate() + 1);
  }
  grid.innerHTML = html;
}

// ── History search ──
let historySearch = '';
let _searchTimer;
function onHistorySearch(v) {
  clearTimeout(_searchTimer);
  _searchTimer = setTimeout(() => {
    historySearch = v.trim().toLowerCase();
    refreshStats();
  }, 200);
}

function setStatsTagFilter(tag, el) {
  statsTagFilter = tag;
  document.querySelectorAll('#statsTagFilter .tag-pill').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  refreshStats();
}

function setStatsSkillFilter(skill, el) {
  statsSkillFilter = skill;
  document.querySelectorAll('#statsSkillPills .tag-pill').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
  refreshStats();
}

function setupCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.scale(dpr, dpr);
  return { ctx, w: rect.width, h: rect.height };
}

function drawTagChart(tagTotals) {
  const canvas = document.getElementById('tagChart');
  if (!canvas) return;
  const { ctx, w, h } = setupCanvas(canvas);
  ctx.clearRect(0, 0, w, h);

  const style = getComputedStyle(document.documentElement);
  const tags = Object.keys(tagTotals).sort((a, b) => tagTotals[b] - tagTotals[a]);
  if (tags.length === 0) {
    ctx.fillStyle = style.getPropertyValue('--text3').trim();
    ctx.font = '13px Geist, system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(t('no_tags'), w / 2, h / 2);
    return;
  }

  const pad = { top: 10, right: 10, bottom: 28, left: 80 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;
  const barH = Math.min(chartH / tags.length * 0.7, 24);
  const gap = chartH / tags.length;
  const maxVal = Math.max(...Object.values(tagTotals), 1);
  const barColor = style.getPropertyValue('--purple').trim();
  const textColor = style.getPropertyValue('--text2').trim();

  tags.forEach((tag, i) => {
    const mins = tagTotals[tag];
    const barW = (mins / maxVal) * chartW;
    const y = pad.top + i * gap + (gap - barH) / 2;
    ctx.fillStyle = barColor;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    const r = 3;
    ctx.moveTo(pad.left, y);
    ctx.lineTo(pad.left + barW - r, y);
    ctx.quadraticCurveTo(pad.left + barW, y, pad.left + barW, y + r);
    ctx.lineTo(pad.left + barW, y + barH - r);
    ctx.quadraticCurveTo(pad.left + barW, y + barH, pad.left + barW - r, y + barH);
    ctx.lineTo(pad.left, y + barH);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.fillStyle = textColor;
    ctx.font = '11px Geist, system-ui';
    ctx.textAlign = 'right';
    ctx.fillText(tag.charAt(0).toUpperCase() + tag.slice(1), pad.left - 6, y + barH / 2 + 4);

    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(fmtHours(mins), pad.left + barW + 6, y + barH / 2 + 4);
  });
}

function drawBarChart(canvasId, labels, data, color, goalLine) {
  const canvas = document.getElementById(canvasId);
  const { ctx, w, h } = setupCanvas(canvas);
  const pad = { top: 10, right: 10, bottom: 28, left: 36 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  ctx.clearRect(0, 0, w, h);

  const maxVal = Math.max(...data, goalLine || 0, 1) * 1.2;
  const barW = Math.min(chartW / labels.length * 0.7, 20);
  const gap = chartW / labels.length;

  const style = getComputedStyle(document.documentElement);
  const textColor = style.getPropertyValue('--text3').trim() || '#5a5a6a';
  const gridColor = style.getPropertyValue('--bg3').trim() || '#1e1e28';
  const barColor = style.getPropertyValue(color.replace('var(', '').replace(')', '')).trim() || color;
  const redColor = style.getPropertyValue('--red').trim();

  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + chartH - (chartH * i / 4);
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    ctx.fillStyle = textColor;
    ctx.font = '10px JetBrains Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText((maxVal * i / 4).toFixed(1), pad.left - 4, y + 3);
  }

  if (goalLine) {
    const goalY = pad.top + chartH - (chartH * goalLine / maxVal);
    ctx.strokeStyle = redColor;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pad.left, goalY);
    ctx.lineTo(w - pad.right, goalY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = redColor;
    ctx.font = '9px JetBrains Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText(t('goal_line'), w - pad.right - 34, goalY - 4);
    ctx.globalAlpha = 1;
  }

  data.forEach((val, i) => {
    const x = pad.left + i * gap + (gap - barW) / 2;
    const barH = (val / maxVal) * chartH;
    const y = pad.top + chartH - barH;

    const isToday = labels[i] === today();
    ctx.fillStyle = barColor;
    ctx.globalAlpha = isToday ? 1 : 0.7;
    ctx.beginPath();
    const r = Math.min(3, barW / 2);
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + barW - r, y);
    ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
    ctx.lineTo(x + barW, pad.top + chartH);
    ctx.lineTo(x, pad.top + chartH);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.fill();
    ctx.globalAlpha = 1;

    const showEvery = labels.length > 14 ? Math.ceil(labels.length / 7) : (labels.length > 7 ? 2 : 1);
    if (i % showEvery === 0 || isToday) {
      ctx.fillStyle = isToday ? barColor : textColor;
      ctx.font = `${isToday ? 'bold ' : ''}9px Geist, system-ui`;
      ctx.textAlign = 'center';
      const dateLabel = labels[i].slice(5).replace('-', '/');
      ctx.fillText(dateLabel, x + barW / 2, h - pad.bottom + 14);
    }
  });
}

function drawDonutChart(canvasId, skillTotals) {
  const canvas = document.getElementById(canvasId);
  const { ctx, w, h } = setupCanvas(canvas);
  ctx.clearRect(0, 0, w, h);

  const style = getComputedStyle(document.documentElement);
  const total = Object.values(skillTotals).reduce((s, v) => s + v, 0);
  if (total === 0) {
    ctx.fillStyle = style.getPropertyValue('--text3').trim();
    ctx.font = '13px Geist, system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(t('no_data'), w / 2, h / 2);
    return;
  }

  const colors = {};
  SKILLS.forEach(s => {
    colors[s] = style.getPropertyValue(SKILL_META[s].color.replace('var(', '').replace(')', '')).trim();
  });

  const cx = w * 0.35;
  const cy = h / 2;
  const outerR = Math.min(cx - 10, cy - 10);
  const innerR = outerR * 0.55;

  let angle = -Math.PI / 2;
  Object.entries(skillTotals).forEach(([skill, mins]) => {
    if (mins === 0) return;
    const slice = (mins / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, angle, angle + slice);
    ctx.arc(cx, cy, innerR, angle + slice, angle, true);
    ctx.closePath();
    ctx.fillStyle = colors[skill];
    ctx.fill();
    angle += slice;
  });

  ctx.fillStyle = style.getPropertyValue('--text').trim();
  ctx.font = 'bold 18px JetBrains Mono, monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`${(total / 60).toFixed(1)}${t('hours_short')}`, cx, cy + 2);
  ctx.fillStyle = style.getPropertyValue('--text3').trim();
  ctx.font = '10px Geist, system-ui';
  ctx.fillText(t('total_chart'), cx, cy + 16);

  const legendX = w * 0.65;
  let ly = 10;
  SKILLS.forEach(skill => {
    const mins = skillTotals[skill] || 0;
    const pct = total ? Math.round(mins / total * 100) : 0;
    ctx.fillStyle = colors[skill];
    ctx.beginPath();
    ctx.arc(legendX, ly + 6, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = style.getPropertyValue('--text').trim();
    ctx.font = '12px Geist, system-ui';
    ctx.textAlign = 'left';
    ctx.fillText(t('skill_' + skill), legendX + 14, ly + 10);
    ctx.fillStyle = style.getPropertyValue('--text2').trim();
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText(`${pct}%  ${mins >= 60 ? (mins / 60).toFixed(1) + t('hours_short') : mins + 'm'}`, legendX + 14, ly + 26);
    ly += 33;
  });
}

function renderHistory(dates, logs) {
  const container = document.getElementById('historyList');
  if (statsSkillFilter) logs = logs.filter(l => l.skill === statsSkillFilter);
  if (historySearch) {
    logs = logs.filter(l =>
      (l.notes || '').toLowerCase().includes(historySearch) ||
      (l.tags || []).some(tag => tag.toLowerCase().includes(historySearch)) ||
      t('skill_' + l.skill).toLowerCase().includes(historySearch));
  }
  const reversed = [...dates].reverse().slice(0, currentPeriod === 'all' ? 365 : 31);
  let html = '';
  for (const dt of reversed) {
    const dayLogs = logs.filter(l => l.date === dt);
    if (dayLogs.length === 0) continue;
    const dateObj = new Date(dt);
    const label = dt === today() ? t('today') :
      dateObj.toLocaleDateString(L.locale, { weekday: 'short', day: 'numeric', month: 'short' });
    const dayMins = dayLogs.reduce((s, l) => s + l.minutes, 0);
    html += '<div class="history-day-header">' + label + ' — ' + (dayMins / 60).toFixed(1) + t('hours_short') + '</div>';
    for (const log of dayLogs) {
      const sc = skillInfo(log.skill);
      const passiveLabel = log.passive ? ` (${t('passive_tag')})` : '';
      const meta = (log.tags && log.tags.length ? log.tags.join(', ') : '') +
        (log.notes ? (log.tags && log.tags.length ? ' · ' : '') + log.notes : '');
      html += '<div class="history-entry">' +
        '<div class="history-entry-info">' +
          '<div class="history-entry-skill">' + sc.icon + ' ' + sc.label + passiveLabel + '</div>' +
          (meta ? '<div class="history-entry-meta">' + meta + '</div>' : '') +
        '</div>' +
        '<div class="history-entry-time">' + log.minutes + 'min</div>' +
        '<div style="display:flex;gap:2px">' +
          '<button class="history-delete-btn" onclick="editEntry(' + log.id + ')" title="' + t('edit_action') + '">✏️</button>' +
          '<button class="history-delete-btn" onclick="deleteEntry(\'logs\',' + log.id + ')" title="' + t('delete_action') + '">🗑</button>' +
        '</div>' +
      '</div>';
    }
  }
  container.innerHTML = html || '<div class="empty-state">' + t('no_data') + '</div>';
}

async function deleteEntry(store, id) {
  if (!confirm(t('c_delete_entry'))) return;
  const entry = await dbGet(store, id);
  await dbDelete(store, id);
  showToast(t('t_deleted'));
  showUndo(t('t_delete_undo'), () => dbPut(store, entry));
  refreshAll();
}

// ══════════════════════════════════════════════════
// GOALS SYSTEM
// ══════════════════════════════════════════════════
function getWeekStart() {
  const d = new Date();
  const dow = d.getDay();
  d.setDate(d.getDate() - ((dow + 6) % 7));
  return fmtDate(d);
}

function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function changeWeek(delta) {
  weekOffset = Math.min(0, weekOffset + delta);
  refreshDashboard();
}

async function computeGoalProgress(goal, logs, ankiEntries, progressEntries) {
  const results = [];
  for (const metric of goal.metrics) {
    let current = 0;
    if (metric.source === 'auto_hours') {
      let filtered = logs;
      if (metric.skillFilter) filtered = filtered.filter(l => l.skill === metric.skillFilter);
      if (metric.passiveFilter === 'active_only') filtered = filtered.filter(l => !l.passive);
      else if (metric.passiveFilter === 'passive_only') filtered = filtered.filter(l => l.passive === true);
      if (goal.type === 'recurring') {
        if (metric.recurrence === 'daily') filtered = filtered.filter(l => l.date === today());
        else if (metric.recurrence === 'weekly') {
          const ws = getWeekStart();
          filtered = filtered.filter(l => l.date >= ws);
        }
        current = filtered.reduce((s, l) => s + l.minutes, 0);
      } else {
        current = filtered.reduce((s, l) => s + l.minutes, 0) / 60;
      }
    } else if (metric.source === 'auto_anki') {
      if (goal.type === 'recurring' && metric.recurrence === 'daily') {
        current = ankiEntries.filter(a => a.date === today()).reduce((s, a) => s + (a.cards || 0), 0);
      } else if (goal.type === 'recurring' && metric.recurrence === 'weekly') {
        const ws = getWeekStart();
        current = ankiEntries.filter(a => a.date >= ws).reduce((s, a) => s + (a.cards || 0), 0);
      } else {
        current = ankiEntries.reduce((s, a) => s + (a.cards || 0), 0);
      }
    } else if (metric.source === 'manual') {
      const mine = progressEntries.filter(p => p.goalId === goal.id && p.metricId === metric.id);
      if (goal.type === 'recurring') {
        if (metric.recurrence === 'daily') {
          current = mine.filter(p => p.date === today()).reduce((s, p) => s + p.value, 0);
        } else if (metric.recurrence === 'weekly') {
          const ws = getWeekStart();
          current = mine.filter(p => p.date >= ws).reduce((s, p) => s + p.value, 0);
        }
      } else {
        current = mine.reduce((s, p) => s + p.value, 0);
      }
    }
    const target = goal.type === 'recurring' ? (metric.recurringTarget || metric.target) : metric.target;
    results.push({ metricId: metric.id, label: metric.label, unit: metric.unit, current, target, pct: target > 0 ? Math.min(100, (current / target) * 100) : 0 });
  }
  return results;
}

function computeGoalStreak(goal, logs) {
  const config = goal.streakConfig;
  if (!config) return 0;
  let filtered = logs;
  if (config.skillFilter) filtered = filtered.filter(l => l.skill === config.skillFilter);
  if (!config.includePassive) filtered = filtered.filter(l => !l.passive);
  const dateMinutes = {};
  filtered.forEach(l => { dateMinutes[l.date] = (dateMinutes[l.date] || 0) + l.minutes; });
  let streak = 0;
  let checkDate = new Date(today());
  if (!dateMinutes[today()] || dateMinutes[today()] < config.minimumMinutes) {
    checkDate.setDate(checkDate.getDate() - 1);
  }
  for (let i = 0; i < 1000; i++) {
    const ds = checkDate.toISOString().split('T')[0];
    if (dateMinutes[ds] && dateMinutes[ds] >= config.minimumMinutes) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else break;
  }
  return streak;
}

function computeDailyPace(goal, metricResult) {
  if (!goal.deadline) return null;
  const remaining = metricResult.target - metricResult.current;
  if (remaining <= 0) return { needed: 0, unit: metricResult.unit, daysLeft: 0 };
  const deadlineDate = new Date(goal.deadline);
  const now = new Date(); now.setHours(0, 0, 0, 0);
  if (deadlineDate < now) return { needed: null, expired: true, unit: metricResult.unit, daysLeft: 0 };
  const daysLeft = Math.max(1, Math.ceil((deadlineDate - now) / 86400000));
  return { needed: (remaining / daysLeft).toFixed(1), unit: metricResult.unit, daysLeft };
}

let showArchivedGoals = false;

function toggleArchivedGoals() {
  showArchivedGoals = !showArchivedGoals;
  refreshDashboard();
}

async function restoreGoal(id) {
  const goal = await dbGet('goals', id);
  if (!goal) return;
  goal.status = 'active';
  await dbPut('goals', goal);
  showToast(t('t_goal_restored'));
  refreshAll();
}

async function renderGoals(logs) {
  const container = document.getElementById('goalsSection');
  let goals = [];
  try { goals = await dbGetAll('goals'); } catch (e) {}
  const activeGoals = goals.filter(g => g.status === 'active' && g.pinToDashboard).sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  const archivedGoals = goals.filter(g => g.status === 'archived');
  if (activeGoals.length === 0 && archivedGoals.length === 0) {
    container.innerHTML = '';
    return;
  }
  let ankiEntries = [];
  let progressEntries = [];
  try { ankiEntries = await dbGetAll('anki'); } catch (e) {}
  try { progressEntries = await dbGetAll('goal_progress'); } catch (e) {}

  const style = getComputedStyle(document.documentElement);
  let html = '';
  for (const goal of activeGoals) {
    const colorVar = goal.color || '--amber';
    const colorVal = style.getPropertyValue(colorVar).trim() || '#e8a020';

    html += `<div class="goal-card-new" style="border-color:${colorVal}20">`;
    html += `<div class="goal-card-header">
      <div class="goal-card-name" style="color:${colorVal}">${goal.icon || '🎯'} ${goal.name}</div>
      <div class="goal-card-actions">`;

    const hasManual = goal.metrics && goal.metrics.some(m => m.source === 'manual');
    if (hasManual) {
      const manualMetric = goal.metrics.find(m => m.source === 'manual');
      html += `<button onclick="openGoalProgressModal('${goal.id}','${manualMetric.id}','${manualMetric.label}')" title="${t('update_progress')}">+</button>`;
    }
    html += `<button onclick="openGoalModal('${goal.id}')" title="${t('edit_action')}">✏️</button>`;
    html += `<button onclick="archiveGoal('${goal.id}')" title="${t('archive_action')}">📦</button>`;
    html += `</div></div>`;

    if (goal.type === 'streak') {
      const streak = computeGoalStreak(goal, logs);
      const target = goal.streakConfig ? (goal.metrics[0]?.target || 30) : 30;
      html += `<div class="goal-streak-display">
        <div class="goal-streak-number" style="color:${colorVal}">${streak}</div>
        <div class="goal-streak-label">${t('streak_days_label')}${target ? t('streak_target_label', { n: target }) : ''}</div>
      </div>`;
      const pct = target > 0 ? Math.min(100, (streak / target) * 100) : 0;
      html += `<div class="goal-progress-track"><div class="goal-progress-fill" style="width:${pct}%;background:${colorVal}"></div></div>`;
    } else {
      const progress = await computeGoalProgress(goal, logs, ankiEntries, progressEntries);
      for (const p of progress) {
        const curStr = goal.type === 'recurring' && p.unit === 'min' ? `${Math.round(p.current)}` : (Number.isInteger(p.current) ? p.current : p.current.toFixed(1));
        const tarStr = goal.type === 'recurring' && p.unit === 'min' ? `${p.target}` : p.target;
        html += `<div class="goal-metric">
          <div class="goal-metric-header">
            <span class="goal-metric-label">${p.label}</span>
            <span class="goal-metric-value" style="color:${colorVal}">${curStr} / ${tarStr} ${p.unit}</span>
          </div>
          <div class="goal-progress-track"><div class="goal-progress-fill" style="width:${p.pct}%;background:${colorVal}"></div></div>
        </div>`;

        if (goal.type === 'total' && goal.deadline) {
          const pace = computeDailyPace(goal, p);
          if (pace && pace.expired) {
            html += `<div class="goal-pace">⏳ ${t('deadline_passed')}</div>`;
          } else if (pace && pace.needed > 0) {
            html += `<div class="goal-pace">${t('goal_pace', { n: pace.needed, unit: p.unit, d: pace.daysLeft })}</div>`;
          } else if (pace && pace.needed <= 0) {
            html += `<div class="goal-pace" style="color:var(--teal)">${t('goal_reached')}</div>`;
          }
        }
      }

      if (goal.milestones && goal.milestones.length > 0) {
        const mainProgress = progress[0];
        for (const ms of goal.milestones) {
          const reached = mainProgress && mainProgress.current >= ms.targetValue;
          html += `<div class="goal-milestone ${reached ? 'reached' : ''}">
            ${reached ? '✅' : '⬜'} ${ms.label}${ms.deadline ? ' — ' + ms.deadline : ''}
          </div>`;
        }
      }
    }
    html += `</div>`;
  }

  // Archived goals: collapsible list with restore/delete
  if (archivedGoals.length > 0) {
    html += `<button class="archived-toggle" onclick="toggleArchivedGoals()">${showArchivedGoals ? '▾' : '▸'} ${t('archived_goals', { n: archivedGoals.length })}</button>`;
    if (showArchivedGoals) {
      html += '<div class="archived-list">';
      for (const goal of archivedGoals) {
        html += `<div class="goal-card-new" style="margin-top:8px">
          <div class="goal-card-header" style="margin-bottom:0">
            <div class="goal-card-name">${goal.icon || '🎯'} ${goal.name}</div>
            <div class="goal-card-actions">
              <button onclick="restoreGoal('${goal.id}')" title="${t('restore_action')}">↩️</button>
              <button onclick="deleteGoal('${goal.id}')" title="${t('delete_action')}">🗑</button>
            </div>
          </div>
        </div>`;
      }
      html += '</div>';
    }
  }
  container.innerHTML = html;
}

// ── Goal Modal ──
async function openGoalModal(editId) {
  document.getElementById('goalModalTitle').textContent = editId ? t('goal_modal_edit') : t('goal_modal_new');
  document.getElementById('goalEditId').value = editId || '';
  document.getElementById('milestonesContainer').innerHTML = '';

  if (editId) {
    const goal = await dbGet('goals', editId);
    if (!goal) return;
    document.getElementById('goalName').value = goal.name;
    document.getElementById('goalType').value = goal.type;
    document.getElementById('goalDeadline').value = goal.deadline || '';
    onGoalTypeChange();

    if (goal.type === 'total' && goal.metrics && goal.metrics[0]) {
      const m = goal.metrics[0];
      document.getElementById('goalTarget').value = m.target;
      ensureUnitOption('goalUnit', m.unit);
      document.getElementById('goalUnit').value = m.unit || L.hoursUnit;
      document.getElementById('goalSource').value = m.source;
      document.getElementById('goalSkillFilter').value = m.skillFilter || '';
    } else if (goal.type === 'recurring' && goal.metrics && goal.metrics[0]) {
      const m = goal.metrics[0];
      document.getElementById('goalRecurringTarget').value = m.recurringTarget || m.target;
      document.getElementById('goalRecurrence').value = m.recurrence || 'daily';
      ensureUnitOption('goalRecurringUnit', m.unit);
      document.getElementById('goalRecurringUnit').value = m.unit || 'min';
      document.getElementById('goalRecurringSource').value = m.source;
      document.getElementById('goalRecurringSkillFilter').value = m.skillFilter || '';
    } else if (goal.type === 'streak') {
      document.getElementById('goalStreakTarget').value = goal.metrics[0]?.target || 30;
      document.getElementById('goalStreakMinMinutes').value = goal.streakConfig?.minimumMinutes || 1;
      document.getElementById('goalStreakSkillFilter').value = goal.streakConfig?.skillFilter || '';
      document.getElementById('goalStreakPassiveToggle').classList.toggle('on', goal.streakConfig?.includePassive !== false);
    }

    document.querySelectorAll('#goalColorPicker .tag-pill').forEach(p => {
      p.classList.toggle('selected', p.dataset.color === goal.color);
      if (p.dataset.color === goal.color) {
        p.style.background = `var(${goal.color + (goal.color.includes('amber') ? '-glow' : '-dim')})`;
        p.style.borderColor = `var(${goal.color})`;
      }
    });

    if (goal.milestones) {
      goal.milestones.forEach(ms => addMilestoneField(ms.label, ms.targetValue, ms.deadline));
    }
  } else {
    document.getElementById('goalName').value = '';
    document.getElementById('goalType').value = 'total';
    document.getElementById('goalTarget').value = '';
    document.getElementById('goalDeadline').value = '';
    document.getElementById('goalUnit').value = L.hoursUnit;
    document.getElementById('goalSource').value = 'auto_hours';
    document.getElementById('goalSkillFilter').value = '';
    onGoalTypeChange();
  }
  document.getElementById('goalModal').classList.add('show');
}

// Older entries may carry a unit from another UI language; keep them selectable.
function ensureUnitOption(selectId, unit) {
  if (!unit) return;
  const sel = document.getElementById(selectId);
  if (![...sel.options].some(o => o.value === unit)) {
    const opt = document.createElement('option');
    opt.value = unit;
    opt.textContent = unit;
    sel.appendChild(opt);
  }
}

function closeGoalModal() {
  document.getElementById('goalModal').classList.remove('show');
}

function onGoalTypeChange() {
  const type = document.getElementById('goalType').value;
  document.getElementById('goalTotalFields').style.display = type === 'total' ? '' : 'none';
  document.getElementById('goalRecurringFields').style.display = type === 'recurring' ? '' : 'none';
  document.getElementById('goalStreakFields').style.display = type === 'streak' ? '' : 'none';
}

function addMilestoneField(label, value, deadline) {
  const container = document.getElementById('milestonesContainer');
  const div = document.createElement('div');
  div.className = 'milestone-field';
  div.innerHTML = `
    <input type="text" class="ms-label" placeholder="${t('ms_name_ph')}" value="${label || ''}" style="font-family:var(--sans)">
    <input type="number" class="ms-value" placeholder="${t('ms_value_ph')}" value="${value || ''}" style="width:80px">
    <input type="date" class="ms-deadline" value="${deadline || ''}" style="width:130px">
    <button class="milestone-remove" onclick="this.parentElement.remove()">&times;</button>
  `;
  container.appendChild(div);
}

function pickGoalColor(el) {
  document.querySelectorAll('#goalColorPicker .tag-pill').forEach(p => {
    p.classList.remove('selected');
    p.style.background = '';
    p.style.borderColor = '';
  });
  el.classList.add('selected');
  el.style.borderColor = `var(${el.dataset.color})`;
}

async function saveGoal() {
  const editId = document.getElementById('goalEditId').value;
  const name = document.getElementById('goalName').value.trim();
  const type = document.getElementById('goalType').value;
  const deadline = document.getElementById('goalDeadline').value || null;

  if (!name) { showToast(t('t_fill_name')); return; }

  const colorEl = document.querySelector('#goalColorPicker .tag-pill.selected');
  const color = colorEl ? colorEl.dataset.color : '--amber';

  let metrics = [];
  let streakConfig = null;

  if (type === 'total') {
    const target = parseFloat(document.getElementById('goalTarget').value) || 0;
    const unit = document.getElementById('goalUnit').value;
    const source = document.getElementById('goalSource').value;
    const skillFilter = document.getElementById('goalSkillFilter').value || null;
    if (target <= 0) { showToast(t('t_fill_target')); return; }
    metrics = [{ id: 'main', label: name, unit, target, source, skillFilter, passiveFilter: 'all', recurrence: null, recurringTarget: null }];
  } else if (type === 'recurring') {
    const recurringTarget = parseFloat(document.getElementById('goalRecurringTarget').value) || 0;
    const recurrence = document.getElementById('goalRecurrence').value;
    const unit = document.getElementById('goalRecurringUnit').value;
    const source = document.getElementById('goalRecurringSource').value;
    const skillFilter = document.getElementById('goalRecurringSkillFilter').value || null;
    if (recurringTarget <= 0) { showToast(t('t_fill_target')); return; }
    metrics = [{ id: 'main', label: name, unit, target: recurringTarget, source, skillFilter, passiveFilter: 'all', recurrence, recurringTarget }];
  } else if (type === 'streak') {
    const target = parseInt(document.getElementById('goalStreakTarget').value) || 30;
    const minimumMinutes = parseInt(document.getElementById('goalStreakMinMinutes').value) || 1;
    const skillFilter = document.getElementById('goalStreakSkillFilter').value || null;
    const includePassive = document.getElementById('goalStreakPassiveToggle').classList.contains('on');
    metrics = [{ id: 'main', label: name, unit: t('days_unit'), target, source: 'auto_hours', skillFilter, passiveFilter: 'all', recurrence: null, recurringTarget: null }];
    streakConfig = { minimumMinutes, skillFilter, includePassive };
  }

  const milestones = [...document.querySelectorAll('.milestone-field')].map(div => ({
    id: genId(),
    label: div.querySelector('.ms-label').value.trim(),
    targetValue: parseFloat(div.querySelector('.ms-value').value) || 0,
    deadline: div.querySelector('.ms-deadline').value || null,
    reachedAt: null
  })).filter(ms => ms.label && ms.targetValue > 0);

  const goal = {
    id: editId || genId(),
    name,
    type,
    status: 'active',
    createdAt: Date.now(),
    metrics,
    deadline,
    milestones,
    streakConfig,
    color,
    icon: type === 'streak' ? '🔥' : '🎯',
    pinToDashboard: true,
    sortOrder: 0
  };

  if (editId) {
    const existing = await dbGet('goals', editId);
    if (existing) {
      goal.createdAt = existing.createdAt;
      goal.sortOrder = existing.sortOrder;
    }
  }

  await dbPut('goals', goal);
  showToast(editId ? t('t_goal_updated') : t('t_goal_created'));
  closeGoalModal();
  refreshAll();
}

async function archiveGoal(id) {
  if (!confirm(t('c_archive_goal'))) return;
  const goal = await dbGet('goals', id);
  if (!goal) return;
  goal.status = 'archived';
  await dbPut('goals', goal);
  showToast(t('t_goal_archived'));
  showUndo(t('t_goal_archived'), async () => {
    goal.status = 'active';
    await dbPut('goals', goal);
    refreshAll();
  });
  refreshAll();
}

async function deleteGoal(id) {
  if (!confirm(t('c_delete_goal'))) return;
  const goal = await dbGet('goals', id);
  await dbDelete('goals', id);
  showToast(t('t_goal_deleted'));
  showUndo(t('t_goal_deleted'), () => dbPut('goals', goal));
  refreshAll();
}

// ── Goal Progress Update ──
function openGoalProgressModal(goalId, metricId, label) {
  document.getElementById('goalProgressGoalId').value = goalId;
  document.getElementById('goalProgressMetricId').value = metricId;
  document.getElementById('goalProgressLabel').textContent = label;
  document.getElementById('goalProgressDate').value = today();
  document.getElementById('goalProgressValue').value = '';
  document.getElementById('goalProgressTitle').textContent = t('goal_progress_prefix') + label;
  document.getElementById('goalProgressModal').classList.add('show');
}

function closeGoalProgressModal() {
  document.getElementById('goalProgressModal').classList.remove('show');
}

async function saveGoalProgress() {
  const goalId = document.getElementById('goalProgressGoalId').value;
  const metricId = document.getElementById('goalProgressMetricId').value;
  const date = document.getElementById('goalProgressDate').value;
  const value = parseFloat(document.getElementById('goalProgressValue').value) || 0;
  if (!date || value <= 0) { showToast(t('t_fill_date_value')); return; }
  const entry = { id: `${goalId}_${metricId}_${date}_${Date.now()}`, goalId, metricId, date, value, timestamp: Date.now() };
  await dbPut('goal_progress', entry);
  showToast(t('t_progress_saved'));
  closeGoalProgressModal();
  refreshAll();
}

// ── Default Goal Migration (Dutch DB only, pre-existing users) ──
async function migrateExistingGoals() {
  try {
    const migrated = await dbGet('settings', 'goals_migrated_v3');
    if (migrated) return;
    const thg = await dbGet('settings', 'totalHourGoal');
    const targetHours = thg ? thg.value : 500;
    const defaultGoal = {
      id: 'b1_exam_legacy',
      name: 'B1 Examen',
      type: 'total',
      status: 'active',
      createdAt: Date.now(),
      metrics: [{ id: 'hours', label: 'Studie-uren', unit: 'uur', target: targetHours, source: 'auto_hours', skillFilter: null, passiveFilter: 'all', recurrence: null, recurringTarget: null }],
      deadline: '2026-05-10',
      milestones: [],
      streakConfig: null,
      color: '--amber',
      icon: '🎯',
      pinToDashboard: true,
      sortOrder: 0
    };
    await dbPut('goals', defaultGoal);
    await dbPut('settings', { key: 'goals_migrated_v3', value: true });
  } catch (e) { console.log('Goal migration skipped:', e); }
}

// ══════════════════════════════════════════════════
// SETTINGS
// ══════════════════════════════════════════════════
async function loadSettings() {
  // Defaults first (fresh language DB)
  hourGoal = 2;
  extendDayPastMidnight = false;
  document.documentElement.classList.remove('light-mode');
  document.getElementById('themeToggle').textContent = '☀️';
  document.getElementById('darkToggle').classList.add('on');
  document.getElementById('goalInput').value = 2;
  document.getElementById('extendDayToggle').classList.remove('on');
  reminderEnabled = false;
  reminderTime = '19:00';
  document.getElementById('reminderToggle').classList.remove('on');
  document.getElementById('reminderTime').value = '19:00';

  try {
    const theme = await dbGet('settings', 'theme');
    if (theme && theme.value === 'light') {
      document.documentElement.classList.add('light-mode');
      document.getElementById('themeToggle').textContent = '🌙';
      document.getElementById('darkToggle').classList.remove('on');
    }
    const goal = await dbGet('settings', 'hourGoal');
    if (goal) { hourGoal = goal.value; document.getElementById('goalInput').value = hourGoal; }
    const extend = await dbGet('settings', 'extendDay');
    if (extend && extend.value) {
      extendDayPastMidnight = true;
      document.getElementById('extendDayToggle').classList.add('on');
    }
    const rEnabled = await dbGet('settings', 'reminderEnabled');
    if (rEnabled && rEnabled.value) {
      reminderEnabled = true;
      document.getElementById('reminderToggle').classList.add('on');
    }
    const rTime = await dbGet('settings', 'reminderTime');
    if (rTime && rTime.value) {
      reminderTime = rTime.value;
      document.getElementById('reminderTime').value = reminderTime;
    }
  } catch (e) {}
  updateThemeMeta();
}

function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light-mode');
  document.getElementById('themeToggle').textContent = isLight ? '🌙' : '☀️';
  const toggle = document.getElementById('darkToggle');
  if (isLight) toggle.classList.remove('on'); else toggle.classList.add('on');
  dbPut('settings', { key: 'theme', value: isLight ? 'light' : 'dark' });
  updateThemeMeta();
  if (document.getElementById('viewStats').classList.contains('active')) refreshStats();
}

function updateGoal(val) {
  hourGoal = parseFloat(val) || 2;
  dbPut('settings', { key: 'hourGoal', value: hourGoal });
  refreshAll();
}

function toggleExtendDay() {
  extendDayPastMidnight = !extendDayPastMidnight;
  const toggle = document.getElementById('extendDayToggle');
  if (extendDayPastMidnight) toggle.classList.add('on'); else toggle.classList.remove('on');
  dbPut('settings', { key: 'extendDay', value: extendDayPastMidnight });
  refreshAll();
}

// ── Export / Import / Reset (active language only) ──
async function exportData() {
  const logs = await dbGetAll('logs');
  const anki = await dbGetAll('anki');
  let goals = [], goalProgress = [];
  try { goals = await dbGetAll('goals'); } catch (e) {}
  try { goalProgress = await dbGetAll('goal_progress'); } catch (e) {}
  const data = JSON.stringify({ language: L.code, logs, anki, goals, goal_progress: goalProgress, version: 4, exported: new Date().toISOString() }, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${L.code}-tracker-backup-${today()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(t('t_exported'));
}

function importData() {
  document.getElementById('fileImport').click();
}

async function handleImport(e) {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (data.logs) { await dbClear('logs'); for (const l of data.logs) { delete l.id; await dbPut('logs', l); } }
    if (data.anki) { await dbClear('anki'); for (const a of data.anki) { delete a.id; await dbPut('anki', a); } }
    if (data.goals) { await dbClear('goals'); for (const g of data.goals) { await dbPut('goals', g); } }
    if (data.goal_progress) { await dbClear('goal_progress'); for (const p of data.goal_progress) { await dbPut('goal_progress', p); } }
    showToast(t('t_imported'));
    refreshAll();
  } catch (err) {
    showToast(t('t_import_err'));
  }
  e.target.value = '';
}

async function resetData() {
  if (!confirm(t('c_reset1', { lang: L.name }))) return;
  if (!confirm(t('c_reset2', { lang: L.name }))) return;
  await dbClear('logs');
  await dbClear('anki');
  try { await dbClear('goals'); } catch (e) {}
  try { await dbClear('goal_progress'); } catch (e) {}
  if (L.code === 'nl') {
    await dbPut('settings', { key: 'goals_migrated_v3', value: false });
    await migrateExistingGoals();
  }
  showToast(t('t_reset_done'));
  refreshAll();
}

// ══════════════════════════════════════════════════
// REFRESH ALL
// ══════════════════════════════════════════════════
function refreshAll() {
  refreshDashboard();
  if (document.getElementById('viewStats').classList.contains('active')) refreshStats();
}

// ══════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════
async function init() {
  // Inject background artwork
  document.getElementById('lionArt').innerHTML = ART.lion;
  document.getElementById('fleurArt').innerHTML = ART.fleur;

  await openDB(L.dbName);
  await loadSettings();
  if (L.code === 'nl') await migrateExistingGoals();
  applyLanguage();
  refreshDashboard();

  document.getElementById('manualDate').value = today();
  document.getElementById('ankiDate').value = today();

  // Daily reminder: check once shortly after load, then every minute
  setTimeout(checkReminder, 4000);
  setInterval(checkReminder, 60000);

  // Redraw canvas charts when the viewport changes (desktop resize / rotation)
  let _resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(() => {
      refreshDashboard();
      if (document.getElementById('viewStats').classList.contains('active')) refreshStats();
    }, 200);
  });

  // Register service worker
  if ('serviceWorker' in navigator) {
    let refreshed = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshed) return;
      refreshed = true;
      location.reload();
    });

    navigator.serviceWorker.register('sw.js?v=7', { updateViaCache: 'none' }).then(reg => {
      reg.update().catch(() => {});
      if (reg.waiting) reg.waiting.postMessage('SKIP_WAITING');
      reg.addEventListener('updatefound', () => {
        const worker = reg.installing;
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            worker.postMessage('SKIP_WAITING');
          }
        });
      });
    }).catch(() => {});
  }
}

init();

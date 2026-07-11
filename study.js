/* ════════════════════════════════════════════════════════════
   Study tab — in-app flashcards (FSRS) + built-in grammar course.
   Sessions run with a pausable timer; on finish the results are
   logged automatically: flashcards → anki store + a 'vocab' log,
   grammar → lesson progress + a 'grammar' log. The dashboard,
   goals, streaks and badges pick these up with no manual entry.
   ════════════════════════════════════════════════════════════ */

const DAY_MS = 86400000;
let deckFilter = '';
let currentGrammarLevel = 'A1';
let srsNewPerDay = 20;

const esc = s => String(s == null ? '' : s)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');

function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

async function newIntroducedToday() {
  let reviews = [];
  try { reviews = await dbGetAll('reviews'); } catch (e) {}
  const d = today();
  return new Set(reviews.filter(r => r.date === d && r.newCard).map(r => r.cardId)).size;
}

async function flashCounts() {
  let cards = [];
  try { cards = await dbGetAll('cards'); } catch (e) {}
  const pool = deckFilter ? cards.filter(c => c.deck === deckFilter) : cards;
  const eod = endOfToday();
  const due = pool.filter(c => c.state > 0 && c.due <= eod);
  const fresh = pool.filter(c => c.state === 0);
  const introduced = await newIntroducedToday();
  const newAllowed = Math.max(0, srsNewPerDay - introduced);
  return { cards, pool, due, fresh, newAllowed, newAvailable: Math.min(fresh.length, newAllowed) };
}

// ══════════════════════════════════════════════════
// STUDY TAB RENDER
// ══════════════════════════════════════════════════
async function refreshStudy() {
  if (!db) return;
  try {
    const s = await dbGet('settings', 'srsNewPerDay');
    if (s && s.value > 0) srsNewPerDay = s.value;
  } catch (e) {}
  const inp = document.getElementById('srsNewPerDay');
  if (inp) inp.value = srsNewPerDay;

  const { cards, due, fresh, newAvailable } = await flashCounts();

  document.getElementById('flashDueCount').textContent = due.length;
  document.getElementById('flashNewCount').textContent = newAvailable;
  document.getElementById('flashTotalCount').textContent = cards.length;

  // Deck filter options
  const decks = [...new Set(cards.map(c => c.deck).filter(Boolean))].sort();
  const sel = document.getElementById('deckFilter');
  sel.innerHTML = `<option value="">${t('deck_all')}</option>` +
    decks.map(d => `<option value="${esc(d)}" ${d === deckFilter ? 'selected' : ''}>${esc(d)}</option>`).join('');
  sel.parentElement.style.display = decks.length > 1 ? '' : 'none';

  const startBtn = document.getElementById('flashStartBtn');
  const status = document.getElementById('flashStatus');
  const sessionSize = due.length + newAvailable;
  startBtn.disabled = sessionSize === 0;
  if (cards.length === 0) {
    status.textContent = t('flash_empty');
  } else if (sessionSize === 0) {
    status.textContent = t('flash_all_done');
  } else {
    status.textContent = '';
  }

  renderGrammarSection();
}

function setDeckFilter(v) {
  deckFilter = v;
  refreshStudy();
}

function updateNewPerDay(v) {
  srsNewPerDay = Math.max(0, parseInt(v) || 0);
  dbPut('settings', { key: 'srsNewPerDay', value: srsNewPerDay });
  refreshStudy();
}

// ══════════════════════════════════════════════════
// SESSION SHELL (shared overlay + pausable timer)
// ══════════════════════════════════════════════════
let sessSeconds = 0;
let sessRunning = false;
let sessInterval = null;
let sessKind = null; // 'flash' | 'grammar'

function studySessionActive() { return sessKind !== null; }

function sessClockText() {
  const h = Math.floor(sessSeconds / 3600);
  const m = Math.floor((sessSeconds % 3600) / 60);
  const s = sessSeconds % 60;
  return (h > 0 ? String(h).padStart(2, '0') + ':' : '') +
    String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function sessTimerTick() {
  sessSeconds++;
  document.getElementById('sessTimer').textContent = sessClockText();
}

function openSessionOverlay(kind) {
  sessKind = kind;
  sessSeconds = 0;
  sessRunning = true;
  clearInterval(sessInterval);
  sessInterval = setInterval(sessTimerTick, 1000);
  document.getElementById('sessTimer').textContent = '00:00';
  document.getElementById('sessTimer').classList.remove('paused');
  document.getElementById('sessPauseBtn').textContent = '⏸';
  // A previous session may have been closed while paused — always reset
  document.getElementById('sessPausedNote').classList.remove('show');
  document.getElementById('studyBody').classList.remove('sess-paused');
  const isFlash = kind === 'flash';
  document.getElementById('sessUndoBtn').style.display = isFlash ? '' : 'none';
  document.getElementById('sessFinishBtn').style.display = isFlash ? '' : 'none';
  document.getElementById('sessProgress').style.display = isFlash ? '' : 'none';
  document.getElementById('sessProgressFill').style.width = '0%';
  document.getElementById('studyOverlay').classList.add('show');
  document.body.classList.add('no-scroll');
}

function closeSessionOverlay() {
  sessKind = null;
  sessRunning = false;
  clearInterval(sessInterval);
  flashSession = null;
  grammarSession = null;
  flashUndo = null;
  if ('speechSynthesis' in window) try { speechSynthesis.cancel(); } catch (e) {}
  document.getElementById('sessPausedNote').classList.remove('show');
  document.getElementById('studyBody').classList.remove('sess-paused');
  document.getElementById('studyOverlay').classList.remove('show');
  document.body.classList.remove('no-scroll');
  refreshStudy();
  refreshAll();
}

function sessTogglePause() {
  if (!sessKind) return;
  if (flashSession && flashSession.phase !== 'run') return;
  if (grammarSession && grammarSession.phase === 'done') return;
  sessRunning = !sessRunning;
  clearInterval(sessInterval);
  if (sessRunning) sessInterval = setInterval(sessTimerTick, 1000);
  document.getElementById('sessPauseBtn').textContent = sessRunning ? '⏸' : '▶';
  document.getElementById('sessTimer').classList.toggle('paused', !sessRunning);
  document.getElementById('studyBody').classList.toggle('sess-paused', !sessRunning);
  document.getElementById('sessPausedNote').classList.toggle('show', !sessRunning);
}

function sessClose() {
  if (sessKind === 'flash' && flashSession) {
    if (flashSession.phase === 'done') { closeSessionOverlay(); return; }
    if (flashSession.reviewed === 0) { closeSessionOverlay(); return; }
    if (confirm(t('c_end_flash', { n: flashSession.reviewed }))) finishFlashSession();
    return;
  }
  if (sessKind === 'grammar' && grammarSession) {
    if (grammarSession.phase === 'done') { closeSessionOverlay(); return; }
    if (confirm(t('c_end_grammar'))) closeSessionOverlay();
    return;
  }
  closeSessionOverlay();
}

// ── Text-to-speech: built-in voices stand in for the deck audio
//    that .apkg exports don't carry ──
let ttsVoice = null;
function initTTS() {
  if (!('speechSynthesis' in window)) return;
  const pick = () => {
    const vs = speechSynthesis.getVoices();
    ttsVoice = vs.find(v => v.lang.replace('_', '-').toLowerCase().startsWith(L.code)) || null;
  };
  pick();
  speechSynthesis.onvoiceschanged = pick;
}

function speak(text) {
  if (!('speechSynthesis' in window) || !text) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = L.code === 'fr' ? 'fr-FR' : 'nl-BE';
    if (ttsVoice) u.voice = ttsVoice;
    u.rate = 0.92;
    speechSynthesis.speak(u);
  } catch (e) {}
}

function speakEl(el) { speak(el.dataset.say); }

function sessMinutes() {
  return Math.max(1, Math.round(sessSeconds / 60));
}

// ══════════════════════════════════════════════════
// FLASHCARD SESSION
// ══════════════════════════════════════════════════
let flashSession = null;
let flashUndo = null;

async function startFlashSession() {
  const { due, fresh, newAllowed } = await flashCounts();
  const queue = [
    ...due.sort((a, b) => a.due - b.due),
    ...fresh.sort((a, b) => (a.addedAt || 0) - (b.addedAt || 0)).slice(0, newAllowed)
  ];
  if (queue.length === 0) { showToast(t('flash_all_done')); return; }

  flashSession = {
    phase: 'run', queue, current: null, revealed: false, rating: false,
    reviewed: 0, correct: 0, streak: 0,
    grades: { 1: 0, 2: 0, 3: 0, 4: 0 }, logged: false
  };
  flashUndo = null;
  openSessionOverlay('flash');
  flashNext();
}

function flashNext() {
  const s = flashSession;
  if (!s) return;
  if (s.queue.length === 0) { finishFlashSession(); return; }
  s.queue.sort((a, b) => a.due - b.due);
  s.current = s.queue[0];
  s.revealed = false;
  renderFlashCard();
}

function flashProgressUpdate() {
  const s = flashSession;
  const total = s.reviewed + s.queue.length;
  document.getElementById('sessProgressFill').style.width =
    (total > 0 ? (s.reviewed / total) * 100 : 0) + '%';
}

// ── Target-word highlighting ──
// *word* markers (Refold-style) → accent highlight
function markerHtml(text) {
  return esc(text).replace(/\*([^*\n]+)\*/g, '<span class="flash-hl">$1</span>');
}

// Highlight the headword (plus simple inflections) inside the example sentence
const HL_SUFFIXES = ['', 'e', 'en', 'n', 's', 'je', 'jes', 't', 'te', 'ten', 'd', 'de', 'den', 'er', 'ers', 'st', 'ste'];
function headwordStems(word) {
  const stems = [word];
  // Dutch spelling alternations before -en: huis→huizen, brief→brieven
  if (word.endsWith('s')) stems.push(word.slice(0, -1) + 'z');
  if (word.endsWith('f')) stems.push(word.slice(0, -1) + 'v');
  return stems;
}
function highlightHeadword(escText, word) {
  const w = (word || '').toLowerCase();
  if (!w) return escText;
  const stems = headwordStems(w);
  return escText.replace(/[\p{L}]+/gu, tok => {
    const lt = tok.toLowerCase();
    const hit = stems.some(st => lt.startsWith(st) && HL_SUFFIXES.includes(lt.slice(st.length)));
    return hit ? '<span class="flash-hl">' + tok + '</span>' : tok;
  });
}

function flashSpeakText() {
  const c = flashSession && flashSession.current;
  if (!c) return '';
  const lines = c.front.split('\n');
  const head = lines[0].replace(/\s*\([^)]*\)/g, '').trim();
  return (head + '. ' + lines.slice(1).join('. ')).replace(/\*/g, '').trim();
}

function renderFlashCard() {
  const s = flashSession;
  const c = s.current;
  const stateLabel = t('state_' + c.state);
  const stateCls = ['new', 'learn', 'rev', 'learn'][c.state];

  // Two-line fronts (word + example sentence) get structured typography;
  // single-line fronts (e.g. Refold sentences) render as one big face.
  const lines = c.front.split('\n');
  const headword = lines[0].replace(/\s*\(.*$/, '').trim();
  const face = lines.length > 1
    ? `<div class="flash-word">${markerHtml(lines[0])}</div>
       <div class="flash-sentence">${highlightHeadword(markerHtml(lines.slice(1).join('\n')), headword)}</div>`
    : `<div class="flash-front">${markerHtml(c.front)}</div>`;

  let html = `
    <div class="sess-meta">
      <span class="flash-state ${stateCls}">${stateLabel}</span>
      ${c.deck ? `<span class="flash-deck">${esc(c.deck)}</span>` : ''}
      ${s.streak >= 3 ? `<span class="sess-streak mono">🔥${s.streak}</span>` : ''}
      <span class="sess-left mono">${t('sess_left', { n: s.queue.length })}</span>
    </div>
    <div class="flash-card ${s.revealed ? 'revealed' : ''}" onclick="flashReveal()">
      ${'speechSynthesis' in window ? `<button class="tts-btn" onclick="event.stopPropagation();speak(flashSpeakText())" title="🔊">🔊</button>` : ''}
      ${face}
      ${s.revealed
        ? `<div class="flash-divider"></div><div class="flash-back">${markerHtml(c.back)}</div>`
        : `<div class="flash-hint">${t('tap_reveal')}</div>`}
    </div>`;

  if (s.revealed) {
    const prev = FSRS.previewIntervals(c);
    html += `<div class="rate-row">
      <button class="rate-btn again" onclick="flashRate(1)"><span>${t('rate_1')}</span><span class="rate-ivl mono">${prev[1]}</span></button>
      <button class="rate-btn hard" onclick="flashRate(2)"><span>${t('rate_2')}</span><span class="rate-ivl mono">${prev[2]}</span></button>
      <button class="rate-btn good" onclick="flashRate(3)"><span>${t('rate_3')}</span><span class="rate-ivl mono">${prev[3]}</span></button>
      <button class="rate-btn easy" onclick="flashRate(4)"><span>${t('rate_4')}</span><span class="rate-ivl mono">${prev[4]}</span></button>
    </div>`;
  }
  html += `<div class="kbd-hint mono">${t('kbd_hint')}</div>`;
  document.getElementById('studyBody').innerHTML = html;
  flashProgressUpdate();
}

function flashReveal() {
  if (!flashSession || flashSession.revealed || !sessRunning) return;
  flashSession.revealed = true;
  renderFlashCard();
}

async function flashRate(grade) {
  const s = flashSession;
  if (!s || !sessRunning || !s.revealed || s.rating) return;
  s.rating = true;
  const before = s.current;
  const wasNew = before.state === 0;
  const updated = FSRS.schedule(before, grade);

  await dbPut('cards', updated);
  const reviewId = await dbPut('reviews', {
    cardId: updated.id, date: today(), grade,
    newCard: wasNew, timestamp: Date.now()
  });
  flashUndo = { before: { ...before }, reviewId, grade, prevStreak: s.streak };

  s.reviewed++;
  s.grades[grade]++;
  if (grade > 1) { s.correct++; s.streak++; } else { s.streak = 0; }
  if (navigator.vibrate) try { navigator.vibrate(grade === 1 ? 25 : 8); } catch (e) {}

  // Replace in queue; learning/relearning cards come back this session
  s.queue.shift();
  if (updated.state === 1 || updated.state === 3) s.queue.push(updated);
  s.rating = false;
  flashNext();
}

async function flashUndoLast() {
  const s = flashSession;
  if (!s || s.phase !== 'run' || !flashUndo || !sessRunning) return;
  const u = flashUndo;
  flashUndo = null;
  await dbPut('cards', u.before);
  await dbDelete('reviews', u.reviewId);
  s.reviewed--;
  s.grades[u.grade]--;
  if (u.grade > 1) s.correct--;
  s.streak = u.prevStreak;
  s.queue = s.queue.filter(c => c.id !== u.before.id);
  s.queue.unshift(u.before);
  s.current = u.before;
  s.revealed = false;
  showToast(t('t_undo_rating'));
  renderFlashCard();
}

async function finishFlashSession() {
  const s = flashSession;
  if (!s || s.phase === 'done') return;
  if (s.reviewed === 0) { closeSessionOverlay(); return; }
  s.phase = 'done';
  sessRunning = false;
  clearInterval(sessInterval);
  document.getElementById('sessUndoBtn').style.display = 'none';
  document.getElementById('sessFinishBtn').style.display = 'none';
  document.getElementById('sessProgressFill').style.width = '100%';

  const mins = sessMinutes();
  const acc = Math.round((s.correct / s.reviewed) * 100);
  const g = s.grades;

  if (!s.logged) {
    s.logged = true;
    await dbPut('anki', { date: today(), cards: s.reviewed, timestamp: Date.now() });
    await dbPut('logs', {
      date: today(), skill: 'vocab', minutes: mins,
      tags: ['anki'], notes: t('flash_log_note', { n: s.reviewed, p: acc }),
      passive: false, timestamp: Date.now()
    });
    showToast(t('t_session_logged', { n: s.reviewed, m: mins }));
  }

  document.getElementById('studyBody').innerHTML = `
    <div class="sess-summary">
      <div class="sess-summary-icon">🏁</div>
      <h2>${t('sess_done_title')}</h2>
      <div class="sess-stats">
        <div class="sess-stat"><span class="serif-num lg">${s.reviewed}</span><span>${t('sess_cards_stat')}</span></div>
        <div class="sess-stat"><span class="serif-num lg">${acc}%</span><span>${t('sess_acc_stat')}</span></div>
        <div class="sess-stat"><span class="serif-num lg">${mins}</span><span>${t('sess_time_stat')}</span></div>
      </div>
      <div class="grade-break">
        <span class="gb again">${t('rate_1')} <b class="mono">${g[1]}</b></span>
        <span class="gb hard">${t('rate_2')} <b class="mono">${g[2]}</b></span>
        <span class="gb good">${t('rate_3')} <b class="mono">${g[3]}</b></span>
        <span class="gb easy">${t('rate_4')} <b class="mono">${g[4]}</b></span>
      </div>
      <button class="btn primary full" onclick="closeSessionOverlay()">${t('sess_close')}</button>
    </div>`;
}

// ══════════════════════════════════════════════════
// CARD MANAGEMENT: add · import · browse
// ══════════════════════════════════════════════════
function openAddCardModal() {
  document.getElementById('acFront').value = '';
  document.getElementById('acBack').value = '';
  document.getElementById('addCardModal').classList.add('show');
  document.getElementById('acFront').focus();
}

function closeAddCardModal() {
  document.getElementById('addCardModal').classList.remove('show');
}

async function saveNewCard() {
  const front = document.getElementById('acFront').value.trim();
  const back = document.getElementById('acBack').value.trim();
  const deck = document.getElementById('acDeck').value.trim();
  if (!front || !back) { showToast(t('t_fill_front_back')); return; }
  await dbPut('cards', FSRS.newCard(front, back, deck));
  showToast(t('t_card_added'));
  document.getElementById('acFront').value = '';
  document.getElementById('acBack').value = '';
  document.getElementById('acFront').focus();
  refreshStudy();
}

function openImportModal() {
  document.getElementById('importModal').classList.add('show');
  renderBundledDecks();
}

// ── Bundled decks (converted from the user's .apkg exports, with
//    native FSRS memory state — progress carries over losslessly) ──
const BUNDLED_DECKS = [
  { id: 'nl_freq_dict', file: 'decks/nl_freq_dict.json', lang: 'nl', name: 'A Frequency Dictionary of Dutch', count: 5834 },
  { id: 'nl_refold',    file: 'decks/nl_refold.json',    lang: 'nl', name: 'Dutch Refold', count: 102 }
];

async function renderBundledDecks() {
  const wrap = document.getElementById('bundledDecks');
  const mine = BUNDLED_DECKS.filter(b => b.lang === L.code);
  const head = document.getElementById('bundledHead');
  if (head) head.style.display = mine.length ? '' : 'none';
  if (mine.length === 0) { wrap.innerHTML = ''; return; }
  let html = '';
  for (const b of mine) {
    let installed = false;
    try {
      const s = await dbGet('settings', 'bundled_installed_' + b.id);
      installed = !!(s && s.value);
    } catch (e) {}
    html += `<div class="bundle-row">
      <div class="bundle-info">
        <div class="bundle-name">${esc(b.name)}</div>
        <div class="bundle-count mono">${t('bundled_cards', { n: b.count })}</div>
      </div>
      ${installed
        ? `<span class="bundle-done">${t('bundled_installed')}</span>`
        : `<button class="btn primary bundle-btn" id="bundleBtn_${b.id}" onclick="installBundledDeck('${b.id}')">${t('bundled_install')}</button>`}
    </div>`;
  }
  wrap.innerHTML = html;
}

async function installBundledDeck(id) {
  const def = BUNDLED_DECKS.find(b => b.id === id);
  if (!def) return;
  const btn = document.getElementById('bundleBtn_' + id);
  if (btn) { btn.disabled = true; btn.textContent = t('bundled_installing'); }
  try {
    const res = await fetch(def.file);
    if (!res.ok) throw new Error('http ' + res.status);
    const data = await res.json();

    const existing = await dbGetAll('cards');
    const seen = new Set(existing.map(c => (c.front + '' + c.back).toLowerCase()));
    const now = Date.now();
    const cards = [];
    data.cards.forEach((c, i) => {
      const key = (c.front + '' + c.back).toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      cards.push({
        front: c.front, back: c.back, deck: data.deck,
        state: c.state, due: c.due || now,
        stability: c.stability, difficulty: c.difficulty,
        reps: c.reps, lapses: c.lapses,
        lastReview: c.lastReview, addedAt: now + i
      });
    });
    await dbBulkPut('cards', cards);
    await dbPut('settings', { key: 'bundled_installed_' + id, value: true });
    showToast(t('t_bundled_done', { name: data.name, n: cards.length }));
    renderBundledDecks();
    refreshStudy();
    refreshAll();
  } catch (err) {
    showToast(t('t_bundled_fetch_err'));
    if (btn) { btn.disabled = false; btn.textContent = t('bundled_install'); }
  }
}
function closeImportModal() {
  document.getElementById('importModal').classList.remove('show');
}
function pickImportFile() {
  document.getElementById('fileImportCards').click();
}

// ── Anki "Notes in Plain Text" (.txt) / CSV / TSV parsing ──
function cleanAnkiField(v) {
  return String(v || '')
    .replace(/\[sound:[^\]]*\]/gi, '')
    .replace(/\{\{c\d+::(.*?)(?:::[^}]*)?\}\}/g, '$1')   // cloze → answer text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(div|p)>/gi, '\n')
    .replace(/<img[^>]*>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"').replace(/&#39;/gi, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function parseDelimited(text, sep) {
  const rows = [];
  let field = '', row = [], inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQ = false;
      } else field += ch;
    } else if (ch === '"' && field === '') {
      inQ = true;
    } else if (ch === sep) {
      row.push(field); field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some(f => f.trim() !== '')) rows.push(row);
      row = [];
    } else field += ch;
  }
  row.push(field);
  if (row.some(f => f.trim() !== '')) rows.push(row);
  return rows;
}

async function handleCardImport(e) {
  const file = e.target.files[0];
  e.target.value = '';
  if (!file) return;
  try {
    const text = await file.text();
    let sep = '\t';
    let deckCol = -1;
    const skipCols = new Set();
    let body = text.replace(/^﻿/, '');

    // Anki header lines (#separator:tab, #deck column:3, …)
    const lines = body.split('\n');
    let firstData = 0;
    for (const line of lines) {
      if (!line.startsWith('#')) break;
      firstData++;
      const m = line.slice(1).trim();
      const sepM = m.match(/^separator:\s*(.+)$/i);
      if (sepM) {
        const v = sepM[1].trim().toLowerCase();
        sep = { tab: '\t', comma: ',', semicolon: ';', pipe: '|', colon: ':', space: ' ' }[v] || (v.length === 1 ? v : '\t');
      }
      const colM = m.match(/^(deck|notetype|tags|guid) column:\s*(\d+)$/i);
      if (colM) {
        const idx = parseInt(colM[2]) - 1;
        skipCols.add(idx);
        if (colM[1].toLowerCase() === 'deck') deckCol = idx;
      }
    }
    body = lines.slice(firstData).join('\n');
    if (sep === '\t' && !body.includes('\t') && file.name.toLowerCase().endsWith('.csv')) sep = ',';

    const rows = parseDelimited(body, sep);
    const existing = await dbGetAll('cards');
    const seen = new Set(existing.map(c => (c.front + '' + c.back).toLowerCase()));
    const defaultDeck = file.name.replace(/\.(txt|csv|tsv)$/i, '').trim();

    let added = 0, skipped = 0;
    for (const row of rows) {
      const content = row.map((v, i) => skipCols.has(i) ? null : cleanAnkiField(v))
        .filter((v, i) => !skipCols.has(i));
      const front = content[0] || '';
      const back = content.slice(1).filter(Boolean).join('\n');
      if (!front || !back) { continue; }
      const key = (front + '' + back).toLowerCase();
      if (seen.has(key)) { skipped++; continue; }
      seen.add(key);
      const deck = deckCol >= 0 && row[deckCol]
        ? cleanAnkiField(row[deckCol]).split('::').pop()
        : defaultDeck;
      await dbPut('cards', FSRS.newCard(front, back, deck));
      added++;
    }

    if (added === 0 && skipped === 0) { showToast(t('t_import_none')); return; }
    closeImportModal();
    showToast(t('t_imported_cards', { n: added, skip: skipped > 0 ? t('t_import_skip', { n: skipped }) : '' }));
    refreshStudy();
  } catch (err) {
    showToast(t('t_import_err'));
  }
}

// ── Browse / manage ──
let manageSearch = '';

async function openManageModal() {
  manageSearch = '';
  document.getElementById('manageSearch').value = '';
  document.getElementById('manageModal').classList.add('show');
  renderManageList();
}
function closeManageModal() {
  document.getElementById('manageModal').classList.remove('show');
}
function onManageSearch(v) {
  manageSearch = v.trim().toLowerCase();
  renderManageList();
}

async function renderManageList() {
  let cards = [];
  try { cards = await dbGetAll('cards'); } catch (e) {}

  // Deck chips with counts + delete
  const deckCounts = {};
  cards.forEach(c => { const d = c.deck || '—'; deckCounts[d] = (deckCounts[d] || 0) + 1; });
  document.getElementById('manageDecks').innerHTML = Object.entries(deckCounts).map(([d, n]) =>
    `<span class="deck-chip">${esc(d)} <b class="mono">${n}</b>
      <button onclick="deleteDeck('${esc(d).replaceAll("'", "\\'")}')" title="${t('deck_delete')}">✕</button></span>`
  ).join('') || `<div class="empty-state">${t('flash_empty')}</div>`;

  let list = cards;
  if (manageSearch) {
    list = cards.filter(c =>
      c.front.toLowerCase().includes(manageSearch) ||
      c.back.toLowerCase().includes(manageSearch) ||
      (c.deck || '').toLowerCase().includes(manageSearch));
  }
  list = [...list].sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0)).slice(0, 100);

  document.getElementById('manageList').innerHTML = list.map(c => `
    <div class="manage-row">
      <div class="manage-txt">
        <div class="manage-front">${esc(c.front)}</div>
        <div class="manage-back">${esc(c.back)}</div>
      </div>
      <span class="flash-state ${['new', 'learn', 'rev', 'learn'][c.state]}">${t('state_' + c.state)}</span>
      <button class="history-delete-btn" onclick="deleteCard(${c.id})">🗑</button>
    </div>`).join('') || (manageSearch ? `<div class="empty-state">${t('manage_empty')}</div>` : '');
}

async function deleteCard(id) {
  if (!confirm(t('c_delete_card'))) return;
  await dbDelete('cards', id);
  renderManageList();
  refreshStudy();
}

async function deleteDeck(name) {
  const cards = await dbGetAll('cards');
  const mine = cards.filter(c => (c.deck || '—') === name);
  if (!confirm(t('c_delete_deck', { name, n: mine.length }))) return;
  for (const c of mine) await dbDelete('cards', c.id);
  if (deckFilter === name) deckFilter = '';
  renderManageList();
  refreshStudy();
}

// ══════════════════════════════════════════════════
// GRAMMAR COURSE
// ══════════════════════════════════════════════════
function grammarLessons() {
  return (GRAMMAR_COURSE[L.code] || []);
}

const LEVEL_COLORS = { A1: '--teal', A2: '--blue', B1: '--purple', B2: '--amber', C1: '--red' };
const LEVEL_DIMS = { A1: '--teal-dim', A2: '--blue-dim', B1: '--purple-dim', B2: '--amber-glow', C1: '--red-dim' };

function levelPill(lv) {
  return `<span class="level-pill" style="color:var(${LEVEL_COLORS[lv]});background:var(${LEVEL_DIMS[lv]})">${lv}</span>`;
}

async function renderGrammarSection() {
  const lessons = grammarLessons();
  const levelsEl = document.getElementById('grammarLevels');
  const listEl = document.getElementById('grammarLessons');
  const progEl = document.getElementById('grammarProgress');

  if (lessons.length === 0) {
    levelsEl.innerHTML = '';
    progEl.innerHTML = '';
    listEl.innerHTML = `<div class="empty-state">${t('grammar_none')}</div>`;
    return;
  }

  let progress = [];
  try { progress = await dbGetAll('grammar_progress'); } catch (e) {}
  const progMap = {};
  progress.forEach(p => { progMap[p.id] = p; });

  const doneTotal = lessons.filter(l => progMap[l.id]).length;
  const pct = Math.round((doneTotal / lessons.length) * 100);
  progEl.innerHTML = `
    <div class="grammar-prog-row">
      <span>${t('grammar_progress', { done: doneTotal, total: lessons.length })}</span>
      <span class="mono">${pct}%</span>
    </div>
    <div class="goal-progress-track"><div class="goal-progress-fill" style="width:${pct}%;background:var(--accent)"></div></div>`;

  levelsEl.innerHTML = GRAMMAR_LEVELS.map(lv => {
    const inLevel = lessons.filter(l => l.level === lv);
    const done = inLevel.filter(l => progMap[l.id]).length;
    return `<button class="level-tab ${lv === currentGrammarLevel ? 'active' : ''} ${done === inLevel.length && inLevel.length ? 'complete' : ''}"
      style="--lv:var(${LEVEL_COLORS[lv]});--lvd:var(${LEVEL_DIMS[lv]})" onclick="setGrammarLevel('${lv}')">
      ${lv}<span class="level-count mono">${done}/${inLevel.length}</span></button>`;
  }).join('');

  listEl.innerHTML = lessons.filter(l => l.level === currentGrammarLevel).map((l, idx) => {
    const p = progMap[l.id];
    return `<button class="lesson-row ${p ? 'done' : ''}" style="--lv:var(${LEVEL_COLORS[l.level]})" onclick="startGrammarLesson('${l.id}')">
      <span class="lesson-num mono">${String(idx + 1).padStart(2, '0')}</span>
      <span class="lesson-mid">
        <span class="lesson-title">${esc(l.title)}</span>
        <span class="lesson-sub">${t('lesson_ex_count', { n: l.quiz.length })}${p ? ' · ' + t('best_label', { p: p.best }) : ''}</span>
      </span>
      <span class="lesson-check ${p ? 'done' : ''}">${p ? '✓' : '›'}</span>
    </button>`;
  }).join('');
}

function setGrammarLevel(lv) {
  currentGrammarLevel = lv;
  renderGrammarSection();
}

// ── Grammar session ──
let grammarSession = null;

function startGrammarLesson(id) {
  const lesson = grammarLessons().find(l => l.id === id);
  if (!lesson) return;
  grammarSession = { lesson, phase: 'read', qIndex: 0, score: 0, answered: false, logged: false };
  openSessionOverlay('grammar');
  renderGrammarRead();
}

function renderGrammarRead() {
  const l = grammarSession.lesson;
  const tts = 'speechSynthesis' in window;
  let html = `
    <div class="sess-meta">
      ${levelPill(l.level)}
      <span class="sess-left">${t('grammar_reading')}</span>
    </div>
    <div class="lesson-content">
      <h2 class="lesson-h">${esc(l.title)}</h2>`;
  l.read.forEach((sec, i) => {
    html += `<div class="lesson-sec" style="--lv:var(${LEVEL_COLORS[l.level]})">
      <h3><span class="sec-num mono">${i + 1}</span>${esc(sec.h)}</h3>
      <p>${esc(sec.p)}</p>
      ${sec.ex.map(([nl, en]) => `
        <div class="lesson-ex">
          <div class="lesson-ex-nl">${esc(nl)}
            ${tts ? `<button class="tts-mini" data-say="${esc(nl)}" onclick="speakEl(this)">🔊</button>` : ''}
          </div>
          <div class="lesson-ex-en">${esc(en)}</div>
        </div>`).join('')}
    </div>`;
  });
  html += `</div>
    <button class="btn primary full" onclick="grammarStartQuiz()">${t('lesson_quiz_btn', { n: l.quiz.length })}</button>`;
  document.getElementById('studyBody').innerHTML = html;
  document.getElementById('studyBody').scrollTop = 0;
}

function grammarStartQuiz() {
  if (!sessRunning) return;
  grammarSession.phase = 'quiz';
  grammarSession.qIndex = 0;
  grammarSession.score = 0;
  grammarSession.results = [];
  renderGrammarQuestion();
}

function quizDotsHtml(s, showCurrent) {
  return `<div class="quiz-dots">` + s.lesson.quiz.map((_, i) => {
    let cls = '';
    if (i < s.results.length) cls = s.results[i] ? 'ok' : 'bad';
    else if (showCurrent && i === s.qIndex) cls = 'cur';
    return `<span class="qdot ${cls}"></span>`;
  }).join('') + `</div>`;
}

function renderGrammarQuestion() {
  const s = grammarSession;
  const q = s.lesson.quiz[s.qIndex];
  s.answered = false;
  let html = `
    <div class="sess-meta">
      ${levelPill(s.lesson.level)}
      <span class="sess-left mono">${t('quiz_q', { i: s.qIndex + 1, n: s.lesson.quiz.length })}</span>
    </div>
    ${quizDotsHtml(s, true)}
    <div class="quiz-card">
      <div class="quiz-q">${esc(q.q)}</div>`;
  if (q.t === 'mc') {
    html += `<div class="quiz-options">` + q.o.map((o, i) =>
      `<button class="quiz-opt" id="qopt${i}" onclick="grammarAnswerMC(${i})">${esc(o)}</button>`).join('') + `</div>`;
  } else {
    html += `
      <input type="text" class="text-input quiz-input" id="quizInput" placeholder="${t('quiz_type_ph')}"
        autocomplete="off" autocapitalize="off" spellcheck="false"
        onkeydown="if(event.key==='Enter')grammarAnswerFill()">
      <button class="btn primary full" id="quizCheckBtn" onclick="grammarAnswerFill()">${t('quiz_check')}</button>`;
  }
  html += `<div class="quiz-feedback" id="quizFeedback"></div></div>
    <button class="btn primary full" id="quizNextBtn" style="display:none" onclick="grammarNextQuestion()"></button>`;
  document.getElementById('studyBody').innerHTML = html;
  document.getElementById('studyBody').scrollTop = 0;
  const inp = document.getElementById('quizInput');
  if (inp) inp.focus();
}

const normAnswer = s => String(s || '').toLowerCase().trim()
  .replace(/[.,!?;:]/g, '').replace(/[’‘]/g, "'").replace(/\s+/g, ' ');

function grammarShowFeedback(correct, q) {
  const s = grammarSession;
  s.answered = true;
  if (correct) s.score++;
  s.results.push(correct);
  if (navigator.vibrate) try { navigator.vibrate(correct ? 8 : 25); } catch (e) {}
  const fb = document.getElementById('quizFeedback');
  const answerTxt = q.t === 'mc' ? q.o[q.a] : q.a[0];
  fb.className = 'quiz-feedback show ' + (correct ? 'ok' : 'bad');
  fb.innerHTML = `
    <div class="quiz-verdict ${correct ? 'ok' : 'bad'}">${correct ? '✓ ' + t('quiz_correct') : '✗ ' + t('quiz_wrong')}</div>
    ${!correct ? `<div class="quiz-answer">${t('quiz_answer_was', { a: esc(answerTxt) })}</div>` : ''}
    <div class="quiz-why">${esc(q.why)}</div>`;
  const dots = document.querySelector('.quiz-dots');
  if (dots) dots.outerHTML = quizDotsHtml(s, false);
  const next = document.getElementById('quizNextBtn');
  next.style.display = '';
  next.textContent = s.qIndex + 1 < s.lesson.quiz.length ? t('quiz_next') : t('quiz_finish_btn');
}

function grammarAnswerMC(i) {
  const s = grammarSession;
  if (!s || s.answered || !sessRunning) return;
  const q = s.lesson.quiz[s.qIndex];
  const correct = i === q.a;
  document.querySelectorAll('.quiz-opt').forEach((el, idx) => {
    el.disabled = true;
    if (idx === q.a) el.classList.add('correct');
    if (idx === i && !correct) el.classList.add('wrong');
  });
  grammarShowFeedback(correct, q);
}

function grammarAnswerFill() {
  const s = grammarSession;
  if (!s || s.answered || !sessRunning) return;
  const q = s.lesson.quiz[s.qIndex];
  const val = normAnswer(document.getElementById('quizInput').value);
  if (!val) return;
  const correct = q.a.some(a => normAnswer(a) === val);
  const inp = document.getElementById('quizInput');
  inp.disabled = true;
  inp.classList.add(correct ? 'correct' : 'wrong');
  document.getElementById('quizCheckBtn').style.display = 'none';
  grammarShowFeedback(correct, q);
}

function grammarNextQuestion() {
  const s = grammarSession;
  if (!s) return;
  if (s.qIndex + 1 < s.lesson.quiz.length) {
    s.qIndex++;
    renderGrammarQuestion();
  } else {
    renderGrammarResult();
  }
}

function renderGrammarResult() {
  const s = grammarSession;
  s.phase = 'result';
  const total = s.lesson.quiz.length;
  const pct = Math.round((s.score / total) * 100);
  const mins = sessMinutes();
  document.getElementById('studyBody').innerHTML = `
    <div class="sess-summary">
      <div class="sess-summary-icon">${pct === 100 ? '🏆' : pct >= 60 ? '🎓' : '📚'}</div>
      <h2>${t('lesson_done_title')}</h2>
      ${quizDotsHtml(s, false)}
      <div class="sess-stats">
        <div class="sess-stat"><span class="serif-num lg">${s.score}/${total}</span><span>${t('lesson_score')}</span></div>
        <div class="sess-stat"><span class="serif-num lg">${pct}%</span><span>${t('sess_acc_stat')}</span></div>
        <div class="sess-stat"><span class="serif-num lg">${mins}</span><span>${t('sess_time_stat')}</span></div>
      </div>
      <button class="btn primary full" onclick="finishGrammarLesson()">${t('grammar_save')}</button>
    </div>`;
}

async function finishGrammarLesson() {
  const s = grammarSession;
  if (!s || s.logged) { closeSessionOverlay(); return; }
  s.logged = true;
  s.phase = 'done';
  sessRunning = false;
  clearInterval(sessInterval);

  const total = s.lesson.quiz.length;
  const pct = Math.round((s.score / total) * 100);
  const mins = sessMinutes();

  let prev = null;
  try { prev = await dbGet('grammar_progress', s.lesson.id); } catch (e) {}
  await dbPut('grammar_progress', {
    id: s.lesson.id,
    best: Math.max(pct, prev ? prev.best : 0),
    last: pct,
    times: (prev ? prev.times : 0) + 1,
    completedAt: Date.now()
  });

  await dbPut('logs', {
    date: today(), skill: 'grammar', minutes: mins,
    tags: [L.grammarTag], notes: t('grammar_log_note', { title: s.lesson.title, p: pct }),
    passive: false, timestamp: Date.now()
  });

  showToast(t('t_lesson_logged'));
  closeSessionOverlay();
}

// ══════════════════════════════════════════════════
// KEYBOARD SHORTCUTS (desktop): space = reveal,
// 1–4 = rate, z = undo, enter = next, esc = stop
// ══════════════════════════════════════════════════
document.addEventListener('keydown', e => {
  if (!sessKind) return;
  if (e.key === 'Escape') { sessClose(); return; }   // works even from an input
  const tag = e.target && e.target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

  if (sessKind === 'flash' && flashSession) {
    if (flashSession.phase === 'done') {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); closeSessionOverlay(); }
      return;
    }
    if (!sessRunning) return;
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!flashSession.revealed) flashReveal();
    } else if (flashSession.revealed && ['1', '2', '3', '4'].includes(e.key)) {
      flashRate(parseInt(e.key));
    } else if (e.key === 'z' || e.key === 'u') {
      flashUndoLast();
    }
  } else if (sessKind === 'grammar' && grammarSession) {
    if (e.key === 'Enter' && grammarSession.phase === 'quiz' && grammarSession.answered) {
      grammarNextQuestion();
    }
  }
});

initTTS();

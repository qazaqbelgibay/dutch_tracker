/* ════════════════════════════════════════════════════════════
   FSRS — Free Spaced Repetition Scheduler (v5 default weights)
   Pure scheduling engine, no DOM/DB. Cards carry:
     state:      0 new · 1 learning · 2 review · 3 relearning
     stability:  days until retrievability drops to 90%
     difficulty: 1..10
     due:        timestamp (ms)
   Grades: 1 Again · 2 Hard · 3 Good · 4 Easy
   Reference: open-spaced-repetition/fsrs4anki (FSRS-5)
   ════════════════════════════════════════════════════════════ */

const FSRS = (() => {
  const W = [0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345,
             1.4604, 0.0046, 1.54575, 0.1192, 1.01925, 1.9395,
             0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621];
  const DECAY = -0.5;
  const FACTOR = Math.pow(0.9, 1 / DECAY) - 1;   // 19/81
  const DAY_MS = 86400000;
  const MAX_INTERVAL = 36500;                     // days
  let requestRetention = 0.9;

  const clampD = d => Math.min(10, Math.max(1, d));

  function retrievability(elapsedDays, stability) {
    return Math.pow(1 + FACTOR * Math.max(0, elapsedDays) / stability, DECAY);
  }

  function nextIntervalDays(stability) {
    const ivl = stability / FACTOR * (Math.pow(requestRetention, 1 / DECAY) - 1);
    return Math.min(MAX_INTERVAL, Math.max(1, Math.round(ivl)));
  }

  function initStability(grade) {
    return Math.max(0.1, W[grade - 1]);
  }

  function initDifficulty(grade) {
    return clampD(W[4] - Math.exp(W[5] * (grade - 1)) + 1);
  }

  function nextDifficulty(d, grade) {
    const deltaD = -W[6] * (grade - 3);
    const dPrime = d + deltaD * (10 - d) / 9;      // linear damping
    return clampD(W[7] * initDifficulty(4) + (1 - W[7]) * dPrime); // mean reversion
  }

  // Successful review (Hard / Good / Easy) after a real interval
  function recallStability(d, s, r, grade) {
    const hardPenalty = grade === 2 ? W[15] : 1;
    const easyBonus = grade === 4 ? W[16] : 1;
    return s * (1 + Math.exp(W[8]) * (11 - d) * Math.pow(s, -W[9]) *
      (Math.exp(W[10] * (1 - r)) - 1) * hardPenalty * easyBonus);
  }

  // Failed review (Again) — post-lapse stability, never above current
  function forgetStability(d, s, r) {
    const sf = W[11] * Math.pow(d, -W[12]) *
      (Math.pow(s + 1, W[13]) - 1) * Math.exp(W[14] * (1 - r));
    return Math.max(0.1, Math.min(sf, s));
  }

  // Same-day (intra-session) review — short-term memory model
  function shortTermStability(s, grade) {
    return Math.max(0.1, s * Math.exp(W[17] * (grade - 3 + W[18])));
  }

  /* Schedule a rating. Returns a NEW card object (input untouched). */
  function schedule(card, grade, now) {
    now = now || Date.now();
    const c = { ...card };
    const elapsedDays = c.lastReview ? (now - c.lastReview) / DAY_MS : 0;

    if (c.state === 0) {                                 // ── new card
      c.difficulty = initDifficulty(grade);
      c.stability = initStability(grade);
      c.reps = 1;
      c.lapses = 0;
      if (grade === 1)      { c.state = 1; c.due = now + 60 * 1000; }
      else if (grade === 2) { c.state = 1; c.due = now + 5.5 * 60 * 1000; }
      else                  { c.state = 2; c.due = now + nextIntervalDays(c.stability) * DAY_MS; }
    } else if (c.state === 1 || c.state === 3) {         // ── (re)learning
      c.difficulty = nextDifficulty(c.difficulty, grade);
      c.stability = shortTermStability(c.stability, grade);
      c.reps++;
      if (grade === 1)      { c.due = now + 60 * 1000; }
      else if (grade === 2) { c.due = now + 5.5 * 60 * 1000; }
      else                  { c.state = 2; c.due = now + nextIntervalDays(c.stability) * DAY_MS; }
    } else {                                             // ── review
      const r = retrievability(elapsedDays, c.stability);
      c.difficulty = nextDifficulty(c.difficulty, grade);
      c.reps++;
      if (grade === 1) {
        c.lapses = (c.lapses || 0) + 1;
        c.stability = forgetStability(c.difficulty, c.stability, r);
        c.state = 3;
        c.due = now + 60 * 1000;
      } else {
        c.stability = recallStability(c.difficulty, c.stability, r, grade);
        c.state = 2;
        c.due = now + nextIntervalDays(c.stability) * DAY_MS;
      }
    }
    c.lastReview = now;
    return c;
  }

  /* Human-readable interval preview for the four answer buttons. */
  function previewIntervals(card, now) {
    now = now || Date.now();
    const out = {};
    for (let g = 1; g <= 4; g++) {
      const next = schedule(card, g, now);
      out[g] = fmtInterval(next.due - now);
    }
    return out;
  }

  function fmtInterval(ms) {
    const min = ms / 60000;
    if (min < 1.5) return '<1m';
    if (min < 60) return Math.round(min) + 'm';
    const days = ms / DAY_MS;
    if (days < 1.5) return Math.round(ms / 3600000) + 'u';
    if (days < 30) return Math.round(days) + 'd';
    if (days < 365) return (days / 30.44).toFixed(1).replace('.0', '') + 'mnd';
    return (days / 365.25).toFixed(1).replace('.0', '') + 'j';
  }

  return {
    schedule,
    previewIntervals,
    retrievability,
    setRetention(r) { requestRetention = Math.min(0.99, Math.max(0.7, r)); },
    newCard(front, back, deck, now) {
      return {
        front, back, deck: deck || '',
        state: 0, due: now || Date.now(),
        stability: 0, difficulty: 0,
        reps: 0, lapses: 0, lastReview: null,
        addedAt: now || Date.now()
      };
    }
  };
})();

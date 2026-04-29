// Overview (Overzicht) — hero daily ring, streak, recent timeline, weekly breakdown.

function OverviewScreen({ tweaks }) {
  const goalMin = tweaks.goalHours * 60;
  const pct = Math.min(1, TODAY.total / goalMin);
  const streak = computeStreak(HISTORY);
  const last7 = HISTORY.slice(-7);
  const weekTotal = last7.reduce((s, d) => s + d.total, 0);
  const ankiWeek = last7.reduce((s, d) => s + d.anki, 0);
  const avg = Math.round(weekTotal / 7);

  const skillWeek = Object.keys(SKILLS).reduce((acc, k) => {
    acc[k] = last7.reduce((s, d) => s + d[k], 0);
    return acc;
  }, {});

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Goedemorgen';
    if (h < 18) return 'Goedemiddag';
    return 'Goedenavond';
  })();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 16px 24px' }}>
      {/* Greeting header */}
      <div style={{ padding: '4px 4px 0' }}>
        <div style={{ fontSize: 11, letterSpacing: 1.4, color: 'var(--ink-3)', textTransform: 'uppercase' }}>
          {greeting}
        </div>
        <div style={{
          fontFamily: 'var(--serif)', fontSize: 28, lineHeight: 1.05,
          letterSpacing: -0.5, marginTop: 2, color: 'var(--ink)',
        }}>
          Dag {HISTORY.length}, zonder onderbreking —<br/>
          <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>blijf lezen.</span>
        </div>
      </div>

      {/* Hero — today's practice */}
      <Card style={{ padding: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ position: 'relative', width: 108, height: 108 }}>
            <Ring size={108} stroke={7} value={pct} color="var(--accent)" />
            <div style={{
              position: 'absolute', inset: 0, display: 'flex',
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 32, lineHeight: 1, color: 'var(--ink)' }}>
                {fmtH(TODAY.total)}
              </span>
              <span style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 1, marginTop: 2 }}>
                VAN {tweaks.goalHours.toFixed(1)} UUR
              </span>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: 1.2, textTransform: 'uppercase' }}>
              Vandaag
            </div>
            <div style={{
              fontFamily: 'var(--serif)', fontSize: 42, lineHeight: 1,
              color: 'var(--ink)', marginTop: 4, letterSpacing: -1,
            }}>
              {fmtMin(TODAY.total)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 6 }}>
              {goalMin - TODAY.total > 0
                ? `nog ${fmtMin(goalMin - TODAY.total)} tot je doel`
                : '🎉 doel bereikt'}
            </div>
          </div>
        </div>

        {/* Skill dots strip */}
        <div style={{ display: 'flex', gap: 2, marginTop: 16, height: 4, borderRadius: 2, overflow: 'hidden' }}>
          {Object.values(SKILLS).map(s => {
            const v = TODAY[s.key];
            if (v === 0) return null;
            return <div key={s.key} style={{ background: s.color, flex: v, minWidth: 2 }} />;
          })}
          {TODAY.total === 0 && <div style={{ background: 'var(--hairline)', flex: 1 }} />}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {Object.values(SKILLS).map(s => (
            <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: s.color }} />
              <span className="mono" style={{ fontSize: 10, color: 'var(--ink-2)' }}>
                {TODAY[s.key]}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Streak + Anki strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Card style={{ padding: 14 }}>
          <div style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 1.4, textTransform: 'uppercase' }}>Reeks</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--ink)', letterSpacing: -0.5, lineHeight: 1 }}>{streak}</span>
            <span style={{ fontSize: 11, color: 'var(--ink-2)' }}>dagen</span>
          </div>
          <div style={{ display: 'flex', gap: 2, marginTop: 12 }}>
            {HISTORY.slice(-14).map((d, i) => (
              <div key={i} style={{
                flex: 1, height: 14, borderRadius: 2,
                background: d.total > 0 ? 'var(--accent)' : 'var(--hairline)',
                opacity: d.total > 0 ? 0.3 + (d.total / 200) * 0.7 : 1,
              }} />
            ))}
          </div>
        </Card>
        <Card style={{ padding: 14 }}>
          <div style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 1.4, textTransform: 'uppercase' }}>Anki · 7d</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--ink)', letterSpacing: -0.5, lineHeight: 1 }}>{ankiWeek}</span>
            <span style={{ fontSize: 11, color: 'var(--ink-2)' }}>kaarten</span>
          </div>
          <div style={{ marginTop: 8 }}>
            <Sparkline data={last7.map(d => d.anki)} width={140} height={22} color="var(--accent-2)" />
          </div>
        </Card>
      </div>

      {/* Recent sessions */}
      <div style={{ marginTop: 6 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          padding: '0 4px 8px',
        }}>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: 1.4, textTransform: 'uppercase' }}>
            Vandaag · Sessies
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>
            {RECENT.length} · {fmtMin(RECENT.reduce((s, r) => s + r.mins, 0))}
          </div>
        </div>
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          {RECENT.map((r, i) => {
            const s = SKILLS[r.skill];
            return (
              <div key={i} style={{
                padding: '14px 16px',
                borderBottom: i < RECENT.length - 1 ? '1px solid var(--hairline)' : 'none',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', width: 36 }}>{r.t}</div>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: s.color, opacity: 0.18,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute', color: s.color, fontSize: 14, opacity: 1,
                    fontWeight: 600,
                  }}>{s.short}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: 'var(--ink)', display: 'flex', gap: 6, alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 500 }}>{s.label}</span>
                    <span style={{ color: 'var(--ink-3)', fontSize: 11 }}>· {r.tag}</span>
                  </div>
                  <div style={{
                    fontSize: 12, color: 'var(--ink-2)', marginTop: 2,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{r.note}</div>
                </div>
                <div className="mono" style={{ fontSize: 13, color: 'var(--ink)' }}>{r.mins}m</div>
              </div>
            );
          })}
        </Card>
      </div>

      {/* Week breakdown */}
      <div style={{ marginTop: 6 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          padding: '0 4px 8px',
        }}>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: 1.4, textTransform: 'uppercase' }}>
            Deze week
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>
            {fmtH(weekTotal)}u · ⌀ {fmtMin(avg)}/dag
          </div>
        </div>
        <Card>
          {Object.values(SKILLS).map(s => (
            <Bar key={s.key} label={s.label} value={skillWeek[s.key]} total={weekTotal} color={s.color} />
          ))}
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { OverviewScreen });

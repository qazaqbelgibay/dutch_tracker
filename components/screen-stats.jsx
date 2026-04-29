// Stats — heatmap, stacked bars, distribution, goals.

function StatsScreen({ tweaks }) {
  const [range, setRange] = React.useState('week');
  const [hovered, setHovered] = React.useState(null);
  const slice = range === 'week' ? HISTORY.slice(-7) : range === 'month' ? HISTORY.slice(-28) : HISTORY;
  const total = slice.reduce((s, d) => s + d.total, 0);
  const avg = total / slice.length;
  const best = Math.max(...slice.map(d => d.total));

  const byTag = {
    Podcast: 34, Boek: 18, Artikel: 12, Video: 16, Oefening: 12, Cursus: 6, Gesprek: 2,
  };
  const tagTotal = Object.values(byTag).reduce((a,b) => a+b, 0);

  // goals (seed data)
  const goals = [
    { name: 'Dagelijks doel', type: 'recurring', cur: TODAY.total, tgt: tweaks.goalHours*60, unit: 'm', color: 'var(--accent)' },
    { name: 'Lezen deze week', type: 'weekly', cur: slice.reduce((s,d)=>s+d.read,0), tgt: 180, unit: 'm', color: SKILLS.read.color },
    { name: 'Anki streak', type: 'streak', cur: 12, tgt: 30, unit: ' dagen', color: 'var(--accent-2)' },
    { name: 'B1 eindexamen', type: 'total', cur: Math.round(HISTORY.reduce((s,d)=>s+d.total,0)/60), tgt: 200, unit: 'u', color: SKILLS.grammar.color, deadline: '15 jun' },
  ];

  const maxDay = Math.max(...slice.map(d => d.total), 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 16px 24px' }}>
      {/* Range selector */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
        <Segmented
          options={[{key:'week',label:'Week'},{key:'month',label:'Maand'},{key:'all',label:'Alles'}]}
          value={range} onChange={setRange} />
      </div>

      {/* Big totals */}
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <Stat label="Totaal" value={fmtH(total)} unit="u" />
          <Stat label="Gemiddeld" value={fmtMin(Math.round(avg))} unit="/dag" />
          <Stat label="Piek" value={fmtH(best)} unit="u" />
        </div>
      </Card>

      {/* Heatmap */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px 8px', alignItems: 'baseline' }}>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: 1.4, textTransform: 'uppercase' }}>
            6 weken consistentie
          </div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>
            {hovered ? `${hovered.date} · ${fmtMin(hovered.total)}` : `${HISTORY.filter(d => d.total > 0).length} actieve dagen`}
          </div>
        </div>
        <Card>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <Heatmap history={HISTORY} onHover={setHovered} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 1, textTransform: 'uppercase' }}>Minder · Meer</div>
              <div style={{ display: 'flex', gap: 3 }}>
                {[0.1, 0.3, 0.55, 0.8, 1].map((v, i) => (
                  <div key={i} style={{
                    width: 14, height: 14, borderRadius: 3,
                    background: i === 0 ? 'var(--hairline)' : `oklch(${0.95 - v * 0.3} ${0.04 + v * 0.12} 55)`,
                  }} />
                ))}
              </div>
              <Rule style={{ margin: '4px 0' }} />
              <div style={{ fontSize: 11, color: 'var(--ink-2)' }}>
                Langste reeks: <span className="mono" style={{ color: 'var(--ink)' }}>12 dagen</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-2)' }}>
                Beste dag: <span className="mono" style={{ color: 'var(--ink)' }}>zondag</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Stacked daily bars */}
      <div>
        <div style={{ padding: '0 4px 8px', fontSize: 11, color: 'var(--ink-3)', letterSpacing: 1.4, textTransform: 'uppercase' }}>
          Dagelijkse studietijd
        </div>
        <Card>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 120 }}>
            {slice.map((d, i) => {
              const dow = ['Z','M','D','W','D','V','Z'][d.dow];
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%' }}>
                  <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column-reverse', borderRadius: 3, overflow: 'hidden' }}>
                    {Object.values(SKILLS).map(s => d[s.key] > 0 && (
                      <div key={s.key} style={{
                        background: s.color,
                        height: `${(d[s.key] / maxDay) * 100}%`,
                      }} />
                    ))}
                    {d.total === 0 && <div style={{ background: 'var(--hairline)', height: 2, marginTop: 'auto' }} />}
                  </div>
                  <span style={{ fontSize: 9, color: 'var(--ink-3)', letterSpacing: 0.5 }}>{dow}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {Object.values(SKILLS).map(s => (
              <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color }} />
                <span style={{ fontSize: 10, color: 'var(--ink-2)' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Tag distribution */}
      <div>
        <div style={{ padding: '0 4px 8px', fontSize: 11, color: 'var(--ink-3)', letterSpacing: 1.4, textTransform: 'uppercase' }}>
          Verdeling per tag
        </div>
        <Card>
          {Object.entries(byTag).sort((a,b) => b[1]-a[1]).map(([t, v]) => (
            <Bar key={t} label={t} value={v} total={tagTotal} color="var(--ink-2)" />
          ))}
        </Card>
      </div>

      {/* Goals */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px 8px', alignItems: 'baseline' }}>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: 1.4, textTransform: 'uppercase' }}>Doelen</div>
          <button style={{
            border: 'none', background: 'transparent', color: 'var(--accent)',
            fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
          }}>+ Nieuw</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {goals.map((g, i) => {
            const pct = Math.min(1, g.cur / g.tgt);
            return (
              <Card key={i} style={{ padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{g.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2, letterSpacing: 0.4, textTransform: 'uppercase' }}>
                      {g.type === 'recurring' ? 'Dagelijks' : g.type === 'weekly' ? 'Wekelijks' : g.type === 'streak' ? 'Reeks' : 'Totaal'}
                      {g.deadline && ` · deadline ${g.deadline}`}
                    </div>
                  </div>
                  <div className="mono" style={{ fontSize: 13, color: 'var(--ink)' }}>
                    {g.type === 'recurring' || g.type === 'weekly'
                      ? `${fmtH(g.cur)} / ${fmtH(g.tgt)}u`
                      : `${g.cur} / ${g.tgt}${g.unit}`}
                  </div>
                </div>
                <div style={{ marginTop: 10, height: 4, background: 'var(--hairline)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${pct * 100}%`, background: g.color,
                    transition: 'width 800ms cubic-bezier(.2,.8,.2,1)',
                  }} />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const Stat = ({ label, value, unit }) => (
  <div>
    <div style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 1.2, textTransform: 'uppercase' }}>{label}</div>
    <div style={{ marginTop: 6, display: 'flex', alignItems: 'baseline', gap: 4 }}>
      <span className="mono" style={{ fontSize: 22, lineHeight: 1, color: 'var(--ink)', fontWeight: 300, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{unit}</span>
    </div>
  </div>
);

Object.assign(window, { StatsScreen });

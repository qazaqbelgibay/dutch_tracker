// Log screen — stopwatch hero + quick-entry + passive listening toggle + manual form.

function LogScreen({ tweaks }) {
  const [skill, setSkill] = React.useState('listen');
  const [tag, setTag] = React.useState('Podcast');
  const [passive, setPassive] = React.useState(false);
  const [running, setRunning] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0); // seconds
  const [note, setNote] = React.useState('');
  const [mode, setMode] = React.useState('timer'); // 'timer' | 'manual'
  const [manualMins, setManualMins] = React.useState(30);

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  const hh = String(Math.floor(elapsed / 3600)).padStart(2, '0');
  const mm = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');

  const sDef = SKILLS[skill];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 16px 24px' }}>
      {/* Mode toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 4px' }}>
        <Segmented
          options={[{key:'timer', label:'Stopwatch'}, {key:'manual', label:'Handmatig'}]}
          value={mode} onChange={setMode} />
      </div>

      {/* Timer hero */}
      {mode === 'timer' && (
        <Card style={{
          padding: '28px 18px 22px',
          background: running
            ? `color-mix(in oklch, ${sDef.color} 8%, var(--bg))`
            : 'var(--bg)',
          borderColor: running ? `color-mix(in oklch, ${sDef.color} 40%, var(--hairline))` : 'var(--hairline)',
          transition: 'all 400ms',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: 1.6, textTransform: 'uppercase' }}>
              {running ? 'Bezig' : 'Klaar om te starten'}
            </div>
            <div className="mono" style={{
              fontSize: 54, fontWeight: 300, color: 'var(--ink)',
              letterSpacing: -2, marginTop: 8, lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}>
              {hh}:{mm}<span style={{ color: 'var(--ink-3)' }}>:{ss}</span>
            </div>
            {passive && (
              <div style={{
                marginTop: 10, fontSize: 10, letterSpacing: 1.4, color: 'var(--accent)',
                textTransform: 'uppercase',
              }}>◐ Passief luisteren · telt voor 50%</div>
            )}
          </div>

          {/* Skill chooser */}
          <div style={{ display: 'flex', gap: 6, marginTop: 20 }}>
            {Object.values(SKILLS).map(s => {
              const active = s.key === skill;
              return (
                <button key={s.key} onClick={() => setSkill(s.key)}
                  style={{
                    flex: 1, padding: '10px 4px', border: 'none', background: 'transparent',
                    borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    color: active ? 'var(--bg)' : 'var(--ink-2)',
                    backgroundColor: active ? s.color : 'var(--bg-2)',
                    transition: 'all 180ms',
                  }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>{s.short}</span>
                  <span style={{ fontSize: 10, letterSpacing: 0.3 }}>{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            {!running && elapsed === 0 && (
              <button onClick={() => setRunning(true)} style={btnPrimary(sDef.color)}>
                Start sessie
              </button>
            )}
            {running && (
              <button onClick={() => setRunning(false)} style={btnSecondary()}>
                Pauze
              </button>
            )}
            {!running && elapsed > 0 && (
              <>
                <button onClick={() => setRunning(true)} style={btnSecondary()}>Hervat</button>
                <button onClick={() => { setElapsed(0); setRunning(false); }} style={btnPrimary(sDef.color)}>
                  Opslaan · {Math.round(elapsed / 60)}m
                </button>
              </>
            )}
          </div>

          {/* Passive toggle */}
          <div
            onClick={() => setPassive(!passive)}
            style={{
              marginTop: 12, padding: '10px 12px', borderRadius: 10,
              background: 'var(--bg-2)', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', cursor: 'pointer',
            }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--ink)' }}>Passief luisteren</div>
              <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>
                Achtergrondpodcast tijdens afwas, wandelen, etc.
              </div>
            </div>
            <div style={{
              width: 34, height: 20, borderRadius: 999,
              background: passive ? sDef.color : 'var(--hairline)',
              position: 'relative', transition: 'background 200ms',
            }}>
              <div style={{
                position: 'absolute', top: 2, left: passive ? 16 : 2,
                width: 16, height: 16, borderRadius: 999, background: '#fff',
                transition: 'left 200ms', boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
              }} />
            </div>
          </div>
        </Card>
      )}

      {/* Manual entry */}
      {mode === 'manual' && (
        <Card style={{ padding: 18 }}>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: 1.4, textTransform: 'uppercase' }}>
            Minuten
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
            <button onClick={() => setManualMins(Math.max(0, manualMins - 5))} style={stepBtn()}>−</button>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <span className="mono" style={{
                fontSize: 56, fontVariantNumeric: 'tabular-nums',
                color: 'var(--ink)', letterSpacing: -2, fontWeight: 300,
              }}>{manualMins}</span>
              <span style={{ fontSize: 13, color: 'var(--ink-2)', marginLeft: 6 }}>min</span>
            </div>
            <button onClick={() => setManualMins(manualMins + 5)} style={stepBtn()}>+</button>
          </div>

          {/* Quick-add chips */}
          <div style={{ display: 'flex', gap: 6, marginTop: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[15, 25, 30, 45, 60, 90].map(n => (
              <button key={n} onClick={() => setManualMins(n)} style={{
                padding: '5px 11px', fontSize: 11,
                border: '1px solid var(--hairline)', borderRadius: 999,
                background: manualMins === n ? 'var(--ink)' : 'transparent',
                color: manualMins === n ? 'var(--bg)' : 'var(--ink-2)',
                fontFamily: 'inherit', cursor: 'pointer',
              }}>{n}m</button>
            ))}
          </div>

          <Rule style={{ margin: '18px 0 14px' }} />

          <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 8 }}>
            Vaardigheid
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {Object.values(SKILLS).map(s => {
              const active = s.key === skill;
              return (
                <button key={s.key} onClick={() => setSkill(s.key)} style={{
                  padding: '10px 12px', border: '1px solid',
                  borderColor: active ? s.color : 'var(--hairline)',
                  background: active ? `color-mix(in oklch, ${s.color} 12%, var(--bg))` : 'var(--bg)',
                  borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit',
                  textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <span style={{
                    width: 20, height: 20, borderRadius: 6, background: s.color,
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 600,
                  }}>{s.short}</span>
                  <span style={{ fontSize: 13, color: 'var(--ink)' }}>{s.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{ fontSize: 11, color: 'var(--ink-3)', letterSpacing: 1.4, textTransform: 'uppercase', margin: '14px 0 6px' }}>
            Tag
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {TAGS.map(t => (
              <button key={t} onClick={() => setTag(t)} style={{
                padding: '6px 10px', fontSize: 11,
                border: '1px solid', borderRadius: 999,
                borderColor: tag === t ? 'var(--ink)' : 'var(--hairline)',
                background: tag === t ? 'var(--ink)' : 'transparent',
                color: tag === t ? 'var(--bg)' : 'var(--ink-2)',
                fontFamily: 'inherit', cursor: 'pointer',
              }}>{t}</button>
            ))}
          </div>

          <input
            value={note} onChange={e => setNote(e.target.value)}
            placeholder="Notitie (optioneel)…"
            style={{
              marginTop: 14, width: '100%', boxSizing: 'border-box',
              padding: '10px 12px', fontFamily: 'inherit', fontSize: 13,
              border: '1px solid var(--hairline)', borderRadius: 10,
              background: 'var(--bg-2)', color: 'var(--ink)', outline: 'none',
            }}
          />

          <button style={{ ...btnPrimary(sDef.color), marginTop: 14 }}>
            Opslaan
          </button>
        </Card>
      )}

      {/* Anki quick entry */}
      <div>
        <div style={{
          fontSize: 11, color: 'var(--ink-3)', letterSpacing: 1.4,
          textTransform: 'uppercase', padding: '0 4px 8px',
        }}>Anki vandaag</div>
        <Card style={{ padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <span className="mono" style={{
                  fontSize: 32, color: 'var(--ink)', fontVariantNumeric: 'tabular-nums',
                  fontWeight: 300,
                }}>{TODAY.anki}</span>
                <span style={{ fontSize: 12, color: 'var(--ink-2)' }}>kaarten herhaald</span>
              </div>
              <div style={{ marginTop: 8 }}>
                <Sparkline data={HISTORY.slice(-14).map(d => d.anki)} width={180} height={20}
                  color="var(--accent-2)" fill="color-mix(in oklch, var(--accent-2) 12%, transparent)" />
              </div>
            </div>
            <button style={{
              padding: '9px 14px', border: '1px solid var(--hairline)',
              background: 'var(--bg)', borderRadius: 10, fontFamily: 'inherit',
              fontSize: 13, color: 'var(--ink)', cursor: 'pointer',
            }}>+ Kaarten</button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function btnPrimary(color) {
  return {
    flex: 1, padding: '12px 16px', border: 'none',
    background: color, color: '#fff',
    borderRadius: 10, fontFamily: 'inherit',
    fontSize: 14, fontWeight: 500, cursor: 'pointer', letterSpacing: 0.2,
  };
}
function btnSecondary() {
  return {
    flex: 1, padding: '12px 16px',
    border: '1px solid var(--hairline)', background: 'var(--bg)',
    color: 'var(--ink)', borderRadius: 10, fontFamily: 'inherit',
    fontSize: 14, fontWeight: 500, cursor: 'pointer', letterSpacing: 0.2,
  };
}
function stepBtn() {
  return {
    width: 40, height: 40, borderRadius: 999,
    border: '1px solid var(--hairline)', background: 'var(--bg)',
    color: 'var(--ink)', fontSize: 18, cursor: 'pointer',
    fontFamily: 'inherit',
  };
}

Object.assign(window, { LogScreen });

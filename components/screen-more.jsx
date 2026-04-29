// Meer (More) — settings + goals + data.

function MoreScreen({ tweaks, setTweaks }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 16px 24px' }}>
      <Section title="Voorkeuren">
        <Row label="Donkere modus" sub="Schakel tussen licht en donker"
          control={<Toggle value={tweaks.dark} onChange={v => setTweaks({...tweaks, dark: v})} />} />
        <Rule />
        <Row label="Dagelijks doel" sub={`${tweaks.goalHours.toFixed(1)} uur per dag`}
          control={
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button onClick={() => setTweaks({...tweaks, goalHours: Math.max(0.5, tweaks.goalHours - 0.5)})} style={tinyBtn()}>−</button>
              <span className="mono" style={{ fontSize: 13, width: 28, textAlign: 'center' }}>{tweaks.goalHours.toFixed(1)}</span>
              <button onClick={() => setTweaks({...tweaks, goalHours: tweaks.goalHours + 0.5})} style={tinyBtn()}>+</button>
            </div>
          } />
        <Rule />
        <Row label="Dag verlengen" sub="Tot 03:00 als gisteren meetellen"
          control={<Toggle value={tweaks.extendDay} onChange={v => setTweaks({...tweaks, extendDay: v})} />} />
      </Section>

      <Section title="Taalniveau">
        <Row label="Niveau" sub="B1 — Zelfstandig gebruiker"
          control={<Pill text="B1" />} />
        <Rule />
        <Row label="Begonnen" sub="3 februari 2026 · 77 dagen geleden"
          control={<span style={{ fontSize: 12, color: 'var(--ink-3)' }}>›</span>} />
      </Section>

      <Section title="Gegevens">
        <ActionRow icon="↑" label="Gegevens exporteren" sub="JSON-bestand" />
        <Rule />
        <ActionRow icon="↓" label="Gegevens importeren" />
        <Rule />
        <ActionRow icon="⚠" label="Alle gegevens wissen" tone="warn" />
      </Section>

      <div style={{ padding: '16px 8px 0', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--ink-3)' }}>
          "Een taal leer je met je oren."
        </div>
        <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 6, letterSpacing: 0.4 }}>
          NL_TRACKER · v2 · offline
        </div>
      </div>
    </div>
  );
}

const Section = ({ title, children }) => (
  <div>
    <div style={{ padding: '0 4px 8px', fontSize: 11, color: 'var(--ink-3)', letterSpacing: 1.4, textTransform: 'uppercase' }}>
      {title}
    </div>
    <Card style={{ padding: 0, overflow: 'hidden' }}>{children}</Card>
  </div>
);

const Row = ({ label, sub, control }) => (
  <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, color: 'var(--ink)' }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{sub}</div>}
    </div>
    {control}
  </div>
);

const ActionRow = ({ icon, label, sub, tone }) => (
  <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
    <div style={{
      width: 28, height: 28, borderRadius: 8,
      background: tone === 'warn' ? 'color-mix(in oklch, var(--accent) 16%, var(--bg-2))' : 'var(--bg-2)',
      color: tone === 'warn' ? 'var(--accent)' : 'var(--ink-2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 14,
    }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 13, color: tone === 'warn' ? 'var(--accent)' : 'var(--ink)' }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{sub}</div>}
    </div>
    <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>›</span>
  </div>
);

const Toggle = ({ value, onChange }) => (
  <div onClick={() => onChange(!value)} style={{
    width: 38, height: 22, borderRadius: 999,
    background: value ? 'var(--accent)' : 'var(--hairline)',
    position: 'relative', cursor: 'pointer', transition: 'background 200ms',
  }}>
    <div style={{
      position: 'absolute', top: 2, left: value ? 18 : 2,
      width: 18, height: 18, borderRadius: 999, background: '#fff',
      transition: 'left 200ms', boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
    }} />
  </div>
);

const Pill = ({ text }) => (
  <span style={{
    padding: '3px 10px', fontSize: 11, fontWeight: 500,
    background: 'var(--accent)', color: '#fff', borderRadius: 999,
    letterSpacing: 0.5,
  }}>{text}</span>
);

function tinyBtn() {
  return {
    width: 26, height: 26, borderRadius: 999,
    border: '1px solid var(--hairline)', background: 'var(--bg)',
    color: 'var(--ink)', cursor: 'pointer', fontFamily: 'inherit',
    fontSize: 14, lineHeight: 1,
  };
}

Object.assign(window, { MoreScreen });

// Reusable primitives — cards, rings, sparkline, tabs.

const Ring = ({ size = 64, stroke = 6, value = 0, color = 'var(--ink)', track = 'var(--hairline)' }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = Math.max(0, Math.min(1, value)) * c;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${c}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 600ms cubic-bezier(.2,.8,.2,1)' }} />
    </svg>
  );
};

const Sparkline = ({ data, width = 240, height = 44, color = 'var(--ink)', fill = 'none' }) => {
  if (!data || !data.length) return null;
  const max = Math.max(...data, 1);
  const step = width / (data.length - 1 || 1);
  const pts = data.map((v, i) => [i * step, height - (v / max) * height]);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  return (
    <svg width={width} height={height} style={{ display: 'block', overflow: 'visible' }}>
      {fill !== 'none' && <path d={area} fill={fill} />}
      <path d={line} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {pts.slice(-1).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.5} fill={color} />
      ))}
    </svg>
  );
};

// Tiny horizontal bar row (for skill breakdowns)
const Bar = ({ label, value, total, color }) => {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '92px 1fr 44px', alignItems: 'center', gap: 12, padding: '6px 0' }}>
      <span style={{ fontSize: 13, color: 'var(--ink-2)', letterSpacing: 0.1 }}>{label}</span>
      <div style={{ height: 4, background: 'var(--hairline)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`, background: color,
          transition: 'width 700ms cubic-bezier(.2,.8,.2,1)',
        }} />
      </div>
      <span className="mono" style={{ fontSize: 12, color: 'var(--ink-2)', textAlign: 'right' }}>
        {fmtMin(value)}
      </span>
    </div>
  );
};

// 6-week consistency grid (42 cells)
const Heatmap = ({ history, onHover }) => {
  // group into 6 rows of 7 (oldest-first, ending today)
  const rows = [];
  for (let r = 0; r < 6; r++) rows.push(history.slice(r * 7, r * 7 + 7));
  const max = Math.max(...history.map(d => d.total), 1);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: 'flex', gap: 4 }}>
          {row.map((d, ci) => {
            const intensity = d.total / max;
            const bg = d.total === 0
              ? 'var(--hairline)'
              : `oklch(${0.95 - intensity * 0.3} ${0.04 + intensity * 0.12} 55)`;
            const isToday = ri === 5 && ci === 6;
            return (
              <div key={ci}
                onMouseEnter={() => onHover && onHover(d)}
                style={{
                  width: 22, height: 22, borderRadius: 4,
                  background: bg,
                  outline: isToday ? '1.5px solid var(--ink)' : 'none',
                  outlineOffset: 1,
                  cursor: 'pointer',
                }} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

// Segmented tab bar (pill style)
const Segmented = ({ options, value, onChange }) => (
  <div style={{
    display: 'inline-flex', padding: 3, background: 'var(--bg-2)',
    borderRadius: 999, border: '1px solid var(--hairline)',
  }}>
    {options.map(opt => {
      const active = opt.key === value;
      return (
        <button key={opt.key} onClick={() => onChange(opt.key)}
          style={{
            padding: '6px 14px', fontSize: 12, fontWeight: 500,
            border: 'none', background: active ? 'var(--bg)' : 'transparent',
            color: active ? 'var(--ink)' : 'var(--ink-2)',
            borderRadius: 999, cursor: 'pointer', letterSpacing: 0.2,
            boxShadow: active ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
            fontFamily: 'inherit',
          }}>{opt.label}</button>
      );
    })}
  </div>
);

const Card = ({ children, style, ...rest }) => (
  <div {...rest} style={{
    background: 'var(--bg)',
    borderRadius: 18,
    border: '1px solid var(--hairline)',
    padding: 16,
    ...style,
  }}>{children}</div>
);

// Hairline divider
const Rule = ({ style }) => (
  <div style={{ height: 1, background: 'var(--hairline)', ...style }} />
);

Object.assign(window, { Ring, Sparkline, Bar, Heatmap, Segmented, Card, Rule });

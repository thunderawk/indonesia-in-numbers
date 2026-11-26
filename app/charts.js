// Hand-rolled SVG charts. No chart library: every chart is a few dozen
// lines of plain SVG built from the data, so the first load stays small.

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

// A vertical bar chart. `rows` is [{label, value}], `fmt` formats a value
// for the label above each bar. Negative values draw below the zero line.
export function barChart(rows, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 300;
  const padL = 46, padB = 34, padT = 30, padR = 10;
  const fmt = opts.fmt || ((v) => String(v));
  const values = rows.map((r) => r.value);
  const max = Math.max(...values, 0);
  const min = Math.min(...values, 0);
  const span = max - min || 1;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const zeroY = padT + (max / span) * ih;
  const bw = Math.min(64, (iw / rows.length) * 0.58);
  const step = iw / rows.length;
  let bars = '';
  rows.forEach((r, i) => {
    const x = padL + i * step + (step - bw) / 2;
    const y = r.value >= 0 ? padT + ((max - r.value) / span) * ih : zeroY;
    const bh = Math.abs(r.value) / span * ih;
    const fill = r.value < 0 ? '#c25e3a' : (opts.color || '#0f766e');
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(bh, 1).toFixed(1)}" rx="3" fill="${fill}"/>`;
    bars += `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="650" fill="#1f2a2a">${esc(fmt(r.value))}</text>`;
    bars += `<text x="${(x + bw / 2).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="12" fill="#5b6b6b">${esc(r.label)}</text>`;
  });
  const grid = [0, 0.5, 1].map((f) => {
    const y = padT + f * ih;
    const v = max - f * span;
    return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${w - padR}" y2="${y.toFixed(1)}" stroke="#e3e8e6" stroke-width="1"/><text x="${padL - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#8a9794">${esc(fmt(Math.round(v * 10) / 10))}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.aria || 'Bar chart')}" class="chart">${grid}<line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${w - padR}" y2="${zeroY.toFixed(1)}" stroke="#9aa8a4" stroke-width="1"/>${bars}</svg>`;
}

// A line chart with dots and value labels.
export function lineChart(rows, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 300;
  const padL = 46, padB = 34, padT = 30, padR = 16;
  const fmt = opts.fmt || ((v) => String(v));
  const values = rows.map((r) => r.value);
  let max = Math.max(...values);
  let min = Math.min(...values);
  if (max === min) { max += 1; min -= 1; }
  const pad = (max - min) * 0.15;
  max += pad; min -= pad;
  const span = max - min;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const px = (i) => padL + (i / (rows.length - 1)) * iw;
  const py = (v) => padT + ((max - v) / span) * ih;
  const pts = rows.map((r, i) => `${px(i).toFixed(1)},${py(r.value).toFixed(1)}`).join(' ');
  const grid = [0, 0.5, 1].map((f) => {
    const y = padT + f * ih;
    const v = max - f * span;
    return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${w - padR}" y2="${y.toFixed(1)}" stroke="#e3e8e6" stroke-width="1"/><text x="${padL - 8}" y="${(y + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#8a9794">${esc(fmt(Math.round(v * 100) / 100))}</text>`;
  }).join('');
  let dots = '';
  rows.forEach((r, i) => {
    dots += `<circle cx="${px(i).toFixed(1)}" cy="${py(r.value).toFixed(1)}" r="5" fill="${opts.color || '#b45309'}" stroke="#fff" stroke-width="2"/>`;
    dots += `<text x="${px(i).toFixed(1)}" y="${(py(r.value) - 11).toFixed(1)}" text-anchor="middle" font-size="13" font-weight="650" fill="#1f2a2a">${esc(fmt(r.value))}</text>`;
    dots += `<text x="${px(i).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="12" fill="#5b6b6b">${esc(r.label)}</text>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(opts.aria || 'Line chart')}" class="chart">${grid}<polyline points="${pts}" fill="none" stroke="${opts.color || '#b45309'}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

// A donut chart with a legend. `rows` is [{label, value}] in percent.
export function donut(rows, opts = {}) {
  const size = opts.size || 300;
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - 14, thick = 44;
  const colors = opts.colors || ['#0f766e', '#b45309', '#3f6212', '#7c2d12', '#155e75', '#9aa8a4'];
  const val = (row) => row.value ?? row.share;
  const total = rows.reduce((s, x) => s + val(x), 0);
  let acc = -90;
  let arcs = '';
  rows.forEach((row, i) => {
    const frac = val(row) / total;
    const a0 = acc, a1 = acc + frac * 360;
    acc = a1;
    const large = (a1 - a0) > 180 ? 1 : 0;
    const p0 = [cx + r * Math.cos(a0 * Math.PI / 180), cy + r * Math.sin(a0 * Math.PI / 180)];
    const p1 = [cx + r * Math.cos(a1 * Math.PI / 180), cy + r * Math.sin(a1 * Math.PI / 180)];
    arcs += `<path d="M ${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A ${r} ${r} 0 ${large} 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}" fill="none" stroke="${colors[i % colors.length]}" stroke-width="${thick}"/>`;
  });
  const legend = rows.map((row, i) =>
    `<li><span class="swatch" style="background:${colors[i % colors.length]}"></span><span class="leg-label">${esc(row.label ?? row.name)}</span><strong>${val(row).toFixed(2)}%</strong></li>`).join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="${esc(opts.aria || 'Donut chart')}" class="donut">${arcs}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="700" fill="#1f2a2a">${esc(opts.centre || '')}</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="#5b6b6b">${esc(opts.centreSub || '')}</text></svg><ul class="legend">${legend}</ul></div>`;
}

// Horizontal bars for shares (islands, generations): label + bar + value.
export function shareBars(rows, opts = {}) {
  const max = Math.max(...rows.map((r) => r.value));
  const bars = rows.map((r) => {
    const pct = (r.value / max) * 100;
    return `<div class="share-row"><span class="share-label">${esc(r.label)}</span><span class="share-track"><span class="share-fill" style="width:${pct.toFixed(1)}%;background:${opts.color || '#0f766e'}"></span></span><strong class="share-val">${esc(opts.fmt ? opts.fmt(r.value) : r.value + '%')}</strong></div>`;
  }).join('');
  return `<div class="share-bars">${bars}</div>`;
}

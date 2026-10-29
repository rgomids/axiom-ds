// Deterministic vector artwork. IDs are unique across the live and static scenes.
export function orbArt(id) {
  const key = `solar-orb-${id}`;
  const url = (name) => `url(#${key}-${name})`;
  let seed = 14729;
  const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const point = (radius, angle) => [Math.cos(angle) * radius, Math.sin(angle) * radius];
  const xy = (p) => p.map((n) => n.toFixed(2)).join(' ');
  let grain = '',
    dust = '',
    filaments = '';
  for (let i = 0; i < 330; i++) {
    const [x, y] = point(Math.sqrt(random()) * 48, random() * Math.PI * 2);
    grain += `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${(0.12 + random() * 0.45).toFixed(2)}" opacity="${(0.06 + random() * 0.3).toFixed(2)}"/>`;
  }
  for (let i = 0; i < 72; i++) {
    const angle = random() * Math.PI * 2;
    const p = point(56 + random() * 90, angle);
    const end = point(75 + random() * 84, angle + 0.05);
    dust += `<g class="solar-drift" style="--spark-x:${(end[0] - p[0]).toFixed(1)}px;--spark-y:${(end[1] - p[1]).toFixed(1)}px;--spark-delay:${(-random() * 9).toFixed(2)}s;--spark-duration:${(5 + random() * 6).toFixed(2)}s"><circle cx="${p[0].toFixed(2)}" cy="${p[1].toFixed(2)}" r="${(0.25 + random() * 0.65).toFixed(2)}" opacity="${(0.2 + random() * 0.5).toFixed(2)}"/></g>`;
  }
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI * 2) / 16 + random() * 0.12;
    const start = point(47, angle),
      a = point(71, angle + 0.15),
      b = point(94, angle - 0.18),
      end = point(92 + random() * 43, angle + 0.08);
    const d = `M ${xy(start)} C ${xy(a)} ${xy(b)} ${xy(end)}`;
    filaments += `<g class="solar-filament" style="--filament-delay:${(-random() * 8).toFixed(2)}s"><path d="${d}" opacity="${(0.13 + random() * 0.23).toFixed(2)}"/><path class="solar-trace" d="${d}" pathLength="100"/><circle class="solar-star" cx="${end[0].toFixed(2)}" cy="${end[1].toFixed(2)}" r="${i % 4 === 0 ? 1.3 : 0.65}"/></g>`;
  }
  return `<svg class="solar-art" viewBox="-180 -180 360 360" aria-hidden="true" focusable="false">
  <defs>
    <radialGradient id="${key}-haze"><stop stop-color="var(--lab-orb-ember)" stop-opacity=".3"/><stop offset=".3" stop-color="var(--lab-orb-ember)" stop-opacity=".17"/><stop offset=".68" stop-color="var(--lab-orb-ember)" stop-opacity=".035"/><stop offset="1" stop-color="var(--lab-orb-ember)" stop-opacity="0"/></radialGradient>
    <radialGradient id="${key}-glass" cx=".42" cy=".38" r=".65"><stop stop-color="var(--lab-orb-depth)" stop-opacity=".75"/><stop offset=".55" stop-color="var(--lab-orb-ember)" stop-opacity=".5"/><stop offset=".85" stop-color="var(--lab-orb-rim)" stop-opacity=".8"/><stop offset="1" stop-color="var(--lab-orb-ember)"/></radialGradient>
    <radialGradient id="${key}-reflection"><stop stop-color="var(--lab-orb-light)"/><stop offset=".15" stop-color="var(--lab-orb-rim)" stop-opacity=".8"/><stop offset="1" stop-color="var(--lab-orb-rim)" stop-opacity="0"/></radialGradient>
    <linearGradient id="${key}-orbit" x1="0" y1="0" x2="1" y2="1"><stop stop-color="var(--lab-orb-ember)" stop-opacity=".1"/><stop offset=".4" stop-color="var(--lab-orb-rim)" stop-opacity=".55"/><stop offset=".6" stop-color="var(--lab-orb-ember)" stop-opacity=".13"/><stop offset=".85" stop-color="var(--lab-orb-rim)" stop-opacity=".7"/><stop offset="1" stop-color="var(--lab-orb-ember)" stop-opacity=".1"/></linearGradient>
    <filter id="${key}-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="1.8"/></filter>
    <filter id="${key}-flame" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".075" numOctaves="3" seed="19"/><feDisplacementMap in="SourceGraphic" scale="4.5" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation=".32"/></filter>
  </defs>
  <circle r="165" fill="${url('haze')}"/>
  <g class="solar-orbits" fill="none"><circle r="151" stroke="${url('orbit')}" stroke-width=".7"/><path d="M -91 -63 A 110 110 0 0 0 -31 106 M 39 -103 A 110 110 0 0 1 108 20" stroke="var(--lab-orb-rim)" stroke-opacity=".12" stroke-width=".4"/></g>
  <g class="solar-filaments" fill="none" stroke="var(--lab-orb-rim)" stroke-width=".4">${filaments}</g>
  <g class="solar-dust" fill="var(--lab-orb-rim)">${dust}</g>
  <circle r="50" fill="${url('glass')}"/>
  <g class="solar-grain" fill="var(--lab-orb-light)">${grain}</g>
  <ellipse cx="-16" cy="-21" rx="8" ry="11" fill="${url('reflection')}" transform="rotate(34 -16 -21)"/>
  <ellipse cx="23" cy="26" rx="10" ry="17" fill="${url('reflection')}" opacity=".75" transform="rotate(32 23 26)"/>
  <circle r="50" fill="none" stroke="var(--lab-orb-ember)" stroke-width="6" opacity=".7" filter="${url('glow')}"/>
  <g class="solar-corona" fill="none" stroke="var(--lab-orb-rim)" filter="${url('flame')}"><circle r="50.6" stroke-width="2.5" opacity=".85"/><circle r="51.8" stroke-width=".8" opacity=".5"/></g>
  <circle r="49.8" fill="none" stroke="var(--lab-orb-light)" stroke-width=".85" opacity=".95"/>
  <circle r="48.7" fill="none" stroke="var(--lab-orb-rim)" stroke-width=".65" opacity=".65"/>
  </svg>`;
}

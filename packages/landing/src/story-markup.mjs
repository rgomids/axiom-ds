import { frames, sceneNames, tools, workContent, text } from './story-frames.js';
import { frameState, connectionPath, dependencyPath } from './storyboard-state.js';
const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
const t = (v, tag = 'span', attrs = '') =>
  `<${tag} data-en="${esc(v.en)}" ${attrs}>${esc(v.pt)}</${tag}>`;
const icon = (name) =>
  `<svg class="story-icon" viewBox="0 0 32 32" aria-hidden="true"><use href="#story-icon-${name}" /></svg>`;
const defs = `<svg class="story-defs" aria-hidden="true"><defs>${Object.entries({
  spec: 'M8 4h16v24H8z M12 10h8 M12 15h8 M12 20h5',
  tree: 'M16 4v9 M6 18v8 M26 18v8 M6 18h20 M16 13v5 M13 4h6v6h-6z M3 26h6 M23 26h6',
  code: 'M11 8l-8 8 8 8 M21 8l8 8-8 8 M19 5l-6 22',
  check: 'M5 6h22v22H5z M10 16l5 5L28 5',
  review: 'M5 5h22v18H15l-7 5v-5H5z M10 11h12 M10 16h9',
  cube: 'M16 3L29 10v14L16 31 3 24V10z M3 10l13 7 13-7 M16 17v14',
  folder: 'M3 9h11l4 4h11v15H3z M3 9V5h10l4 4',
  database: 'M4 8c0-7 24-7 24 0s-24 7-24 0v16c0 7 24 7 24 0V8 M4 16c0 7 24 7 24 0',
  person: 'M10 9a6 6 0 1 0 12 0a6 6 0 1 0-12 0 M4 29v-4c0-11 24-11 24 0v4',
  arrow: 'M3 16h25 M19 7l9 9-9 9',
  spark: 'M16 2l3 10 11 4-11 4-3 10-4-10L2 16l10-4z',
})
  .map(
    ([id, d]) =>
      `<path id="story-icon-${id}" d="${d}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />`,
  )
  .join(
    '',
  )}<marker id="story-flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--gold)" /></marker></defs></svg>`;
const mascot = (id) =>
  `<svg class="story-mascot" viewBox="320 240 620 520" aria-hidden="true"><defs><clipPath id="mascot-${id}"><rect x="320" y="240" width="620" height="520" /></clipPath></defs><image clip-path="url(#mascot-${id})" href="assets/axiom-logo.png" width="1254" height="1254" /></svg>`;
const position = (n) =>
  `left:${n.x}%;top:${n.y}%;width:${n.w}px;height:${n.h}px;opacity:${n.opacity};transform:translate(-50%,-50%) rotate(${n.rotation}deg)`;
const attr = (live, key, i = '') => (live ? `data-story-${key}="${i}"` : '');
const checks = [
  text('Testes passando', 'Tests passing'),
  text('Diff revisado', 'Diff reviewed'),
  text('Evidence gerada', 'Evidence generated'),
  text('Aceite para merge', 'Merge acceptance'),
];
const humanChecks = () =>
  `<ul class="human-checks">${checks.map((c, i) => `<li>${t(c)}<span>${i === 0 ? '✓' : '○'}</span></li>`).join('')}</ul>`;
export function relationLines(s) {
  const center = s.hub.opacity > 0.3 ? [s.hub.x, s.hub.y] : [s.idea.x, s.idea.y];
  return s.works.map((n, i) => {
    let from = center,
      to = [n.x, n.y],
      opacity = s.connections * n.opacity;
    if (s.layout === 'convergence') {
      from = [n.x, n.y];
      to = [s.works[5].x, s.works[5].y];
      if (i === 5) opacity = 0;
    }
    if (s.layout === 'lanes') {
      from = [s.works[0].x - 29, i ? s.works[i - 1].y : s.works[0].y];
      to = [s.works[i].x - 29, n.y];
      if (i === 5) opacity = 0;
    }
    if (s.layout === 'dependencies') {
      const prev = { 1: 0, 2: 1, 4: 2, 5: 4, 3: 2 }[i];
      if (prev === undefined) opacity = 0;
      else from = [s.works[prev].x, s.works[prev].y];
    }
    if (s.layout === 'human-gate') {
      from = [s.works[4].x - 44, s.works[4].y];
      to = [n.x - 44, n.y];
      opacity = i === 5 ? 0.6 : 0;
    }
    if (s.layout === 'continuity') {
      from = [s.idea.x, s.idea.y];
      to = [72, 50];
      opacity = i === 0 ? 0.7 : 0;
    }
    if (s.layout === 'dependencies')
      to = i === 3 ? [n.x - (n.w / 360) * 50 - 1, n.y] : [n.x, n.y - (n.h / 520) * 50 - 1];
    return {
      d:
        s.layout === 'dependencies'
          ? dependencyPath(from, to, i === 3)
          : connectionPath(from, to, i, s.grid),
      opacity,
    };
  });
}
export function renderFigure(index, live = false) {
  const s = frameState(index, true),
    id = live ? 'live' : `static-${index}`,
    lines = relationLines(s);
  const works = s.works
    .map((n, i) => {
      const c = workContent(index, i);
      return `<div class="story-work entity" data-kind="${c.kind}" ${attr(live, 'work', i)} style="${position(n)}">${icon(c.icon)}<div class="work-body">${t(c.title, 'strong', 'class="work-title"')}${t(c.detail, 'small', 'class="work-detail"')}<span class="work-agent">${esc(c.agent)}</span></div>${t(c.metric, 'span', 'class="work-metric"')}${i === 4 ? humanChecks() : ''}</div>`;
    })
    .join('');
  return `<div class="story-world ${live ? 'live-world' : 'scene-static'}" data-layout="${s.layout}">
  <div class="story-grid" style="opacity:${s.grid}"></div><div class="story-beam" style="opacity:${s.beam}"></div>
  <svg class="story-energy" viewBox="0 0 100 100" preserveAspectRatio="none" style="opacity:${s.energy}">${Array.from({ length: 12 }, (_, i) => `<path d="${connectionPath([i % 2 ? -12 : 112, i * 8], [50, 50], i, 0)}" />`).join('')}</svg>
  <svg class="flow-ports" viewBox="0 0 100 100" preserveAspectRatio="none" style="opacity:${s.layout === 'lanes' ? 1 : 0}">${s.works
    .slice(0, 5)
    .map(
      (n) =>
        `<path class="flow-fork" d="M ${s.works[0].x - 29} ${n.y} H ${s.works[0].x - 22} H ${n.x}" marker-mid="url(#story-flow-arrow)" /><ellipse class="flow-port" cx="${s.works[0].x - 29}" cy="${n.y}" rx="1" ry="0.8" />`,
    )
    .join('')}</svg>
<div class="story-ground" style="opacity:${s.ground}"><i></i><i></i><i></i></div>
  <div class="story-supernova" style="opacity:0"><i></i><i></i></div>
  <div class="execution-shell" style="opacity:${s.execution}">${t(text('Execução em andamento', 'Execution in progress'), 'strong', 'class="execution-title"')}<span>3 / 6</span><div class="execution-progress"></div><div class="runtime-activity"><p>Claude <small>Sonnet 4</small> <span>● ${t(text('Ativo · 1 tarefa', 'Active · 1 task'))}</span></p><p>Codex <small>o4-mini</small> <span>● ${t(text('Ativo · 2 tarefas', 'Active · 2 tasks'))}</span></p></div></div>
  <svg class="story-links" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">${lines.map((l, i) => `<path ${attr(live, 'path', i)} d="${l.d}" style="opacity:${l.opacity}" />`).join('')}${s.contexts.map((n, i) => `<path class="context-link" d="${connectionPath([50, 51], [n.x, n.y], i)}" style="opacity:${n.opacity}" />`).join('')}</svg>
  ${s.ghosts.map((n, i) => `<span class="story-ghost entity" ${attr(live, 'ghost', i)} style="${position(n)}"></span>`).join('')}
  ${s.tools.map((n, i) => `<div class="story-tool entity" ${attr(live, 'tool', i)} style="${position(n)}"><b>${['N', '✶', '⌘', '◉', '▤', '◇', '>_', '☷', '…'][i]}</b><span>${tools[i]}</span></div>`).join('')}
  ${s.contexts.map((n, i) => `<div class="story-context entity" ${attr(live, 'context', i)} style="${position(n)}">${icon(i ? 'database' : 'spec')}${t(i ? text('Integrações', 'Integrations') : text('Docs de referência', 'Reference docs'))}</div>`).join('')}
  <div class="idea-core entity" ${attr(live, 'idea')} style="${position(s.idea)}" data-card="${s.ideaCard}"><div class="orb-surface"><i></i></div><div class="orb-ring" style="opacity:${s.orbRing}"></div>${t(text('Ideia', 'Idea'), 'span', 'class="idea-label"')}</div>
  <div class="axiom-core entity" ${attr(live, 'axiom')} style="${position(s.hub)};border-radius:${s.hubRound ? 50 : 14}%">${mascot(id)}<span>AXIOM<br /><small>CONTROL PLANE</small></span></div>
  ${works}
  <div class="story-decision" ${attr(live, 'decision')} style="opacity:${s.decision}"><header>${icon('person')}<span>Code Review<br />${t(text('Exemplo de revisão', 'Illustrative review'), 'small')}</span>${t(text('Aprovado · exemplo', 'Approved · example'), 'b')}</header><ul>${[text('Testes passando', 'Tests passing'), text('Diff revisado', 'Diff reviewed'), text('Evidence completa', 'Complete Evidence'), text('Alinhado à Specification', 'Aligned with Specification'), text('Pronto para merge', 'Ready for merge')].map((v) => `<li><span>✓</span>${t(v)}</li>`).join('')}</ul><div class="decision-choices">${t(text('✓ Aceitar e seguir', '✓ Accept and continue'), 'span')}${t(text('↻ Solicitar retrabalho', '↻ Request rework'), 'span')}</div></div>
  <div class="delivery-chips" style="opacity:${s.chips}">${['code', 'tree', 'cube', 'spec', 'database'].map((k) => `<span>${icon(k)}</span>`).join('')}</div>
  <div class="story-continuity entity" style="left:72%;top:50%;opacity:${s.continuity}">${icon('arrow')}${t(text('Próximas\npossibilidades', 'Next\npossibilities'), 'strong')}</div>
  <div class="story-particles">${Array.from({ length: 28 }, (_, i) => `<i style="left:${(i * 37 + 9) % 97}%;top:${(i * 23 + 13) % 97}%;--particle:${(i % 3) + 1}px"></i>`).join('')}</div>
  ${index === 0 && !live ? `<div class="figure-opening">${t(frames[0].title, 'strong')}${t(frames[0].lead, 'p')}</div>` : ''}
 </div>`;
}
export function renderStorytelling() {
  return `${defs}<nav class="story-navigation" aria-label="Cenas da história" data-en-aria="Story scenes">${sceneNames.map((n, i) => `<a href="#cena-${i + 1}"><span>0${i + 1}</span>${t(n)}</a>`).join('')}<span class="story-counter">01 — 05 · 01 / 05</span></nav>
 <div class="story-stage" aria-hidden="true"><div class="story-wash"></div><div class="story-ambient"></div>${renderFigure(0, true)}${frames.map((f, i) => `<div class="story-copy" data-story-copy="${i}" ${i === 0 ? 'data-opening="true"' : ''}>${t(f.title, i === 0 ? 'h1' : 'h2')}${t(f.lead, 'p', 'class="story-lead"')}</div>`).join('')}<p class="story-disclaimer" data-en="Conceptual illustration · sample agents, models and results">Ilustração conceitual · agentes, modelos e resultados ilustrativos</p><p class="story-scroll" data-en="SCROLL TO CONTINUE ↓">ROLE PARA CONTINUAR ↓</p></div>
 <div class="story-scenes">${sceneNames
   .map(
     (name, scene) =>
       `<article data-story-scene="${scene + 1}" id="cena-${scene + 1}" style="--scene-index:${scene}">${scene === 2 ? '<span id="proposta" class="scene-anchor"></span>' : scene === 3 ? '<span id="fluxo" class="scene-anchor"></span>' : ''}${t(name, 'h2', 'class="scene-heading"')}${frames
         .filter((f) => f.scene === scene + 1)
         .map((f) => {
           const i = scene * 5 + f.beat - 1;
           return `<section class="story-beat" id="quadro-${f.scene}-${f.beat}" style="--beat-index:${f.beat - 1}"><p class="beat-number">0${f.scene} / 0${f.beat}</p>${t(f.title, 'h3')}${t(f.lead, 'p', 'class="static-lead"')}<figure aria-label="${esc(f.title.pt.replaceAll('\n', ' '))}" data-en-aria="${esc(f.title.en.replaceAll('\n', ' '))}">${renderFigure(i)}${i >= 16 ? t(text('Exemplo conceitual. Agentes, modelos, métricas e resultados são ilustrativos.', 'Conceptual example. Agents, models, metrics and results are illustrative.'), 'figcaption') : ''}</figure></section>`;
         })
         .join('')}</article>`,
   )
   .join('')}</div>`;
}

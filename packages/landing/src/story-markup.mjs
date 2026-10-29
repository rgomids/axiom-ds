import { orbArt } from './orb-art.mjs';
import { orchestrationOverlays, orchestrationStatic } from './orchestration-view.mjs';
import { offsets } from './orchestration-timeline.mjs';
import { chapterNavigation } from './chapter-navigation-view.mjs';
import { frames, sceneNames, tools, workContent, text, sceneStarts } from './story-frames.js';
import {
  frameState,
  dependencySideConnections,
  frameConnections,
  flowSpineX,
} from './storyboard-state.js';
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
  flask: 'M11 3h10 M13 3v10L5 27h22l-8-14V3 M10 20h12',
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
const agentMark = (agent) =>
  `<img class="agent-mark ${agent.startsWith('Claude') ? 'claude-mark' : ''}" src="assets/${agent.startsWith('Claude') ? 'claude' : 'openai'}-mark.svg" alt="" />`;
const position = (n) =>
  `left:${n.x}%;top:${n.y}%;width:${n.w}px;height:${n.h}px;opacity:${n.opacity};transform:translate(-50%,-50%) rotate(${n.rotation}deg) scale(${n.scale})`;
const attr = (live, key, i = '') => (live ? `data-story-${key}="${i}"` : '');
const checks = [
  text('Testes passando', 'Tests passing'),
  text('Diff revisado', 'Diff reviewed'),
  text('Evidence gerada', 'Evidence generated'),
  text('Aceite para merge', 'Merge acceptance'),
];
const humanChecks = () =>
  `<ul class="human-checks">${checks.map((c, i) => `<li>${t(c)}<span>${i === 0 ? '✓' : '○'}</span></li>`).join('')}</ul>`;
function transcript(index) {
  const s = frameState(index, true);
  return text(
    ...['pt', 'en'].map((lang) => {
      const parts = [];
      if (s.idea.opacity > 0.8)
        parts.push(
          lang === 'pt'
            ? 'A ideia permanece como núcleo luminoso.'
            : 'The idea remains a luminous nucleus.',
        );
      if (s.hub.opacity > 0.8) parts.push('Axiom · Control Plane.');
      if (s.ghosts.filter((n) => n.opacity > 0.5).length === 8)
        parts.push(lang === 'pt' ? 'Oito painéis emergentes.' : 'Eight emerging panels.');
      s.works.forEach((n, i) => {
        if (n.opacity > 0.8) {
          const c = workContent(index, i);
          parts.push(
            [c.title[lang], c.detail[lang], c.metric[lang], c.agent].filter(Boolean).join(' · '),
          );
        }
      });
      if (s.tools.some((n) => n.opacity > 0.3))
        parts.push(
          tools
            .map((name, i) =>
              s.tools[i].opacity > 0.3
                ? lang === 'en' && i === 5
                  ? 'Decisions'
                  : lang === 'en' && i === 8
                    ? 'Artifacts'
                    : name
                : '',
            )
            .filter(Boolean)
            .join(', ') + '.',
        );
      if (s.toolGrouping)
        parts.push(
          lang === 'pt'
            ? 'Ferramentas agrupadas sob as etapas correspondentes, com dois troncos de conexão compartilhados.'
            : 'Tools grouped beneath their corresponding stages, with two shared connection spines.',
        );
      if (s.contexts.some((n) => n.opacity > 0.8))
        parts.push(
          lang === 'pt'
            ? 'Contexto: docs de referência e integrações.'
            : 'Context: reference docs and integrations.',
        );
      if (s.layout === 'human-gate') parts.push(checks.map((c) => c[lang]).join('; ') + '.');
      if (s.layout === 'execution')
        parts.push(
          lang === 'pt'
            ? 'Exemplo: progresso 3/6; Claude/Sonnet 4 com 1 tarefa, Codex/o4-mini com 2 tarefas.'
            : 'Example: progress 3/6; Claude/Sonnet 4 with 1 task, Codex/o4-mini with 2 tasks.',
        );
      if (s.layout === 'decision')
        parts.push(
          lang === 'pt'
            ? 'Exemplo de Code Review: testes passando, diff revisado, Evidence completa, alinhado à Specification e pronto para merge. Duas alternativas humanas: aceitar e seguir ou solicitar retrabalho.'
            : 'Illustrative Code Review: tests passing, diff reviewed, complete Evidence, aligned with Specification and ready for merge. Two human alternatives: accept and continue or request rework.',
        );
      if (s.chips)
        parts.push(
          lang === 'pt'
            ? 'Cinco ícones: código, arquitetura, artefatos, documentação e contexto.'
            : 'Five icons: code, architecture, artifacts, documentation and context.',
        );
      if (s.continuity)
        parts.push(
          lang === 'pt'
            ? 'A ideia se conecta ao card de próximas possibilidades, em três camadas.'
            : 'The idea connects to the next-possibilities card, in three layers.',
        );
      if (index === 0) parts.push(frames[0].title[lang].replaceAll('\n', ' '));
      if (s.index >= sceneStarts[3])
        parts.push(
          lang === 'pt'
            ? 'Exemplo conceitual. Agentes, modelos, métricas e resultados são ilustrativos.'
            : 'Conceptual example. Agents, models, metrics and results are illustrative.',
        );
      return parts.join(' ');
    }),
  );
}
export function relationLines(s) {
  return frameConnections(s, 360, 520);
}
export function renderFigure(index, live = false) {
  const s = frameState(index, true),
    id = live ? 'live' : `static-${index}`,
    lines = relationLines(s);
  const works = s.works
    .map((n, i) => {
      const c = workContent(index, i);
      return `<div class="story-work entity" data-kind="${c.kind}" ${attr(live, 'work', i)} style="${position(n)}">${icon(c.icon)}<div class="work-body">${t(c.title, 'strong', 'class="work-title"')}${t(c.detail, 'small', 'class="work-detail"')}<span class="work-agent" ${c.agent ? '' : 'hidden'}>${agentMark(c.agent)}<span>${esc(c.agent)}</span></span></div>${t(c.metric, 'span', 'class="work-metric"')}${i === 4 ? humanChecks() : ''}<i class="card-bloom"></i></div>`;
    })
    .join('');
  return `<div class="story-world ${live ? 'live-world' : 'scene-static'}" aria-hidden="true" data-layout="${s.layout}" style="--tool-grouping:${s.toolGrouping}">
  <svg class="story-wave" viewBox="0 0 100 100" preserveAspectRatio="none" style="opacity:${s.layout === 'opening' ? 0 : 0.6 * (1 - s.toolGrouping * 0.7)}">${Array.from({ length: 9 }, (_, i) => `<g style="--wave-delay:${-i * 1.7}s"><path d="M -35 ${18 + i * 3} C 5 ${-25 + i * 6}, 28 ${95 - i * 4}, 50 50 C 72 ${5 + i * 4}, 95 ${125 - i * 6}, 135 ${82 - i * 3}" /></g>`).join('')}</svg>
  <svg class="flow-ports" viewBox="0 0 100 100" preserveAspectRatio="none" style="opacity:${s.flowPorts}">${s.works
    .slice(0, 5)
    .map(
      (n) =>
        `<path class="flow-fork" d="M ${flowSpineX(s, 360)} ${n.y} H ${flowSpineX(s, 360) + 7} H ${n.x}" marker-mid="url(#story-flow-arrow)" /><ellipse class="flow-port" cx="${flowSpineX(s, 360)}" cy="${n.y}" rx="1" ry="0.8" />`,
    )
    .join('')}</svg>
<div class="story-ground" style="opacity:${s.ground}"><i></i><i></i><i></i></div>
  <div class="story-supernova" style="opacity:0"><i></i><i></i></div>
  <div class="execution-shell" style="opacity:${s.execution}">${t(text('Execução em andamento', 'Execution in progress'), 'strong', 'class="execution-title"')}<span>3 / 6</span><div class="execution-progress"></div><div class="runtime-activity"><p>${agentMark('Claude')}Claude <small>Sonnet 4</small> <span>● ${t(text('Ativo · 1 tarefa', 'Active · 1 task'))}</span></p><p>${agentMark('Codex')}Codex <small>o4-mini</small> <span>● ${t(text('Ativo · 2 tarefas', 'Active · 2 tasks'))}</span></p></div></div>
  <svg class="story-links" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">${lines.map((l, i) => `<path ${attr(live, 'path', i)} d="${l.d}" style="opacity:${l.opacity}" />`).join('')}${live ? Array.from({ length: 6 }, () => '<path class="signal-trail" /><ellipse class="connection-signal" />').join('') : ''}<path class="dependency-shortcut" d="${dependencySideConnections(s, 360, 520)[2]}" style="opacity:${s.layout === 'dependencies' ? 0.65 : 0}" marker-end="url(#story-flow-arrow)" />${s.contexts.map((n, i) => `<path class="context-link" marker-end="url(#story-flow-arrow)" d="${dependencySideConnections(s, 360, 520)[i]}" style="opacity:${n.opacity}" />`).join('')}</svg>
  ${s.ghosts.map((n, i) => `<span class="story-ghost entity" ${attr(live, 'ghost', i)} style="${position(n)}"><i class="ghost-light"></i></span>`).join('')}
  ${s.tools.map((n, i) => `<div class="story-tool entity" ${attr(live, 'tool', i)} style="${position(n)}">${i === 1 || i === 2 ? agentMark(i === 1 ? 'Claude' : 'Codex') : `<b>${['N', '', '', '◉', '▤', '◇', '>_', '☷', '◇'][i]}</b>`}${t(i === 5 ? text('Decisões', 'Decisions') : i === 8 ? text('Artefatos', 'Artifacts') : text(tools[i], tools[i]))}</div>`).join('')}
  ${s.contexts.map((n, i) => `<div class="story-context entity" ${attr(live, 'context', i)} style="${position(n)}">${icon(i ? 'database' : 'spec')}${t(i ? text('Integrações', 'Integrations') : text('Docs de referência', 'Reference docs'))}</div>`).join('')}
  <div class="idea-core entity" ${attr(live, 'idea')} style="${position(s.idea)};--idea-card:${s.ideaCard}" data-card="${s.ideaCard}"><div class="orb-surface">${orbArt(id)}</div><div class="orb-ring" style="opacity:${s.orbRing}"></div>${t(text('Ideia', 'Idea'), 'span', 'class="idea-label"')}</div>
  <div class="axiom-core entity" ${attr(live, 'axiom')} style="${position(s.hub)};border-radius:${s.hubRound ? 50 : 14}%">${mascot(id)}</div>
  ${works}
  <div class="story-decision" ${attr(live, 'decision')} style="opacity:${s.decision}"><header>${icon('person')}<span>Code Review<br />${t(text('Exemplo de revisão', 'Illustrative review'), 'small')}</span>${t(text('Aprovado · exemplo', 'Approved · example'), 'b')}</header><ul>${[text('Testes passando', 'Tests passing'), text('Diff revisado', 'Diff reviewed'), text('Evidence completa', 'Complete Evidence'), text('Alinhado à Specification', 'Aligned with Specification'), text('Pronto para merge', 'Ready for merge')].map((v) => `<li><span>✓</span>${t(v)}</li>`).join('')}</ul><div class="decision-choices">${t(text('✓ Aceitar e seguir', '✓ Accept and continue'), 'span')}${t(text('↻ Solicitar retrabalho', '↻ Request rework'), 'span')}</div></div>
  <div class="delivery-chips" style="opacity:${s.chips}">${['code', 'tree', 'cube', 'spec', 'database'].map((k) => `<span>${icon(k)}</span>`).join('')}</div>
  <div class="story-continuity entity" style="left:72%;top:50%;opacity:${s.continuity}">${icon('arrow')}${t(text('Próximas\npossibilidades', 'Next\npossibilities'), 'strong')}</div>
  ${index === 0 && !live ? `<div class="figure-opening">${t(frames[0].title, 'strong')}${t(frames[0].lead, 'p')}</div>` : ''}
 </div>`;
}
export function renderStorytelling() {
  return `${defs}${chapterNavigation(`<nav class="story-navigation" aria-label="Cenas da história" data-en-aria="Story scenes">${sceneNames.map((n, i) => `<a href="#cena-${i + 1}"><span>0${i + 1}</span>${t(n)}</a>`).join('')}<span class="story-counter">01 — 05 · 01 / 04</span></nav>`)}
 <div class="story-stage"><div class="story-wash"></div>${renderFigure(0, true)}${orchestrationOverlays()}${frames.map((f, i) => `<div class="story-copy" aria-hidden="true" data-story-copy="${i}" ${i === 0 ? 'data-opening="true"' : ''}>${t(f.title, i === 0 ? 'h1' : 'h2')}${t(f.lead, 'p', 'class="story-lead"')}</div>`).join('')}<p class="story-disclaimer" aria-hidden="true" data-en="Conceptual illustration · sample agents, models and results">Ilustração conceitual · agentes, modelos e resultados ilustrativos</p><p class="story-scroll" aria-hidden="true" data-en="SCROLL TO CONTINUE ↓">ROLE PARA CONTINUAR ↓</p></div>
 ${t(text('Da ideia à entrega verificável', 'From idea to verifiable delivery'), 'h1', 'class="story-transcript-title"')}<div class="story-scenes">${sceneNames
   .map(
     (name, scene) =>
       `<article data-story-scene="${scene + 1}" id="cena-${scene + 1}" style="--scene-start:${offsets[sceneStarts[scene]]}">${scene === 2 ? '<span id="proposta" class="scene-anchor"></span>' : scene === 3 ? '<span id="fluxo" class="scene-anchor"></span>' : ''}${t(name, 'h2', 'class="scene-heading"')}${frames
         .filter((f) => f.scene === scene + 1)
         .map((f) => {
           const i = frames.indexOf(f);
           return `<section class="story-beat" id="quadro-${f.scene}-${f.beat}" style="--beat-index:${offsets[i] - offsets[sceneStarts[scene]]}"><p class="beat-number">0${f.scene} / 0${f.beat}</p>${t(f.title, 'h3')}${t(f.lead, 'p', 'class="static-lead"')}${renderStaticBeat(i)}</section>`;
         })
         .join('')}</article>`,
   )
   .join('')}</div>`;
}

function renderStaticBeat(i) {
  if (i === 9 || i === 10)
    return orchestrationStatic(i === 9 ? 'architecture' : 'workflow').replace(
      '<figcaption',
      '<figcaption class="static-transcript"',
    );
  if (i === 17)
    return `<figure class="continuity-static"><div class="continuity-pair"><div class="continuity-idea"><div class="continuity-static-orb"></div><strong data-en="Idea">Ideia</strong></div><span class="continuity-static-link" aria-hidden="true"></span><div class="continuity-next"><svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M3 12h18M13 4l8 8-8 8"/></svg><strong data-en="Next possibilities">Próximas\npossibilidades</strong></div></div><figcaption data-en="Idea and next possibilities: two equal cards, connected by a direct path.">Ideia e próximas possibilidades: dois cards do mesmo tamanho, conectados por um caminho direto.</figcaption></figure>`.replace(
      '<figcaption',
      '<figcaption class="static-transcript"',
    );
  const f = frames[i];
  return `<figure aria-label="${esc(f.title.pt.replaceAll('\n', ' '))}" data-en-aria="${esc(f.title.en.replaceAll('\n', ' '))}">${renderFigure(i)}${t(transcript(i), 'figcaption', 'class="static-transcript"')}</figure>`;
}

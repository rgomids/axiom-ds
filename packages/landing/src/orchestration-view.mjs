import {
  architecture,
  architectureEdges,
  architectureSteps,
  workflowSteps,
  phases,
  intakeColumns,
  preparation,
  agents,
  validation,
  review,
  exceptions,
  completion,
  headings,
  descriptions,
  pair,
} from './orchestration-data.mjs';
const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
const text = (value, tag = 'span', attrs = '') =>
  `<${tag} data-en="${escape(value.en)}" ${attrs}>${escape(value.pt)}</${tag}>`;
const paths = {
  context: 'M4 6h16v14H4z M8 3v6 M16 3v6 M8 13h8 M8 17h5',
  stages: 'M4 4h6v5H4z M14 15h6v5h-6z M7 9v8h7 M14 4h6v5h-6z',
  tree: 'M9 3h6v5H9z M12 8v5 M5 13h14 M5 13v6 M19 13v6 M2 19h6 M16 19h6',
  shield: 'M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6z M8 12l3 3 5-6',
  runtime: 'M8 4L2 12l6 8 M16 4l6 8-6 8 M14 3l-4 18',
  evidence: 'M5 3h14v18H5z M8 7h8 M8 11h6 M8 15l2 2 5-5',
  code: 'M8 6l-6 6 6 6 M16 6l6 6-6 6 M14 3l-4 18',
  store: 'M4 6c0-5 16-5 16 0s-16 5-16 0 M4 6v12c0 5 16 5 16 0V6 M4 12c0 5 16 5 16 0',
  human: 'M16 7a4 4 0 1 1-8 0 4 4 0 1 1 8 0 M4 22v-4c0-6 16-6 16 0v4z',
  spec: 'M5 2h14v20H5z M8 7h8 M8 11h8 M8 15h5',
  check: 'M4 4h16v16H4z M7 11l4 4L21 3',
};
function icon(name) {
  if (name === 'mascot')
    return '<svg class="orch-icon orch-mascot" viewBox="320 240 620 480" aria-hidden="true"><image href="assets/axiom-logo.png" width="1254" height="1254"/></svg>';
  if (name === 'ai')
    return '<span class="orch-ai-marks" aria-hidden="true"><img src="assets/openai-mark.svg" alt=""/><img class="claude-mark" src="assets/claude-mark.svg" alt=""/></span>';
  return `<svg class="orch-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.context}"/></svg>`;
}
function archNode(node) {
  return `<div class="orch-node ${node.kind || ''}" data-arch-node="${node.id}" data-reveal="${node.group}" style="--node-x:${node.x}%;--node-y:${node.y}%">${icon(node.icon)}<div>${text(node.title, 'strong')}${text(node.note, 'small')}</div></div>`;
}
function archDesktop() {
  return `<div class="orch-c4-desktop" aria-hidden="true"><div class="orch-lingo-boundary">${text(pair('LINGO · CONTROL PLANE LOCAL', 'LINGO · LOCAL CONTROL PLANE'), 'span', 'class="orch-boundary-label"')}</div>
  <svg class="orch-c4-links" viewBox="0 0 100 100" preserveAspectRatio="none"><defs><marker id="orch-c4-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M1 1L7 4 1 7" fill="none" stroke="currentColor"/></marker></defs>${architectureEdges.map((e) => `<path data-arch-edge="${e.from}:${e.to}" data-reveal="${e.group}" class="${e.secondary ? 'orch-secondary-route' : ''}" d="${e.d}" pathLength="100" marker-end="url(#orch-c4-arrow)"/>`).join('')}</svg>
  ${architecture.map((n) => archNode(n)).join('')}</div>`;
}
const mobileGroups = [
  ['human', 'project', 'lifecycle', 'github'],
  ['planner', 'authority'],
  ['orchestrator', 'authority'],
  ['runtime', 'runtimes', 'repositories'],
  ['evidence', 'store', 'human', 'github'],
];
const archNotes = [
  pair(
    'Um Project relaciona repositories independentes.',
    'A Project relates independent repositories.',
  ),
  pair(
    'O plano organiza o trabalho. A autoridade define os limites.',
    'The plan organizes work. Authority sets its limits.',
  ),
  pair(
    'Somente Executions autorizadas são coordenadas.',
    'Only authorized Executions are coordinated.',
  ),
  pair(
    'Runtime, Model Profile e Agent têm papéis distintos.',
    'Runtime, Model Profile and Agent have distinct roles.',
  ),
  pair(
    'Resultados verificáveis, estado reconciliado e aceite humano.',
    'Verifiable results, reconciled state and human acceptance.',
  ),
];
function archMobile() {
  return `<div class="orch-c4-mobile">${mobileGroups
    .map(
      (ids, index) =>
        `<div class="orch-mobile-panel" data-arch-focus="${index}">${text(architectureSteps[index], 'h3')}<div class="orch-mobile-boundary">${text(pair('LINGO · COMPONENTES INTERNOS', 'LINGO · INTERNAL COMPONENTS'), 'span', 'class="orch-mini-label"')}${ids
          .filter(
            (id) =>
              !architecture.find((n) => n.id === id).kind ||
              architecture.find((n) => n.id === id).kind === 'primary',
          )
          .map((id) =>
            archNode(
              architecture.find((n) => n.id === id),
              true,
            ),
          )
          .join('')}</div><div class="orch-mobile-externals">${ids
          .filter((id) =>
            ['external', 'persistence'].includes(architecture.find((n) => n.id === id).kind),
          )
          .map((id) =>
            archNode(
              architecture.find((n) => n.id === id),
              true,
            ),
          )
          .join('')}</div>${text(archNotes[index], 'p', 'class="orch-context-note"')}</div>`,
    )
    .join('')}</div>`;
}
function list(items, klass = '') {
  return `<ol class="orch-step-list ${klass}">${items.map((v) => text(v, 'li')).join('')}</ol>`;
}
function intake() {
  return `<div class="orch-columns orch-intake">${intakeColumns.map((col, index) => `<section class="orch-process-column" data-intake-column="${index}"><h3>${icon(col.icon)}${col.phase}</h3>${col.gate ? text(col.gate, 'div', 'class="orch-gate"') : ''}${list(col.steps)}${col.warning ? text(col.warning, 'p', 'class="orch-branch"') : ''}</section>`).join('')}</div>`;
}
function prepare() {
  return `<div class="orch-preparation"><div class="orch-prep-route">${preparation.map((s, i) => `<div class="orch-prep-step ${i === 0 ? 'orch-gate' : ''}" data-prep="${i}">${icon(i === 0 ? 'shield' : i === 1 ? 'tree' : i === 2 ? 'runtime' : 'context')}${text(s, 'strong')}</div>`).join('')}</div><div class="orch-prep-result">${icon('tree')}${text(pair('Execution Graph'), 'strong')}${text(pair('Uma topologia determinística, delimitada e autorizada.', 'A deterministic, bounded and authorized topology.'), 'small')}</div>${text(pair('O DAG é definido para a etapa. Sem criação recursiva de agentes.', 'The DAG is defined for the stage. No recursive agents.'), 'p', 'class="orch-context-note"')}</div>`;
}
function parallel() {
  return `<div class="orch-parallel"><svg class="orch-agent-links" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true"><path class="orch-parallel-dispatch" d="M50 10 V20 H18 V29 M50 20 V29 M50 20 H82 V29"/><path class="orch-test-dependencies" d="M18 44 V56 H34 V63 M50 44 V56 H34"/><path class="orch-merge-dependencies" d="M34 77 V90 H67 M82 44 V90 H67"/></svg>
  <div class="orch-dispatch">${icon('tree')}${text(pair('Execution Orchestrator · DAG autorizado', 'Execution Orchestrator · authorized DAG'))}</div>
  ${agents.map((a) => `<div class="orch-agent" data-agent="${a.id}" style="--node-x:${a.x}%;--node-y:${a.y}%">${a.id === 'tests' ? text(pair('↓ Backend + Integrações', '↓ Backend + Integrations'), 'span', 'class="orch-test-caption"') : ''}<span class="orch-agent-role">${icon(a.id === 'tests' ? 'check' : 'code')}${text(a.title, 'strong')}</span>${text(a.note, 'small')}<span class="orch-runtime-label"><img class="${a.mark === 'claude' ? 'claude-mark' : ''}" src="assets/${a.mark}-mark.svg" alt=""/>${a.runtime}</span></div>`).join('')}
  <div class="orch-agent-output">${icon('evidence')}${text(pair('Integrar resultados e artifacts', 'Integrate results and artifacts'))}</div>
  ${text(pair('Backend + Integrações → Testes. Documentação converge diretamente para os artifacts.', 'Backend + Integrations → Tests. Documentation converges directly into artifacts.'), 'p', 'class="orch-parallel-note"')}</div>`;
}
function verify() {
  return `<div class="orch-columns orch-verify"><section class="orch-process-column"><h3>${icon('check')}${text(pair('Validação', 'Validation'))}</h3>${list(validation)}${text(pair('Sim → autorização de review', 'Yes → review authorization'), 'p', 'class="orch-branch orch-positive"')}${text(pair('Não → falha e reconciliação', 'No → failure and reconciliation'), 'p', 'class="orch-branch"')}</section><section class="orch-process-column"><h3>${icon('human')}05 · Review</h3>${list(review)}${text(pair('Sem findings bloqueantes → Completion', 'No blocking findings → Completion'), 'p', 'class="orch-branch orch-positive"')}${text(pair('Findings bloqueantes → retrabalho', 'Blocking findings → rework'), 'p', 'class="orch-branch"')}</section><section class="orch-process-column orch-exceptions"><h3>${icon('shield')}${text(pair('Desvios delimitados', 'Bounded exceptions'))}</h3>${list(exceptions)}${text(pair('Nenhum retry sem nova autoridade.', 'No retry without new authority.'), 'p', 'class="orch-context-note"')}</section></div>`;
}
function delivery() {
  return `<div class="orch-completion"><div class="orch-delivery-packet">${icon('evidence')}${text(completion[0], 'strong')}<div class="orch-packet-tags"><span>Pull Request</span><span>Artifacts</span><span>Evidence</span></div></div>${text(completion[1], 'div', 'class="orch-delivery-trace"')}${text(completion[2], 'div', 'class="orch-gate orch-acceptance"')}<div class="orch-outcomes">${text(completion[3], 'div', 'class="orch-outcome orch-positive"')}${text(completion[4], 'div', 'class="orch-outcome"')}</div>${text(pair('Aceite do pacote exato. Publicação, merge e deploy exigem autoridade própria.', 'Acceptance of the exact packet. Publication, merge and deployment require their own authority.'), 'p', 'class="orch-context-note"')}</div>`;
}
const workflowViews = [intake, prepare, parallel, verify, delivery];
function controls(type, steps) {
  return `<nav class="orch-step-nav" aria-label="${type === 'architecture' ? 'Etapas da arquitetura' : 'Momentos do workflow'}" data-en-aria="${type === 'architecture' ? 'Architecture steps' : 'Workflow moments'}">${steps.map((label, i) => `<button type="button" data-orch-go="${type}:${i}" aria-label="${escape(label.pt)}" data-en-aria="${escape(label.en)}"><span>${String(i + 1).padStart(2, '0')}</span>${text(label)}</button>`).join('')}</nav>`;
}
export function orchestrationOverlays() {
  return ['architecture', 'workflow']
    .map(
      (
        type,
      ) => `<section class="orchestration-overlay" data-orchestration="${type}" aria-hidden="true" inert>
    <div class="orch-topline"><span class="orch-kicker">${type === 'architecture' ? '01 / C4 COMPONENT DIAGRAM' : '02 / EXECUTION GRAPH'}</span>${text(pair('ARQUITETURA-ALVO · MVP EM ENTREGA', 'TARGET ARCHITECTURE · MVP IN DELIVERY'), 'span', 'class="orch-target-label"')}</div>
    ${controls(type, type === 'architecture' ? architectureSteps : workflowSteps)}
    ${type === 'workflow' ? `<div class="orch-phase-rail" aria-label="Fases do workflow">${phases.map((s, i) => `<span data-workflow-phase="${i}"><b>${String(i + 1).padStart(2, '0')}</b>${s}</span>`).join('')}</div>` : ''}
    <div class="orch-diagram">${type === 'architecture' ? archDesktop() + archMobile() : workflowViews.map((view, i) => `<div class="orch-workflow-panel" data-workflow-moment="${i}">${view()}</div>`).join('')}</div>
    <div class="orch-scene-copy">${text(headings[type], 'h2')}${text(descriptions[type], 'p')}</div>
    ${text(pair('Representação conceitual · agentes e resultados ilustrativos', 'Conceptual illustration · agents and results are illustrative'), 'p', 'class="orch-disclosure"')}
  </section>`,
    )
    .join('');
}
export function orchestrationStatic(type) {
  if (type === 'architecture')
    return `<figure class="orchestration-static"><div class="orch-static-label">LINGO · CONTROL PLANE LOCAL</div><div class="orch-static-components">${architecture
      .filter((n) => !['external', 'persistence'].includes(n.kind))
      .map((n) => `<section>${icon(n.icon)}${text(n.title, 'h4')}${text(n.note, 'p')}</section>`)
      .join(
        '',
      )}</div>${text(pair('Sistemas externos e persistência', 'External systems and persistence'), 'h4')}${list(architecture.filter((n) => ['external', 'persistence'].includes(n.kind)).map((n) => pair(n.title.pt + ' — ' + n.note.pt, n.title.en + ' — ' + n.note.en)))}<figcaption>${text(pair('Arquitetura-alvo do MVP. O Lingo é o control plane local do Axiom.', 'MVP target architecture. Lingo is Axiom’s local control plane.'))}<details><summary>${text(pair('Relações entre componentes', 'Component relationships'))}</summary>${list(architectureEdges.map((e) => pair(architecture.find((n) => n.id === e.from).title.pt + ' → ' + architecture.find((n) => n.id === e.to).title.pt + (e.relation ? ' — ' + e.relation.pt : ''), architecture.find((n) => n.id === e.from).title.en + ' → ' + architecture.find((n) => n.id === e.to).title.en + (e.relation ? ' — ' + e.relation.en : ''))))}</details></figcaption></figure>`;
  return `<figure class="orchestration-static"><div class="orch-static-label">WORKFLOW · EXECUTION GRAPH · EXEMPLO</div>${intakeColumns.map((col) => `<section><h4>${col.phase}</h4>${col.gate ? text(col.gate, 'p') : ''}${list(col.steps)}${col.warning ? text(col.warning, 'p') : ''}</section>`).join('')}<section><h4>04 · Implementation</h4>${list(preparation)}${list(agents.map((a) => pair(a.title.pt + ' — ' + a.note.pt, a.title.en + ' — ' + a.note.en)))}${text(pair('Backend e Integrações precedem Testes. Documentação é independente.', 'Backend and Integrations precede Tests. Documentation is independent.'), 'p')}${list(validation)}${list(exceptions.slice(0, 2))}</section><section><h4>05 · Review</h4>${list(review)}${text(exceptions[2], 'p')}</section><section><h4>06 · Completion</h4>${list(completion)}</section><figcaption>${text(pair('Workflow ilustrativo da arquitetura-alvo. Falhas e rejeições não disparam retries, merge ou deploy automáticos.', 'Illustrative target workflow. Failures and rejections do not trigger automatic retries, merges or deployments.'))}</figcaption></figure>`;
}

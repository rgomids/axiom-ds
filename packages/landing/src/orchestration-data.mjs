export const pair = (pt, en = pt) => ({ pt, en });
export const architectureSteps = [
  pair('Contexto e definição', 'Context and definition'),
  pair('Planejamento e autoridade', 'Planning and authority'),
  pair('Coordenação da execução', 'Execution coordination'),
  pair('Runtimes e integrações', 'Runtimes and integrations'),
  pair('Evidence e reconciliação', 'Evidence and reconciliation'),
];
export const workflowSteps = [
  pair('Da intenção ao plano', 'From intent to plan'),
  pair('Preparar a execução', 'Prepare execution'),
  pair('Agentes em paralelo', 'Parallel agents'),
  pair('Validar e revisar', 'Validate and review'),
  pair('Entregar com aceite', 'Deliver with acceptance'),
];
export const architecture = [
  {
    id: 'human',
    title: pair('Desenvolvedor', 'Developer'),
    note: pair('Intenção e aceite', 'Intent and acceptance'),
    icon: 'human',
    x: 7,
    y: 19,
    group: 0,
    kind: 'external',
  },
  {
    id: 'project',
    title: pair('Project Context'),
    note: pair('Contexto · repositories · revisão', 'Context · repositories · revision'),
    icon: 'context',
    x: 27,
    y: 23,
    group: 0,
  },
  {
    id: 'lifecycle',
    title: pair('Workflow Lifecycle'),
    note: pair('Etapas · checkpoints · gates', 'Stages · checkpoints · gates'),
    icon: 'stages',
    x: 48,
    y: 23,
    group: 0,
  },
  {
    id: 'planner',
    title: pair('Execution Planner'),
    note: pair('Compila o DAG da etapa', 'Compiles the stage DAG'),
    icon: 'tree',
    x: 69,
    y: 23,
    group: 1,
  },
  {
    id: 'authority',
    title: pair('Authority & Policies'),
    note: pair('Permissões e limites humanos', 'Human permissions and limits'),
    icon: 'shield',
    x: 27,
    y: 58,
    group: 1,
  },
  {
    id: 'orchestrator',
    title: pair('Execution Orchestrator'),
    note: pair('Coordena Executions autorizadas', 'Coordinates authorized Executions'),
    icon: 'mascot',
    x: 48,
    y: 58,
    group: 2,
    kind: 'primary',
  },
  {
    id: 'runtime',
    title: pair('Runtime Adapters'),
    note: pair('Resolve e invoca CLIs locais', 'Resolves and invokes local CLIs'),
    icon: 'runtime',
    x: 69,
    y: 58,
    group: 3,
  },
  {
    id: 'evidence',
    title: pair('Evidence & Reconciliation'),
    note: pair('Valida resultados e reconcilia estado', 'Validates results and reconciles state'),
    icon: 'evidence',
    x: 48,
    y: 87,
    group: 4,
  },
  {
    id: 'github',
    title: pair('GitHub'),
    note: pair('Work Items · PRs', 'Work Items · PRs'),
    icon: 'code',
    x: 92,
    y: 19,
    group: 0,
    kind: 'external',
  },
  {
    id: 'runtimes',
    title: pair('Codex CLI / Claude CLI'),
    note: pair('Runtimes de agentes', 'Agent runtimes'),
    icon: 'ai',
    x: 92,
    y: 57,
    group: 3,
    kind: 'external',
  },
  {
    id: 'repositories',
    title: pair('Repositories'),
    note: pair('Código autorizado e artifacts', 'Authorized code and artifacts'),
    icon: 'code',
    x: 92,
    y: 87,
    group: 3,
    kind: 'external',
  },
  {
    id: 'store',
    title: pair('Estado local', 'Local state'),
    note: pair('Filesystem · artifacts · Evidence', 'Filesystem · artifacts · Evidence'),
    icon: 'store',
    x: 7,
    y: 87,
    group: 4,
    kind: 'persistence',
  },
];
// Orthogonal, deterministic routes. Secondary perimeter routes keep the core readable.
export const architectureEdges = [
  { from: 'human', to: 'project', d: 'M 13 19 H 17 V 23 H 18.5', group: 0 },
  { from: 'project', to: 'lifecycle', d: 'M 35.5 23 H 39.5', group: 0 },
  {
    from: 'project',
    to: 'github',
    d: 'M 27 15 V 1 H 92 V 11',
    group: 0,
    secondary: true,
    relation: pair(
      'Consulta Work Items pela integração configurada',
      'Queries Work Items through the configured integration',
    ),
  },
  { from: 'lifecycle', to: 'planner', d: 'M 56.5 23 H 60.5', group: 1 },
  { from: 'human', to: 'authority', d: 'M 7 27 V 58 H 18.5', group: 1, secondary: true },
  { from: 'planner', to: 'orchestrator', d: 'M 69 31 V 39 H 48 V 49', group: 2 },
  { from: 'orchestrator', to: 'authority', d: 'M 39 58 H 35.5', group: 2 },
  { from: 'orchestrator', to: 'runtime', d: 'M 57 58 H 60.5', group: 3 },
  { from: 'runtime', to: 'runtimes', d: 'M 77.5 58 H 82 V 57 H 85', group: 3 },
  { from: 'runtime', to: 'repositories', d: 'M 77.5 58 H 81 V 87 H 85', group: 3, secondary: true },
  { from: 'orchestrator', to: 'evidence', d: 'M 48 67 V 79', group: 4 },
  { from: 'evidence', to: 'store', d: 'M 39.5 87 H 13', group: 4 },
  {
    from: 'evidence',
    to: 'github',
    d: 'M 56.5 87 H 79 V 98 H 99 V 19 H 98',
    group: 4,
    secondary: true,
    relation: pair(
      'Publica artifacts somente com autoridade',
      'Publishes artifacts only with authority',
    ),
  },
  { from: 'evidence', to: 'human', d: 'M 39.5 87 H 16 V 7 H 7 V 11', group: 4, secondary: true },
];
export const phases = [
  'Intake',
  'Specification',
  'Planning',
  'Implementation',
  'Review',
  'Completion',
];
export const intakeColumns = [
  {
    phase: '01 · Intake',
    icon: 'context',
    steps: [
      pair('Work Item'),
      pair('Resolver Project e Repositories', 'Resolve Project and Repositories'),
      pair('Carregar contexto, políticas e integrações', 'Load context, policies and integrations'),
      pair('Fixar Workflow Revision e digest', 'Pin Workflow Revision and digest'),
    ],
  },
  {
    phase: '02 · Specification',
    icon: 'spec',
    steps: [
      pair('Analisar intenção e requisitos', 'Analyze intent and requirements'),
      pair(
        'Definir Specification e critérios de aceite',
        'Define Specification and acceptance criteria',
      ),
      pair('Clarifications, riscos e decisões', 'Clarifications, risks and decisions'),
      pair('Validar Specification e checkpoint', 'Validate Specification and checkpoint'),
    ],
  },
  {
    phase: '03 · Planning',
    icon: 'tree',
    gate: pair('Autoridade para planejar?', 'Authority to plan?'),
    steps: [
      pair('Arquitetura e contratos', 'Architecture and contracts'),
      pair('Plano de implementação e validação', 'Implementation and validation plan'),
      pair('Decomposição em Tasks', 'Decompose into Tasks'),
      pair('Validar dependências e checkpoint', 'Validate dependencies and checkpoint'),
    ],
    warning: pair('Pendente → aguardar aprovação humana', 'Pending → await human approval'),
  },
];
export const preparation = [
  pair('Autoridade para implementar?', 'Authority to implement?'),
  pair('Compilar DAG da etapa', 'Compile the stage DAG'),
  pair('Resolver Runtime, Model Profile e effort', 'Resolve Runtime, Model Profile and effort'),
  pair(
    'Preparar contexto mínimo, limites e Executions',
    'Prepare minimal context, limits and Executions',
  ),
];
export const agents = [
  {
    id: 'backend',
    title: pair('Backend Engineer'),
    note: pair('Implementação Go', 'Go implementation'),
    runtime: 'Codex CLI',
    mark: 'openai',
    x: 18,
    y: 36,
  },
  {
    id: 'integration',
    title: pair('Integration Engineer'),
    note: pair('Providers e Adapters', 'Providers and Adapters'),
    runtime: 'Codex CLI',
    mark: 'openai',
    x: 50,
    y: 36,
  },
  {
    id: 'documentation',
    title: pair('Documentation Engineer'),
    note: pair('Contratos e guias', 'Contracts and guides'),
    runtime: 'Claude CLI',
    mark: 'claude',
    x: 82,
    y: 36,
  },
  {
    id: 'tests',
    title: pair('Test Engineer'),
    note: pair('Após Backend + Integrações', 'After Backend + Integrations'),
    runtime: 'Codex CLI',
    mark: 'openai',
    x: 34,
    y: 70,
  },
];
export const validation = [
  pair('Integrar resultados e artifacts', 'Integrate results and artifacts'),
  pair('Executar validadores e verificações', 'Run validators and checks'),
  pair('Critérios e Evidence válidos?', 'Valid criteria and Evidence?'),
];
export const review = [
  pair('Autoridade para iniciar review?', 'Authority to start review?'),
  pair('Revisão independente do diff', 'Independent diff review'),
  pair('Análise de segurança e qualidade', 'Security and quality analysis'),
  pair('Consolidar findings e Evidence', 'Consolidate findings and Evidence'),
  pair('Findings bloqueantes?', 'Blocking findings?'),
];
export const exceptions = [
  pair(
    'Falha → bloquear dependentes e registrar falha',
    'Failure → block dependents and record failure',
  ),
  pair(
    'Reconciliar efeitos e solicitar nova autoridade',
    'Reconcile effects and request new authority',
  ),
  pair('Findings → correções e retrabalho delimitado', 'Findings → corrections and bounded rework'),
];
export const completion = [
  pair(
    'Preparar entrega: PR + Artifacts + Evidence',
    'Prepare delivery: PR + Artifacts + Evidence',
  ),
  pair('Validar Evidence e rastreabilidade', 'Validate Evidence and traceability'),
  pair('Aceite humano?', 'Human acceptance?'),
  pair(
    'Aceito → reconciliar estado e concluir Work Item',
    'Accepted → reconcile state and complete Work Item',
  ),
  pair(
    'Rejeitado → registrar rejeição e necessidade de retrabalho',
    'Rejected → record rejection and required rework',
  ),
];
export const headings = {
  architecture: pair(
    'Um processo configurável. Uma execução coordenada.',
    'A configurable process. A coordinated execution.',
  ),
  workflow: pair(
    'Cada etapa conectada. Cada decisão rastreável.',
    'Every stage connected. Every decision traceable.',
  ),
};
export const descriptions = {
  architecture: pair(
    'Defina como o trabalho acontece. O Axiom organiza etapas, agentes, dependências e decisões em um fluxo estruturado, mantendo contexto e controle ao longo da execução.',
    'Define how work happens. Axiom organizes stages, agents, dependencies and decisions in a structured flow, preserving context and control throughout execution.',
  ),
  workflow: pair(
    'Da especificação à entrega, o Axiom coordena agentes, dependências e validações em workflows estruturados, preservando o contexto e as evidências de cada execução.',
    'From specification to delivery, Axiom coordinates agents, dependencies and validations in structured workflows, preserving context and evidence for each execution.',
  ),
};

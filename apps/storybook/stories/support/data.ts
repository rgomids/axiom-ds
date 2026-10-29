// Local, fictitious data for stories and examples. Not product data.
export type Execution = {
  id: string;
  project: string;
  runtime: 'Codex' | 'Claude';
  status: 'running' | 'success' | 'danger' | 'warning' | 'pending';
  stage: number;
  stages: number;
  duration: number;
  startedAt: string;
  owner: string;
};

const projects = ['Orion', 'Lyra', 'Vega', 'Nova', 'Atlas', 'Draco'];
const statuses: Execution['status'][] = [
  'running',
  'success',
  'success',
  'danger',
  'warning',
  'pending',
  'success',
];
const owners = ['rgomids', 'alima', 'msouza', 'jpaula'];

export const executions: Execution[] = Array.from({ length: 37 }, (_, i) => {
  const status = statuses[i % statuses.length];
  return {
    id: 'EX-' + String(271 - i).padStart(5, '0'),
    project: projects[(i * 5) % projects.length],
    runtime: i % 3 === 0 ? 'Claude' : 'Codex',
    status,
    stage: status === 'success' ? 6 : (i % 6) + 1,
    stages: 6,
    duration: 40 + ((i * 97) % 600),
    startedAt: new Date(Date.UTC(2026, 9, 28, 14, 2) - i * 47 * 60000).toISOString(),
    owner: owners[i % owners.length],
  };
});

export const statusLabel: Record<Execution['status'], string> = {
  running: 'Running',
  success: 'Succeeded',
  danger: 'Failed',
  warning: 'Awaiting approval',
  pending: 'Queued',
};

export const formatDuration = (s: number) =>
  Math.floor(s / 60) + 'm ' + String(s % 60).padStart(2, '0') + 's';
export const formatTime = (iso: string) => iso.slice(0, 16).replace('T', ' ') + ' UTC';

export const timeline = [
  {
    id: 'intake',
    title: 'Intake',
    status: 'complete' as const,
    timestamp: '14:02:11',
    duration: '4s',
    description: 'Intenção registrada a partir do Work Item.',
  },
  {
    id: 'spec',
    title: 'Especificação',
    status: 'complete' as const,
    timestamp: '14:02:15',
    duration: '1m 12s',
    description: 'Critérios de aceite aprovados.',
  },
  {
    id: 'impl',
    title: 'Implementação',
    status: 'running' as const,
    timestamp: '14:03:27',
    description: 'Agente aplicando mudanças no branch.',
  },
  { id: 'tests', title: 'Testes', status: 'pending' as const },
  { id: 'review', title: 'Revisão humana', status: 'pending' as const },
  { id: 'delivery', title: 'Entrega', status: 'pending' as const },
];

export const logLines = [
  ['14:03:27.004', 'info', 'runtime', 'Starting implementation stage'],
  ['14:03:27.118', 'debug', 'workspace', 'Checked out branch feat/ex-00271'],
  ['14:03:29.410', 'info', 'agent', 'Planning 3 file changes'],
  ['14:03:31.902', 'warn', 'agent', 'Test fixture missing, generating placeholder'],
  ['14:03:34.551', 'info', 'agent', 'Edited src/handlers/export.ts (+42 −7)'],
  [
    '14:03:36.020',
    'error',
    'tests',
    'export.test.ts › rejects empty payload: expected 400, received 500',
  ],
  ['14:03:36.021', 'info', 'agent', 'Retrying with fix for empty payload validation'],
  ['14:03:39.700', 'info', 'tests', '24 passed, 0 failed'],
].map(([timestamp, level, source, message], i) => ({
  id: 'l' + i,
  timestamp,
  level: level as 'debug' | 'info' | 'warn' | 'error',
  source,
  message,
}));

export const evidence = [
  {
    id: 'e1',
    name: 'test-report.json',
    kind: 'test-report',
    size: '18.2 KB',
    status: 'verified' as const,
    digest: 'sha256:9f2c1e7ab04d55c3e1f8a9b2d7c6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8',
  },
  {
    id: 'e2',
    name: 'diff.patch',
    kind: 'patch',
    size: '4.1 KB',
    status: 'verified' as const,
    digest: 'sha256:1a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f809',
  },
  {
    id: 'e3',
    name: 'coverage.lcov',
    kind: 'coverage',
    size: '92.7 KB',
    status: 'pending' as const,
    digest: 'sha256:ffeeddccbbaa99887766554433221100ffeeddccbbaa99887766554433221100',
  },
  {
    id: 'e4',
    name: 'build.log',
    kind: 'log',
    size: '210 KB',
    status: 'failed' as const,
    digest: 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
  },
];

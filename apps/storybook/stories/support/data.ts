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

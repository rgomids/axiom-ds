import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Badge,
  ExecutionTimeline,
  StatusBadge,
  WorkflowStepper,
} from '../../../../packages/ui/src/react';
import { timeline } from '../support/data';
import { describe } from '../support/doc';

const steps = [
  { id: 'intake', title: 'Intake', status: 'complete' as const },
  { id: 'spec', title: 'Spec', status: 'complete' as const },
  { id: 'impl', title: 'Implement', status: 'current' as const },
  { id: 'test', title: 'Test', status: 'upcoming' as const },
  { id: 'review', title: 'Review', status: 'upcoming' as const },
  { id: 'deliver', title: 'Deliver', status: 'upcoming' as const },
];
const meta = {
  title: 'Patterns/Workflow/ExecutionTimeline',
  component: ExecutionTimeline,
  args: { events: timeline },
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'ExecutionTimeline lista eventos com estado, horário e duração (mono). WorkflowStepper resume etapas com contador "03 / 06 stages". Ambos são apresentação: o estado vem do chamador, sem regras de negócio.',
          a11y: 'Listas ordenadas; estado também em texto oculto; o ícone é decorativo.',
        }),
      },
    },
  },
} satisfies Meta<typeof ExecutionTimeline>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Timeline: Story = {
  render: (args) => (
    <div className="max-w-xl rounded-card border bg-card p-5">
      <ExecutionTimeline {...args} />
    </div>
  ),
};
export const WithDetails: Story = {
  args: {
    events: [
      {
        ...timeline[0],
        children: (
          <div className="flex gap-1.5">
            <Badge variant="secondary" size="sm" mono>
              work-item #42
            </Badge>
          </div>
        ),
      },
      { ...timeline[1], children: <StatusBadge status="success">approved by rgomids</StatusBadge> },
      { ...timeline[2], status: 'failed', description: 'Testes falharam: 1 de 24.' },
      { ...timeline[3], status: 'skipped' },
    ],
  },
  render: (args) => (
    <div className="max-w-xl rounded-card border bg-card p-5">
      <ExecutionTimeline {...args} />
    </div>
  ),
};
export const Stepper: Story = {
  render: () => (
    <div className="grid gap-4">
      <WorkflowStepper steps={steps} />
      <WorkflowStepper steps={steps} orientation="vertical" className="max-w-xs" />
    </div>
  ),
};

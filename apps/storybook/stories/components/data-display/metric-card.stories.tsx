import type { Meta, StoryObj } from '@storybook/react-vite';
import { Activity, Clock, GitBranch } from 'lucide-react';
import { MetricCard, Statistic } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Data Display/MetricCard',
  component: MetricCard,
  args: { label: 'Execuções hoje', value: '128' },
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'KPI com rótulo, valor (mono, tabular), tendência e rodapé. Statistic é o par rótulo/valor reutilizável (`<dl>`).',
          a11y: 'A tendência informa direção e valor em texto; a cor indica se é positiva.',
        }),
      },
    },
  },
} satisfies Meta<typeof MetricCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Grid: Story = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-3">
      <MetricCard
        label="Execuções hoje"
        value="128"
        icon={<Activity />}
        trend={{ value: '+12%', direction: 'up', positive: true, label: 'vs. ontem' }}
      />
      <MetricCard
        label="Duração média"
        value="4m 12s"
        icon={<Clock />}
        trend={{ value: '+38s', direction: 'up', positive: false }}
      />
      <MetricCard
        label="Branches ativas"
        value="7"
        icon={<GitBranch />}
        trend={{ value: '0', direction: 'flat' }}
        footer="3 aguardando revisão"
      />
    </div>
  ),
};
export const Statistics: Story = {
  render: () => (
    <div className="flex flex-wrap gap-10">
      <Statistic label="Taxa de sucesso" value="98.4" unit="%" />
      <Statistic label="Evidências" value="1 204" />
      <Statistic label="Custo" value="US$ 3,42" mono={false} />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBadge } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Data Display/StatusBadge',
  component: StatusBadge,
  args: { status: 'running', children: 'Running' },
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Indicador de estado operacional: ponto colorido + rótulo mono. `running` pulsa (desativado com movimento reduzido).',
          a11y: 'O texto carrega o significado; a cor é redundante.',
        }),
      },
    },
  },
} satisfies Meta<typeof StatusBadge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-5">
      <StatusBadge status="running">Running</StatusBadge>
      <StatusBadge status="success">Succeeded</StatusBadge>
      <StatusBadge status="warning">Waiting approval</StatusBadge>
      <StatusBadge status="danger">Failed</StatusBadge>
      <StatusBadge status="info">Queued</StatusBadge>
      <StatusBadge status="pending">Pending</StatusBadge>
      <StatusBadge status="neutral">Cancelled</StatusBadge>
    </div>
  ),
};

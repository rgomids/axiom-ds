import type { Meta, StoryObj } from '@storybook/react-vite';
import { Download } from 'lucide-react';
import {
  Button,
  EvidencePanel,
  ResourceDetails,
  StatusBadge,
} from '../../../../packages/ui/src/react';
import { evidence } from '../support/data';
import { describe } from '../support/doc';

const meta = {
  title: 'Patterns/Evidence/EvidencePanel',
  component: EvidencePanel,
  args: { items: evidence },
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'EvidencePanel lista artefatos com estado de verificação e digest copiável. ResourceDetails é o cartão chave/valor (`<dl>`) para resumos como "Current execution". O painel exibe estados fornecidos; não verifica nada.',
        }),
      },
    },
  },
} satisfies Meta<typeof EvidencePanel>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Panel: Story = {
  render: (args) => (
    <EvidencePanel
      {...args}
      className="max-w-2xl"
      actions={
        <Button size="sm" variant="outline">
          <Download aria-hidden />
          Exportar
        </Button>
      }
    />
  ),
};
export const Details: Story = {
  render: () => (
    <ResourceDetails
      className="max-w-md"
      title="Current execution"
      aside={<StatusBadge status="running">Running</StatusBadge>}
      fields={[
        { label: 'Execution', value: 'EX-00271', mono: true, copy: 'EX-00271' },
        { label: 'Runtime', value: 'Codex / Claude', mono: true },
        { label: 'Started', value: '2026-10-28 14:02 UTC', mono: true },
        { label: 'Owner', value: 'rgomids' },
      ]}
    />
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../../../packages/ui/src/react/badge';

const meta = {
  title: 'Components/Data Display/Badge',
  component: Badge,
  args: { children: 'Beta' },
  parameters: {
    docs: {
      description: {
        component:
          'Rótulo curto e não interativo para categoria ou status. Use `mono` para contadores e IDs. Para estado de execução com indicador use StatusBadge. Não use Badge como botão; com `asChild` sobre um link, o foco é visível.',
      },
    },
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Variants: Story = {
  render: () => (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="subtle">Subtle</Badge>
        <Badge variant="brand">Axiom</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="success">Concluído</Badge>
        <Badge variant="warning">Atenção</Badge>
        <Badge variant="danger">Falhou</Badge>
        <Badge variant="info">Informação</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="subtle" mono>
          03 / 06 stages
        </Badge>
        <Badge variant="secondary" mono size="sm">
          v0.4.0
        </Badge>
      </div>
    </div>
  ),
};

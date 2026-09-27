import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../../../packages/ui/src/react/badge';
const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'Estado acompanhado de texto, nunca apenas cor. Badge nao e botao. Atualizacoes assincronas importantes usam uma regiao de status contextual.',
      },
    },
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge>Em execucao</Badge>
      <Badge variant="secondary">Pendente</Badge>
      <Badge variant="destructive">Falha</Badge>
      <Badge variant="outline">Arquivado</Badge>
    </div>
  ),
};

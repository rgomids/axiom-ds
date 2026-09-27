import type { Meta, StoryObj } from '@storybook/react-vite';
import { Download } from 'lucide-react';
import { Button } from '../../../packages/ui/src/react/button';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Salvar projeto' },
  parameters: {
    docs: {
      description: {
        component:
          'Use para comandos; asChild com um link para navegacao. Variantes default, secondary, outline, ghost, destructive e link. Estado loading usa disabled + aria-busy. Botoes de icone exigem nome acessivel.',
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const).map(
        (variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ),
      )}
    </div>
  ),
};
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>Salvar</Button>
      <Button disabled>Indisponivel</Button>
      <Button disabled aria-busy="true">
        Salvando...
      </Button>
      <Button size="icon" aria-label="Baixar" title="Baixar">
        <Download aria-hidden />
      </Button>
    </div>
  ),
};
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Pequeno</Button>
      <Button>Padrao</Button>
      <Button size="lg">Grande</Button>
    </div>
  ),
};

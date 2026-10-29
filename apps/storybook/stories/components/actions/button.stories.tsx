import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Download, Plus, Trash2 } from 'lucide-react';
import { Button } from '../../../../../packages/ui/src/react/button';

const meta = {
  title: 'Components/Actions/Button',
  component: Button,
  args: { children: 'Salvar projeto' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'link', 'destructive'],
    },
    size: { control: 'select', options: ['sm', 'default', 'lg', 'icon-sm', 'icon', 'icon-lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: [
          '**Quando usar:** comandos que executam uma ação. Para navegação use `asChild` com um link.',
          '**Variantes:** `default` (primária, uma por área), `secondary`, `outline`, `ghost`, `link`, `destructive`.',
          '**Estados:** `loading` mostra spinner, define `aria-busy` e bloqueia cliques mantendo o rótulo; `disabled`.',
          '**Teclado:** `Enter`/`Espaço` ativam; foco visível de 2px.',
          '**Acessibilidade:** botões só com ícone exigem `aria-label`. Não use `destructive` sem confirmação para ações irreversíveis.',
          '**Quando não usar:** para alternar estado use Toggle/Switch; para links de texto em parágrafos use `<a>`.',
          "```tsx\nimport { Button } from '@axion/ui';\n<Button loading>Salvando</Button>\n```",
        ].join('\n\n'),
      },
    },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Salvar</Button>
      <Button disabled>Indisponível</Button>
      <Button loading>Salvando</Button>
      <Button variant="outline" loading>
        Sincronizando
      </Button>
      <Button size="icon" aria-label="Baixar" title="Baixar">
        <Download aria-hidden />
      </Button>
      <Button variant="outline">
        <Plus aria-hidden />
        Nova execução
      </Button>
      <Button variant="ghost">
        Ver evidências
        <ArrowRight aria-hidden />
      </Button>
      <Button variant="destructive">
        <Trash2 aria-hidden />
        Excluir
      </Button>
    </div>
  ),
};
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Compact</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon-sm" variant="outline" aria-label="Adicionar (compact)">
        <Plus aria-hidden />
      </Button>
      <Button size="icon" variant="outline" aria-label="Adicionar">
        <Plus aria-hidden />
      </Button>
      <Button size="icon-lg" variant="outline" aria-label="Adicionar (large)">
        <Plus aria-hidden />
      </Button>
    </div>
  ),
};

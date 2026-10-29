import type { Meta, StoryObj } from '@storybook/react-vite';
import { Copy, MoreHorizontal, Settings, Trash2 } from 'lucide-react';
import { IconButton } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Actions/IconButton',
  component: IconButton,
  args: { label: 'Configurações', children: <Settings aria-hidden /> },
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Botão compacto só com ícone. `label` é obrigatório e vira `aria-label` e `title`.',
          use: 'Ações secundárias recorrentes em toolbars, linhas de tabela e cabeçalhos.',
          avoid: 'Ações primárias ou pouco conhecidas: prefira Button com texto.',
          keyboard: '`Enter`/`Espaço`.',
          code: '<IconButton label="Copiar"><Copy aria-hidden /></IconButton>',
        }),
      },
    },
  },
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Playground: Story = {};
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <IconButton label="Mais ações">
        <MoreHorizontal aria-hidden />
      </IconButton>
      <IconButton label="Copiar" variant="outline">
        <Copy aria-hidden />
      </IconButton>
      <IconButton label="Configurações" variant="secondary">
        <Settings aria-hidden />
      </IconButton>
      <IconButton label="Excluir" variant="destructive">
        <Trash2 aria-hidden />
      </IconButton>
      <IconButton label="Compacto" size="sm" variant="outline">
        <Settings aria-hidden />
      </IconButton>
      <IconButton label="Grande" size="lg" variant="outline">
        <Settings aria-hidden />
      </IconButton>
      <IconButton label="Indisponível" variant="outline" disabled>
        <Settings aria-hidden />
      </IconButton>
    </div>
  ),
};

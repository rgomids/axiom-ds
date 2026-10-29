import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label, Textarea } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Texto de múltiplas linhas; cresce com o conteúdo (field-sizing).',
          use: 'Descrições, notas, mensagens de commit.',
          avoid: 'Código ou logs longos: use CodeBlock para exibir.',
          a11y: 'Sempre associe um Label; use FormField para mensagens.',
        }),
      },
    },
  },
} satisfies Meta<typeof Textarea>;
export default meta;
export const States: StoryObj<typeof meta> = {
  render: () => (
    <div className="grid max-w-md gap-5">
      <div className="grid gap-1.5">
        <Label htmlFor="t1">Descrição</Label>
        <Textarea id="t1" placeholder="Explique o objetivo do projeto" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="t2">Inválido</Label>
        <Textarea id="t2" aria-invalid defaultValue="x" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="t3">Somente leitura</Label>
        <Textarea id="t3" readOnly defaultValue="Gerado automaticamente" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="t4">Desabilitado</Label>
        <Textarea id="t4" disabled placeholder="Indisponível" />
      </div>
    </div>
  ),
};

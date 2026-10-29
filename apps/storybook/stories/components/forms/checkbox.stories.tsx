import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, Label } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Seleção booleana ou múltipla; suporta `indeterminate`.',
          use: 'Aceites, listas de opções independentes, seleção em tabelas.',
          avoid: 'Opções mutuamente exclusivas (RadioGroup) ou efeitos imediatos (Switch).',
          keyboard: '`Espaço` alterna.',
        }),
      },
    },
  },
} satisfies Meta<typeof Checkbox>;
export default meta;
export const States: StoryObj<typeof meta> = {
  render: () => (
    <div className="grid gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="c1" />
        <Label htmlFor="c1">Notificar por e-mail</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c2" defaultChecked />
        <Label htmlFor="c2">Exigir aprovação humana</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c3" checked="indeterminate" />
        <Label htmlFor="c3">Selecionar todas (parcial)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c4" aria-invalid />
        <Label htmlFor="c4">Aceito os termos (obrigatório)</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c5" disabled />
        <Label htmlFor="c5">Desabilitado</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c6" disabled defaultChecked />
        <Label htmlFor="c6">Desabilitado marcado</Label>
      </div>
    </div>
  ),
};

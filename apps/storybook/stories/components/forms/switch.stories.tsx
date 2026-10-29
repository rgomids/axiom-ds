import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label, Switch } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Forms/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Liga/desliga com efeito imediato (`role="switch"`).',
          use: 'Configurações aplicadas na hora.',
          avoid: 'Escolhas que só valem após "Salvar": prefira Checkbox.',
          keyboard: '`Espaço`/`Enter` alternam.',
        }),
      },
    },
  },
} satisfies Meta<typeof Switch>;
export default meta;
export const States: StoryObj<typeof meta> = {
  render: () => (
    <div className="grid gap-4">
      <div className="flex items-center gap-3">
        <Switch id="s1" defaultChecked />
        <Label htmlFor="s1">Coletar evidências</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="s2" />
        <Label htmlFor="s2">Modo estrito</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="s3" size="sm" defaultChecked />
        <Label htmlFor="s3">Compacto</Label>
      </div>
      <div className="flex items-center gap-3">
        <Switch id="s4" disabled />
        <Label htmlFor="s4">Desabilitado</Label>
      </div>
    </div>
  ),
};

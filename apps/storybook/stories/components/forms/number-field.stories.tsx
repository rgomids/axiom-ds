import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label, NumberField } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Forms/NumberField',
  component: NumberField,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Entrada numérica com `min`, `max` e `step`; vazio vale `null`.',
          keyboard:
            'Setas ↑/↓ incrementam; botões ficam fora da ordem de tabulação para não duplicar paradas.',
          a11y: '`role="spinbutton"` com `aria-valuenow/min/max`.',
        }),
      },
    },
  },
} satisfies Meta<typeof NumberField>;
export default meta;
export const States: StoryObj<typeof meta> = {
  render: () => (
    <div className="grid max-w-[12rem] gap-5">
      <div className="grid gap-1.5">
        <Label htmlFor="n1">Paralelismo</Label>
        <NumberField id="n1" defaultValue={2} min={1} max={8} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="n2">Timeout (s)</Label>
        <NumberField id="n2" defaultValue={30} step={5} min={0} aria-invalid />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="n3">Desabilitado</Label>
        <NumberField id="n3" defaultValue={4} disabled />
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Label, Slider } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Forms/Slider',
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Valor (ou intervalo) dentro de uma faixa contínua.',
          avoid: 'Valores precisos: combine com NumberField ou use apenas NumberField.',
          keyboard:
            'Setas ajustam por `step`; `PageUp/PageDown` em saltos; `Home/End` nos limites.',
          a11y: 'Cada thumb recebe `aria-label`; exiba o valor atual em texto.',
        }),
      },
    },
  },
} satisfies Meta<typeof Slider>;
export default meta;
function Example() {
  const [value, setValue] = useState([70]);
  return (
    <div className="grid max-w-sm gap-6">
      <div className="grid gap-3">
        <div className="flex justify-between">
          <Label id="threshold">Limite de confiança</Label>
          <span className="font-mono text-xs text-fg-secondary">{value[0]}%</span>
        </div>
        <Slider aria-label="Limite de confiança" value={value} onValueChange={setValue} step={5} />
      </div>
      <div className="grid gap-3">
        <Label>Intervalo</Label>
        <Slider aria-label="Intervalo" defaultValue={[20, 80]} />
      </div>
      <div className="grid gap-3">
        <Label>Desabilitado</Label>
        <Slider aria-label="Desabilitado" defaultValue={[40]} disabled />
      </div>
    </div>
  );
}
export const Default: StoryObj<typeof meta> = { render: () => <Example /> };

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox, Label } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const projects = [
  { value: 'orion', label: 'Orion', description: 'axiom/orion' },
  { value: 'lyra', label: 'Lyra', description: 'axiom/lyra' },
  { value: 'vega', label: 'Vega', description: 'axiom/vega' },
  { value: 'atlas', label: 'Atlas', description: 'arquivado', disabled: true },
  { value: 'nova', label: 'Nova', description: 'axiom/nova' },
];
const meta = {
  title: 'Components/Forms/Combobox',
  component: Combobox,
  args: { options: projects, placeholder: 'Selecione um projeto' },
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Seleção única com busca (Popover + Command).',
          use: 'Listas longas ou dinâmicas.',
          avoid: 'Poucas opções fixas (Select ou RadioGroup).',
          keyboard:
            '`Enter` abre; digite para filtrar; setas navegam; `Enter` seleciona; `Esc` fecha e devolve o foco.',
        }),
      },
    },
  },
} satisfies Meta<typeof Combobox>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: (args) => (
    <div className="grid max-w-xs gap-1.5">
      <Label htmlFor="project">Projeto</Label>
      <Combobox {...args} id="project" />
    </div>
  ),
};

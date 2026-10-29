import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input, Label } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Forms/Label',
  component: Label,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Rótulo associado ao controle via `htmlFor`. Clicar foca o controle.',
          a11y: 'Nunca substitua por placeholder.',
        }),
      },
    },
  },
} satisfies Meta<typeof Label>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: () => (
    <div className="grid max-w-sm gap-1.5">
      <Label htmlFor="l1">E-mail</Label>
      <Input id="l1" type="email" placeholder="voce@exemplo.com" />
    </div>
  ),
};

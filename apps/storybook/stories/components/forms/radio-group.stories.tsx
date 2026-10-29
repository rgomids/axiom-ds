import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label, RadioGroup, RadioGroupItem } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Forms/RadioGroup',
  component: RadioGroup,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Escolha única entre poucas opções visíveis.',
          use: 'Até ~5 opções que o usuário deve comparar.',
          avoid: 'Muitas opções (Select/Combobox).',
          keyboard: '`Tab` entra no grupo; setas movem e selecionam.',
          a11y: 'Nomeie o grupo com `aria-label` ou `aria-labelledby`.',
        }),
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: () => (
    <RadioGroup defaultValue="review" aria-label="Política de entrega">
      {[
        ['auto', 'Automática', 'Entrega sem revisão'],
        ['review', 'Revisão humana', 'Aprovação antes da entrega'],
        ['manual', 'Manual', 'Desabilitada nesta organização'],
      ].map(([value, title, hint]) => (
        <div key={value} className="flex items-start gap-2.5">
          <RadioGroupItem
            value={value}
            id={'r-' + value}
            disabled={value === 'manual'}
            className="mt-0.5"
          />
          <Label htmlFor={'r-' + value} className="grid gap-0.5">
            {title}
            <span className="text-xs font-normal text-fg-tertiary">{hint}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

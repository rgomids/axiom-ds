import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper, type Step } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const steps: Step[] = [
  { id: 'intake', title: 'Intake', description: 'Intenção registrada', status: 'complete' },
  { id: 'spec', title: 'Especificação', description: 'Aprovada', status: 'complete' },
  { id: 'impl', title: 'Implementação', description: 'Em andamento', status: 'current' },
  { id: 'review', title: 'Revisão', status: 'upcoming' },
  { id: 'delivery', title: 'Entrega', status: 'upcoming' },
];
const meta = {
  title: 'Components/Navigation/Stepper',
  component: Stepper,
  args: { steps, 'aria-label': 'Etapas do workflow' },
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Progresso em etapas ordenadas, horizontal ou vertical, com estados complete/current/upcoming/error.',
          a11y: 'Lista ordenada; etapa atual com `aria-current="step"`; estado também em texto oculto.',
        }),
      },
    },
  },
} satisfies Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Horizontal: Story = {};
export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    steps: [
      ...steps.slice(0, 2),
      { ...steps[2], status: 'error', description: 'Testes falharam' },
      ...steps.slice(3),
    ],
  },
};

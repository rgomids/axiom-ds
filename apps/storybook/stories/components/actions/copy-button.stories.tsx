import type { Meta, StoryObj } from '@storybook/react-vite';
import { CopyButton } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Actions/CopyButton',
  component: CopyButton,
  args: { value: 'EX-00271', label: 'Copiar ID da execução', copy: async () => {} },
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Copia um valor para a área de transferência e confirma trocando o ícone por 2s; o nome acessível muda para "Copiado".',
          use: 'IDs, hashes, URLs e comandos curtos. Para comandos completos use CommandSnippet.',
          code: '<CopyButton value={execution.id} label="Copiar ID" />',
        }),
      },
    },
  },
} satisfies Meta<typeof CopyButton>;
export default meta;
export const Inline: StoryObj<typeof meta> = {
  render: (args) => (
    <div className="flex items-center gap-1 font-mono text-sm">
      EX-00271
      <CopyButton {...args} />
    </div>
  ),
};

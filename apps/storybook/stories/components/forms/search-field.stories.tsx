import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Forms/SearchField',
  component: SearchField,
  args: {
    'aria-label': 'Buscar execuções',
    placeholder: 'Search by execution or project...',
    shortcut: '/',
  },
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Campo de busca com ícone, limpar e dica de atalho.',
          keyboard: '`Esc` limpa o valor; o botão limpar devolve o foco ao campo.',
          a11y: 'Requer nome acessível (Label ou `aria-label`). Anuncie a contagem de resultados em uma região `status`.',
        }),
      },
    },
  },
} satisfies Meta<typeof SearchField>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => (
    <div className="max-w-md">
      <SearchField {...args} />
    </div>
  ),
};
export const Filled: Story = {
  render: (args) => (
    <div className="max-w-md">
      <SearchField {...args} defaultValue="EX-0027" />
    </div>
  ),
};
export const Disabled: Story = {
  render: (args) => (
    <div className="max-w-md">
      <SearchField {...args} disabled />
    </div>
  ),
};

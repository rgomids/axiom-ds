import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandSnippet } from '../../../packages/ui/src/react';

const meta = {
  title: 'Patterns/Logs/CommandSnippet',
  component: CommandSnippet,
  args: { command: 'axiom version', language: 'pt' },
  parameters: {
    docs: {
      description: {
        component:
          'Um comando por instância. O botão à direita copia somente esse comando; anuncia sucesso ou seleciona o texto para cópia manual se a área de transferência estiver indisponível. Use HTTPS. Estados: padrão, copiando, copiado, erro e desabilitado. A página estática usa o mesmo contrato sem exigir React.',
      },
    },
  },
} satisfies Meta<typeof CommandSnippet>;
export default meta;
type Story = StoryObj<typeof meta>;
export const IndividualCommands: Story = {
  render: () => (
    <div className="grid gap-4">
      {['axiom version', 'axiom help', 'axiom first-run'].map((command) => (
        <CommandSnippet key={command} command={command} />
      ))}
    </div>
  ),
};
export const LongCommand: Story = {
  args: {
    command:
      'axiom work-item create --project my-project --repository main --provider-repository owner/repository --title "Prepare release"',
  },
};
export const Disabled: Story = { args: { disabled: true } };
export const UnavailableClipboard: Story = {
  args: {
    copy: async () => {
      throw new Error('Clipboard unavailable');
    },
  },
};
export const English: Story = { args: { language: 'en' } };

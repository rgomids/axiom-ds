import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Data Display/CodeBlock',
  component: CodeBlock,
  args: {
    title: 'axiom.config.json',
    code: '{\n  "project": "orion",\n  "runtime": "codex",\n  "approval": "human"\n}',
    showLineNumbers: true,
    highlight: [4],
    copyable: true,
  },
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Bloco de código somente leitura com título, números de linha, destaque e cópia. Sem colorização sintática (evita dependência).',
          keyboard: 'O bloco é focável para rolagem horizontal por teclado.',
        }),
      },
    },
  },
} satisfies Meta<typeof CodeBlock>;
export default meta;
export const Default: StoryObj<typeof meta> = {};

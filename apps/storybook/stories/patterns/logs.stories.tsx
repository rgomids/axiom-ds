import type { Meta, StoryObj } from '@storybook/react-vite';
import { LogViewer } from '../../../../packages/ui/src/react';
import { logLines } from '../support/data';
import { describe } from '../support/doc';

const meta = {
  title: 'Patterns/Logs/LogViewer',
  component: LogViewer,
  args: { lines: logLines, title: 'EX-00271 · implementation', follow: false },
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Visualizador de logs somente leitura: filtro por nível (ToggleGroup), busca, quebra de linha, acompanhar o fim e copiar as linhas visíveis.',
          keyboard: 'Controles na barra por `Tab`; a área de log é focável para rolar com setas.',
          a11y: '`role="log"`; com "acompanhar" ativo novas linhas são anunciadas de forma educada.',
        }),
      },
    },
  },
} satisfies Meta<typeof LogViewer>;
export default meta;
export const Default: StoryObj<typeof meta> = {};

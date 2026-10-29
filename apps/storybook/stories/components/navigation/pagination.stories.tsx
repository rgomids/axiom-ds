import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const meta = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  args: { page: 4, pageCount: 12, onPageChange: () => {} },
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Navegação entre páginas (índice base zero) com reticências e resumo.',
          a11y: 'Página atual com `aria-current="page"`; botões com nomes "Página N".',
        }),
      },
    },
  },
} satisfies Meta<typeof Pagination>;
export default meta;
function Example({ compact = false }: { compact?: boolean }) {
  const [page, setPage] = useState(4);
  return (
    <Pagination
      page={page}
      pageCount={12}
      onPageChange={setPage}
      compact={compact}
      summary={
        <span className="font-mono">
          {page * 10 + 1}–{page * 10 + 10} de 120
        </span>
      }
    />
  );
}
export const Default: StoryObj<typeof meta> = { render: () => <Example /> };
export const Compact: StoryObj<typeof meta> = { render: () => <Example compact /> };

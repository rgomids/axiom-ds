import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  StatusBadge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../../packages/ui/src/react';
import { describe } from '../../support/doc';

const rows = [
  { id: 'EX-00271', project: 'Orion', status: 'running', duration: '2m 10s' },
  { id: 'EX-00270', project: 'Lyra', status: 'success', duration: '4m 52s' },
  { id: 'EX-00269', project: 'Vega', status: 'danger', duration: '0m 48s' },
] as const;
const meta = {
  title: 'Components/Data Display/Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose: 'Tabela semântica estilizada. Rola horizontalmente em telas estreitas.',
          use: 'Dados estáticos. Para ordenação, busca, paginação e seleção use DataTable.',
          a11y: 'Use `<TableCaption>` ou `aria-label`; cabeçalhos são `<th>`.',
        }),
      },
    },
  },
} satisfies Meta<typeof Table>;
export default meta;
export const Default: StoryObj<typeof meta> = {
  render: () => (
    <div className="rounded-card border bg-card">
      <Table>
        <TableCaption className="pb-3">Execuções recentes (dados simulados)</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Execução</TableHead>
            <TableHead>Projeto</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Duração</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-mono text-13">{r.id}</TableCell>
              <TableCell>{r.project}</TableCell>
              <TableCell>
                <StatusBadge status={r.status}>
                  {r.status === 'danger' ? 'failed' : r.status}
                </StatusBadge>
              </TableCell>
              <TableCell className="text-right font-mono text-13">{r.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

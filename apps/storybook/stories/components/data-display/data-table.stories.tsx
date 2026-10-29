import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  DataTable,
  Pagination,
  SearchField,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  StatusBadge,
  useDataTable,
  type DataTableColumn,
} from '../../../../../packages/ui/src/react';
import { executions, formatDuration, statusLabel, type Execution } from '../../support/data';
import { describe } from '../../support/doc';

type Key = 'id' | 'project' | 'status' | 'runtime' | 'duration';
const columns: DataTableColumn<Execution, Key>[] = [
  {
    key: 'id',
    header: 'Execução',
    value: (r) => r.id,
    sortable: true,
    cell: (r) => <span className="font-mono text-13">{r.id}</span>,
  },
  { key: 'project', header: 'Projeto', value: (r) => r.project, sortable: true },
  {
    key: 'status',
    header: 'Status',
    value: (r) => statusLabel[r.status],
    sortable: true,
    cell: (r) => <StatusBadge status={r.status}>{statusLabel[r.status]}</StatusBadge>,
  },
  {
    key: 'runtime',
    header: 'Runtime',
    value: (r) => r.runtime,
    cell: (r) => (
      <Badge variant="secondary" size="sm">
        {r.runtime}
      </Badge>
    ),
  },
  {
    key: 'duration',
    header: 'Duração',
    value: (r) => r.duration,
    sortable: true,
    align: 'right',
    cell: (r) => <span className="font-mono text-13">{formatDuration(r.duration)}</span>,
  },
];

function Example({
  data = executions,
  loading = false,
}: {
  data?: Execution[];
  loading?: boolean;
}) {
  const [status, setStatus] = useState('all');
  const rows = useMemo(
    () => (status === 'all' ? data : data.filter((r) => r.status === status)),
    [data, status],
  );
  const table = useDataTable({
    data: rows,
    columns,
    getRowId: (r) => r.id,
    pageSize: 8,
    initialSort: { key: 'id', direction: 'desc' },
  });
  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <SearchField
          aria-label="Buscar execuções"
          placeholder="Buscar por execução ou projeto"
          value={table.query}
          onValueChange={table.setQuery}
          className="max-w-xs"
        />
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger aria-label="Filtrar por status" size="sm" className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            {Object.entries(statusLabel).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {table.selected.size > 0 && (
          <div className="ml-auto flex items-center gap-2 text-xs text-fg-secondary" role="status">
            <span className="font-mono">{table.selected.size} selecionadas</span>
            <Button size="sm" variant="ghost" onClick={table.clearSelection}>
              Limpar
            </Button>
            <Button size="sm" variant="outline">
              Exportar
            </Button>
          </div>
        )}
      </div>
      <DataTable
        table={table}
        columns={columns}
        getRowId={(r) => r.id}
        label="Execuções"
        selectable
        loading={loading}
      />
      <Pagination
        page={table.page}
        pageCount={table.pageCount}
        onPageChange={table.setPage}
        summary={<span className="font-mono">{table.total} resultados</span>}
      />
    </div>
  );
}

const meta = {
  title: 'Components/Data Display/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      description: {
        component: describe({
          purpose:
            'Tabela de dados com busca, filtro, ordenação (`aria-sort`), paginação, seleção por linha/página, loading e vazio. O modelo vem do hook headless `useDataTable`; a apresentação é `DataTable`.',
          use: 'Listas operacionais com dezenas a poucos milhares de linhas.',
          avoid:
            'Virtualização, agrupamento ou colunas fixas: ainda não suportados (adotar um motor de tabela seria uma decisão separada).',
          keyboard:
            'Cabeçalhos ordenáveis são botões; checkboxes com `Espaço`; paginação com `Tab`.',
          code: 'const table = useDataTable({ data, columns, getRowId: (r) => r.id });\n<DataTable table={table} columns={columns} getRowId={(r) => r.id} label="Execuções" selectable />',
        }),
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj;
export const Complete: Story = { render: () => <Example /> };
export const Loading: Story = { render: () => <Example loading /> };
export const Empty: Story = { render: () => <Example data={[]} /> };

import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { Activity, CheckCircle2, Clock, Coins, Plus } from 'lucide-react';
import {
  ActiveFilters, Badge, Button, Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle,
  DashboardShell, DataTable, DataTableToolbar, ExecutionTimeline, MetricOverview, PageHeader, Pagination,
  SearchField, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, StatusBadge, Tabs, TabsContent,
  TabsList, TabsTrigger, Toaster, toast, useDataTable, type DataTableColumn,
} from '../../../../packages/ui/src/react';
import { AppHeader, AppSidebar, SimulatedNote } from '../support/app';
import { executions, formatDuration, statusLabel, timeline, type Execution } from '../support/data';

type Key = 'id' | 'project' | 'status' | 'duration';
const columns: DataTableColumn<Execution, Key>[] = [
  { key: 'id', header: 'Execução', value: (r) => r.id, sortable: true, cell: (r) => <span className="font-mono text-13">{r.id}</span> },
  { key: 'project', header: 'Projeto', value: (r) => r.project, sortable: true },
  { key: 'status', header: 'Status', value: (r) => statusLabel[r.status], cell: (r) => <StatusBadge status={r.status}>{statusLabel[r.status]}</StatusBadge> },
  { key: 'duration', header: 'Duração', value: (r) => r.duration, sortable: true, align: 'right', cell: (r) => <span className="font-mono text-13">{formatDuration(r.duration)}</span> },
];

function DashboardOverview({ loading = false }: { loading?: boolean }) {
  const [status, setStatus] = useState('all');
  const data = useMemo(() => (status === 'all' ? executions : executions.filter((e) => e.status === status)), [status]);
  const table = useDataTable({ data, columns, getRowId: (r) => r.id, pageSize: 6, initialSort: { key: 'id', direction: 'desc' } });
  const running = executions.filter((e) => e.status === 'running').length;
  return (
    <DashboardShell sidebar={<AppSidebar active="overview" />} header={<AppHeader page="Overview" />}>
      <Toaster />
      <PageHeader
        eyebrow="Workspace / Project"
        title="Overview"
        description="Workflows, runtimes e evidências de entrega em um só lugar."
        actions={<Button onClick={() => toast.success('Execução criada (simulado)', { description: 'EX-00272' })}><Plus aria-hidden />New execution</Button>}
      />
      <div className="grid gap-6">
        <MetricOverview
          loading={loading}
          metrics={[
            { id: 'runs', label: 'Execuções (24h)', value: '128', icon: <Activity />, trend: { value: '+12%', direction: 'up', positive: true, label: 'vs. ontem' } },
            { id: 'running', label: 'Em andamento', value: String(running), icon: <Clock />, footer: <StatusBadge status="running">live</StatusBadge> },
            { id: 'success', label: 'Taxa de sucesso', value: '96.1', unit: '%', icon: <CheckCircle2 />, trend: { value: '-0.8pp', direction: 'down', positive: false } },
            { id: 'cost', label: 'Custo estimado', value: 'US$ 18,40', icon: <Coins />, footer: 'de US$ 50 no mês' },
          ]}
        />
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <section aria-labelledby="recent" className="grid min-w-0 gap-3">
            <h2 id="recent" className="text-base font-semibold tracking-tight">Execuções recentes</h2>
            <DataTableToolbar
              search={<SearchField aria-label="Buscar execuções" placeholder="Buscar por execução ou projeto" value={table.query} onValueChange={table.setQuery} />}
              filters={
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger size="sm" aria-label="Filtrar por status" className="w-44"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    {Object.entries(statusLabel).map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              }
              selectedCount={table.selected.size}
              onClearSelection={table.clearSelection}
              bulkActions={<Button size="sm" variant="outline" onClick={() => toast('Exportação iniciada (simulado)')}>Exportar</Button>}
            />
            <ActiveFilters
              filters={[...(status !== 'all' ? [{ id: 'status', label: 'Status: ' + statusLabel[status as Execution['status']] }] : []), ...(table.query ? [{ id: 'q', label: 'Busca: ' + table.query }] : [])]}
              onRemove={(id) => (id === 'status' ? setStatus('all') : table.setQuery(''))}
              onClear={() => { setStatus('all'); table.setQuery(''); }}
            />
            <DataTable table={table} columns={columns} getRowId={(r) => r.id} label="Execuções recentes" selectable loading={loading} />
            <Pagination page={table.page} pageCount={table.pageCount} onPageChange={table.setPage} compact summary={<span className="font-mono">{table.total} resultados</span>} />
          </section>
          <Card className="self-start">
            <CardHeader>
              <CardTitle>EX-00271</CardTitle>
              <CardDescription>Orion · Codex</CardDescription>
              <CardAction><Badge variant="subtle" mono>03 / 06</Badge></CardAction>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="timeline">
                <TabsList variant="line"><TabsTrigger value="timeline">Timeline</TabsTrigger><TabsTrigger value="notes">Notas</TabsTrigger></TabsList>
                <TabsContent value="timeline"><ExecutionTimeline events={timeline.slice(0, 4)} /></TabsContent>
                <TabsContent value="notes">Sem notas para esta execução.</TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      <SimulatedNote />
    </DashboardShell>
  );
}

const meta = {
  title: 'Examples/Dashboard Overview',
  component: DashboardOverview,
  parameters: { fullBleed: true, docs: { description: { component: 'Composição completa: DashboardShell, Sidebar, header com breadcrumb, MetricOverview, DataTableToolbar com busca/filtro/filtros ativos, DataTable com seleção e paginação, Tabs, ExecutionTimeline e Toast. Dados locais simulados.' } } },
} satisfies Meta<typeof DashboardOverview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };

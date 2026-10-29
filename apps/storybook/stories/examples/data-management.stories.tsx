import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { Download, Filter, MoreHorizontal, Trash2 } from 'lucide-react';
import {
  ActiveFilters, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, Badge, Button, Checkbox, DashboardShell, DataTable,
  DataTableToolbar, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, IconButton, Label,
  PageHeader, Pagination, SearchField, Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader,
  SheetTitle, SheetTrigger, StatusBadge, ToggleGroup, ToggleGroupItem, Toaster, toast, useDataTable,
  type DataTableColumn,
} from '../../../../packages/ui/src/react';
import { AppHeader, AppSidebar, SimulatedNote } from '../support/app';
import { executions as seed, formatDuration, formatTime, statusLabel, type Execution } from '../support/data';

type Key = 'id' | 'project' | 'runtime' | 'status' | 'owner' | 'startedAt' | 'duration' | 'actions';

function DataManagement() {
  const [rows, setRows] = useState(seed);
  const [runtime, setRuntime] = useState('all');
  const [statuses, setStatuses] = useState<string[]>([]);
  const [confirm, setConfirm] = useState<string[] | null>(null);
  const filtered = useMemo(
    () => rows.filter((r) => (runtime === 'all' || r.runtime === runtime) && (statuses.length === 0 || statuses.includes(r.status))),
    [rows, runtime, statuses],
  );
  const columns: DataTableColumn<Execution, Key>[] = [
    { key: 'id', header: 'Execução', value: (r) => r.id, sortable: true, cell: (r) => <span className="font-mono text-13">{r.id}</span> },
    { key: 'project', header: 'Projeto', value: (r) => r.project, sortable: true },
    { key: 'runtime', header: 'Runtime', value: (r) => r.runtime, cell: (r) => <Badge variant="secondary" size="sm">{r.runtime}</Badge> },
    { key: 'status', header: 'Status', value: (r) => statusLabel[r.status], sortable: true, cell: (r) => <StatusBadge status={r.status}>{statusLabel[r.status]}</StatusBadge> },
    { key: 'owner', header: 'Responsável', value: (r) => r.owner, sortable: true },
    { key: 'startedAt', header: 'Início', value: (r) => r.startedAt, sortable: true, cell: (r) => <span className="font-mono text-xs text-fg-secondary">{formatTime(r.startedAt)}</span> },
    { key: 'duration', header: 'Duração', value: (r) => r.duration, sortable: true, align: 'right', cell: (r) => <span className="font-mono text-13">{formatDuration(r.duration)}</span> },
    {
      key: 'actions',
      header: <span className="sr-only">Ações</span>,
      cell: (r) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild><IconButton size="sm" label={'Ações de ' + r.id}><MoreHorizontal aria-hidden /></IconButton></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => toast('Exportando ' + r.id + ' (simulado)')}><Download aria-hidden />Exportar</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onSelect={() => setConfirm([r.id])}><Trash2 aria-hidden />Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  const table = useDataTable({ data: filtered, columns, getRowId: (r) => r.id, pageSize: 10, initialSort: { key: 'startedAt', direction: 'desc' } });
  const remove = (ids: string[]) => {
    setRows((current) => current.filter((r) => !ids.includes(r.id)));
    table.clearSelection();
    toast.success(ids.length + ' execução(ões) excluída(s) (simulado)');
  };
  const activeFilters = [
    ...(runtime !== 'all' ? [{ id: 'runtime', label: 'Runtime: ' + runtime }] : []),
    ...statuses.map((s) => ({ id: 'status:' + s, label: statusLabel[s as Execution['status']] })),
  ];
  return (
    <DashboardShell sidebar={<AppSidebar active="data" />} header={<AppHeader page="Data" />}>
      <Toaster />
      <PageHeader title="Data" description="Gerencie o histórico de execuções." actions={<Button variant="outline" onClick={() => toast('CSV gerado (simulado)')}><Download aria-hidden />Exportar CSV</Button>} />
      <div className="grid gap-3">
        <DataTableToolbar
          search={<SearchField aria-label="Buscar execuções" placeholder="Buscar" value={table.query} onValueChange={table.setQuery} shortcut="/" />}
          filters={
            <>
              <ToggleGroup type="single" value={runtime} onValueChange={(v) => setRuntime(v || 'all')} aria-label="Runtime">
                <ToggleGroupItem value="all">Todos</ToggleGroupItem>
                <ToggleGroupItem value="Codex">Codex</ToggleGroupItem>
                <ToggleGroupItem value="Claude">Claude</ToggleGroupItem>
              </ToggleGroup>
              <Sheet>
                <SheetTrigger asChild><Button variant="outline" size="sm"><Filter aria-hidden />Status{statuses.length > 0 && <Badge variant="subtle" size="sm" mono>{statuses.length}</Badge>}</Button></SheetTrigger>
                <SheetContent>
                  <SheetHeader><SheetTitle>Filtrar por status</SheetTitle><SheetDescription>Selecione um ou mais estados.</SheetDescription></SheetHeader>
                  <div className="grid gap-3">
                    {Object.entries(statusLabel).map(([value, label]) => (
                      <div key={value} className="flex items-center gap-2">
                        <Checkbox id={'f-' + value} checked={statuses.includes(value)} onCheckedChange={(c) => setStatuses((s) => (c ? [...s, value] : s.filter((x) => x !== value)))} />
                        <Label htmlFor={'f-' + value}>{label}</Label>
                      </div>
                    ))}
                  </div>
                  <SheetFooter><Button variant="ghost" onClick={() => setStatuses([])}>Limpar</Button><SheetClose asChild><Button>Aplicar</Button></SheetClose></SheetFooter>
                </SheetContent>
              </Sheet>
            </>
          }
          selectedCount={table.selected.size}
          onClearSelection={table.clearSelection}
          bulkActions={<Button size="sm" variant="destructive" onClick={() => setConfirm([...table.selected])}><Trash2 aria-hidden />Excluir</Button>}
        />
        <ActiveFilters filters={activeFilters} onRemove={(id) => (id === 'runtime' ? setRuntime('all') : setStatuses((s) => s.filter((x) => 'status:' + x !== id)))} onClear={() => { setRuntime('all'); setStatuses([]); }} />
        <DataTable table={table} columns={columns} getRowId={(r) => r.id} label="Histórico de execuções" selectable />
        <Pagination page={table.page} pageCount={table.pageCount} onPageChange={table.setPage} summary={<span className="font-mono">{table.total} de {rows.length}</span>} />
      </div>
      <AlertDialog open={confirm !== null} onOpenChange={(open) => !open && setConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir {confirm?.length} execução(ões)?</AlertDialogTitle>
            <AlertDialogDescription>Os registros simulados serão removidos desta tabela.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Voltar</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={() => confirm && remove(confirm)}>Excluir</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <SimulatedNote />
    </DashboardShell>
  );
}

const meta = {
  title: 'Examples/Data Management',
  component: DataManagement,
  parameters: { fullBleed: true, docs: { description: { component: 'Gestão de dados: busca com atalho, ToggleGroup de runtime, filtros de status em Sheet, filtros ativos removíveis, ordenação, seleção com ações em lote, menu por linha, confirmação destrutiva e paginação. Dados locais simulados.' } } },
} satisfies Meta<typeof DataManagement>;
export default meta;
export const Default: StoryObj<typeof meta> = {};

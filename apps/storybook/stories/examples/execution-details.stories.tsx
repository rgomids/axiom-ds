import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CheckCircle2, MoreHorizontal, RotateCcw, Square } from 'lucide-react';
import {
  Alert, AlertDescription, AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button,
  CodeBlock, CommandSnippet, CopyButton, DashboardShell, DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger, EvidencePanel, ExecutionTimeline, IconButton, LogViewer, PageHeader, ResourceDetails,
  StatusBadge, Tabs, TabsContent, TabsList, TabsTrigger, Toaster, WorkflowStepper, toast,
} from '../../../../packages/ui/src/react';
import { AppHeader, AppSidebar, SimulatedNote } from '../support/app';
import { evidence, logLines, timeline } from '../support/data';

type State = 'running' | 'awaiting' | 'cancelled' | 'approved';

function ExecutionDetails() {
  const [state, setState] = useState<State>('awaiting');
  const [busy, setBusy] = useState(false);
  const statusBadge = {
    running: <StatusBadge status="running">Running</StatusBadge>,
    awaiting: <StatusBadge status="warning">Awaiting approval</StatusBadge>,
    cancelled: <StatusBadge status="neutral">Cancelled</StatusBadge>,
    approved: <StatusBadge status="success">Approved</StatusBadge>,
  }[state];
  const approve = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setState('approved');
      toast.success('Entrega aprovada (simulado)', { description: 'EX-00271' });
    }, 900);
  };
  return (
    <DashboardShell sidebar={<AppSidebar active="executions" />} header={<AppHeader page="EX-00271" />}>
      <Toaster />
      <PageHeader
        eyebrow={<span className="flex items-center gap-1 font-mono">EX-00271 <CopyButton value="EX-00271" label="Copiar ID da execução" /></span>}
        title="Exportar relatórios em JSON"
        description="Orion · branch feat/ex-00271 · iniciada 2026-10-28 14:02 UTC"
        actions={
          <>
            {statusBadge}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" disabled={state !== 'awaiting' && state !== 'running'}><Square aria-hidden />Cancelar</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Cancelar EX-00271?</AlertDialogTitle>
                  <AlertDialogDescription>Etapas em andamento serão interrompidas. Evidências coletadas são mantidas.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Voltar</AlertDialogCancel>
                  <AlertDialogAction variant="destructive" onClick={() => { setState('cancelled'); toast('Execução cancelada (simulado)'); }}>Cancelar execução</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button loading={busy} disabled={state !== 'awaiting'} onClick={approve}><CheckCircle2 aria-hidden />Aprovar entrega</Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><IconButton label="Mais ações" variant="outline"><MoreHorizontal aria-hidden /></IconButton></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={() => { setState('running'); toast('Reexecução iniciada (simulado)'); }}><RotateCcw aria-hidden />Reexecutar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        }
      />
      {state === 'awaiting' && (
        <Alert variant="warning" className="mb-6"><AlertDescription>Entrega final requer aprovação humana. Revise evidências e logs antes de aprovar.</AlertDescription></Alert>
      )}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="grid min-w-0 grid-cols-1 gap-6">
          <WorkflowStepper steps={[
            { id: 'i', title: 'Intake', status: 'complete' },
            { id: 's', title: 'Spec', status: 'complete' },
            { id: 'm', title: 'Implement', status: 'complete' },
            { id: 't', title: 'Test', status: 'complete' },
            { id: 'r', title: 'Review', status: state === 'approved' ? 'complete' : state === 'cancelled' ? 'error' : 'current' },
            { id: 'd', title: 'Deliver', status: state === 'approved' ? 'current' : 'upcoming' },
          ]} />
          <Tabs defaultValue="logs">
            <TabsList variant="line">
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="evidence">Evidências</TabsTrigger>
              <TabsTrigger value="diff">Diff</TabsTrigger>
            </TabsList>
            <TabsContent value="logs"><LogViewer lines={logLines} title="implementation" follow={false} /></TabsContent>
            <TabsContent value="evidence"><EvidencePanel items={evidence} /></TabsContent>
            <TabsContent value="diff">
              <CodeBlock title="src/handlers/export.ts" showLineNumbers highlight={[3, 4]} code={"export function exportReport(payload: Report) {\n  if (!payload) {\n    throw new ValidationError('empty payload');\n  }\n  return toJSON(payload);\n}"} />
            </TabsContent>
          </Tabs>
        </div>
        <div className="grid content-start gap-6">
          <ResourceDetails
            title="Current execution"
            aside={statusBadge}
            fields={[
              { label: 'Execution', value: 'EX-00271', mono: true, copy: 'EX-00271' },
              { label: 'Runtime', value: 'Codex / Claude', mono: true },
              { label: 'Workflow', value: '05 / 06 stages', mono: true },
              { label: 'Duration', value: '7m 41s', mono: true },
            ]}
          />
          <section className="rounded-card border bg-card p-5" aria-label="Linha do tempo">
            <ExecutionTimeline events={timeline.map((e) => ({ ...e, status: e.status === 'pending' ? 'complete' : e.status === 'running' ? 'complete' : e.status })).slice(0, 5)} />
          </section>
          <CommandSnippet command="axiom execution show EX-00271" />
        </div>
      </div>
      <SimulatedNote />
    </DashboardShell>
  );
}

const meta = {
  title: 'Examples/Execution Details',
  component: ExecutionDetails,
  parameters: { fullBleed: true, docs: { description: { component: 'Identificador mono copiável, estado, WorkflowStepper, Tabs com LogViewer, EvidencePanel e CodeBlock, ResourceDetails, ExecutionTimeline, AlertDialog de cancelamento, aprovação com loading e Toast. Dados simulados; nenhuma ação chama API.' } } },
} satisfies Meta<typeof ExecutionDetails>;
export default meta;
export const Default: StoryObj<typeof meta> = {};

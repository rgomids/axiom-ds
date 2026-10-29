import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, DashboardShell, FormControl, FormDescription,
  FormField, FormLabel, FormMessage, Input, NumberField, PageHeader, Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue, SettingsRow, SettingsSection, Switch, Tabs, TabsContent, TabsList, TabsTrigger,
  Textarea, Toaster, toast,
} from '../../../../packages/ui/src/react';
import { AppHeader, AppSidebar, SimulatedNote } from '../support/app';

const slug = /^[a-z0-9-]+$/;

function ProjectSettings() {
  const [name, setName] = useState('orion');
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [evidence, setEvidence] = useState(true);
  const [strict, setStrict] = useState(false);
  const invalid = touched && !slug.test(name);
  const save = () => {
    setTouched(true);
    if (!slug.test(name)) return;
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Configurações salvas (simulado)');
    }, 700);
  };
  return (
    <DashboardShell sidebar={<AppSidebar active="settings" />} header={<AppHeader page="Settings" />}>
      <Toaster />
      <PageHeader eyebrow="Workspace / Project" title="Settings" description="Preferências do projeto Orion." />
      <Tabs defaultValue="general">
        <TabsList variant="line">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="automation">Automação</TabsTrigger>
          <TabsTrigger value="danger">Zona de perigo</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="grid gap-6">
          <SettingsSection
            title="Projeto"
            description="Identificação usada em URLs e comandos."
            footer={<Button loading={saving} onClick={save}>Salvar</Button>}
          >
            <FormField invalid={invalid} required>
              <FormLabel>Identificador</FormLabel>
              <FormControl><Input value={name} onChange={(e) => setName(e.target.value)} onBlur={() => setTouched(true)} className="font-mono" /></FormControl>
              <FormDescription>Minúsculas, números e hífens.</FormDescription>
              <FormMessage>{invalid ? 'Use apenas minúsculas, números e hífens.' : ''}</FormMessage>
            </FormField>
            <FormField>
              <FormLabel>Descrição</FormLabel>
              <FormControl><Textarea defaultValue="Exportação de relatórios e integrações." /></FormControl>
            </FormField>
            <FormField>
              <FormLabel>Runtime padrão</FormLabel>
              <Select defaultValue="codex">
                <FormControl><SelectTrigger className="sm:w-60"><SelectValue /></SelectTrigger></FormControl>
                <SelectContent><SelectItem value="codex">Codex</SelectItem><SelectItem value="claude">Claude</SelectItem></SelectContent>
              </Select>
            </FormField>
          </SettingsSection>
        </TabsContent>
        <TabsContent value="automation" className="grid gap-6">
          <SettingsSection title="Execução" description="Aplicado imediatamente às próximas execuções.">
            <SettingsRow htmlFor="evidence" label="Coletar evidências" description="Anexa relatórios, diffs e logs a cada etapa." control={<Switch id="evidence" checked={evidence} onCheckedChange={(v) => { setEvidence(v); toast(v ? 'Coleta ativada' : 'Coleta desativada'); }} />} />
            <SettingsRow htmlFor="strict" label="Modo estrito" description="Falha a execução em qualquer aviso." control={<Switch id="strict" checked={strict} onCheckedChange={setStrict} />} />
            <FormField>
              <FormLabel>Paralelismo máximo</FormLabel>
              <FormControl><NumberField defaultValue={2} min={1} max={8} className="w-36" /></FormControl>
              <FormDescription>Entre 1 e 8 execuções simultâneas.</FormDescription>
            </FormField>
          </SettingsSection>
        </TabsContent>
        <TabsContent value="danger">
          <SettingsSection
            tone="danger"
            title="Arquivar projeto"
            description="O projeto fica somente leitura. Pode ser restaurado por um administrador."
            footer={
              <AlertDialog>
                <AlertDialogTrigger asChild><Button variant="destructive">Arquivar projeto</Button></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>Arquivar Orion?</AlertDialogTitle><AlertDialogDescription>Execuções em andamento serão canceladas.</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter><AlertDialogCancel>Voltar</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={() => toast('Projeto arquivado (simulado)')}>Arquivar</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            }
          >
            <p className="text-sm text-fg-secondary">Esta ação exige confirmação.</p>
          </SettingsSection>
        </TabsContent>
      </Tabs>
      <SimulatedNote />
    </DashboardShell>
  );
}

const meta = {
  title: 'Examples/Project Settings',
  component: ProjectSettings,
  parameters: { fullBleed: true, docs: { description: { component: 'Tabs, SettingsSection/SettingsRow, FormField com validação, Select, Switch com efeito imediato, NumberField, salvar com loading e Toast, zona de perigo com AlertDialog. Dados simulados.' } } },
} satisfies Meta<typeof ProjectSettings>;
export default meta;
export const Default: StoryObj<typeof meta> = {};

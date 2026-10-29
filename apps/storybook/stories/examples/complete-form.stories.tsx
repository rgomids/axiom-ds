import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type FormEvent } from 'react';
import {
  Alert, AlertDescription, AlertTitle, Button, Checkbox, Combobox, DatePicker, FileUpload, FormControl,
  FormDescription, FormField, FormLabel, FormMessage, Input, Label, RadioGroup, RadioGroupItem, Select,
  SelectContent, SelectItem, SelectTrigger, SelectValue, Separator, SuccessState, Switch, Textarea,
} from '../../../../packages/ui/src/react';

const repositories = [
  { value: 'axiom/orion', label: 'axiom/orion' },
  { value: 'axiom/lyra', label: 'axiom/lyra' },
  { value: 'axiom/vega', label: 'axiom/vega' },
  { value: 'axiom/nova', label: 'axiom/nova' },
];
type Errors = Partial<Record<'name' | 'email' | 'repository' | 'runtime' | 'terms', string>>;

function CompleteForm() {
  const initial = { name: '', email: '', repository: null as string | null, runtime: '', approval: 'review', notify: true, terms: false, description: '', due: null as Date | null };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => setValues((v) => ({ ...v, [key]: value }));
  const validate = (): Errors => {
    const next: Errors = {};
    if (!/^[a-z0-9-]{3,}$/.test(values.name)) next.name = 'Mínimo 3 caracteres: minúsculas, números e hífens.';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = 'Informe um e-mail válido.';
    if (!values.repository) next.repository = 'Selecione um repositório.';
    if (!values.runtime) next.runtime = 'Escolha um runtime.';
    if (!values.terms) next.terms = 'É necessário aceitar a política de revisão.';
    return next;
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) {
      setState('error');
      const first = Object.keys(next)[0];
      requestAnimationFrame(() => document.querySelector<HTMLElement>('[data-field="' + first + '"] [data-slot=form-control], [data-field="' + first + '"] button')?.focus());
      return;
    }
    setState('submitting');
    setTimeout(() => setState(values.name === 'erro' ? 'error' : 'success'), 900);
  };
  if (state === 'success')
    return (
      <div className="mx-auto max-w-2xl p-4 sm:p-8">
        <SuccessState variant="bordered" title="Projeto criado (simulado)" description={'O projeto ' + values.name + ' foi registrado localmente.'} actions={<Button variant="outline" onClick={() => setState('idle')}>Criar outro</Button>} />
      </div>
    );
  return (
    <main className="mx-auto max-w-2xl p-4 sm:p-8">
      <form noValidate onSubmit={submit} className="grid gap-6 rounded-card border bg-card p-5 sm:p-8" aria-labelledby="form-title">
        <header className="grid gap-1">
          <h1 id="form-title" className="text-2xl font-semibold tracking-tight">Novo projeto</h1>
          <p className="text-sm text-fg-tertiary">Todos os campos com * são obrigatórios. Envio simulado, sem API.</p>
        </header>
        {state === 'error' && Object.keys(errors).length > 0 && (
          <Alert variant="danger"><AlertTitle>Revise {Object.keys(errors).length} campo(s)</AlertTitle><AlertDescription>{Object.values(errors).join(' ')}</AlertDescription></Alert>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField data-field="name" invalid={!!errors.name} required>
            <FormLabel>Identificador</FormLabel>
            <FormControl><Input value={values.name} onChange={(e) => set('name', e.target.value)} className="font-mono" placeholder="orion" /></FormControl>
            <FormMessage>{errors.name}</FormMessage>
          </FormField>
          <FormField data-field="email" invalid={!!errors.email} required>
            <FormLabel>E-mail de contato</FormLabel>
            <FormControl><Input type="email" value={values.email} onChange={(e) => set('email', e.target.value)} placeholder="voce@exemplo.com" /></FormControl>
            <FormMessage>{errors.email}</FormMessage>
          </FormField>
          <FormField data-field="repository" invalid={!!errors.repository} required>
            <FormLabel>Repositório</FormLabel>
            <FormControl><Combobox options={repositories} value={values.repository} onValueChange={(v) => set('repository', v)} placeholder="Selecione" /></FormControl>
            <FormMessage>{errors.repository}</FormMessage>
          </FormField>
          <FormField data-field="runtime" invalid={!!errors.runtime} required>
            <FormLabel>Runtime</FormLabel>
            <Select value={values.runtime} onValueChange={(v) => set('runtime', v)}>
              <FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl>
              <SelectContent><SelectItem value="codex">Codex</SelectItem><SelectItem value="claude">Claude</SelectItem></SelectContent>
            </Select>
            <FormMessage>{errors.runtime}</FormMessage>
          </FormField>
          <FormField>
            <FormLabel>Prazo</FormLabel>
            <FormControl><DatePicker value={values.due} onValueChange={(d) => set('due', d)} disabledDays={{ before: new Date(2026, 9, 28) }} /></FormControl>
            <FormDescription>Opcional.</FormDescription>
          </FormField>
        </div>
        <FormField>
          <FormLabel>Descrição</FormLabel>
          <FormControl><Textarea value={values.description} onChange={(e) => set('description', e.target.value)} maxLength={280} /></FormControl>
          <FormDescription><span className="font-mono">{values.description.length}/280</span></FormDescription>
        </FormField>
        <fieldset className="grid gap-3">
          <legend className="mb-2 text-sm font-medium">Política de entrega</legend>
          <RadioGroup value={values.approval} onValueChange={(v) => set('approval', v)} aria-label="Política de entrega">
            {[['review', 'Revisão humana'], ['auto', 'Automática']].map(([v, l]) => (
              <div key={v} className="flex items-center gap-2"><RadioGroupItem id={'ap-' + v} value={v} /><Label htmlFor={'ap-' + v}>{l}</Label></div>
            ))}
          </RadioGroup>
        </fieldset>
        <FormField>
          <FormLabel>Anexos</FormLabel>
          <FileUpload multiple accept=".md,.json,text/plain" maxSize={1048576} hint="MD, JSON ou TXT até 1 MB" />
        </FormField>
        <Separator />
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="notify" className="grid gap-0.5">Notificar por e-mail<span className="text-xs font-normal text-fg-tertiary">Ao concluir cada execução.</span></Label>
          <Switch id="notify" checked={values.notify} onCheckedChange={(v) => set('notify', v)} />
        </div>
        <FormField data-field="terms" invalid={!!errors.terms}>
          <div className="flex items-start gap-2">
            <FormControl><Checkbox checked={values.terms} onCheckedChange={(c) => set('terms', c === true)} className="mt-0.5" /></FormControl>
            <FormLabel className="font-normal">Entendo que entregas exigem aprovação humana.</FormLabel>
          </div>
          <FormMessage>{errors.terms}</FormMessage>
        </FormField>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="reset" variant="ghost" onClick={() => { setValues(initial); setErrors({}); setState('idle'); }}>Cancelar</Button>
          <Button type="submit" loading={state === 'submitting'}>Criar projeto</Button>
        </div>
      </form>
    </main>
  );
}

const meta = {
  title: 'Examples/Complete Form',
  component: CompleteForm,
  parameters: { fullBleed: true, docs: { description: { component: 'Formulário completo: Input, Combobox, Select, DatePicker, Textarea com contador, RadioGroup, FileUpload, Switch, Checkbox, validação no envio com resumo de erros e foco no primeiro campo inválido, envio simulado com loading e estado de sucesso. Use "erro" como identificador para simular falha.' } } },
} satisfies Meta<typeof CompleteForm>;
export default meta;
export const Default: StoryObj<typeof meta> = {};

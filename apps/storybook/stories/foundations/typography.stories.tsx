import type { Meta, StoryObj } from '@storybook/react-vite';
import { DocPage, DocSection, TokenName } from '../support/doc';

const scale = [
  {
    name: 'Display',
    className: 'text-4xl font-semibold tracking-tighter sm:text-5xl',
    token: '48/56 · 600 · -0.04em',
    sample: 'Control plane',
  },
  {
    name: 'Heading 1',
    className: 'text-3xl font-semibold tracking-tighter',
    token: '32/40 · 600 · -0.04em',
    sample: 'Executions',
  },
  {
    name: 'Heading 2',
    className: 'text-2xl font-semibold tracking-tight',
    token: '24/32 · 600 · -0.02em',
    sample: 'Current execution',
  },
  {
    name: 'Heading 3',
    className: 'text-xl font-semibold tracking-tight',
    token: '20/28 · 600 · -0.02em',
    sample: 'Workflow stages',
  },
  {
    name: 'Heading 4',
    className: 'text-base font-semibold tracking-tight',
    token: '16/24 · 600 · -0.02em',
    sample: 'Runtime details',
  },
  {
    name: 'Body large',
    className: 'text-base text-fg-secondary',
    token: '16/24 · 400',
    sample: 'Manage workflows, runtimes and delivery evidence in one place.',
  },
  {
    name: 'Body',
    className: 'text-sm text-fg-secondary',
    token: '14/20 · 400',
    sample: 'Default text for interfaces, forms and tables.',
  },
  { name: 'Label', className: 'text-sm font-medium', token: '14/20 · 500', sample: 'Project name' },
  {
    name: 'Caption',
    className: 'text-xs text-fg-tertiary',
    token: '12/16 · 400',
    sample: 'Updated 2 minutes ago',
  },
  {
    name: 'Overline',
    className: 'text-2xs font-medium tracking-caps text-fg-tertiary uppercase',
    token: '11/16 · 500 · 0.08em',
    sample: 'Control plane',
  },
];
const mono = [
  { name: 'Code', className: 'font-mono text-13', token: '13/18 mono', sample: 'npm run validate' },
  { name: 'Identifier', className: 'font-mono text-sm', token: '14/20 mono', sample: 'EX-00271' },
  {
    name: 'Metadata',
    className: 'font-mono text-xs text-fg-tertiary',
    token: '12/16 mono',
    sample: '2026-10-28T14:02:11Z · 03 / 06 stages',
  },
];

function Row({ name, className, token, sample }: (typeof scale)[number]) {
  return (
    <div className="grid gap-2 border-b py-4 sm:grid-cols-[10rem_1fr] sm:items-baseline">
      <div className="grid gap-0.5">
        <span className="text-13 font-medium text-fg">{name}</span>
        <TokenName>{token}</TokenName>
      </div>
      <p className={'min-w-0 break-words text-fg ' + className}>{sample}</p>
    </div>
  );
}

function Typography() {
  return (
    <DocPage
      title="Typography"
      lead="Geist Sans para interface, títulos, formulários e tabelas. Geist Mono para código, IDs, comandos, logs, metadados e timestamps. Fontes servidas localmente (SIL OFL 1.1)."
    >
      <DocSection
        title="Famílias e pesos"
        description="font.sans e font.mono; pesos 400 (regular), 500 (medium), 600 (semibold) e 700 (bold, uso raro)."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-card border bg-surface p-5">
            <p className="text-3xl font-semibold tracking-tighter">Geist Sans</p>
            <p className="mt-2 flex flex-wrap gap-4 text-sm">
              <span className="font-normal">Regular</span>
              <span className="font-medium">Medium</span>
              <span className="font-semibold">Semibold</span>
              <span className="font-bold">Bold</span>
            </p>
          </div>
          <div className="rounded-card border bg-surface p-5">
            <p className="font-mono text-3xl">Geist Mono</p>
            <p className="mt-2 font-mono text-sm text-fg-secondary">0123456789 {'{ } [ ] => !='}</p>
          </div>
        </div>
      </DocSection>
      <DocSection
        title="Escala"
        description="Tamanho/altura de linha · peso · tracking. Títulos usam tracking negativo; overlines, positivo. Em telas estreitas Display reduz para 40px."
      >
        <div>
          {scale.map((row) => (
            <Row key={row.name} {...row} />
          ))}
        </div>
      </DocSection>
      <DocSection
        title="Estilos técnicos"
        description="Use mono para dados que serão copiados, comparados ou lidos caractere a caractere."
      >
        <div>
          {mono.map((row) => (
            <Row key={row.name} {...row} />
          ))}
        </div>
      </DocSection>
    </DocPage>
  );
}

const meta = { title: 'Foundations/Typography', component: Typography } satisfies Meta<
  typeof Typography
>;
export default meta;
export const Scale: StoryObj<typeof meta> = {};

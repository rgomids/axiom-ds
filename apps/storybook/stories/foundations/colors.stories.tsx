import type { Meta, StoryObj } from '@storybook/react-vite';
import { DocPage, DocSection, TokenName } from '../support/doc';

const groups: { title: string; description: string; roles: string[] }[] = [
  {
    title: 'Superfícies',
    description:
      'Camadas separadas por pequenas diferenças de luminosidade. Canvas é o fundo da página; default, cards e painéis; subtle e muted, hover e áreas secundárias; raised, popovers e menus.',
    roles: [
      'surface-canvas',
      'surface-default',
      'surface-subtle',
      'surface-muted',
      'surface-raised',
      'surface-selected',
      'surface-inverse',
    ],
  },
  {
    title: 'Texto',
    description:
      'Primary para títulos e conteúdo; secondary para corpo de apoio; tertiary para metadados e placeholders (≥ 4.5:1); disabled apenas para estados desabilitados.',
    roles: [
      'text-primary',
      'text-secondary',
      'text-tertiary',
      'text-disabled',
      'text-link',
      'text-inverse',
    ],
  },
  {
    title: 'Bordas',
    description:
      'Default e subtle separam superfícies sem chamar atenção. Control (≥ 3:1) delimita campos editáveis; interactive aparece em hover; o foco usa focus-ring.',
    roles: [
      'border-subtle',
      'border-default',
      'border-strong',
      'border-control',
      'border-interactive',
      'focus-ring',
    ],
  },
  {
    title: 'Ações',
    description:
      'Deep Blue no Light e azul claro no Dark. Subtle marca seleção e destaques de baixa ênfase.',
    roles: [
      'action-primary',
      'action-hover',
      'action-active',
      'action-onPrimary',
      'action-subtle',
      'action-onSubtle',
    ],
  },
  {
    title: 'Marca',
    description:
      'Navy e Deep Blue estruturam a identidade. Dourado é assinatura de marca: nunca ação, foco ou status.',
    roles: ['brand-navy', 'brand-deepBlue', 'brand-gold'],
  },
  {
    title: 'Status',
    description:
      'Cada status tem cor de texto/ícone, fundo subtle e borda próprios, independentes da marca.',
    roles: [
      'status-success',
      'status-successSubtle',
      'status-successBorder',
      'status-warning',
      'status-warningSubtle',
      'status-warningBorder',
      'status-danger',
      'status-dangerSubtle',
      'status-dangerBorder',
      'status-info',
      'status-infoSubtle',
      'status-infoBorder',
    ],
  },
];

function Swatch({ role }: { role: string }) {
  const variable = '--axion-semantic-' + role;
  return (
    <div className="grid gap-2">
      <div
        className="h-14 rounded-control border border-border"
        style={{ backgroundColor: 'var(' + variable + ')' }}
      />
      <div className="grid gap-0.5">
        <span className="text-13 font-medium text-fg">{role.replace('-', '.')}</span>
        <TokenName>{variable}</TokenName>
      </div>
    </div>
  );
}

function Colors() {
  return (
    <DocPage
      title="Colors"
      lead="Papéis semânticos idênticos nos temas Light e Dark. Use o seletor Theme da barra de ferramentas para comparar; componentes nunca usam valores hexadecimais diretamente."
    >
      {groups.map((group) => (
        <DocSection key={group.title} title={group.title} description={group.description}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {group.roles.map((role) => (
              <Swatch key={role} role={role} />
            ))}
          </div>
        </DocSection>
      ))}
      <DocSection
        title="Contraste"
        description="Os pares texto/superfície, status/superfície, ação/texto e bordas de controle são verificados em tests/contrast.test.mjs: 4.5:1 para texto e 3:1 para componentes não textuais e foco, nos dois temas."
      >
        <div className="flex flex-wrap gap-3">
          {['text-primary', 'text-secondary', 'text-tertiary', 'text-link'].map((role) => (
            <span
              key={role}
              className="rounded-control border bg-surface px-3 py-2 text-sm"
              style={{ color: 'var(--axion-semantic-' + role + ')' }}
            >
              {role.replace('-', '.')} sobre surface
            </span>
          ))}
        </div>
      </DocSection>
    </DocPage>
  );
}

const meta = {
  title: 'Foundations/Colors',
  component: Colors,
  parameters: {
    docs: {
      description: {
        component:
          'Primitives → semantic → component tokens → CSS variables (--axion-*) → Tailwind (bg-surface, text-fg-secondary, border-input...).',
      },
    },
  },
} satisfies Meta<typeof Colors>;
export default meta;
export const Palette: StoryObj<typeof meta> = {};

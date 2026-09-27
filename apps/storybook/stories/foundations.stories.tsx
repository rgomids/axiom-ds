import type { Meta, StoryObj } from '@storybook/react-vite';
const roles = [
  'surface-default',
  'surface-muted',
  'text-primary',
  'action-primary',
  'status-danger',
  'focus-ring',
];
function Tokens() {
  return (
    <div className="grid gap-8">
      <header className="flex items-center gap-4">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcSet="axiom-symbol-light.svg" />
          <img
            src="axiom-symbol-light.svg"
            alt="Axiom"
            width="64"
            height="56"
            className="rounded-md bg-white p-2"
          />
        </picture>
        <h1 className="text-2xl font-semibold">Axiom Design System</h1>
      </header>
      <section>
        <h2 className="mb-4 text-xl font-semibold">Cores semanticas</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {roles.map((role) => (
            <div key={role}>
              <div
                className="mb-2 h-12 rounded-md border"
                style={{ backgroundColor: 'var(--axion-semantic-' + role + ')' }}
              />
              <code className="font-sans text-xs">{role}</code>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-xl font-semibold">Tipografia</h2>
        <p className="text-2xl">Axiom / Inter 24</p>
        <p className="text-base">Operacoes com inteligencia e evidencia.</p>
        <p className="text-sm text-muted-foreground">Metadados e apoio</p>
      </section>
      <section>
        <h2 className="mb-4 text-xl font-semibold">Espacamento</h2>
        <div className="flex flex-wrap items-end gap-4">
          {[4, 8, 12, 16, 24, 32, 48, 64].map((n) => (
            <div key={n}>
              <div
                className="bg-primary"
                style={{
                  width: 'var(--axion-space-' + n + ')',
                  height: 'var(--axion-space-' + n + ')',
                }}
              />
              <span className="text-xs">{n}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
const meta = {
  title: 'Foundations/Tokens',
  component: Tokens,
  parameters: {
    docs: {
      description: {
        component:
          'DTCG: primitivos -> papeis semanticos -> componentes concretos. O seletor Theme altera os mesmos papeis nos modos claro e escuro, incluindo portais. Espacamento, tipografia, raios, sombras e foco sao versionados no pacote tokens. Penpot explora; Git decide; Storybook demonstra.',
      },
    },
  },
} satisfies Meta<typeof Tokens>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Overview: Story = {};

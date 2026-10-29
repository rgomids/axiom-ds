import { DocPage, DocSection, TokenName } from '../support/doc';

const space = [2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64];
const radii = [
  { name: 'xs', use: 'Badges, Kbd' },
  { name: 'sm', use: 'Controles: Button, Input, Select, menus' },
  { name: 'md', use: 'Cards, painéis, tabelas' },
  { name: 'lg', use: 'Dialog, Sheet, Command' },
  { name: 'full', use: 'Avatar, Switch, indicadores' },
];
const shadows = [
  { name: 'raised', use: 'Elementos levemente destacados (segmented tabs)' },
  { name: 'floating', use: 'Popover, Menu, Select, Tooltip, Toast' },
  { name: 'modal', use: 'Dialog, Sheet, Command palette' },
];
const motion = [
  { name: 'fast', value: '120ms', use: 'hover, cor, saída de overlays' },
  { name: 'base', value: '160ms', use: 'entrada de popovers e tooltips' },
  { name: 'slow', value: '200ms', use: 'sheets, accordion' },
];

export function Spacing() {
  return (
    <DocPage
      title="Spacing"
      lead="Escala de 4px (com 2px e 6px para ajustes finos). Utilitários Tailwind usam --spacing = 4px: p-4 = 16px."
    >
      <DocSection title="Escala">
        <div className="grid gap-2">
          {space.map((n) => (
            <div key={n} className="grid grid-cols-[4rem_1fr] items-center gap-4">
              <TokenName>space.{n}</TokenName>
              <div
                className="h-3 rounded-xs bg-primary"
                style={{ width: 'var(--axion-space-' + n + ')' }}
              />
            </div>
          ))}
        </div>
      </DocSection>
      <DocSection
        title="Densidade"
        description="Alturas de controle: compact 32px, default 36px, large 40px."
      >
        <div className="flex flex-wrap items-end gap-4">
          {['sm', 'md', 'lg'].map((size) => (
            <div key={size} className="grid gap-1 text-center">
              <div
                className="w-20 rounded-control border bg-surface"
                style={{ height: 'var(--axion-control-height-' + size + ')' }}
              />
              <TokenName>control.height.{size}</TokenName>
            </div>
          ))}
        </div>
      </DocSection>
    </DocPage>
  );
}
export function Radius() {
  return (
    <DocPage
      title="Radius"
      lead="Controles 6px, cards 8px, overlays 12px. Não crie raios intermediários por componente."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {radii.map((r) => (
          <div key={r.name} className="grid gap-2">
            <div
              className="h-20 border border-border-strong bg-surface-subtle"
              style={{ borderRadius: 'var(--axion-radius-' + r.name + ')' }}
            />
            <TokenName>radius.{r.name}</TokenName>
            <span className="text-xs text-fg-tertiary">{r.use}</span>
          </div>
        ))}
      </div>
    </DocPage>
  );
}
export function Shadows() {
  return (
    <DocPage
      title="Shadows"
      lead="Sombras mínimas, apenas para camadas flutuantes. Superfícies em repouso usam borda de 1px; no Dark a separação vem da luminosidade."
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {shadows.map((s) => (
          <div key={s.name} className="grid gap-3">
            <div
              className="h-24 rounded-card border bg-surface-raised"
              style={{ boxShadow: 'var(--axion-semantic-elevation-' + s.name + ')' }}
            />
            <TokenName>elevation.{s.name}</TokenName>
            <span className="text-xs text-fg-tertiary">{s.use}</span>
          </div>
        ))}
      </div>
    </DocPage>
  );
}
export function Motion() {
  return (
    <DocPage
      title="Motion"
      lead="Microinterações discretas de 120–200ms com easing padrão cubic-bezier(0.2, 0, 0, 1). prefers-reduced-motion desativa animações e transições."
    >
      <div className="grid gap-3">
        {motion.map((m) => (
          <div
            key={m.name}
            className="grid grid-cols-[6rem_4rem_1fr] items-center gap-4 border-b py-3 text-sm"
          >
            <TokenName>motion.{m.name}</TokenName>
            <span className="font-mono text-xs">{m.value}</span>
            <span className="text-fg-secondary">{m.use}</span>
          </div>
        ))}
      </div>
    </DocPage>
  );
}

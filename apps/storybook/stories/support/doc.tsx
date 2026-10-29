import type { ReactNode } from 'react';

/** Section scaffolding shared by Foundations, Patterns and Examples stories. */
export function DocSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-4">
      <header className="grid gap-1">
        <h2 className="text-lg font-semibold tracking-tight text-fg">{title}</h2>
        {description && <p className="max-w-2xl text-sm text-fg-tertiary">{description}</p>}
      </header>
      {children}
    </section>
  );
}

export function DocPage({
  title,
  lead,
  children,
}: {
  title: string;
  lead: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-10">
      <header className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tighter text-fg">{title}</h1>
        <p className="max-w-2xl text-base text-fg-secondary">{lead}</p>
      </header>
      {children}
    </div>
  );
}

export function TokenName({ children }: { children: ReactNode }) {
  return <code className="font-mono text-xs text-fg-secondary">{children}</code>;
}

/** Builds the component description shown on Docs pages. */
export function describe(parts: {
  purpose: string;
  use?: string;
  avoid?: string;
  keyboard?: string;
  a11y?: string;
  code?: string;
}) {
  return [
    parts.purpose,
    parts.use && '**Quando usar:** ' + parts.use,
    parts.avoid && '**Quando não usar:** ' + parts.avoid,
    parts.keyboard && '**Teclado:** ' + parts.keyboard,
    parts.a11y && '**Acessibilidade:** ' + parts.a11y,
    parts.code && '```tsx\n' + parts.code + '\n```',
  ]
    .filter(Boolean)
    .join('\n\n');
}

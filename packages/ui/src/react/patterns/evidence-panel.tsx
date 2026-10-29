import * as React from 'react';
import { FileText, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../badge';
import { CopyButton } from '../copy-button';

type EvidenceStatus = 'verified' | 'pending' | 'failed';
type EvidenceItem = {
  id: string;
  name: string;
  kind: string;
  /** Content digest, shown truncated in mono with copy. */
  digest?: string;
  size?: string;
  status: EvidenceStatus;
  href?: string;
};

const status: Record<
  EvidenceStatus,
  { icon: React.ReactNode; badge: 'success' | 'warning' | 'danger'; label: string }
> = {
  verified: {
    icon: <ShieldCheck className="text-success" />,
    badge: 'success',
    label: 'Verificada',
  },
  pending: {
    icon: <ShieldQuestion className="text-warning" />,
    badge: 'warning',
    label: 'Pendente',
  },
  failed: { icon: <ShieldAlert className="text-danger" />, badge: 'danger', label: 'Divergente' },
};

/**
 * List of evidence artifacts with verification state and digests.
 * The panel only displays states supplied by the caller; it verifies nothing.
 */
function EvidencePanel({
  items,
  title = 'Evidências',
  actions,
  className,
}: {
  items: EvidenceItem[];
  title?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  const verified = items.filter((i) => i.status === 'verified').length;
  return (
    <section data-slot="evidence-panel" className={cn('rounded-card border bg-card', className)}>
      <header className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-fg">{title}</h3>
          <Badge variant="secondary" size="sm" mono>
            {verified}/{items.length} verificadas
          </Badge>
        </div>
        {actions}
      </header>
      <ul className="divide-y">
        {items.map((item) => {
          const s = status[item.status];
          return (
            <li key={item.id} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-5 py-3">
              <span aria-hidden className="[&_svg]:size-4">
                {s.icon}
              </span>
              <div className="grid min-w-0 flex-1 gap-0.5">
                <span className="flex items-center gap-2 text-sm text-fg">
                  <FileText aria-hidden className="size-3.5 shrink-0 text-fg-tertiary" />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="truncate underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span className="truncate">{item.name}</span>
                  )}
                </span>
                <span className="flex flex-wrap gap-x-2 font-mono text-2xs text-fg-tertiary">
                  <span>{item.kind}</span>
                  {item.size && <span>{item.size}</span>}
                  {item.digest && <span title={item.digest}>{item.digest.slice(0, 19)}…</span>}
                </span>
              </div>
              <Badge variant={s.badge} size="sm">
                {s.label}
              </Badge>
              {item.digest && (
                <CopyButton value={item.digest} label={'Copiar digest de ' + item.name} />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export { EvidencePanel, type EvidenceItem, type EvidenceStatus };

import * as React from 'react';
import { cn } from '../../lib/utils';
import { EmptyState } from '../empty-state';
import { MetricCard } from '../metric-card';
import { Skeleton } from '../skeleton';

type Metric = React.ComponentProps<typeof MetricCard> & { id: string };

/** Responsive KPI grid with a skeleton state. */
function MetricOverview({
  metrics,
  loading = false,
  className,
}: {
  metrics: Metric[];
  loading?: boolean;
  className?: string;
}) {
  return (
    <div
      data-slot="metric-overview"
      aria-busy={loading || undefined}
      className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-4', className)}
    >
      {loading
        ? Array.from({ length: Math.max(metrics.length, 4) }, (_, i) => (
            <div key={i} className="grid gap-3 rounded-card border bg-card p-5">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))
        : metrics.map(({ id, ...metric }) => <MetricCard key={id} {...metric} />)}
    </div>
  );
}

/** First-run dashboard: empty state plus ordered onboarding steps. */
function EmptyDashboard({
  title,
  description,
  steps,
  actions,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  steps: { title: React.ReactNode; description?: React.ReactNode }[];
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      data-slot="empty-dashboard"
      className={cn(
        'grid gap-6 rounded-card border border-dashed bg-surface p-6 md:grid-cols-2 md:p-10',
        className,
      )}
    >
      <EmptyState
        className="justify-items-start text-left [&>div]:justify-items-start"
        size="sm"
        title={title}
        description={description}
        actions={actions}
      />
      <ol className="grid content-center gap-3">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-3">
            <span className="grid size-6 shrink-0 place-items-center rounded-full border bg-surface-subtle font-mono text-2xs text-fg-secondary">
              {index + 1}
            </span>
            <div className="grid gap-0.5">
              <span className="text-sm font-medium text-fg">{step.title}</span>
              {step.description && (
                <span className="text-xs text-fg-tertiary">{step.description}</span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export { MetricOverview, EmptyDashboard };

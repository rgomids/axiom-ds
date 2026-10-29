import * as React from 'react';
import { Check, Circle, Clock, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Spinner } from '../spinner';

type TimelineStatus = 'complete' | 'running' | 'failed' | 'pending' | 'skipped';
type TimelineEvent = {
  id: string;
  title: React.ReactNode;
  status: TimelineStatus;
  /** ISO timestamp or preformatted text, rendered in mono. */
  timestamp?: string;
  duration?: string;
  description?: React.ReactNode;
  /** Extra content: metadata, actions, evidence links. */
  children?: React.ReactNode;
};

const marker: Record<TimelineStatus, { className: string; icon: React.ReactNode; label: string }> =
  {
    complete: {
      className: 'border-success-border bg-success-subtle text-success',
      icon: <Check className="size-3" strokeWidth={2.5} />,
      label: 'concluído',
    },
    running: {
      className: 'border-primary bg-primary-subtle text-primary-subtle-foreground',
      icon: <Spinner className="size-3" />,
      label: 'em execução',
    },
    failed: {
      className: 'border-danger-border bg-danger-subtle text-danger',
      icon: <X className="size-3" strokeWidth={2.5} />,
      label: 'falhou',
    },
    pending: {
      className: 'border-border-strong bg-surface text-fg-tertiary',
      icon: <Clock className="size-3" />,
      label: 'pendente',
    },
    skipped: {
      className: 'border-border bg-surface-subtle text-fg-disabled',
      icon: <Circle className="size-2" />,
      label: 'ignorado',
    },
  };

/** Ordered list of execution events. Presentational: callers supply status and times. */
function ExecutionTimeline({
  events,
  className,
  'aria-label': label = 'Linha do tempo',
  ...props
}: Omit<React.ComponentProps<'ol'>, 'children'> & { events: TimelineEvent[] }) {
  return (
    <ol
      data-slot="execution-timeline"
      aria-label={label}
      className={cn('grid', className)}
      {...props}
    >
      {events.map((event, index) => {
        const m = marker[event.status];
        return (
          <li
            key={event.id}
            data-status={event.status}
            className="relative grid grid-cols-[1.5rem_1fr] gap-x-3 pb-5 last:pb-0"
          >
            {index < events.length - 1 && (
              <span
                aria-hidden
                className="absolute top-6 bottom-0 left-3 w-px -translate-x-1/2 bg-border"
              />
            )}
            <span
              aria-hidden
              className={cn(
                'relative z-10 grid size-6 place-items-center rounded-full border',
                m.className,
              )}
            >
              {m.icon}
            </span>
            <div className="grid min-w-0 gap-1 pt-0.5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <p
                  className={cn(
                    'text-sm font-medium',
                    event.status === 'pending' || event.status === 'skipped'
                      ? 'text-fg-tertiary'
                      : 'text-fg',
                  )}
                >
                  {event.title}
                  <span className="sr-only"> ({m.label})</span>
                </p>
                <p className="font-mono text-xs text-fg-tertiary">
                  {event.timestamp && <time dateTime={event.timestamp}>{event.timestamp}</time>}
                  {event.duration && <span> · {event.duration}</span>}
                </p>
              </div>
              {event.description && <p className="text-sm text-fg-tertiary">{event.description}</p>}
              {event.children}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export { ExecutionTimeline, type TimelineEvent, type TimelineStatus };

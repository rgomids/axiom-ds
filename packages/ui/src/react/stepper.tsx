import * as React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '../lib/utils';

type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';
type Step = {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  status: StepStatus;
};

const statusText: Record<StepStatus, string> = {
  complete: 'concluída',
  current: 'em andamento',
  upcoming: 'pendente',
  error: 'com erro',
};

/** Ordered progress through steps. Status is presentational; the caller owns the flow. */
function Stepper({
  steps,
  orientation = 'horizontal',
  className,
  'aria-label': label = 'Progresso',
  ...props
}: Omit<React.ComponentProps<'ol'>, 'children'> & {
  steps: Step[];
  orientation?: 'horizontal' | 'vertical';
}) {
  return (
    <ol
      data-slot="stepper"
      data-orientation={orientation}
      aria-label={label}
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-col gap-4 sm:flex-row sm:gap-0' : 'flex-col',
        className,
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const last = index === steps.length - 1;
        return (
          <li
            key={step.id}
            data-status={step.status}
            aria-current={step.status === 'current' ? 'step' : undefined}
            className={cn(
              'group relative flex gap-3',
              orientation === 'horizontal' ? 'sm:flex-1 sm:flex-col' : 'pb-6 last:pb-0',
            )}
          >
            <div
              className={cn(
                'flex items-center',
                orientation === 'horizontal' ? 'sm:w-full' : 'flex-col self-stretch',
              )}
            >
              <span
                className={cn(
                  'relative z-10 grid size-6 shrink-0 place-items-center rounded-full border font-mono text-2xs',
                  step.status === 'complete' && 'border-primary bg-primary text-primary-foreground',
                  step.status === 'current' &&
                    'border-primary bg-primary-subtle text-primary-subtle-foreground ring-4 ring-primary-subtle',
                  step.status === 'upcoming' && 'border-border-strong bg-surface text-fg-tertiary',
                  step.status === 'error' && 'border-danger bg-danger text-danger-foreground',
                )}
              >
                {step.status === 'complete' ? (
                  <Check aria-hidden className="size-3.5" strokeWidth={2.5} />
                ) : step.status === 'error' ? (
                  <X aria-hidden className="size-3.5" strokeWidth={2.5} />
                ) : (
                  index + 1
                )}
              </span>
              {!last && (
                <span
                  aria-hidden
                  className={cn(
                    'bg-border',
                    step.status === 'complete' && 'bg-primary',
                    orientation === 'horizontal'
                      ? 'mx-2 hidden h-px flex-1 sm:block'
                      : 'mt-1 w-px flex-1',
                  )}
                />
              )}
            </div>
            <div className={cn('grid gap-0.5', orientation === 'horizontal' && 'sm:pr-4')}>
              <span
                className={cn(
                  'text-sm font-medium',
                  step.status === 'upcoming' ? 'text-fg-tertiary' : 'text-fg',
                )}
              >
                {step.title}
                <span className="sr-only"> ({statusText[step.status]})</span>
              </span>
              {step.description && (
                <span className="text-xs text-fg-tertiary">{step.description}</span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export { Stepper, type Step, type StepStatus };

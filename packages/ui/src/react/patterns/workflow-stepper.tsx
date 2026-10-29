import * as React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../badge';
import { Stepper, type Step } from '../stepper';

/** Stepper with a stage counter header ("03 / 06 stages"), as used in workflow summaries. */
function WorkflowStepper({
  title = 'Workflow',
  steps,
  orientation = 'horizontal',
  className,
}: {
  title?: React.ReactNode;
  steps: Step[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}) {
  const done = steps.filter((s) => s.status === 'complete').length;
  const current = steps.findIndex((s) => s.status === 'current' || s.status === 'error');
  const position = current === -1 ? done : current + 1;
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <section
      data-slot="workflow-stepper"
      className={cn('grid gap-4 rounded-card border bg-card p-5', className)}
    >
      <header className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold text-fg">{title}</h3>
        <Badge variant="subtle" mono>
          {pad(position)} / {pad(steps.length)} stages
        </Badge>
      </header>
      <Stepper
        steps={steps}
        orientation={orientation}
        aria-label={typeof title === 'string' ? title : 'Workflow'}
      />
    </section>
  );
}

export { WorkflowStepper };

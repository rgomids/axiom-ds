'use client';

import * as React from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';
import { cn } from '../lib/utils';

const tones = {
  default: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
} as const;

/** Determinate progress (0–100). Pass `value={null}` for indeterminate. Needs an accessible name. */
function Progress({
  className,
  value,
  tone = 'default',
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { tone?: keyof typeof tones }) {
  const indeterminate = value === null || value === undefined;
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      className={cn(
        'relative h-1.5 w-full overflow-hidden rounded-full bg-surface-muted',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          'h-full rounded-full transition-transform duration-(--axion-motion-slow)',
          tones[tone],
          indeterminate && 'w-1/3 animate-indeterminate',
        )}
        style={
          indeterminate
            ? undefined
            : { width: '100%', transform: `translateX(-${100 - (value ?? 0)}%)` }
        }
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };

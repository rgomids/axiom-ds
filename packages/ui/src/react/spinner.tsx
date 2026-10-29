import * as React from 'react';
import { cn } from '../lib/utils';

type SpinnerProps = React.ComponentProps<'svg'> & {
  /** Accessible label. Omit (and pass aria-hidden) when a parent already announces progress. */
  label?: string;
};

function Spinner({ className, label, ...props }: SpinnerProps) {
  return (
    <svg
      data-slot="spinner"
      viewBox="0 0 16 16"
      fill="none"
      role={label ? 'status' : undefined}
      aria-label={label}
      className={cn('size-4 shrink-0 animate-spin text-current', className)}
      {...props}
    >
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
      <path
        d="M14.25 8A6.25 6.25 0 0 0 8 1.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { Spinner, type SpinnerProps };

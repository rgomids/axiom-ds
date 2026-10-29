import * as React from 'react';
import { cn } from '../lib/utils';

const tones = {
  running: { dot: 'bg-success', pulse: true },
  success: { dot: 'bg-success', pulse: false },
  warning: { dot: 'bg-warning', pulse: false },
  danger: { dot: 'bg-danger', pulse: false },
  info: { dot: 'bg-info', pulse: false },
  pending: { dot: 'bg-border-control', pulse: false },
  neutral: { dot: 'bg-fg-tertiary', pulse: false },
} as const;

type StatusBadgeProps = React.ComponentProps<'span'> & {
  status: keyof typeof tones;
  /** Uses Geist Mono for the label (default), matching technical metadata. */
  mono?: boolean;
};

/** Dot + label for operational state. The text, not the color, carries the meaning. */
function StatusBadge({ status, mono = true, className, children, ...props }: StatusBadgeProps) {
  const tone = tones[status];
  return (
    <span
      data-slot="status-badge"
      data-status={status}
      className={cn(
        'inline-flex items-center gap-2 text-xs text-fg-secondary',
        mono && 'font-mono',
        className,
      )}
      {...props}
    >
      <span aria-hidden className="relative flex size-2">
        {tone.pulse && (
          <span className={cn('absolute inset-0 animate-ping rounded-full opacity-60', tone.dot)} />
        )}
        <span className={cn('relative size-2 rounded-full', tone.dot)} />
      </span>
      {children}
    </span>
  );
}

export { StatusBadge, type StatusBadgeProps };

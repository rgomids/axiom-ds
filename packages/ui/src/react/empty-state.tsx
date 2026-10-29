import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertTriangle, CheckCircle2, Inbox } from 'lucide-react';
import { cn } from '../lib/utils';
import { Spinner } from './spinner';

const stateVariants = cva('grid justify-items-center gap-3 text-center', {
  variants: {
    variant: { default: '', bordered: 'rounded-card border border-dashed bg-surface' },
    size: { sm: 'px-4 py-6', default: 'px-6 py-10', lg: 'px-8 py-16' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});
const iconTones = {
  neutral: 'bg-surface-subtle text-fg-secondary',
  danger: 'border-danger-border bg-danger-subtle text-danger',
  success: 'border-success-border bg-success-subtle text-success',
} as const;

type StateProps = Omit<React.ComponentProps<'div'>, 'title'> &
  VariantProps<typeof stateVariants> & {
    icon?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    /** Buttons or links rendered under the text. */
    actions?: React.ReactNode;
  };

function StateBase({
  icon,
  title,
  description,
  actions,
  tone = 'neutral',
  variant,
  size,
  className,
  ...props
}: StateProps & { tone?: keyof typeof iconTones }) {
  return (
    <div className={cn(stateVariants({ variant, size }), className)} {...props}>
      {icon && (
        <span
          aria-hidden
          className={cn(
            'grid size-10 place-items-center rounded-card border [&_svg]:size-5',
            iconTones[tone],
          )}
        >
          {icon}
        </span>
      )}
      <div className="grid max-w-sm gap-1">
        <p className="text-sm font-semibold text-fg">{title}</p>
        {description && <p className="text-sm text-fg-tertiary">{description}</p>}
      </div>
      {actions && <div className="mt-1 flex flex-wrap justify-center gap-2">{actions}</div>}
    </div>
  );
}

/** No data yet, or no results for the current filters. */
function EmptyState({ icon = <Inbox />, ...props }: StateProps) {
  return <StateBase data-slot="empty-state" icon={icon} {...props} />;
}
/** Recoverable failure: explain what happened and offer a retry. */
function ErrorState({ icon = <AlertTriangle />, ...props }: StateProps) {
  return <StateBase data-slot="error-state" role="alert" tone="danger" icon={icon} {...props} />;
}
/** Completion confirmation for a flow. */
function SuccessState({ icon = <CheckCircle2 />, ...props }: StateProps) {
  return (
    <StateBase data-slot="success-state" role="status" tone="success" icon={icon} {...props} />
  );
}

/** Inline or block loading indicator with a live, visible label. */
function LoadingIndicator({
  label = 'Carregando…',
  layout = 'inline',
  className,
  ...props
}: React.ComponentProps<'div'> & { label?: string; layout?: 'inline' | 'block' }) {
  return (
    <div
      data-slot="loading-indicator"
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-center gap-2 text-sm text-fg-tertiary',
        layout === 'block' && 'flex-col justify-center gap-3 py-10',
        className,
      )}
      {...props}
    >
      <Spinner aria-hidden className={layout === 'block' ? 'size-5' : 'size-4'} />
      <span>{label}</span>
    </div>
  );
}

export { EmptyState, ErrorState, SuccessState, LoadingIndicator, type StateProps };

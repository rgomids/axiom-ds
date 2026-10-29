import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertTriangle, CheckCircle2, Info, OctagonAlert, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';

const alertVariants = cva(
  'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-card border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5',
  {
    variants: {
      variant: {
        default: 'bg-card text-fg [&>svg]:text-fg-secondary',
        info: 'border-info-border bg-info-subtle text-fg [&>svg]:text-info',
        success: 'border-success-border bg-success-subtle text-fg [&>svg]:text-success',
        warning: 'border-warning-border bg-warning-subtle text-fg [&>svg]:text-warning',
        danger: 'border-danger-border bg-danger-subtle text-fg [&>svg]:text-danger',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);
const icons = {
  default: Info,
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: OctagonAlert,
};

/**
 * Inline, contextual message. `danger`/`warning` use role="alert"; others role="status".
 * Pass `icon={false}` to hide the default icon.
 */
function Alert({
  className,
  variant = 'default',
  icon,
  children,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof alertVariants> & { icon?: React.ReactNode | false }) {
  const Icon = icons[variant ?? 'default'];
  return (
    <div
      data-slot="alert"
      role={variant === 'danger' || variant === 'warning' ? 'alert' : 'status'}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {icon === false ? null : (icon ?? <Icon aria-hidden />)}
      {children}
    </div>
  );
}
function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn('col-start-2 font-medium tracking-tight', className)}
      {...props}
    />
  );
}
function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('col-start-2 grid gap-1 text-fg-secondary [&_p]:leading-relaxed', className)}
      {...props}
    />
  );
}

/** Full-width, page-level announcement with optional action and dismiss. */
function Banner({
  variant = 'info',
  action,
  onDismiss,
  dismissLabel = 'Dispensar aviso',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  variant?: 'info' | 'success' | 'warning' | 'danger' | 'brand';
  action?: React.ReactNode;
  onDismiss?: () => void;
  dismissLabel?: string;
}) {
  return (
    <div
      data-slot="banner"
      data-variant={variant}
      role={variant === 'danger' || variant === 'warning' ? 'alert' : 'status'}
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-2 border-b px-4 py-2.5 text-sm text-fg',
        variant === 'info' && 'border-info-border bg-info-subtle',
        variant === 'success' && 'border-success-border bg-success-subtle',
        variant === 'warning' && 'border-warning-border bg-warning-subtle',
        variant === 'danger' && 'border-danger-border bg-danger-subtle',
        variant === 'brand' && 'border-border bg-surface',
        className,
      )}
      {...props}
    >
      {variant === 'brand' && <span aria-hidden className="size-1.5 rotate-45 bg-brand-gold" />}
      <div className="min-w-0 flex-1">{children}</div>
      {action}
      {onDismiss && (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className={cn(
            'grid size-6 cursor-pointer place-items-center rounded-xs text-fg-secondary hover:bg-surface-muted hover:text-fg',
            focusRing,
          )}
        >
          <X aria-hidden className="size-4" />
        </button>
      )}
    </div>
  );
}

export { Alert, AlertTitle, AlertDescription, Banner, alertVariants };

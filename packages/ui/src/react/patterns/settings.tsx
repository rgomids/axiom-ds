import * as React from 'react';
import { cn } from '../../lib/utils';

/** Two-column settings block: title/description left, controls right; stacks on mobile. */
function SettingsSection({
  title,
  description,
  footer,
  tone = 'default',
  className,
  children,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  tone?: 'default' | 'danger';
  className?: string;
  children: React.ReactNode;
}) {
  const id = React.useId();
  return (
    <section
      data-slot="settings-section"
      aria-labelledby={id}
      className={cn(
        'overflow-hidden rounded-card border bg-card',
        tone === 'danger' && 'border-danger-border',
        className,
      )}
    >
      <div className="grid gap-6 p-5 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10 md:p-6">
        <div className="grid content-start gap-1">
          <h2
            id={id}
            className={cn('text-sm font-semibold', tone === 'danger' ? 'text-danger' : 'text-fg')}
          >
            {title}
          </h2>
          {description && <p className="text-sm text-fg-tertiary">{description}</p>}
        </div>
        <div className="grid min-w-0 gap-5">{children}</div>
      </div>
      {footer && (
        <div
          className={cn(
            'flex flex-wrap items-center justify-end gap-2 border-t bg-surface-subtle px-5 py-3 md:px-6',
            tone === 'danger' && 'bg-danger-subtle',
          )}
        >
          {footer}
        </div>
      )}
    </section>
  );
}

/** Label + description on the left and a control (Switch) on the right. */
function SettingsRow({
  label,
  description,
  control,
  htmlFor,
}: {
  label: React.ReactNode;
  description?: React.ReactNode;
  control: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div data-slot="settings-row" className="flex items-start justify-between gap-4">
      <div className="grid gap-0.5">
        <label htmlFor={htmlFor} className="text-sm font-medium text-fg">
          {label}
        </label>
        {description && <p className="text-xs text-fg-tertiary">{description}</p>}
      </div>
      <div className="shrink-0 pt-0.5">{control}</div>
    </div>
  );
}

export { SettingsSection, SettingsRow };

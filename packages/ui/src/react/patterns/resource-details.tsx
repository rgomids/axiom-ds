import * as React from 'react';
import { cn } from '../../lib/utils';
import { CopyButton } from '../copy-button';

type ResourceField = {
  label: React.ReactNode;
  value: React.ReactNode;
  /** Render value in Geist Mono (IDs, hashes, timestamps). */
  mono?: boolean;
  /** Plain-text value to copy; shows a copy button when set. */
  copy?: string;
};

/** Key/value details card (description list), e.g. the "Current execution" summary. */
function ResourceDetails({
  title,
  aside,
  fields,
  className,
}: {
  title: React.ReactNode;
  aside?: React.ReactNode;
  fields: ResourceField[];
  className?: string;
}) {
  return (
    <section
      data-slot="resource-details"
      className={cn('overflow-hidden rounded-card border bg-card', className)}
    >
      <header className="flex items-center justify-between gap-3 border-b px-5 py-4">
        <h3 className="text-sm font-semibold text-fg">{title}</h3>
        {aside}
      </header>
      <dl className="m-0 divide-y">
        {fields.map((field, index) => (
          <div key={index} className="flex min-h-12 items-center justify-between gap-4 px-5 py-2.5">
            <dt className="text-sm text-fg-tertiary">{field.label}</dt>
            <dd
              className={cn(
                'm-0 flex min-w-0 items-center gap-1 text-right text-sm text-fg',
                field.mono && 'font-mono text-13',
              )}
            >
              <span className="truncate">{field.value}</span>
              {field.copy && (
                <CopyButton
                  value={field.copy}
                  label={'Copiar ' + (typeof field.label === 'string' ? field.label : 'valor')}
                />
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export { ResourceDetails, type ResourceField };

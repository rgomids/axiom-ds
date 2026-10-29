'use client';

import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { fieldClasses, focusRing } from '../lib/control';
import { Kbd } from './kbd';

type SearchFieldProps = Omit<
  React.ComponentProps<'input'>,
  'type' | 'onChange' | 'value' | 'defaultValue'
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Visible keyboard hint, e.g. "/" or "⌘K". Purely visual; wire the shortcut yourself. */
  shortcut?: string;
  clearLabel?: string;
};

function SearchField({
  className,
  value,
  defaultValue = '',
  onValueChange,
  shortcut,
  clearLabel = 'Limpar busca',
  disabled,
  ...props
}: SearchFieldProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const current = value ?? inner;
  const input = React.useRef<HTMLInputElement>(null);
  const update = (next: string) => {
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };
  return (
    <div data-slot="search-field" className={cn('relative w-full', className)}>
      <Search
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-tertiary"
      />
      <input
        ref={input}
        type="search"
        value={current}
        disabled={disabled}
        onChange={(event) => update(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && current) {
            event.preventDefault();
            update('');
          }
        }}
        className={cn(
          fieldClasses,
          'h-(--axion-component-field-height) pr-9 pl-9 [&::-webkit-search-cancel-button]:appearance-none',
          shortcut && !current && 'pr-12',
        )}
        {...props}
      />
      {current && !disabled ? (
        <button
          type="button"
          aria-label={clearLabel}
          onClick={() => {
            update('');
            input.current?.focus();
          }}
          className={cn(
            'absolute top-1/2 right-2 grid size-6 -translate-y-1/2 cursor-pointer place-items-center rounded-xs text-fg-tertiary hover:bg-surface-subtle hover:text-fg',
            focusRing,
          )}
        >
          <X aria-hidden className="size-3.5" />
        </button>
      ) : (
        shortcut && (
          <Kbd className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2">
            {shortcut}
          </Kbd>
        )
      )}
    </div>
  );
}

export { SearchField, type SearchFieldProps };

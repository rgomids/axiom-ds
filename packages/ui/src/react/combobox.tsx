'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { fieldClasses } from '../lib/control';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type ComboboxOption = { value: string; label: string; description?: string; disabled?: boolean };

type ComboboxProps = {
  options: ComboboxOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
  'aria-label'?: string;
};

/** Searchable single select (autocomplete). Selecting the current value again clears it. */
function Combobox({
  options,
  value,
  defaultValue = null,
  onValueChange,
  placeholder = 'Selecione…',
  searchPlaceholder = 'Buscar…',
  emptyMessage = 'Nenhum resultado.',
  disabled,
  className,
  ...aria
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inner, setInner] = React.useState<string | null>(defaultValue);
  const current = value === undefined ? inner : value;
  const selected = options.find((option) => option.value === current);
  const choose = (next: string | null) => {
    if (value === undefined) setInner(next);
    onValueChange?.(next);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          data-slot="combobox-trigger"
          data-placeholder={selected ? undefined : ''}
          className={cn(
            fieldClasses,
            'flex h-(--axion-component-field-height) cursor-pointer items-center justify-between gap-2 px-3 text-left data-[placeholder]:text-fg-tertiary',
            className,
          )}
          {...aria}
        >
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <ChevronsUpDown aria-hidden className="size-4 shrink-0 text-fg-tertiary" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) min-w-56 p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  keywords={[option.value]}
                  disabled={option.disabled}
                  onSelect={() => choose(option.value === current ? null : option.value)}
                >
                  <Check
                    aria-hidden
                    className={cn('size-4', option.value === current ? 'opacity-100' : 'opacity-0')}
                  />
                  <span className="grid">
                    <span>{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-fg-tertiary">{option.description}</span>
                    )}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox, type ComboboxOption, type ComboboxProps };

'use client';

import * as React from 'react';
import { CalendarDays } from 'lucide-react';
import { cn } from '../lib/utils';
import { fieldClasses } from '../lib/control';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';

type DatePickerProps = {
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Dates that cannot be chosen, e.g. `{ before: new Date() }`. */
  disabledDays?: React.ComponentProps<typeof Calendar>['disabled'];
  format?: (date: Date) => string;
  id?: string;
  className?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
};

const defaultFormat = (date: Date) =>
  new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(
    date,
  );

function DatePicker({
  value,
  defaultValue = null,
  onValueChange,
  placeholder = 'Selecione uma data',
  disabled,
  disabledDays,
  format = defaultFormat,
  className,
  ...aria
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [inner, setInner] = React.useState<Date | null>(defaultValue);
  const current = value === undefined ? inner : value;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          type="button"
          data-slot="date-picker-trigger"
          data-placeholder={current ? undefined : ''}
          className={cn(
            fieldClasses,
            'flex h-(--axion-component-field-height) cursor-pointer items-center gap-2 px-3 text-left data-[placeholder]:text-fg-tertiary',
            className,
          )}
          {...aria}
        >
          <CalendarDays aria-hidden className="size-4 shrink-0 text-fg-tertiary" />
          <span className="truncate">{current ? format(current) : placeholder}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={current ?? undefined}
          defaultMonth={current ?? undefined}
          disabled={disabledDays}
          onSelect={(date) => {
            const next = date ?? null;
            if (value === undefined) setInner(next);
            onValueChange?.(next);
            setOpen(false);
          }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, type DatePickerProps };

'use client';

import * as React from 'react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { ptBR } from 'react-day-picker/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { buttonVariants } from './button';

/** Month grid with full keyboard support (arrows, PageUp/Down, Home/End). Defaults to pt-BR. */
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale = ptBR,
  ...props
}: DayPickerProps) {
  return (
    <DayPicker
      data-slot="calendar"
      locale={locale}
      showOutsideDays={showOutsideDays}
      className={cn('w-fit p-3 text-sm', className)}
      classNames={{
        root: 'relative',
        months: 'relative flex flex-col gap-4 sm:flex-row',
        month: 'grid gap-3',
        nav: 'absolute inset-x-0 top-0 flex items-center justify-between',
        button_previous: cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }), 'z-10'),
        button_next: cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }), 'z-10'),
        month_caption: 'flex h-8 items-center justify-center',
        caption_label: 'text-sm font-medium capitalize',
        month_grid: 'border-collapse',
        weekdays: 'flex',
        weekday: 'w-9 text-center text-xs font-normal text-fg-tertiary capitalize',
        week: 'mt-1 flex',
        day: 'relative size-9 p-0 text-center',
        day_button: cn(
          'grid size-9 cursor-pointer place-items-center rounded-control font-mono text-13 tabular-nums text-fg transition-colors hover:bg-surface-subtle',
          'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        ),
        selected:
          '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary-hover',
        range_middle:
          '[&>button]:rounded-none [&>button]:bg-primary-subtle [&>button]:text-primary-subtle-foreground',
        today: '[&>button]:font-semibold [&>button]:underline [&>button]:underline-offset-4',
        outside: '[&>button]:text-fg-tertiary',
        disabled:
          '[&>button]:pointer-events-none [&>button]:text-fg-disabled [&>button]:line-through',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === 'left' ? (
            <ChevronLeft aria-hidden className="size-4" />
          ) : (
            <ChevronRight aria-hidden className="size-4" />
          ),
      }}
      {...props}
    />
  );
}

export { Calendar };

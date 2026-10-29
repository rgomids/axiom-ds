'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Toggle as TogglePrimitive } from 'radix-ui';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';

const toggleVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-control text-sm font-medium whitespace-nowrap text-fg-secondary transition-colors hover:bg-surface-subtle hover:text-fg disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary-subtle data-[state=on]:text-primary-subtle-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    focusRing,
  ],
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-border-strong bg-surface data-[state=on]:border-primary',
      },
      size: {
        sm: 'h-8 min-w-8 px-2',
        default: 'h-9 min-w-9 px-2.5',
        lg: 'h-10 min-w-10 px-3',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };

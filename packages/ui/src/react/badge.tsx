import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';

const badgeVariants = cva(
  [
    'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-(--axion-component-badge-radius) border font-medium whitespace-nowrap transition-colors [&>svg]:pointer-events-none [&>svg]:size-3',
    focusRing,
  ],
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary-hover',
        secondary: 'border-transparent bg-surface-muted text-fg-secondary [a&]:hover:bg-border',
        outline: 'border-border-strong text-fg [a&]:hover:bg-surface-subtle',
        subtle: 'border-transparent bg-primary-subtle text-primary-subtle-foreground',
        destructive: 'border-transparent bg-danger text-danger-foreground [a&]:hover:bg-danger/90',
        success: 'border-success-border bg-success-subtle text-success',
        warning: 'border-warning-border bg-warning-subtle text-warning',
        danger: 'border-danger-border bg-danger-subtle text-danger',
        info: 'border-info-border bg-info-subtle text-info',
        brand: 'border-transparent bg-brand-gold text-brand-on-gold',
        ghost: 'border-transparent text-fg-secondary [a&]:hover:bg-surface-subtle',
        link: 'border-transparent text-link underline-offset-4 [a&]:hover:underline',
      },
      size: {
        sm: 'h-5 px-1.5 text-2xs',
        default: 'h-6 px-2 text-xs',
      },
      mono: {
        true: 'font-mono font-normal tracking-normal',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      mono: false,
    },
  },
);

function Badge({
  className,
  variant = 'default',
  size = 'default',
  mono = false,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, size, mono }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

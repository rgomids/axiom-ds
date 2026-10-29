import * as React from 'react';
import { Slot } from 'radix-ui';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';

function Breadcrumb({
  'aria-label': label = 'Navegação estrutural',
  ...props
}: React.ComponentProps<'nav'>) {
  return <nav data-slot="breadcrumb" aria-label={label} {...props} />;
}
function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        'flex flex-wrap items-center gap-1.5 text-sm break-words text-fg-tertiary',
        className,
      )}
      {...props}
    />
  );
}
function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  );
}
function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'a';
  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn('rounded-xs transition-colors hover:text-fg', focusRing, className)}
      {...props}
    />
  );
}
function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn('font-medium text-fg', className)}
      {...props}
    />
  );
}
function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden
      className={cn('text-fg-disabled [&>svg]:size-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}
function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      className={cn('flex size-6 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal aria-hidden className="size-4" />
      <span className="sr-only">Mais níveis</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

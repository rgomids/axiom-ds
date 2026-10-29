'use client';

import * as React from 'react';
import { NavigationMenu as Primitive } from 'radix-ui';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';

function NavigationMenu({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root
      data-slot="navigation-menu"
      className={cn('relative flex max-w-max flex-1 items-center justify-center', className)}
      {...props}
    >
      {children}
      <div className="absolute top-full left-0 isolate z-50 flex justify-center">
        <Primitive.Viewport className="relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full origin-top-left overflow-hidden rounded-card border bg-popover text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in md:w-(--radix-navigation-menu-viewport-width)" />
      </div>
    </Primitive.Root>
  );
}
function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof Primitive.List>) {
  return (
    <Primitive.List
      data-slot="navigation-menu-list"
      className={cn('flex flex-1 list-none items-center justify-center gap-1', className)}
      {...props}
    />
  );
}
function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item
      data-slot="navigation-menu-item"
      className={cn('relative', className)}
      {...props}
    />
  );
}
const navigationMenuTriggerStyle = cn(
  'inline-flex h-8 w-max cursor-pointer items-center justify-center gap-1 rounded-control px-3 text-sm font-medium text-fg-secondary transition-colors hover:bg-surface-subtle hover:text-fg data-[active]:text-fg data-[state=open]:bg-surface-subtle data-[state=open]:text-fg',
  focusRing,
);
function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Primitive.Trigger>) {
  return (
    <Primitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle, 'group', className)}
      {...props}
    >
      {children}
      <ChevronDown
        aria-hidden
        className="size-3.5 text-fg-tertiary transition-transform group-data-[state=open]:rotate-180"
      />
    </Primitive.Trigger>
  );
}
function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Content
      data-slot="navigation-menu-content"
      className={cn('top-0 left-0 w-full p-2 md:absolute md:w-auto', className)}
      {...props}
    />
  );
}
function NavigationMenuLink({ className, ...props }: React.ComponentProps<typeof Primitive.Link>) {
  return (
    <Primitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        'flex flex-col gap-1 rounded-control p-2 text-sm transition-colors hover:bg-surface-subtle data-[active]:bg-surface-muted',
        focusRing,
        className,
      )}
      {...props}
    />
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
};

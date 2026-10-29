import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';

/** Vertical app navigation. Static and composable; collapse/responsive behavior is owned by the shell. */
function Sidebar({
  className,
  'aria-label': label = 'Navegação principal',
  ...props
}: React.ComponentProps<'nav'>) {
  return (
    <nav
      data-slot="sidebar"
      aria-label={label}
      className={cn('flex h-full w-60 shrink-0 flex-col border-r bg-canvas text-sm', className)}
      {...props}
    />
  );
}
function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn('flex h-14 items-center gap-2 border-b px-4', className)}
      {...props}
    />
  );
}
function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn('flex flex-1 flex-col gap-4 overflow-y-auto p-2', className)}
      {...props}
    />
  );
}
function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-footer" className={cn('border-t p-2', className)} {...props} />;
}
function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sidebar-group" className={cn('grid gap-0.5', className)} {...props} />;
}
function SidebarGroupLabel({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="sidebar-group-label"
      className={cn(
        'px-2 pb-1 text-2xs font-medium tracking-caps text-fg-tertiary uppercase',
        className,
      )}
      {...props}
    />
  );
}
function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return <ul data-slot="sidebar-menu" className={cn('grid gap-0.5', className)} {...props} />;
}
function SidebarMenuItem(props: React.ComponentProps<'li'>) {
  return <li data-slot="sidebar-menu-item" {...props} />;
}
function SidebarMenuButton({
  asChild,
  active,
  className,
  ...props
}: React.ComponentProps<'a'> & { asChild?: boolean; active?: boolean }) {
  const Comp = asChild ? Slot.Root : 'a';
  return (
    <Comp
      data-slot="sidebar-menu-button"
      data-active={active || undefined}
      aria-current={active ? 'page' : undefined}
      className={cn(
        "flex h-8 w-full cursor-pointer items-center gap-2 rounded-control px-2 text-fg-secondary transition-colors hover:bg-surface-subtle hover:text-fg data-[active]:bg-surface-muted data-[active]:font-medium data-[active]:text-fg [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        focusRing,
        className,
      )}
      {...props}
    />
  );
}
function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="sidebar-menu-badge"
      className={cn('ml-auto font-mono text-2xs text-fg-tertiary', className)}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
};

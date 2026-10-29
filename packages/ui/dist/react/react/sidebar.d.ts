import * as React from 'react';
/** Vertical app navigation. Static and composable; collapse/responsive behavior is owned by the shell. */
declare function Sidebar({ className, 'aria-label': label, ...props }: React.ComponentProps<'nav'>): React.JSX.Element;
declare function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function SidebarContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function SidebarGroupLabel({ className, ...props }: React.ComponentProps<'p'>): React.JSX.Element;
declare function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>): React.JSX.Element;
declare function SidebarMenuItem(props: React.ComponentProps<'li'>): React.JSX.Element;
declare function SidebarMenuButton({ asChild, active, className, ...props }: React.ComponentProps<'a'> & {
    asChild?: boolean;
    active?: boolean;
}): React.JSX.Element;
declare function SidebarMenuBadge({ className, ...props }: React.ComponentProps<'span'>): React.JSX.Element;
export { Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuBadge, };

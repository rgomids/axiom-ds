'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavigationMenu as Primitive } from 'radix-ui';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';
function NavigationMenu({ className, children, ...props }) {
    return (_jsxs(Primitive.Root, { "data-slot": "navigation-menu", className: cn('relative flex max-w-max flex-1 items-center justify-center', className), ...props, children: [children, _jsx("div", { className: "absolute top-full left-0 isolate z-50 flex justify-center", children: _jsx(Primitive.Viewport, { className: "relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full origin-top-left overflow-hidden rounded-card border bg-popover text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in md:w-(--radix-navigation-menu-viewport-width)" }) })] }));
}
function NavigationMenuList({ className, ...props }) {
    return (_jsx(Primitive.List, { "data-slot": "navigation-menu-list", className: cn('flex flex-1 list-none items-center justify-center gap-1', className), ...props }));
}
function NavigationMenuItem({ className, ...props }) {
    return (_jsx(Primitive.Item, { "data-slot": "navigation-menu-item", className: cn('relative', className), ...props }));
}
const navigationMenuTriggerStyle = cn('inline-flex h-8 w-max cursor-pointer items-center justify-center gap-1 rounded-control px-3 text-sm font-medium text-fg-secondary transition-colors hover:bg-surface-subtle hover:text-fg data-[active]:text-fg data-[state=open]:bg-surface-subtle data-[state=open]:text-fg', focusRing);
function NavigationMenuTrigger({ className, children, ...props }) {
    return (_jsxs(Primitive.Trigger, { "data-slot": "navigation-menu-trigger", className: cn(navigationMenuTriggerStyle, 'group', className), ...props, children: [children, _jsx(ChevronDown, { "aria-hidden": true, className: "size-3.5 text-fg-tertiary transition-transform group-data-[state=open]:rotate-180" })] }));
}
function NavigationMenuContent({ className, ...props }) {
    return (_jsx(Primitive.Content, { "data-slot": "navigation-menu-content", className: cn('top-0 left-0 w-full p-2 md:absolute md:w-auto', className), ...props }));
}
function NavigationMenuLink({ className, ...props }) {
    return (_jsx(Primitive.Link, { "data-slot": "navigation-menu-link", className: cn('flex flex-col gap-1 rounded-control p-2 text-sm transition-colors hover:bg-surface-subtle data-[active]:bg-surface-muted', focusRing, className), ...props }));
}
export { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerStyle, };

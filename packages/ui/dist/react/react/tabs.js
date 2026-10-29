'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { Tabs as TabsPrimitive } from 'radix-ui';
function Tabs({ className, orientation = 'horizontal', ...props }) {
    return (_jsx(TabsPrimitive.Root, { "data-slot": "tabs", "data-orientation": orientation, orientation: orientation, className: cn('group/tabs flex gap-4 data-[orientation=horizontal]:flex-col', className), ...props }));
}
const tabsListVariants = cva('group/tabs-list inline-flex w-fit items-center justify-center rounded-control p-0.5 text-fg-tertiary group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none', {
    variants: {
        variant: {
            default: 'bg-surface-muted',
            line: 'w-full justify-start gap-5 border-b bg-transparent p-0 group-data-[orientation=horizontal]/tabs:h-10',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
function TabsList({ className, variant = 'default', ...props }) {
    return (_jsx(TabsPrimitive.List, { "data-slot": "tabs-list", "data-variant": variant, className: cn(tabsListVariants({ variant }), className), ...props }));
}
function TabsTrigger({ className, ...props }) {
    return (_jsx(TabsPrimitive.Trigger, { "data-slot": "tabs-trigger", className: cn("relative inline-flex h-full flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-[calc(var(--axion-radius-sm)-2px)] px-3 text-sm font-medium whitespace-nowrap text-fg-tertiary transition-colors outline-none group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:text-fg-disabled [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", 'group-data-[variant=default]/tabs-list:data-[state=active]:bg-surface group-data-[variant=default]/tabs-list:data-[state=active]:text-fg group-data-[variant=default]/tabs-list:data-[state=active]:shadow-xs', 'group-data-[variant=line]/tabs-list:flex-none group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:px-0 group-data-[variant=line]/tabs-list:data-[state=active]:text-fg', 'after:absolute after:bg-primary after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:-bottom-px group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100', className), ...props }));
}
function TabsContent({ className, ...props }) {
    return (_jsx(TabsPrimitive.Content, { "data-slot": "tabs-content", className: cn('min-w-0 flex-1 text-sm text-fg-secondary outline-none', className), ...props }));
}
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };

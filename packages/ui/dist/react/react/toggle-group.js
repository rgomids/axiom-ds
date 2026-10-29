'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';
import { cn } from '../lib/utils';
import { toggleVariants } from './toggle';
const ToggleGroupContext = React.createContext({
    size: 'default',
    variant: 'default',
});
function ToggleGroup({ className, variant, size, children, ...props }) {
    return (_jsx(ToggleGroupPrimitive.Root, { "data-slot": "toggle-group", "data-variant": variant, className: cn('inline-flex w-fit items-center gap-0.5 rounded-control', variant !== 'outline' && 'bg-surface-muted p-0.5', className), ...props, children: _jsx(ToggleGroupContext.Provider, { value: { variant, size }, children: children }) }));
}
function ToggleGroupItem({ className, children, variant, size, ...props }) {
    const context = React.useContext(ToggleGroupContext);
    return (_jsx(ToggleGroupPrimitive.Item, { "data-slot": "toggle-group-item", className: cn(toggleVariants({ variant: context.variant || variant, size: context.size || size }), context.variant !== 'outline' &&
            'h-8 data-[state=on]:bg-surface data-[state=on]:text-fg data-[state=on]:shadow-xs', className), ...props, children: children }));
}
export { ToggleGroup, ToggleGroupItem };

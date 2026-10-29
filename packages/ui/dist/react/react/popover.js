'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Popover as PopoverPrimitive } from 'radix-ui';
import { cn } from '../lib/utils';
function Popover(props) {
    return _jsx(PopoverPrimitive.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger(props) {
    return _jsx(PopoverPrimitive.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverAnchor(props) {
    return _jsx(PopoverPrimitive.Anchor, { "data-slot": "popover-anchor", ...props });
}
function PopoverContent({ className, align = 'center', sideOffset = 6, ...props }) {
    return (_jsx(PopoverPrimitive.Portal, { children: _jsx(PopoverPrimitive.Content, { "data-slot": "popover-content", align: align, sideOffset: sideOffset, className: cn('z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-card border bg-popover p-4 text-sm text-popover-foreground shadow-md outline-none data-[state=closed]:animate-out data-[state=open]:animate-in', className), ...props }) }));
}
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor };

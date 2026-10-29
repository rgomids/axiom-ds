'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../lib/utils';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
function TooltipProvider({ delayDuration = 0, ...props }) {
    return (_jsx(TooltipPrimitive.Provider, { "data-slot": "tooltip-provider", delayDuration: delayDuration, ...props }));
}
function Tooltip({ ...props }) {
    return _jsx(TooltipPrimitive.Root, { "data-slot": "tooltip", ...props });
}
function TooltipTrigger({ ...props }) {
    return _jsx(TooltipPrimitive.Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({ className, sideOffset = 6, children, ...props }) {
    return (_jsx(TooltipPrimitive.Portal, { children: _jsxs(TooltipPrimitive.Content, { "data-slot": "tooltip-content", sideOffset: sideOffset, className: cn('z-50 w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin) animate-fade-in rounded-control bg-surface-inverse px-2 py-1 text-xs text-balance text-fg-inverse shadow-md data-[state=closed]:animate-fade-out', className), ...props, children: [children, _jsx(TooltipPrimitive.Arrow, { className: "fill-surface-inverse", width: 10, height: 5 })] }) }));
}
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

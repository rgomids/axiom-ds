'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select as SelectPrimitive } from 'radix-ui';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { fieldClasses } from '../lib/control';
import { menuContentClasses, menuItemClasses, menuLabelClasses, menuSeparatorClasses, } from '../lib/menu';
function Select(props) {
    return _jsx(SelectPrimitive.Root, { "data-slot": "select", ...props });
}
function SelectGroup(props) {
    return _jsx(SelectPrimitive.Group, { "data-slot": "select-group", ...props });
}
function SelectValue(props) {
    return _jsx(SelectPrimitive.Value, { "data-slot": "select-value", ...props });
}
function SelectTrigger({ className, size = 'default', children, ...props }) {
    return (_jsxs(SelectPrimitive.Trigger, { "data-slot": "select-trigger", "data-size": size, className: cn(fieldClasses, "flex cursor-pointer items-center justify-between gap-2 px-3 text-left whitespace-nowrap data-[placeholder]:text-fg-tertiary *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", size === 'sm' ? 'h-8' : 'h-(--axion-component-field-height)', className), ...props, children: [children, _jsx(SelectPrimitive.Icon, { asChild: true, children: _jsx(ChevronDown, { "aria-hidden": true, className: "text-fg-tertiary" }) })] }));
}
function SelectContent({ className, children, position = 'popper', ...props }) {
    return (_jsx(SelectPrimitive.Portal, { children: _jsxs(SelectPrimitive.Content, { "data-slot": "select-content", position: position, className: cn(menuContentClasses, 'relative max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin)', position === 'popper' &&
                'w-full min-w-(--radix-select-trigger-width) data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1', className), ...props, children: [_jsx(SelectPrimitive.ScrollUpButton, { className: "flex h-6 items-center justify-center", children: _jsx(ChevronUp, { "aria-hidden": true, className: "size-4" }) }), _jsx(SelectPrimitive.Viewport, { className: cn(position === 'popper' && 'h-(--radix-select-trigger-height) w-full scroll-my-1'), children: children }), _jsx(SelectPrimitive.ScrollDownButton, { className: "flex h-6 items-center justify-center", children: _jsx(ChevronDown, { "aria-hidden": true, className: "size-4" }) })] }) }));
}
function SelectLabel({ className, ...props }) {
    return (_jsx(SelectPrimitive.Label, { "data-slot": "select-label", className: cn(menuLabelClasses, className), ...props }));
}
function SelectItem({ className, children, ...props }) {
    return (_jsxs(SelectPrimitive.Item, { "data-slot": "select-item", className: cn(menuItemClasses, 'w-full pr-8', className), ...props, children: [_jsx("span", { className: "absolute right-2 flex size-4 items-center justify-center", children: _jsx(SelectPrimitive.ItemIndicator, { children: _jsx(Check, { "aria-hidden": true, className: "size-4 text-fg" }) }) }), _jsx(SelectPrimitive.ItemText, { children: children })] }));
}
function SelectSeparator({ className, ...props }) {
    return (_jsx(SelectPrimitive.Separator, { "data-slot": "select-separator", className: cn(menuSeparatorClasses, className), ...props }));
}
export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue, };

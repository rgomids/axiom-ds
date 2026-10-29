'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ContextMenu as Primitive } from 'radix-ui';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '../lib/utils';
import { menuContentClasses, menuItemClasses, menuLabelClasses, menuSeparatorClasses, menuShortcutClasses, } from '../lib/menu';
function ContextMenu(props) {
    return _jsx(Primitive.Root, { "data-slot": "context-menu", ...props });
}
function ContextMenuTrigger(props) {
    return _jsx(Primitive.Trigger, { "data-slot": "context-menu-trigger", ...props });
}
function ContextMenuGroup(props) {
    return _jsx(Primitive.Group, { "data-slot": "context-menu-group", ...props });
}
function ContextMenuSub(props) {
    return _jsx(Primitive.Sub, { "data-slot": "context-menu-sub", ...props });
}
function ContextMenuRadioGroup(props) {
    return _jsx(Primitive.RadioGroup, { "data-slot": "context-menu-radio-group", ...props });
}
function ContextMenuContent({ className, ...props }) {
    return (_jsx(Primitive.Portal, { children: _jsx(Primitive.Content, { "data-slot": "context-menu-content", className: cn(menuContentClasses, 'max-h-(--radix-context-menu-content-available-height) origin-(--radix-context-menu-content-transform-origin)', className), ...props }) }));
}
function ContextMenuItem({ className, inset, variant = 'default', ...props }) {
    return (_jsx(Primitive.Item, { "data-slot": "context-menu-item", "data-inset": inset, "data-variant": variant, className: cn(menuItemClasses, className), ...props }));
}
function ContextMenuCheckboxItem({ className, children, ...props }) {
    return (_jsxs(Primitive.CheckboxItem, { "data-slot": "context-menu-checkbox-item", className: cn(menuItemClasses, 'pl-8', className), ...props, children: [_jsx("span", { className: "pointer-events-none absolute left-2 flex size-4 items-center justify-center", children: _jsx(Primitive.ItemIndicator, { children: _jsx(Check, { "aria-hidden": true, className: "size-4 text-fg" }) }) }), children] }));
}
function ContextMenuRadioItem({ className, children, ...props }) {
    return (_jsxs(Primitive.RadioItem, { "data-slot": "context-menu-radio-item", className: cn(menuItemClasses, 'pl-8', className), ...props, children: [_jsx("span", { className: "pointer-events-none absolute left-2 flex size-4 items-center justify-center", children: _jsx(Primitive.ItemIndicator, { children: _jsx(Circle, { "aria-hidden": true, className: "size-2 fill-current text-fg" }) }) }), children] }));
}
function ContextMenuLabel({ className, inset, ...props }) {
    return (_jsx(Primitive.Label, { "data-slot": "context-menu-label", "data-inset": inset, className: cn(menuLabelClasses, className), ...props }));
}
function ContextMenuSeparator({ className, ...props }) {
    return (_jsx(Primitive.Separator, { "data-slot": "context-menu-separator", className: cn(menuSeparatorClasses, className), ...props }));
}
function ContextMenuShortcut({ className, ...props }) {
    return (_jsx("span", { "data-slot": "context-menu-shortcut", className: cn(menuShortcutClasses, className), ...props }));
}
function ContextMenuSubTrigger({ className, inset, children, ...props }) {
    return (_jsxs(Primitive.SubTrigger, { "data-slot": "context-menu-sub-trigger", "data-inset": inset, className: cn(menuItemClasses, 'data-[state=open]:bg-surface-subtle', className), ...props, children: [children, _jsx(ChevronRight, { "aria-hidden": true, className: "ml-auto size-4" })] }));
}
function ContextMenuSubContent({ className, ...props }) {
    return (_jsx(Primitive.Portal, { children: _jsx(Primitive.SubContent, { "data-slot": "context-menu-sub-content", className: cn(menuContentClasses, 'origin-(--radix-context-menu-content-transform-origin)', className), ...props }) }));
}
export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuGroup, ContextMenuLabel, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, };

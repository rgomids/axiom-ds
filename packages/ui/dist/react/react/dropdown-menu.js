'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DropdownMenu as Primitive } from 'radix-ui';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '../lib/utils';
import { menuContentClasses, menuItemClasses, menuLabelClasses, menuSeparatorClasses, menuShortcutClasses, } from '../lib/menu';
function DropdownMenu(props) {
    return _jsx(Primitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger(props) {
    return _jsx(Primitive.Trigger, { "data-slot": "dropdown-menu-trigger", ...props });
}
function DropdownMenuGroup(props) {
    return _jsx(Primitive.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuSub(props) {
    return _jsx(Primitive.Sub, { "data-slot": "dropdown-menu-sub", ...props });
}
function DropdownMenuRadioGroup(props) {
    return _jsx(Primitive.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...props });
}
function DropdownMenuContent({ className, ...props }) {
    return (_jsx(Primitive.Portal, { children: _jsx(Primitive.Content, { "data-slot": "dropdown-menu-content", sideOffset: 4, className: cn(menuContentClasses, 'max-h-(--radix-dropdown-menu-content-available-height) origin-(--radix-dropdown-menu-content-transform-origin)', className), ...props }) }));
}
function DropdownMenuItem({ className, inset, variant = 'default', ...props }) {
    return (_jsx(Primitive.Item, { "data-slot": "dropdown-menu-item", "data-inset": inset, "data-variant": variant, className: cn(menuItemClasses, className), ...props }));
}
function DropdownMenuCheckboxItem({ className, children, ...props }) {
    return (_jsxs(Primitive.CheckboxItem, { "data-slot": "dropdown-menu-checkbox-item", className: cn(menuItemClasses, 'pl-8', className), ...props, children: [_jsx("span", { className: "pointer-events-none absolute left-2 flex size-4 items-center justify-center", children: _jsx(Primitive.ItemIndicator, { children: _jsx(Check, { "aria-hidden": true, className: "size-4 text-fg" }) }) }), children] }));
}
function DropdownMenuRadioItem({ className, children, ...props }) {
    return (_jsxs(Primitive.RadioItem, { "data-slot": "dropdown-menu-radio-item", className: cn(menuItemClasses, 'pl-8', className), ...props, children: [_jsx("span", { className: "pointer-events-none absolute left-2 flex size-4 items-center justify-center", children: _jsx(Primitive.ItemIndicator, { children: _jsx(Circle, { "aria-hidden": true, className: "size-2 fill-current text-fg" }) }) }), children] }));
}
function DropdownMenuLabel({ className, inset, ...props }) {
    return (_jsx(Primitive.Label, { "data-slot": "dropdown-menu-label", "data-inset": inset, className: cn(menuLabelClasses, className), ...props }));
}
function DropdownMenuSeparator({ className, ...props }) {
    return (_jsx(Primitive.Separator, { "data-slot": "dropdown-menu-separator", className: cn(menuSeparatorClasses, className), ...props }));
}
function DropdownMenuShortcut({ className, ...props }) {
    return (_jsx("span", { "data-slot": "dropdown-menu-shortcut", className: cn(menuShortcutClasses, className), ...props }));
}
function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
    return (_jsxs(Primitive.SubTrigger, { "data-slot": "dropdown-menu-sub-trigger", "data-inset": inset, className: cn(menuItemClasses, 'data-[state=open]:bg-surface-subtle', className), ...props, children: [children, _jsx(ChevronRight, { "aria-hidden": true, className: "ml-auto size-4" })] }));
}
function DropdownMenuSubContent({ className, ...props }) {
    return (_jsx(Primitive.Portal, { children: _jsx(Primitive.SubContent, { "data-slot": "dropdown-menu-sub-content", className: cn(menuContentClasses, 'origin-(--radix-dropdown-menu-content-transform-origin)', className), ...props }) }));
}
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, };

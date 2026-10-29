'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Command as CommandPrimitive, useCommandState } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { commandItemClasses, menuSeparatorClasses, menuShortcutClasses } from '../lib/menu';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from './dialog';
function Command({ className, ...props }) {
    return (_jsx(CommandPrimitive, { "data-slot": "command", className: cn('flex h-full w-full flex-col overflow-hidden rounded-card bg-popover text-popover-foreground', className), ...props }));
}
function CommandDialog({ title = 'Paleta de comandos', description = 'Busque um comando para executar.', children, className, ...props }) {
    return (_jsx(Dialog, { ...props, children: _jsxs(DialogContent, { className: cn('top-[20%] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl', className), showCloseButton: false, children: [_jsx(DialogTitle, { className: "sr-only", children: title }), _jsx(DialogDescription, { className: "sr-only", children: description }), _jsx(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5", children: children })] }) }));
}
function CommandInput({ className, ...props }) {
    return (_jsxs("div", { "data-slot": "command-input-wrapper", className: "flex h-11 items-center gap-2 border-b px-3", children: [_jsx(Search, { "aria-hidden": true, className: "size-4 shrink-0 text-fg-tertiary" }), _jsx(CommandPrimitive.Input, { "data-slot": "command-input", className: cn('flex h-10 w-full bg-transparent text-sm text-fg outline-none placeholder:text-fg-tertiary disabled:cursor-not-allowed disabled:opacity-50', className), ...props })] }));
}
function CommandList({ className, ...props }) {
    return (_jsx(CommandPrimitive.List, { "data-slot": "command-list", className: cn('max-h-80 scroll-py-1 overflow-x-hidden overflow-y-auto p-1', className), ...props }));
}
function CommandEmpty(props) {
    return (_jsx(CommandPrimitive.Empty, { "data-slot": "command-empty", className: "py-6 text-center text-sm text-fg-tertiary", ...props }));
}
function CommandGroup({ className, ...props }) {
    return (_jsx(CommandPrimitive.Group, { "data-slot": "command-group", className: cn('overflow-hidden text-fg [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-fg-tertiary', className), ...props }));
}
/** Decorative divider; hidden while searching. Not a listbox child role (cmdk's separator is). */
function CommandSeparator({ className, ...props }) {
    const searching = useCommandState((state) => Boolean(state.search));
    if (searching)
        return null;
    return (_jsx("div", { "data-slot": "command-separator", role: "none", className: cn(menuSeparatorClasses, className), ...props }));
}
function CommandItem({ className, ...props }) {
    return (_jsx(CommandPrimitive.Item, { "data-slot": "command-item", className: cn(commandItemClasses, className), ...props }));
}
function CommandShortcut({ className, ...props }) {
    return (_jsx("span", { "data-slot": "command-shortcut", className: cn(menuShortcutClasses, className), ...props }));
}
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };

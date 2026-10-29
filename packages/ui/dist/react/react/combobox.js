'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { fieldClasses } from '../lib/control';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
/** Searchable single select (autocomplete). Selecting the current value again clears it. */
function Combobox({ options, value, defaultValue = null, onValueChange, placeholder = 'Selecione…', searchPlaceholder = 'Buscar…', emptyMessage = 'Nenhum resultado.', disabled, className, ...aria }) {
    const [open, setOpen] = React.useState(false);
    const [inner, setInner] = React.useState(defaultValue);
    const current = value === undefined ? inner : value;
    const selected = options.find((option) => option.value === current);
    const choose = (next) => {
        if (value === undefined)
            setInner(next);
        onValueChange?.(next);
        setOpen(false);
    };
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, disabled: disabled, children: _jsxs("button", { type: "button", role: "combobox", "aria-expanded": open, "data-slot": "combobox-trigger", "data-placeholder": selected ? undefined : '', className: cn(fieldClasses, 'flex h-(--axion-component-field-height) cursor-pointer items-center justify-between gap-2 px-3 text-left data-[placeholder]:text-fg-tertiary', className), ...aria, children: [_jsx("span", { className: "truncate", children: selected ? selected.label : placeholder }), _jsx(ChevronsUpDown, { "aria-hidden": true, className: "size-4 shrink-0 text-fg-tertiary" })] }) }), _jsx(PopoverContent, { className: "w-(--radix-popover-trigger-width) min-w-56 p-0", align: "start", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: searchPlaceholder }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: emptyMessage }), _jsx(CommandGroup, { children: options.map((option) => (_jsxs(CommandItem, { value: option.label, keywords: [option.value], disabled: option.disabled, onSelect: () => choose(option.value === current ? null : option.value), children: [_jsx(Check, { "aria-hidden": true, className: cn('size-4', option.value === current ? 'opacity-100' : 'opacity-0') }), _jsxs("span", { className: "grid", children: [_jsx("span", { children: option.label }), option.description && (_jsx("span", { className: "text-xs text-fg-tertiary", children: option.description }))] })] }, option.value))) })] })] }) })] }));
}
export { Combobox };

'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { CalendarDays } from 'lucide-react';
import { cn } from '../lib/utils';
import { fieldClasses } from '../lib/control';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
const defaultFormat = (date) => new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
function DatePicker({ value, defaultValue = null, onValueChange, placeholder = 'Selecione uma data', disabled, disabledDays, format = defaultFormat, className, ...aria }) {
    const [open, setOpen] = React.useState(false);
    const [inner, setInner] = React.useState(defaultValue);
    const current = value === undefined ? inner : value;
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, disabled: disabled, children: _jsxs("button", { type: "button", "data-slot": "date-picker-trigger", "data-placeholder": current ? undefined : '', className: cn(fieldClasses, 'flex h-(--axion-component-field-height) cursor-pointer items-center gap-2 px-3 text-left data-[placeholder]:text-fg-tertiary', className), ...aria, children: [_jsx(CalendarDays, { "aria-hidden": true, className: "size-4 shrink-0 text-fg-tertiary" }), _jsx("span", { className: "truncate", children: current ? format(current) : placeholder })] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: current ?? undefined, defaultMonth: current ?? undefined, disabled: disabledDays, onSelect: (date) => {
                        const next = date ?? null;
                        if (value === undefined)
                            setInner(next);
                        onValueChange?.(next);
                        setOpen(false);
                    }, autoFocus: true }) })] }));
}
export { DatePicker };

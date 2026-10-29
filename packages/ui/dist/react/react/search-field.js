'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { fieldClasses, focusRing } from '../lib/control';
import { Kbd } from './kbd';
function SearchField({ className, value, defaultValue = '', onValueChange, shortcut, clearLabel = 'Limpar busca', disabled, ...props }) {
    const [inner, setInner] = React.useState(defaultValue);
    const current = value ?? inner;
    const input = React.useRef(null);
    const update = (next) => {
        if (value === undefined)
            setInner(next);
        onValueChange?.(next);
    };
    return (_jsxs("div", { "data-slot": "search-field", className: cn('relative w-full', className), children: [_jsx(Search, { "aria-hidden": true, className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-fg-tertiary" }), _jsx("input", { ref: input, type: "search", value: current, disabled: disabled, onChange: (event) => update(event.target.value), onKeyDown: (event) => {
                    if (event.key === 'Escape' && current) {
                        event.preventDefault();
                        update('');
                    }
                }, className: cn(fieldClasses, 'h-(--axion-component-field-height) pr-9 pl-9 [&::-webkit-search-cancel-button]:appearance-none', shortcut && !current && 'pr-12'), ...props }), current && !disabled ? (_jsx("button", { type: "button", "aria-label": clearLabel, onClick: () => {
                    update('');
                    input.current?.focus();
                }, className: cn('absolute top-1/2 right-2 grid size-6 -translate-y-1/2 cursor-pointer place-items-center rounded-xs text-fg-tertiary hover:bg-surface-subtle hover:text-fg', focusRing), children: _jsx(X, { "aria-hidden": true, className: "size-3.5" }) })) : (shortcut && (_jsx(Kbd, { className: "pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2", children: shortcut })))] }));
}
export { SearchField };

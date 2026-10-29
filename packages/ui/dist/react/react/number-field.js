'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { fieldClasses, focusRing } from '../lib/control';
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
/** Numeric input with stepper buttons. Arrow Up/Down step, empty means null. */
function NumberField({ className, value, defaultValue = null, onValueChange, min = -Infinity, max = Infinity, step = 1, disabled, readOnly, decrementLabel = 'Diminuir', incrementLabel = 'Aumentar', ...props }) {
    const [inner, setInner] = React.useState(defaultValue);
    const current = value === undefined ? inner : value;
    const set = (next) => {
        const bounded = next === null || Number.isNaN(next) ? null : clamp(next, min, max);
        if (value === undefined)
            setInner(bounded);
        onValueChange?.(bounded);
    };
    const stepBy = (direction) => 
    // From empty, the first step lands on the lower bound (or 0) instead of skipping it.
    set(current === null
        ? Number.isFinite(min)
            ? min
            : 0
        : Number((current + direction * step).toFixed(10)));
    const buttonClasses = cn('grid h-full w-8 shrink-0 cursor-pointer place-items-center text-fg-tertiary hover:bg-surface-subtle hover:text-fg disabled:cursor-not-allowed disabled:text-fg-disabled disabled:hover:bg-transparent', focusRing);
    const locked = disabled || readOnly;
    return (_jsxs("div", { "data-slot": "number-field", className: cn(fieldClasses, 'flex h-(--axion-component-field-height) items-stretch overflow-hidden p-0 focus-within:border-ring focus-within:ring-1 focus-within:ring-ring has-[input:disabled]:bg-surface-subtle has-[input[aria-invalid=true]]:border-danger', className), children: [_jsx("button", { type: "button", tabIndex: -1, "aria-label": decrementLabel, disabled: locked || (current ?? 0) <= min, onClick: () => stepBy(-1), className: cn(buttonClasses, 'border-r'), children: _jsx(Minus, { "aria-hidden": true, className: "size-3.5" }) }), _jsx("input", { type: "text", inputMode: "decimal", role: "spinbutton", "aria-valuenow": current ?? undefined, "aria-valuemin": Number.isFinite(min) ? min : undefined, "aria-valuemax": Number.isFinite(max) ? max : undefined, value: current ?? '', disabled: disabled, readOnly: readOnly, onChange: (event) => {
                    const raw = event.target.value.trim();
                    if (raw === '' || raw === '-')
                        return set(null);
                    const parsed = Number(raw.replace(',', '.'));
                    if (!Number.isNaN(parsed))
                        set(parsed);
                }, onKeyDown: (event) => {
                    if (locked)
                        return;
                    if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        stepBy(1);
                    }
                    else if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        stepBy(-1);
                    }
                }, className: "min-w-0 flex-1 bg-transparent px-3 text-center font-mono tabular-nums outline-none disabled:cursor-not-allowed", ...props }), _jsx("button", { type: "button", tabIndex: -1, "aria-label": incrementLabel, disabled: locked || (current ?? 0) >= max, onClick: () => stepBy(1), className: cn(buttonClasses, 'border-l'), children: _jsx(Plus, { "aria-hidden": true, className: "size-3.5" }) })] }));
}
export { NumberField };

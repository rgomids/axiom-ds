'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { Check, Minus } from 'lucide-react';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';
function Checkbox({ className, ...props }) {
    return (_jsx(CheckboxPrimitive.Root, { "data-slot": "checkbox", className: cn('peer grid size-4 shrink-0 cursor-pointer place-items-center rounded-xs border border-input bg-surface text-primary-foreground transition-colors hover:border-border-interactive disabled:cursor-not-allowed disabled:border-border-strong disabled:bg-surface-subtle aria-invalid:border-danger data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary disabled:data-[state=checked]:opacity-50', focusRing, className), ...props, children: _jsx(CheckboxPrimitive.Indicator, { "data-slot": "checkbox-indicator", className: "grid place-items-center", children: props.checked === 'indeterminate' ? (_jsx(Minus, { "aria-hidden": true, className: "size-3", strokeWidth: 3 })) : (_jsx(Check, { "aria-hidden": true, className: "size-3", strokeWidth: 3 })) }) }));
}
export { Checkbox };

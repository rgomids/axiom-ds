'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Switch as SwitchPrimitive } from 'radix-ui';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';
function Switch({ className, size = 'default', ...props }) {
    return (_jsx(SwitchPrimitive.Root, { "data-slot": "switch", "data-size": size, className: cn('peer group/switch inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent p-px transition-colors disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-border-control', size === 'sm' ? 'h-4 w-7' : 'h-5 w-9', focusRing, className), ...props, children: _jsx(SwitchPrimitive.Thumb, { "data-slot": "switch-thumb", className: cn('pointer-events-none block rounded-full bg-surface shadow-xs ring-0 transition-transform data-[state=unchecked]:translate-x-0', size === 'sm'
                ? 'size-3 data-[state=checked]:translate-x-3'
                : 'size-4 data-[state=checked]:translate-x-4') }) }));
}
export { Switch };

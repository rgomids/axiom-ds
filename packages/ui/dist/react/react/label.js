'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Label as LabelPrimitive } from 'radix-ui';
import { cn } from '../lib/utils';
function Label({ className, ...props }) {
    return (_jsx(LabelPrimitive.Root, { "data-slot": "label", className: cn('flex items-center gap-2 text-sm leading-5 font-medium text-fg select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:text-fg-disabled peer-disabled:cursor-not-allowed peer-disabled:text-fg-disabled', className), ...props }));
}
export { Label };

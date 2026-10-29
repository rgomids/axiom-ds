'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Slider as SliderPrimitive } from 'radix-ui';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';
function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }) {
    const values = React.useMemo(() => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min]), [value, defaultValue, min]);
    return (_jsxs(SliderPrimitive.Root, { "data-slot": "slider", defaultValue: defaultValue, value: value, min: min, max: max, className: cn('relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col', className), ...props, children: [_jsx(SliderPrimitive.Track, { "data-slot": "slider-track", className: "relative grow overflow-hidden rounded-full bg-surface-muted data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1", children: _jsx(SliderPrimitive.Range, { "data-slot": "slider-range", className: "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" }) }), values.map((_, index) => (_jsx(SliderPrimitive.Thumb, { "data-slot": "slider-thumb", "aria-label": props['aria-label'], className: cn('block size-4 shrink-0 cursor-grab rounded-full border border-primary bg-surface shadow-xs transition-[box-shadow] hover:ring-4 hover:ring-primary-subtle disabled:pointer-events-none', focusRing) }, index)))] }));
}
export { Slider };

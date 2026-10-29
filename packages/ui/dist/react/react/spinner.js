import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../lib/utils';
function Spinner({ className, label, ...props }) {
    return (_jsxs("svg", { "data-slot": "spinner", viewBox: "0 0 16 16", fill: "none", role: label ? 'status' : undefined, "aria-label": label, className: cn('size-4 shrink-0 animate-spin text-current', className), ...props, children: [_jsx("circle", { cx: "8", cy: "8", r: "6.25", stroke: "currentColor", strokeOpacity: "0.25", strokeWidth: "1.5" }), _jsx("path", { d: "M14.25 8A6.25 6.25 0 0 0 8 1.75", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })] }));
}
export { Spinner };

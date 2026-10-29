import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../lib/utils';
const tones = {
    running: { dot: 'bg-success', pulse: true },
    success: { dot: 'bg-success', pulse: false },
    warning: { dot: 'bg-warning', pulse: false },
    danger: { dot: 'bg-danger', pulse: false },
    info: { dot: 'bg-info', pulse: false },
    pending: { dot: 'bg-border-control', pulse: false },
    neutral: { dot: 'bg-fg-tertiary', pulse: false },
};
/** Dot + label for operational state. The text, not the color, carries the meaning. */
function StatusBadge({ status, mono = true, className, children, ...props }) {
    const tone = tones[status];
    return (_jsxs("span", { "data-slot": "status-badge", "data-status": status, className: cn('inline-flex items-center gap-2 text-xs text-fg-secondary', mono && 'font-mono', className), ...props, children: [_jsxs("span", { "aria-hidden": true, className: "relative flex size-2", children: [tone.pulse && (_jsx("span", { className: cn('absolute inset-0 animate-ping rounded-full opacity-60', tone.dot) })), _jsx("span", { className: cn('relative size-2 rounded-full', tone.dot) })] }), children] }));
}
export { StatusBadge };

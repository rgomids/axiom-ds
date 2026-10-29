import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../lib/utils';
function Kbd({ className, ...props }) {
    return (_jsx("kbd", { "data-slot": "kbd", className: cn('inline-flex h-5 min-w-5 items-center justify-center gap-0.5 rounded-xs border border-border-strong bg-surface-subtle px-1 font-mono text-2xs font-medium text-fg-secondary select-none [&_svg:not([class*=size-])]:size-3', className), ...props }));
}
function KbdGroup({ className, ...props }) {
    return (_jsx("span", { "data-slot": "kbd-group", className: cn('inline-flex items-center gap-1', className), ...props }));
}
export { Kbd, KbdGroup };

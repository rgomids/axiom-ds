import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Circle, Clock, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Spinner } from '../spinner';
const marker = {
    complete: {
        className: 'border-success-border bg-success-subtle text-success',
        icon: _jsx(Check, { className: "size-3", strokeWidth: 2.5 }),
        label: 'concluído',
    },
    running: {
        className: 'border-primary bg-primary-subtle text-primary-subtle-foreground',
        icon: _jsx(Spinner, { className: "size-3" }),
        label: 'em execução',
    },
    failed: {
        className: 'border-danger-border bg-danger-subtle text-danger',
        icon: _jsx(X, { className: "size-3", strokeWidth: 2.5 }),
        label: 'falhou',
    },
    pending: {
        className: 'border-border-strong bg-surface text-fg-tertiary',
        icon: _jsx(Clock, { className: "size-3" }),
        label: 'pendente',
    },
    skipped: {
        className: 'border-border bg-surface-subtle text-fg-disabled',
        icon: _jsx(Circle, { className: "size-2" }),
        label: 'ignorado',
    },
};
/** Ordered list of execution events. Presentational: callers supply status and times. */
function ExecutionTimeline({ events, className, 'aria-label': label = 'Linha do tempo', ...props }) {
    return (_jsx("ol", { "data-slot": "execution-timeline", "aria-label": label, className: cn('grid', className), ...props, children: events.map((event, index) => {
            const m = marker[event.status];
            return (_jsxs("li", { "data-status": event.status, className: "relative grid grid-cols-[1.5rem_1fr] gap-x-3 pb-5 last:pb-0", children: [index < events.length - 1 && (_jsx("span", { "aria-hidden": true, className: "absolute top-6 bottom-0 left-3 w-px -translate-x-1/2 bg-border" })), _jsx("span", { "aria-hidden": true, className: cn('relative z-10 grid size-6 place-items-center rounded-full border', m.className), children: m.icon }), _jsxs("div", { className: "grid min-w-0 gap-1 pt-0.5", children: [_jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5", children: [_jsxs("p", { className: cn('text-sm font-medium', event.status === 'pending' || event.status === 'skipped'
                                            ? 'text-fg-tertiary'
                                            : 'text-fg'), children: [event.title, _jsxs("span", { className: "sr-only", children: [" (", m.label, ")"] })] }), _jsxs("p", { className: "font-mono text-xs text-fg-tertiary", children: [event.timestamp && _jsx("time", { dateTime: event.timestamp, children: event.timestamp }), event.duration && _jsxs("span", { children: [" \u00B7 ", event.duration] })] })] }), event.description && _jsx("p", { className: "text-sm text-fg-tertiary", children: event.description }), event.children] })] }, event.id));
        }) }));
}
export { ExecutionTimeline };

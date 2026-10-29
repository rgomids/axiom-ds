import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, X } from 'lucide-react';
import { cn } from '../lib/utils';
const statusText = {
    complete: 'concluída',
    current: 'em andamento',
    upcoming: 'pendente',
    error: 'com erro',
};
/** Ordered progress through steps. Status is presentational; the caller owns the flow. */
function Stepper({ steps, orientation = 'horizontal', className, 'aria-label': label = 'Progresso', ...props }) {
    return (_jsx("ol", { "data-slot": "stepper", "data-orientation": orientation, "aria-label": label, className: cn('flex', orientation === 'horizontal' ? 'flex-col gap-4 sm:flex-row sm:gap-0' : 'flex-col', className), ...props, children: steps.map((step, index) => {
            const last = index === steps.length - 1;
            return (_jsxs("li", { "data-status": step.status, "aria-current": step.status === 'current' ? 'step' : undefined, className: cn('group relative flex gap-3', orientation === 'horizontal' ? 'sm:flex-1 sm:flex-col' : 'pb-6 last:pb-0'), children: [_jsxs("div", { className: cn('flex items-center', orientation === 'horizontal' ? 'sm:w-full' : 'flex-col self-stretch'), children: [_jsx("span", { className: cn('relative z-10 grid size-6 shrink-0 place-items-center rounded-full border font-mono text-2xs', step.status === 'complete' && 'border-primary bg-primary text-primary-foreground', step.status === 'current' &&
                                    'border-primary bg-primary-subtle text-primary-subtle-foreground ring-4 ring-primary-subtle', step.status === 'upcoming' && 'border-border-strong bg-surface text-fg-tertiary', step.status === 'error' && 'border-danger bg-danger text-danger-foreground'), children: step.status === 'complete' ? (_jsx(Check, { "aria-hidden": true, className: "size-3.5", strokeWidth: 2.5 })) : step.status === 'error' ? (_jsx(X, { "aria-hidden": true, className: "size-3.5", strokeWidth: 2.5 })) : (index + 1) }), !last && (_jsx("span", { "aria-hidden": true, className: cn('bg-border', step.status === 'complete' && 'bg-primary', orientation === 'horizontal'
                                    ? 'mx-2 hidden h-px flex-1 sm:block'
                                    : 'mt-1 w-px flex-1') }))] }), _jsxs("div", { className: cn('grid gap-0.5', orientation === 'horizontal' && 'sm:pr-4'), children: [_jsxs("span", { className: cn('text-sm font-medium', step.status === 'upcoming' ? 'text-fg-tertiary' : 'text-fg'), children: [step.title, _jsxs("span", { className: "sr-only", children: [" (", statusText[step.status], ")"] })] }), step.description && (_jsx("span", { className: "text-xs text-fg-tertiary", children: step.description }))] })] }, step.id));
        }) }));
}
export { Stepper };

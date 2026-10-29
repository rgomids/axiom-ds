import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cva } from 'class-variance-authority';
import { AlertTriangle, CheckCircle2, Inbox } from 'lucide-react';
import { cn } from '../lib/utils';
import { Spinner } from './spinner';
const stateVariants = cva('grid justify-items-center gap-3 text-center', {
    variants: {
        variant: { default: '', bordered: 'rounded-card border border-dashed bg-surface' },
        size: { sm: 'px-4 py-6', default: 'px-6 py-10', lg: 'px-8 py-16' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
});
const iconTones = {
    neutral: 'bg-surface-subtle text-fg-secondary',
    danger: 'border-danger-border bg-danger-subtle text-danger',
    success: 'border-success-border bg-success-subtle text-success',
};
function StateBase({ icon, title, description, actions, tone = 'neutral', variant, size, className, ...props }) {
    return (_jsxs("div", { className: cn(stateVariants({ variant, size }), className), ...props, children: [icon && (_jsx("span", { "aria-hidden": true, className: cn('grid size-10 place-items-center rounded-card border [&_svg]:size-5', iconTones[tone]), children: icon })), _jsxs("div", { className: "grid max-w-sm gap-1", children: [_jsx("p", { className: "text-sm font-semibold text-fg", children: title }), description && _jsx("p", { className: "text-sm text-fg-tertiary", children: description })] }), actions && _jsx("div", { className: "mt-1 flex flex-wrap justify-center gap-2", children: actions })] }));
}
/** No data yet, or no results for the current filters. */
function EmptyState({ icon = _jsx(Inbox, {}), ...props }) {
    return _jsx(StateBase, { "data-slot": "empty-state", icon: icon, ...props });
}
/** Recoverable failure: explain what happened and offer a retry. */
function ErrorState({ icon = _jsx(AlertTriangle, {}), ...props }) {
    return _jsx(StateBase, { "data-slot": "error-state", role: "alert", tone: "danger", icon: icon, ...props });
}
/** Completion confirmation for a flow. */
function SuccessState({ icon = _jsx(CheckCircle2, {}), ...props }) {
    return (_jsx(StateBase, { "data-slot": "success-state", role: "status", tone: "success", icon: icon, ...props }));
}
/** Inline or block loading indicator with a live, visible label. */
function LoadingIndicator({ label = 'Carregando…', layout = 'inline', className, ...props }) {
    return (_jsxs("div", { "data-slot": "loading-indicator", role: "status", "aria-live": "polite", className: cn('flex items-center gap-2 text-sm text-fg-tertiary', layout === 'block' && 'flex-col justify-center gap-3 py-10', className), ...props, children: [_jsx(Spinner, { "aria-hidden": true, className: layout === 'block' ? 'size-5' : 'size-4' }), _jsx("span", { children: label })] }));
}
export { EmptyState, ErrorState, SuccessState, LoadingIndicator };

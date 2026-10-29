import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../lib/utils';
/** Two-column settings block: title/description left, controls right; stacks on mobile. */
function SettingsSection({ title, description, footer, tone = 'default', className, children, }) {
    const id = React.useId();
    return (_jsxs("section", { "data-slot": "settings-section", "aria-labelledby": id, className: cn('overflow-hidden rounded-card border bg-card', tone === 'danger' && 'border-danger-border', className), children: [_jsxs("div", { className: "grid gap-6 p-5 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-10 md:p-6", children: [_jsxs("div", { className: "grid content-start gap-1", children: [_jsx("h2", { id: id, className: cn('text-sm font-semibold', tone === 'danger' ? 'text-danger' : 'text-fg'), children: title }), description && _jsx("p", { className: "text-sm text-fg-tertiary", children: description })] }), _jsx("div", { className: "grid min-w-0 gap-5", children: children })] }), footer && (_jsx("div", { className: cn('flex flex-wrap items-center justify-end gap-2 border-t bg-surface-subtle px-5 py-3 md:px-6', tone === 'danger' && 'bg-danger-subtle'), children: footer }))] }));
}
/** Label + description on the left and a control (Switch) on the right. */
function SettingsRow({ label, description, control, htmlFor, }) {
    return (_jsxs("div", { "data-slot": "settings-row", className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "grid gap-0.5", children: [_jsx("label", { htmlFor: htmlFor, className: "text-sm font-medium text-fg", children: label }), description && _jsx("p", { className: "text-xs text-fg-tertiary", children: description })] }), _jsx("div", { className: "shrink-0 pt-0.5", children: control })] }));
}
export { SettingsSection, SettingsRow };

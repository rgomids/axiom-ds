import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { CopyButton } from '../copy-button';
/** Key/value details card (description list), e.g. the "Current execution" summary. */
function ResourceDetails({ title, aside, fields, className, }) {
    return (_jsxs("section", { "data-slot": "resource-details", className: cn('overflow-hidden rounded-card border bg-card', className), children: [_jsxs("header", { className: "flex items-center justify-between gap-3 border-b px-5 py-4", children: [_jsx("h3", { className: "text-sm font-semibold text-fg", children: title }), aside] }), _jsx("dl", { className: "m-0 divide-y", children: fields.map((field, index) => (_jsxs("div", { className: "flex min-h-12 items-center justify-between gap-4 px-5 py-2.5", children: [_jsx("dt", { className: "text-sm text-fg-tertiary", children: field.label }), _jsxs("dd", { className: cn('m-0 flex min-w-0 items-center gap-1 text-right text-sm text-fg', field.mono && 'font-mono text-13'), children: [_jsx("span", { className: "truncate", children: field.value }), field.copy && (_jsx(CopyButton, { value: field.copy, label: 'Copiar ' + (typeof field.label === 'string' ? field.label : 'valor') }))] })] }, index))) })] }));
}
export { ResourceDetails };

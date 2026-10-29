import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../lib/utils';
import { CopyButton } from './copy-button';
/** Read-only, monospace code with optional header, line numbers and copy. No syntax highlighting. */
function CodeBlock({ code, title, showLineNumbers = false, copyable = true, highlight = [], className, ...props }) {
    const lines = code.replace(/\n$/, '').split('\n');
    return (_jsxs("figure", { "data-slot": "code-block", className: cn('overflow-hidden rounded-card border bg-surface-subtle', className), ...props, children: [(title || copyable) && (_jsxs("figcaption", { className: "flex h-10 items-center justify-between gap-2 border-b bg-surface px-3", children: [_jsx("span", { className: "truncate font-mono text-xs text-fg-tertiary", children: title }), copyable && _jsx(CopyButton, { value: code, label: 'Copiar ' + (title ?? 'código') })] })), _jsx("pre", { tabIndex: 0, className: "overflow-x-auto py-3 font-mono text-13 leading-5 text-fg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring", children: _jsx("code", { className: "grid min-w-fit", children: lines.map((line, index) => (_jsxs("span", { "data-highlighted": highlight.includes(index + 1) || undefined, className: "flex px-4 data-[highlighted]:bg-primary-subtle", children: [showLineNumbers && (_jsx("span", { "aria-hidden": true, className: "mr-4 inline-block w-6 shrink-0 text-right text-fg-tertiary select-none", children: index + 1 })), _jsx("span", { className: "whitespace-pre", children: line || ' ' })] }, index))) }) })] }));
}
export { CodeBlock };

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './button';
/** Page numbers to show around the current one, with null for gaps. */
export function paginationRange(page, pageCount, siblings = 1) {
    const pages = new Set([0, pageCount - 1]);
    for (let i = page - siblings; i <= page + siblings; i++)
        if (i >= 0 && i < pageCount)
            pages.add(i);
    const sorted = [...pages].sort((a, b) => a - b);
    return sorted.flatMap((value, index) => index > 0 && value - sorted[index - 1] > 1 ? [null, value] : [value]);
}
function Pagination({ page, pageCount, onPageChange, compact = false, summary, className, 'aria-label': label = 'Paginação', ...props }) {
    return (_jsxs("nav", { "data-slot": "pagination", "aria-label": label, className: cn('flex flex-wrap items-center justify-between gap-3', className), ...props, children: [_jsx("p", { className: "text-xs text-fg-tertiary", children: summary }), _jsxs("ul", { className: "flex items-center gap-1", children: [_jsx("li", { children: _jsxs(Button, { variant: "ghost", size: "sm", disabled: page <= 0, onClick: () => onPageChange(page - 1), "aria-label": "P\u00E1gina anterior", children: [_jsx(ChevronLeft, { "aria-hidden": true }), _jsx("span", { className: "hidden sm:inline", children: "Anterior" })] }) }), !compact &&
                        paginationRange(page, pageCount).map((value, index) => (_jsx("li", { children: value === null ? (_jsx("span", { "aria-hidden": true, className: "px-1.5 text-fg-tertiary", children: "\u2026" })) : (_jsx(Button, { variant: value === page ? 'outline' : 'ghost', size: "icon-sm", "aria-current": value === page ? 'page' : undefined, "aria-label": 'Página ' + (value + 1), onClick: () => onPageChange(value), className: "font-mono text-xs", children: value + 1 })) }, value ?? 'gap-' + index))), _jsx("li", { children: _jsxs(Button, { variant: "ghost", size: "sm", disabled: page >= pageCount - 1, onClick: () => onPageChange(page + 1), "aria-label": "Pr\u00F3xima p\u00E1gina", children: [_jsx("span", { className: "hidden sm:inline", children: "Pr\u00F3xima" }), _jsx(ChevronRight, { "aria-hidden": true })] }) })] })] }));
}
export { Pagination };

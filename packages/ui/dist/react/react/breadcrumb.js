import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Slot } from 'radix-ui';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';
function Breadcrumb({ 'aria-label': label = 'Navegação estrutural', ...props }) {
    return _jsx("nav", { "data-slot": "breadcrumb", "aria-label": label, ...props });
}
function BreadcrumbList({ className, ...props }) {
    return (_jsx("ol", { "data-slot": "breadcrumb-list", className: cn('flex flex-wrap items-center gap-1.5 text-sm break-words text-fg-tertiary', className), ...props }));
}
function BreadcrumbItem({ className, ...props }) {
    return (_jsx("li", { "data-slot": "breadcrumb-item", className: cn('inline-flex items-center gap-1.5', className), ...props }));
}
function BreadcrumbLink({ asChild, className, ...props }) {
    const Comp = asChild ? Slot.Root : 'a';
    return (_jsx(Comp, { "data-slot": "breadcrumb-link", className: cn('rounded-xs transition-colors hover:text-fg', focusRing, className), ...props }));
}
function BreadcrumbPage({ className, ...props }) {
    return (_jsx("span", { "data-slot": "breadcrumb-page", "aria-current": "page", className: cn('font-medium text-fg', className), ...props }));
}
function BreadcrumbSeparator({ children, className, ...props }) {
    return (_jsx("li", { "data-slot": "breadcrumb-separator", role: "presentation", "aria-hidden": true, className: cn('text-fg-disabled [&>svg]:size-3.5', className), ...props, children: children ?? _jsx(ChevronRight, {}) }));
}
function BreadcrumbEllipsis({ className, ...props }) {
    return (_jsxs("span", { "data-slot": "breadcrumb-ellipsis", className: cn('flex size-6 items-center justify-center', className), ...props, children: [_jsx(MoreHorizontal, { "aria-hidden": true, className: "size-4" }), _jsx("span", { className: "sr-only", children: "Mais n\u00EDveis" })] }));
}
export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis, };

'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Menu } from 'lucide-react';
import { cn } from '../../lib/utils';
import { IconButton } from '../icon-button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../sheet';
/**
 * Application frame: persistent sidebar on wide screens, drawer navigation on
 * narrow ones, sticky header and a scrollable main region with a skip link.
 */
function DashboardShell({ sidebar, header, menuLabel = 'Abrir navegação', className, children, ...props }) {
    const [open, setOpen] = React.useState(false);
    const mainId = React.useId();
    return (_jsxs("div", { "data-slot": "dashboard-shell", className: cn('flex min-h-svh bg-canvas text-fg', className), ...props, children: [_jsx("a", { href: '#' + mainId, className: "sr-only z-50 rounded-control bg-surface px-3 py-2 text-sm focus:not-sr-only focus:fixed focus:top-2 focus:left-2", children: "Pular para o conte\u00FAdo" }), _jsx("div", { className: "hidden lg:flex", children: sidebar }), _jsxs(Sheet, { open: open, onOpenChange: setOpen, children: [_jsxs(SheetContent, { side: "left", className: "w-64 p-0", onClick: (event) => event.target.closest('a') && setOpen(false), children: [_jsx(SheetTitle, { className: "sr-only", children: "Navega\u00E7\u00E3o" }), _jsx(SheetDescription, { className: "sr-only", children: "Se\u00E7\u00F5es da aplica\u00E7\u00E3o" }), sidebar] }), _jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [_jsxs("header", { "data-slot": "dashboard-header", className: "sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-canvas/90 px-4 backdrop-blur sm:px-6", children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(IconButton, { label: menuLabel, className: "lg:hidden", children: _jsx(Menu, { "aria-hidden": true }) }) }), header] }), _jsx("main", { id: mainId, tabIndex: -1, className: "flex-1 px-4 py-6 outline-none sm:px-6 lg:px-8", children: children })] })] })] }));
}
/** Title block for a page inside the shell: breadcrumb/eyebrow, title, description and actions. */
function PageHeader({ eyebrow, title, description, actions, className, ...props }) {
    return (_jsxs("div", { "data-slot": "page-header", className: cn('flex flex-wrap items-end justify-between gap-4 pb-6', className), ...props, children: [_jsxs("div", { className: "grid min-w-0 gap-1", children: [eyebrow && _jsx("div", { className: "text-xs font-medium text-fg-tertiary", children: eyebrow }), _jsx("h1", { className: "text-2xl font-semibold tracking-tight text-fg sm:text-3xl sm:tracking-tighter", children: title }), description && (_jsx("p", { className: "max-w-2xl text-sm text-fg-tertiary sm:text-base", children: description }))] }), actions && _jsx("div", { className: "flex flex-wrap items-center gap-2", children: actions })] }));
}
export { DashboardShell, PageHeader };

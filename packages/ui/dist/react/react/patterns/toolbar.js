import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../button';
/** Row of search, filters and actions. Wraps on narrow screens. */
function Toolbar({ className, 'aria-label': label = 'Filtros', ...props }) {
    return (_jsx("div", { "data-slot": "toolbar", role: "toolbar", "aria-label": label, className: cn('flex flex-wrap items-center gap-2', className), ...props }));
}
function ToolbarSpacer() {
    return _jsx("div", { "aria-hidden": true, className: "hidden flex-1 sm:block" });
}
/** Removable chips summarising active filters, with a "clear all" action. */
function ActiveFilters({ filters, onRemove, onClear, className, }) {
    if (filters.length === 0)
        return null;
    return (_jsxs("div", { "data-slot": "active-filters", className: cn('flex flex-wrap items-center gap-1.5', className), children: [filters.map((filter) => (_jsxs("span", { className: "inline-flex h-6 items-center gap-1 rounded-xs border bg-surface pr-0.5 pl-2 text-xs text-fg-secondary", children: [filter.label, _jsx("button", { type: "button", onClick: () => onRemove(filter.id), "aria-label": 'Remover filtro ' + (typeof filter.label === 'string' ? filter.label : filter.id), className: "grid size-5 cursor-pointer place-items-center rounded-xs hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-ring", children: _jsx(X, { "aria-hidden": true, className: "size-3" }) })] }, filter.id))), onClear && (_jsx(Button, { variant: "link", size: "xs", onClick: onClear, className: "text-xs", children: "Limpar filtros" }))] }));
}
/**
 * Toolbar for a DataTable: search and filters on the left, bulk actions
 * when rows are selected, view actions on the right.
 */
function DataTableToolbar({ search, filters, actions, selectedCount = 0, bulkActions, onClearSelection, className, }) {
    return (_jsx(Toolbar, { className: className, "aria-label": "Ferramentas da tabela", children: selectedCount > 0 ? (_jsxs("div", { className: "flex flex-1 flex-wrap items-center gap-2 rounded-control bg-surface-selected px-2 py-1", role: "status", children: [_jsxs("span", { className: "font-mono text-xs text-fg", children: [selectedCount, " selecionada(s)"] }), onClearSelection && (_jsx(Button, { size: "sm", variant: "ghost", onClick: onClearSelection, children: "Limpar sele\u00E7\u00E3o" })), _jsx("div", { className: "ml-auto flex flex-wrap gap-2", children: bulkActions })] })) : (_jsxs(_Fragment, { children: [search && _jsx("div", { className: "w-full sm:w-72", children: search }), filters, _jsx(ToolbarSpacer, {}), actions] })) }));
}
export { Toolbar, ToolbarSpacer, ActiveFilters, DataTableToolbar };

'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';
import { Checkbox } from './checkbox';
import { EmptyState } from './empty-state';
import { Skeleton } from './skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
/**
 * Presentational table for a `useDataTable` model: sortable headers with
 * aria-sort, page/row selection, loading skeleton and empty state.
 * Compose DataTableToolbar and Pagination around it.
 */
function DataTable({ table, columns, getRowId, label, selectable = false, rowLabel = getRowId, loading = false, empty, className, }) {
    const span = columns.length + (selectable ? 1 : 0);
    return (_jsx("div", { "data-slot": "data-table", className: cn('overflow-hidden rounded-card border bg-card', className), children: _jsxs(Table, { "aria-label": label, "aria-busy": loading || undefined, children: [_jsx(TableHeader, { className: "bg-surface-subtle", children: _jsxs(TableRow, { className: "hover:bg-transparent", children: [selectable && (_jsx(TableHead, { children: _jsx(Checkbox, { "aria-label": "Selecionar todas as linhas da p\u00E1gina", checked: table.pageSelection, onCheckedChange: table.togglePage, disabled: loading || table.rows.length === 0 }) })), columns.map((column) => {
                                const active = table.sort?.key === column.key ? table.sort.direction : null;
                                const Icon = active === 'asc' ? ArrowUp : active === 'desc' ? ArrowDown : ChevronsUpDown;
                                return (_jsx(TableHead, { "aria-sort": column.sortable
                                        ? active === 'asc'
                                            ? 'ascending'
                                            : active === 'desc'
                                                ? 'descending'
                                                : 'none'
                                        : undefined, className: cn(column.align === 'right' && 'text-right', column.className), children: column.sortable ? (_jsxs("button", { type: "button", onClick: () => table.toggleSort(column.key), className: cn('-mx-1.5 inline-flex cursor-pointer items-center gap-1 rounded-xs px-1.5 py-0.5 hover:bg-surface-muted hover:text-fg', active && 'text-fg', focusRing), children: [column.header, _jsx(Icon, { "aria-hidden": true, className: cn('size-3.5', !active && 'opacity-50') })] })) : (column.header) }, column.key));
                            })] }) }), _jsx(TableBody, { children: loading ? (Array.from({ length: 5 }, (_, index) => (_jsx(TableRow, { className: "hover:bg-transparent", children: Array.from({ length: span }, (_, cell) => (_jsx(TableCell, { children: _jsx(Skeleton, { className: "h-4 w-full max-w-32" }) }, cell))) }, index)))) : table.rows.length === 0 ? (_jsx(TableRow, { className: "hover:bg-transparent", children: _jsx(TableCell, { colSpan: span, className: "p-0 whitespace-normal", children: empty ?? (_jsx(EmptyState, { size: "sm", title: "Nenhum resultado", description: "Ajuste a busca ou os filtros." })) }) })) : (table.rows.map((row) => {
                        const id = getRowId(row);
                        const isSelected = table.isSelected(id);
                        return (_jsxs(TableRow, { "data-state": isSelected ? 'selected' : undefined, children: [selectable && (_jsx(TableCell, { children: _jsx(Checkbox, { "aria-label": 'Selecionar ' + rowLabel(row), checked: isSelected, onCheckedChange: () => table.toggleRow(id) }) })), columns.map((column) => (_jsx(TableCell, { className: cn(column.align === 'right' && 'text-right', column.className), children: column.cell ? column.cell(row) : String(column.value?.(row) ?? '') }, column.key)))] }, id));
                    })) })] }) }));
}
export { DataTable };

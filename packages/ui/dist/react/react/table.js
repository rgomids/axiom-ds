import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../lib/utils';
function Table({ className, ...props }) {
    return (_jsx("div", { "data-slot": "table-container", className: "relative w-full overflow-x-auto", children: _jsx("table", { "data-slot": "table", className: cn('w-full caption-bottom text-sm', className), ...props }) }));
}
function TableHeader({ className, ...props }) {
    return _jsx("thead", { "data-slot": "table-header", className: cn('[&_tr]:border-b', className), ...props });
}
function TableBody({ className, ...props }) {
    return (_jsx("tbody", { "data-slot": "table-body", className: cn('[&_tr:last-child]:border-0', className), ...props }));
}
function TableFooter({ className, ...props }) {
    return (_jsx("tfoot", { "data-slot": "table-footer", className: cn('border-t bg-surface-subtle font-medium [&>tr]:last:border-b-0', className), ...props }));
}
function TableRow({ className, ...props }) {
    return (_jsx("tr", { "data-slot": "table-row", className: cn('border-b transition-colors hover:bg-surface-subtle data-[state=selected]:bg-surface-selected', className), ...props }));
}
function TableHead({ className, ...props }) {
    return (_jsx("th", { "data-slot": "table-head", className: cn('h-10 px-3 text-left align-middle text-xs font-medium whitespace-nowrap text-fg-tertiary [&:has([role=checkbox])]:w-10 [&:has([role=checkbox])]:pr-0', className), ...props }));
}
function TableCell({ className, ...props }) {
    return (_jsx("td", { "data-slot": "table-cell", className: cn('px-3 py-2.5 align-middle whitespace-nowrap text-fg [&:has([role=checkbox])]:pr-0', className), ...props }));
}
function TableCaption({ className, ...props }) {
    return (_jsx("caption", { "data-slot": "table-caption", className: cn('mt-4 text-xs text-fg-tertiary', className), ...props }));
}
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };

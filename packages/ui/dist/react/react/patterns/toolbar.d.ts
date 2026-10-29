import * as React from 'react';
/** Row of search, filters and actions. Wraps on narrow screens. */
declare function Toolbar({ className, 'aria-label': label, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function ToolbarSpacer(): React.JSX.Element;
/** Removable chips summarising active filters, with a "clear all" action. */
declare function ActiveFilters({ filters, onRemove, onClear, className, }: {
    filters: {
        id: string;
        label: React.ReactNode;
    }[];
    onRemove: (id: string) => void;
    onClear?: () => void;
    className?: string;
}): React.JSX.Element | null;
/**
 * Toolbar for a DataTable: search and filters on the left, bulk actions
 * when rows are selected, view actions on the right.
 */
declare function DataTableToolbar({ search, filters, actions, selectedCount, bulkActions, onClearSelection, className, }: {
    search?: React.ReactNode;
    filters?: React.ReactNode;
    actions?: React.ReactNode;
    selectedCount?: number;
    bulkActions?: React.ReactNode;
    onClearSelection?: () => void;
    className?: string;
}): React.JSX.Element;
export { Toolbar, ToolbarSpacer, ActiveFilters, DataTableToolbar };

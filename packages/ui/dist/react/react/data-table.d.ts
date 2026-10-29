import * as React from 'react';
import type { DataTableColumn, DataTableModel } from './use-data-table';
type DataTableProps<T, K extends string> = {
    table: DataTableModel<T, K>;
    columns: DataTableColumn<T, K>[];
    getRowId: (row: T) => string;
    /** Accessible name of the table. */
    label: string;
    selectable?: boolean;
    rowLabel?: (row: T) => string;
    loading?: boolean;
    empty?: React.ReactNode;
    className?: string;
};
/**
 * Presentational table for a `useDataTable` model: sortable headers with
 * aria-sort, page/row selection, loading skeleton and empty state.
 * Compose DataTableToolbar and Pagination around it.
 */
declare function DataTable<T, K extends string>({ table, columns, getRowId, label, selectable, rowLabel, loading, empty, className, }: DataTableProps<T, K>): React.JSX.Element;
export { DataTable, type DataTableProps };

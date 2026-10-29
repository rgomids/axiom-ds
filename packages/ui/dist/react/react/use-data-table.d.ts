import * as React from 'react';
export type SortDirection = 'asc' | 'desc';
export type SortState<K extends string> = {
    key: K;
    direction: SortDirection;
} | null;
export type DataTableColumn<T, K extends string = string> = {
    key: K;
    header: React.ReactNode;
    cell?: (row: T) => React.ReactNode;
    /** Value used for sorting and default filtering. */
    value?: (row: T) => string | number | Date | null | undefined;
    sortable?: boolean;
    align?: 'left' | 'right';
    className?: string;
};
type Options<T, K extends string> = {
    data: T[];
    columns: DataTableColumn<T, K>[];
    getRowId: (row: T) => string;
    pageSize?: number;
    initialSort?: SortState<K>;
    /** Custom predicate; defaults to case-insensitive match over column values. */
    filter?: (row: T, query: string) => boolean;
};
/**
 * Headless table model: global filter → sort → paginate, plus row selection.
 * Deliberately small; adopt a table engine only when virtualization, grouping
 * or column pinning become requirements.
 */
export declare function useDataTable<T, K extends string = string>({ data, columns, getRowId, pageSize, initialSort, filter, }: Options<T, K>): {
    rows: T[];
    total: number;
    query: string;
    setQuery: (value: string) => void;
    sort: SortState<K>;
    toggleSort: (key: K) => void;
    page: number;
    pageCount: number;
    setPage: (next: number) => void;
    selected: Set<string>;
    isSelected: (id: string) => boolean;
    toggleRow: (id: string) => void;
    pageSelection: boolean | "indeterminate";
    togglePage: () => void;
    clearSelection: () => void;
};
export type DataTableModel<T, K extends string = string> = ReturnType<typeof useDataTable<T, K>>;
export {};

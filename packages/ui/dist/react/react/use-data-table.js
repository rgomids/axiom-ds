import * as React from 'react';
const compare = (a, b) => {
    if (a == null)
        return b == null ? 0 : 1;
    if (b == null)
        return -1;
    if (a instanceof Date && b instanceof Date)
        return a.getTime() - b.getTime();
    if (typeof a === 'number' && typeof b === 'number')
        return a - b;
    return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
};
/**
 * Headless table model: global filter → sort → paginate, plus row selection.
 * Deliberately small; adopt a table engine only when virtualization, grouping
 * or column pinning become requirements.
 */
export function useDataTable({ data, columns, getRowId, pageSize = 10, initialSort = null, filter, }) {
    const [query, setQueryState] = React.useState('');
    const [sort, setSort] = React.useState(initialSort);
    const [page, setPage] = React.useState(0);
    const [selected, setSelected] = React.useState(() => new Set());
    const filtered = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q)
            return data;
        return data.filter((row) => filter
            ? filter(row, q)
            : columns.some((column) => String(column.value?.(row) ?? '')
                .toLowerCase()
                .includes(q)));
    }, [data, columns, query, filter]);
    const sorted = React.useMemo(() => {
        if (!sort)
            return filtered;
        const column = columns.find((c) => c.key === sort.key);
        if (!column?.value)
            return filtered;
        const factor = sort.direction === 'asc' ? 1 : -1;
        return [...filtered].sort((a, b) => factor * compare(column.value(a), column.value(b)));
    }, [filtered, sort, columns]);
    const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
    const safePage = Math.min(page, pageCount - 1);
    const rows = sorted.slice(safePage * pageSize, safePage * pageSize + pageSize);
    const pageIds = rows.map(getRowId);
    const allOnPage = pageIds.length > 0 && pageIds.every((id) => selected.has(id));
    const someOnPage = pageIds.some((id) => selected.has(id));
    return {
        rows,
        total: sorted.length,
        query,
        setQuery: (value) => {
            setQueryState(value);
            setPage(0);
        },
        sort,
        toggleSort: (key) => setSort((current) => current?.key !== key
            ? { key, direction: 'asc' }
            : current.direction === 'asc'
                ? { key, direction: 'desc' }
                : null),
        page: safePage,
        pageCount,
        setPage: (next) => setPage(Math.max(0, Math.min(pageCount - 1, next))),
        selected,
        isSelected: (id) => selected.has(id),
        toggleRow: (id) => setSelected((current) => {
            const next = new Set(current);
            if (next.has(id))
                next.delete(id);
            else
                next.add(id);
            return next;
        }),
        pageSelection: (allOnPage ? true : someOnPage ? 'indeterminate' : false),
        togglePage: () => setSelected((current) => {
            const next = new Set(current);
            for (const id of pageIds) {
                if (allOnPage)
                    next.delete(id);
                else
                    next.add(id);
            }
            return next;
        }),
        clearSelection: () => setSelected(new Set()),
    };
}

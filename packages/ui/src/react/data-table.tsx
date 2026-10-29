'use client';

import * as React from 'react';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';
import { Checkbox } from './checkbox';
import { EmptyState } from './empty-state';
import { Skeleton } from './skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';
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
function DataTable<T, K extends string>({
  table,
  columns,
  getRowId,
  label,
  selectable = false,
  rowLabel = getRowId,
  loading = false,
  empty,
  className,
}: DataTableProps<T, K>) {
  const span = columns.length + (selectable ? 1 : 0);
  return (
    <div
      data-slot="data-table"
      className={cn('overflow-hidden rounded-card border bg-card', className)}
    >
      <Table aria-label={label} aria-busy={loading || undefined}>
        <TableHeader className="bg-surface-subtle">
          <TableRow className="hover:bg-transparent">
            {selectable && (
              <TableHead>
                <Checkbox
                  aria-label="Selecionar todas as linhas da página"
                  checked={table.pageSelection}
                  onCheckedChange={table.togglePage}
                  disabled={loading || table.rows.length === 0}
                />
              </TableHead>
            )}
            {columns.map((column) => {
              const active = table.sort?.key === column.key ? table.sort.direction : null;
              const Icon =
                active === 'asc' ? ArrowUp : active === 'desc' ? ArrowDown : ChevronsUpDown;
              return (
                <TableHead
                  key={column.key}
                  aria-sort={
                    column.sortable
                      ? active === 'asc'
                        ? 'ascending'
                        : active === 'desc'
                          ? 'descending'
                          : 'none'
                      : undefined
                  }
                  className={cn(column.align === 'right' && 'text-right', column.className)}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => table.toggleSort(column.key)}
                      className={cn(
                        '-mx-1.5 inline-flex cursor-pointer items-center gap-1 rounded-xs px-1.5 py-0.5 hover:bg-surface-muted hover:text-fg',
                        active && 'text-fg',
                        focusRing,
                      )}
                    >
                      {column.header}
                      <Icon aria-hidden className={cn('size-3.5', !active && 'opacity-50')} />
                    </button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }, (_, index) => (
              <TableRow key={index} className="hover:bg-transparent">
                {Array.from({ length: span }, (_, cell) => (
                  <TableCell key={cell}>
                    <Skeleton className="h-4 w-full max-w-32" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.rows.length === 0 ? (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={span} className="p-0 whitespace-normal">
                {empty ?? (
                  <EmptyState
                    size="sm"
                    title="Nenhum resultado"
                    description="Ajuste a busca ou os filtros."
                  />
                )}
              </TableCell>
            </TableRow>
          ) : (
            table.rows.map((row) => {
              const id = getRowId(row);
              const isSelected = table.isSelected(id);
              return (
                <TableRow key={id} data-state={isSelected ? 'selected' : undefined}>
                  {selectable && (
                    <TableCell>
                      <Checkbox
                        aria-label={'Selecionar ' + rowLabel(row)}
                        checked={isSelected}
                        onCheckedChange={() => table.toggleRow(id)}
                      />
                    </TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={cn(column.align === 'right' && 'text-right', column.className)}
                    >
                      {column.cell ? column.cell(row) : String(column.value?.(row) ?? '')}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export { DataTable, type DataTableProps };

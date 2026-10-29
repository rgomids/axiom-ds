import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../button';

/** Row of search, filters and actions. Wraps on narrow screens. */
function Toolbar({
  className,
  'aria-label': label = 'Filtros',
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="toolbar"
      role="toolbar"
      aria-label={label}
      className={cn('flex flex-wrap items-center gap-2', className)}
      {...props}
    />
  );
}
function ToolbarSpacer() {
  return <div aria-hidden className="hidden flex-1 sm:block" />;
}

/** Removable chips summarising active filters, with a "clear all" action. */
function ActiveFilters({
  filters,
  onRemove,
  onClear,
  className,
}: {
  filters: { id: string; label: React.ReactNode }[];
  onRemove: (id: string) => void;
  onClear?: () => void;
  className?: string;
}) {
  if (filters.length === 0) return null;
  return (
    <div
      data-slot="active-filters"
      className={cn('flex flex-wrap items-center gap-1.5', className)}
    >
      {filters.map((filter) => (
        <span
          key={filter.id}
          className="inline-flex h-6 items-center gap-1 rounded-xs border bg-surface pr-0.5 pl-2 text-xs text-fg-secondary"
        >
          {filter.label}
          <button
            type="button"
            onClick={() => onRemove(filter.id)}
            aria-label={
              'Remover filtro ' + (typeof filter.label === 'string' ? filter.label : filter.id)
            }
            className="grid size-5 cursor-pointer place-items-center rounded-xs hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X aria-hidden className="size-3" />
          </button>
        </span>
      ))}
      {onClear && (
        <Button variant="link" size="xs" onClick={onClear} className="text-xs">
          Limpar filtros
        </Button>
      )}
    </div>
  );
}

/**
 * Toolbar for a DataTable: search and filters on the left, bulk actions
 * when rows are selected, view actions on the right.
 */
function DataTableToolbar({
  search,
  filters,
  actions,
  selectedCount = 0,
  bulkActions,
  onClearSelection,
  className,
}: {
  search?: React.ReactNode;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  selectedCount?: number;
  bulkActions?: React.ReactNode;
  onClearSelection?: () => void;
  className?: string;
}) {
  return (
    <Toolbar className={className} aria-label="Ferramentas da tabela">
      {selectedCount > 0 ? (
        <div
          className="flex flex-1 flex-wrap items-center gap-2 rounded-control bg-surface-selected px-2 py-1"
          role="status"
        >
          <span className="font-mono text-xs text-fg">{selectedCount} selecionada(s)</span>
          {onClearSelection && (
            <Button size="sm" variant="ghost" onClick={onClearSelection}>
              Limpar seleção
            </Button>
          )}
          <div className="ml-auto flex flex-wrap gap-2">{bulkActions}</div>
        </div>
      ) : (
        <>
          {search && <div className="w-full sm:w-72">{search}</div>}
          {filters}
          <ToolbarSpacer />
          {actions}
        </>
      )}
    </Toolbar>
  );
}

export { Toolbar, ToolbarSpacer, ActiveFilters, DataTableToolbar };

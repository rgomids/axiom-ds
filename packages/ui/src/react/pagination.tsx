import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './button';

/** Page numbers to show around the current one, with null for gaps. */
export function paginationRange(page: number, pageCount: number, siblings = 1): (number | null)[] {
  const pages = new Set([0, pageCount - 1]);
  for (let i = page - siblings; i <= page + siblings; i++)
    if (i >= 0 && i < pageCount) pages.add(i);
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((value, index) =>
    index > 0 && value - sorted[index - 1] > 1 ? [null, value] : [value],
  );
}

type PaginationProps = Omit<React.ComponentProps<'nav'>, 'onChange'> & {
  /** Zero-based current page. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Hide numbered pages (compact "previous / next" only). */
  compact?: boolean;
  summary?: React.ReactNode;
};

function Pagination({
  page,
  pageCount,
  onPageChange,
  compact = false,
  summary,
  className,
  'aria-label': label = 'Paginação',
  ...props
}: PaginationProps) {
  return (
    <nav
      data-slot="pagination"
      aria-label={label}
      className={cn('flex flex-wrap items-center justify-between gap-3', className)}
      {...props}
    >
      <p className="text-xs text-fg-tertiary">{summary}</p>
      <ul className="flex items-center gap-1">
        <li>
          <Button
            variant="ghost"
            size="sm"
            disabled={page <= 0}
            onClick={() => onPageChange(page - 1)}
            aria-label="Página anterior"
          >
            <ChevronLeft aria-hidden />
            <span className="hidden sm:inline">Anterior</span>
          </Button>
        </li>
        {!compact &&
          paginationRange(page, pageCount).map((value, index) => (
            <li key={value ?? 'gap-' + index}>
              {value === null ? (
                <span aria-hidden className="px-1.5 text-fg-tertiary">
                  …
                </span>
              ) : (
                <Button
                  variant={value === page ? 'outline' : 'ghost'}
                  size="icon-sm"
                  aria-current={value === page ? 'page' : undefined}
                  aria-label={'Página ' + (value + 1)}
                  onClick={() => onPageChange(value)}
                  className="font-mono text-xs"
                >
                  {value + 1}
                </Button>
              )}
            </li>
          ))}
        <li>
          <Button
            variant="ghost"
            size="sm"
            disabled={page >= pageCount - 1}
            onClick={() => onPageChange(page + 1)}
            aria-label="Próxima página"
          >
            <span className="hidden sm:inline">Próxima</span>
            <ChevronRight aria-hidden />
          </Button>
        </li>
      </ul>
    </nav>
  );
}

export { Pagination, type PaginationProps };

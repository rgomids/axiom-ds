import * as React from 'react';
/** Page numbers to show around the current one, with null for gaps. */
export declare function paginationRange(page: number, pageCount: number, siblings?: number): (number | null)[];
type PaginationProps = Omit<React.ComponentProps<'nav'>, 'onChange'> & {
    /** Zero-based current page. */
    page: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    /** Hide numbered pages (compact "previous / next" only). */
    compact?: boolean;
    summary?: React.ReactNode;
};
declare function Pagination({ page, pageCount, onPageChange, compact, summary, className, 'aria-label': label, ...props }: PaginationProps): React.JSX.Element;
export { Pagination, type PaginationProps };

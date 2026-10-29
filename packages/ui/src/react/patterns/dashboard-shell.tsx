'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import { cn } from '../../lib/utils';
import { IconButton } from '../icon-button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../sheet';

type DashboardShellProps = React.ComponentProps<'div'> & {
  /** Sidebar content (usually <Sidebar>). Shown inline from `lg`, in a Sheet below. */
  sidebar: React.ReactNode;
  /** Header content to the right of the mobile menu button. */
  header?: React.ReactNode;
  menuLabel?: string;
};

/**
 * Application frame: persistent sidebar on wide screens, drawer navigation on
 * narrow ones, sticky header and a scrollable main region with a skip link.
 */
function DashboardShell({
  sidebar,
  header,
  menuLabel = 'Abrir navegação',
  className,
  children,
  ...props
}: DashboardShellProps) {
  const [open, setOpen] = React.useState(false);
  const mainId = React.useId();
  return (
    <div
      data-slot="dashboard-shell"
      className={cn('flex min-h-svh bg-canvas text-fg', className)}
      {...props}
    >
      <a
        href={'#' + mainId}
        className="sr-only z-50 rounded-control bg-surface px-3 py-2 text-sm focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Pular para o conteúdo
      </a>
      <div className="hidden lg:flex">{sidebar}</div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-64 p-0"
          onClick={(event) => (event.target as HTMLElement).closest('a') && setOpen(false)}
        >
          <SheetTitle className="sr-only">Navegação</SheetTitle>
          <SheetDescription className="sr-only">Seções da aplicação</SheetDescription>
          {sidebar}
        </SheetContent>
        <div className="flex min-w-0 flex-1 flex-col">
          <header
            data-slot="dashboard-header"
            className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-canvas/90 px-4 backdrop-blur sm:px-6"
          >
            <SheetTrigger asChild>
              <IconButton label={menuLabel} className="lg:hidden">
                <Menu aria-hidden />
              </IconButton>
            </SheetTrigger>
            {header}
          </header>
          <main id={mainId} tabIndex={-1} className="flex-1 px-4 py-6 outline-none sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </Sheet>
    </div>
  );
}

/** Title block for a page inside the shell: breadcrumb/eyebrow, title, description and actions. */
function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  className,
  ...props
}: Omit<React.ComponentProps<'div'>, 'title'> & {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div
      data-slot="page-header"
      className={cn('flex flex-wrap items-end justify-between gap-4 pb-6', className)}
      {...props}
    >
      <div className="grid min-w-0 gap-1">
        {eyebrow && <div className="text-xs font-medium text-fg-tertiary">{eyebrow}</div>}
        <h1 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl sm:tracking-tighter">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-sm text-fg-tertiary sm:text-base">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export { DashboardShell, PageHeader, type DashboardShellProps };

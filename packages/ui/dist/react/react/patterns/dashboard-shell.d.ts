import * as React from 'react';
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
declare function DashboardShell({ sidebar, header, menuLabel, className, children, ...props }: DashboardShellProps): React.JSX.Element;
/** Title block for a page inside the shell: breadcrumb/eyebrow, title, description and actions. */
declare function PageHeader({ eyebrow, title, description, actions, className, ...props }: Omit<React.ComponentProps<'div'>, 'title'> & {
    eyebrow?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    actions?: React.ReactNode;
}): React.JSX.Element;
export { DashboardShell, PageHeader, type DashboardShellProps };

'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Toaster as Sonner, toast } from 'sonner';
import { AlertTriangle, CheckCircle2, Info, OctagonAlert } from 'lucide-react';
import { Spinner } from './spinner';
/**
 * Toast region (Sonner). Render once near the root. Theme follows data-theme
 * through CSS variables, so portals and both themes stay in sync.
 * Use `toast()`, `toast.success()`, `toast.error()`, `toast.promise()`.
 */
function Toaster({ position = 'bottom-right', ...props }) {
    return (_jsx(Sonner, { position: position, icons: {
            success: _jsx(CheckCircle2, { "aria-hidden": true, className: "size-4 text-success" }),
            info: _jsx(Info, { "aria-hidden": true, className: "size-4 text-info" }),
            warning: _jsx(AlertTriangle, { "aria-hidden": true, className: "size-4 text-warning" }),
            error: _jsx(OctagonAlert, { "aria-hidden": true, className: "size-4 text-danger" }),
            loading: _jsx(Spinner, { "aria-hidden": true, className: "size-4 text-fg-tertiary" }),
        }, toastOptions: {
            classNames: {
                toast: 'group !gap-3 !rounded-card !border !border-border !bg-popover !text-popover-foreground !shadow-md !font-sans !text-sm',
                title: '!font-medium !text-fg',
                description: '!text-fg-tertiary',
                actionButton: '!rounded-control !bg-primary !text-primary-foreground !font-medium',
                cancelButton: '!rounded-control !bg-surface-muted !text-fg',
                closeButton: '!border-border !bg-popover !text-fg-secondary',
            },
        }, style: { fontFamily: 'var(--axion-font-sans)' }, ...props }));
}
export { Toaster, toast };

'use client';

import * as React from 'react';
import { Toaster as Sonner, toast, type ToasterProps } from 'sonner';
import { AlertTriangle, CheckCircle2, Info, OctagonAlert } from 'lucide-react';
import { Spinner } from './spinner';

/**
 * Toast region (Sonner). Render once near the root. Theme follows data-theme
 * through CSS variables, so portals and both themes stay in sync.
 * Use `toast()`, `toast.success()`, `toast.error()`, `toast.promise()`.
 */
function Toaster({ position = 'bottom-right', ...props }: ToasterProps) {
  return (
    <Sonner
      position={position}
      icons={{
        success: <CheckCircle2 aria-hidden className="size-4 text-success" />,
        info: <Info aria-hidden className="size-4 text-info" />,
        warning: <AlertTriangle aria-hidden className="size-4 text-warning" />,
        error: <OctagonAlert aria-hidden className="size-4 text-danger" />,
        loading: <Spinner aria-hidden className="size-4 text-fg-tertiary" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            'group !gap-3 !rounded-card !border !border-border !bg-popover !text-popover-foreground !shadow-md !font-sans !text-sm',
          title: '!font-medium !text-fg',
          description: '!text-fg-tertiary',
          actionButton: '!rounded-control !bg-primary !text-primary-foreground !font-medium',
          cancelButton: '!rounded-control !bg-surface-muted !text-fg',
          closeButton: '!border-border !bg-popover !text-fg-secondary',
        },
      }}
      style={{ fontFamily: 'var(--axion-font-sans)' } as React.CSSProperties}
      {...props}
    />
  );
}

export { Toaster, toast };

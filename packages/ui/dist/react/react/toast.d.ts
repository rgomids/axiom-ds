import * as React from 'react';
import { toast, type ToasterProps } from 'sonner';
/**
 * Toast region (Sonner). Render once near the root. Theme follows data-theme
 * through CSS variables, so portals and both themes stay in sync.
 * Use `toast()`, `toast.success()`, `toast.error()`, `toast.promise()`.
 */
declare function Toaster({ position, ...props }: ToasterProps): React.JSX.Element;
export { Toaster, toast };

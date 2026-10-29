import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const alertVariants: (props?: ({
    variant?: "default" | "danger" | "success" | "warning" | "info" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
/**
 * Inline, contextual message. `danger`/`warning` use role="alert"; others role="status".
 * Pass `icon={false}` to hide the default icon.
 */
declare function Alert({ className, variant, icon, children, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants> & {
    icon?: React.ReactNode | false;
}): React.JSX.Element;
declare function AlertTitle({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function AlertDescription({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
/** Full-width, page-level announcement with optional action and dismiss. */
declare function Banner({ variant, action, onDismiss, dismissLabel, className, children, ...props }: React.ComponentProps<'div'> & {
    variant?: 'info' | 'success' | 'warning' | 'danger' | 'brand';
    action?: React.ReactNode;
    onDismiss?: () => void;
    dismissLabel?: string;
}): React.JSX.Element;
export { Alert, AlertTitle, AlertDescription, Banner, alertVariants };

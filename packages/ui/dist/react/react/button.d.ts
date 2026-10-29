import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "primary" | "secondary" | "outline" | "ghost" | "destructive" | null | undefined;
    size?: "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    /** Shows a spinner, sets aria-busy and blocks interaction while keeping the label. */
    loading?: boolean;
};
declare function Button({ className, variant, size, asChild, loading, disabled, children, ...props }: ButtonProps): React.JSX.Element;
export { Button, buttonVariants, type ButtonProps };

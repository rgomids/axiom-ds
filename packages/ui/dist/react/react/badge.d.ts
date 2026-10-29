import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const badgeVariants: (props?: ({
    variant?: "link" | "default" | "secondary" | "outline" | "ghost" | "destructive" | "danger" | "success" | "subtle" | "warning" | "info" | "brand" | null | undefined;
    size?: "default" | "sm" | null | undefined;
    mono?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Badge({ className, variant, size, mono, asChild, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
}): React.JSX.Element;
export { Badge, badgeVariants };

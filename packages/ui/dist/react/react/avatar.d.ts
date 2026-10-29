import * as React from 'react';
import { Avatar as AvatarPrimitive } from 'radix-ui';
declare const sizes: {
    readonly sm: "size-6 text-2xs";
    readonly default: "size-8 text-xs";
    readonly lg: "size-10 text-sm";
};
declare function Avatar({ className, size, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root> & {
    size?: keyof typeof sizes;
}): React.JSX.Element;
declare function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>): React.JSX.Element;
declare function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>): React.JSX.Element;
/** Overlapping avatars with an optional "+N" overflow counter. */
declare function AvatarGroup({ className, max, total, children, ...props }: React.ComponentProps<'div'> & {
    max?: number;
    total?: number;
}): React.JSX.Element;
export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };

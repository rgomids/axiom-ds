'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Avatar as AvatarPrimitive } from 'radix-ui';
import { cn } from '../lib/utils';
const sizes = { sm: 'size-6 text-2xs', default: 'size-8 text-xs', lg: 'size-10 text-sm' };
function Avatar({ className, size = 'default', ...props }) {
    return (_jsx(AvatarPrimitive.Root, { "data-slot": "avatar", className: cn('relative flex shrink-0 overflow-hidden rounded-full border border-border bg-surface-muted', sizes[size], className), ...props }));
}
function AvatarImage({ className, ...props }) {
    return (_jsx(AvatarPrimitive.Image, { "data-slot": "avatar-image", className: cn('aspect-square size-full object-cover', className), ...props }));
}
function AvatarFallback({ className, ...props }) {
    return (_jsx(AvatarPrimitive.Fallback, { "data-slot": "avatar-fallback", className: cn('flex size-full items-center justify-center font-medium text-fg-secondary uppercase', className), ...props }));
}
/** Overlapping avatars with an optional "+N" overflow counter. */
function AvatarGroup({ className, max, total, children, ...props }) {
    const items = React.Children.toArray(children);
    const visible = max ? items.slice(0, max) : items;
    const hidden = (total ?? items.length) - visible.length;
    return (_jsxs("div", { "data-slot": "avatar-group", className: cn('flex items-center -space-x-2 [&>*]:ring-2 [&>*]:ring-canvas', className), ...props, children: [visible, hidden > 0 && (_jsxs("span", { className: "relative z-0 flex size-8 items-center justify-center rounded-full border bg-surface-muted font-mono text-2xs text-fg-secondary", children: ["+", hidden] }))] }));
}
export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };

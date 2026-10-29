'use client';

import * as React from 'react';
import { Avatar as AvatarPrimitive } from 'radix-ui';
import { cn } from '../lib/utils';

const sizes = { sm: 'size-6 text-2xs', default: 'size-8 text-xs', lg: 'size-10 text-sm' } as const;

function Avatar({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & { size?: keyof typeof sizes }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full border border-border bg-surface-muted',
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn('aspect-square size-full object-cover', className)}
      {...props}
    />
  );
}
function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        'flex size-full items-center justify-center font-medium text-fg-secondary uppercase',
        className,
      )}
      {...props}
    />
  );
}

/** Overlapping avatars with an optional "+N" overflow counter. */
function AvatarGroup({
  className,
  max,
  total,
  children,
  ...props
}: React.ComponentProps<'div'> & { max?: number; total?: number }) {
  const items = React.Children.toArray(children);
  const visible = max ? items.slice(0, max) : items;
  const hidden = (total ?? items.length) - visible.length;
  return (
    <div
      data-slot="avatar-group"
      className={cn('flex items-center -space-x-2 [&>*]:ring-2 [&>*]:ring-canvas', className)}
      {...props}
    >
      {visible}
      {hidden > 0 && (
        <span className="relative z-0 flex size-8 items-center justify-center rounded-full border bg-surface-muted font-mono text-2xs text-fg-secondary">
          +{hidden}
        </span>
      )}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };

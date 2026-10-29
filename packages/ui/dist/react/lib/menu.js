/** Shared surface and item classes for DropdownMenu, ContextMenu, Select and Command. */
export const menuContentClasses = 'z-50 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-control border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in';
const itemBase = "relative flex cursor-default items-center gap-2 rounded-[calc(var(--axion-radius-sm)-2px)] px-2 py-1.5 text-sm text-fg outline-none select-none data-[inset]:pl-8 data-[variant=destructive]:text-danger data-[variant=destructive]:data-[highlighted]:bg-danger-subtle [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-fg-tertiary";
/** Radix menus set an empty data-disabled attribute only when disabled. */
export const menuItemClasses = itemBase +
    ' data-[disabled]:pointer-events-none data-[disabled]:text-fg-disabled data-[highlighted]:bg-surface-subtle';
/** cmdk always sets data-disabled="true|false" and marks the active item with data-selected. */
export const commandItemClasses = itemBase +
    ' data-[disabled=true]:pointer-events-none data-[disabled=true]:text-fg-disabled data-[selected=true]:bg-surface-subtle';
export const menuLabelClasses = 'px-2 py-1.5 text-xs font-medium text-fg-tertiary data-[inset]:pl-8';
export const menuSeparatorClasses = '-mx-1 my-1 h-px bg-border';
export const menuShortcutClasses = 'ml-auto font-mono text-xs tracking-normal text-fg-tertiary';

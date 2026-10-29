/** Shared surface and item classes for DropdownMenu, ContextMenu, Select and Command. */
export declare const menuContentClasses = "z-50 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-control border bg-popover p-1 text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in";
/** Radix menus set an empty data-disabled attribute only when disabled. */
export declare const menuItemClasses: string;
/** cmdk always sets data-disabled="true|false" and marks the active item with data-selected. */
export declare const commandItemClasses: string;
export declare const menuLabelClasses = "px-2 py-1.5 text-xs font-medium text-fg-tertiary data-[inset]:pl-8";
export declare const menuSeparatorClasses = "-mx-1 my-1 h-px bg-border";
export declare const menuShortcutClasses = "ml-auto font-mono text-xs tracking-normal text-fg-tertiary";

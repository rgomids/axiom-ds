import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Dialog } from './dialog';
declare function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>): React.JSX.Element;
declare function CommandDialog({ title, description, children, className, ...props }: React.ComponentProps<typeof Dialog> & {
    title?: string;
    description?: string;
    className?: string;
}): React.JSX.Element;
declare function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>): React.JSX.Element;
declare function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>): React.JSX.Element;
declare function CommandEmpty(props: React.ComponentProps<typeof CommandPrimitive.Empty>): React.JSX.Element;
declare function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>): React.JSX.Element;
/** Decorative divider; hidden while searching. Not a listbox child role (cmdk's separator is). */
declare function CommandSeparator({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element | null;
declare function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>): React.JSX.Element;
declare function CommandShortcut({ className, ...props }: React.ComponentProps<'span'>): React.JSX.Element;
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };

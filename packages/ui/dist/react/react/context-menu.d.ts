import * as React from 'react';
import { ContextMenu as Primitive } from 'radix-ui';
declare function ContextMenu(props: React.ComponentProps<typeof Primitive.Root>): React.JSX.Element;
declare function ContextMenuTrigger(props: React.ComponentProps<typeof Primitive.Trigger>): React.JSX.Element;
declare function ContextMenuGroup(props: React.ComponentProps<typeof Primitive.Group>): React.JSX.Element;
declare function ContextMenuSub(props: React.ComponentProps<typeof Primitive.Sub>): React.JSX.Element;
declare function ContextMenuRadioGroup(props: React.ComponentProps<typeof Primitive.RadioGroup>): React.JSX.Element;
declare function ContextMenuContent({ className, ...props }: React.ComponentProps<typeof Primitive.Content>): React.JSX.Element;
declare function ContextMenuItem({ className, inset, variant, ...props }: React.ComponentProps<typeof Primitive.Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
}): React.JSX.Element;
declare function ContextMenuCheckboxItem({ className, children, ...props }: React.ComponentProps<typeof Primitive.CheckboxItem>): React.JSX.Element;
declare function ContextMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof Primitive.RadioItem>): React.JSX.Element;
declare function ContextMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof Primitive.Label> & {
    inset?: boolean;
}): React.JSX.Element;
declare function ContextMenuSeparator({ className, ...props }: React.ComponentProps<typeof Primitive.Separator>): React.JSX.Element;
declare function ContextMenuShortcut({ className, ...props }: React.ComponentProps<'span'>): React.JSX.Element;
declare function ContextMenuSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof Primitive.SubTrigger> & {
    inset?: boolean;
}): React.JSX.Element;
declare function ContextMenuSubContent({ className, ...props }: React.ComponentProps<typeof Primitive.SubContent>): React.JSX.Element;
export { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuGroup, ContextMenuLabel, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, };

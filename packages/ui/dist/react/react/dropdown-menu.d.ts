import * as React from 'react';
import { DropdownMenu as Primitive } from 'radix-ui';
declare function DropdownMenu(props: React.ComponentProps<typeof Primitive.Root>): React.JSX.Element;
declare function DropdownMenuTrigger(props: React.ComponentProps<typeof Primitive.Trigger>): React.JSX.Element;
declare function DropdownMenuGroup(props: React.ComponentProps<typeof Primitive.Group>): React.JSX.Element;
declare function DropdownMenuSub(props: React.ComponentProps<typeof Primitive.Sub>): React.JSX.Element;
declare function DropdownMenuRadioGroup(props: React.ComponentProps<typeof Primitive.RadioGroup>): React.JSX.Element;
declare function DropdownMenuContent({ className, ...props }: React.ComponentProps<typeof Primitive.Content>): React.JSX.Element;
declare function DropdownMenuItem({ className, inset, variant, ...props }: React.ComponentProps<typeof Primitive.Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
}): React.JSX.Element;
declare function DropdownMenuCheckboxItem({ className, children, ...props }: React.ComponentProps<typeof Primitive.CheckboxItem>): React.JSX.Element;
declare function DropdownMenuRadioItem({ className, children, ...props }: React.ComponentProps<typeof Primitive.RadioItem>): React.JSX.Element;
declare function DropdownMenuLabel({ className, inset, ...props }: React.ComponentProps<typeof Primitive.Label> & {
    inset?: boolean;
}): React.JSX.Element;
declare function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof Primitive.Separator>): React.JSX.Element;
declare function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>): React.JSX.Element;
declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: React.ComponentProps<typeof Primitive.SubTrigger> & {
    inset?: boolean;
}): React.JSX.Element;
declare function DropdownMenuSubContent({ className, ...props }: React.ComponentProps<typeof Primitive.SubContent>): React.JSX.Element;
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, };

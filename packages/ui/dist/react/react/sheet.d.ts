import * as React from 'react';
import { Dialog as SheetPrimitive } from 'radix-ui';
declare function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>): React.JSX.Element;
declare function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>): React.JSX.Element;
declare function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>): React.JSX.Element;
declare const sides: {
    readonly right: "inset-y-0 right-0 h-full w-[min(100%-2rem,28rem)] border-l data-[state=open]:animate-sheet-in-right";
    readonly left: "inset-y-0 left-0 h-full w-[min(100%-2rem,28rem)] border-r data-[state=open]:animate-sheet-in-left";
    readonly bottom: "inset-x-0 bottom-0 max-h-[85dvh] rounded-t-dialog border-t data-[state=open]:animate-sheet-in-bottom";
};
/** Side panel (Drawer) built on Radix Dialog: focus trap, Escape and return focus. */
declare function SheetContent({ className, children, side, closeLabel, ...props }: React.ComponentProps<typeof SheetPrimitive.Content> & {
    side?: keyof typeof sides;
    closeLabel?: string;
}): React.JSX.Element;
declare function SheetHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function SheetFooter({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>): React.JSX.Element;
declare function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>): React.JSX.Element;
export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, };

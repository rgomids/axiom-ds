import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
declare function AlertDialog(props: React.ComponentProps<typeof AlertDialogPrimitive.Root>): React.JSX.Element;
declare function AlertDialogTrigger(props: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>): React.JSX.Element;
declare function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content>): React.JSX.Element;
declare function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element;
declare function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>): React.JSX.Element;
declare function AlertDialogDescription({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Description>): React.JSX.Element;
declare function AlertDialogAction({ className, variant, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Action> & {
    variant?: 'default' | 'destructive';
}): React.JSX.Element;
declare function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>): React.JSX.Element;
export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, };

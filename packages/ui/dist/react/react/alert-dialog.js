'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';
import { cn } from '../lib/utils';
import { buttonVariants } from './button';
function AlertDialog(props) {
    return _jsx(AlertDialogPrimitive.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger(props) {
    return _jsx(AlertDialogPrimitive.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogContent({ className, ...props }) {
    return (_jsxs(AlertDialogPrimitive.Portal, { children: [_jsx(AlertDialogPrimitive.Overlay, { "data-slot": "alert-dialog-overlay", className: "fixed inset-0 z-50 bg-overlay data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" }), _jsx(AlertDialogPrimitive.Content, { "data-slot": "alert-dialog-content", className: cn('fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-5 rounded-dialog border bg-popover p-6 text-popover-foreground shadow-lg outline-none data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-md', className), ...props })] }));
}
function AlertDialogHeader({ className, ...props }) {
    return (_jsx("div", { "data-slot": "alert-dialog-header", className: cn('grid gap-1.5', className), ...props }));
}
function AlertDialogFooter({ className, ...props }) {
    return (_jsx("div", { "data-slot": "alert-dialog-footer", className: cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className), ...props }));
}
function AlertDialogTitle({ className, ...props }) {
    return (_jsx(AlertDialogPrimitive.Title, { "data-slot": "alert-dialog-title", className: cn('text-base leading-6 font-semibold tracking-tight', className), ...props }));
}
function AlertDialogDescription({ className, ...props }) {
    return (_jsx(AlertDialogPrimitive.Description, { "data-slot": "alert-dialog-description", className: cn('text-sm text-fg-tertiary', className), ...props }));
}
function AlertDialogAction({ className, variant = 'default', ...props }) {
    return (_jsx(AlertDialogPrimitive.Action, { className: cn(buttonVariants({ variant }), className), ...props }));
}
function AlertDialogCancel({ className, ...props }) {
    return (_jsx(AlertDialogPrimitive.Cancel, { className: cn(buttonVariants({ variant: 'outline' }), className), ...props }));
}
export { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, };

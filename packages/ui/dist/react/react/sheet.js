'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog as SheetPrimitive } from 'radix-ui';
import { XIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { buttonVariants } from './button';
function Sheet(props) {
    return _jsx(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger(props) {
    return _jsx(SheetPrimitive.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetClose(props) {
    return _jsx(SheetPrimitive.Close, { "data-slot": "sheet-close", ...props });
}
const sides = {
    right: 'inset-y-0 right-0 h-full w-[min(100%-2rem,28rem)] border-l data-[state=open]:animate-sheet-in-right',
    left: 'inset-y-0 left-0 h-full w-[min(100%-2rem,28rem)] border-r data-[state=open]:animate-sheet-in-left',
    bottom: 'inset-x-0 bottom-0 max-h-[85dvh] rounded-t-dialog border-t data-[state=open]:animate-sheet-in-bottom',
};
/** Side panel (Drawer) built on Radix Dialog: focus trap, Escape and return focus. */
function SheetContent({ className, children, side = 'right', closeLabel = 'Fechar', ...props }) {
    return (_jsxs(SheetPrimitive.Portal, { children: [_jsx(SheetPrimitive.Overlay, { "data-slot": "sheet-overlay", className: "fixed inset-0 z-50 bg-overlay data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in" }), _jsxs(SheetPrimitive.Content, { "data-slot": "sheet-content", "data-side": side, className: cn('fixed z-50 flex flex-col gap-4 overflow-y-auto bg-popover p-6 text-popover-foreground shadow-lg outline-none data-[state=closed]:animate-fade-out', sides[side], className), ...props, children: [children, _jsxs(SheetPrimitive.Close, { className: cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }), 'absolute top-4 right-4'), children: [_jsx(XIcon, { "aria-hidden": true }), _jsx("span", { className: "sr-only", children: closeLabel })] })] })] }));
}
function SheetHeader({ className, ...props }) {
    return _jsx("div", { "data-slot": "sheet-header", className: cn('grid gap-1.5 pr-8', className), ...props });
}
function SheetFooter({ className, ...props }) {
    return (_jsx("div", { "data-slot": "sheet-footer", className: cn('mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className), ...props }));
}
function SheetTitle({ className, ...props }) {
    return (_jsx(SheetPrimitive.Title, { "data-slot": "sheet-title", className: cn('text-base font-semibold tracking-tight', className), ...props }));
}
function SheetDescription({ className, ...props }) {
    return (_jsx(SheetPrimitive.Description, { "data-slot": "sheet-description", className: cn('text-sm text-fg-tertiary', className), ...props }));
}
export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, };

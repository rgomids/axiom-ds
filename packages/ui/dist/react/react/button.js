import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { cva } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { cn } from '../lib/utils';
import { focusRing } from '../lib/control';
import { Spinner } from './spinner';
const buttonVariants = cva([
    "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-(--axion-component-button-gap) rounded-control text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,box-shadow,transform] select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-busy:cursor-progress [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    focusRing,
], {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
            primary: 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
            secondary: 'bg-surface-muted text-fg hover:bg-border',
            outline: 'border border-border-strong bg-surface text-fg hover:border-border-interactive hover:bg-surface-subtle',
            ghost: 'text-fg-secondary hover:bg-surface-subtle hover:text-fg',
            link: 'h-auto px-0 text-link underline-offset-4 hover:underline active:translate-y-0',
            destructive: 'bg-danger text-danger-foreground hover:bg-danger/90',
        },
        size: {
            default: 'h-(--axion-component-button-height) px-4 has-[>svg]:px-3',
            xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: 'h-(--axion-component-button-heightSm) gap-1.5 px-3 text-13 has-[>svg]:px-2.5',
            lg: 'h-(--axion-component-button-heightLg) px-5 has-[>svg]:px-4',
            icon: 'size-(--axion-component-button-height) rounded-[var(--axion-component-icon-radius)]',
            'icon-xs': "size-6 rounded-[var(--axion-component-icon-radius)] [&_svg:not([class*='size-'])]:size-3",
            'icon-sm': 'size-(--axion-component-button-heightSm) rounded-[var(--axion-component-icon-radius)]',
            'icon-lg': 'size-(--axion-component-button-heightLg) rounded-[var(--axion-component-icon-radius)]',
        },
    },
    compoundVariants: [{ variant: 'link', className: 'h-auto px-0 has-[>svg]:px-0' }],
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});
function Button({ className, variant = 'default', size = 'default', asChild = false, loading = false, disabled, children, ...props }) {
    const Comp = asChild ? Slot.Root : 'button';
    return (_jsx(Comp, { "data-slot": "button", "data-variant": variant, "data-size": size, "aria-busy": loading || undefined, disabled: asChild ? undefined : disabled || loading, className: cn(buttonVariants({ variant, size, className })), ...props, children: loading && !asChild ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { "aria-hidden": true, className: "size-4" }), children] })) : (children) }));
}
export { Button, buttonVariants };

'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '../lib/utils';
import { Label } from './label';
const FormFieldContext = React.createContext(null);
function useFormField() {
    const context = React.useContext(FormFieldContext);
    if (!context)
        throw new Error('useFormField must be used inside <FormField>');
    return context;
}
/**
 * Wires Label, control, description and message: ids, aria-describedby,
 * aria-invalid, required and disabled are applied to the control by FormControl.
 */
function FormField({ controlId, invalid = false, required = false, disabled = false, className, ...props }) {
    const generated = React.useId();
    const id = controlId ?? generated + '-control';
    const [parts, setParts] = React.useState({ description: false, message: false });
    const register = React.useCallback((part, present) => {
        setParts((current) => (current[part] === present ? current : { ...current, [part]: present }));
    }, []);
    return (_jsx(FormFieldContext.Provider, { value: {
            id,
            descriptionId: generated + '-description',
            messageId: generated + '-message',
            invalid,
            required,
            disabled,
            hasDescription: parts.description,
            hasMessage: parts.message,
            register,
        }, children: _jsx("div", { "data-slot": "form-field", "data-invalid": invalid || undefined, "data-disabled": disabled || undefined, className: cn('group grid gap-1.5', className), ...props }) }));
}
function FormLabel({ className, children, ...props }) {
    const field = useFormField();
    return (_jsxs(Label, { "data-slot": "form-label", htmlFor: field.id, className: cn(field.disabled && 'text-fg-disabled', className), ...props, children: [children, field.required && (_jsx("span", { "aria-hidden": true, className: "text-fg-tertiary", children: "*" }))] }));
}
function FormControl(props) {
    const field = useFormField();
    const describedBy = [
        field.hasDescription && field.descriptionId,
        field.hasMessage && field.messageId,
    ]
        .filter(Boolean)
        .join(' ');
    return (_jsx(Slot.Root, { "data-slot": "form-control", id: field.id, "aria-describedby": describedBy || undefined, "aria-invalid": field.invalid || undefined, "aria-required": field.required || undefined, ...{ disabled: field.disabled || undefined }, ...props }));
}
function usePart(part, present) {
    const { register } = useFormField();
    React.useEffect(() => {
        register(part, present);
        return () => register(part, false);
    }, [part, present, register]);
}
function FormDescription({ className, ...props }) {
    const field = useFormField();
    usePart('description', true);
    return (_jsx("p", { "data-slot": "form-description", id: field.descriptionId, className: cn('text-xs text-fg-tertiary', className), ...props }));
}
/**
 * Validation feedback. Renders only with children; `tone` defaults to danger
 * when the field is invalid. Announced politely to assistive technology.
 */
function FormMessage({ className, tone, children, ...props }) {
    const field = useFormField();
    const present = Boolean(children);
    usePart('message', present);
    const resolved = tone ?? (field.invalid ? 'danger' : 'neutral');
    return (_jsx("p", { "data-slot": "form-message", id: field.messageId, "aria-live": "polite", className: cn('text-xs', !present && 'sr-only', resolved === 'danger' && 'text-danger', resolved === 'success' && 'text-success', resolved === 'neutral' && 'text-fg-tertiary', className), ...props, children: children }));
}
export { FormField, FormLabel, FormControl, FormDescription, FormMessage, useFormField, };

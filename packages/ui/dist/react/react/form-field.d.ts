import * as React from 'react';
import { Slot } from 'radix-ui';
import { Label } from './label';
type FormFieldContextValue = {
    id: string;
    descriptionId: string;
    messageId: string;
    invalid: boolean;
    required: boolean;
    disabled: boolean;
    hasDescription: boolean;
    hasMessage: boolean;
    register: (part: 'description' | 'message', present: boolean) => void;
};
declare function useFormField(): FormFieldContextValue;
type FormFieldProps = React.ComponentProps<'div'> & {
    /** Overrides the generated control id. */
    controlId?: string;
    invalid?: boolean;
    required?: boolean;
    disabled?: boolean;
};
/**
 * Wires Label, control, description and message: ids, aria-describedby,
 * aria-invalid, required and disabled are applied to the control by FormControl.
 */
declare function FormField({ controlId, invalid, required, disabled, className, ...props }: FormFieldProps): React.JSX.Element;
declare function FormLabel({ className, children, ...props }: React.ComponentProps<typeof Label>): React.JSX.Element;
declare function FormControl(props: React.ComponentProps<typeof Slot.Root>): React.JSX.Element;
declare function FormDescription({ className, ...props }: React.ComponentProps<'p'>): React.JSX.Element;
/**
 * Validation feedback. Renders only with children; `tone` defaults to danger
 * when the field is invalid. Announced politely to assistive technology.
 */
declare function FormMessage({ className, tone, children, ...props }: React.ComponentProps<'p'> & {
    tone?: 'danger' | 'success' | 'neutral';
}): React.JSX.Element;
export { FormField, FormLabel, FormControl, FormDescription, FormMessage, useFormField, type FormFieldProps, };

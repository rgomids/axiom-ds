'use client';

import * as React from 'react';
import { Slot } from 'radix-ui';
import { cn } from '../lib/utils';
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

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

function useFormField() {
  const context = React.useContext(FormFieldContext);
  if (!context) throw new Error('useFormField must be used inside <FormField>');
  return context;
}

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
function FormField({
  controlId,
  invalid = false,
  required = false,
  disabled = false,
  className,
  ...props
}: FormFieldProps) {
  const generated = React.useId();
  const id = controlId ?? generated + '-control';
  const [parts, setParts] = React.useState({ description: false, message: false });
  const register = React.useCallback((part: 'description' | 'message', present: boolean) => {
    setParts((current) => (current[part] === present ? current : { ...current, [part]: present }));
  }, []);
  return (
    <FormFieldContext.Provider
      value={{
        id,
        descriptionId: generated + '-description',
        messageId: generated + '-message',
        invalid,
        required,
        disabled,
        hasDescription: parts.description,
        hasMessage: parts.message,
        register,
      }}
    >
      <div
        data-slot="form-field"
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        className={cn('group grid gap-1.5', className)}
        {...props}
      />
    </FormFieldContext.Provider>
  );
}

function FormLabel({ className, children, ...props }: React.ComponentProps<typeof Label>) {
  const field = useFormField();
  return (
    <Label
      data-slot="form-label"
      htmlFor={field.id}
      className={cn(field.disabled && 'text-fg-disabled', className)}
      {...props}
    >
      {children}
      {field.required && (
        <span aria-hidden className="text-fg-tertiary">
          *
        </span>
      )}
    </Label>
  );
}

function FormControl(props: React.ComponentProps<typeof Slot.Root>) {
  const field = useFormField();
  const describedBy = [
    field.hasDescription && field.descriptionId,
    field.hasMessage && field.messageId,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <Slot.Root
      data-slot="form-control"
      id={field.id}
      aria-describedby={describedBy || undefined}
      aria-invalid={field.invalid || undefined}
      aria-required={field.required || undefined}
      {...({ disabled: field.disabled || undefined } as React.HTMLAttributes<HTMLElement>)}
      {...props}
    />
  );
}

function usePart(part: 'description' | 'message', present: boolean) {
  const { register } = useFormField();
  React.useEffect(() => {
    register(part, present);
    return () => register(part, false);
  }, [part, present, register]);
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const field = useFormField();
  usePart('description', true);
  return (
    <p
      data-slot="form-description"
      id={field.descriptionId}
      className={cn('text-xs text-fg-tertiary', className)}
      {...props}
    />
  );
}

/**
 * Validation feedback. Renders only with children; `tone` defaults to danger
 * when the field is invalid. Announced politely to assistive technology.
 */
function FormMessage({
  className,
  tone,
  children,
  ...props
}: React.ComponentProps<'p'> & { tone?: 'danger' | 'success' | 'neutral' }) {
  const field = useFormField();
  const present = Boolean(children);
  usePart('message', present);
  const resolved = tone ?? (field.invalid ? 'danger' : 'neutral');
  return (
    <p
      data-slot="form-message"
      id={field.messageId}
      aria-live="polite"
      className={cn(
        'text-xs',
        !present && 'sr-only',
        resolved === 'danger' && 'text-danger',
        resolved === 'success' && 'text-success',
        resolved === 'neutral' && 'text-fg-tertiary',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export {
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
  type FormFieldProps,
};

import * as React from 'react';
type NumberFieldProps = Omit<React.ComponentProps<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange' | 'min' | 'max' | 'step'> & {
    value?: number | null;
    defaultValue?: number | null;
    onValueChange?: (value: number | null) => void;
    min?: number;
    max?: number;
    step?: number;
    decrementLabel?: string;
    incrementLabel?: string;
};
/** Numeric input with stepper buttons. Arrow Up/Down step, empty means null. */
declare function NumberField({ className, value, defaultValue, onValueChange, min, max, step, disabled, readOnly, decrementLabel, incrementLabel, ...props }: NumberFieldProps): React.JSX.Element;
export { NumberField, type NumberFieldProps };

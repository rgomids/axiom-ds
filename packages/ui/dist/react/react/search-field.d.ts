import * as React from 'react';
type SearchFieldProps = Omit<React.ComponentProps<'input'>, 'type' | 'onChange' | 'value' | 'defaultValue'> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    /** Visible keyboard hint, e.g. "/" or "⌘K". Purely visual; wire the shortcut yourself. */
    shortcut?: string;
    clearLabel?: string;
};
declare function SearchField({ className, value, defaultValue, onValueChange, shortcut, clearLabel, disabled, ...props }: SearchFieldProps): React.JSX.Element;
export { SearchField, type SearchFieldProps };

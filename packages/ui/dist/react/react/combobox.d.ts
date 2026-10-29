import * as React from 'react';
type ComboboxOption = {
    value: string;
    label: string;
    description?: string;
    disabled?: boolean;
};
type ComboboxProps = {
    options: ComboboxOption[];
    value?: string | null;
    defaultValue?: string | null;
    onValueChange?: (value: string | null) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    disabled?: boolean;
    id?: string;
    className?: string;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
    'aria-label'?: string;
};
/** Searchable single select (autocomplete). Selecting the current value again clears it. */
declare function Combobox({ options, value, defaultValue, onValueChange, placeholder, searchPlaceholder, emptyMessage, disabled, className, ...aria }: ComboboxProps): React.JSX.Element;
export { Combobox, type ComboboxOption, type ComboboxProps };

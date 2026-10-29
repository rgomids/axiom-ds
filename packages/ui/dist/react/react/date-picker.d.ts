import * as React from 'react';
import { Calendar } from './calendar';
type DatePickerProps = {
    value?: Date | null;
    defaultValue?: Date | null;
    onValueChange?: (value: Date | null) => void;
    placeholder?: string;
    disabled?: boolean;
    /** Dates that cannot be chosen, e.g. `{ before: new Date() }`. */
    disabledDays?: React.ComponentProps<typeof Calendar>['disabled'];
    format?: (date: Date) => string;
    id?: string;
    className?: string;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
};
declare function DatePicker({ value, defaultValue, onValueChange, placeholder, disabled, disabledDays, format, className, ...aria }: DatePickerProps): React.JSX.Element;
export { DatePicker, type DatePickerProps };

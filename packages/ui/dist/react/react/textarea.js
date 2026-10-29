import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../lib/utils';
import { fieldClasses } from '../lib/control';
function Textarea({ className, ...props }) {
    return (_jsx("textarea", { "data-slot": "textarea", className: cn(fieldClasses, 'field-sizing-content min-h-20 px-3 py-2 leading-5', className), ...props }));
}
export { Textarea };

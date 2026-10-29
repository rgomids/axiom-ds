import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from './button';
const sizes = { sm: 'icon-sm', default: 'icon', lg: 'icon-lg' };
/** Button that renders only an icon. The accessible name is mandatory. */
function IconButton({ label, size = 'default', variant = 'ghost', title, ...props }) {
    return (_jsx(Button, { "data-slot": "icon-button", variant: variant, size: sizes[size], "aria-label": label, title: title ?? label, ...props }));
}
export { IconButton };

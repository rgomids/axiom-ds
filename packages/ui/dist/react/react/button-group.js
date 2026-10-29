import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../lib/utils';
/** Visually joins related buttons. Use `aria-label` to name the group. */
function ButtonGroup({ className, orientation = 'horizontal', ...props }) {
    return (_jsx("div", { role: "group", "data-slot": "button-group", "data-orientation": orientation, className: cn('inline-flex w-fit items-stretch [&>*]:focus-visible:z-10', orientation === 'horizontal'
            ? '[&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none'
            : 'flex-col [&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none', className), ...props }));
}
export { ButtonGroup };

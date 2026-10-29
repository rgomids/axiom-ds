import * as React from 'react';
/** Visually joins related buttons. Use `aria-label` to name the group. */
declare function ButtonGroup({ className, orientation, ...props }: React.ComponentProps<'div'> & {
    orientation?: 'horizontal' | 'vertical';
}): React.JSX.Element;
export { ButtonGroup };

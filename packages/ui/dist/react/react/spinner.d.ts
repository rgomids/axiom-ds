import * as React from 'react';
type SpinnerProps = React.ComponentProps<'svg'> & {
    /** Accessible label. Omit (and pass aria-hidden) when a parent already announces progress. */
    label?: string;
};
declare function Spinner({ className, label, ...props }: SpinnerProps): React.JSX.Element;
export { Spinner, type SpinnerProps };

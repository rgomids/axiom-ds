import * as React from 'react';
type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';
type Step = {
    id: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    status: StepStatus;
};
/** Ordered progress through steps. Status is presentational; the caller owns the flow. */
declare function Stepper({ steps, orientation, className, 'aria-label': label, ...props }: Omit<React.ComponentProps<'ol'>, 'children'> & {
    steps: Step[];
    orientation?: 'horizontal' | 'vertical';
}): React.JSX.Element;
export { Stepper, type Step, type StepStatus };

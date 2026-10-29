import * as React from 'react';
import { type Step } from '../stepper';
/** Stepper with a stage counter header ("03 / 06 stages"), as used in workflow summaries. */
declare function WorkflowStepper({ title, steps, orientation, className, }: {
    title?: React.ReactNode;
    steps: Step[];
    orientation?: 'horizontal' | 'vertical';
    className?: string;
}): React.JSX.Element;
export { WorkflowStepper };

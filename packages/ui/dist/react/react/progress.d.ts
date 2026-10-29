import * as React from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';
declare const tones: {
    readonly default: "bg-primary";
    readonly success: "bg-success";
    readonly warning: "bg-warning";
    readonly danger: "bg-danger";
};
/** Determinate progress (0–100). Pass `value={null}` for indeterminate. Needs an accessible name. */
declare function Progress({ className, value, tone, ...props }: React.ComponentProps<typeof ProgressPrimitive.Root> & {
    tone?: keyof typeof tones;
}): React.JSX.Element;
export { Progress };

import * as React from 'react';
declare const tones: {
    readonly running: {
        readonly dot: "bg-success";
        readonly pulse: true;
    };
    readonly success: {
        readonly dot: "bg-success";
        readonly pulse: false;
    };
    readonly warning: {
        readonly dot: "bg-warning";
        readonly pulse: false;
    };
    readonly danger: {
        readonly dot: "bg-danger";
        readonly pulse: false;
    };
    readonly info: {
        readonly dot: "bg-info";
        readonly pulse: false;
    };
    readonly pending: {
        readonly dot: "bg-border-control";
        readonly pulse: false;
    };
    readonly neutral: {
        readonly dot: "bg-fg-tertiary";
        readonly pulse: false;
    };
};
type StatusBadgeProps = React.ComponentProps<'span'> & {
    status: keyof typeof tones;
    /** Uses Geist Mono for the label (default), matching technical metadata. */
    mono?: boolean;
};
/** Dot + label for operational state. The text, not the color, carries the meaning. */
declare function StatusBadge({ status, mono, className, children, ...props }: StatusBadgeProps): React.JSX.Element;
export { StatusBadge, type StatusBadgeProps };

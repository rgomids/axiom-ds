import * as React from 'react';
type TimelineStatus = 'complete' | 'running' | 'failed' | 'pending' | 'skipped';
type TimelineEvent = {
    id: string;
    title: React.ReactNode;
    status: TimelineStatus;
    /** ISO timestamp or preformatted text, rendered in mono. */
    timestamp?: string;
    duration?: string;
    description?: React.ReactNode;
    /** Extra content: metadata, actions, evidence links. */
    children?: React.ReactNode;
};
/** Ordered list of execution events. Presentational: callers supply status and times. */
declare function ExecutionTimeline({ events, className, 'aria-label': label, ...props }: Omit<React.ComponentProps<'ol'>, 'children'> & {
    events: TimelineEvent[];
}): React.JSX.Element;
export { ExecutionTimeline, type TimelineEvent, type TimelineStatus };

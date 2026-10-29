import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const stateVariants: (props?: ({
    variant?: "default" | "bordered" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
type StateProps = Omit<React.ComponentProps<'div'>, 'title'> & VariantProps<typeof stateVariants> & {
    icon?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    /** Buttons or links rendered under the text. */
    actions?: React.ReactNode;
};
/** No data yet, or no results for the current filters. */
declare function EmptyState({ icon, ...props }: StateProps): React.JSX.Element;
/** Recoverable failure: explain what happened and offer a retry. */
declare function ErrorState({ icon, ...props }: StateProps): React.JSX.Element;
/** Completion confirmation for a flow. */
declare function SuccessState({ icon, ...props }: StateProps): React.JSX.Element;
/** Inline or block loading indicator with a live, visible label. */
declare function LoadingIndicator({ label, layout, className, ...props }: React.ComponentProps<'div'> & {
    label?: string;
    layout?: 'inline' | 'block';
}): React.JSX.Element;
export { EmptyState, ErrorState, SuccessState, LoadingIndicator, type StateProps };

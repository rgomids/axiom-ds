import * as React from 'react';
type ResourceField = {
    label: React.ReactNode;
    value: React.ReactNode;
    /** Render value in Geist Mono (IDs, hashes, timestamps). */
    mono?: boolean;
    /** Plain-text value to copy; shows a copy button when set. */
    copy?: string;
};
/** Key/value details card (description list), e.g. the "Current execution" summary. */
declare function ResourceDetails({ title, aside, fields, className, }: {
    title: React.ReactNode;
    aside?: React.ReactNode;
    fields: ResourceField[];
    className?: string;
}): React.JSX.Element;
export { ResourceDetails, type ResourceField };

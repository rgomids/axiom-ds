import * as React from 'react';
type EvidenceStatus = 'verified' | 'pending' | 'failed';
type EvidenceItem = {
    id: string;
    name: string;
    kind: string;
    /** Content digest, shown truncated in mono with copy. */
    digest?: string;
    size?: string;
    status: EvidenceStatus;
    href?: string;
};
/**
 * List of evidence artifacts with verification state and digests.
 * The panel only displays states supplied by the caller; it verifies nothing.
 */
declare function EvidencePanel({ items, title, actions, className, }: {
    items: EvidenceItem[];
    title?: React.ReactNode;
    actions?: React.ReactNode;
    className?: string;
}): React.JSX.Element;
export { EvidencePanel, type EvidenceItem, type EvidenceStatus };

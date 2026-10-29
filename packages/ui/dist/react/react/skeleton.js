import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../lib/utils';
/** Placeholder for loading content. Wrap the region with aria-busy="true". */
function Skeleton({ className, ...props }) {
    return (_jsx("div", { "data-slot": "skeleton", "aria-hidden": true, className: cn('animate-shimmer rounded-control bg-[linear-gradient(90deg,var(--axion-semantic-surface-muted)_0%,var(--axion-semantic-surface-subtle)_50%,var(--axion-semantic-surface-muted)_100%)] bg-[length:200%_100%]', className), ...props }));
}
export { Skeleton };

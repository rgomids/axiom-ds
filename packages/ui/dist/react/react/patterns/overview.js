import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { EmptyState } from '../empty-state';
import { MetricCard } from '../metric-card';
import { Skeleton } from '../skeleton';
/** Responsive KPI grid with a skeleton state. */
function MetricOverview({ metrics, loading = false, className, }) {
    return (_jsx("div", { "data-slot": "metric-overview", "aria-busy": loading || undefined, className: cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-4', className), children: loading
            ? Array.from({ length: Math.max(metrics.length, 4) }, (_, i) => (_jsxs("div", { className: "grid gap-3 rounded-card border bg-card p-5", children: [_jsx(Skeleton, { className: "h-3 w-24" }), _jsx(Skeleton, { className: "h-7 w-20" }), _jsx(Skeleton, { className: "h-3 w-32" })] }, i)))
            : metrics.map(({ id, ...metric }) => _jsx(MetricCard, { ...metric }, id)) }));
}
/** First-run dashboard: empty state plus ordered onboarding steps. */
function EmptyDashboard({ title, description, steps, actions, className, }) {
    return (_jsxs("section", { "data-slot": "empty-dashboard", className: cn('grid gap-6 rounded-card border border-dashed bg-surface p-6 md:grid-cols-2 md:p-10', className), children: [_jsx(EmptyState, { className: "justify-items-start text-left [&>div]:justify-items-start", size: "sm", title: title, description: description, actions: actions }), _jsx("ol", { className: "grid content-center gap-3", children: steps.map((step, index) => (_jsxs("li", { className: "flex gap-3", children: [_jsx("span", { className: "grid size-6 shrink-0 place-items-center rounded-full border bg-surface-subtle font-mono text-2xs text-fg-secondary", children: index + 1 }), _jsxs("div", { className: "grid gap-0.5", children: [_jsx("span", { className: "text-sm font-medium text-fg", children: step.title }), step.description && (_jsx("span", { className: "text-xs text-fg-tertiary", children: step.description }))] })] }, index))) })] }));
}
export { MetricOverview, EmptyDashboard };

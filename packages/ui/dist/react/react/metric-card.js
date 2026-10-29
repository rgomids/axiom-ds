import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { cn } from '../lib/utils';
/** Label + value pair. Use inside cards, toolbars or detail lists. */
function Statistic({ label, value, unit, mono = true, className, ...props }) {
    return (_jsxs("dl", { "data-slot": "statistic", className: cn('m-0 grid gap-1', className), ...props, children: [_jsx("dt", { className: "text-xs text-fg-tertiary", children: label }), _jsxs("dd", { className: cn('m-0 text-2xl font-semibold tracking-tight text-fg tabular-nums', mono && 'font-mono font-medium tracking-normal'), children: [value, unit && _jsx("span", { className: "ml-1 text-sm font-normal text-fg-tertiary", children: unit })] })] }));
}
function TrendIndicator({ trend }) {
    const Icon = trend.direction === 'up' ? ArrowUpRight : trend.direction === 'down' ? ArrowDownRight : Minus;
    const tone = trend.direction === 'flat' || trend.positive === undefined
        ? 'text-fg-tertiary'
        : trend.positive
            ? 'text-success'
            : 'text-danger';
    return (_jsxs("span", { className: cn('inline-flex items-center gap-0.5 font-mono text-xs', tone), children: [_jsx(Icon, { "aria-hidden": true, className: "size-3.5" }), trend.value, trend.label && _jsx("span", { className: "ml-1 font-sans text-fg-tertiary", children: trend.label })] }));
}
/** Single KPI card: label, value, optional trend, icon and footer. */
function MetricCard({ label, value, unit, trend, icon, footer, className, ...props }) {
    return (_jsxs("div", { "data-slot": "metric-card", className: cn('grid gap-3 rounded-card border bg-card p-5', className), ...props, children: [_jsxs("div", { className: "flex items-start justify-between gap-2", children: [_jsx(Statistic, { label: label, value: value, unit: unit }), icon && (_jsx("span", { "aria-hidden": true, className: "text-fg-tertiary [&_svg]:size-4", children: icon }))] }), (trend || footer) && (_jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs text-fg-tertiary", children: [trend && _jsx(TrendIndicator, { trend: trend }), footer] }))] }));
}
export { MetricCard, Statistic, TrendIndicator };

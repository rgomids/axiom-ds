import * as React from 'react';
type Trend = {
    value: string;
    direction: 'up' | 'down' | 'flat';
    /** Whether this direction is good. */ positive?: boolean;
    label?: string;
};
/** Label + value pair. Use inside cards, toolbars or detail lists. */
declare function Statistic({ label, value, unit, mono, className, ...props }: Omit<React.ComponentProps<'dl'>, 'children'> & {
    label: React.ReactNode;
    value: React.ReactNode;
    unit?: string;
    mono?: boolean;
}): React.JSX.Element;
declare function TrendIndicator({ trend }: {
    trend: Trend;
}): React.JSX.Element;
/** Single KPI card: label, value, optional trend, icon and footer. */
declare function MetricCard({ label, value, unit, trend, icon, footer, className, ...props }: Omit<React.ComponentProps<'div'>, 'children'> & {
    label: React.ReactNode;
    value: React.ReactNode;
    unit?: string;
    trend?: Trend;
    icon?: React.ReactNode;
    footer?: React.ReactNode;
}): React.JSX.Element;
export { MetricCard, Statistic, TrendIndicator, type Trend };

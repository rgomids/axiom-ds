import * as React from 'react';
import { MetricCard } from '../metric-card';
type Metric = React.ComponentProps<typeof MetricCard> & {
    id: string;
};
/** Responsive KPI grid with a skeleton state. */
declare function MetricOverview({ metrics, loading, className, }: {
    metrics: Metric[];
    loading?: boolean;
    className?: string;
}): React.JSX.Element;
/** First-run dashboard: empty state plus ordered onboarding steps. */
declare function EmptyDashboard({ title, description, steps, actions, className, }: {
    title: React.ReactNode;
    description?: React.ReactNode;
    steps: {
        title: React.ReactNode;
        description?: React.ReactNode;
    }[];
    actions?: React.ReactNode;
    className?: string;
}): React.JSX.Element;
export { MetricOverview, EmptyDashboard };

import * as React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { cn } from '../lib/utils';

type Trend = {
  value: string;
  direction: 'up' | 'down' | 'flat';
  /** Whether this direction is good. */ positive?: boolean;
  label?: string;
};

/** Label + value pair. Use inside cards, toolbars or detail lists. */
function Statistic({
  label,
  value,
  unit,
  mono = true,
  className,
  ...props
}: Omit<React.ComponentProps<'dl'>, 'children'> & {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: string;
  mono?: boolean;
}) {
  return (
    <dl data-slot="statistic" className={cn('m-0 grid gap-1', className)} {...props}>
      <dt className="text-xs text-fg-tertiary">{label}</dt>
      <dd
        className={cn(
          'm-0 text-2xl font-semibold tracking-tight text-fg tabular-nums',
          mono && 'font-mono font-medium tracking-normal',
        )}
      >
        {value}
        {unit && <span className="ml-1 text-sm font-normal text-fg-tertiary">{unit}</span>}
      </dd>
    </dl>
  );
}

function TrendIndicator({ trend }: { trend: Trend }) {
  const Icon =
    trend.direction === 'up' ? ArrowUpRight : trend.direction === 'down' ? ArrowDownRight : Minus;
  const tone =
    trend.direction === 'flat' || trend.positive === undefined
      ? 'text-fg-tertiary'
      : trend.positive
        ? 'text-success'
        : 'text-danger';
  return (
    <span className={cn('inline-flex items-center gap-0.5 font-mono text-xs', tone)}>
      <Icon aria-hidden className="size-3.5" />
      {trend.value}
      {trend.label && <span className="ml-1 font-sans text-fg-tertiary">{trend.label}</span>}
    </span>
  );
}

/** Single KPI card: label, value, optional trend, icon and footer. */
function MetricCard({
  label,
  value,
  unit,
  trend,
  icon,
  footer,
  className,
  ...props
}: Omit<React.ComponentProps<'div'>, 'children'> & {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: string;
  trend?: Trend;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div
      data-slot="metric-card"
      className={cn('grid gap-3 rounded-card border bg-card p-5', className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <Statistic label={label} value={value} unit={unit} />
        {icon && (
          <span aria-hidden className="text-fg-tertiary [&_svg]:size-4">
            {icon}
          </span>
        )}
      </div>
      {(trend || footer) && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-fg-tertiary">
          {trend && <TrendIndicator trend={trend} />}
          {footer}
        </div>
      )}
    </div>
  );
}

export { MetricCard, Statistic, TrendIndicator, type Trend };

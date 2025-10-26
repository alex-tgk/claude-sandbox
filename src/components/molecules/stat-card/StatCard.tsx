import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

export type StatTrend = 'up' | 'down' | 'neutral';

export interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
  helperText?: string;
  delta?: string;
  trend?: StatTrend;
}

const trendClasses: Record<StatTrend, string> = {
  up: 'text-success',
  down: 'text-error',
  neutral: 'text-text-muted',
};

const trendSymbols: Record<StatTrend, string> = {
  up: '^',
  down: 'v',
  neutral: '-',
};

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, helperText, delta, trend = 'neutral', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-border-subtle bg-surface p-4 shadow-sm',
        'flex flex-col gap-2',
        className
      )}
      {...props}
    >
      <div className="text-sm font-medium text-text-muted">{label}</div>
      <div className="text-3xl font-semibold tracking-tight text-text">{value}</div>
      {delta ? (
        <div className={cn('flex items-center gap-1 text-sm', trendClasses[trend])}>
          <span aria-label={`Trend ${trend}`}>{trendSymbols[trend]}</span>
          <span>{delta}</span>
        </div>
      ) : null}
      {helperText ? <div className="text-xs text-text-muted">{helperText}</div> : null}
      {children}
    </div>
  )
);

StatCard.displayName = 'StatCard';

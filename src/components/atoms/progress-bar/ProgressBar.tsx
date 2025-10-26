import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

export type ProgressBarTone = 'brand' | 'success' | 'warning' | 'danger';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  label?: string;
  indeterminate?: boolean;
  tone?: ProgressBarTone;
  showValue?: boolean;
}

const toneClasses: Record<ProgressBarTone, string> = {
  brand: 'bg-brand-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-500',
  danger: 'bg-red-600',
};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    { className, value = 0, label, indeterminate = false, tone = 'brand', showValue = true, ...props },
    ref
  ) => {
    const clamped = Math.max(0, Math.min(100, value));
    const ariaProps = indeterminate
      ? { role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100 }
      : { role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': clamped };

    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label ? (
          <div className="flex items-center justify-between text-sm text-text-muted">
            <span>{label}</span>
            {showValue && !indeterminate ? <span>{clamped}%</span> : null}
          </div>
        ) : null}
        <div className="relative h-2 overflow-hidden rounded-full bg-border-subtle" {...ariaProps}>
          <div
            className={cn(
              'h-full rounded-full transition-[width] duration-200 ease-out',
              toneClasses[tone],
              indeterminate && 'w-1/3 animate-pulse'
            )}
            style={indeterminate ? undefined : { width: `${clamped}%` }}
          />
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

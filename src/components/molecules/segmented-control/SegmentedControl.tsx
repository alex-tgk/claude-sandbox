import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';

export interface SegmentedControlOption {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export type SegmentedControlSize = 'sm' | 'md';

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  size?: SegmentedControlSize;
  ariaLabel?: string;
}

const sizeClasses: Record<SegmentedControlSize, string> = {
  sm: 'text-sm h-8 px-3',
  md: 'text-base h-10 px-4',
};

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  ({ className, options, value, onChange, size = 'md', ariaLabel, ...props }, ref) => (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn('inline-flex rounded-lg border border-border-subtle bg-surface', className)}
      {...props}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={option.disabled}
            onClick={() => !option.disabled && onChange(option.value)}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 border-r border-border-subtle first:rounded-l-lg last:rounded-r-lg last:border-r-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-40 disabled:cursor-not-allowed',
              isSelected
                ? 'bg-interactive/10 text-interactive font-semibold'
                : 'text-text-muted hover:bg-surface-muted',
              sizeClasses[size]
            )}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  )
);

SegmentedControl.displayName = 'SegmentedControl';

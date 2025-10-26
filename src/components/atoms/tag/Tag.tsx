import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

export type TagVariant = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
export type TagSize = 'sm' | 'md';

export interface TagProps extends HTMLAttributes<HTMLDivElement> {
  variant?: TagVariant;
  size?: TagSize;
  removable?: boolean;
  onRemove?: () => void;
}

const variantClasses: Record<TagVariant, string> = {
  neutral: 'bg-surface-muted text-text border-border-subtle',
  success: 'bg-success-light text-success border-success',
  warning: 'bg-warning-light text-warning border-warning',
  danger: 'bg-error-light text-error border-error',
  info: 'bg-info-light text-info border-info',
};

const sizeClasses: Record<TagSize, string> = {
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-sm px-3 py-1 gap-1.5',
};

export const Tag = forwardRef<HTMLDivElement, TagProps>(
  ({ className, children, variant = 'neutral', size = 'md', removable = false, onRemove, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border font-medium leading-tight transition-colors',
          'focus-within:ring-2 focus-within:ring-border-focus focus-within:ring-offset-2 focus-within:ring-offset-transparent',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        <span className="truncate">{children}</span>
        {removable ? (
          <button
            type="button"
            aria-label="Remove tag"
            className="rounded-full p-0.5 text-current transition hover:bg-border-subtle/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            onClick={onRemove}
          >
            x
          </button>
        ) : null}
      </div>
    );
  }
);

Tag.displayName = 'Tag';

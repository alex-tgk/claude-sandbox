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
  success: 'bg-green-50 text-green-800 border-green-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  danger: 'bg-red-50 text-red-800 border-red-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
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
          'inline-flex items-center rounded-full border font-medium leading-tight',
          'focus-within:ring-2 focus-within:ring-brand-500 focus-within:ring-offset-2',
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
            className="rounded-full p-0.5 text-current transition hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
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

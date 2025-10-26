import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

export type IconButtonVariant = 'solid' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  ariaLabel?: string;
}

const variantClasses: Record<IconButtonVariant, string> = {
  solid:
    'bg-interactive text-text-on-color hover:bg-interactive-hover active:bg-interactive-active border border-transparent',
  ghost: 'text-interactive border border-transparent hover:bg-surface-muted active:bg-surface-hover',
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      children,
      variant = 'ghost',
      size = 'md',
      ariaLabel,
      type = 'button',
      disabled,
      ...props
    },
    ref
  ) => {
    const resolvedLabel =
      ariaLabel ?? (typeof children === 'string' ? children : undefined) ?? 'Icon button';

    return (
      <button
        ref={ref}
        type={type}
        aria-label={resolvedLabel}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-60',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children ?? <span className="sr-only">{resolvedLabel}</span>}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

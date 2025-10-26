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
  solid: 'bg-brand-600 text-white hover:bg-brand-500 active:bg-brand-700 focus-visible:outline-brand-500',
  ghost: 'text-brand-600 hover:bg-brand-50 active:bg-brand-100 focus-visible:outline-brand-500',
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({
    className,
    children,
    variant = 'ghost',
    size = 'md',
    ariaLabel,
    type = 'button',
    disabled,
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
        className={cn(
          'inline-flex items-center justify-center rounded-full border border-transparent transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children ?? <span className="sr-only">{ariaLabel ?? 'Icon button'}</span>}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

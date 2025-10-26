import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Button variant types using discriminated union pattern
 *
 * @since 0.1.0
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Button size types
 *
 * @since 0.1.0
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component
 *
 * @remarks
 * Extends native button HTML attributes with custom variants and sizes.
 * Supports all standard button props (onClick, disabled, type, etc.)
 *
 * @since 0.1.0
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual variant of the button
   * @defaultValue 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @defaultValue 'md'
   */
  size?: ButtonSize;

  /**
   * Whether the button should take full width of its container
   * @defaultValue false
   */
  isFullWidth?: boolean;

  /**
   * Whether the button is in a loading state
   * @defaultValue false
   */
  isLoading?: boolean;

  /**
   * Optional icon to display before the button text
   */
  startIcon?: React.ReactNode;

  /**
   * Optional icon to display after the button text
   */
  endIcon?: React.ReactNode;
}

/**
 * Get the CSS classes for a button variant
 *
 * @param variant - The button variant
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getVariantClasses = (variant: ButtonVariant): string => {
  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-interactive text-text-on-color hover:bg-interactive-hover active:bg-interactive-active focus-visible:ring-interactive border border-transparent',
    secondary:
      'bg-surface-muted text-text-primary hover:bg-surface-hover active:bg-surface-active focus-visible:ring-border-interactive border border-transparent',
    outline:
      'border border-border-strong bg-transparent text-text-primary hover:bg-surface-hover active:bg-surface-active focus-visible:ring-border-interactive',
    ghost:
      'bg-transparent text-text-primary hover:bg-surface-hover active:bg-surface-active focus-visible:ring-border-interactive border border-transparent',
    danger:
      'bg-error text-text-on-color hover:opacity-90 active:opacity-80 focus-visible:ring-error border border-transparent',
  };

  return variants[variant];
};

/**
 * Get the CSS classes for a button size
 *
 * @param size - The button size
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getSizeClasses = (size: ButtonSize): string => {
  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return sizes[size];
};

/**
 * Button component - A flexible, accessible button with multiple variants.
 *
 * @remarks
 * This component follows the styled wrapper pattern:
 * - Extends native button element for accessibility
 * - Supports keyboard navigation and focus management
 * - WCAG 2.2 AA compliant with proper contrast ratios
 * - Fully typed with TypeScript
 * - Ref forwarding for advanced use cases
 *
 * Features:
 * - Multiple visual variants (primary, secondary, outline, ghost, danger)
 * - Size options (sm, md, lg)
 * - Loading state with disabled interaction
 * - Start/end icons for enhanced UX
 * - Full width option
 * - All native button props supported
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Button onClick={handleClick}>Click me</Button>
 * ```
 *
 * @example
 * With variants and sizes:
 * ```tsx
 * <Button variant="primary" size="lg">
 *   Primary Large Button
 * </Button>
 * <Button variant="outline" size="sm">
 *   Small Outline Button
 * </Button>
 * ```
 *
 * @example
 * With icons:
 * ```tsx
 * <Button startIcon={<IconSave />} variant="primary">
 *   Save
 * </Button>
 * <Button endIcon={<IconArrowRight />} variant="secondary">
 *   Next
 * </Button>
 * ```
 *
 * @example
 * Loading state:
 * ```tsx
 * <Button isLoading disabled>
 *   Saving...
 * </Button>
 * ```
 *
 * @since 0.1.0
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isFullWidth = false,
      isLoading = false,
      startIcon,
      endIcon,
      children,
      className,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      // Layout
      'inline-flex items-center justify-center gap-2',
      // Typography
      'font-medium',
      // Border - Sharp corners like IBM Carbon
      'rounded-none',
      // Transitions - Carbon uses 110ms
      'transition-all duration-110',
      // Focus - Inset focus ring like Carbon
      'focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-border-focus',
      // Disabled state
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    ];

    const classes = cn(
      baseClasses,
      getVariantClasses(variant),
      getSizeClasses(size),
      isFullWidth && 'w-full',
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        disabled={disabled || isLoading}
        className={classes}
        {...props}
      >
        {isLoading && (
          <span
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            role="status"
            aria-label="Loading"
          />
        )}
        {!isLoading && startIcon && <span className="inline-flex">{startIcon}</span>}
        {children}
        {!isLoading && endIcon && <span className="inline-flex">{endIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

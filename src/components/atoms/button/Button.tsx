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
 * @remarks
 * Carbon focus state pattern:
 * - 2px focus border with 1px transparent inset space
 * - Uses box-shadow for the inset border effect
 * - Focus color: Blue 60 (light), White (dark)
 */
const getVariantClasses = (variant: ButtonVariant): string => {
  // Carbon focus pattern: 2px border with 1px inset transparent space
  // Implemented with box-shadow: inset 0 0 0 1px transparent, inset 0 0 0 2px focus-color
  const carbonFocus = 'focus-visible:shadow-[inset_0_0_0_1px_transparent,inset_0_0_0_3px_var(--border-focus)]';

  const variants: Record<ButtonVariant, string> = {
    primary: `bg-interactive text-text-on-color hover:bg-interactive-hover active:bg-interactive-active border border-transparent ${carbonFocus}`,
    secondary: `bg-surface-muted text-text-primary hover:bg-surface-hover active:bg-surface-active border border-transparent ${carbonFocus}`,
    outline: `border border-border-strong bg-transparent text-text-primary hover:bg-surface-hover active:bg-surface-active ${carbonFocus}`,
    ghost: `bg-transparent text-text-primary hover:bg-surface-hover active:bg-surface-active border border-transparent ${carbonFocus}`,
    danger: `bg-error text-text-on-color hover:opacity-90 active:opacity-80 border border-transparent ${carbonFocus}`,
  };

  return variants[variant];
};

/**
 * Get the CSS classes for a button size
 *
 * @param size - The button size
 * @param variant - The button variant (affects padding)
 * @returns Tailwind CSS class string
 *
 * @internal
 * @remarks
 * Carbon button specifications:
 * - sm: height 32px (2rem)
 * - md: height 40px (2.5rem) - matches form fields
 * - lg: height 48px (3rem)
 * - Padding: 16px left, 64px right (except ghost: 16px/16px)
 */
const getSizeClasses = (size: ButtonSize, variant: ButtonVariant): string => {
  // Carbon uses left-aligned text with asymmetric padding (16px left, 64px right)
  // Exception: ghost buttons use 16px on both sides
  const isGhost = variant === 'ghost';

  const sizes: Record<ButtonSize, string> = {
    // h-8 = 32px, Carbon spacing: --spacing-05 (16px), --spacing-10 (64px)
    sm: isGhost ? 'h-8 px-4 text-sm' : 'h-8 pl-4 pr-16 text-sm',
    // h-10 = 40px (matches Carbon field height)
    md: isGhost ? 'h-10 px-4 text-sm' : 'h-10 pl-4 pr-16 text-sm',
    // h-12 = 48px (Carbon large/productive)
    lg: isGhost ? 'h-12 px-4 text-base' : 'h-12 pl-4 pr-16 text-base',
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
/**
 * Base classes for all buttons - extracted as constant for performance
 * @internal
 */
const BASE_CLASSES =
  'inline-flex items-center justify-start gap-2 font-medium rounded-none transition-all duration-110 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none';

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
    const classes = cn(
      BASE_CLASSES,
      getVariantClasses(variant),
      getSizeClasses(size, variant),
      isFullWidth && 'w-full',
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        disabled={disabled || isLoading}
        aria-busy={isLoading}
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

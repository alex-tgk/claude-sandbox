import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { useId } from '../../../hooks/use-id';

/**
 * Input variant types
 *
 * @since 0.1.0
 */
export type InputVariant = 'default' | 'error' | 'success';

/**
 * Input size types
 *
 * @since 0.1.0
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Input component
 *
 * @remarks
 * Extends native input HTML attributes with custom variants, sizes, and helper text.
 * Supports all standard input props (onChange, value, placeholder, etc.)
 * Note: The native HTML 'size' attribute is omitted in favor of our custom size prop.
 *
 * @since 0.1.0
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Visual variant of the input
   * @defaultValue 'default'
   */
  variant?: InputVariant;

  /**
   * Size of the input
   * @defaultValue 'md'
   */
  size?: InputSize;

  /**
   * Label text for the input
   */
  label?: string;

  /**
   * Helper text displayed below the input
   */
  helperText?: string;

  /**
   * Error message displayed below the input (sets variant to 'error')
   */
  error?: string;

  /**
   * Whether the input is required
   * @defaultValue false
   */
  isRequired?: boolean;

  /**
   * Whether the input should take full width of its container
   * @defaultValue false
   */
  isFullWidth?: boolean;

  /**
   * Optional icon or element to display at the start of the input
   */
  startAdornment?: React.ReactNode;

  /**
   * Optional icon or element to display at the end of the input
   */
  endAdornment?: React.ReactNode;
}

/**
 * Get the CSS classes for an input variant
 *
 * @param variant - The input variant
 * @returns Tailwind CSS class string
 *
 * @internal
 * @remarks
 * Carbon focus state pattern (same as buttons):
 * - 2px focus border with 1px transparent inset space
 * - Uses box-shadow for the inset border effect
 */
const getVariantClasses = (variant: InputVariant, hasError: boolean): string => {
  // Carbon focus pattern: 2px border with 1px inset transparent space
  const carbonFocus = 'focus:shadow-[inset_0_0_0_1px_transparent,inset_0_0_0_3px_var(--border-focus)]';

  if (hasError || variant === 'error') {
    return `border-error ${carbonFocus}`;
  }

  const variants: Record<InputVariant, string> = {
    default: `border-border-subtle ${carbonFocus}`,
    error: `border-error ${carbonFocus}`,
    success: `border-success ${carbonFocus}`,
  };

  return variants[variant];
};

/**
 * Get the CSS classes for an input size
 *
 * @param size - The input size
 * @returns Tailwind CSS class string
 *
 * @internal
 * @remarks
 * Carbon text input field specifications:
 * - sm: height 32px (2rem) - h-8
 * - md: height 40px (2.5rem) - h-10 - DEFAULT, matches buttons
 * - lg: height 48px (3rem) - h-12
 * - Horizontal padding: 16px (--spacing-05) = px-4
 */
const getSizeClasses = (size: InputSize): string => {
  const sizes: Record<InputSize, string> = {
    // h-8 = 32px, Carbon small fields, px-4 = 16px horizontal padding
    sm: 'h-8 px-4 text-sm',
    // h-10 = 40px, Carbon default field height (matches buttons!), body-01 14px
    md: 'h-10 px-4 text-sm',
    // h-12 = 48px, Carbon large fields
    lg: 'h-12 px-4 text-base',
  };

  return sizes[size];
};

/**
 * Input component - A flexible, accessible text input with multiple variants.
 *
 * @remarks
 * This component provides a styled text input with:
 * - Label and helper text support
 * - Error state with error messages
 * - Multiple visual variants and sizes
 * - Start/end adornments for icons
 * - WCAG 2.2 AA compliant
 * - SSR-friendly
 * - Ref forwarding
 *
 * Features:
 * - Automatic ID generation for label association
 * - Required field indicator
 * - Disabled state styling
 * - Focus management and keyboard navigation
 * - Full TypeScript support
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 * />
 * ```
 *
 * @example
 * With error state:
 * ```tsx
 * <Input
 *   label="Username"
 *   error="Username is already taken"
 *   value={username}
 *   onChange={(e) => setUsername(e.target.value)}
 * />
 * ```
 *
 * @example
 * With adornments:
 * ```tsx
 * <Input
 *   label="Search"
 *   startAdornment={<IconSearch />}
 *   placeholder="Search..."
 * />
 * ```
 *
 * @since 0.1.0
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      label,
      helperText,
      error,
      isRequired = false,
      isFullWidth = false,
      startAdornment,
      endAdornment,
      className,
      id: providedId,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId('input');
    const id = providedId ?? generatedId;
    const hasError = Boolean(error);
    const displayedHelperText = error ?? helperText;

    const baseClasses = [
      // Layout
      'block',
      // Typography
      'font-normal',
      // Border - Sharp corners like Carbon
      'border rounded-none',
      // Background - Carbon field colors
      'bg-field-01',
      'text-text-primary',
      // Placeholder
      'placeholder:text-text-placeholder',
      // Transitions - Carbon timing
      'transition-all duration-110',
      // Focus - Inset focus like Carbon
      'focus:outline-none',
      // Disabled state
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-layer-01',
    ];

    const inputClasses = cn(
      baseClasses,
      getVariantClasses(variant, hasError),
      getSizeClasses(size),
      isFullWidth && 'w-full',
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      (startAdornment || endAdornment) && 'pr-10',
      className
    );

    const wrapperClasses = cn('relative', isFullWidth && 'w-full');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label
            htmlFor={id}
            className="mb-2 block text-xs font-normal text-text-primary"
          >
            {label}
            {isRequired && (
              <span className="ml-1 text-text-error" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {startAdornment && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {startAdornment}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={displayedHelperText ? `${id}-helper` : undefined}
            aria-required={isRequired}
            className={cn(inputClasses, startAdornment && 'pl-10')}
            {...props}
          />

          {endAdornment && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {endAdornment}
            </div>
          )}
        </div>

        {displayedHelperText && (
          <p
            id={`${id}-helper`}
            className={cn(
              'mt-2 text-xs',
              hasError ? 'text-error' : 'text-text-secondary'
            )}
          >
            {displayedHelperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

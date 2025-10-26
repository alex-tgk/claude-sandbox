import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { useId } from '../../hooks/use-id';

/**
 * TextArea variant types
 *
 * @since 0.2.0
 */
export type TextAreaVariant = 'default' | 'error' | 'success';

/**
 * TextArea size types
 *
 * @since 0.2.0
 */
export type TextAreaSize = 'sm' | 'md' | 'lg';

/**
 * Props for the TextArea component
 *
 * @remarks
 * Extends native textarea HTML attributes with custom variants, sizes, and helper text.
 * Supports all standard textarea props (onChange, value, placeholder, rows, etc.)
 *
 * @since 0.2.0
 */
export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Visual variant of the textarea
   * @defaultValue 'default'
   */
  variant?: TextAreaVariant;

  /**
   * Size of the textarea (affects padding and font size)
   * @defaultValue 'md'
   */
  size?: TextAreaSize;

  /**
   * Label text for the textarea
   */
  label?: string;

  /**
   * Helper text displayed below the textarea
   */
  helperText?: string;

  /**
   * Error message displayed below the textarea (sets variant to 'error')
   */
  error?: string;

  /**
   * Whether the textarea is required
   * @defaultValue false
   */
  isRequired?: boolean;

  /**
   * Whether the textarea should take full width of its container
   * @defaultValue false
   */
  isFullWidth?: boolean;

  /**
   * Whether to show a character counter
   * @defaultValue false
   */
  showCharacterCount?: boolean;

  /**
   * Maximum number of characters allowed
   */
  maxLength?: number;

  /**
   * Whether the textarea should auto-resize based on content
   * @defaultValue false
   */
  autoResize?: boolean;
}

/**
 * Get the CSS classes for a textarea variant
 *
 * @param variant - The textarea variant
 * @returns Tailwind CSS class string
 *
 * @internal
 * @remarks
 * Carbon focus state pattern (same as inputs):
 * - 2px focus border with 1px transparent inset space
 * - Uses box-shadow for the inset border effect
 */
const getVariantClasses = (variant: TextAreaVariant, hasError: boolean): string => {
  // Carbon focus pattern: 2px border with 1px inset transparent space
  const carbonFocus = 'focus:shadow-[inset_0_0_0_1px_transparent,inset_0_0_0_3px_var(--border-focus)]';

  if (hasError || variant === 'error') {
    return `border-error ${carbonFocus}`;
  }

  const variants: Record<TextAreaVariant, string> = {
    default: `border-border-subtle ${carbonFocus}`,
    error: `border-error ${carbonFocus}`,
    success: `border-success ${carbonFocus}`,
  };

  return variants[variant];
};

/**
 * Get the CSS classes for a textarea size
 *
 * @param size - The textarea size
 * @returns Tailwind CSS class string
 *
 * @internal
 * @remarks
 * Carbon textarea specifications:
 * - Horizontal padding: 16px (--spacing-05) = px-4
 * - Vertical padding: 12px (--spacing-04) = py-3
 */
const getSizeClasses = (size: TextAreaSize): string => {
  const sizes: Record<TextAreaSize, string> = {
    sm: 'px-4 py-2 text-sm',      // Small: 8px vertical padding
    md: 'px-4 py-3 text-sm',      // Medium: 12px vertical padding (default)
    lg: 'px-4 py-4 text-base',    // Large: 16px vertical padding
  };

  return sizes[size];
};

/**
 * TextArea component - A flexible, accessible multi-line text input.
 *
 * @remarks
 * This component provides a styled textarea with:
 * - Label and helper text support
 * - Error state with error messages
 * - Multiple visual variants and sizes
 * - Character counter (optional)
 * - Auto-resize capability (optional)
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
 * - Carbon Design System styling
 *
 * @example
 * Basic usage:
 * ```tsx
 * <TextArea
 *   label="Description"
 *   placeholder="Enter description..."
 *   rows={4}
 * />
 * ```
 *
 * @example
 * With error state:
 * ```tsx
 * <TextArea
 *   label="Comments"
 *   error="Comment must be at least 10 characters"
 *   value={comment}
 *   onChange={(e) => setComment(e.target.value)}
 * />
 * ```
 *
 * @example
 * With character counter:
 * ```tsx
 * <TextArea
 *   label="Bio"
 *   maxLength={500}
 *   showCharacterCount
 *   placeholder="Tell us about yourself..."
 * />
 * ```
 *
 * @since 0.2.0
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      variant = 'default',
      size = 'md',
      label,
      helperText,
      error,
      isRequired = false,
      isFullWidth = false,
      showCharacterCount = false,
      maxLength,
      autoResize = false,
      className,
      id: providedId,
      disabled,
      rows = 4,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId('textarea');
    const id = providedId ?? generatedId;
    const hasError = Boolean(error);
    const displayedHelperText = error ?? helperText;

    const currentLength = typeof value === 'string' ? value.length : 0;

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
      // Resize behavior
      autoResize ? 'resize-none overflow-hidden' : 'resize-y',
      // Min height
      'min-h-[80px]',
    ];

    const textareaClasses = cn(
      baseClasses,
      getVariantClasses(variant, hasError),
      getSizeClasses(size),
      isFullWidth && 'w-full',
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

        <textarea
          ref={ref}
          id={id}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          value={value}
          onChange={onChange}
          aria-invalid={hasError}
          aria-describedby={displayedHelperText ? `${id}-helper` : undefined}
          aria-required={isRequired}
          className={textareaClasses}
          {...props}
        />

        {(displayedHelperText || showCharacterCount) && (
          <div className="mt-2 flex items-center justify-between gap-2">
            {displayedHelperText && (
              <p
                id={`${id}-helper`}
                className={cn(
                  'text-xs',
                  hasError ? 'text-error' : 'text-text-secondary'
                )}
              >
                {displayedHelperText}
              </p>
            )}

            {showCharacterCount && maxLength && (
              <p
                className={cn(
                  'text-xs tabular-nums',
                  currentLength > maxLength ? 'text-error' : 'text-text-secondary'
                )}
                aria-live="polite"
              >
                {currentLength} / {maxLength}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

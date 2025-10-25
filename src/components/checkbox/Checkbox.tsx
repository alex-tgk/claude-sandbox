import { forwardRef, useRef, useEffect, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { useId } from '../../hooks/use-id';
import { useControlledState } from '../../hooks/use-controlled-state';

/**
 * Checkbox variant types
 *
 * @since 0.1.0
 */
export type CheckboxVariant = 'primary' | 'secondary' | 'success' | 'error';

/**
 * Checkbox size types
 *
 * @since 0.1.0
 */
export type CheckboxSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Checkbox component
 *
 * @remarks
 * Extends native input HTML attributes with custom variants, sizes, and label support.
 * Supports both controlled and uncontrolled modes via checked/defaultChecked.
 * Note: The native HTML 'size' attribute is omitted in favor of our custom size prop.
 *
 * @since 0.1.0
 */
export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * Visual variant of the checkbox
   * @defaultValue 'primary'
   */
  variant?: CheckboxVariant;

  /**
   * Size of the checkbox
   * @defaultValue 'md'
   */
  size?: CheckboxSize;

  /**
   * Label text for the checkbox
   */
  label?: string;

  /**
   * Helper text displayed below the checkbox
   */
  helperText?: string;

  /**
   * Error message displayed below the checkbox (sets variant to 'error')
   */
  error?: string;

  /**
   * Whether the checkbox is in an indeterminate state
   * @defaultValue false
   */
  indeterminate?: boolean;

  /**
   * Whether the checkbox is required
   * @defaultValue false
   */
  isRequired?: boolean;

  /**
   * Controlled checked state
   */
  checked?: boolean;

  /**
   * Default checked state for uncontrolled mode
   */
  defaultChecked?: boolean;

  /**
   * Callback when checked state changes
   */
  onCheckedChange?: (checked: boolean) => void;
}

/**
 * Get the CSS classes for a checkbox variant
 *
 * @param variant - The checkbox variant
 * @param hasError - Whether the checkbox has an error
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getVariantClasses = (variant: CheckboxVariant, hasError: boolean): string => {
  if (hasError || variant === 'error') {
    return 'border-error data-[state=checked]:bg-error data-[state=checked]:border-error data-[state=indeterminate]:bg-error data-[state=indeterminate]:border-error';
  }

  const variants: Record<CheckboxVariant, string> = {
    primary:
      'border-border data-[state=checked]:bg-brand-600 data-[state=checked]:border-brand-600 data-[state=indeterminate]:bg-brand-600 data-[state=indeterminate]:border-brand-600',
    secondary:
      'border-border data-[state=checked]:bg-surface-active data-[state=checked]:border-surface-active data-[state=indeterminate]:bg-surface-active data-[state=indeterminate]:border-surface-active',
    success:
      'border-border data-[state=checked]:bg-success data-[state=checked]:border-success data-[state=indeterminate]:bg-success data-[state=indeterminate]:border-success',
    error:
      'border-error data-[state=checked]:bg-error data-[state=checked]:border-error data-[state=indeterminate]:bg-error data-[state=indeterminate]:border-error',
  };

  return variants[variant];
};

/**
 * Get the CSS classes for a checkbox size
 *
 * @param size - The checkbox size
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getSizeClasses = (size: CheckboxSize): string => {
  const sizes: Record<CheckboxSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return sizes[size];
};

/**
 * Get the icon size for a checkbox size
 *
 * @param size - The checkbox size
 * @returns Icon size in pixels
 *
 * @internal
 */
const getIconSize = (size: CheckboxSize): number => {
  const sizes: Record<CheckboxSize, number> = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  return sizes[size];
};

/**
 * Checkbox component - A fully accessible checkbox with multiple variants and states.
 *
 * @remarks
 * This component provides a styled checkbox with:
 * - Controlled/uncontrolled mode support
 * - Label and helper text support
 * - Error state with error messages
 * - Indeterminate state support
 * - Multiple visual variants and sizes
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
 * - Custom check and indeterminate icons
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Checkbox label="Accept terms and conditions" />
 * ```
 *
 * @example
 * Controlled mode:
 * ```tsx
 * const [checked, setChecked] = useState(false);
 * <Checkbox
 *   label="Subscribe to newsletter"
 *   checked={checked}
 *   onCheckedChange={setChecked}
 * />
 * ```
 *
 * @example
 * With error state:
 * ```tsx
 * <Checkbox
 *   label="I agree"
 *   error="You must agree to continue"
 *   required
 * />
 * ```
 *
 * @example
 * Indeterminate state:
 * ```tsx
 * <Checkbox
 *   label="Select all"
 *   indeterminate={someChecked && !allChecked}
 *   checked={allChecked}
 *   onCheckedChange={handleSelectAll}
 * />
 * ```
 *
 * @since 0.1.0
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      label,
      helperText,
      error,
      indeterminate = false,
      isRequired = false,
      checked: checkedProp,
      defaultChecked,
      onCheckedChange,
      onChange,
      className,
      id: providedId,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId('checkbox');
    const id = providedId ?? generatedId;
    const hasError = Boolean(error);
    const displayedHelperText = error ?? helperText;
    const internalRef = useRef<HTMLInputElement>(null);

    // Merge refs
    const inputRef = (node: HTMLInputElement | null) => {
      // Update internal ref
      (internalRef as React.MutableRefObject<HTMLInputElement | null>).current = node;

      // Update forwarded ref
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref).current = node;
      }
    };

    // Use controlled state hook
    const [checked, setChecked] = useControlledState({
      value: checkedProp,
      defaultValue: defaultChecked ?? false,
      onChange: onCheckedChange,
    });

    // Handle indeterminate state via ref (indeterminate is not a boolean attribute)
    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      setChecked(newChecked);
      onChange?.(event);
    };

    // Determine state for data attribute
    const state = indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked';

    const iconSize = getIconSize(size);

    const checkboxClasses = cn(
      // Base styles
      'peer shrink-0 appearance-none rounded border-2 bg-surface transition-interactive',
      // Focus styles
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-500',
      // Disabled styles
      'disabled:cursor-not-allowed disabled:opacity-50',
      // Hover styles (only when not disabled)
      'enabled:hover:border-brand-500',
      // Variant and size
      getVariantClasses(variant, hasError),
      getSizeClasses(size),
      className
    );

    const labelClasses = cn(
      'text-sm font-medium text-text',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
    );

    const wrapperClasses = 'flex items-start gap-2';

    return (
      <div className="inline-flex flex-col">
        <div className={wrapperClasses}>
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="checkbox"
              id={id}
              checked={checked ?? false}
              disabled={disabled}
              aria-invalid={hasError}
              aria-describedby={displayedHelperText ? `${id}-helper` : undefined}
              aria-required={isRequired}
              onChange={handleChange}
              className={checkboxClasses}
              data-state={state}
              {...props}
            />

            {/* Check icon */}
            {checked && !indeterminate && (
              <svg
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                width={iconSize}
                height={iconSize}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M13 4L6 11L3 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            {/* Indeterminate icon */}
            {indeterminate && (
              <svg
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                width={iconSize}
                height={iconSize}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 8H12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>

          {label && (
            <label htmlFor={id} className={labelClasses}>
              {label}
              {isRequired && (
                <span className="ml-1 text-error" aria-label="required">
                  *
                </span>
              )}
            </label>
          )}
        </div>

        {displayedHelperText && (
          <p
            id={`${id}-helper`}
            className={cn(
              'ml-6 mt-1.5 text-sm',
              hasError ? 'text-error' : 'text-text-muted'
            )}
          >
            {displayedHelperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

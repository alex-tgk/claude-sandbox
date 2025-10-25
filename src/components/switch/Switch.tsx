import { forwardRef, useCallback, type KeyboardEvent } from 'react';
import { cn } from '../../utils/cn';
import { useControlledState } from '../../hooks/use-controlled-state';
import { useId } from '../../hooks/use-id';

/**
 * Switch variant types
 *
 * @since 0.1.0
 */
export type SwitchVariant = 'primary' | 'secondary' | 'success';

/**
 * Switch size types
 *
 * @since 0.1.0
 */
export type SwitchSize = 'sm' | 'md' | 'lg';

/**
 * Switch label position types
 *
 * @since 0.1.0
 */
export type SwitchLabelPosition = 'left' | 'right';

/**
 * Props for the Switch component
 *
 * @remarks
 * Supports both controlled and uncontrolled modes.
 * Use `checked` and `onChange` for controlled mode.
 * Use `defaultChecked` for uncontrolled mode.
 *
 * @since 0.1.0
 */
export interface SwitchProps {
  /**
   * Visual variant of the switch
   * @defaultValue 'primary'
   */
  variant?: SwitchVariant;

  /**
   * Size of the switch
   * @defaultValue 'md'
   */
  size?: SwitchSize;

  /**
   * Label text for the switch
   */
  label?: string;

  /**
   * Position of the label relative to the switch
   * @defaultValue 'right'
   */
  labelPosition?: SwitchLabelPosition;

  /**
   * Whether the switch is checked (controlled)
   */
  checked?: boolean;

  /**
   * Default checked state (uncontrolled)
   * @defaultValue false
   */
  defaultChecked?: boolean;

  /**
   * Callback when the checked state changes
   */
  onChange?: (checked: boolean) => void;

  /**
   * Whether the switch is disabled
   * @defaultValue false
   */
  disabled?: boolean;

  /**
   * Whether the switch is required
   * @defaultValue false
   */
  isRequired?: boolean;

  /**
   * Name attribute for form submission
   */
  name?: string;

  /**
   * Value attribute for form submission
   */
  value?: string;

  /**
   * Additional CSS class name
   */
  className?: string;

  /**
   * ID for the switch element
   */
  id?: string;

  /**
   * ARIA label for the switch
   */
  'aria-label'?: string;

  /**
   * ARIA labelled by reference
   */
  'aria-labelledby'?: string;

  /**
   * ARIA described by reference
   */
  'aria-describedby'?: string;
}

/**
 * Get the CSS classes for a switch variant
 *
 * @param variant - The switch variant
 * @param checked - Whether the switch is checked
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getVariantClasses = (variant: SwitchVariant, checked: boolean): string => {
  if (!checked) {
    return 'bg-surface-muted';
  }

  const variants: Record<SwitchVariant, string> = {
    primary: 'bg-brand-600',
    secondary: 'bg-surface-active',
    success: 'bg-success',
  };

  return variants[variant];
};

/**
 * Get the CSS classes for a switch size
 *
 * @param size - The switch size
 * @returns Object with track and thumb size classes
 *
 * @internal
 */
const getSizeClasses = (size: SwitchSize) => {
  const sizes: Record<SwitchSize, { track: string; thumb: string; translate: string }> = {
    sm: {
      track: 'h-5 w-9',
      thumb: 'h-4 w-4',
      translate: 'translate-x-4',
    },
    md: {
      track: 'h-6 w-11',
      thumb: 'h-5 w-5',
      translate: 'translate-x-5',
    },
    lg: {
      track: 'h-7 w-14',
      thumb: 'h-6 w-6',
      translate: 'translate-x-7',
    },
  };

  return sizes[size];
};

/**
 * Switch component - A toggle switch for binary on/off states.
 *
 * @remarks
 * This component provides an accessible toggle switch with:
 * - Controlled and uncontrolled modes
 * - Multiple visual variants and sizes
 * - Label positioning (left or right)
 * - Smooth animations and transitions
 * - Full keyboard support (Space to toggle)
 * - ARIA attributes for screen readers
 * - WCAG 2.2 AA compliant
 * - SSR-friendly
 *
 * Features:
 * - role="switch" with aria-checked for accessibility
 * - Keyboard navigation (Space key to toggle)
 * - Disabled state with visual feedback
 * - Required field support
 * - Form integration with name/value attributes
 * - Smooth thumb animation on toggle
 * - Focus management with visible focus ring
 *
 * @example
 * Basic usage (uncontrolled):
 * ```tsx
 * <Switch label="Enable notifications" />
 * ```
 *
 * @example
 * Controlled mode:
 * ```tsx
 * const [enabled, setEnabled] = useState(false);
 * <Switch
 *   checked={enabled}
 *   onChange={setEnabled}
 *   label="Enable notifications"
 * />
 * ```
 *
 * @example
 * With variants and sizes:
 * ```tsx
 * <Switch variant="success" size="lg" label="Accept terms" />
 * <Switch variant="secondary" size="sm" label="Remember me" />
 * ```
 *
 * @example
 * With label positioning:
 * ```tsx
 * <Switch label="Dark mode" labelPosition="left" />
 * ```
 *
 * @since 0.1.0
 */
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      label,
      labelPosition = 'right',
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      disabled = false,
      isRequired = false,
      name,
      value,
      className,
      id: providedId,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
    },
    ref
  ) => {
    const generatedId = useId('switch');
    const id = providedId ?? generatedId;
    const labelId = label ? `${id}-label` : undefined;

    // Use controlled state hook for controlled/uncontrolled support
    const [checked, setChecked] = useControlledState({
      value: controlledChecked,
      defaultValue: defaultChecked,
      onChange,
    });

    const isChecked = checked ?? false;

    // Handle toggle
    const handleToggle = useCallback(() => {
      if (!disabled) {
        setChecked(!isChecked);
      }
    }, [disabled, isChecked, setChecked]);

    // Handle keyboard events
    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === ' ' || event.key === 'Space') {
          event.preventDefault();
          handleToggle();
        }
      },
      [handleToggle]
    );

    const sizeClasses = getSizeClasses(size);

    const trackClasses = cn(
      // Base styles
      'relative inline-flex items-center rounded-full transition-interactive',
      // Size
      sizeClasses.track,
      // Variant and state
      getVariantClasses(variant, isChecked),
      // Disabled state
      disabled && 'opacity-50 cursor-not-allowed',
      // Focus
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      isChecked ? 'focus-visible:ring-brand-500' : 'focus-visible:ring-border'
    );

    const thumbClasses = cn(
      // Base styles
      'inline-block rounded-full bg-white shadow-sm transition-transform',
      // Size
      sizeClasses.thumb,
      // Position
      'translate-x-0.5',
      // Checked state
      isChecked && sizeClasses.translate
    );

    const labelClasses = cn(
      'text-sm font-medium text-text',
      disabled && 'opacity-50 cursor-not-allowed'
    );

    const wrapperClasses = cn(
      'inline-flex items-center gap-2',
      labelPosition === 'left' && 'flex-row-reverse',
      className
    );

    const switchElement = (
      <button
        ref={ref}
        type="button"
        role="switch"
        id={id}
        name={name}
        value={value}
        aria-checked={isChecked}
        aria-required={isRequired}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy ?? labelId}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={trackClasses}
      >
        <span className={thumbClasses} aria-hidden="true" />
      </button>
    );

    if (!label) {
      return switchElement;
    }

    return (
      <div className={wrapperClasses}>
        {switchElement}
        <label
          id={labelId}
          htmlFor={id}
          className={labelClasses}
          onClick={!disabled ? handleToggle : undefined}
          onKeyDown={
            !disabled
              ? (e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    handleToggle();
                  }
                }
              : undefined
          }
        >
          {label}
          {isRequired && (
            <span className="ml-1 text-error" aria-label="required">
              *
            </span>
          )}
        </label>
      </div>
    );
  }
);

Switch.displayName = 'Switch';

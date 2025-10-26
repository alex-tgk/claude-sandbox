import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../../utils/cn';

/**
 * Radio size types
 *
 * @since 0.1.0
 */
export type RadioSize = 'sm' | 'md' | 'lg';

/**
 * Radio layout orientation
 *
 * @since 0.1.0
 */
export type RadioOrientation = 'horizontal' | 'vertical';

/**
 * Context for RadioGroup to manage radio button state
 *
 * @internal
 */
interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  size: RadioSize;
  disabled: boolean;
  error: boolean;
  orientation: RadioOrientation;
  registerRadio: (value: string, ref: HTMLInputElement) => void;
  unregisterRadio: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);

/**
 * Hook to access RadioGroup context
 *
 * @internal
 */
const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('Radio must be used within a RadioGroup');
  }
  return context;
};

/**
 * Props for the Radio component
 *
 * @remarks
 * Individual radio button that must be used within a RadioGroup.
 * Supports keyboard navigation and proper ARIA attributes.
 *
 * @since 0.1.0
 */
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * The value of this radio button
   */
  value: string;

  /**
   * Label text for the radio button
   */
  label: ReactNode;

  /**
   * Additional description text
   */
  description?: ReactNode;

  /**
   * Whether the radio button is disabled (overrides group disabled state)
   */
  disabled?: boolean;

  /**
   * Custom className for the wrapper
   */
  className?: string;
}

/**
 * Props for the RadioGroup component
 *
 * @remarks
 * Container component that manages a group of radio buttons.
 * Provides context for controlled/uncontrolled behavior, keyboard navigation,
 * and accessibility features.
 *
 * @since 0.1.0
 */
export interface RadioGroupProps {
  /**
   * The name attribute for all radio buttons in the group
   */
  name?: string;

  /**
   * The currently selected value (controlled mode)
   */
  value?: string;

  /**
   * Default value for uncontrolled mode
   */
  defaultValue?: string;

  /**
   * Callback when the selected value changes
   */
  onChange?: (value: string) => void;

  /**
   * Size of all radio buttons in the group
   * @defaultValue 'md'
   */
  size?: RadioSize;

  /**
   * Layout orientation
   * @defaultValue 'vertical'
   */
  orientation?: RadioOrientation;

  /**
   * Whether all radio buttons in the group are disabled
   * @defaultValue false
   */
  disabled?: boolean;

  /**
   * Whether the group is in an error state
   * @defaultValue false
   */
  error?: boolean;

  /**
   * Label for the radio group
   */
  label?: ReactNode;

  /**
   * Error message to display
   */
  errorMessage?: ReactNode;

  /**
   * Helper text to display below the group
   */
  helperText?: ReactNode;

  /**
   * Radio button children
   */
  children: ReactNode;

  /**
   * Custom className for the group wrapper
   */
  className?: string;

  /**
   * Whether the field is required
   * @defaultValue false
   */
  required?: boolean;
}

/**
 * Get the CSS classes for a radio size
 *
 * @param size - The radio size
 * @returns Object with size-specific classes
 *
 * @internal
 */
const getSizeClasses = (size: RadioSize) => {
  const sizes = {
    sm: {
      radio: 'h-4 w-4',
      label: 'text-sm',
      description: 'text-xs',
      gap: 'gap-2',
    },
    md: {
      radio: 'h-5 w-5',
      label: 'text-base',
      description: 'text-sm',
      gap: 'gap-2.5',
    },
    lg: {
      radio: 'h-6 w-6',
      label: 'text-lg',
      description: 'text-base',
      gap: 'gap-3',
    },
  };

  return sizes[size];
};

/**
 * Radio component - Accessible radio button input.
 *
 * @remarks
 * This component must be used within a RadioGroup. It provides:
 * - Proper ARIA attributes (role, aria-checked)
 * - Keyboard navigation support
 * - Visual states (checked, disabled, error)
 * - Optional description text
 * - Size variants
 *
 * The component uses native input[type="radio"] for accessibility
 * but provides custom styling for a consistent design system appearance.
 *
 * Features:
 * - Three sizes: sm, md, lg
 * - Disabled state
 * - Error state styling
 * - Label and description support
 * - WCAG 2.2 AA compliant
 * - SSR-friendly
 *
 * @example
 * Basic usage within RadioGroup:
 * ```tsx
 * <RadioGroup name="option">
 *   <Radio value="1" label="Option 1" />
 *   <Radio value="2" label="Option 2" />
 * </RadioGroup>
 * ```
 *
 * @example
 * With description:
 * ```tsx
 * <RadioGroup name="plan">
 *   <Radio
 *     value="basic"
 *     label="Basic Plan"
 *     description="Perfect for individuals"
 *   />
 *   <Radio
 *     value="pro"
 *     label="Pro Plan"
 *     description="Best for teams"
 *   />
 * </RadioGroup>
 * ```
 *
 * @since 0.1.0
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      label,
      description,
      disabled: disabledProp,
      className,
      id: idProp,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const group = useRadioGroup();
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const descriptionId = description ? `${id}-description` : undefined;

    const inputRef = useRef<HTMLInputElement>(null);
    const disabled = disabledProp ?? group.disabled;
    const isChecked = group.value === value;

    // Register this radio with the group
    useEffect(() => {
      if (inputRef.current) {
        group.registerRadio(value, inputRef.current);
        return () => {
          group.unregisterRadio(value);
        };
      }
      return undefined;
    }, [value, group]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (!disabled && e.target.checked) {
        group.onChange?.(value);
      }
    };

    const sizeClasses = getSizeClasses(group.size);

    const radioClasses = cn(
      // Base styles
      sizeClasses.radio,
      'appearance-none rounded-full border-2 transition-all duration-200',
      'cursor-pointer',
      // Checked state
      isChecked && [
        'border-brand-600 bg-brand-600',
        'after:absolute after:inset-0 after:m-auto',
        'after:h-2 after:w-2 after:rounded-full after:bg-white',
        group.size === 'sm' && 'after:h-1.5 after:w-1.5',
        group.size === 'lg' && 'after:h-2.5 after:w-2.5',
      ],
      // Unchecked state
      !isChecked && 'border-border bg-white',
      // Hover state
      !disabled && !isChecked && 'hover:border-brand-500',
      // Focus state
      'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2',
      // Disabled state
      disabled && 'cursor-not-allowed opacity-50',
      // Error state
      group.error && !isChecked && 'border-error',
      // Position for pseudo-element
      'relative'
    );

    const labelClasses = cn(
      sizeClasses.label,
      'font-medium text-text',
      disabled && 'opacity-50 cursor-not-allowed',
      !disabled && 'cursor-pointer'
    );

    const descriptionClasses = cn(
      sizeClasses.description,
      'text-text-muted mt-0.5',
      disabled && 'opacity-50'
    );

    const wrapperClasses = cn(
      'flex items-start',
      sizeClasses.gap,
      className
    );

    return (
      <label className={wrapperClasses}>
        <input
          ref={(node) => {
            if (node) {
              // TypeScript workaround for mutable ref
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                (ref).current = node;
              }
            }
          }}
          type="radio"
          id={id}
          name={group.name}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-checked={isChecked}
          aria-describedby={descriptionId}
          className={radioClasses}
          {...props}
        />
        <div className="flex-1">
          <span className={labelClasses}>{label}</span>
          {description && (
            <div id={descriptionId} className={descriptionClasses}>
              {description}
            </div>
          )}
        </div>
      </label>
    );
  }
);

Radio.displayName = 'Radio';

/**
 * RadioGroup component - Container for managing a group of radio buttons.
 *
 * @remarks
 * This component provides context and management for a group of Radio components.
 * It handles:
 * - Controlled and uncontrolled state management
 * - Keyboard navigation (Arrow keys to move between options)
 * - Proper ARIA attributes (role="radiogroup")
 * - Layout orientation (horizontal/vertical)
 * - Error state and validation messages
 * - Disabled state
 *
 * The component automatically generates a unique name if not provided
 * and manages focus and selection state for all child Radio components.
 *
 * Features:
 * - Controlled/uncontrolled support
 * - Three sizes: sm, md, lg
 * - Horizontal and vertical layouts
 * - Error state with messages
 * - Disabled state
 * - Required field support
 * - Helper text
 * - Keyboard navigation (Arrow keys)
 * - WCAG 2.2 AA compliant
 * - SSR-friendly
 *
 * @example
 * Uncontrolled:
 * ```tsx
 * <RadioGroup name="color" defaultValue="blue">
 *   <Radio value="red" label="Red" />
 *   <Radio value="blue" label="Blue" />
 *   <Radio value="green" label="Green" />
 * </RadioGroup>
 * ```
 *
 * @example
 * Controlled with state:
 * ```tsx
 * const [value, setValue] = useState('option1');
 *
 * <RadioGroup
 *   name="option"
 *   value={value}
 *   onChange={setValue}
 *   label="Choose an option"
 * >
 *   <Radio value="option1" label="Option 1" />
 *   <Radio value="option2" label="Option 2" />
 * </RadioGroup>
 * ```
 *
 * @example
 * Horizontal layout with error:
 * ```tsx
 * <RadioGroup
 *   name="size"
 *   orientation="horizontal"
 *   error
 *   errorMessage="Please select a size"
 *   required
 * >
 *   <Radio value="s" label="Small" />
 *   <Radio value="m" label="Medium" />
 *   <Radio value="l" label="Large" />
 * </RadioGroup>
 * ```
 *
 * @example
 * With descriptions and sizes:
 * ```tsx
 * <RadioGroup name="plan" size="lg" label="Select a plan">
 *   <Radio
 *     value="basic"
 *     label="Basic"
 *     description="Free forever"
 *   />
 *   <Radio
 *     value="pro"
 *     label="Pro"
 *     description="$10/month"
 *   />
 * </RadioGroup>
 * ```
 *
 * @since 0.1.0
 */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name: nameProp,
      value: valueProp,
      defaultValue,
      onChange,
      size = 'md',
      orientation = 'vertical',
      disabled = false,
      error = false,
      label,
      errorMessage,
      helperText,
      children,
      className,
      required = false,
    },
    ref
  ) => {
    const generatedName = useId();
    const name = nameProp ?? generatedName;
    const labelId = `${name}-label`;
    const errorId = error && errorMessage ? `${name}-error` : undefined;
    const helperId = helperText ? `${name}-helper` : undefined;

    // Controlled/uncontrolled state management
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? valueProp : internalValue;

    // Track radio button refs for keyboard navigation
    const radioRefs = useRef<Map<string, HTMLInputElement>>(new Map());

    const handleChange = useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange]
    );

    const registerRadio = useCallback((value: string, radioRef: HTMLInputElement) => {
      radioRefs.current.set(value, radioRef);
    }, []);

    const unregisterRadio = useCallback((value: string) => {
      radioRefs.current.delete(value);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      const radios = Array.from(radioRefs.current.entries());
      if (radios.length === 0) return;

      const isVertical = orientation === 'vertical';
      const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';
      const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';

      if (e.key === nextKey || e.key === prevKey) {
        e.preventDefault();

        const currentIndex = radios.findIndex(([val]) => val === currentValue);
        let nextIndex: number;

        if (e.key === nextKey) {
          nextIndex = currentIndex === -1 || currentIndex === radios.length - 1
            ? 0
            : currentIndex + 1;
        } else {
          nextIndex = currentIndex <= 0 ? radios.length - 1 : currentIndex - 1;
        }

        const nextItem = radios[nextIndex];
        if (nextItem) {
          const [nextValue, nextRef] = nextItem;
          if (nextRef && !nextRef.disabled) {
            handleChange(nextValue);
            nextRef.focus();
          }
        }
      }
    };

    const contextValue: RadioGroupContextValue = {
      name,
      value: currentValue,
      onChange: handleChange,
      size,
      disabled,
      error,
      orientation,
      registerRadio,
      unregisterRadio,
    };

    const groupClasses = cn(
      'flex',
      orientation === 'vertical' ? 'flex-col space-y-3' : 'flex-row flex-wrap gap-4',
      className
    );

    const labelClasses = cn(
      'block font-medium text-text mb-2',
      size === 'sm' && 'text-sm',
      size === 'md' && 'text-base',
      size === 'lg' && 'text-lg'
    );

    const errorClasses = cn(
      'mt-1.5 text-error',
      size === 'sm' && 'text-xs',
      size === 'md' && 'text-sm',
      size === 'lg' && 'text-base'
    );

    const helperClasses = cn(
      'mt-1.5 text-text-muted',
      size === 'sm' && 'text-xs',
      size === 'md' && 'text-sm',
      size === 'lg' && 'text-base'
    );

    return (
      <div ref={ref}>
        {label && (
          <div id={labelId} className={labelClasses}>
            {label}
            {required && <span className="ml-1 text-error">*</span>}
          </div>
        )}
        <RadioGroupContext.Provider value={contextValue}>
          <div
            role="radiogroup"
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={errorId ?? helperId}
            aria-required={required}
            aria-invalid={error}
            className={groupClasses}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            {children}
          </div>
        </RadioGroupContext.Provider>
        {error && errorMessage && (
          <div id={errorId} className={errorClasses} role="alert">
            {errorMessage}
          </div>
        )}
        {!error && helperText && (
          <div id={helperId} className={helperClasses}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

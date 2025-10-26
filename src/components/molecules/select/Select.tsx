import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { cn } from '../../../utils/cn';
import { useId } from '../../../hooks/use-id';
import { useControlledState } from '../../../hooks/use-controlled-state';
import { useClickOutside } from '../../../hooks/use-click-outside';

/**
 * Select size types
 *
 * @since 0.1.0
 */
export type SelectSize = 'sm' | 'md' | 'lg';

/**
 * Select variant types
 *
 * @since 0.1.0
 */
export type SelectVariant = 'default' | 'error' | 'success';

/**
 * Option item for the Select component
 *
 * @since 0.1.0
 */
export interface SelectOption {
  /**
   * The display label for the option
   */
  label: string;

  /**
   * The value for the option
   */
  value: string;

  /**
   * Whether the option is disabled
   * @defaultValue false
   */
  disabled?: boolean;
}

/**
 * Props for the Select component
 *
 * @remarks
 * Provides a fully accessible dropdown select component with support for
 * both single and multiple selection modes.
 *
 * @since 0.1.0
 */
export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Array of options to display in the dropdown
   */
  options: SelectOption[];

  /**
   * Controlled value (for single select)
   */
  value?: string;

  /**
   * Default value for uncontrolled mode (for single select)
   */
  defaultValue?: string;

  /**
   * Controlled values (for multiple select)
   */
  values?: string[];

  /**
   * Default values for uncontrolled mode (for multiple select)
   */
  defaultValues?: string[];

  /**
   * Callback when value changes
   */
  onChange?: (value: string | string[]) => void;

  /**
   * Size of the select
   * @defaultValue 'md'
   */
  size?: SelectSize;

  /**
   * Visual variant
   * @defaultValue 'default'
   */
  variant?: SelectVariant;

  /**
   * Whether the select is disabled
   * @defaultValue false
   */
  disabled?: boolean;

  /**
   * Whether multiple selection is enabled
   * @defaultValue false
   */
  multiple?: boolean;

  /**
   * Placeholder text when no selection is made
   */
  placeholder?: string;

  /**
   * Label text for the select
   */
  label?: string;

  /**
   * Helper text displayed below the select
   */
  helperText?: string;

  /**
   * Error message displayed below the select (sets variant to 'error')
   */
  error?: string;

  /**
   * Whether the select is required
   * @defaultValue false
   */
  isRequired?: boolean;

  /**
   * Whether the select should take full width of its container
   * @defaultValue false
   */
  isFullWidth?: boolean;

  /**
   * Name attribute for form submission
   */
  name?: string;
}

/**
 * Get the CSS classes for a select size
 *
 * @param size - The select size
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getSizeClasses = (size: SelectSize): string => {
  const sizes: Record<SelectSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  return sizes[size];
};

/**
 * Get the CSS classes for a select variant
 *
 * @param variant - The select variant
 * @param hasError - Whether there is an error
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getVariantClasses = (variant: SelectVariant, hasError: boolean): string => {
  if (hasError || variant === 'error') {
    return 'border-error focus:border-error focus:ring-error';
  }

  const variants: Record<SelectVariant, string> = {
    default: 'border-border focus:border-brand-500 focus:ring-brand-500',
    error: 'border-error focus:border-error focus:ring-error',
    success: 'border-success focus:border-success focus:ring-success',
  };

  return variants[variant];
};

/**
 * Select component - A fully accessible dropdown select with single/multiple selection.
 *
 * @remarks
 * This component provides a custom dropdown select that:
 * - Supports both controlled and uncontrolled modes
 * - Handles single and multiple selection
 * - Provides full keyboard navigation (Arrow keys, Enter, Escape, Space)
 * - WCAG 2.2 AA compliant with proper ARIA attributes
 * - Includes error and success states
 * - Supports three sizes: sm, md, lg
 * - SSR-friendly
 * - Ref forwarding
 *
 * Features:
 * - Keyboard navigation with arrow keys
 * - Enter/Space to select
 * - Escape to close dropdown
 * - Click outside to close
 * - Disabled state for both select and individual options
 * - Placeholder support
 * - Label and helper text
 * - Required field indicator
 * - Visual feedback for focus and hover states
 *
 * @example
 * Basic single select:
 * ```tsx
 * <Select
 *   options={[
 *     { label: 'Option 1', value: '1' },
 *     { label: 'Option 2', value: '2' },
 *   ]}
 *   placeholder="Select an option"
 * />
 * ```
 *
 * @example
 * Controlled select with label:
 * ```tsx
 * <Select
 *   label="Country"
 *   value={country}
 *   onChange={(value) => setCountry(value as string)}
 *   options={countries}
 * />
 * ```
 *
 * @example
 * Multiple select:
 * ```tsx
 * <Select
 *   multiple
 *   values={selectedTags}
 *   onChange={(values) => setSelectedTags(values as string[])}
 *   options={tagOptions}
 *   placeholder="Select tags"
 * />
 * ```
 *
 * @example
 * With error state:
 * ```tsx
 * <Select
 *   label="Required Field"
 *   error="This field is required"
 *   options={options}
 *   isRequired
 * />
 * ```
 *
 * @since 0.1.0
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue,
      values: controlledValues,
      defaultValues,
      onChange,
      size = 'md',
      variant = 'default',
      disabled = false,
      multiple = false,
      placeholder = 'Select...',
      label,
      helperText,
      error,
      isRequired = false,
      isFullWidth = false,
      name,
      className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId('select');
    const id = providedId ?? generatedId;
    const hasError = Boolean(error);
    const displayedHelperText = error ?? helperText;

    // State management
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Handle both single and multiple selection
    const [singleValue, setSingleValue] = useControlledState({
      value: controlledValue,
      defaultValue,
      onChange: multiple ? undefined : (onChange as ((value: string) => void) | undefined),
    });

    const [multipleValues, setMultipleValues] = useControlledState({
      value: controlledValues,
      defaultValue: defaultValues ?? [],
      onChange: multiple ? (onChange as ((value: string[]) => void) | undefined) : undefined,
    });

    // Close dropdown when clicking outside
    useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

    // Reset focused index when dropdown closes
    useEffect(() => {
      if (!isOpen) {
        setFocusedIndex(-1);
      }
    }, [isOpen]);

    // Get enabled options
    const enabledOptions = options.filter((opt) => !opt.disabled);

    // Get display text
    const getDisplayText = (): string => {
      if (multiple) {
        const selectedCount = (multipleValues ?? []).length;
        if (selectedCount === 0) return placeholder;
        if (selectedCount === 1) {
          const selectedOption = options.find((opt) => opt.value === multipleValues?.[0]);
          return selectedOption?.label ?? placeholder;
        }
        return `${selectedCount} selected`;
      }

      const selectedOption = options.find((opt) => opt.value === singleValue);
      return selectedOption?.label ?? placeholder;
    };

    // Check if option is selected
    const isSelected = (optionValue: string): boolean => {
      if (multiple) {
        return (multipleValues ?? []).includes(optionValue);
      }
      return singleValue === optionValue;
    };

    // Handle option selection
    const handleSelect = (optionValue: string): void => {
      if (multiple) {
        const currentValues = multipleValues ?? [];
        const newValues = currentValues.includes(optionValue)
          ? currentValues.filter((v) => v !== optionValue)
          : [...currentValues, optionValue];
        setMultipleValues(newValues);
      } else {
        setSingleValue(optionValue);
        setIsOpen(false);
      }
    };

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (focusedIndex >= 0 && enabledOptions[focusedIndex]) {
            handleSelect(enabledOptions[focusedIndex].value);
          }
          break;

        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          buttonRef.current?.focus();
          break;

        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex((prev) =>
              prev < enabledOptions.length - 1 ? prev + 1 : prev
            );
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          }
          break;

        case 'Home':
          if (isOpen) {
            e.preventDefault();
            setFocusedIndex(0);
          }
          break;

        case 'End':
          if (isOpen) {
            e.preventDefault();
            setFocusedIndex(enabledOptions.length - 1);
          }
          break;

        default:
          break;
      }
    };

    // Handle option click
    const handleOptionClick = (optionValue: string, e: MouseEvent<HTMLDivElement>): void => {
      e.stopPropagation();
      handleSelect(optionValue);
    };

    // Toggle dropdown
    const toggleDropdown = (): void => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    // Base classes for the button
    const baseClasses = [
      // Layout
      'relative flex w-full items-center justify-between gap-2',
      // Typography
      'text-left font-normal',
      // Border
      'border rounded-md',
      // Background
      'bg-surface',
      'text-text',
      // Transitions
      'transition-interactive',
      // Focus
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      // Disabled state
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-muted',
    ];

    const buttonClasses = cn(
      baseClasses,
      getVariantClasses(variant, hasError),
      getSizeClasses(size),
      isFullWidth && 'w-full',
      !singleValue && !multipleValues?.length && 'text-text-muted',
      className
    );

    const wrapperClasses = cn('relative', isFullWidth && 'w-full');

    // Dropdown classes
    const dropdownClasses = cn(
      'absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md',
      'border border-border bg-surface shadow-lg',
      'focus:outline-none'
    );

    // Option classes
    const getOptionClasses = (option: SelectOption): string => {
      const optionIndex = enabledOptions.findIndex((opt) => opt.value === option.value);

      return cn(
        'relative cursor-pointer select-none px-4 py-2 transition-colors',
        {
          'bg-brand-50 text-brand-700': isSelected(option.value) && !option.disabled,
          'bg-surface-muted': !isSelected(option.value) && !option.disabled && optionIndex === focusedIndex,
          'text-text hover:bg-surface-muted': !isSelected(option.value) && !option.disabled && optionIndex !== focusedIndex,
          'opacity-50 cursor-not-allowed text-text-muted': option.disabled,
        }
      );
    };

    return (
      <div className={wrapperClasses} ref={ref} {...props}>
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm font-medium text-text"
          >
            {label}
            {isRequired && (
              <span className="ml-1 text-error" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative" ref={dropdownRef}>
          <button
            ref={buttonRef}
            type="button"
            id={id}
            disabled={disabled}
            onClick={toggleDropdown}
            onKeyDown={handleKeyDown}
            className={buttonClasses}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={label ? `${id}-label` : undefined}
            aria-describedby={displayedHelperText ? `${id}-helper` : undefined}
          >
            <span className="block truncate">{getDisplayText()}</span>
            <svg
              className={cn(
                'h-5 w-5 text-text-muted transition-transform',
                isOpen && 'rotate-180'
              )}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Hidden input for form submission */}
          {name && (
            <>
              {multiple ? (
                (multipleValues ?? []).map((val) => (
                  <input
                    key={val}
                    type="hidden"
                    name={name}
                    value={val}
                  />
                ))
              ) : (
                <input
                  type="hidden"
                  name={name}
                  value={singleValue ?? ''}
                />
              )}
            </>
          )}

          {/* Dropdown menu */}
          {isOpen && (
            <div
              className={dropdownClasses}
              role="listbox"
              aria-multiselectable={multiple}
              tabIndex={-1}
            >
              {options.length === 0 ? (
                <div className="px-4 py-2 text-sm text-text-muted">
                  No options available
                </div>
              ) : (
                options.map((option) => (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected(option.value)}
                    aria-disabled={option.disabled ? 'true' : 'false'}
                    className={getOptionClasses(option)}
                    onClick={
                      option.disabled
                        ? undefined
                        : (e) => handleOptionClick(option.value, e)
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        if (!option.disabled) {
                          e.preventDefault();
                          handleSelect(option.value);
                        }
                      }
                    }}
                    tabIndex={option.disabled ? -1 : 0}
                  >
                    <div className="flex items-center justify-between">
                      <span className="block truncate">{option.label}</span>
                      {multiple && isSelected(option.value) && (
                        <svg
                          className="h-5 w-5 text-brand-600"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {displayedHelperText && (
          <p
            id={`${id}-helper`}
            className={cn(
              'mt-1.5 text-sm',
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

Select.displayName = 'Select';

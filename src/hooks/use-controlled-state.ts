import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Manages state that can be controlled (via props) or uncontrolled (internal).
 *
 * @remarks
 * This hook provides a consistent pattern for components that support both
 * controlled and uncontrolled modes. It handles:
 * - Controlled: Parent manages state via `value` and `onChange`
 * - Uncontrolled: Component manages internal state, optionally seeded by `defaultValue`
 *
 * The component is considered controlled if `value` is not undefined.
 * Once a component is controlled/uncontrolled, it should not switch modes.
 *
 * @example
 * ```tsx
 * function Input({ value, defaultValue, onChange }) {
 *   const [internalValue, setValue] = useControlledState({
 *     value,
 *     defaultValue,
 *     onChange,
 *   });
 *
 *   return (
 *     <input
 *       value={internalValue}
 *       onChange={(e) => setValue(e.target.value)}
 *     />
 *   );
 * }
 * ```
 *
 * @typeParam T - The type of the state value
 *
 * @param options - Configuration object
 * @param options.value - Controlled value from parent (undefined for uncontrolled)
 * @param options.defaultValue - Default value for uncontrolled mode
 * @param options.onChange - Callback when value changes
 *
 * @returns Tuple of [current value, setter function]
 *
 * @since 0.1.0
 */
export function useControlledState<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}): [T | undefined, (value: T) => void] {
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  // Warn if component switches between controlled and uncontrolled
  const wasControlled = useRef(isControlled);
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (wasControlled.current !== isControlled) {
        console.warn(
          'Component is changing from ' +
            (wasControlled.current ? 'controlled' : 'uncontrolled') +
            ' to ' +
            (isControlled ? 'controlled' : 'uncontrolled') +
            '. This is not supported and may cause unexpected behavior.'
        );
      }
    }
    wasControlled.current = isControlled;
  }, [isControlled]);

  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  return [value, setValue];
}

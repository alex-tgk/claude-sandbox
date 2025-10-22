/**
 * Shared hooks for the modular UI system
 *
 * @remarks
 * - Reusable logic extracted into custom hooks
 * - SSR-safe, no direct DOM access in hook definitions
 * - Fully typed and documented
 *
 * @since 0.1.0
 */

export { useId } from './use-id';
export { useControlledState } from './use-controlled-state';
export { useFocusTrap } from './use-focus-trap';

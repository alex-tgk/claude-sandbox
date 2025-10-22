import { clsx, type ClassValue } from 'clsx';

/**
 * Combines multiple class names into a single string, intelligently handling
 * conditionals, arrays, and objects.
 *
 * @remarks
 * This is a lightweight wrapper around `clsx` that provides a clean API for
 * composing Tailwind classes. It handles:
 * - Conditional classes: `cn('base', isActive && 'active')`
 * - Arrays: `cn(['base', 'extra'])`
 * - Objects: `cn({ 'active': isActive })`
 * - Nested combinations of all the above
 *
 * @example
 * ```tsx
 * // Basic usage
 * cn('text-sm', 'font-bold') // "text-sm font-bold"
 *
 * // With conditionals
 * cn('btn', isDisabled && 'opacity-50') // "btn opacity-50" or "btn"
 *
 * // With objects
 * cn('btn', {
 *   'btn-primary': variant === 'primary',
 *   'btn-secondary': variant === 'secondary',
 * })
 *
 * // Complex composition
 * cn(
 *   'base-class',
 *   condition && 'conditional-class',
 *   { 'object-class': true },
 *   ['array', 'classes']
 * )
 * ```
 *
 * @param inputs - Class names, conditionals, arrays, or objects
 * @returns Combined class name string
 *
 * @since 0.1.0
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

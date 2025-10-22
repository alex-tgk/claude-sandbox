import { useId as useReactId } from 'react';

/**
 * Generates a unique, stable ID for accessibility attributes.
 *
 * @remarks
 * This is a wrapper around React 18's useId hook that can be extended
 * with additional logic if needed. It generates SSR-safe unique IDs
 * that are stable across server and client renders.
 *
 * Use this for:
 * - Associating labels with inputs (htmlFor, id)
 * - ARIA relationships (aria-labelledby, aria-describedby)
 * - Any case where you need a unique DOM identifier
 *
 * @example
 * ```tsx
 * function FormField() {
 *   const id = useId();
 *   return (
 *     <>
 *       <label htmlFor={id}>Email</label>
 *       <input id={id} type="email" />
 *     </>
 *   );
 * }
 * ```
 *
 * @param prefix - Optional prefix for the ID (useful for debugging)
 * @returns A unique, stable ID string
 *
 * @since 0.1.0
 */
export function useId(prefix?: string): string {
  const id = useReactId();
  return prefix ? `${prefix}-${id}` : id;
}

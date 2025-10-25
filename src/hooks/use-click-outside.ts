import { useEffect, RefObject } from 'react';

/**
 * Detects clicks outside a referenced element and triggers a callback.
 *
 * @remarks
 * This hook is useful for implementing dropdown menus, modals, and other
 * components that should close when clicking outside their boundaries.
 * It properly handles mouse and touch events.
 *
 * @example
 * ```tsx
 * function Dropdown() {
 *   const ref = useRef<HTMLDivElement>(null);
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   useClickOutside(ref, () => setIsOpen(false), isOpen);
 *
 *   return (
 *     <div ref={ref}>
 *       {isOpen && <Menu />}
 *     </div>
 *   );
 * }
 * ```
 *
 * @param ref - Reference to the element to detect outside clicks for
 * @param handler - Callback function to execute when clicking outside
 * @param enabled - Whether the hook is active (default: true)
 *
 * @since 0.1.0
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent): void => {
      const el = ref.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, enabled]);
}

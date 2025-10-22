import { useEffect, useRef } from 'react';

/**
 * Traps focus within a container element, useful for modals and dialogs.
 *
 * @remarks
 * This hook implements focus trapping for accessibility:
 * - Prevents Tab from leaving the container
 * - Cycles focus between first and last focusable elements
 * - Restores focus to trigger element when deactivated
 * - Handles Shift+Tab for reverse navigation
 *
 * Follows WCAG 2.2 guidelines for modal dialogs and focus management.
 *
 * @example
 * ```tsx
 * function Dialog({ isOpen, onClose }) {
 *   const containerRef = useFocusTrap<HTMLDivElement>(isOpen);
 *
 *   if (!isOpen) return null;
 *
 *   return (
 *     <div ref={containerRef} role="dialog">
 *       <button onClick={onClose}>Close</button>
 *       <input type="text" />
 *       <button>Save</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @typeParam T - The type of HTML element to trap focus within
 *
 * @param isActive - Whether the focus trap is active
 * @returns Ref to attach to the container element
 *
 * @since 0.1.0
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  isActive: boolean
): React.RefObject<T> {
  const containerRef = useRef<T>(null);
  const previousActiveElement = useRef<Element | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement;

    // Get all focusable elements
    const getFocusableElements = (): HTMLElement[] => {
      if (!container) return [];

      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(',');

      return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
        (el) => {
          // Filter out elements that are not visible
          return (
            el.offsetWidth > 0 &&
            el.offsetHeight > 0 &&
            window.getComputedStyle(el).visibility !== 'hidden'
          );
        }
      );
    };

    // Focus first element on mount
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0 && focusableElements[0]) {
      focusableElements[0].focus();
    }

    // Handle Tab key to trap focus
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusable = getFocusableElements();
      if (focusable.length === 0) return;

      const firstElement = focusable[0];
      const lastElement = focusable[focusable.length - 1];

      if (!firstElement || !lastElement) return;

      // Shift + Tab: reverse
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      }
      // Tab: forward
      else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Cleanup: restore focus to previous element
    return () => {
      container.removeEventListener('keydown', handleKeyDown);

      // Restore focus to the previously focused element
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive]);

  return containerRef;
}

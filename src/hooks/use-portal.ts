import { useEffect, useState } from 'react';

/**
 * Creates and manages a portal container element
 *
 * @remarks
 * This hook creates a DOM element that can be used as a portal target.
 * The element is appended to document.body and cleaned up on unmount.
 * SSR-safe - only creates element on the client.
 *
 * @param id - Optional ID for the portal container
 * @returns The portal container element or null during SSR
 *
 * @example
 * ```tsx
 * function MyPortalComponent() {
 *   const portalContainer = usePortal('my-portal');
 *
 *   if (!portalContainer) return null;
 *
 *   return createPortal(
 *     <div>Portal content</div>,
 *     portalContainer
 *   );
 * }
 * ```
 *
 * @since 0.1.0
 */
export function usePortal(id?: string): HTMLElement | null {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof document === 'undefined') {
      return;
    }

    // Try to find existing container
    let element = id ? document.getElementById(id) : null;

    // Create new container if it doesn't exist
    if (!element) {
      element = document.createElement('div');
      if (id) {
        element.id = id;
      }
      element.setAttribute('data-portal', 'true');
      document.body.appendChild(element);
    }

    setContainer(element);

    // Cleanup: only remove if we created it
    return () => {
      if (element && !id) {
        document.body.removeChild(element);
      }
    };
  }, [id]);

  return container;
}

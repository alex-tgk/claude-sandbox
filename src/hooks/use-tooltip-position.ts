import { useEffect, useState, RefObject } from 'react';

/**
 * Tooltip placement options
 *
 * @since 0.1.0
 */
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Position coordinates and arrow offset
 *
 * @since 0.1.0
 */
export interface TooltipPosition {
  top: number;
  left: number;
  arrowOffset: number;
}

/**
 * Calculates optimal position for a tooltip relative to its trigger element
 *
 * @remarks
 * This hook handles:
 * - Positioning tooltip relative to trigger
 * - Viewport boundary detection
 * - Automatic flip to prevent overflow
 * - Arrow positioning
 *
 * @param triggerRef - Ref to the trigger element
 * @param tooltipRef - Ref to the tooltip element
 * @param placement - Desired placement (may flip if no space)
 * @param isVisible - Whether tooltip is currently visible
 * @param offset - Distance from trigger element in pixels
 * @returns Position object with coordinates and arrow offset
 *
 * @example
 * ```tsx
 * const position = useTooltipPosition(
 *   triggerRef,
 *   tooltipRef,
 *   'top',
 *   isVisible,
 *   8
 * );
 * ```
 *
 * @since 0.1.0
 */
export function useTooltipPosition(
  triggerRef: RefObject<HTMLElement>,
  tooltipRef: RefObject<HTMLElement>,
  placement: TooltipPlacement,
  isVisible: boolean,
  offset = 8
): TooltipPosition | null {
  const [position, setPosition] = useState<TooltipPosition | null>(null);

  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) {
      setPosition(null);
      return;
    }

    const calculatePosition = () => {
      const trigger = triggerRef.current;
      const tooltip = tooltipRef.current;

      if (!trigger || !tooltip) return;

      const triggerRect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = 0;
      let left = 0;
      let finalPlacement = placement;

      // Calculate position based on placement
      switch (placement) {
        case 'top': {
          top = triggerRect.top - tooltipRect.height - offset;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;

          // Flip to bottom if no space at top
          if (top < 0) {
            finalPlacement = 'bottom';
            top = triggerRect.bottom + offset;
          }
          break;
        }
        case 'bottom': {
          top = triggerRect.bottom + offset;
          left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;

          // Flip to top if no space at bottom
          if (top + tooltipRect.height > viewportHeight) {
            finalPlacement = 'top';
            top = triggerRect.top - tooltipRect.height - offset;
          }
          break;
        }
        case 'left': {
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.left - tooltipRect.width - offset;

          // Flip to right if no space on left
          if (left < 0) {
            finalPlacement = 'right';
            left = triggerRect.right + offset;
          }
          break;
        }
        case 'right': {
          top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
          left = triggerRect.right + offset;

          // Flip to left if no space on right
          if (left + tooltipRect.width > viewportWidth) {
            finalPlacement = 'left';
            left = triggerRect.left - tooltipRect.width - offset;
          }
          break;
        }
      }

      // Constrain horizontal position to viewport
      if (finalPlacement === 'top' || finalPlacement === 'bottom') {
        const maxLeft = viewportWidth - tooltipRect.width - 8;
        left = Math.max(8, Math.min(left, maxLeft));
      }

      // Constrain vertical position to viewport
      if (finalPlacement === 'left' || finalPlacement === 'right') {
        const maxTop = viewportHeight - tooltipRect.height - 8;
        top = Math.max(8, Math.min(top, maxTop));
      }

      // Calculate arrow offset for horizontal placements
      let arrowOffset = 0;
      if (finalPlacement === 'top' || finalPlacement === 'bottom') {
        const triggerCenter = triggerRect.left + triggerRect.width / 2;
        arrowOffset = triggerCenter - left - tooltipRect.width / 2;
      } else {
        const triggerCenter = triggerRect.top + triggerRect.height / 2;
        arrowOffset = triggerCenter - top - tooltipRect.height / 2;
      }

      setPosition({
        top: top + window.scrollY,
        left: left + window.scrollX,
        arrowOffset,
      });
    };

    calculatePosition();

    // Recalculate on scroll or resize
    window.addEventListener('scroll', calculatePosition, true);
    window.addEventListener('resize', calculatePosition);

    return () => {
      window.removeEventListener('scroll', calculatePosition, true);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [triggerRef, tooltipRef, placement, isVisible, offset]);

  return position;
}

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../../utils/cn';
import { usePortal } from '../../../hooks/use-portal';
import { useTooltipPosition, type TooltipPlacement } from '../../../hooks/use-tooltip-position';
import { useId } from '../../../hooks/use-id';

/**
 * Props for the Tooltip component
 *
 * @remarks
 * Tooltip displays contextual information when hovering or focusing on an element.
 * Uses React Portal for proper z-index layering and positioning.
 *
 * @since 0.1.0
 */
export interface TooltipProps {
  /**
   * The element that triggers the tooltip
   */
  children: ReactElement;

  /**
   * Content to display in the tooltip
   */
  content: ReactNode;

  /**
   * Placement of the tooltip relative to the trigger
   * @defaultValue 'top'
   */
  placement?: TooltipPlacement;

  /**
   * Delay before showing tooltip (in milliseconds)
   * @defaultValue 200
   */
  showDelay?: number;

  /**
   * Delay before hiding tooltip (in milliseconds)
   * @defaultValue 0
   */
  hideDelay?: number;

  /**
   * Distance from trigger element in pixels
   * @defaultValue 8
   */
  offset?: number;

  /**
   * Whether the tooltip is disabled
   * @defaultValue false
   */
  disabled?: boolean;

  /**
   * Maximum width of the tooltip
   * @defaultValue '320px'
   */
  maxWidth?: string;

  /**
   * Additional CSS class for the tooltip container
   */
  className?: string;

  /**
   * Additional CSS class for the arrow
   */
  arrowClassName?: string;
}

/**
 * Tooltip component - Displays contextual information on hover or focus.
 *
 * @remarks
 * This component provides an accessible tooltip with the following features:
 * - Four placement options (top, bottom, left, right) with automatic flipping
 * - Configurable show/hide delays
 * - Keyboard accessible (Escape to close, works on focus)
 * - ARIA describedby relationship for screen readers
 * - Arrow pointing to the trigger element
 * - SSR-safe using portal
 * - Viewport boundary detection
 * - Maximum width constraint
 *
 * Features:
 * - Trigger on hover and focus
 * - Configurable delays
 * - Automatic viewport-aware positioning
 * - WCAG 2.2 AA compliant
 * - SSR-friendly
 * - Keyboard navigation (Escape to close)
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Tooltip content="This is a tooltip">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 *
 * @example
 * With placement:
 * ```tsx
 * <Tooltip content="Tooltip on the right" placement="right">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 *
 * @example
 * With custom delays:
 * ```tsx
 * <Tooltip
 *   content="Delayed tooltip"
 *   showDelay={500}
 *   hideDelay={200}
 * >
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 *
 * @example
 * With custom styling:
 * ```tsx
 * <Tooltip
 *   content="Custom styled tooltip"
 *   className="bg-purple-600"
 *   maxWidth="200px"
 * >
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 *
 * @since 0.1.0
 */
export function Tooltip({
  children,
  content,
  placement = 'top',
  showDelay = 200,
  hideDelay = 0,
  offset = 8,
  disabled = false,
  maxWidth = '320px',
  className,
  arrowClassName,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipId = useId('tooltip');

  const portalContainer = usePortal('tooltip-portal');
  const position = useTooltipPosition(triggerRef, tooltipRef, placement, isVisible, offset);

  // Clear all timeouts on unmount
  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  // Handle Escape key to close tooltip
  useEffect(() => {
    if (!isVisible) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVisible(false);
        if (showTimeoutRef.current) {
          clearTimeout(showTimeoutRef.current);
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible]);

  const show = useCallback(() => {
    if (disabled) return;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, showDelay);
  }, [disabled, showDelay]);

  const hide = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
  }, [hideDelay]);

  // Clone the trigger element and attach event handlers
  if (!isValidElement(children)) {
    console.error('Tooltip: children must be a valid React element');
    return children;
  }

  const childProps = children.props as Record<string, unknown>;

  const trigger = cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: (e: React.MouseEvent) => {
      show();
      if (typeof childProps.onMouseEnter === 'function') {
        childProps.onMouseEnter(e);
      }
    },
    onMouseLeave: (e: React.MouseEvent) => {
      hide();
      if (typeof childProps.onMouseLeave === 'function') {
        childProps.onMouseLeave(e);
      }
    },
    onFocus: (e: React.FocusEvent) => {
      show();
      if (typeof childProps.onFocus === 'function') {
        childProps.onFocus(e);
      }
    },
    onBlur: (e: React.FocusEvent) => {
      hide();
      if (typeof childProps.onBlur === 'function') {
        childProps.onBlur(e);
      }
    },
    'aria-describedby': isVisible ? tooltipId : undefined,
  } as Partial<typeof childProps>);

  // Render tooltip via portal
  const tooltipElement =
    isVisible && position && portalContainer ? (
      <div
        ref={tooltipRef}
        id={tooltipId}
        role="tooltip"
        className={cn(
          // Base styles
          'absolute z-50 px-3 py-2 text-sm font-medium text-white',
          'bg-gray-900 rounded-md shadow-lg',
          'animate-in fade-in-0 zoom-in-95',
          'duration-200',
          className
        )}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          maxWidth,
        }}
      >
        {content}

        {/* Arrow */}
        <div
          className={cn(
            'absolute w-2 h-2 bg-gray-900 transform rotate-45',
            arrowClassName
          )}
          style={getArrowStyle(placement, position.arrowOffset)}
          aria-hidden="true"
        />
      </div>
    ) : null;

  return (
    <>
      {trigger}
      {tooltipElement && portalContainer && createPortal(tooltipElement, portalContainer)}
    </>
  );
}

/**
 * Get arrow positioning styles based on placement
 *
 * @param placement - Tooltip placement
 * @param offset - Arrow offset from center
 * @returns CSS styles object for the arrow
 *
 * @internal
 */
function getArrowStyle(
  placement: TooltipPlacement,
  offset: number
): React.CSSProperties {
  const arrowSize = 4; // Half of w-2 h-2 (8px / 2)

  switch (placement) {
    case 'top':
      return {
        bottom: `-${arrowSize}px`,
        left: `calc(50% + ${offset}px)`,
        transform: 'translateX(-50%) rotate(45deg)',
      };
    case 'bottom':
      return {
        top: `-${arrowSize}px`,
        left: `calc(50% + ${offset}px)`,
        transform: 'translateX(-50%) rotate(45deg)',
      };
    case 'left':
      return {
        right: `-${arrowSize}px`,
        top: `calc(50% + ${offset}px)`,
        transform: 'translateY(-50%) rotate(45deg)',
      };
    case 'right':
      return {
        left: `-${arrowSize}px`,
        top: `calc(50% + ${offset}px)`,
        transform: 'translateY(-50%) rotate(45deg)',
      };
  }
}

Tooltip.displayName = 'Tooltip';

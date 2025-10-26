import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Alert variant types
 *
 * @since 0.1.0
 */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Props for the Alert component
 *
 * @remarks
 * Extends native div HTML attributes with custom variants and alert-specific features.
 *
 * @since 0.1.0
 */
export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant
   * @defaultValue 'info'
   */
  variant?: AlertVariant;

  /**
   * Alert title
   */
  title?: string;

  /**
   * Alert description/content
   */
  description?: ReactNode;

  /**
   * Whether the alert can be dismissed
   * @defaultValue false
   */
  dismissible?: boolean;

  /**
   * Callback fired when the alert is dismissed
   */
  onDismiss?: () => void;

  /**
   * Custom icon to override the default variant icon
   */
  icon?: ReactNode;

  /**
   * Whether to show an icon
   * @defaultValue true
   */
  showIcon?: boolean;

  /**
   * Action button element (e.g., Button component)
   */
  action?: ReactNode;

  /**
   * Determines the urgency of the alert for screen readers
   * - 'polite': Announces when user is idle (default for info/success)
   * - 'assertive': Announces immediately (default for warning/error)
   * @defaultValue Based on variant
   */
  'aria-live'?: 'polite' | 'assertive';
}

/**
 * Default icons for each variant
 *
 * @internal
 */
const defaultIcons: Record<AlertVariant, ReactNode> = {
  info: (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  success: (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  error: (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
};

/**
 * Get the CSS classes for an alert variant
 *
 * @param variant - The alert variant
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getVariantClasses = (variant: AlertVariant): string => {
  const variants: Record<AlertVariant, string> = {
    info: 'bg-info-light border-info text-info [&_svg]:text-info',
    success: 'bg-success-light border-success text-success [&_svg]:text-success',
    warning: 'bg-warning-light border-warning text-warning [&_svg]:text-warning',
    error: 'bg-error-light border-error text-error [&_svg]:text-error',
  };

  return variants[variant];
};

/**
 * Get default aria-live value based on variant
 *
 * @param variant - The alert variant
 * @returns aria-live value
 *
 * @internal
 */
const getDefaultAriaLive = (variant: AlertVariant): 'polite' | 'assertive' => {
  return variant === 'warning' || variant === 'error' ? 'assertive' : 'polite';
};

/**
 * Alert component - An accessible alert for displaying important messages.
 *
 * @remarks
 * This component provides a flexible alert system with:
 * - Multiple visual variants (info, success, warning, error)
 * - Title and description support
 * - Dismissible alerts with smooth animations
 * - Auto-selected icons based on variant
 * - Custom icon support
 * - Action button support
 * - WCAG 2.2 AA compliant with proper ARIA attributes
 * - SSR-friendly
 * - Ref forwarding
 *
 * Features:
 * - ARIA role="alert" for screen reader announcements
 * - aria-live regions for dynamic content
 * - Keyboard accessible dismiss button
 * - Smooth enter/exit animations
 * - Customizable aria-live urgency
 * - Full TypeScript support
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Alert variant="info" title="Information">
 *   This is an informational message.
 * </Alert>
 * ```
 *
 * @example
 * Dismissible alert:
 * ```tsx
 * <Alert
 *   variant="success"
 *   title="Success!"
 *   description="Your changes have been saved."
 *   dismissible
 *   onDismiss={() => console.log('Alert dismissed')}
 * />
 * ```
 *
 * @example
 * With action button:
 * ```tsx
 * <Alert
 *   variant="warning"
 *   title="Update Available"
 *   description="A new version is available."
 *   action={
 *     <Button size="sm" variant="outline">
 *       Update Now
 *     </Button>
 *   }
 * />
 * ```
 *
 * @example
 * Custom icon:
 * ```tsx
 * <Alert
 *   variant="info"
 *   title="Custom Icon"
 *   icon={<IconCustom />}
 * >
 *   Alert with custom icon
 * </Alert>
 * ```
 *
 * @since 0.1.0
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      description,
      dismissible = false,
      onDismiss,
      icon,
      showIcon = true,
      action,
      children,
      className,
      'aria-live': ariaLive,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    const handleDismiss = () => {
      setIsAnimatingOut(true);
      // Wait for animation to complete before hiding
      setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, 150); // Match animation duration
    };

    if (!isVisible) {
      return null;
    }

    const displayedIcon = icon ?? defaultIcons[variant];
    const content = description ?? children;
    const defaultAriaLive = getDefaultAriaLive(variant);

    const baseClasses = [
      // Layout
      'relative flex gap-3 p-4',
      // Border
      'border rounded-lg',
      // Transitions
      'transition-all duration-150 ease-in-out',
      // Animation states
      isAnimatingOut
        ? 'opacity-0 scale-95 translate-y-1'
        : 'opacity-100 scale-100 translate-y-0',
    ];

    const classes = cn(
      baseClasses,
      getVariantClasses(variant),
      className
    );

    return (
      <div
        ref={ref}
        role="alert"
        aria-live={ariaLive ?? defaultAriaLive}
        className={classes}
        {...props}
      >
        {/* Icon */}
        {showIcon && (
          <div className="flex-shrink-0 pt-0.5">
            {displayedIcon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <div className="font-semibold text-sm mb-1">
              {title}
            </div>
          )}
          {content && (
            <div className="text-sm">
              {content}
            </div>
          )}
        </div>

        {/* Action */}
        {action && (
          <div className="flex-shrink-0 ml-3">
            {action}
          </div>
        )}

        {/* Dismiss button */}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              'flex-shrink-0 ml-3 -mr-1 -mt-1 inline-flex rounded-md p-1.5',
              'hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2',
              'transition-colors',
              variant === 'info' && 'focus:ring-blue-500',
              variant === 'success' && 'focus:ring-green-500',
              variant === 'warning' && 'focus:ring-yellow-500',
              variant === 'error' && 'focus:ring-red-500'
            )}
            aria-label="Dismiss alert"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

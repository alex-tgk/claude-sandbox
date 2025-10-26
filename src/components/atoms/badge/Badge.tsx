import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Badge variant types
 *
 * @since 0.1.0
 */
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

/**
 * Badge size types
 *
 * @since 0.1.0
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Badge shape types
 *
 * @since 0.1.0
 */
export type BadgeShape = 'rounded' | 'pill';

/**
 * Props for the Badge component
 *
 * @remarks
 * Extends native div HTML attributes with custom variants, sizes, and interactive features.
 * Supports all standard div props (onClick, etc.)
 *
 * @since 0.1.0
 */
export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the badge
   * @defaultValue 'primary'
   */
  variant?: BadgeVariant;

  /**
   * Size of the badge
   * @defaultValue 'md'
   */
  size?: BadgeSize;

  /**
   * Shape style of the badge
   * @defaultValue 'rounded'
   */
  shape?: BadgeShape;

  /**
   * Whether to display as a dot (small colored circle)
   * @defaultValue false
   */
  dot?: boolean;

  /**
   * Whether the badge is removable (shows close button)
   * @defaultValue false
   */
  removable?: boolean;

  /**
   * Callback when the close button is clicked
   */
  onRemove?: () => void;

  /**
   * Optional icon to display before the badge text
   */
  icon?: React.ReactNode;

  /**
   * ARIA label for additional context
   */
  ariaLabel?: string;
}

/**
 * Get the CSS classes for a badge variant
 *
 * @param variant - The badge variant
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getVariantClasses = (variant: BadgeVariant): string => {
  const variants: Record<BadgeVariant, string> = {
    primary: 'bg-brand-10 text-brand-80 border-brand-20',
    secondary: 'bg-surface-muted text-text border-border-subtle',
    success: 'bg-success-light text-success border-success',
    warning: 'bg-warning-light text-warning border-warning',
    error: 'bg-error-light text-error border-error',
    info: 'bg-info-light text-info border-info',
  };

  return variants[variant];
};

/**
 * Get the CSS classes for a badge size
 *
 * @param size - The badge size
 * @param dot - Whether it's a dot variant
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getSizeClasses = (size: BadgeSize, dot: boolean): string => {
  if (dot) {
    const dotSizes: Record<BadgeSize, string> = {
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
    };
    return dotSizes[size];
  }

  const sizes: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1.5',
    lg: 'px-3 py-1.5 text-base gap-2',
  };

  return sizes[size];
};

/**
 * Get the CSS classes for a badge shape
 *
 * @param shape - The badge shape
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getShapeClasses = (shape: BadgeShape): string => {
  const shapes: Record<BadgeShape, string> = {
    rounded: 'rounded-md',
    pill: 'rounded-full',
  };

  return shapes[shape];
};

/**
 * Badge component - A versatile badge for labels, tags, and status indicators.
 *
 * @remarks
 * This component provides a flexible badge with:
 * - Multiple color variants for different contexts
 * - Size options for different use cases
 * - Pill and rounded shape styles
 * - Dot variant for minimal indicators
 * - Removable variant with close button
 * - Icon support for enhanced visual communication
 * - WCAG 2.2 AA compliant with proper contrast ratios
 * - SSR-friendly
 * - Ref forwarding
 *
 * Features:
 * - Six semantic variants (primary, secondary, success, warning, error, info)
 * - Three sizes (sm, md, lg)
 * - Pill and rounded shapes
 * - Dot variant for status indicators
 * - Removable with onRemove callback
 * - Icon support
 * - ARIA label for context
 * - All native div props supported
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Badge variant="primary">New</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge variant="error">Error</Badge>
 * ```
 *
 * @example
 * With different sizes and shapes:
 * ```tsx
 * <Badge size="sm" variant="info">Small</Badge>
 * <Badge size="md" shape="pill" variant="warning">Medium Pill</Badge>
 * <Badge size="lg" variant="primary">Large</Badge>
 * ```
 *
 * @example
 * Dot variant:
 * ```tsx
 * <Badge dot variant="success" ariaLabel="Active status" />
 * <Badge dot variant="error" ariaLabel="Offline status" />
 * ```
 *
 * @example
 * Removable badge:
 * ```tsx
 * <Badge
 *   removable
 *   onRemove={() => handleRemove()}
 *   variant="primary"
 * >
 *   Removable Tag
 * </Badge>
 * ```
 *
 * @example
 * With icon:
 * ```tsx
 * <Badge icon={<IconStar />} variant="warning">
 *   Featured
 * </Badge>
 * ```
 *
 * @since 0.1.0
 */
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      shape = 'rounded',
      dot = false,
      removable = false,
      onRemove,
      icon,
      ariaLabel,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Dot variant renders as a simple colored circle
    if (dot) {
      const dotClasses = cn(
        'inline-block rounded-full',
        getVariantClasses(variant).split(' ')[0], // Extract only bg color
        getSizeClasses(size, true),
        className
      );

      return (
        <span
          ref={ref}
          className={dotClasses}
          role="status"
          aria-label={ariaLabel}
          {...props}
        />
      );
    }

    const baseClasses = [
      // Layout
      'inline-flex items-center justify-center',
      // Typography
      'font-medium',
      // Border
      'border',
      // Transitions
      'transition-colors',
    ];

    const classes = cn(
      baseClasses,
      getVariantClasses(variant),
      getSizeClasses(size, false),
      getShapeClasses(shape),
      className
    );

    const removeButtonSize = size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-3.5 w-3.5' : 'h-4 w-4';

    return (
      <div
        ref={ref}
        className={classes}
        role="status"
        aria-label={ariaLabel}
        {...props}
      >
        {icon && <span className="inline-flex shrink-0">{icon}</span>}
        {children && <span className="inline-flex">{children}</span>}
        {removable && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className={cn(
              'inline-flex items-center justify-center rounded-full',
              'hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1',
              'transition-colors',
              removeButtonSize
            )}
            aria-label="Remove badge"
          >
            <svg
              className="h-full w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

/**
 * Spinner variant types - different visual styles for the loading indicator
 *
 * @since 0.1.0
 */
export type SpinnerVariant = 'circular' | 'dots' | 'bars';

/**
 * Spinner size types
 *
 * @since 0.1.0
 */
export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Spinner color variants matching theme
 *
 * @since 0.1.0
 */
export type SpinnerColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'inherit';

/**
 * Spinner animation speed
 *
 * @since 0.1.0
 */
export type SpinnerSpeed = 'slow' | 'normal' | 'fast';

/**
 * Props for the Spinner component
 *
 * @remarks
 * A flexible loading indicator component with multiple variants and customization options.
 *
 * @since 0.1.0
 */
export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the spinner
   * @defaultValue 'circular'
   */
  variant?: SpinnerVariant;

  /**
   * Size of the spinner
   * @defaultValue 'md'
   */
  size?: SpinnerSize;

  /**
   * Color variant matching the theme
   * @defaultValue 'primary'
   */
  color?: SpinnerColor;

  /**
   * Animation speed
   * @defaultValue 'normal'
   */
  speed?: SpinnerSpeed;

  /**
   * Accessible label for screen readers
   * @defaultValue 'Loading...'
   */
  label?: string;

  /**
   * Whether to center the spinner in its container
   * @defaultValue false
   */
  center?: boolean;
}

/**
 * Get the CSS classes for spinner size
 *
 * @param size - The spinner size
 * @param variant - The spinner variant (affects size calculation)
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getSizeClasses = (size: SpinnerSize, variant: SpinnerVariant): string => {
  if (variant === 'circular') {
    const sizes: Record<SpinnerSize, string> = {
      xs: 'h-3 w-3 border-2',
      sm: 'h-4 w-4 border-2',
      md: 'h-6 w-6 border-2',
      lg: 'h-8 w-8 border-[3px]',
    };
    return sizes[size];
  }

  if (variant === 'dots') {
    const sizes: Record<SpinnerSize, string> = {
      xs: 'gap-0.5',
      sm: 'gap-1',
      md: 'gap-1.5',
      lg: 'gap-2',
    };
    return sizes[size];
  }

  // bars variant
  const sizes: Record<SpinnerSize, string> = {
    xs: 'gap-0.5',
    sm: 'gap-1',
    md: 'gap-1.5',
    lg: 'gap-2',
  };
  return sizes[size];
};

/**
 * Get the CSS classes for dot/bar size
 *
 * @param size - The spinner size
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getDotBarSizeClasses = (size: SpinnerSize): string => {
  const sizes: Record<SpinnerSize, string> = {
    xs: 'h-1 w-1',
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3',
  };
  return sizes[size];
};

/**
 * Get the CSS classes for bar dimensions
 *
 * @param size - The spinner size
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getBarSizeClasses = (size: SpinnerSize): string => {
  const sizes: Record<SpinnerSize, string> = {
    xs: 'h-3 w-0.5',
    sm: 'h-4 w-1',
    md: 'h-6 w-1',
    lg: 'h-8 w-1.5',
  };
  return sizes[size];
};

/**
 * Get the CSS classes for spinner color
 *
 * @param color - The color variant
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getColorClasses = (color: SpinnerColor): string => {
  const colors: Record<SpinnerColor, string> = {
    primary: 'text-brand-600',
    secondary: 'text-text-secondary',
    success: 'text-success',
    warning: 'text-warning',
    error: 'text-error',
    inherit: 'text-current',
  };
  return colors[color];
};

/**
 * Get the CSS classes for animation speed
 *
 * @param speed - The animation speed
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getSpeedClasses = (speed: SpinnerSpeed): string => {
  const speeds: Record<SpinnerSpeed, string> = {
    slow: '[animation-duration:1.5s]',
    normal: '[animation-duration:1s]',
    fast: '[animation-duration:0.6s]',
  };
  return speeds[speed];
};

/**
 * Spinner component - A flexible, accessible loading indicator.
 *
 * @remarks
 * This component provides a visual loading indicator with multiple variants:
 * - Circular: A spinning circle (default)
 * - Dots: Three animated dots
 * - Bars: Three animated bars
 *
 * Features:
 * - Multiple visual variants (circular, dots, bars)
 * - Four size options (xs, sm, md, lg)
 * - Color variants matching the theme
 * - Speed control (slow, normal, fast)
 * - Accessible with ARIA labels and live regions
 * - Screen reader friendly
 * - Optional center positioning
 * - WCAG 2.2 AA compliant
 * - SSR-friendly
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Spinner />
 * ```
 *
 * @example
 * Different variants:
 * ```tsx
 * <Spinner variant="circular" />
 * <Spinner variant="dots" />
 * <Spinner variant="bars" />
 * ```
 *
 * @example
 * With customization:
 * ```tsx
 * <Spinner
 *   variant="circular"
 *   size="lg"
 *   color="primary"
 *   speed="fast"
 *   label="Loading data..."
 * />
 * ```
 *
 * @example
 * Centered in container:
 * ```tsx
 * <div className="h-screen">
 *   <Spinner center />
 * </div>
 * ```
 *
 * @since 0.1.0
 */
export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      variant = 'circular',
      size = 'md',
      color = 'primary',
      speed = 'normal',
      label = 'Loading...',
      center = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'inline-flex',
      center && 'absolute inset-0 items-center justify-center',
    ];

    const classes = cn(
      baseClasses,
      getColorClasses(color),
      className
    );

    const renderCircular = () => {
      const spinnerClasses = cn(
        'rounded-full border-current border-t-transparent animate-spin',
        getSizeClasses(size, variant),
        getSpeedClasses(speed)
      );

      return (
        <div
          className={spinnerClasses}
          aria-hidden="true"
        />
      );
    };

    const renderDots = () => {
      const containerClasses = cn(
        'flex items-center',
        getSizeClasses(size, variant)
      );

      const dotClasses = cn(
        'rounded-full bg-current',
        getDotBarSizeClasses(size)
      );

      const animationClasses = getSpeedClasses(speed);

      return (
        <div className={containerClasses} aria-hidden="true">
          <div
            className={cn(dotClasses, 'animate-bounce', animationClasses)}
            style={{ animationDelay: '0ms' }}
          />
          <div
            className={cn(dotClasses, 'animate-bounce', animationClasses)}
            style={{ animationDelay: '150ms' }}
          />
          <div
            className={cn(dotClasses, 'animate-bounce', animationClasses)}
            style={{ animationDelay: '300ms' }}
          />
        </div>
      );
    };

    const renderBars = () => {
      const containerClasses = cn(
        'flex items-center',
        getSizeClasses(size, variant)
      );

      const barClasses = cn(
        'rounded-sm bg-current',
        getBarSizeClasses(size)
      );

      const animationClasses = getSpeedClasses(speed);

      return (
        <div className={containerClasses} aria-hidden="true">
          <div
            className={cn(barClasses, 'animate-pulse', animationClasses)}
            style={{ animationDelay: '0ms' }}
          />
          <div
            className={cn(barClasses, 'animate-pulse', animationClasses)}
            style={{ animationDelay: '150ms' }}
          />
          <div
            className={cn(barClasses, 'animate-pulse', animationClasses)}
            style={{ animationDelay: '300ms' }}
          />
        </div>
      );
    };

    const renderSpinner = () => {
      switch (variant) {
        case 'circular':
          return renderCircular();
        case 'dots':
          return renderDots();
        case 'bars':
          return renderBars();
        default:
          return renderCircular();
      }
    };

    return (
      <div
        ref={ref}
        className={classes}
        role="status"
        aria-live="polite"
        aria-busy="true"
        {...props}
      >
        {renderSpinner()}
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

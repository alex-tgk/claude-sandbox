import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Card variant types
 *
 * @since 0.1.0
 */
export type CardVariant = 'elevated' | 'outlined' | 'flat';

/**
 * Card size types for padding
 *
 * @since 0.1.0
 */
export type CardSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Card component
 *
 * @remarks
 * A flexible card container component with support for different visual styles,
 * hover effects, and clickable variants.
 *
 * @since 0.1.0
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the card
   * @defaultValue 'elevated'
   */
  variant?: CardVariant;

  /**
   * Padding size
   * @defaultValue 'md'
   */
  size?: CardSize;

  /**
   * Whether to show hover effects
   * @defaultValue false
   */
  hover?: boolean;

  /**
   * Whether the card is clickable (renders as button with proper ARIA)
   * @defaultValue false
   */
  clickable?: boolean;

  /**
   * Click handler for clickable cards
   */
  onClick?: () => void;

  /**
   * Whether the card is disabled (only applies to clickable cards)
   * @defaultValue false
   */
  disabled?: boolean;
}

/**
 * Props for CardHeader subcomponent
 *
 * @since 0.1.0
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Props for CardBody subcomponent
 *
 * @since 0.1.0
 */
export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Props for CardFooter subcomponent
 *
 * @since 0.1.0
 */
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Get the CSS classes for a card variant
 *
 * @param variant - The card variant
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getVariantClasses = (variant: CardVariant): string => {
  const variants: Record<CardVariant, string> = {
    elevated: 'bg-surface shadow-md',
    outlined: 'bg-surface border-2 border-border',
    flat: 'bg-surface-muted',
  };

  return variants[variant];
};

/**
 * Get the CSS classes for a card size (padding)
 *
 * @param size - The card size
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getSizeClasses = (size: CardSize): string => {
  const sizes: Record<CardSize, string> = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return sizes[size];
};

/**
 * Card component - A flexible container for grouping related content.
 *
 * @remarks
 * This component provides a versatile card container with:
 * - Multiple visual variants (elevated, outlined, flat)
 * - Three padding sizes (sm, md, lg)
 * - Optional hover effects
 * - Clickable variant with proper ARIA landmarks
 * - Subcomponents for structured content (Header, Body, Footer)
 * - WCAG 2.2 AA compliant
 * - SSR-friendly
 *
 * Features:
 * - Elevated, outlined, and flat visual styles
 * - Hover effects for interactive feedback
 * - Clickable cards with button semantics
 * - Structured subcomponents for consistent layouts
 * - Flexible padding options
 * - Full TypeScript support with ref forwarding
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Card>
 *   <CardHeader>Title</CardHeader>
 *   <CardBody>Content goes here</CardBody>
 *   <CardFooter>Footer content</CardFooter>
 * </Card>
 * ```
 *
 * @example
 * Different variants:
 * ```tsx
 * <Card variant="elevated">Elevated card</Card>
 * <Card variant="outlined">Outlined card</Card>
 * <Card variant="flat">Flat card</Card>
 * ```
 *
 * @example
 * With hover effects:
 * ```tsx
 * <Card hover variant="elevated">
 *   Hover over me
 * </Card>
 * ```
 *
 * @example
 * Clickable card:
 * ```tsx
 * <Card clickable onClick={() => console.log('clicked')} hover>
 *   <CardBody>Click me</CardBody>
 * </Card>
 * ```
 *
 * @example
 * Different sizes:
 * ```tsx
 * <Card size="sm">Small padding</Card>
 * <Card size="md">Medium padding</Card>
 * <Card size="lg">Large padding</Card>
 * ```
 *
 * @since 0.1.0
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      size = 'md',
      hover = false,
      clickable = false,
      onClick,
      disabled = false,
      children,
      className,
      role,
      tabIndex,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      // Layout
      'rounded-lg',
      // Transitions
      'transition-interactive',
    ];

    const hoverClasses = hover
      ? [
          'hover:shadow-lg',
          variant === 'elevated' && 'hover:-translate-y-0.5',
          variant === 'outlined' && 'hover:border-border-focus',
        ]
      : [];

    const clickableClasses = clickable
      ? [
          'cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
          disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        ]
      : [];

    const classes = cn(
      baseClasses,
      getVariantClasses(variant),
      getSizeClasses(size),
      hoverClasses,
      clickableClasses,
      className
    );

    const handleClick = () => {
      if (clickable && !disabled && onClick) {
        onClick();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (clickable && !disabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <div
        ref={ref}
        className={classes}
        onClick={clickable ? handleClick : undefined}
        onKeyDown={clickable ? handleKeyDown : undefined}
        role={clickable ? role ?? 'button' : role}
        tabIndex={clickable && !disabled ? tabIndex ?? 0 : tabIndex}
        aria-disabled={clickable && disabled ? true : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * CardHeader component - Header section of a card.
 *
 * @remarks
 * Provides a consistent header section with appropriate spacing and styling.
 * Typically contains titles, actions, or metadata.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <h3>Card Title</h3>
 *   </CardHeader>
 *   <CardBody>Content</CardBody>
 * </Card>
 * ```
 *
 * @since 0.1.0
 */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const classes = cn('mb-3', className);

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * CardBody component - Main content section of a card.
 *
 * @remarks
 * Provides the main content area with appropriate spacing.
 * Can contain any content including text, images, or other components.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardBody>
 *     <p>Main content goes here</p>
 *   </CardBody>
 * </Card>
 * ```
 *
 * @since 0.1.0
 */
export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => {
    const classes = cn('', className);

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

/**
 * CardFooter component - Footer section of a card.
 *
 * @remarks
 * Provides a consistent footer section with appropriate spacing.
 * Typically contains actions, links, or metadata.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardBody>Content</CardBody>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 *
 * @since 0.1.0
 */
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    const classes = cn('mt-3', className);

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

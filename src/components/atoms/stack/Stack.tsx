import React, { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Stack direction
 *
 * @since 0.2.0
 */
export type StackDirection = 'vertical' | 'horizontal';

/**
 * Stack gap sizes using Carbon spacing scale
 *
 * @since 0.2.0
 */
export type StackGap = '0' | '2' | '4' | '6' | '8' | '12' | '16';

/**
 * Stack alignment options
 *
 * @since 0.2.0
 */
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';

/**
 * Stack justify options
 *
 * @since 0.2.0
 */
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

/**
 * Props for the Stack component
 *
 * @remarks
 * A flexbox-based layout primitive for stacking elements with consistent spacing.
 *
 * @since 0.2.0
 */
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Direction of the stack
   * @defaultValue 'vertical'
   */
  direction?: StackDirection;

  /**
   * Gap between stack items (Carbon spacing scale)
   * @defaultValue '4'
   */
  gap?: StackGap;

  /**
   * Align items along cross axis
   * @defaultValue 'stretch'
   */
  align?: StackAlign;

  /**
   * Justify items along main axis
   * @defaultValue 'start'
   */
  justify?: StackJustify;

  /**
   * Whether items should wrap
   * @defaultValue false
   */
  wrap?: boolean;

  /**
   * Whether stack should take full width
   * @defaultValue false
   */
  isFullWidth?: boolean;

  /**
   * Divider element to show between items
   */
  divider?: React.ReactNode;
}

/**
 * Get gap classes using Carbon spacing
 *
 * @internal
 * @remarks
 * Carbon spacing scale:
 * - 0: 0px
 * - 2: 0.5rem (8px) - --spacing-03
 * - 4: 1rem (16px) - --spacing-05
 * - 6: 1.5rem (24px) - --spacing-06
 * - 8: 2rem (32px) - --spacing-07
 * - 12: 3rem (48px) - --spacing-09
 * - 16: 4rem (64px) - --spacing-10
 */
const getGapClasses = (gap: StackGap): string => {
  const gapMap: Record<StackGap, string> = {
    '0': 'gap-0',
    '2': 'gap-2',    // 8px - Carbon spacing-03
    '4': 'gap-4',    // 16px - Carbon spacing-05
    '6': 'gap-6',    // 24px - Carbon spacing-06
    '8': 'gap-8',    // 32px - Carbon spacing-07
    '12': 'gap-12',  // 48px - Carbon spacing-09
    '16': 'gap-16',  // 64px - Carbon spacing-10
  };
  return gapMap[gap];
};

/**
 * Get alignment classes
 *
 * @internal
 */
const getAlignClasses = (align: StackAlign): string => {
  const alignMap: Record<StackAlign, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };
  return alignMap[align];
};

/**
 * Get justify classes
 *
 * @internal
 */
const getJustifyClasses = (justify: StackJustify): string => {
  const justifyMap: Record<StackJustify, string> = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };
  return justifyMap[justify];
};

/**
 * Stack component - Flexbox layout primitive with Carbon spacing.
 *
 * @remarks
 * A flexible stack layout component that:
 * - Uses Flexbox for 1D layouts (vertical or horizontal)
 * - Follows Carbon Design System spacing scale
 * - Supports dividers between items
 * - Provides common alignment and justify options
 * - Simplifies common layout patterns
 *
 * Features:
 * - Vertical or horizontal stacking
 * - Carbon spacing for gaps
 * - Flexible alignment options
 * - Optional dividers
 * - Wrap support
 * - Full TypeScript support
 *
 * @example
 * Vertical stack (default):
 * ```tsx
 * <Stack gap="4">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 *
 * @example
 * Horizontal stack with divider:
 * ```tsx
 * <Stack
 *   direction="horizontal"
 *   gap="4"
 *   divider={<div className="w-px bg-border-subtle" />}
 * >
 *   <Button>Cancel</Button>
 *   <Button variant="primary">Submit</Button>
 * </Stack>
 * ```
 *
 * @example
 * Centered stack:
 * ```tsx
 * <Stack align="center" justify="center" gap="6">
 *   <Icon />
 *   <h2>Title</h2>
 *   <p>Description</p>
 * </Stack>
 * ```
 *
 * @since 0.2.0
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      gap = '4',
      align = 'stretch',
      justify = 'start',
      wrap = false,
      isFullWidth = false,
      divider,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      'flex',
      direction === 'vertical' ? 'flex-col' : 'flex-row',
      getGapClasses(gap),
      getAlignClasses(align),
      getJustifyClasses(justify),
      wrap && 'flex-wrap',
      isFullWidth && 'w-full',
      className
    );

    // If divider is provided, render children with dividers between them
    if (divider) {
      const childArray = React.Children.toArray(children);
      const childrenWithDividers = childArray.flatMap((child, index) => {
        if (index === childArray.length - 1) {
          return [child];
        }
        return [child, <div key={`divider-${index}`}>{divider}</div>];
      });

      return (
        <div ref={ref} className={classes} {...props}>
          {childrenWithDividers}
        </div>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

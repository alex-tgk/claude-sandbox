import { forwardRef, type HTMLAttributes, type CSSProperties } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Flex direction
 *
 * @since 0.2.0
 */
export type FlexDirection = 'row' | 'row-reverse' | 'col' | 'col-reverse';

/**
 * Flex gap sizes using Carbon spacing scale
 *
 * @since 0.2.0
 */
export type FlexGap = '0' | '2' | '4' | '6' | '8' | '12' | '16';

/**
 * Flex alignment options
 *
 * @since 0.2.0
 */
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/**
 * Flex justify options
 *
 * @since 0.2.0
 */
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

/**
 * Flex wrap options
 *
 * @since 0.2.0
 */
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

/**
 * Props for the Flex component
 *
 * @remarks
 * A low-level flexbox primitive for maximum layout control.
 *
 * @since 0.2.0
 */
export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Flex direction
   * @defaultValue 'row'
   */
  direction?: FlexDirection;

  /**
   * Gap between flex items (Carbon spacing scale)
   * @defaultValue '0'
   */
  gap?: FlexGap;

  /**
   * Align items along cross axis
   * @defaultValue 'stretch'
   */
  align?: FlexAlign;

  /**
   * Justify items along main axis
   * @defaultValue 'start'
   */
  justify?: FlexJustify;

  /**
   * Flex wrap behavior
   * @defaultValue 'nowrap'
   */
  wrap?: FlexWrap;

  /**
   * Whether flex container should take full width
   * @defaultValue false
   */
  isFullWidth?: boolean;

  /**
   * Whether flex container should take full height
   * @defaultValue false
   */
  isFullHeight?: boolean;

  /**
   * Flex basis (CSS flex-basis)
   */
  basis?: string | number;

  /**
   * Flex grow (CSS flex-grow)
   */
  grow?: number;

  /**
   * Flex shrink (CSS flex-shrink)
   */
  shrink?: number;
}

/**
 * Get gap classes using Carbon spacing
 *
 * @internal
 */
const getGapClasses = (gap: FlexGap): string => {
  const gapMap: Record<FlexGap, string> = {
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
 * Get direction classes
 *
 * @internal
 */
const getDirectionClasses = (direction: FlexDirection): string => {
  const directionMap: Record<FlexDirection, string> = {
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    col: 'flex-col',
    'col-reverse': 'flex-col-reverse',
  };
  return directionMap[direction];
};

/**
 * Get alignment classes
 *
 * @internal
 */
const getAlignClasses = (align: FlexAlign): string => {
  const alignMap: Record<FlexAlign, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  };
  return alignMap[align];
};

/**
 * Get justify classes
 *
 * @internal
 */
const getJustifyClasses = (justify: FlexJustify): string => {
  const justifyMap: Record<FlexJustify, string> = {
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
 * Get wrap classes
 *
 * @internal
 */
const getWrapClasses = (wrap: FlexWrap): string => {
  const wrapMap: Record<FlexWrap, string> = {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
  };
  return wrapMap[wrap];
};

/**
 * Flex component - Low-level flexbox primitive with full control.
 *
 * @remarks
 * A powerful flex layout component that:
 * - Provides full Flexbox API access
 * - Uses Carbon Design System spacing for gaps
 * - Supports all flex properties
 * - Offers maximum layout flexibility
 * - Perfect for complex layouts
 *
 * Features:
 * - All flex directions and reversals
 * - Carbon spacing for gaps
 * - Complete alignment control
 * - Wrap behaviors
 * - Grow/shrink/basis control
 * - Full TypeScript support
 *
 * @example
 * Basic flex row:
 * ```tsx
 * <Flex gap="4" align="center">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Flex>
 * ```
 *
 * @example
 * Responsive navigation:
 * ```tsx
 * <Flex justify="between" align="center" isFullWidth>
 *   <Logo />
 *   <Flex gap="6" align="center">
 *     <NavLink>Home</NavLink>
 *     <NavLink>About</NavLink>
 *     <NavLink>Contact</NavLink>
 *   </Flex>
 * </Flex>
 * ```
 *
 * @example
 * Centered layout:
 * ```tsx
 * <Flex
 *   direction="col"
 *   align="center"
 *   justify="center"
 *   isFullWidth
 *   isFullHeight
 *   gap="8"
 * >
 *   <Icon size="xl" />
 *   <h1>Welcome</h1>
 *   <Button>Get Started</Button>
 * </Flex>
 * ```
 *
 * @example
 * With custom flex properties:
 * ```tsx
 * <Flex gap="4">
 *   <Flex basis="200px" shrink={0}>Sidebar</Flex>
 *   <Flex grow={1}>Main Content</Flex>
 *   <Flex basis="200px" shrink={0}>Sidebar</Flex>
 * </Flex>
 * ```
 *
 * @since 0.2.0
 */
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      direction = 'row',
      gap = '0',
      align = 'stretch',
      justify = 'start',
      wrap = 'nowrap',
      isFullWidth = false,
      isFullHeight = false,
      basis,
      grow,
      shrink,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      'flex',
      getDirectionClasses(direction),
      getGapClasses(gap),
      getAlignClasses(align),
      getJustifyClasses(justify),
      getWrapClasses(wrap),
      isFullWidth && 'w-full',
      isFullHeight && 'h-full',
      className
    );

    const flexStyle: CSSProperties = {
      ...style,
      ...(basis && { flexBasis: basis }),
      ...(grow !== undefined && { flexGrow: grow }),
      ...(shrink !== undefined && { flexShrink: shrink }),
    };

    return (
      <div ref={ref} className={classes} style={flexStyle} {...props}>
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

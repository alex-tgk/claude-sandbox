import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Grid gap sizes using Carbon spacing scale
 *
 * @since 0.2.0
 */
export type GridGap = '0' | '2' | '4' | '6' | '8' | '12' | '16';

/**
 * Grid column counts
 *
 * @since 0.2.0
 */
export type GridCols = '1' | '2' | '3' | '4' | '5' | '6' | '12';

/**
 * Props for the Grid component
 *
 * @remarks
 * A flexible CSS Grid layout primitive following Carbon spacing conventions.
 *
 * @since 0.2.0
 */
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns in the grid
   * @defaultValue '1'
   */
  cols?: GridCols;

  /**
   * Gap between grid items (Carbon spacing scale)
   * @defaultValue '4'
   */
  gap?: GridGap;

  /**
   * Responsive column breakpoints
   * @example { sm: '1', md: '2', lg: '3' }
   */
  responsive?: {
    sm?: GridCols;
    md?: GridCols;
    lg?: GridCols;
    xl?: GridCols;
  };

  /**
   * Whether items should have equal heights
   * @defaultValue false
   */
  autoRows?: boolean;

  /**
   * Custom template columns (overrides cols)
   * @example "1fr 2fr 1fr"
   */
  templateColumns?: string;

  /**
   * Custom template rows
   * @example "auto 1fr auto"
   */
  templateRows?: string;
}

/**
 * Get column classes for grid
 *
 * @internal
 */
const getColClasses = (cols: GridCols): string => {
  const colMap: Record<GridCols, string> = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-4',
    '5': 'grid-cols-5',
    '6': 'grid-cols-6',
    '12': 'grid-cols-12',
  };
  return colMap[cols];
};

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
const getGapClasses = (gap: GridGap): string => {
  const gapMap: Record<GridGap, string> = {
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
 * Grid component - CSS Grid layout primitive with Carbon spacing.
 *
 * @remarks
 * A flexible grid layout component that:
 * - Uses CSS Grid for powerful 2D layouts
 * - Follows Carbon Design System spacing scale
 * - Supports responsive column breakpoints
 * - Allows custom grid templates
 * - Provides sensible defaults for common use cases
 *
 * Features:
 * - Responsive column layouts
 * - Carbon spacing for gaps
 * - Equal row heights (optional)
 * - Custom grid templates
 * - Full TypeScript support
 *
 * @example
 * Basic grid:
 * ```tsx
 * <Grid cols="3" gap="4">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * ```
 *
 * @example
 * Responsive grid:
 * ```tsx
 * <Grid
 *   cols="1"
 *   gap="4"
 *   responsive={{ sm: '1', md: '2', lg: '3', xl: '4' }}
 * >
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 * ```
 *
 * @example
 * Custom template:
 * ```tsx
 * <Grid templateColumns="200px 1fr 200px" gap="6">
 *   <aside>Sidebar</aside>
 *   <main>Content</main>
 *   <aside>Sidebar</aside>
 * </Grid>
 * ```
 *
 * @since 0.2.0
 */
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      cols = '1',
      gap = '4',
      responsive,
      autoRows = false,
      templateColumns,
      templateRows,
      className,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      'grid',
      !templateColumns && getColClasses(cols),
      getGapClasses(gap),
      autoRows && 'auto-rows-fr',
      // Responsive breakpoints
      responsive?.sm && `sm:${getColClasses(responsive.sm)}`,
      responsive?.md && `md:${getColClasses(responsive.md)}`,
      responsive?.lg && `lg:${getColClasses(responsive.lg)}`,
      responsive?.xl && `xl:${getColClasses(responsive.xl)}`,
      className
    );

    const gridStyle: React.CSSProperties = {
      ...style,
      ...(templateColumns && { gridTemplateColumns: templateColumns }),
      ...(templateRows && { gridTemplateRows: templateRows }),
    };

    return (
      <div ref={ref} className={classes} style={gridStyle} {...props}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

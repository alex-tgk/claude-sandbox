import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

/**
 * Split Layout Props
 *
 * @since 0.2.0
 */
export interface SplitLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Left panel content
   */
  left: ReactNode;

  /**
   * Right panel content
   */
  right: ReactNode;

  /**
   * Split ratio (percentage for left panel)
   * @defaultValue 50
   */
  splitRatio?: number;

  /**
   * Whether panels should be stacked on mobile
   * @defaultValue true
   */
  stackOnMobile?: boolean;

  /**
   * Background color for left panel
   */
  leftBg?: 'layer-01' | 'layer-02' | 'surface';

  /**
   * Background color for right panel
   */
  rightBg?: 'layer-01' | 'layer-02' | 'surface';
}

/**
 * Split Layout Template
 *
 * @remarks
 * A two-column split layout perfect for comparison views, image galleries,
 * or any side-by-side content presentation.
 *
 * Features:
 * - Adjustable split ratio
 * - Responsive stacking
 * - Independent scrolling panels
 * - IBM Carbon inspired spacing
 *
 * @example
 * ```tsx
 * <SplitLayout
 *   left={<ImageGallery />}
 *   right={<ProductDetails />}
 *   splitRatio={40}
 * />
 * ```
 *
 * @since 0.2.0
 */
export const SplitLayout = forwardRef<HTMLDivElement, SplitLayoutProps>(
  (
    {
      left,
      right,
      splitRatio = 50,
      stackOnMobile = true,
      leftBg = 'layer-01',
      rightBg = 'layer-02',
      className,
      ...props
    },
    ref
  ) => {
    const bgClasses = {
      'layer-01': 'bg-layer-01',
      'layer-02': 'bg-layer-02',
      'surface': 'bg-surface',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex h-screen w-full',
          stackOnMobile && 'flex-col lg:flex-row',
          !stackOnMobile && 'flex-row',
          className
        )}
        {...props}
      >
        {/* Left Panel */}
        <div
          className={cn(
            'overflow-y-auto p-6',
            bgClasses[leftBg],
            !stackOnMobile && 'border-r border-border-subtle'
          )}
          style={{
            width: stackOnMobile ? undefined : `${splitRatio}%`,
          }}
        >
          {left}
        </div>

        {/* Right Panel */}
        <div
          className={cn(
            'flex-1 overflow-y-auto p-6',
            bgClasses[rightBg],
            stackOnMobile && 'lg:border-l lg:border-border-subtle'
          )}
          style={{
            width: stackOnMobile ? undefined : `${100 - splitRatio}%`,
          }}
        >
          {right}
        </div>
      </div>
    );
  }
);

SplitLayout.displayName = 'SplitLayout';

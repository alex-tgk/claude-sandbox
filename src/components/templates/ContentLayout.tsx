import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

/**
 * Content Layout Props
 *
 * @since 0.2.0
 */
export interface ContentLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Main content area
   */
  children: ReactNode;

  /**
   * Optional sidebar content (table of contents, filters, etc.)
   */
  aside?: ReactNode;

  /**
   * Optional breadcrumb or navigation
   */
  breadcrumb?: ReactNode;

  /**
   * Optional page actions (buttons, etc.)
   */
  actions?: ReactNode;

  /**
   * Page title
   */
  title?: string;

  /**
   * Page description
   */
  description?: string;

  /**
   * Sidebar position
   * @defaultValue 'right'
   */
  asidePosition?: 'left' | 'right';

  /**
   * Maximum content width
   * @defaultValue 'max-w-7xl'
   */
  maxWidth?: string;
}

/**
 * Content Layout Template
 *
 * @remarks
 * A flexible content layout for articles, documentation, and long-form content.
 * Includes optional sidebar, breadcrumbs, and page header.
 *
 * Features:
 * - Responsive content width
 * - Optional sidebar (left or right)
 * - Breadcrumb navigation
 * - Page header with actions
 * - IBM Carbon inspired spacing
 *
 * @example
 * ```tsx
 * <ContentLayout
 *   title="Documentation"
 *   breadcrumb={<Breadcrumbs />}
 *   aside={<TableOfContents />}
 * >
 *   <Article />
 * </ContentLayout>
 * ```
 *
 * @since 0.2.0
 */
export const ContentLayout = forwardRef<HTMLDivElement, ContentLayoutProps>(
  (
    {
      children,
      aside,
      breadcrumb,
      actions,
      title,
      description,
      asidePosition = 'right',
      maxWidth = 'max-w-7xl',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('min-h-screen w-full bg-layer-01 py-8', className)}
        {...props}
      >
        <div className={cn('mx-auto px-6', maxWidth)}>
          {/* Breadcrumb */}
          {breadcrumb && <div className="mb-4">{breadcrumb}</div>}

          {/* Page Header */}
          {(title || description || actions) && (
            <div className="mb-8 flex items-start justify-between">
              <div className="space-y-2">
                {title && (
                  <h1 className="text-3xl font-medium text-text-primary">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-base text-text-secondary">{description}</p>
                )}
              </div>
              {actions && <div className="flex gap-3">{actions}</div>}
            </div>
          )}

          {/* Main Content Grid */}
          <div
            className={cn(
              'grid gap-8',
              aside && asidePosition === 'right' && 'lg:grid-cols-[1fr_16rem]',
              aside && asidePosition === 'left' && 'lg:grid-cols-[16rem_1fr]'
            )}
          >
            {/* Sidebar Left */}
            {aside && asidePosition === 'left' && (
              <aside className="hidden lg:block">
                <div className="sticky top-8">{aside}</div>
              </aside>
            )}

            {/* Main Content */}
            <main className="min-w-0">
              {children}
            </main>

            {/* Sidebar Right */}
            {aside && asidePosition === 'right' && (
              <aside className="hidden lg:block">
                <div className="sticky top-8">{aside}</div>
              </aside>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ContentLayout.displayName = 'ContentLayout';

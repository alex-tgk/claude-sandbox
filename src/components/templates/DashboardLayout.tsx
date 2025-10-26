import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

/**
 * Dashboard Layout Props
 *
 * @since 0.2.0
 */
export interface DashboardLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Navigation sidebar content
   */
  sidebar?: ReactNode;

  /**
   * Top navigation/header content
   */
  header?: ReactNode;

  /**
   * Main content area
   */
  children: ReactNode;

  /**
   * Whether sidebar is collapsed
   * @defaultValue false
   */
  isSidebarCollapsed?: boolean;

  /**
   * Custom sidebar width (when expanded)
   * @defaultValue '16rem' (256px)
   */
  sidebarWidth?: string;
}

/**
 * Dashboard Layout Template
 *
 * @remarks
 * A common application layout with optional sidebar and header.
 * Perfect for admin dashboards, data applications, and management UIs.
 *
 * Features:
 * - Fixed header
 * - Collapsible sidebar
 * - Scrollable main content
 * - Responsive design
 * - IBM Carbon inspired spacing
 *
 * @example
 * ```tsx
 * <DashboardLayout
 *   header={<AppHeader />}
 *   sidebar={<Navigation />}
 * >
 *   <YourContent />
 * </DashboardLayout>
 * ```
 *
 * @since 0.2.0
 */
export const DashboardLayout = forwardRef<HTMLDivElement, DashboardLayoutProps>(
  (
    {
      sidebar,
      header,
      children,
      isSidebarCollapsed = false,
      sidebarWidth = '16rem',
      className,
      ...props
    },
    ref
  ) => {
    const collapsedWidth = '4rem';

    return (
      <div
        ref={ref}
        className={cn('flex h-screen w-full overflow-hidden bg-layer-01', className)}
        {...props}
      >
        {/* Sidebar */}
        {sidebar && (
          <aside
            className={cn(
              'flex flex-col border-r border-border-subtle bg-layer-02 transition-all duration-110',
              'overflow-y-auto'
            )}
            style={{
              width: isSidebarCollapsed ? collapsedWidth : sidebarWidth,
            }}
          >
            {sidebar}
          </aside>
        )}

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          {header && (
            <header className="border-b border-border-subtle bg-layer-02 px-6 py-4">
              {header}
            </header>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    );
  }
);

DashboardLayout.displayName = 'DashboardLayout';

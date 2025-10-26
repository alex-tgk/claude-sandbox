import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

/**
 * Auth Layout Props
 *
 * @since 0.2.0
 */
export interface AuthLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Main content (login form, signup form, etc.)
   */
  children: ReactNode;

  /**
   * Optional logo or branding element
   */
  logo?: ReactNode;

  /**
   * Optional footer content
   */
  footer?: ReactNode;

  /**
   * Optional background pattern or image URL
   */
  backgroundImage?: string;

  /**
   * Position of the auth card
   * @defaultValue 'center'
   */
  position?: 'center' | 'left' | 'right';
}

/**
 * Authentication Layout Template
 *
 * @remarks
 * A centered layout optimized for authentication flows like login,
 * signup, password reset, etc.
 *
 * Features:
 * - Centered content card
 * - Optional branding area
 * - Responsive design
 * - IBM Carbon inspired spacing
 * - Support for background images
 *
 * @example
 * ```tsx
 * <AuthLayout logo={<Logo />} footer={<Terms />}>
 *   <LoginForm />
 * </AuthLayout>
 * ```
 *
 * @since 0.2.0
 */
export const AuthLayout = forwardRef<HTMLDivElement, AuthLayoutProps>(
  (
    {
      children,
      logo,
      footer,
      backgroundImage,
      position = 'center',
      className,
      ...props
    },
    ref
  ) => {
    const positionClasses = {
      center: 'items-center justify-center',
      left: 'items-center justify-start pl-16',
      right: 'items-center justify-end pr-16',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex min-h-screen w-full bg-layer-01',
          positionClasses[position],
          className
        )}
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        {...props}
      >
        {/* Auth Card Container */}
        <div className="w-full max-w-md space-y-6 p-6">
          {/* Logo/Branding */}
          {logo && (
            <div className="flex justify-center">
              {logo}
            </div>
          )}

          {/* Main Auth Content */}
          <div className="rounded-none border border-border-subtle bg-layer-02 p-8 shadow-lg">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="text-center text-sm text-text-secondary">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

AuthLayout.displayName = 'AuthLayout';

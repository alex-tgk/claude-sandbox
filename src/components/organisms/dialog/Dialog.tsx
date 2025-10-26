import { forwardRef, useEffect, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { useFocusTrap } from '../../../hooks/use-focus-trap';

/**
 * Dialog size types
 *
 * @since 0.1.0
 */
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

/**
 * Props for the Dialog component
 *
 * @remarks
 * A modal dialog that traps focus and prevents interaction with background content.
 * Follows WCAG 2.2 AA guidelines for modal dialogs.
 *
 * @since 0.1.0
 */
export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the dialog is open
   */
  isOpen: boolean;

  /**
   * Callback when the dialog should close
   */
  onClose: () => void;

  /**
   * Dialog title (required for accessibility)
   */
  title: string;

  /**
   * Optional description for the dialog
   */
  description?: string;

  /**
   * Size of the dialog
   * @defaultValue 'md'
   */
  size?: DialogSize;

  /**
   * Whether clicking the backdrop closes the dialog
   * @defaultValue true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Whether pressing Escape closes the dialog
   * @defaultValue true
   */
  closeOnEscape?: boolean;

  /**
   * Whether to show the close button
   * @defaultValue true
   */
  showCloseButton?: boolean;
}

/**
 * Get the CSS classes for a dialog size
 *
 * @param size - The dialog size
 * @returns Tailwind CSS class string
 *
 * @internal
 */
const getSizeClasses = (size: DialogSize): string => {
  const sizes: Record<DialogSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  return sizes[size];
};

/**
 * Dialog component - An accessible modal dialog.
 *
 * @remarks
 * This component implements a fully accessible modal dialog:
 * - Focus trap: prevents Tab from leaving the dialog
 * - Escape key support: closes dialog on Escape
 * - Backdrop click: optional close on backdrop click
 * - Focus restoration: returns focus to trigger element when closed
 * - ARIA attributes: proper roles and labels
 * - Scroll lock: prevents body scroll when dialog is open
 * - SSR-friendly: safe to render on server
 *
 * Features:
 * - Multiple size options
 * - Customizable close behavior
 * - Accessible by default (WCAG 2.2 AA)
 * - Smooth animations
 * - Portal rendering (future enhancement)
 *
 * @example
 * Basic usage:
 * ```tsx
 * function MyComponent() {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
 *       <Dialog
 *         isOpen={isOpen}
 *         onClose={() => setIsOpen(false)}
 *         title="Confirm Action"
 *         description="Are you sure you want to continue?"
 *       >
 *         <p>This action cannot be undone.</p>
 *         <div className="mt-4 flex gap-2">
 *           <Button onClick={() => setIsOpen(false)}>Cancel</Button>
 *           <Button variant="primary">Confirm</Button>
 *         </div>
 *       </Dialog>
 *     </>
 *   );
 * }
 * ```
 *
 * @since 0.1.0
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      size = 'md',
      closeOnBackdropClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const dialogRef = useFocusTrap<HTMLDivElement>(isOpen);

    // Handle Escape key
    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeOnEscape, onClose]);

    // Lock body scroll when dialog is open
    useEffect(() => {
      if (!isOpen) return;

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }, [isOpen]);

    // Don't render if not open
    if (!isOpen) return null;

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="presentation"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />

        {/* Dialog */}
        <div
          ref={(node) => {
            // Handle both refs
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            if (dialogRef) {
              (dialogRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          aria-describedby={description ? 'dialog-description' : undefined}
          className={cn(
            'relative z-10 w-full bg-layer-02 rounded-none shadow-xl',
            'transform transition-all duration-110',
            getSizeClasses(size),
            className
          )}
          {...props}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-border-subtle px-6 py-4">
            <div className="flex-1">
              <h2
                id="dialog-title"
                className="text-xl font-semibold text-text-primary"
              >
                {title}
              </h2>
              {description && (
                <p
                  id="dialog-description"
                  className="mt-1 text-sm text-text-secondary"
                >
                  {description}
                </p>
              )}
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="ml-4 rounded-md p-1 text-text-muted transition-colors hover:bg-surface-hover hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                aria-label="Close dialog"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 5L5 15M5 5l10 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Content */}
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    );
  }
);

Dialog.displayName = 'Dialog';

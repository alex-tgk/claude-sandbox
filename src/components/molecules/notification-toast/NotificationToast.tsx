import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

export type NotificationToastVariant = 'info' | 'success' | 'warning' | 'danger';

export interface NotificationToastProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  variant?: NotificationToastVariant;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  dismissible?: boolean;
}

const variantClasses: Record<NotificationToastVariant, string> = {
  info: 'border-info bg-info-light',
  success: 'border-success bg-success-light',
  warning: 'border-warning bg-warning-light',
  danger: 'border-error bg-error-light',
};

export const NotificationToast = forwardRef<HTMLDivElement, NotificationToastProps>(
  (
    {
      className,
      title,
      description,
      variant = 'info',
      actionLabel,
      onAction,
      onDismiss,
      dismissible = true,
      role: incomingRole = 'status',
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      role={variant === 'danger' ? 'alert' : incomingRole}
      className={cn(
        'flex w-full max-w-md items-start gap-3 rounded-lg border p-4 shadow-lg shadow-black/5',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <div className="flex-1">
        <p className="font-semibold text-text">{title}</p>
        {description ? <p className="text-sm text-text-muted">{description}</p> : null}
        {actionLabel ? (
          <button
            type="button"
            className="mt-3 text-sm font-medium text-interactive underline decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          aria-label="Dismiss notification"
          className="rounded-full p-1 text-text-muted transition hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2"
          onClick={onDismiss}
        >
          x
        </button>
      ) : null}
    </div>
  )
);

NotificationToast.displayName = 'NotificationToast';

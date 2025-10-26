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
  info: 'border-blue-200 bg-blue-50 text-blue-900',
  success: 'border-green-200 bg-green-50 text-green-900',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
  danger: 'border-red-200 bg-red-50 text-red-900',
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
      role = 'status',
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      role={role}
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
            className="mt-3 text-sm font-medium underline decoration-2"
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
          className="text-sm font-semibold"
          onClick={onDismiss}
        >
          x
        </button>
      ) : null}
    </div>
  )
);

NotificationToast.displayName = 'NotificationToast';

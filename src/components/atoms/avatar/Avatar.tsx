import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  src?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'h-8 w-8 text-xs',
  sm: 'h-10 w-10 text-sm',
  md: 'h-12 w-12 text-base',
  lg: 'h-16 w-16 text-lg',
};

const statusClasses: Record<AvatarStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
  away: 'bg-amber-400',
};

const getInitials = (name?: string): string => {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }
  return (parts[0]?.[0] ?? '').concat(parts[1]?.[0] ?? '').toUpperCase();
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, name, src, size = 'md', status, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full bg-surface-muted text-text font-semibold uppercase',
          'border border-border-subtle shadow-sm',
          sizeClasses[size],
          className
        )}
        aria-label={name ? `Avatar for ${name}` : 'Avatar'}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={name ?? 'Avatar image'}
            className="h-full w-full rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <span>{children ?? getInitials(name)}</span>
        )}
        {status ? (
          <span
            className={cn(
              'absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white',
              statusClasses[status]
            )}
            aria-label={`Status: ${status}`}
          />
        ) : null}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

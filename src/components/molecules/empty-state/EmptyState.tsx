import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';

/**
 * Available tone options for EmptyState
 */
export type EmptyStateTone = 'neutral' | 'informative' | 'positive' | 'destructive';

/**
 * Layout presets for EmptyState
 */
export type EmptyStateLayout = 'centered' | 'split';

export interface EmptyStateProps extends HTMLAttributes<HTMLElement> {
  /**
   * Headline shown as the primary callout
   */
  title: string;
  /**
   * Supporting copy under the title
   */
  description?: ReactNode;
  /**
   * Optional eyebrow text rendered above the title
   */
  eyebrow?: string;
  /**
   * Custom media (icon, illustration, Lottie, etc.) rendered in the hero slot
   */
  media?: ReactNode;
  /**
   * Hide the media slot entirely (including the default illustration)
   */
  hideMedia?: boolean;
  /**
   * Visual tone for the surface and icon treatments
   * @defaultValue 'neutral'
   */
  tone?: EmptyStateTone;
  /**
   * Layout for content distribution
   * @defaultValue 'centered'
   */
  layout?: EmptyStateLayout;
  /**
   * Reduced padding and gaps for tight spaces
   * @defaultValue false
   */
  dense?: boolean;
  /**
   * Primary action slot (typically a Button)
   */
  primaryAction?: ReactNode;
  /**
   * Secondary action slot (link button, tertiary CTA, etc.)
   */
  secondaryAction?: ReactNode;
  /**
   * Additional custom content rendered beneath the description
   */
  children?: ReactNode;
}

const toneSurfaces: Record<EmptyStateTone, string> = {
  neutral: 'border-border-subtle bg-surface text-text',
  informative: 'border-info bg-info-light text-info',
  positive: 'border-success bg-success-light text-success',
  destructive: 'border-error bg-error-light text-error',
};

const toneDescriptions: Record<EmptyStateTone, string> = {
  neutral: 'text-text-muted',
  informative: 'text-info',
  positive: 'text-success',
  destructive: 'text-error',
};

const toneIconWrappers: Record<EmptyStateTone, string> = {
  neutral: 'border-border-subtle bg-surface text-text-muted',
  informative: 'border-info bg-surface text-info',
  positive: 'border-success bg-surface text-success',
  destructive: 'border-error bg-surface text-error',
};

const toneEyebrow: Record<EmptyStateTone, string> = {
  neutral: 'text-text-muted',
  informative: 'text-info',
  positive: 'text-success',
  destructive: 'text-error',
};

const DefaultMedia = () => (
  <svg
    viewBox="0 0 64 64"
    aria-hidden="true"
    focusable="false"
    className="h-12 w-12"
  >
    <path
      d="M8 18c0-3.314 2.686-6 6-6h36c3.314 0 6 2.686 6 6v28c0 3.314-2.686 6-6 6H14c-3.314 0-6-2.686-6-6z"
      fill="currentColor"
      opacity="0.12"
    />
    <rect
      x="16"
      y="24"
      width="32"
      height="4"
      rx="2"
      fill="currentColor"
      opacity="0.35"
    />
    <rect
      x="16"
      y="32"
      width="24"
      height="4"
      rx="2"
      fill="currentColor"
      opacity="0.35"
    />
    <circle cx="22" cy="40" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="30" cy="40" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="38" cy="40" r="2" fill="currentColor" opacity="0.6" />
  </svg>
);

export const EmptyState = forwardRef<HTMLElement, EmptyStateProps>(function EmptyState(
  {
    title,
    description,
    eyebrow,
    media,
    hideMedia = false,
    tone = 'neutral',
    layout = 'centered',
    dense = false,
    primaryAction,
    secondaryAction,
    children,
    className,
    'aria-live': ariaLive = 'polite',
    ...rest
  },
  ref
) {
  const isSplit = layout === 'split';
  const shouldRenderMedia = !hideMedia && media !== null;
  const hasCustomMedia = media !== undefined && media !== null;
  const mediaNode = hasCustomMedia ? media : <DefaultMedia />;
  const mediaWrapperClasses = cn(
    'flex items-center justify-center rounded-2xl border shadow-sm',
    toneIconWrappers[tone],
    hasCustomMedia ? 'px-5 py-4' : 'h-16 w-16 text-2xl'
  );

  return (
    <section
      ref={ref}
      role="status"
      aria-live={ariaLive}
      className={cn(
        'flex flex-col rounded-3xl border shadow-sm transition-all',
        dense ? 'gap-4 p-6' : 'gap-6 p-10',
        toneSurfaces[tone],
        className
      )}
      {...rest}
    >
      <div
        className={cn(
          'flex w-full flex-col gap-5',
          isSplit ? 'text-left sm:flex-row sm:items-center sm:gap-10' : 'items-center text-center'
        )}
      >
        {shouldRenderMedia && (
          <div
            className={cn(
              'flex flex-col items-center justify-center',
              isSplit ? 'sm:items-start' : 'items-center'
            )}
          >
            <div className={mediaWrapperClasses}>
              {mediaNode}
            </div>
          </div>
        )}

        <div
          className={cn(
            'flex flex-1 flex-col gap-4',
            isSplit ? 'items-start text-left' : 'items-center text-center'
          )}
        >
          {eyebrow && (
            <p className={cn('text-xs font-semibold uppercase tracking-wide', toneEyebrow[tone])}>
              {eyebrow}
            </p>
          )}
          <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
          {description && (
            <div className={cn('text-base leading-relaxed', toneDescriptions[tone])}>{description}</div>
          )}
          {children && (
            <div className={cn('space-y-2 text-sm', toneDescriptions[tone])}>{children}</div>
          )}
          {(primaryAction || secondaryAction) && (
            <div
              className={cn(
                'flex w-full flex-wrap items-center gap-3',
                isSplit ? 'justify-start' : 'justify-center'
              )}
            >
              {primaryAction}
              {secondaryAction}
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

EmptyState.displayName = 'EmptyState';

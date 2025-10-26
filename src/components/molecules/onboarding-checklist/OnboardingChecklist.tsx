import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';

export type ChecklistAccent = 'purple' | 'blue' | 'teal' | 'amber';

export interface OnboardingChecklistItem {
  /**
   * Stable identifier for the task
   */
  id: string;
  /**
   * Task title
   */
  title: string;
  /**
   * Supporting description for extra guidance
   */
  description?: ReactNode;
  /**
   * Optional badge label (e.g., "5 min") displayed next to the title
   */
  badge?: string;
  /**
   * Whether the task is complete
   */
  completed?: boolean;
  /**
   * Slot for item-level actions (button, link, etc.)
   */
  action?: ReactNode;
}

export interface OnboardingChecklistProps extends HTMLAttributes<HTMLElement> {
  /**
   * Heading for the checklist panel
   */
  heading?: string;
  /**
   * Supporting copy under the heading
   */
  subheading?: ReactNode;
  /**
   * Collection of checklist tasks
   */
  items: OnboardingChecklistItem[];
  /**
   * Accent palette for progress and icons
   * @defaultValue 'purple'
   */
  accent?: ChecklistAccent;
  /**
   * Optional footer slot (CTA button, helper text, etc.)
   */
  footer?: ReactNode;
  /**
   * Tightens padding for compact placements
   * @defaultValue false
   */
  dense?: boolean;
}

const accentThemes: Record<
  ChecklistAccent,
  { pill: string; progress: string; iconFilled: string; badge: string }
> = {
  purple: {
    pill: 'bg-brand-20 text-brand-80',
    progress: 'bg-brand-60',
    iconFilled: 'bg-brand-60 text-text-on-color border-brand-60',
    badge: 'bg-brand-10 text-brand-80',
  },
  blue: {
    pill: 'bg-info-light text-info',
    progress: 'bg-info',
    iconFilled: 'bg-info text-text-on-color border-info',
    badge: 'bg-info-light text-info',
  },
  teal: {
    pill: 'bg-success-light text-success',
    progress: 'bg-success',
    iconFilled: 'bg-success text-text-on-color border-success',
    badge: 'bg-success-light text-success',
  },
  amber: {
    pill: 'bg-warning-light text-warning',
    progress: 'bg-warning',
    iconFilled: 'bg-warning text-text-on-color border-warning',
    badge: 'bg-warning-light text-warning',
  },
};

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
    <path
      d="M5 10.5l3 3 7-7"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const OnboardingChecklist = forwardRef<HTMLElement, OnboardingChecklistProps>(
  (
    {
      heading = 'Finish setting things up',
      subheading,
      items,
      accent = 'purple',
      footer,
      dense = false,
      className,
      ...rest
    },
    ref
  ) => {
    const accentTheme = accentThemes[accent];
    const totalItems = items.length;
    const completedItems = items.filter((item) => item.completed).length;
    const progressPercent = totalItems ? Math.round((completedItems / totalItems) * 100) : 0;
    const instanceId = useId();
    const headingId = `${instanceId}-heading`;
    const progressLabelId = `${instanceId}-progress`;
    const progressSummary = totalItems ? `${completedItems} / ${totalItems} complete` : 'No tasks yet';

    return (
      <section
        ref={ref}
        aria-labelledby={headingId}
        className={cn(
          'flex flex-col rounded-3xl border border-border-subtle bg-surface/90 shadow-lg ring-1 ring-black/5',
          dense ? 'gap-5 p-6' : 'gap-6 p-8',
          className
        )}
        {...rest}
      >
        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[180px]">
              <p id={headingId} className="text-sm font-semibold text-text">
                {heading}
              </p>
              {subheading && <p className="text-sm text-text-muted">{subheading}</p>}
            </div>
            <span
              className={cn(
                'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
                accentTheme.pill
              )}
            >
              {progressSummary}
            </span>
          </div>
          <div className="space-y-2">
            <div
              className="relative h-2 w-full rounded-full bg-border-subtle/60"
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-describedby={progressLabelId}
            >
              <div
                className={cn('h-full rounded-full transition-all duration-300 ease-out', accentTheme.progress)}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p id={progressLabelId} className="text-xs font-medium uppercase tracking-wide text-text-muted">
              {progressPercent}% complete
            </p>
          </div>
        </header>

        {totalItems > 0 ? (
          <ol className="space-y-4">
            {items.map((item, index) => (
              <li
                key={item.id}
                className="flex gap-4 rounded-2xl border border-border-subtle/80 bg-surface/90 p-4 shadow-sm"
              >
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold transition-colors',
                    item.completed
                      ? accentTheme.iconFilled
                      : 'border-border-subtle text-text-muted'
                  )}
                  aria-hidden="true"
                >
                  {item.completed ? <CheckIcon /> : index + 1}
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-base font-medium text-text">{item.title}</span>
                    {item.badge && (
                      <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', accentTheme.badge)}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.description && <p className="text-sm text-text-muted">{item.description}</p>}
                  {item.action && <div className="pt-1 text-sm text-text">{item.action}</div>}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div className="rounded-2xl border border-dashed border-border-subtle bg-surface-muted/80 p-6 text-center text-sm text-text-muted">
            Add checklist items to guide customers through onboarding moments.
          </div>
        )}

        {footer && <div className="pt-2">{footer}</div>}
      </section>
    );
  }
);

OnboardingChecklist.displayName = 'OnboardingChecklist';

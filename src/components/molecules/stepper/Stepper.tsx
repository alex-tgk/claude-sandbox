import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

export type StepStatus = 'complete' | 'current' | 'upcoming';
export type StepperOrientation = 'horizontal' | 'vertical';

export interface Step {
  label: string;
  description?: string;
  status?: StepStatus;
}

export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
  steps: Step[];
  currentStep?: number;
  orientation?: StepperOrientation;
}

const statusClasses: Record<StepStatus, string> = {
  complete: 'bg-interactive text-text-on-color border border-interactive',
  current: 'border-2 border-interactive text-interactive bg-surface',
  upcoming: 'border border-border-subtle text-text-muted bg-transparent',
};

const orientationClasses: Record<StepperOrientation, string> = {
  horizontal: 'flex-row gap-6',
  vertical: 'flex-col gap-4',
};

export const Stepper = forwardRef<HTMLOListElement, StepperProps>(
  ({ className, steps, currentStep, orientation = 'horizontal', ...props }, ref) => (
    <ol
      ref={ref}
      className={cn('flex', orientationClasses[orientation], className)}
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
      {...props}
    >
      {steps.map((step, index) => {
        const status: StepStatus =
          step.status ??
          (typeof currentStep === 'number'
            ? index < currentStep
              ? 'complete'
              : index === currentStep
              ? 'current'
              : 'upcoming'
            : 'upcoming');

        return (
          <li key={step.label} className="flex items-start gap-3">
            <span
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold',
                statusClasses[status]
              )}
              aria-label={`${step.label} status ${status}`}
            >
              {index + 1}
            </span>
            <div>
              <p className="font-medium text-text">{step.label}</p>
              {step.description ? (
                <p className="text-sm text-text-muted">{step.description}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  )
);

Stepper.displayName = 'Stepper';

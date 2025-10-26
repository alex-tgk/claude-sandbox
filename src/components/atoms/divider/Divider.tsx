import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerInset = 'none' | 'start' | 'end';
export type DividerLength = 'full' | 'content';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  inset?: DividerInset;
  length?: DividerLength;
}

const orientationClasses: Record<DividerOrientation, string> = {
  horizontal: 'h-px w-full',
  vertical: 'w-px h-full min-h-12',
};

const insetClasses: Record<DividerInset, string> = {
  none: '',
  start: 'ml-6',
  end: 'mr-6',
};

const verticalInsetClasses: Record<DividerInset, string> = {
  none: '',
  start: 'mt-6',
  end: 'mb-6',
};

const lengthClasses: Record<DividerOrientation, Record<DividerLength, string>> = {
  horizontal: {
    full: 'w-full',
    content: 'w-32',
  },
  vertical: {
    full: 'h-full',
    content: 'h-24',
  },
};

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    { orientation = 'horizontal', inset = 'none', length = 'full', className, role = 'separator', ...props },
    ref
  ) => {
    const appliedInset =
      orientation === 'horizontal' ? insetClasses[inset] : verticalInsetClasses[inset];

    return (
      <div
        ref={ref}
        role={role}
        aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
        className={cn(
          'bg-border-subtle',
          orientationClasses[orientation],
          lengthClasses[orientation][length],
          appliedInset,
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

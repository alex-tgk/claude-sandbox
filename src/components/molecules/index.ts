/**
 * Molecules - Simple component combinations
 *
 * @remarks
 * Molecules are groups of atoms bonded together to form relatively simple,
 * functional units. They serve a single purpose and work together as a unit.
 * Examples: form fields with labels, search bars, notification banners
 *
 * @since 0.2.0
 */

// Feedback
export { Alert, type AlertProps, type AlertVariant } from './alert/Alert';
export { Tooltip, type TooltipProps } from './tooltip/Tooltip';
export {
  NotificationToast,
  type NotificationToastProps,
  type NotificationToastVariant,
} from './notification-toast/NotificationToast';

// Form Components
export { Select, type SelectProps, type SelectOption } from './select/Select';
export {
  SearchInput,
  type SearchInputProps,
} from './search-input/SearchInput';
export {
  SegmentedControl,
  type SegmentedControlProps,
  type SegmentedControlOption,
  type SegmentedControlSize,
} from './segmented-control/SegmentedControl';

// Empty data experiences
export {
  EmptyState,
  type EmptyStateProps,
  type EmptyStateTone,
  type EmptyStateLayout,
} from './empty-state/EmptyState';

// Activation flows
export {
  OnboardingChecklist,
  type OnboardingChecklistProps,
  type OnboardingChecklistItem,
  type ChecklistAccent,
} from './onboarding-checklist/OnboardingChecklist';

// Opportunity intelligence
export {
  OpportunityRadar,
  type OpportunityRadarProps,
  type OpportunityRadarItem,
  type OpportunityImpact,
  type OpportunityTrend,
} from './opportunity-radar/OpportunityRadar';

// Data displays
export { StatCard, type StatCardProps, type StatTrend } from './stat-card/StatCard';
export {
  Stepper,
  type StepperProps,
  type StepperOrientation,
  type Step,
  type StepStatus,
} from './stepper/Stepper';

/**
 * Modular UI System - Component Exports
 * Organized using Atomic Design Principles
 *
 * @remarks
 * - Atoms: Basic building blocks (buttons, inputs, etc.)
 * - Molecules: Simple combinations (alerts, tooltips, etc.)
 * - Organisms: Complex sections (cards, dialogs, tabs)
 * - Templates: Page-level layouts
 *
 * @since 0.1.0
 * @version 0.2.0 - Reorganized with atomic design
 */

// ===== ATOMS =====
// Form Controls
export { Button } from './atoms/button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './atoms/button/Button';

export { Input } from './atoms/input/Input';
export type { InputProps, InputVariant, InputSize } from './atoms/input/Input';

export { Checkbox } from './atoms/checkbox';
export type { CheckboxProps, CheckboxVariant, CheckboxSize } from './atoms/checkbox';

export { Radio, RadioGroup } from './atoms/radio';
export type { RadioProps, RadioGroupProps, RadioSize, RadioOrientation } from './atoms/radio';

export { Switch } from './atoms/switch/Switch';
export type { SwitchProps, SwitchVariant, SwitchSize, SwitchLabelPosition } from './atoms/switch/Switch';

export { IconButton } from './atoms/icon-button/IconButton';
export type {
  IconButtonProps,
  IconButtonVariant,
  IconButtonSize,
} from './atoms/icon-button/IconButton';

// Display
export { Badge } from './atoms/badge/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize, BadgeShape } from './atoms/badge/Badge';

export { Spinner } from './atoms/spinner/Spinner';
export type {
  SpinnerProps,
  SpinnerVariant,
  SpinnerColor,
  SpinnerSize,
  SpinnerSpeed,
} from './atoms/spinner/Spinner';

export { Tag } from './atoms/tag/Tag';
export type { TagProps, TagVariant, TagSize } from './atoms/tag/Tag';

export { Avatar } from './atoms/avatar/Avatar';
export type { AvatarProps, AvatarSize, AvatarStatus } from './atoms/avatar/Avatar';

export { Divider } from './atoms/divider/Divider';
export type {
  DividerProps,
  DividerOrientation,
  DividerInset,
  DividerLength,
} from './atoms/divider/Divider';

export { ProgressBar } from './atoms/progress-bar/ProgressBar';
export type { ProgressBarProps, ProgressBarTone } from './atoms/progress-bar/ProgressBar';

// ===== MOLECULES =====
// Feedback
export { Alert } from './molecules/alert/Alert';
export type { AlertProps, AlertVariant } from './molecules/alert/Alert';

export { Tooltip } from './molecules/tooltip/Tooltip';
export type { TooltipProps } from './molecules/tooltip/Tooltip';

export { NotificationToast } from './molecules/notification-toast/NotificationToast';
export type {
  NotificationToastProps,
  NotificationToastVariant,
} from './molecules/notification-toast/NotificationToast';

// Form Components
export { Select } from './molecules/select/Select';
export type {
  SelectProps,
  SelectSize,
  SelectVariant,
  SelectOption,
} from './molecules/select/Select';

export { SearchInput } from './molecules/search-input/SearchInput';
export type { SearchInputProps } from './molecules/search-input/SearchInput';

export { SegmentedControl } from './molecules/segmented-control/SegmentedControl';
export type {
  SegmentedControlProps,
  SegmentedControlOption,
  SegmentedControlSize,
} from './molecules/segmented-control/SegmentedControl';

// Empty data experiences
export { EmptyState } from './molecules/empty-state/EmptyState';
export type {
  EmptyStateProps,
  EmptyStateTone,
  EmptyStateLayout,
} from './molecules/empty-state/EmptyState';

// Onboarding
export { OnboardingChecklist } from './molecules/onboarding-checklist/OnboardingChecklist';
export type {
  OnboardingChecklistProps,
  OnboardingChecklistItem,
  ChecklistAccent,
} from './molecules/onboarding-checklist/OnboardingChecklist';

// Opportunity intelligence
export { OpportunityRadar } from './molecules/opportunity-radar/OpportunityRadar';
export type {
  OpportunityRadarProps,
  OpportunityRadarItem,
  OpportunityImpact,
  OpportunityTrend,
} from './molecules/opportunity-radar/OpportunityRadar';

export { StatCard } from './molecules/stat-card/StatCard';
export type { StatCardProps, StatTrend } from './molecules/stat-card/StatCard';

export { Stepper } from './molecules/stepper/Stepper';
export type {
  StepperProps,
  StepperOrientation,
  Step,
  StepStatus,
} from './molecules/stepper/Stepper';

// ===== ORGANISMS =====
// Layout
export { Card, CardHeader, CardBody, CardFooter } from './organisms/card/Card';
export type {
  CardProps,
  CardVariant,
  CardSize,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from './organisms/card/Card';

// Overlays
export { Dialog } from './organisms/dialog/Dialog';
export type { DialogProps, DialogSize } from './organisms/dialog/Dialog';

// Navigation
export { Tabs, TabList, Tab, TabPanel } from './organisms/tabs/Tabs';
export type {
  TabsProps,
  TabListProps,
  TabProps,
  TabPanelProps,
  TabsVariant,
  TabsOrientation,
} from './organisms/tabs/Tabs';

// Data Display
export { DataTable } from './organisms/data-table/DataTable';
export type {
  DataTableProps,
  DataTableColumn,
  SortDirection,
} from './organisms/data-table/DataTable';

// Command Palette
export { CommandPalette } from './organisms/command-palette/CommandPalette';
export type {
  CommandPaletteProps,
  CommandItem,
} from './organisms/command-palette/CommandPalette';

// ===== TEMPLATES =====
export { DashboardLayout } from './templates/DashboardLayout';
export type { DashboardLayoutProps } from './templates/DashboardLayout';

export { AuthLayout } from './templates/AuthLayout';
export type { AuthLayoutProps } from './templates/AuthLayout';

export { ContentLayout } from './templates/ContentLayout';
export type { ContentLayoutProps } from './templates/ContentLayout';

export { SplitLayout } from './templates/SplitLayout';
export type { SplitLayoutProps } from './templates/SplitLayout';

// ===== ATOMIC LAYER EXPORTS =====
// Re-export all atoms, molecules, organisms, templates for convenience
export * from './atoms';
export * from './molecules';
export * from './organisms';
export * from './templates';

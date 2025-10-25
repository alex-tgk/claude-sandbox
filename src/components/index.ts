/**
 * Component exports for the modular UI system
 *
 * @remarks
 * All components are exported from this central location for easy importing.
 * Each component includes types, variants, and sizes where applicable.
 *
 * @since 0.1.0
 */

// Button
export { Button } from './button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './button/Button';

// Input
export { Input } from './input/Input';
export type { InputProps, InputVariant, InputSize } from './input/Input';

// Dialog
export { Dialog } from './dialog/Dialog';
export type { DialogProps, DialogSize } from './dialog/Dialog';

// Card
export { Card, CardHeader, CardBody, CardFooter } from './card/Card';
export type {
  CardProps,
  CardVariant,
  CardSize,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from './card/Card';

// Badge
export { Badge } from './badge/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize, BadgeShape } from './badge/Badge';

// Alert
export { Alert } from './alert/Alert';
export type { AlertProps, AlertVariant } from './alert/Alert';

// Tooltip
export { Tooltip } from './tooltip/Tooltip';
export type { TooltipProps } from './tooltip/Tooltip';

// Radio
export { Radio, RadioGroup } from './radio';
export type { RadioProps, RadioGroupProps, RadioSize, RadioOrientation } from './radio';

// Tabs
export { Tabs, TabList, Tab, TabPanel } from './tabs/Tabs';
export type {
  TabsProps,
  TabListProps,
  TabProps,
  TabPanelProps,
  TabsVariant,
  TabsOrientation,
} from './tabs/Tabs';

// Checkbox
export { Checkbox } from './checkbox';
export type { CheckboxProps, CheckboxVariant, CheckboxSize } from './checkbox';

// Select
export { Select } from './select/Select';
export type {
  SelectProps,
  SelectSize,
  SelectVariant,
  SelectOption,
} from './select/Select';

// Spinner
export { Spinner } from './spinner/Spinner';
export type {
  SpinnerProps,
  SpinnerVariant,
  SpinnerColor,
  SpinnerSize,
  SpinnerSpeed,
} from './spinner/Spinner';

// Switch
export { Switch } from "./switch/Switch";
export type { SwitchProps, SwitchVariant, SwitchSize, SwitchLabelPosition } from "./switch/Switch";

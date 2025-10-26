/**
 * Atoms - Basic building blocks
 *
 * @remarks
 * Atoms are the foundational building blocks of the design system.
 * They cannot be broken down further without losing their meaning.
 * Examples: buttons, inputs, labels, icons
 *
 * @since 0.2.0
 */

// Form Controls
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './button/Button';
export { Input, type InputProps, type InputVariant, type InputSize } from './input/Input';
export { Checkbox, type CheckboxProps, type CheckboxVariant, type CheckboxSize } from './checkbox/Checkbox';
export { Radio, RadioGroup, type RadioProps, type RadioGroupProps } from './radio/Radio';
export { Switch, type SwitchProps, type SwitchSize } from './switch/Switch';
export {
  IconButton,
  type IconButtonProps,
  type IconButtonVariant,
  type IconButtonSize,
} from './icon-button/IconButton';

// Display
export { Badge, type BadgeProps, type BadgeVariant, type BadgeSize } from './badge/Badge';
export { Spinner, type SpinnerProps, type SpinnerVariant, type SpinnerSize } from './spinner/Spinner';
export { Tag, type TagProps, type TagVariant, type TagSize } from './tag/Tag';
export {
  Avatar,
  type AvatarProps,
  type AvatarSize,
  type AvatarStatus,
} from './avatar/Avatar';
export {
  ProgressBar,
  type ProgressBarProps,
  type ProgressBarTone,
} from './progress-bar/ProgressBar';
export {
  Divider,
  type DividerProps,
  type DividerOrientation,
  type DividerInset,
  type DividerLength,
} from './divider/Divider';

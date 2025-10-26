# Switch Component

A fully accessible toggle switch component for binary on/off states.

## Features

- ✅ **Controlled/Uncontrolled Support**: Works in both controlled and uncontrolled modes
- ✅ **Three Sizes**: `sm`, `md`, `lg`
- ✅ **Three Variants**: `primary`, `secondary`, `success`
- ✅ **Label Positioning**: Display label on left or right
- ✅ **Smooth Animations**: Animated thumb transition on toggle
- ✅ **Keyboard Support**: Space key to toggle
- ✅ **ARIA Compliant**: Proper `role="switch"` and `aria-checked` attributes
- ✅ **Form Integration**: Supports `name` and `value` attributes
- ✅ **Disabled State**: Visual and functional disabled state
- ✅ **SSR-friendly**: Works with server-side rendering
- ✅ **TypeScript**: Full type safety with TypeScript

## Installation

```bash
npm install @modular-ui/system
```

## Basic Usage

### Uncontrolled Mode

```tsx
import { Switch } from '@modular-ui/system';

function Example() {
  return <Switch label="Enable notifications" />;
}
```

### Controlled Mode

```tsx
import { Switch } from '@modular-ui/system';
import { useState } from 'react';

function Example() {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      label="Enable notifications"
    />
  );
}
```

## Examples

### Sizes

```tsx
<Switch label="Small switch" size="sm" />
<Switch label="Medium switch" size="md" />
<Switch label="Large switch" size="lg" />
```

### Variants

```tsx
<Switch label="Primary" variant="primary" defaultChecked />
<Switch label="Secondary" variant="secondary" defaultChecked />
<Switch label="Success" variant="success" defaultChecked />
```

### Label Position

```tsx
<Switch label="Label on right (default)" labelPosition="right" />
<Switch label="Label on left" labelPosition="left" />
```

### Disabled State

```tsx
<Switch label="Disabled unchecked" disabled />
<Switch label="Disabled checked" disabled defaultChecked />
```

### Required Field

```tsx
<Switch label="Accept terms and conditions" isRequired />
```

### Form Integration

```tsx
function SettingsForm() {
  const [settings, setSettings] = useState({
    notifications: false,
    darkMode: true,
  });

  return (
    <form>
      <Switch
        name="notifications"
        label="Email notifications"
        checked={settings.notifications}
        onChange={(checked) => 
          setSettings({ ...settings, notifications: checked })
        }
      />
      <Switch
        name="darkMode"
        label="Dark mode"
        checked={settings.darkMode}
        onChange={(checked) => 
          setSettings({ ...settings, darkMode: checked })
        }
      />
    </form>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'success'` | `'primary'` | Visual variant of the switch |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the switch |
| `label` | `string` | - | Label text for the switch |
| `labelPosition` | `'left' \| 'right'` | `'right'` | Position of the label relative to switch |
| `checked` | `boolean` | - | Controlled checked state |
| `defaultChecked` | `boolean` | `false` | Default checked state (uncontrolled) |
| `onChange` | `(checked: boolean) => void` | - | Callback when checked state changes |
| `disabled` | `boolean` | `false` | Whether the switch is disabled |
| `isRequired` | `boolean` | `false` | Whether the switch is required |
| `name` | `string` | - | Name attribute for form submission |
| `value` | `string` | - | Value attribute for form submission |
| `className` | `string` | - | Additional CSS class name |
| `id` | `string` | - | ID for the switch element |
| `aria-label` | `string` | - | ARIA label for the switch |
| `aria-labelledby` | `string` | - | ARIA labelled by reference |
| `aria-describedby` | `string` | - | ARIA described by reference |

## Accessibility

The Switch component follows WCAG 2.2 AA guidelines:

- Uses `role="switch"` with `aria-checked` attribute
- Keyboard navigable (Space key to toggle)
- Proper label association via `aria-labelledby`
- Supports `aria-label` for switches without visible labels
- Visible focus indicators
- Disabled state properly communicated to screen readers
- Required fields indicated with asterisk and `aria-required`

### Keyboard Support

| Key | Action |
|-----|--------|
| `Space` | Toggle the switch on/off |

## Testing

The component includes comprehensive test coverage:

```bash
npm test -- src/components/switch/Switch.test.tsx
```

Test coverage includes:
- Rendering in all variants and sizes
- Controlled and uncontrolled modes
- Keyboard interactions
- Mouse/touch interactions
- Disabled state behavior
- Accessibility attributes
- Form integration

## Storybook

View the component in Storybook:

```bash
npm run storybook
```

Navigate to Components → Switch to see all variants and examples.

## Design Tokens

The Switch component uses the following design tokens from the theme:

- `colors.brand.*` - Primary variant colors
- `colors.surface.*` - Secondary variant and unchecked state
- `colors.success` - Success variant
- `colors.text.*` - Label text colors
- `colors.error` - Required indicator and error states
- `transition.interactive` - Smooth animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

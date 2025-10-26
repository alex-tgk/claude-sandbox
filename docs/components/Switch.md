---
title: Switch
category: atoms
description: * This component provides an accessible toggle switch with:
since: 0.1.0
---

# Switch

* This component provides an accessible toggle switch with:

## Installation

```tsx
import { Switch } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `SwitchVariant` | `md` | No | /* Visual variant of the switch |
| `size` | `SwitchSize` | - | No | /* Size of the switch |
| `label` | `string` | `right` | No | /* Label text for the switch |
| `labelPosition` | `SwitchLabelPosition` | - | No | /* Position of the label relative to the switch |
| `checked` | `boolean` | `false` | No | /* Whether the switch is checked (controlled) |
| `defaultChecked` | `boolean` | - | No | /* Default checked state (uncontrolled) |
| `onChange` | `(checked: boolean) => void` | `false` | No | /* Callback when the checked state changes |
| `disabled` | `boolean` | `false` | No | /* Whether the switch is disabled |
| `isRequired` | `boolean` | - | No | /* Whether the switch is required |
| `name` | `string` | - | No | /* Name attribute for form submission |
| `value` | `string` | - | No | /* Value attribute for form submission |
| `className` | `string` | - | No | /* Additional CSS class name |
| `id` | `string` | - | No | /* ID for the switch element |



## Variants

Available variants: `primary`, `secondary`, `success`



## Sizes

Available sizes: `sm`, `md`, `lg`


## Examples


### Default

/**

```tsx
args: {
    label: 'Enable notifications',
```


### Without Label

/**

```tsx
args: {
    'aria-label': 'Toggle feature',
```


### Default Checked

/**

```tsx
args: {
    label: 'Enable notifications',
    defaultChecked: true,
```


### Controlled

/**

```tsx
render: function ControlledExample() {
    const [checked, setChecked] = useState(false);
    return (
      <div className="space-y-4">
        <Switch
          label="Enable notifications"
          checked={checked
```


### Sizes

/**

```tsx
render: () => (
    <div className="space-y-4">
      <Switch label="Small switch" size="sm" />
      <Switch label="Medium switch (default)" size="md" />
      <Switch label="Large switch" size="lg" />
    </div>
  ),
```


## Accessibility

### Keyboard Navigation

'Atoms/Switch',

### Screen Reader Support

'Atoms/Switch',

### Wcag Compliance

WCAG 2.2 AA compliant

### Aria Attributes

- `aria-label`
- `aria-labelledby`
- `aria-describedby`
- `aria-checked`
- `aria-required`
- `aria-hidden`

### Focus Management

Includes focus management


This component is WCAG 2.2 AA compliant.

## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/atoms/switch/Switch.tsx`
**Stories:** `src/components/atoms/switch/Switch.stories.tsx`

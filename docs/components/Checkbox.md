---
title: Checkbox
category: atoms
description: * This component provides a styled checkbox with:
since: 0.1.0
---

# Checkbox

* This component provides a styled checkbox with:

## Installation

```tsx
import { Checkbox } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `CheckboxVariant` | `md` | No | /* Visual variant of the checkbox |
| `size` | `CheckboxSize` | - | No | /* Size of the checkbox |
| `label` | `string` | - | No | /* Label text for the checkbox |
| `helperText` | `string` | - | No | /* Helper text displayed below the checkbox |
| `error` | `string` | `false` | No | /* Error message displayed below the checkbox (sets variant to 'error') |
| `indeterminate` | `boolean` | `false` | No | /* Whether the checkbox is in an indeterminate state |
| `isRequired` | `boolean` | - | No | /* Whether the checkbox is required |
| `checked` | `boolean` | - | No | /* Controlled checked state |
| `defaultChecked` | `boolean` | - | No | /* Default checked state for uncontrolled mode |
| `onCheckedChange` | `(checked: boolean) => void` | - | No | /* Callback when checked state changes |



## Variants

Available variants: `primary`, `secondary`, `success`, `error`



## Sizes

Available sizes: `sm`, `md`, `lg`


## Examples


### Default

/**

```tsx
args: {
    label: 'Accept terms and conditions',
```


### Variants

/**

```tsx
render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Primary variant" variant="primary" />
      <Checkbox label="Secondary variant" variant="secondary" />
      <Checkbox label="Success variant" variant="success" />
      <Checkbox label="Error variant" variant="error" />
    </div>
  ),
```


### Sizes

/**

```tsx
render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
  ),
```


### Checked

/**

```tsx
args: {
    label: 'I agree',
    defaultChecked: true,
```


### Disabled

/**

```tsx
render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
      <Checkbox label="Disabled indeterminate" disabled indeterminate />
    </div>
  ),
```


## Accessibility

### Keyboard Navigation

'Atoms/Checkbox',

### Wcag Compliance

WCAG 2.2 AA compliant

### Aria Attributes

- `aria-invalid`
- `aria-describedby`
- `aria-required`
- `aria-hidden`
- `aria-label`

### Focus Management

Includes focus management


This component is WCAG 2.2 AA compliant.

## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/atoms/checkbox/Checkbox.tsx`
**Stories:** `src/components/atoms/checkbox/Checkbox.stories.tsx`

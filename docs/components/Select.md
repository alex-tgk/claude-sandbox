---
title: Select
category: molecules
description: * This component provides a custom dropdown select that:
since: 0.1.0
---

# Select

* This component provides a custom dropdown select that:

## Installation

```tsx
import { Select } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `options` | `SelectOption[]` | - | Yes | /* Array of options to display in the dropdown |
| `value` | `string` | - | No | /* Controlled value (for single select) |
| `defaultValue` | `string` | - | No | /* Default value for uncontrolled mode (for single select) |
| `values` | `string[]` | - | No | /* Controlled values (for multiple select) |
| `defaultValues` | `string[]` | - | No | /* Default values for uncontrolled mode (for multiple select) |
| `onChange` | `(value: string | string[]) => void` | `md` | No | /* Callback when value changes |
| `size` | `SelectSize` | `default` | No | /* Size of the select |
| `variant` | `SelectVariant` | `false` | No | /* Visual variant |
| `disabled` | `boolean` | `false` | No | /* Whether the select is disabled |
| `multiple` | `boolean` | - | No | /* Whether multiple selection is enabled |
| `placeholder` | `string` | - | No | /* Placeholder text when no selection is made |
| `label` | `string` | - | No | /* Label text for the select |
| `helperText` | `string` | - | No | /* Helper text displayed below the select |
| `error` | `string` | `false` | No | /* Error message displayed below the select (sets variant to 'error') |
| `isRequired` | `boolean` | `false` | No | /* Whether the select is required |
| `isFullWidth` | `boolean` | - | No | /* Whether the select should take full width of its container |
| `name` | `string` | - | No | /* Name attribute for form submission |



## Variants

Available variants: `default`, `error`, `success`



## Sizes

Available sizes: `sm`, `md`, `lg`


## Examples


### Default

/**

```tsx
args: {
    options: countryOptions,
    placeholder: 'Select a country',
```


### With Label

/**

```tsx
args: {
    options: countryOptions,
    label: 'Country',
    helperText: 'Select your country of residence',
    placeholder: 'Choose a country',
```


### Controlled

/**

```tsx
render: function ControlledStory(args) {
    const [value, setValue] = useState<string>('');

    return (
      <div className="space-y-4">
        <Select
          {...args
```


### Uncontrolled

/**

```tsx
args: {
    options: countryOptions,
    defaultValue: 'ca',
    label: 'Uncontrolled Select',
    helperText: 'Canada is pre-selected',
```


### Multiple

/**

```tsx
render: function MultipleStory(args) {
    const [values, setValues] = useState<string[]>([]);

    return (
      <div className="space-y-4">
        <Select
          {...args
```


## Accessibility

### Keyboard Navigation

'Molecules/Select',

### Screen Reader Support

'Molecules/Select',

### Aria Attributes

- `aria-label`
- `aria-haspopup`
- `aria-expanded`
- `aria-labelledby`
- `aria-describedby`
- `aria-hidden`
- `aria-multiselectable`
- `aria-selected`
- `aria-disabled`

### Focus Management

Includes focus management



## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/molecules/select/Select.tsx`
**Stories:** `src/components/molecules/select/Select.stories.tsx`

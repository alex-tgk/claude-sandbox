---
title: Input
category: atoms
description: * This component provides a styled text input with:
since: 0.1.0
---

# Input

* This component provides a styled text input with:

## Installation

```tsx
import { Input } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `InputVariant` | `md` | No | /* Visual variant of the input |
| `size` | `InputSize` | - | No | /* Size of the input |
| `label` | `string` | - | No | /* Label text for the input |
| `helperText` | `string` | - | No | /* Helper text displayed below the input |
| `error` | `string` | `false` | No | /* Error message displayed below the input (sets variant to 'error') |
| `isRequired` | `boolean` | `false` | No | /* Whether the input is required |
| `isFullWidth` | `boolean` | - | No | /* Whether the input should take full width of its container |
| `startAdornment` | `React.ReactNode` | - | No | /* Optional icon or element to display at the start of the input |
| `endAdornment` | `React.ReactNode` | - | No | /* Optional icon or element to display at the end of the input |



## Variants

Available variants: `default`, `error`, `success`



## Sizes

Available sizes: `sm`, `md`, `lg`


## Examples


### Default

/**

```tsx
args: {
    label: 'Email',
    placeholder: 'Enter your email',
```


### With Helper Text

/**

```tsx
args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'Username must be at least 3 characters',
```


### With Error

/**

```tsx
args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
```


### Required

/**

```tsx
args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    isRequired: true,
    helperText: 'Password is required',
```


### Disabled

/**

```tsx
args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit this',
    disabled: true,
    value: 'This field is disabled',
```


## Accessibility

### Keyboard Navigation

'Atoms/Input',

### Screen Reader Support

'Atoms/Input',

### Aria Attributes

- `aria-label`
- `aria-invalid`
- `aria-describedby`
- `aria-required`

### Focus Management

Includes focus management



## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/atoms/input/Input.tsx`
**Stories:** `src/components/atoms/input/Input.stories.tsx`

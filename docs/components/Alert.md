---
title: Alert
category: molecules
description: * This component provides a flexible alert system with:
since: 0.1.0
---

# Alert

* This component provides a flexible alert system with:

## Installation

```tsx
import { Alert } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `AlertVariant` | - | No | /* Visual variant |
| `title` | `string` | - | No | /* Alert title |
| `description` | `ReactNode` | `false` | No | /* Alert description/content |
| `dismissible` | `boolean` | - | No | /* Whether the alert can be dismissed |
| `onDismiss` | `() => void` | - | No | /* Callback fired when the alert is dismissed |
| `icon` | `ReactNode` | `true` | No | /* Custom icon to override the default variant icon |
| `showIcon` | `boolean` | - | No | /* Whether to show an icon |
| `action` | `ReactNode` | `Based on variant` | No | /* Action button element (e.g., Button component) |



## Variants

Available variants: `info`, `success`, `warning`, `error`




## Examples


### Default

/**

```tsx
args: {
    children: 'This is an informational alert message.',
```


### Info

/**

```tsx
args: {
    variant: 'info',
    title: 'Did you know?',
    description: 'You can customize your dashboard layout by dragging and dropping widgets.',
```


### Success

/**

```tsx
args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your changes have been saved successfully.',
```


### Warning

/**

```tsx
args: {
    variant: 'warning',
    title: 'Warning',
    description: 'This action cannot be undone. Please review before proceeding.',
```


### Error

/**

```tsx
args: {
    variant: 'error',
    title: 'Error',
    description: 'Failed to save changes. Please try again.',
```


## Accessibility

### Keyboard Navigation

'Molecules/Alert',

### Screen Reader Support

"polite" for info/success, "assertive" for warning/error

### Wcag Compliance

WCAG 2.2 AA compliant

### Aria Attributes

- `aria-live`
- `aria-hidden`
- `aria-label`

### Focus Management

Includes focus management


This component is WCAG 2.2 AA compliant.

## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/molecules/alert/Alert.tsx`
**Stories:** `src/components/molecules/alert/Alert.stories.tsx`

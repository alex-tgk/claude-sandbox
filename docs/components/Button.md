---
title: Button
category: atoms
description: Button component
since: 0.1.0
---

# Button

Button component

## Installation

```tsx
import { Button } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `ButtonVariant` | `md` | No | /* Visual variant of the button |
| `size` | `ButtonSize` | `false` | No | /* Size of the button |
| `isFullWidth` | `boolean` | `false` | No | /* Whether the button should take full width of its container |
| `isLoading` | `boolean` | - | No | /* Whether the button is in a loading state |
| `startIcon` | `React.ReactNode` | - | No | /* Optional icon to display before the button text |
| `endIcon` | `React.ReactNode` | - | No | /* Optional icon to display after the button text |



## Variants

Available variants: `primary`, `secondary`, `outline`, `ghost`, `danger`



## Sizes

Available sizes: `sm`, `md`, `lg`


## Examples


### Default

/**

```tsx
args: {
    children: 'Button',
```


### Variants

/**

```tsx
render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
```


### Sizes

/**

```tsx
render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
```


### Loading

/**

```tsx
args: {
    isLoading: true,
    children: 'Loading...',
```


### Disabled

/**

```tsx
args: {
    disabled: true,
    children: 'Disabled',
```


## Accessibility

### Keyboard Navigation

'Atoms/Button',

### Aria Attributes

- `aria-busy`
- `aria-label`

### Focus Management

Includes focus management



## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/atoms/button/Button.tsx`
**Stories:** `src/components/atoms/button/Button.stories.tsx`

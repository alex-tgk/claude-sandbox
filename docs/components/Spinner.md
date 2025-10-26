---
title: Spinner
category: atoms
description: * This component provides a visual loading indicator with multiple variants:
since: 0.1.0
---

# Spinner

* This component provides a visual loading indicator with multiple variants:

## Installation

```tsx
import { Spinner } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `SpinnerVariant` | `md` | No | /* Visual variant of the spinner |
| `size` | `SpinnerSize` | `primary` | No | /* Size of the spinner |
| `color` | `SpinnerColor` | `normal` | No | /* Color variant matching the theme |
| `speed` | `SpinnerSpeed` | `Loading...` | No | /* Animation speed |
| `label` | `string` | `false` | No | /* Accessible label for screen readers |
| `center` | `boolean` | - | No | /* Whether to center the spinner in its container |



## Variants

Available variants: `circular`, `dots`, `bars`



## Sizes

Available sizes: `xs`, `sm`, `md`, `lg`


## Examples


### Default

/**

```tsx
args: {
```


### Variants

/**

```tsx
render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="circular" />
        <span className="text-sm text-text-secondary">Circular</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="dots" />
        <span className="text-sm text-text-secondary">Dots</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="bars" />
        <span className="text-sm text-text-secondary">Bars</span>
      </div>
    </div>
  ),
```


### Sizes

/**

```tsx
render: () => (
    <div className="flex items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xs" />
        <span className="text-xs text-text-secondary">XS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-xs text-text-secondary">SM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-xs text-text-secondary">MD</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-xs text-text-secondary">LG</span>
      </div>
    </div>
  ),
```


### Colors

/**

```tsx
render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner color="primary" />
        <span className="text-xs text-text-secondary">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="secondary" />
        <span className="text-xs text-text-secondary">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="success" />
        <span className="text-xs text-text-secondary">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="warning" />
        <span className="text-xs text-text-secondary">Warning</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="error" />
        <span className="text-xs text-text-secondary">Error</span>
      </div>
    </div>
  ),
```


### Speeds

/**

```tsx
render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner speed="slow" />
        <span className="text-xs text-text-secondary">Slow</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner speed="normal" />
        <span className="text-xs text-text-secondary">Normal</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner speed="fast" />
        <span className="text-xs text-text-secondary">Fast</span>
      </div>
    </div>
  ),
```


## Accessibility

### Screen Reader Support

'Atoms/Spinner',

### Wcag Compliance

WCAG 2.2 AA compliant

### Aria Attributes

- `aria-hidden`
- `aria-live`
- `aria-busy`


This component is WCAG 2.2 AA compliant.

## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/atoms/spinner/Spinner.tsx`
**Stories:** `src/components/atoms/spinner/Spinner.stories.tsx`

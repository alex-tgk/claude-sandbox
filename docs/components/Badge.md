---
title: Badge
category: atoms
description: * This component provides a flexible badge with:
since: 0.1.0
---

# Badge

* This component provides a flexible badge with:

## Installation

```tsx
import { Badge } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `BadgeVariant` | `md` | No | /* Visual variant of the badge |
| `size` | `BadgeSize` | `rounded` | No | /* Size of the badge |
| `shape` | `BadgeShape` | `false` | No | /* Shape style of the badge |
| `dot` | `boolean` | `false` | No | /* Whether to display as a dot (small colored circle) |
| `removable` | `boolean` | - | No | /* Whether the badge is removable (shows close button) |
| `onRemove` | `() => void` | - | No | /* Callback when the close button is clicked |
| `icon` | `React.ReactNode` | - | No | /* Optional icon to display before the badge text |
| `ariaLabel` | `string` | - | No | /* ARIA label for additional context |



## Variants

Available variants: `primary`, `secondary`, `success`, `warning`, `error`, `info`



## Sizes

Available sizes: `sm`, `md`, `lg`


## Examples


### Default

/**

```tsx
args: {
    children: 'Badge',
```


### Variants

/**

```tsx
render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
```


### Sizes

/**

```tsx
render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
```


### Shapes

/**

```tsx
render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge shape="rounded" variant="primary">
        Rounded
      </Badge>
      <Badge shape="pill" variant="primary">
        Pill
      </Badge>
      <Badge shape="rounded" variant="success">
        Rounded
      </Badge>
      <Badge shape="pill" variant="success">
        Pill
      </Badge>
    </div>
  ),
```


### Dots

/**

```tsx
render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Badge dot variant="success" ariaLabel="Online" />
        <span className="text-sm">Online</span>
      </div>
      <div className="flex items-center gap-3">
        <Badge dot variant="warning" ariaLabel="Away" />
        <span className="text-sm">Away</span>
      </div>
      <div className="flex items-center gap-3">
        <Badge dot variant="error" ariaLabel="Offline" />
        <span className="text-sm">Offline</span>
      </div>
      <div className="flex items-center gap-3">
        <Badge dot variant="info" ariaLabel="Busy" />
        <span className="text-sm">Busy</span>
      </div>
    </div>
  ),
```


## Accessibility

### Keyboard Navigation

'Atoms/Badge',

### Screen Reader Support

'Atoms/Badge',

### Wcag Compliance

WCAG 2.2 AA compliant

### Aria Attributes

- `aria-label`

### Focus Management

Includes focus management


This component is WCAG 2.2 AA compliant.

## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/atoms/badge/Badge.tsx`
**Stories:** `src/components/atoms/badge/Badge.stories.tsx`

---
title: Tag
category: atoms
description: Tag component
since: 0.1.0
---

# Tag

Tag component

## Installation

```tsx
import { Tag } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `TagVariant` | - | No |  |
| `size` | `TagSize` | - | No |  |
| `removable` | `boolean` | - | No |  |
| `onRemove` | `() => void` | - | No |  |



## Variants

Available variants: `neutral`, `success`, `warning`, `danger`, `info`



## Sizes

Available sizes: `sm`, `md`


## Examples


### Variants



```tsx
render: () => (
    <div className="flex flex-wrap gap-3">
      <Tag variant="neutral">Neutral</Tag>
      <Tag variant="success">Success</Tag>
      <Tag variant="warning">Warning</Tag>
      <Tag variant="danger">Danger</Tag>
      <Tag variant="info">Info</Tag>
    </div>
  ),
```


## Accessibility

### Aria Attributes

- `aria-label`

### Focus Management

Includes focus management



## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/atoms/tag/Tag.tsx`
**Stories:** `src/components/atoms/tag/Tag.stories.tsx`

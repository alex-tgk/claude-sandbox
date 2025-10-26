---
title: Avatar
category: atoms
description: Avatar component
since: 0.1.0
---

# Avatar

Avatar component

## Installation

```tsx
import { Avatar } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `name` | `string` | - | No |  |
| `src` | `string` | - | No |  |
| `size` | `AvatarSize` | - | No |  |
| `status` | `AvatarStatus` | - | No |  |





## Sizes

Available sizes: `xs`, `sm`, `md`, `lg`


## Examples


### Sizes



```tsx
render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" name="Small" />
      <Avatar size="sm" name="Medium" />
      <Avatar size="md" name="Large" />
      <Avatar size="lg" name="XL" />
    </div>
  ),
```


## Accessibility

### Aria Attributes

- `aria-label`



## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/atoms/avatar/Avatar.tsx`
**Stories:** `src/components/atoms/avatar/Avatar.stories.tsx`

---
title: Card
category: organisms
description: * This component provides a versatile card container with:
since: 0.1.0
---

# Card

* This component provides a versatile card container with:

## Installation

```tsx
import { Card } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `CardVariant` | `md` | No | /* Visual variant of the card |
| `size` | `CardSize` | `false` | No | /* Padding size |
| `hover` | `boolean` | `false` | No | /* Whether to show hover effects |
| `clickable` | `boolean` | - | No | /* Whether the card is clickable (renders as button with proper ARIA) |
| `onClick` | `() => void` | `false` | No | /* Click handler for clickable cards |
| `disabled` | `boolean` | - | No | /* Whether the card is disabled (only applies to clickable cards) |



## Variants

Available variants: `elevated`, `outlined`, `flat`



## Sizes

Available sizes: `sm`, `md`, `lg`


## Examples


### Default

/**

```tsx
args: {
    children: 'This is a default card with elevated styling',
```


### With Structure

/**

```tsx
render: () => (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm text-text-muted">Subtitle or metadata</p>
      </CardHeader>
      <CardBody>
        <p>
          This is the main content area of the card. It can contain any content
          including text, images, or other components.
        </p>
      </CardBody>
      <CardFooter>
        <button className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700">
          Action
        </button>
      </CardFooter>
    </Card>
  ),
```


### Variants

/**

```tsx
render: () => (
    <div className="flex gap-4">
      <Card variant="elevated">
        <CardHeader>
          <h4 className="font-semibold">Elevated</h4>
        </CardHeader>
        <CardBody>Card with shadow elevation</CardBody>
      </Card>
      <Card variant="outlined">
        <CardHeader>
          <h4 className="font-semibold">Outlined</h4>
        </CardHeader>
        <CardBody>Card with border outline</CardBody>
      </Card>
      <Card variant="flat">
        <CardHeader>
          <h4 className="font-semibold">Flat</h4>
        </CardHeader>
        <CardBody>Card with flat background</CardBody>
      </Card>
    </div>
  ),
```


### Sizes

/**

```tsx
render: () => (
    <div className="flex gap-4">
      <Card size="sm">
        <CardHeader>
          <h4 className="font-semibold">Small</h4>
        </CardHeader>
        <CardBody>Small padding (12px)</CardBody>
      </Card>
      <Card size="md">
        <CardHeader>
          <h4 className="font-semibold">Medium</h4>
        </CardHeader>
        <CardBody>Medium padding (16px)</CardBody>
      </Card>
      <Card size="lg">
        <CardHeader>
          <h4 className="font-semibold">Large</h4>
        </CardHeader>
        <CardBody>Large padding (24px)</CardBody>
      </Card>
    </div>
  ),
```


### With Hover

/**

```tsx
render: () => (
    <div className="flex gap-4">
      <Card variant="elevated" hover>
        <CardHeader>
          <h4 className="font-semibold">Elevated + Hover</h4>
        </CardHeader>
        <CardBody>Lifts up and increases shadow on hover</CardBody>
      </Card>
      <Card variant="outlined" hover>
        <CardHeader>
          <h4 className="font-semibold">Outlined + Hover</h4>
        </CardHeader>
        <CardBody>Border color changes on hover</CardBody>
      </Card>
      <Card variant="flat" hover>
        <CardHeader>
          <h4 className="font-semibold">Flat + Hover</h4>
        </CardHeader>
        <CardBody>Shadow appears on hover</CardBody>
      </Card>
    </div>
  ),
```


## Accessibility

### Keyboard Navigation

'Organisms/Card',

### Screen Reader Support

'Organisms/Card',

### Wcag Compliance

WCAG 2.2 AA compliant

### Aria Attributes

- `aria-disabled`

### Focus Management

Includes focus management


This component is WCAG 2.2 AA compliant.

## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/organisms/card/Card.tsx`
**Stories:** `src/components/organisms/card/Card.stories.tsx`

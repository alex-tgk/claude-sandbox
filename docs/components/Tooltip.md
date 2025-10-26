---
title: Tooltip
category: molecules
description: * This component provides an accessible tooltip with the following features:
since: 0.1.0
---

# Tooltip

* This component provides an accessible tooltip with the following features:

## Installation

```tsx
import { Tooltip } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactElement` | - | Yes | /* The element that triggers the tooltip |
| `content` | `ReactNode` | `top` | Yes | /* Content to display in the tooltip |
| `placement` | `TooltipPlacement` | `200` | No | /* Placement of the tooltip relative to the trigger |
| `showDelay` | `number` | `0` | No | /* Delay before showing tooltip (in milliseconds) |
| `hideDelay` | `number` | `8` | No | /* Delay before hiding tooltip (in milliseconds) |
| `offset` | `number` | `false` | No | /* Distance from trigger element in pixels |
| `disabled` | `boolean` | `320px` | No | /* Whether the tooltip is disabled |
| `maxWidth` | `string` | - | No | /* Maximum width of the tooltip |
| `className` | `string` | - | No | /* Additional CSS class for the tooltip container |
| `arrowClassName` | `string` | - | No | /* Additional CSS class for the arrow |






## Examples


### Default

/**

```tsx
args: {
    content: 'This is a helpful tooltip',
    placement: 'top',
```


### Top

/**

```tsx
args: {
    content: 'Tooltip on top',
    placement: 'top',
```


### Bottom

/**

```tsx
args: {
    content: 'Tooltip on bottom',
    placement: 'bottom',
```


### Left

/**

```tsx
args: {
    content: 'Tooltip on left',
    placement: 'left',
```


### Right

/**

```tsx
args: {
    content: 'Tooltip on right',
    placement: 'right',
```


## Accessibility

### Keyboard Navigation

'Molecules/Tooltip',

### Screen Reader Support

'Molecules/Tooltip',

### Wcag Compliance

WCAG 2.2 AA compliant

### Aria Attributes

- `aria-describedby`
- `aria-hidden`

### Focus Management

Includes focus management


This component is WCAG 2.2 AA compliant.

## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/molecules/tooltip/Tooltip.tsx`
**Stories:** `src/components/molecules/tooltip/Tooltip.stories.tsx`

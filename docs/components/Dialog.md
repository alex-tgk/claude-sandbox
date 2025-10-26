---
title: Dialog
category: organisms
description: * This component implements a fully accessible modal dialog:
since: 0.1.0
---

# Dialog

* This component implements a fully accessible modal dialog:

## Installation

```tsx
import { Dialog } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `isOpen` | `boolean` | - | Yes | /* Whether the dialog is open |
| `onClose` | `() => void` | - | Yes | /* Callback when the dialog should close |
| `title` | `string` | - | Yes | /* Dialog title (required for accessibility) |
| `description` | `string` | `md` | No | /* Optional description for the dialog |
| `size` | `DialogSize` | `true` | No | /* Size of the dialog |
| `closeOnBackdropClick` | `boolean` | `true` | No | /* Whether clicking the backdrop closes the dialog |
| `closeOnEscape` | `boolean` | `true` | No | /* Whether pressing Escape closes the dialog |
| `showCloseButton` | `boolean` | - | No | /* Whether to show the close button |





## Sizes

Available sizes: `sm`, `md`, `lg`, `xl`, `full`


## Examples


### Default

/**

```tsx
render: function DefaultDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)
```


### Confirmation Dialog

/**

```tsx
render: function ConfirmationExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)
```


### Sizes

/**

```tsx
render: function SizesExample() {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full' | null>(null);

    return (
      <>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => setSize('sm')
```


### Form Dialog

/**

```tsx
render: function FormExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)
```


### No Close Button

/**

```tsx
render: function NoCloseButtonExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)
```


## Accessibility

### Aria Attributes

- `aria-hidden`
- `aria-modal`
- `aria-labelledby`
- `aria-describedby`
- `aria-label`

### Focus Management

Includes focus management



## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/organisms/dialog/Dialog.tsx`
**Stories:** `src/components/organisms/dialog/Dialog.stories.tsx`

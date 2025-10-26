---
title: Radio
category: atoms
description: * This component must be used within a RadioGroup. It provides:
since: 0.1.0
---

# Radio

* This component must be used within a RadioGroup. It provides:

## Installation

```tsx
import { Radio } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `value` | `string` | - | Yes | /* The value of this radio button |
| `label` | `ReactNode` | - | Yes | /* Label text for the radio button |
| `description` | `ReactNode` | - | No | /* Additional description text |
| `disabled` | `boolean` | - | No | /* Whether the radio button is disabled (overrides group disabled state) |
| `className` | `string` | - | No | /* Custom className for the wrapper |





## Sizes

Available sizes: `sm`, `md`, `lg`


## Examples


### Default

/**

```tsx
args: {
    name: 'default',
    label: 'Choose an option',
    children: (
      <>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </>
    ),
```


### With Default Value

/**

```tsx
args: {
    name: 'withDefault',
    label: 'Choose your favorite color',
    defaultValue: 'blue',
    children: (
      <>
        <Radio value="red" label="Red" />
        <Radio value="blue" label="Blue" />
        <Radio value="green" label="Green" />
      </>
    ),
```


### Controlled

/**

```tsx
render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState('option2');

      return (
        <div className="space-y-4">
          <RadioGroup
            name="controlled"
            label="Controlled radio group"
            value={value
```


### With Descriptions

/**

```tsx
args: {
    name: 'withDescriptions',
    label: 'Select a plan',
    children: (
      <>
        <Radio
          value="free"
          label="Free Plan"
          description="Perfect for trying out our service"
        />
        <Radio
          value="basic"
          label="Basic Plan"
          description="$10/month - For individuals and small projects"
        />
        <Radio
          value="pro"
          label="Pro Plan"
          description="$25/month - For teams and advanced features"
        />
        <Radio
          value="enterprise"
          label="Enterprise Plan"
          description="Custom pricing - For large organizations"
        />
      </>
    ),
```


### Size Small

/**

```tsx
args: {
    name: 'sizeSmall',
    size: 'sm',
    label: 'Small radio buttons',
    children: (
      <>
        <Radio value="option1" label="Small option 1" />
        <Radio value="option2" label="Small option 2" />
        <Radio value="option3" label="Small option 3" />
      </>
    ),
```


## Accessibility

### Keyboard Navigation

'Atoms/Radio',

### Screen Reader Support

'Atoms/Radio',

### Aria Attributes

- `aria-checked`
- `aria-describedby`
- `aria-labelledby`
- `aria-required`
- `aria-invalid`

### Focus Management

Includes focus management



## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/atoms/radio/Radio.tsx`
**Stories:** `src/components/atoms/radio/Radio.stories.tsx`

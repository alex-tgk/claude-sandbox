# Card Component

A flexible container component for grouping related content with multiple visual styles and interactive capabilities.

## Features

- **Multiple Variants**: Elevated (shadow), Outlined (border), Flat (subtle background)
- **Flexible Padding**: Three size options (sm, md, lg)
- **Hover Effects**: Optional visual feedback on hover
- **Clickable Cards**: Full button semantics with keyboard support
- **Structured Content**: Header, Body, and Footer subcomponents
- **Accessibility**: WCAG 2.2 AA compliant with proper ARIA attributes
- **TypeScript**: Full type safety with comprehensive interfaces

## Installation

The Card component is part of the modular UI system. Import it from the main components module:

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@modular-ui/system';
```

## Basic Usage

### Simple Card

```tsx
<Card>
  This is a simple card with default styling
</Card>
```

### Structured Card

```tsx
<Card>
  <CardHeader>
    <h3>Card Title</h3>
  </CardHeader>
  <CardBody>
    Main content goes here
  </CardBody>
  <CardFooter>
    <button>Action</button>
  </CardFooter>
</Card>
```

## Variants

### Elevated (Default)

Card with shadow elevation:

```tsx
<Card variant="elevated">
  Elevated card with shadow
</Card>
```

### Outlined

Card with border:

```tsx
<Card variant="outlined">
  Card with border outline
</Card>
```

### Flat

Card with subtle background:

```tsx
<Card variant="flat">
  Flat card with muted background
</Card>
```

## Sizes

Control padding with the `size` prop:

```tsx
<Card size="sm">Small padding (12px)</Card>
<Card size="md">Medium padding (16px)</Card>
<Card size="lg">Large padding (24px)</Card>
```

## Hover Effects

Enable hover animations and visual feedback:

```tsx
<Card hover variant="elevated">
  Lifts up and increases shadow on hover
</Card>

<Card hover variant="outlined">
  Border color changes on hover
</Card>
```

## Clickable Cards

Make cards interactive with full button semantics:

```tsx
<Card clickable hover onClick={() => console.log('Clicked!')}>
  <CardBody>Click anywhere on this card</CardBody>
</Card>
```

### Keyboard Support

Clickable cards support:
- **Tab**: Focus navigation
- **Enter**: Activate
- **Space**: Activate

### Disabled State

```tsx
<Card clickable disabled onClick={() => {}}>
  <CardBody>This card is disabled</CardBody>
</Card>
```

## Real-World Examples

### Product Card

```tsx
<Card variant="outlined" hover className="max-w-sm">
  <CardHeader>
    <img src="/product.jpg" alt="Product" className="rounded-md" />
    <h3 className="text-lg font-semibold mt-2">Premium Headphones</h3>
    <p className="text-sm text-text-muted">High-quality audio</p>
  </CardHeader>
  <CardBody>
    <p className="text-2xl font-bold text-brand-600">$299.99</p>
  </CardBody>
  <CardFooter>
    <button className="w-full btn-primary">Add to Cart</button>
  </CardFooter>
</Card>
```

### Profile Card

```tsx
<Card variant="elevated" className="max-w-sm">
  <CardHeader>
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 bg-brand-600 rounded-full" />
      <div>
        <h3 className="text-lg font-semibold">John Doe</h3>
        <p className="text-sm text-text-muted">Software Engineer</p>
      </div>
    </div>
  </CardHeader>
  <CardBody>
    <p className="text-sm">
      Passionate about building great user experiences.
    </p>
  </CardBody>
  <CardFooter className="flex gap-2">
    <button className="flex-1 btn-primary">Follow</button>
    <button className="flex-1 btn-secondary">Message</button>
  </CardFooter>
</Card>
```

### Statistics Card

```tsx
<Card variant="flat" size="sm">
  <CardBody>
    <p className="text-sm text-text-muted">Total Users</p>
    <p className="text-3xl font-bold mt-1">1,234</p>
    <p className="text-sm text-success mt-1">↑ 12% this month</p>
  </CardBody>
</Card>
```

### Notification Card

```tsx
<Card variant="outlined" size="sm">
  <CardBody className="flex items-start gap-3">
    <div className="w-2 h-2 bg-brand-600 rounded-full mt-2" />
    <div>
      <p className="font-semibold">New message</p>
      <p className="text-sm text-text-muted mt-1">
        Sarah sent you a message
      </p>
      <p className="text-xs text-text-muted mt-2">2 minutes ago</p>
    </div>
  </CardBody>
</Card>
```

## Props

### Card Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'elevated' \| 'outlined' \| 'flat'` | `'elevated'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Padding size |
| `hover` | `boolean` | `false` | Enable hover effects |
| `clickable` | `boolean` | `false` | Make card clickable with button semantics |
| `onClick` | `() => void` | - | Click handler (only for clickable cards) |
| `disabled` | `boolean` | `false` | Disabled state (only for clickable cards) |
| `className` | `string` | - | Additional CSS classes |
| `role` | `string` | `'button'` (if clickable) | ARIA role |
| `tabIndex` | `number` | `0` (if clickable) | Tab index for keyboard navigation |

### CardHeader, CardBody, CardFooter Props

All subcomponents accept standard HTML div attributes:

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes |
| `children` | `ReactNode` | Content to display |

## Accessibility

The Card component follows WCAG 2.2 AA guidelines:

### Non-Clickable Cards
- Uses semantic HTML `div` elements
- Supports all standard ARIA attributes
- Content is screen reader accessible

### Clickable Cards
- Automatically applies `role="button"` (customizable)
- Includes `tabIndex={0}` for keyboard navigation
- Supports Enter and Space key activation
- Has visible focus indicators
- Shows `aria-disabled` when disabled
- Proper disabled state prevents interaction

### Best Practices

1. **Use semantic HTML**: Include proper heading levels in CardHeader
2. **Provide context**: Use descriptive text for clickable cards
3. **Visual feedback**: Enable hover effects for interactive cards
4. **Keyboard support**: Always make clickable cards keyboard accessible
5. **Color contrast**: Ensure text meets WCAG contrast ratios
6. **Alternative text**: Include alt text for images in cards

## Styling

The Card component uses Tailwind CSS with the design system tokens:

- **Colors**: `bg-surface`, `border-border`, `text-text`
- **Shadows**: `shadow-md`, `hover:shadow-lg`
- **Transitions**: `transition-interactive`
- **Focus rings**: `focus-visible:ring-2 focus-visible:ring-brand-500`

### Custom Styling

You can extend styling with the `className` prop:

```tsx
<Card className="max-w-md shadow-xl border-brand-600">
  Custom styled card
</Card>
```

## Testing

The Card component includes comprehensive test coverage:

- Rendering with all variants and sizes
- Hover effects application
- Clickable behavior (mouse and keyboard)
- Disabled state
- ARIA attributes
- Ref forwarding
- Subcomponent composition

Run tests:

```bash
npm test -- src/components/card/Card.test.tsx
```

## TypeScript

Full TypeScript support with exported types:

```tsx
import type {
  CardProps,
  CardVariant,
  CardSize,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps
} from '@modular-ui/system';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Related Components

- **Dialog**: For modal content presentation
- **Tooltip**: For contextual information
- **Badge**: For status indicators within cards

## Contributing

When contributing to the Card component:

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Ensure accessibility compliance
5. Add Storybook stories for visual testing

## License

Part of the Modular UI System - MIT License

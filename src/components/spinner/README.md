# Spinner Component

A flexible, accessible loading indicator component with multiple variants and customization options.

## Features

- **Three visual variants**: circular (spinning circle), dots (bouncing dots), bars (pulsing bars)
- **Four sizes**: xs, sm, md, lg
- **Color variants**: primary, secondary, success, warning, error, inherit
- **Speed control**: slow, normal, fast
- **Accessibility**: Full ARIA support with customizable labels
- **Positioning**: Optional center positioning within container
- **WCAG 2.2 AA compliant**
- **SSR-friendly**
- **TypeScript support with full type definitions**

## Installation

```tsx
import { Spinner } from '@modular-ui/system';
```

## Basic Usage

```tsx
// Default spinner
<Spinner />

// With custom props
<Spinner variant="dots" size="lg" color="primary" />

// Centered in container
<div className="relative h-64">
  <Spinner center />
</div>
```

## Variants

### Circular (Default)

A classic spinning circle loader, best for general loading states.

```tsx
<Spinner variant="circular" />
```

### Dots

Playful bouncing dots, good for content loading.

```tsx
<Spinner variant="dots" />
```

### Bars

Clean pulsing bars, ideal for progress indication.

```tsx
<Spinner variant="bars" />
```

## Sizes

Available sizes: `xs`, `sm`, `md` (default), `lg`

```tsx
<Spinner size="xs" />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

## Colors

Color variants that match your theme:

```tsx
<Spinner color="primary" />    // Brand color (default)
<Spinner color="secondary" />  // Secondary text color
<Spinner color="success" />    // Success state
<Spinner color="warning" />    // Warning state
<Spinner color="error" />      // Error state
<Spinner color="inherit" />    // Inherits from parent
```

## Animation Speed

Control the animation speed:

```tsx
<Spinner speed="slow" />    // 1.5s animation
<Spinner speed="normal" />  // 1s animation (default)
<Spinner speed="fast" />    // 0.6s animation
```

## Common Use Cases

### Loading Button

```tsx
<button className="btn" disabled>
  <Spinner size="sm" color="inherit" />
  Loading...
</button>
```

### Inline with Text

```tsx
<div className="flex items-center gap-2">
  <Spinner size="sm" />
  <span>Loading data...</span>
</div>
```

### Card Loading State

```tsx
<div className="card">
  <div className="flex items-center justify-between">
    <h3>User Profile</h3>
    <Spinner size="sm" />
  </div>
  {/* Loading skeleton */}
</div>
```

### Full Page Loading

```tsx
<div className="relative h-screen">
  <Spinner center size="lg" />
</div>
```

### Overlay Loading

```tsx
<div className="relative">
  <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-3">
      <Spinner size="lg" />
      <p>Processing your request...</p>
    </div>
  </div>
</div>
```

## Accessibility

The Spinner component is fully accessible:

- **role="status"**: Announces loading state to screen readers
- **aria-live="polite"**: Non-intrusive updates for assistive technologies
- **aria-busy="true"**: Indicates the component is in a loading state
- **Customizable labels**: Provide context with the `label` prop
- **Visual elements hidden**: Animation elements are hidden from screen readers with `aria-hidden`
- **Screen reader only label**: Label is visually hidden but announced

### Custom Accessibility Label

```tsx
<Spinner label="Fetching user data..." />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'circular' \| 'dots' \| 'bars'` | `'circular'` | Visual style of the spinner |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Size of the spinner |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'inherit'` | `'primary'` | Color variant |
| `speed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Animation speed |
| `label` | `string` | `'Loading...'` | Accessible label for screen readers |
| `center` | `boolean` | `false` | Center spinner in container (uses absolute positioning) |
| `className` | `string` | - | Additional CSS classes |

Plus all standard `HTMLAttributes<HTMLDivElement>` props.

## TypeScript

The component is fully typed with TypeScript:

```tsx
import type {
  SpinnerProps,
  SpinnerVariant,
  SpinnerSize,
  SpinnerColor,
  SpinnerSpeed,
} from '@modular-ui/system';

const MyComponent: React.FC = () => {
  const variant: SpinnerVariant = 'dots';
  const size: SpinnerSize = 'lg';

  return <Spinner variant={variant} size={size} />;
};
```

## Styling

The Spinner component uses Tailwind CSS classes and can be customized with the `className` prop:

```tsx
<Spinner className="opacity-75" />
```

### Custom Colors

Use the `color="inherit"` variant to inherit color from parent:

```tsx
<div className="text-purple-600">
  <Spinner color="inherit" />
</div>
```

## Best Practices

1. **Always provide meaningful labels** for screen reader users
2. **Use appropriate sizes** - smaller spinners for inline content, larger for page loading
3. **Choose the right variant** - circular for general use, dots/bars for specific contexts
4. **Consider speed** - faster for quick operations, slower for longer processes
5. **Center when appropriate** - use the `center` prop for full-page or card loading states
6. **Match colors to context** - use error color for failed states, success for completion

## Examples

See the [Storybook documentation](../../stories/Spinner.stories.tsx) for interactive examples and more use cases.

## Testing

The component includes comprehensive test coverage. Run tests with:

```bash
npm test -- src/components/spinner/Spinner.test.tsx
```

## Related Components

- **Button**: Can integrate Spinner for loading states
- **Card**: Often used with Spinner for loading content
- **Dialog**: May use Spinner for async operations

## Browser Support

The Spinner component works in all modern browsers that support:
- CSS animations
- Flexbox
- CSS custom properties (for Tailwind CSS)

## License

Part of the @modular-ui/system component library.

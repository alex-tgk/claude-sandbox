# Alert Component

An accessible, feature-rich alert component for displaying important messages to users.

## Features

- **4 Variants**: `info`, `success`, `warning`, `error`
- **Title & Description**: Support for hierarchical content
- **Dismissible**: Optional close button with smooth animations
- **Icons**: Auto-selected based on variant or fully customizable
- **Action Buttons**: Add custom actions to alerts
- **Accessibility**: ARIA attributes, keyboard navigation, screen reader support
- **Animations**: Smooth enter/exit transitions
- **TypeScript**: Full type safety and IntelliSense support

## Installation

```tsx
import { Alert } from '@modular-ui/system';
```

## Basic Usage

```tsx
<Alert variant="info" title="Information">
  This is an informational message.
</Alert>
```

## Variants

### Info (Default)
Use for general information and tips.

```tsx
<Alert variant="info" title="Did you know?" description="You can customize your dashboard." />
```

### Success
Use for positive feedback and confirmations.

```tsx
<Alert variant="success" title="Success!" description="Your changes have been saved." />
```

### Warning
Use for important cautionary messages.

```tsx
<Alert variant="warning" title="Warning" description="This action cannot be undone." />
```

### Error
Use for errors and critical issues.

```tsx
<Alert variant="error" title="Error" description="Failed to save changes." />
```

## Dismissible Alerts

Add a close button that triggers the `onDismiss` callback:

```tsx
<Alert
  variant="info"
  title="New Feature"
  description="Check out our new dashboard!"
  dismissible
  onDismiss={() => console.log('Dismissed')}
/>
```

## Action Buttons

Include custom action buttons:

```tsx
<Alert
  variant="warning"
  title="Update Available"
  description="A new version is ready to install."
  action={
    <Button size="sm" variant="outline" onClick={handleUpdate}>
      Update Now
    </Button>
  }
/>
```

## Custom Icons

Override the default icon or hide it entirely:

```tsx
// Custom icon
<Alert
  variant="info"
  title="Custom Icon"
  icon={<IconRocket className="h-5 w-5" />}
>
  Using a custom icon!
</Alert>

// No icon
<Alert
  variant="success"
  title="Clean Look"
  showIcon={false}
>
  No icon for a minimalist design.
</Alert>
```

## Content Flexibility

The Alert component supports multiple content patterns:

```tsx
// Title only
<Alert variant="success" title="Changes saved" />

// Description only
<Alert variant="info" description="This is a simple message." />

// Children (via description prop or children)
<Alert variant="warning">Warning message</Alert>

// Title + Description
<Alert
  variant="error"
  title="Error"
  description="Something went wrong."
/>
```

## API Reference

### AlertProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Visual variant of the alert |
| `title` | `string` | - | Alert title |
| `description` | `ReactNode` | - | Alert description or content |
| `dismissible` | `boolean` | `false` | Whether the alert can be dismissed |
| `onDismiss` | `() => void` | - | Callback fired when dismissed |
| `icon` | `ReactNode` | - | Custom icon to override default |
| `showIcon` | `boolean` | `true` | Whether to show an icon |
| `action` | `ReactNode` | - | Action button element |
| `aria-live` | `'polite' \| 'assertive'` | Based on variant | Screen reader urgency level |
| `className` | `string` | - | Additional CSS classes |

Plus all standard `HTMLDivElement` attributes.

## Accessibility

### ARIA Attributes

- **role="alert"**: Announces the alert to screen readers
- **aria-live**: Controls announcement urgency
  - `polite` (default for info/success): Announces when user is idle
  - `assertive` (default for warning/error): Announces immediately
- **aria-label**: Dismiss button is properly labeled
- **aria-hidden**: Icons are hidden from screen readers

### Keyboard Navigation

- **Tab**: Focus the dismiss button
- **Enter/Space**: Dismiss the alert when button is focused
- **Escape**: (Optional) You can implement this in your app

### Screen Readers

The Alert component provides excellent screen reader support:

1. Alerts are announced automatically based on `aria-live` value
2. Icons are hidden to avoid confusion
3. Dismiss button has clear labeling
4. All interactive elements are keyboard accessible

### WCAG 2.2 AA Compliance

- ✓ Sufficient color contrast ratios
- ✓ Keyboard accessible
- ✓ Focus indicators on interactive elements
- ✓ Proper semantic HTML structure
- ✓ Screen reader compatible

## Advanced Examples

### Complex Alert with All Features

```tsx
<Alert
  variant="warning"
  title="Payment Method Expiring"
  description="Your card ending in 4242 expires this month."
  dismissible
  onDismiss={handleDismiss}
  action={
    <Button size="sm" onClick={handleUpdateCard}>
      Update Card
    </Button>
  }
/>
```

### Multiple Alerts

```tsx
<div className="space-y-4">
  <Alert variant="error" title="Error" description="Failed to load data." />
  <Alert variant="warning" title="Warning" description="Session expiring." />
  <Alert variant="success" title="Success" description="Profile updated." />
</div>
```

### Controlled Visibility

```tsx
const [visible, setVisible] = useState(true);

return (
  <>
    {visible && (
      <Alert
        variant="info"
        title="Cookie Notice"
        description="We use cookies to improve your experience."
        dismissible
        onDismiss={() => setVisible(false)}
      />
    )}
  </>
);
```

## Styling

The Alert component uses Tailwind CSS and can be customized via the `className` prop:

```tsx
<Alert
  variant="info"
  title="Custom Styling"
  className="shadow-lg border-2"
/>
```

### Variant Colors

Each variant uses specific color palettes:

- **Info**: Blue (`bg-blue-50`, `border-blue-200`, `text-blue-800`)
- **Success**: Green (`bg-green-50`, `border-green-200`, `text-green-800`)
- **Warning**: Yellow (`bg-yellow-50`, `border-yellow-200`, `text-yellow-800`)
- **Error**: Red (`bg-red-50`, `border-red-200`, `text-red-800`)

## Animation

Dismiss animations are built-in and use the following:

- **Duration**: 150ms
- **Easing**: ease-in-out
- **Effect**: Fade out + scale down + slight upward movement

## Best Practices

1. **Choose the Right Variant**: Use variants that match the message importance
2. **Keep It Concise**: Alerts should be brief and actionable
3. **Use Dismissible Wisely**: Allow users to dismiss non-critical alerts
4. **Provide Actions**: Include action buttons for alerts that require user response
5. **Don't Overuse**: Too many alerts can overwhelm users
6. **Position Strategically**: Place alerts where users will notice them
7. **Test with Screen Readers**: Ensure alerts are announced properly

## Examples

See the [Storybook documentation](../../stories/Alert.stories.tsx) for interactive examples.

## TypeScript Support

The component is fully typed with TypeScript:

```tsx
import type { AlertProps, AlertVariant } from '@modular-ui/system';

const variant: AlertVariant = 'success';
const props: AlertProps = {
  variant,
  title: 'Success',
  dismissible: true,
};
```

## Testing

The Alert component includes comprehensive tests covering:

- All variants
- Dismissible functionality
- Icon rendering
- Action buttons
- Accessibility features
- Animations
- Edge cases

Run tests with:

```bash
npm test src/components/alert/Alert.test.tsx
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

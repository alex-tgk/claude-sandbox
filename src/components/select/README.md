# Select Component

A fully accessible dropdown select component with single and multiple selection support.

## Features

- **Controlled & Uncontrolled**: Works in both controlled and uncontrolled modes
- **Single & Multiple Selection**: Support for both single value and multi-select
- **Three Sizes**: Small (sm), Medium (md), Large (lg)
- **Visual States**: Default, error, and success variants
- **Placeholder Support**: Custom placeholder text
- **Disabled State**: Both component-level and option-level disable
- **Keyboard Navigation**: Full keyboard support (Arrow keys, Enter, Escape, Space, Home, End)
- **ARIA Compliant**: WCAG 2.2 AA compliant with proper ARIA attributes
- **Form Integration**: Hidden inputs for form submission
- **TypeScript**: Fully typed with comprehensive type definitions
- **SSR-Friendly**: No direct DOM access, safe for server-side rendering

## Installation

The Select component is part of the modular UI system. Import it from the components library:

```tsx
import { Select } from '@/components';
import type { SelectOption } from '@/components';
```

## Basic Usage

### Single Select

```tsx
const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

<Select
  options={options}
  placeholder="Select an option"
  label="Choose One"
/>
```

### Controlled Mode

```tsx
const [value, setValue] = useState('');

<Select
  options={options}
  value={value}
  onChange={(val) => setValue(val as string)}
  label="Controlled Select"
/>
```

### Multiple Selection

```tsx
const [values, setValues] = useState<string[]>([]);

<Select
  options={options}
  multiple
  values={values}
  onChange={(val) => setValues(val as string[])}
  label="Select Multiple"
  placeholder="Choose multiple options"
/>
```

## API Reference

### SelectProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | required | Array of options to display |
| `value` | `string` | - | Controlled value (single select) |
| `defaultValue` | `string` | - | Default value (uncontrolled, single select) |
| `values` | `string[]` | - | Controlled values (multiple select) |
| `defaultValues` | `string[]` | - | Default values (uncontrolled, multiple select) |
| `onChange` | `(value: string \| string[]) => void` | - | Callback when value changes |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the select |
| `variant` | `'default' \| 'error' \| 'success'` | `'default'` | Visual variant |
| `disabled` | `boolean` | `false` | Whether the select is disabled |
| `multiple` | `boolean` | `false` | Enable multiple selection |
| `placeholder` | `string` | `'Select...'` | Placeholder text |
| `label` | `string` | - | Label text |
| `helperText` | `string` | - | Helper text below the select |
| `error` | `string` | - | Error message (sets variant to 'error') |
| `isRequired` | `boolean` | `false` | Required field indicator |
| `isFullWidth` | `boolean` | `false` | Full width mode |
| `name` | `string` | - | Name for form submission |
| `id` | `string` | auto-generated | ID for the select |
| `className` | `string` | - | Additional CSS classes |

### SelectOption

```tsx
interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}
```

## Examples

### With Error State

```tsx
<Select
  options={options}
  label="Required Field"
  error="This field is required"
  isRequired
  placeholder="Select an option"
/>
```

### With Success State

```tsx
<Select
  options={options}
  label="Country"
  variant="success"
  value="us"
  helperText="Valid selection"
/>
```

### Disabled Options

```tsx
const options = [
  { label: 'Available', value: '1' },
  { label: 'Unavailable', value: '2', disabled: true },
];

<Select
  options={options}
  label="Availability"
/>
```

### Different Sizes

```tsx
<Select options={options} size="sm" label="Small" />
<Select options={options} size="md" label="Medium" />
<Select options={options} size="lg" label="Large" />
```

### Form Integration

```tsx
<form onSubmit={handleSubmit}>
  <Select
    options={countryOptions}
    name="country"
    label="Country"
    isRequired
  />
  <button type="submit">Submit</button>
</form>
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Open dropdown or select focused option |
| `Escape` | Close dropdown |
| `ArrowDown` | Move focus to next option (or open if closed) |
| `ArrowUp` | Move focus to previous option (or open if closed) |
| `Home` | Move focus to first option (when open) |
| `End` | Move focus to last option (when open) |

## Accessibility

The Select component follows WCAG 2.2 AA guidelines:

- **ARIA Attributes**: Proper use of `aria-haspopup`, `aria-expanded`, `aria-selected`, `aria-disabled`
- **Keyboard Support**: Full keyboard navigation
- **Focus Management**: Proper focus handling when opening/closing
- **Screen Reader**: Announces states and selections correctly
- **Label Association**: Automatic label and helper text association
- **Error Indication**: Visual and textual error feedback

## Styling

The component uses Tailwind CSS and follows the design system tokens:

- Border colors: `border-border`, `border-error`, `border-success`
- Background colors: `bg-surface`, `bg-surface-muted`, `bg-brand-50`
- Text colors: `text-text`, `text-text-muted`, `text-error`
- Focus rings: `focus:ring-brand-500`, `focus:ring-error`

### Custom Styling

You can add custom classes via the `className` prop:

```tsx
<Select
  options={options}
  className="shadow-lg"
/>
```

## Best Practices

1. **Always provide a label** for better accessibility
2. **Use meaningful option labels** that clearly describe the choice
3. **Set placeholder text** that indicates the expected input
4. **Handle errors gracefully** with clear error messages
5. **Use controlled mode** for form validation scenarios
6. **Disable unavailable options** rather than hiding them
7. **Test keyboard navigation** to ensure accessibility

## Common Patterns

### Country Selector

```tsx
const countries = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
];

<Select
  options={countries}
  label="Country"
  placeholder="Select your country"
  isRequired
/>
```

### Multi-Select Tags

```tsx
const tags = [
  { label: 'React', value: 'react' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'Tailwind', value: 'tailwind' },
];

<Select
  options={tags}
  multiple
  label="Technologies"
  placeholder="Select technologies"
  helperText="You can select multiple options"
/>
```

### With Form Validation

```tsx
const [country, setCountry] = useState('');
const [error, setError] = useState('');

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!country) {
    setError('Please select a country');
    return;
  }
  // Submit form
};

<Select
  options={countries}
  value={country}
  onChange={(val) => {
    setCountry(val as string);
    setError('');
  }}
  label="Country"
  error={error}
  isRequired
/>
```

## Related Components

- **Input**: For text input fields
- **Radio**: For mutually exclusive selections
- **Checkbox**: For multiple selections with visibility

## Testing

The component includes comprehensive tests covering:

- Rendering with different props
- Single and multiple selection
- Keyboard navigation
- Accessibility attributes
- Form integration
- Disabled states
- Error handling

Run tests with:

```bash
npm test Select.test.tsx
```

## Changelog

### Version 0.1.0
- Initial release with single and multiple select support
- Full keyboard navigation
- WCAG 2.2 AA compliance
- Controlled and uncontrolled modes
- Three sizes and multiple variants

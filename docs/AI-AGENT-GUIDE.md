# AI Agent Development Guide

## 🤖 Purpose

This guide is designed specifically for AI agents (like Claude Code, GPT-4, etc.) to understand how to work with and extend this modular UI system. It provides clear patterns, conventions, and workflows optimized for code generation.

## 🎯 Core Principles

### 1. Predictability Over Cleverness
- Use consistent patterns across all components
- Avoid magic or implicit behavior
- Every component follows the same structure
- Type signatures are explicit and complete

### 2. Composability Over Monoliths
- Small, focused components
- Combine primitives to build complex UIs
- Props are minimal and well-defined
- No hidden dependencies

### 3. Safety Over Speed
- TypeScript strict mode enforced
- All public APIs are fully typed
- Runtime validation where appropriate
- Comprehensive error messages

### 4. Accessibility By Default
- WCAG 2.2 AA compliance required
- ARIA attributes on all interactive elements
- Keyboard navigation always supported
- Focus management implemented

## 📋 Component Generation Workflow

### Step 1: Use the Generator

```bash
npm run generate:component ComponentName
```

This creates the scaffold with all required files.

### Step 2: Implement the Component

Follow this checklist:

```tsx
// 1. Import required dependencies
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { useId } from '../../hooks/use-id';

// 2. Define variant types (if applicable)
export type ComponentVariant = 'primary' | 'secondary';

// 3. Define size types (if applicable)
export type ComponentSize = 'sm' | 'md' | 'lg';

// 4. Define props interface with JSDoc
/**
 * Props for the Component
 *
 * @remarks
 * Detailed description here.
 *
 * @since 0.1.0
 */
export interface ComponentProps extends HTMLAttributes<HTMLElement> {
  /**
   * Prop description
   * @defaultValue 'primary'
   */
  variant?: ComponentVariant;
}

// 5. Implement component with forwardRef
export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ variant = 'primary', className, ...props }, ref) => {
    // Implementation
  }
);

// 6. Set displayName
Component.displayName = 'Component';
```

### Step 3: Write Tests

Required test coverage:

```tsx
describe('ComponentName', () => {
  describe('rendering', () => {
    it('renders with children', () => {});
    it('renders with custom className', () => {});
    it('renders with different variants', () => {});
    it('renders with different sizes', () => {});
  });

  describe('interactions', () => {
    it('calls onClick when clicked', () => {});
    it('handles keyboard events', () => {});
    it('does not interact when disabled', () => {});
  });

  describe('accessibility', () => {
    it('has correct ARIA role', () => {});
    it('has ARIA labels/descriptions', () => {});
    it('supports keyboard navigation', () => {});
    it('supports ref forwarding', () => {});
  });
});
```

### Step 4: Create Stories

Required stories:

```tsx
const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  tags: ['autodocs'],
  argTypes: {
    // Define controls
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default story
export const Default: Story = { args: {} };

// 2. All variants
export const Variants: Story = { render: () => {} };

// 3. All sizes
export const Sizes: Story = { render: () => {} };

// 4. Interactive states
export const States: Story = { render: () => {} };

// 5. Real-world example
export const Example: Story = { render: () => {} };
```

### Step 5: Export from Index

Update `src/components/index.ts`:

```tsx
export { ComponentName } from './component-name/ComponentName';
export type {
  ComponentNameProps,
  ComponentNameVariant,
  ComponentNameSize
} from './component-name/ComponentName';
```

## 🎨 Styling Patterns

### Using CSS Variables

```tsx
// ✅ Correct: Use design tokens
className="bg-brand-500 text-text border-border"

// ❌ Wrong: Hardcoded colors
className="bg-blue-500 text-gray-900 border-gray-300"
```

### Using the cn() Utility

```tsx
// ✅ Correct: Compose classes with cn()
const classes = cn(
  'base-class',
  variant === 'primary' && 'variant-class',
  isDisabled && 'disabled-class',
  className
);

// ❌ Wrong: String concatenation
const classes = `base-class ${variant === 'primary' ? 'variant-class' : ''} ${className}`;
```

### Variant Pattern

```tsx
// ✅ Correct: Use lookup object
const getVariantClasses = (variant: Variant): string => {
  const variants: Record<Variant, string> = {
    primary: 'bg-brand-500 text-white',
    secondary: 'bg-surface text-text',
  };
  return variants[variant];
};

// ❌ Wrong: if/else chains
if (variant === 'primary') return 'bg-brand-500';
else if (variant === 'secondary') return 'bg-surface';
```

## ♿ Accessibility Patterns

### Labels and IDs

```tsx
// ✅ Correct: Use useId hook
import { useId } from '../../hooks/use-id';

function Input({ label }) {
  const id = useId('input');
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </>
  );
}

// ❌ Wrong: Hardcoded IDs
<label htmlFor="email">Email</label>
<input id="email" />
```

### ARIA Attributes

```tsx
// ✅ Correct: Proper ARIA
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  aria-disabled={isDisabled}
>
  <CloseIcon />
</button>

// ❌ Wrong: Missing ARIA
<button disabled={isDisabled}>
  <CloseIcon />
</button>
```

### Keyboard Navigation

```tsx
// ✅ Correct: Handle all keys
const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault();
      onClick();
      break;
    case 'Escape':
      onClose();
      break;
  }
};

// ❌ Wrong: Only mouse events
<div onClick={onClick}>Click me</div>
```

## 🔧 Hook Patterns

### useControlledState

```tsx
// ✅ Correct: Support both controlled and uncontrolled
function Input({ value, defaultValue, onChange }) {
  const [internalValue, setValue] = useControlledState({
    value,
    defaultValue,
    onChange,
  });

  return (
    <input
      value={internalValue}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### useFocusTrap

```tsx
// ✅ Correct: Trap focus in modals
function Dialog({ isOpen, onClose }) {
  const dialogRef = useFocusTrap<HTMLDivElement>(isOpen);

  if (!isOpen) return null;

  return (
    <div ref={dialogRef} role="dialog">
      {/* Content */}
    </div>
  );
}
```

## 📝 JSDoc Patterns

### Component Documentation

```tsx
/**
 * ComponentName - One-line description.
 *
 * @remarks
 * Detailed description of the component's purpose and behavior.
 * Explain key concepts and usage patterns.
 *
 * Features:
 * - Feature 1
 * - Feature 2
 * - WCAG 2.2 AA compliant
 * - SSR-friendly
 *
 * @example
 * Basic usage:
 * ```tsx
 * <ComponentName variant="primary">
 *   Content
 * </ComponentName>
 * ```
 *
 * @example
 * With all options:
 * ```tsx
 * <ComponentName
 *   variant="primary"
 *   size="lg"
 *   isDisabled
 *   onClick={handleClick}
 * >
 *   Content
 * </ComponentName>
 * ```
 *
 * @since 0.1.0
 */
```

### Prop Documentation

```tsx
export interface ComponentProps {
  /**
   * Visual variant of the component
   *
   * @remarks
   * Choose variant based on hierarchy:
   * - primary: Main call-to-action
   * - secondary: Supporting actions
   * - outline: Tertiary actions
   *
   * @defaultValue 'primary'
   */
  variant?: ComponentVariant;
}
```

## 🧪 Testing Patterns

### Render Testing

```tsx
it('renders with children', () => {
  render(<Component>Test</Component>);
  expect(screen.getByText('Test')).toBeInTheDocument();
});
```

### Interaction Testing

```tsx
it('calls onClick when clicked', async () => {
  const handleClick = vi.fn();
  const user = userEvent.setup();

  render(<Component onClick={handleClick}>Click</Component>);

  await user.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Accessibility Testing

```tsx
it('has correct ARIA attributes', () => {
  render(<Component />);
  const element = screen.getByRole('button');

  expect(element).toHaveAttribute('aria-label', 'Expected label');
  expect(element).toHaveAttribute('aria-pressed', 'false');
});
```

## 🚨 Common Pitfalls

### 1. Forgetting to Forward Refs

```tsx
// ❌ Wrong: No ref forwarding
export const Component = ({ className }) => {
  return <div className={className} />;
};

// ✅ Correct: With ref forwarding
export const Component = forwardRef<HTMLDivElement, Props>(
  ({ className }, ref) => {
    return <div ref={ref} className={className} />;
  }
);
```

### 2. Missing displayName

```tsx
// ❌ Wrong: No display name
export const Component = forwardRef(/*...*/);

// ✅ Correct: With display name
export const Component = forwardRef(/*...*/);
Component.displayName = 'Component';
```

### 3. Incomplete Type Exports

```tsx
// ❌ Wrong: Component only
export { Component } from './Component';

// ✅ Correct: Component and types
export { Component } from './Component';
export type { ComponentProps, ComponentVariant } from './Component';
```

### 4. Hardcoded Colors

```tsx
// ❌ Wrong: Hardcoded colors
className="bg-blue-500 text-white"

// ✅ Correct: CSS variables
className="bg-brand-500 text-text-inverse"
```

## 📚 Quick Reference

### File Structure
```
src/components/component-name/
├── ComponentName.tsx       # Main component
├── ComponentName.test.tsx  # Tests
├── ComponentName.stories.tsx # Storybook
└── index.ts                # Exports
```

### Import Order
```tsx
// 1. React imports
import { forwardRef, useState } from 'react';

// 2. Third-party imports
import { clsx } from 'clsx';

// 3. Internal utilities
import { cn } from '../../utils/cn';

// 4. Internal hooks
import { useId } from '../../hooks/use-id';

// 5. Types
import type { ComponentProps } from './types';
```

### Component Template
```tsx
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface ComponentProps extends HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary';
}

export const Component = forwardRef<HTMLElement, ComponentProps>(
  ({ variant = 'primary', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('base-classes', className)}
        {...props}
      />
    );
  }
);

Component.displayName = 'Component';
```

## 🎓 Learning from Examples

Study these components as reference:
1. **Button**: Simple styled component with variants
2. **Input**: Form element with labels and validation
3. **Dialog**: Complex component with hooks and portals

## ✅ Pre-Commit Checklist

Before generating a component:
- [ ] Run component generator script
- [ ] Implement component with JSDoc
- [ ] Add all required tests
- [ ] Create Storybook stories
- [ ] Export from index files
- [ ] Run `npm run typecheck`
- [ ] Run `npm run lint`
- [ ] Run `npm run test`
- [ ] Run `npm run storybook` to verify

## 🤝 Questions?

If something is unclear:
1. Check existing components for patterns
2. Review this guide
3. Check the main README.md
4. Look at test files for usage examples

---

Remember: Consistency and predictability are more important than cleverness. Follow the patterns, and the system will work reliably for AI-driven development.

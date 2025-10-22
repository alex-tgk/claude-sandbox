# Contributing Guide

Thank you for your interest in contributing to the Modular UI System! This guide will help you get started.

## 🎯 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/modular-ui-system.git
   cd modular-ui-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/my-new-component
   ```

## 📋 Development Workflow

### Creating a New Component

1. **Generate the scaffold:**
   ```bash
   npm run generate:component MyComponent
   ```

2. **Implement the component:**
   - Follow existing patterns (see Button, Input, Dialog)
   - Add comprehensive JSDoc comments
   - Ensure WCAG 2.2 AA compliance
   - Support keyboard navigation

3. **Write tests:**
   ```bash
   npm run test:watch
   ```
   - Aim for 80%+ coverage
   - Test rendering, interactions, and accessibility

4. **Create stories:**
   ```bash
   npm run storybook
   ```
   - Add at least 5 stories (Default, Variants, Sizes, States, Example)
   - Test with the a11y addon

5. **Export the component:**
   - Update `src/components/index.ts`
   - Export component and all types

### Running Quality Checks

Before committing, ensure all checks pass:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Formatting
npm run format:check

# Tests
npm run test:coverage

# Or run all at once
npm run precommit
```

## 📝 Coding Standards

### TypeScript

- **Strict mode enabled**: All code must pass TypeScript strict checks
- **Explicit types**: Avoid `any`, use explicit types
- **JSDoc required**: Document all public APIs

Example:
```tsx
/**
 * Description of the function
 *
 * @param param - Description
 * @returns Description
 *
 * @example
 * ```tsx
 * myFunction('value');
 * ```
 */
export function myFunction(param: string): void {
  // Implementation
}
```

### React

- **Functional components only**: No class components
- **Hooks for logic**: Use custom hooks to isolate logic
- **Ref forwarding**: Use `forwardRef` for all components
- **Props destructuring**: Destructure props with defaults

Example:
```tsx
export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ variant = 'primary', className, ...props }, ref) => {
    return <div ref={ref} className={cn('base', className)} {...props} />;
  }
);

MyComponent.displayName = 'MyComponent';
```

### Styling

- **CSS variables only**: Use design tokens from `tokens.css`
- **Tailwind utilities**: Prefer Tailwind over custom CSS
- **No hardcoded colors**: Always use theme variables
- **Responsive**: Consider mobile-first approach

Example:
```tsx
// ✅ Good
className="bg-brand-500 text-text border-border"

// ❌ Bad
className="bg-blue-500 text-gray-900 border-gray-300"
```

### Accessibility

- **ARIA attributes**: Add proper roles, labels, states
- **Keyboard support**: Handle Tab, Enter, Escape, Arrow keys
- **Focus management**: Ensure logical focus order
- **Color contrast**: Maintain 4.5:1 ratio for text

Example:
```tsx
<button
  type="button"
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  <CloseIcon aria-hidden="true" />
</button>
```

## 🧪 Testing

### Required Test Coverage

Every component must have tests for:

1. **Rendering**
   - Renders with children
   - Renders with props
   - Renders variants and sizes
   - Applies custom className

2. **Interactions**
   - Click/keyboard events
   - State changes
   - Disabled state

3. **Accessibility**
   - ARIA attributes
   - Keyboard navigation
   - Ref forwarding

### Test Example

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('MyComponent', () => {
  it('renders with children', () => {
    render(<MyComponent>Test</MyComponent>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<MyComponent onClick={handleClick}>Click</MyComponent>);

    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 📚 Documentation

### Component Documentation

Every component needs:

1. **JSDoc on component**
   - Description
   - Remarks section
   - Examples
   - @since tag

2. **JSDoc on props**
   - Description
   - @defaultValue if applicable
   - @remarks for complex props

3. **Storybook stories**
   - Usage documentation in meta
   - Multiple examples
   - Interactive controls

### Example JSDoc

```tsx
/**
 * Button component - Flexible, accessible button.
 *
 * @remarks
 * This component supports multiple variants and sizes.
 * It includes loading states and icon support.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Button onClick={handleClick}>Click me</Button>
 * ```
 *
 * @example
 * With icon:
 * ```tsx
 * <Button startIcon={<Icon />} variant="primary">
 *   Save
 * </Button>
 * ```
 *
 * @since 0.1.0
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(/*...*/);
```

## 🔄 Pull Request Process

1. **Ensure all checks pass:**
   - Tests pass
   - Linting passes
   - Type checking passes
   - Formatting is correct

2. **Update documentation:**
   - Add component to README if needed
   - Update CHANGELOG.md

3. **Create pull request:**
   - Clear title describing the change
   - Description with examples
   - Link to any related issues

4. **Respond to review:**
   - Address feedback
   - Make requested changes
   - Update tests if needed

### PR Title Format

```
feat: Add Checkbox component
fix: Fix Button focus state
docs: Update contributing guide
test: Add Input accessibility tests
```

## 🎨 Design Tokens

When adding new design tokens:

1. Add to `src/styles/tokens.css`
2. Add to both light and dark modes
3. Add to Tailwind config
4. Ensure WCAG AA contrast ratios
5. Document the token

Example:
```css
:root {
  /* Light mode */
  --new-token: #value;
}

.dark {
  /* Dark mode */
  --new-token: #dark-value;
}
```

## ❓ Questions?

- Check existing components for patterns
- Read the [AI Agent Guide](./docs/AI-AGENT-GUIDE.md)
- Review the [README](./README.md)
- Open an issue for discussion

## 📜 Code of Conduct

- Be respectful and constructive
- Welcome newcomers
- Focus on what's best for the project
- Assume good intent

Thank you for contributing! 🎉

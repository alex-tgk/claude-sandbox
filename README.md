# Modular UI System

A production-ready, accessible UI component library designed for AI-driven web application generation.

## 🎯 Overview

This modular UI system provides a comprehensive set of composable, strictly-typed React components optimized for AI code generation. Every component follows consistent patterns, includes comprehensive documentation, and meets WCAG 2.2 AA accessibility standards.

## ✨ Features

- **🎨 Tailwind CSS v4**: Zero-runtime styling with CSS variables for theming
- **♿ Accessibility First**: WCAG 2.2 AA compliant with full keyboard navigation
- **📘 TypeScript Strict Mode**: Complete type safety with explicit generics
- **🧩 Headless Architecture**: Separation of logic and presentation
- **🌗 Dark Mode**: Built-in light/dark/system theme support
- **🔧 SSR-Friendly**: No browser-only APIs in core logic
- **📦 Tree-Shakable**: Import only what you need
- **🧪 Fully Tested**: 80%+ test coverage with Vitest
- **📚 Storybook**: Interactive component documentation
- **🤖 AI-Optimized**: Predictable patterns for code generation

## 🚀 Tech Stack

- **Framework**: React 18+
- **Language**: TypeScript (strict mode)
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest + Testing Library
- **Documentation**: Storybook 8

## 📦 Installation

```bash
npm install @modular-ui/system
```

## 🎨 Usage

### Basic Example

```tsx
import { Button, Input, Dialog } from '@modular-ui/system';
import '@modular-ui/system/styles';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        isRequired
      />

      <Button onClick={() => setIsOpen(true)} variant="primary">
        Open Dialog
      </Button>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        description="Are you sure you want to continue?"
      >
        <p>This action cannot be undone.</p>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      </Dialog>
    </>
  );
}
```

### Using Hooks

```tsx
import { useControlledState, useId, useFocusTrap } from '@modular-ui/system';

function CustomInput() {
  const id = useId('custom-input');
  const [value, setValue] = useControlledState({
    defaultValue: '',
    onChange: (val) => console.log(val),
  });

  return (
    <div>
      <label htmlFor={id}>Custom Input</label>
      <input
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
```

## 🎯 Component API Design

All components follow these conventions:

1. **Discriminated Unions for Variants**
   ```tsx
   type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
   ```

2. **Boolean Props with Clear Prefixes**
   ```tsx
   isDisabled, isLoading, isFullWidth, isRequired
   ```

3. **Event Handlers with TypeScript**
   ```tsx
   onClose: () => void
   onChange: (value: string) => void
   ```

4. **Comprehensive JSDoc**
   - Every public API includes description, examples, and remarks
   - Type parameters are documented
   - Default values are specified

## 📚 Available Components

### Button
Flexible, accessible button with multiple variants and sizes.
- Variants: primary, secondary, outline, ghost, danger
- Sizes: sm, md, lg
- Loading state support
- Icon support (start/end)

### Input
Text input with label, helper text, and error states.
- Variants: default, error, success
- Sizes: sm, md, lg
- Adornments (start/end icons)
- Auto-generated IDs for accessibility

### Dialog
Modal dialog with focus trapping.
- Focus trap implementation
- Escape key handling
- Backdrop click support
- Scroll locking
- Multiple sizes

## 🎨 Theming

The system uses CSS variables for easy theming:

```css
/* Light mode (default) */
:root {
  --brand-500: #3b82f6;
  --surface: #ffffff;
  --text: #111827;
}

/* Dark mode */
.dark {
  --brand-500: #60a5fa;
  --surface: #111827;
  --text: #f9fafb;
}
```

### Toggling Theme

```tsx
// Add 'dark' class to root element
document.documentElement.classList.add('dark');

// Or use system preference
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    /* dark mode variables */
  }
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

All components include:
- Rendering tests
- Interaction tests
- Accessibility tests
- Ref forwarding tests

## 📖 Storybook

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

Storybook includes:
- Interactive controls for all props
- Accessibility testing with @storybook/addon-a11y
- Multiple story variants
- Dark/light mode toggle

## 🤖 For AI Agents

### Generating New Components

Use the component generator script:

```bash
npm run generate:component MyComponent
```

This creates:
- Component file with TypeScript + JSDoc
- Test file with Vitest
- Story file with Storybook
- Index file with exports

### Component Template Pattern

Follow this structure for all new components:

```tsx
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export type MyComponentVariant = 'primary' | 'secondary';
export type MyComponentSize = 'sm' | 'md' | 'lg';

export interface MyComponentProps extends HTMLAttributes<HTMLElement> {
  variant?: MyComponentVariant;
  size?: MyComponentSize;
  disabled?: boolean;
}

export const MyComponent = forwardRef<HTMLElement, MyComponentProps>(
  ({ variant = 'primary', size = 'md', disabled, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('base-classes', className)} {...props} />
    );
  }
);

MyComponent.displayName = 'MyComponent';
```

## 🎓 Best Practices

### For Developers

1. **Always use the provided hooks**: `useId`, `useControlledState`, `useFocusTrap`
2. **Follow ARIA guidelines**: Add proper roles, labels, and states
3. **Test keyboard navigation**: Ensure Tab, Enter, Escape work correctly
4. **Maintain contrast ratios**: Meet WCAG 2.2 AA (4.5:1 for text)
5. **Document everything**: JSDoc comments for all public APIs

### For AI Agents

1. **Use the component generator** for consistency
2. **Follow naming conventions**: PascalCase for components, camelCase for props
3. **Include all file types**: component, test, story, index
4. **Copy patterns from existing components**
5. **Always add JSDoc with @example tags**
6. **Export types alongside components**

## 🔧 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run type checking
npm run typecheck

# Run linting
npm run lint

# Format code
npm run format

# Run all quality checks
npm run precommit
```

## 📝 Quality Gates

Before committing:
- ✅ ESLint passes with 0 warnings
- ✅ Prettier formatting applied
- ✅ TypeScript type checking passes
- ✅ 80%+ test coverage
- ✅ All tests pass
- ✅ Storybook builds successfully

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please ensure:
1. All tests pass
2. Code is formatted with Prettier
3. ESLint shows no warnings
4. TypeScript compiles without errors
5. New components include tests and stories
6. Accessibility guidelines are followed

## 📚 Additional Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [React 18 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library](https://testing-library.com/react)
- [Storybook Documentation](https://storybook.js.org)

---

Built with ❤️ for AI-driven development

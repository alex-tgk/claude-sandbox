# Modular UI System

> **⚠️ Alpha Status**: This library is under active development. While functional, it's not yet production-ready. Expect breaking changes and API refinements.

A Carbon Design System-inspired UI component library optimized for AI-driven web application generation.

## 🎯 Overview

This modular UI system provides a comprehensive set of composable, strictly-typed React components inspired by IBM Carbon Design System. Components follow consistent patterns, include comprehensive documentation, and target WCAG 2.2 AA accessibility compliance.

**What "Carbon-inspired" means:**
- Visual design follows Carbon specifications (heights, spacing, focus patterns)
- Uses Carbon color tokens and naming conventions
- Sharp corners, 110ms transitions, distinctive 4px tab indicators
- NOT a Carbon implementation (no Carbon dependencies)
- Custom components styled to match Carbon aesthetics

## ✨ Features

- **🎨 IBM Carbon Aesthetic**: Height parity, sharp corners, 110ms transitions, 4px tab indicators
- **🎨 Tailwind CSS v3**: Utility-first styling with CSS variables for theming
- **♿ Accessibility Focused**: Targeting WCAG 2.2 AA compliance with keyboard navigation
- **📘 TypeScript Strict Mode**: Complete type safety with explicit generics
- **🧩 Atomic Design**: Components organized in atoms, molecules, organisms layers
- **🌗 Dark Mode Ready**: Built-in light/dark theme token support
- **🔧 SSR-Friendly**: No browser-only APIs in core logic
- **📦 Tree-Shakable**: Import only what you need
- **🧪 Well Tested**: 97.2% test coverage (478/492 tests passing)
- **📚 Storybook**: Interactive component documentation with Carbon showcase
- **🤖 AI-Optimized**: Predictable patterns for code generation

## 🚀 Tech Stack

- **Framework**: React 18+
- **Language**: TypeScript (strict mode)
- **Bundler**: Vite
- **Styling**: Tailwind CSS v3.4.17
- **Testing**: Vitest + Testing Library
- **Documentation**: Storybook 8

## 📦 Installation

> **Note**: Package not yet published to npm. Currently in development.

For local development:
```bash
git clone <repository-url>
cd modular-ui-system
npm install
npm run build
```

To use in another project:
```bash
npm link /path/to/modular-ui-system
```

## 🎨 Usage

### Setup Tailwind CSS

First, configure Tailwind to use the design tokens:

```js
// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@modular-ui/system/dist/**/*.js'
  ],
  presets: [
    require('@modular-ui/system/tailwind')
  ]
}
```

Import the CSS tokens:
```tsx
// In your app entry point
import '@modular-ui/system/tokens';
```

### Basic Example

```tsx
import { Button, Input, Dialog } from '@modular-ui/system';

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

### Atoms (15 components)
- **Button**: Primary, secondary, outline, ghost, danger variants with Carbon styling
- **Input**: Text input with Carbon height parity (32/40/48px)
- **Checkbox**: Carbon-style checkbox with indeterminate state
- **Radio**: Radio buttons with RadioGroup for managing state
- **Badge**: Info, success, warning, error, neutral variants
- **Spinner**: Loading indicator with multiple sizes
- **Switch**: Toggle switch with Carbon focus pattern
- **Avatar**: User avatars with fallback initials

### Molecules (10 components)
- **Alert**: Dismissible alerts with icons and actions
- **Breadcrumb**: Navigation breadcrumbs
- **Select**: Custom select dropdown with keyboard navigation
- **Tabs**: Carbon-style tabs with 4px indicators and sharp corners
- **Tooltip**: Positioned tooltips (⚠️ has known rendering issues)
- **EmptyState**: No-data placeholder states
- **OpportunityRadar**: Specialized AI opportunity detection component
- **OnboardingChecklist**: Step-by-step onboarding flows

### Organisms (6 components)
- **Card**: Elevated, outlined, and flat variants
- **Dialog**: Modal with focus trap and Carbon styling
- **DataTable**: Sortable, searchable, paginated tables with row selection
- **CommandPalette**: Keyboard-driven command interface

### Examples
- **CarbonShowcase**: Interactive demo of all Carbon Design nuances

### Hooks (5 utilities)
- `useControlledState`: Controlled/uncontrolled component state
- `useId`: Accessible unique ID generation
- `useFocusTrap`: Focus management for modals
- `usePortal`: Portal rendering utility
- `useTooltipPosition`: Tooltip positioning (used by Tooltip component)

## 🎨 Carbon Design Tokens

The system uses IBM Carbon-inspired CSS variables:

```css
/* src/styles/tokens.css */

/* IBM Blue Color Scale (11-step) */
--brand-10: #edf5ff;  /* Lightest blue */
--brand-20: #d0e2ff;
--brand-30: #a6c8ff;
--brand-40: #78a9ff;
--brand-50: #4589ff;
--brand-60: #0f62fe;  /* Primary brand */
--brand-70: #0043ce;
--brand-80: #002d9c;
--brand-90: #001d6c;
--brand-100: #001141; /* Darkest blue */

/* Carbon Layers (backgrounds) */
--layer-01: #f4f4f4;  /* Base layer */
--layer-02: #ffffff;  /* Elevated layer */
--layer-03: #f4f4f4;  /* Menu layer */

/* Interactive Elements */
--interactive: var(--brand-60);
--interactive-hover: var(--brand-70);
--interactive-active: var(--brand-80);

/* Borders */
--border-subtle: #e0e0e0;
--border-strong: #8d8d8d;
--border-focus: var(--brand-60);

/* Text */
--text-primary: #161616;
--text-secondary: #525252;
--text-on-color: #ffffff;
```

### Carbon Design Specifications

**Height Parity**: Buttons and inputs share exact heights
- Small: 32px (h-8)
- Medium: 40px (h-10) - default
- Large: 48px (h-12)

**Focus Pattern**: 2px focus border with 1px transparent inset
```css
box-shadow: inset 0 0 0 1px transparent, inset 0 0 0 3px var(--border-focus)
```

**Sharp Corners**: All components use `rounded-none` (0px border radius)

**Transitions**: 110ms duration for all state changes

**Tab Indicators**: 4px thick borders (vs typical 2px)

**Button Alignment**: Left-aligned text with asymmetric padding (16px left, 64px right)

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

## 📝 Quality Status

Current state:
- ✅ ESLint passes with 0 warnings
- ✅ Prettier formatting applied
- ✅ TypeScript strict mode passes
- ✅ 97.2% test coverage (478/492 tests passing)
- ⚠️ 14 tests failing (13 in Tooltip component requiring refactor)
- ✅ Storybook builds successfully

**Known Issues:**
- Tooltip component has circular dependency in render logic
- Some performance optimizations pending (tracked in backlog)
- Missing critical form components (TextArea, FileUpload)
- No DatePicker or navigation components yet

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

- [IBM Carbon Design System](https://carbondesignsystem.com/)
- [Tailwind CSS v3 Documentation](https://tailwindcss.com)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [React 18 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library](https://testing-library.com/react)
- [Storybook Documentation](https://storybook.js.org)

## 🗺️ Roadmap

### Immediate
- [ ] Fix Tooltip component circular dependency
- [ ] Build TextArea component
- [ ] Build Grid/Stack/Flex layout primitives
- [ ] Add remaining performance optimizations

### Short-term
- [ ] DatePicker component
- [ ] Form infrastructure (useForm, FormField, Form)
- [ ] Navigation components (Pagination, Dropdown)
- [ ] Accordion component
- [ ] TreeView component

### Long-term
- [ ] React 19 compatibility
- [ ] Server Components support
- [ ] Migration guides (Material-UI, Chakra, Ant Design)
- [ ] Component maturity badges
- [ ] npm package publication

---

**Status**: Alpha - Carbon-inspired UI system for AI-driven development 🤖

Built with ❤️ following IBM Carbon Design System aesthetics

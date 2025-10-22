# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-10-22

### Added

#### Core Infrastructure
- Initial project setup with Vite, React 18, and TypeScript (strict mode)
- Tailwind CSS v4 configuration with design tokens
- ESLint and Prettier configuration with accessibility rules
- Vitest and Testing Library setup for testing
- Storybook 8 with a11y addon for interactive documentation

#### Design System
- CSS variables system for theming (light/dark/system modes)
- Comprehensive design tokens in `src/styles/tokens.css`
- WCAG 2.2 AA compliant color palette
- Responsive spacing, typography, and border radius tokens
- Smooth transitions and animations

#### Utilities
- `cn()` - Class name composition utility using clsx
- Comprehensive JSDoc documentation for all utilities

#### Hooks
- `useId()` - Generate unique, SSR-safe IDs
- `useControlledState()` - Support controlled/uncontrolled components
- `useFocusTrap()` - Focus management for modals and dialogs

#### Components

**Button**
- Multiple variants: primary, secondary, outline, ghost, danger
- Three sizes: sm, md, lg
- Loading state with spinner
- Start/end icon support
- Full keyboard navigation and ARIA support
- Comprehensive tests and Storybook stories

**Input**
- Form input with label and helper text
- Error state with validation messages
- Start/end adornments for icons
- Required field indicator
- Auto-generated IDs for accessibility
- Full keyboard navigation and ARIA support

**Dialog/Modal**
- Focus trap implementation
- Escape key and backdrop click handling
- Body scroll locking
- Multiple size options
- Keyboard navigation (Tab, Shift+Tab, Escape)
- ARIA roles and attributes

#### Developer Experience
- Component generator script for AI agents
- AI Agent Development Guide
- Comprehensive README with usage examples
- Contributing guide with coding standards
- Example application demonstrating all components
- Pre-commit quality checks (lint, format, typecheck, tests)

#### Documentation
- Inline JSDoc comments on all public APIs
- Storybook stories with interactive controls
- Accessibility documentation and examples
- Theme customization guide
- TypeScript type documentation

### Developer Tools
- `npm run generate:component` - Generate new components with all boilerplate
- `npm run dev:example` - Run example application
- `npm run storybook` - Interactive component explorer
- `npm run test:coverage` - Run tests with coverage report
- `npm run precommit` - Run all quality checks

### Quality Gates
- 95%+ TypeScript type coverage
- 80%+ unit test coverage
- Zero ESLint warnings
- Prettier formatting enforced
- WCAG 2.2 AA accessibility compliance
- All Storybook a11y checks passing

[0.1.0]: https://github.com/modular-ui/system/releases/tag/v0.1.0

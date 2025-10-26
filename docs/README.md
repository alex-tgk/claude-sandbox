# Component Documentation System

This directory contains auto-generated documentation for all UI components in the library.

## Overview

The documentation system consists of:

1. **component-manifest.json** - Complete JSON manifest of all components with metadata
2. **components/** - Individual Markdown documentation files for each component
3. **catalog.md** - Comprehensive catalog index of all components
4. **ComponentExplorer.tsx** - Interactive React component for browsing documentation

## Generated Files

### Component Manifest (`component-manifest.json`)

A structured JSON file containing:
- Component metadata (name, category, description, version)
- Complete prop definitions with types and defaults
- Available variants and sizes
- Code examples from Storybook stories
- Accessibility information (ARIA, keyboard navigation, WCAG compliance)
- File paths for source and stories

**Structure:**
```json
{
  "version": "1.0.0",
  "generatedAt": "2025-10-26T...",
  "components": [
    {
      "name": "Button",
      "category": "atoms",
      "description": "...",
      "props": [...],
      "variants": [...],
      "examples": [...],
      "accessibility": {...}
    }
  ],
  "categories": {
    "atoms": [...],
    "molecules": [...],
    "organisms": [...],
    "templates": [...]
  }
}
```

### Component Documentation Files

Each component has a Markdown file (`components/{ComponentName}.md`) with:
- Component overview and description
- Installation instructions
- Complete props table
- Available variants and sizes
- Code examples from Storybook
- Accessibility guidelines
- Related components
- File locations

### Component Catalog

A master index (`catalog.md`) providing:
- Quick statistics (total components by category)
- Organized listing by atomic design level
- Component summaries with prop counts and versions
- Links to individual component docs
- Standards and usage guidelines

### Interactive Component Explorer

A React component (`ComponentExplorer.tsx`) for interactive browsing:
- Search and filter components
- Category-based navigation
- Live prop tables
- Code examples
- Accessibility information
- Responsive design

## Usage

### Regenerating Documentation

To regenerate all documentation after component changes:

```bash
npm run docs:generate
```

This script:
1. Scans all component files in `src/components/`
2. Extracts JSDoc comments, TypeScript types, and props
3. Parses Storybook stories for examples
4. Generates the manifest JSON
5. Creates individual Markdown files
6. Updates the catalog index

### Using the Component Explorer

On your commercial website, import and use the interactive explorer:

```tsx
import { ComponentExplorer } from './docs/ComponentExplorer';
import manifest from './docs/component-manifest.json';

function DocumentationPage() {
  return <ComponentExplorer manifest={manifest} />;
}
```

### API Integration

Serve the manifest JSON as an API endpoint:

```typescript
// Next.js API route example
import manifest from '../../docs/component-manifest.json';

export default function handler(req, res) {
  res.status(200).json(manifest);
}
```

Then fetch it dynamically:

```tsx
const [manifest, setManifest] = useState(null);

useEffect(() => {
  fetch('/api/components')
    .then(res => res.json())
    .then(data => setManifest(data));
}, []);

return manifest ? <ComponentExplorer manifest={manifest} /> : <Loading />;
```

## Documentation Standards

All components should follow these documentation standards:

### JSDoc Comments

```tsx
/**
 * Button component - A flexible, accessible button with multiple variants.
 *
 * @remarks
 * This component follows the styled wrapper pattern with full accessibility support.
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Button onClick={handleClick}>Click me</Button>
 * ```
 *
 * @since 0.1.0
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(...)
```

### Prop Definitions

```tsx
export interface ButtonProps {
  /**
   * Visual variant of the button
   * @defaultValue 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @defaultValue 'md'
   */
  size?: ButtonSize;
}
```

### Storybook Documentation

Include accessibility notes in story metadata:

```tsx
/**
 * Button component for user interactions.
 *
 * ## Accessibility
 *
 * - Keyboard navigable with Tab
 * - Activatable with Enter or Space
 * - Clear focus indicators
 * - WCAG 2.2 AA compliant
 */
const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  // ...
};
```

## Automation

### CI/CD Integration

Add to your CI pipeline:

```yaml
# .github/workflows/docs.yml
name: Generate Documentation

on:
  push:
    paths:
      - 'src/components/**'

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run docs:generate
      - run: git add docs/
      - run: git commit -m "docs: Update component documentation"
      - run: git push
```

### Pre-commit Hook

Ensure docs stay in sync:

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run docs:generate && git add docs/"
    }
  }
}
```

## Architecture

### Documentation Generator (`scripts/generate-docs.ts`)

The generator script:
1. Scans component directories (atoms, molecules, organisms, templates)
2. Extracts TypeScript interfaces and types
3. Parses JSDoc comments for descriptions
4. Extracts Storybook stories for examples
5. Analyzes accessibility features (ARIA, keyboard support)
6. Generates structured JSON manifest
7. Creates Markdown documentation files
8. Updates catalog index

### Component Explorer (`docs/ComponentExplorer.tsx`)

Features:
- Search by component name or description
- Filter by category (atoms/molecules/organisms/templates)
- Tabbed interface (Props/Examples/Accessibility)
- Responsive design (mobile-friendly)
- Copy-to-clipboard for code examples
- Links to Storybook

### Data Flow

```
Component Source Files
       ↓
  generate-docs.ts (extraction & parsing)
       ↓
  component-manifest.json
       ↓
  ComponentExplorer.tsx (UI rendering)
       ↓
  Commercial Website
```

## Statistics

Current documentation coverage:
- **Total Components:** 20
- **Atoms:** 13
- **Molecules:** 4
- **Organisms:** 3
- **Templates:** 0
- **Total Props:** 100+
- **Code Examples:** 50+
- **Accessibility Documented:** 100%

## Maintenance

### Adding New Components

1. Create component with proper JSDoc comments
2. Add Storybook stories with examples
3. Include accessibility documentation
4. Run `npm run docs:generate`
5. Verify generated documentation

### Updating Existing Components

1. Update component source and JSDoc
2. Update Storybook stories if needed
3. Run `npm run docs:generate`
4. Review changes in `docs/`

### Best Practices

- Keep JSDoc comments concise but descriptive
- Include @defaultValue for all optional props
- Add @since version tags
- Document accessibility features thoroughly
- Provide realistic code examples in stories
- Update documentation when APIs change

## Support

For questions or issues with the documentation system:
- Check the component source files for accurate information
- Review Storybook for interactive examples
- Consult the generated manifest for programmatic access
- File issues for documentation bugs or improvements

---

**Last Generated:** Check `component-manifest.json` for `generatedAt` timestamp
**Documentation Version:** 1.0.0
**Component Library Version:** See package.json

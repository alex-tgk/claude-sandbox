#!/usr/bin/env tsx
/**
 * Component Generator Script for AI Agents
 *
 * @remarks
 * This script generates a new component with all necessary files:
 * - Component file (TypeScript + JSDoc)
 * - Test file (Vitest + Testing Library)
 * - Story file (Storybook)
 * - Index file (exports)
 *
 * The generator follows the established patterns and conventions
 * to ensure consistency across the codebase.
 *
 * @example
 * ```bash
 * npm run generate:component Checkbox
 * ```
 *
 * @since 0.1.0
 */

import * as fs from 'fs';
import * as path from 'path';

interface GenerateComponentOptions {
  name: string;
  hasVariants?: boolean;
  hasSizes?: boolean;
  isHeadless?: boolean;
}

/**
 * Convert PascalCase to kebab-case
 */
function toKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Generate component file content
 */
function generateComponent(options: GenerateComponentOptions): string {
  const { name, hasVariants = true, hasSizes = true } = options;

  return `import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

${hasVariants ? `/**
 * ${name} variant types
 *
 * @since 0.1.0
 */
export type ${name}Variant = 'primary' | 'secondary' | 'outline';
` : ''}
${hasSizes ? `/**
 * ${name} size types
 *
 * @since 0.1.0
 */
export type ${name}Size = 'sm' | 'md' | 'lg';
` : ''}
/**
 * Props for the ${name} component
 *
 * @remarks
 * Add component description here.
 *
 * @since 0.1.0
 */
export interface ${name}Props extends HTMLAttributes<HTMLDivElement> {
  ${hasVariants ? `/**
   * Visual variant
   * @defaultValue 'primary'
   */
  variant?: ${name}Variant;
  ` : ''}
  ${hasSizes ? `/**
   * Size
   * @defaultValue 'md'
   */
  size?: ${name}Size;
  ` : ''}
  /**
   * Whether the component is disabled
   * @defaultValue false
   */
  disabled?: boolean;
}

/**
 * ${name} component - Add one-line description.
 *
 * @remarks
 * Add detailed description here.
 *
 * Features:
 * - Feature 1
 * - Feature 2
 * - WCAG 2.2 AA compliant
 * - SSR-friendly
 *
 * @example
 * Basic usage:
 * \`\`\`tsx
 * <${name}>Content</${name}>
 * \`\`\`
 *
 * @since 0.1.0
 */
export const ${name} = forwardRef<HTMLDivElement, ${name}Props>(
  (
    {
      ${hasVariants ? 'variant = \'primary\',' : ''}
      ${hasSizes ? 'size = \'md\',' : ''}
      disabled = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      // Add base classes
      'inline-flex items-center justify-center',
      // Add variant and size classes
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        aria-disabled={disabled}
        {...props}
      >
        {children}
      </div>
    );
  }
);

${name}.displayName = '${name}';
`;
}

/**
 * Generate test file content
 */
function generateTest(name: string): string {
  return `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ${name} } from './${name}';

describe('${name}', () => {
  describe('rendering', () => {
    it('renders with children', () => {
      render(<${name}>Test content</${name}>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<${name} className="custom-class">Content</${name}>);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('interactions', () => {
    it('can be disabled', () => {
      render(<${name} disabled>Content</${name}>);
      expect(screen.getByText('Content')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('accessibility', () => {
    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<${name} ref={ref}>Content</${name}>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
`;
}

/**
 * Generate story file content
 */
function generateStory(name: string): string {
  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

/**
 * ${name} component description.
 *
 * ## Usage
 *
 * Add usage guidelines here.
 *
 * ## Accessibility
 *
 * - Keyboard navigable
 * - Screen reader friendly
 * - WCAG 2.2 AA compliant
 */
const meta = {
  title: 'Components/${name}',
  component: ${name},
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof ${name}>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default ${name}
 */
export const Default: Story = {
  args: {
    children: '${name} content',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    children: '${name} content',
    disabled: true,
  },
};
`;
}

/**
 * Generate index file content
 */
function generateIndex(name: string, hasVariants: boolean, hasSizes: boolean): string {
  const types = [
    '${name}Props',
    hasVariants && '${name}Variant',
    hasSizes && '${name}Size',
  ]
    .filter(Boolean)
    .join(', ');

  return `/**
 * ${name} component exports
 *
 * @since 0.1.0
 */

export { ${name} } from './${name}';
export type { ${types} } from './${name}';
`;
}

/**
 * Main function to generate component
 */
async function generateComponentFiles(options: GenerateComponentOptions): Promise<void> {
  const { name } = options;
  const kebabName = toKebabCase(name);
  const componentDir = path.join(process.cwd(), 'src', 'components', kebabName);

  // Create directory
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }

  // Generate files
  const files = {
    [`${name}.tsx`]: generateComponent(options),
    [`${name}.test.tsx`]: generateTest(name),
    [`${name}.stories.tsx`]: generateStory(name),
    'index.ts': generateIndex(name, options.hasVariants ?? true, options.hasSizes ?? true),
  };

  // Write files
  for (const [filename, content] of Object.entries(files)) {
    const filePath = path.join(componentDir, filename);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Created ${filename}`);
  }

  console.log(`\n✨ Component "${name}" generated successfully!`);
  console.log(`\nNext steps:`);
  console.log(`1. Implement the component logic in src/components/${kebabName}/${name}.tsx`);
  console.log(`2. Add tests in src/components/${kebabName}/${name}.test.tsx`);
  console.log(`3. Create stories in src/components/${kebabName}/${name}.stories.tsx`);
  console.log(`4. Export from src/components/index.ts`);
  console.log(`\nDon't forget to:`);
  console.log(`- Add JSDoc comments for all public APIs`);
  console.log(`- Ensure WCAG 2.2 AA compliance`);
  console.log(`- Add keyboard navigation support`);
  console.log(`- Test with screen readers`);
}

// CLI interface
const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Error: Component name is required');
  console.log('\nUsage: npm run generate:component <ComponentName>');
  console.log('Example: npm run generate:component Checkbox');
  process.exit(1);
}

// Validate component name (PascalCase)
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error('❌ Error: Component name must be in PascalCase (e.g., MyComponent)');
  process.exit(1);
}

generateComponentFiles({
  name: componentName,
  hasVariants: true,
  hasSizes: true,
}).catch((error) => {
  console.error('❌ Error generating component:', error);
  process.exit(1);
});

/**
 * Component Documentation Generator
 *
 * This script scans all components and generates comprehensive documentation
 * including a manifest JSON file and MDX files for each component.
 *
 * @module scripts/generate-docs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PropDefinition {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
  required: boolean;
}

interface StoryExample {
  name: string;
  code: string;
  description?: string;
}

interface ComponentDoc {
  name: string;
  category: 'atoms' | 'molecules' | 'organisms' | 'templates';
  description: string;
  props: PropDefinition[];
  variants: string[];
  sizes?: string[];
  examples: StoryExample[];
  accessibility: {
    keyboardNavigation?: string;
    ariaAttributes?: string[];
    screenReaderSupport?: string;
    focusManagement?: string;
    wcagCompliance?: string;
  };
  filePath: string;
  storyPath?: string;
  since: string;
}

interface ComponentManifest {
  version: string;
  generatedAt: string;
  components: ComponentDoc[];
  categories: {
    atoms: string[];
    molecules: string[];
    organisms: string[];
    templates: string[];
  };
}

/**
 * Extract JSDoc description from component file
 */
function extractDescription(content: string, componentName: string): string {
  // Look for the main component JSDoc block
  const componentRegex = new RegExp(
    `/\\*\\*[^*]*\\*+(?:[^/*][^*]*\\*+)*/\\s*export\\s+(?:const|function)\\s+${componentName}`,
    's'
  );
  const match = content.match(componentRegex);

  if (match) {
    const jsdoc = match[0];
    const descMatch = jsdoc.match(/@remarks\s+([^@]*)/s);
    if (descMatch) {
      return descMatch[1].trim().split('\n')[0];
    }

    // Fallback to first line of JSDoc
    const lines = jsdoc.split('\n').filter((l) => l.includes('*') && !l.includes('/**') && !l.includes('*/'));
    if (lines.length > 0) {
      return lines[0].replace(/\s*\*\s*/, '').trim();
    }
  }

  return `${componentName} component`;
}

/**
 * Extract props from TypeScript interface
 */
function extractProps(content: string, componentName: string): PropDefinition[] {
  const props: PropDefinition[] = [];

  // Find the Props interface
  const interfaceRegex = new RegExp(
    `export\\s+interface\\s+${componentName}Props\\s*(?:extends[^{]*)?{([^}]*)}`,
    's'
  );
  const interfaceMatch = content.match(interfaceRegex);

  if (!interfaceMatch) return props;

  const interfaceBody = interfaceMatch[1];
  const propLines = interfaceBody.split('\n');

  let currentProp: Partial<PropDefinition> | null = null;
  let currentJsDoc = '';

  for (const line of propLines) {
    // Capture JSDoc comment
    if (line.includes('/**')) {
      currentJsDoc = '';
    }
    if (currentJsDoc !== null && line.includes('*') && !line.includes('*/')) {
      const comment = line.replace(/\s*\*\s*/, '').trim();
      if (comment && !comment.startsWith('@')) {
        currentJsDoc += comment + ' ';
      }

      // Check for @defaultValue
      const defaultMatch = line.match(/@defaultValue\s+['"]?([^'"]*?)['"]?\s*$/);
      if (defaultMatch && currentProp) {
        currentProp.defaultValue = defaultMatch[1].trim();
      }
    }

    // Parse prop definition
    const propMatch = line.match(/^\s*(['"])?(\w+)\1\??\s*:\s*([^;]+);?\s*$/);
    if (propMatch) {
      const [, , propName, propType] = propMatch;
      const isRequired = !line.includes('?:');

      currentProp = {
        name: propName,
        type: propType.trim(),
        description: currentJsDoc.trim() || '',
        required: isRequired,
      };

      props.push(currentProp as PropDefinition);
      currentJsDoc = '';
    }
  }

  return props;
}

/**
 * Extract variants from type definitions
 */
function extractVariants(content: string, componentName: string): string[] {
  const variantRegex = new RegExp(
    `export\\s+type\\s+${componentName}Variant\\s*=\\s*([^;]+);`,
    's'
  );
  const match = content.match(variantRegex);

  if (match) {
    return match[1]
      .split('|')
      .map((v) => v.trim().replace(/['"]/g, ''))
      .filter(Boolean);
  }

  return [];
}

/**
 * Extract sizes from type definitions
 */
function extractSizes(content: string, componentName: string): string[] | undefined {
  const sizeRegex = new RegExp(
    `export\\s+type\\s+${componentName}Size\\s*=\\s*([^;]+);`,
    's'
  );
  const match = content.match(sizeRegex);

  if (match) {
    return match[1]
      .split('|')
      .map((v) => v.trim().replace(/['"]/g, ''))
      .filter(Boolean);
  }

  return undefined;
}

/**
 * Extract examples from Storybook stories
 */
function extractExamples(storyPath: string): StoryExample[] {
  if (!fs.existsSync(storyPath)) return [];

  const content = fs.readFileSync(storyPath, 'utf-8');
  const examples: StoryExample[] = [];

  // Extract story exports
  const storyRegex = /export const (\w+):\s*Story\s*=\s*{([^}]+)}/gs;
  let match;

  while ((match = storyRegex.exec(content)) !== null) {
    const storyName = match[1];
    const storyBody = match[2];

    // Try to extract description from JSDoc above story
    const beforeStory = content.substring(0, match.index);
    const lastCommentMatch = beforeStory.match(/\/\*\*([^*]|\*(?!\/))*\*\/\s*$/s);
    let description = '';

    if (lastCommentMatch) {
      const comment = lastCommentMatch[0];
      const lines = comment
        .split('\n')
        .map((l) => l.replace(/^\s*\*\s*/, '').trim())
        .filter((l) => l && !l.startsWith('*'));
      description = lines[0] || '';
    }

    examples.push({
      name: storyName,
      code: storyBody.trim(),
      description,
    });
  }

  // Also extract render stories
  const renderRegex = /export const (\w+):\s*Story\s*=\s*{\s*render:\s*\(\)\s*=>\s*\(([^}]+)\)/gs;
  while ((match = renderRegex.exec(content)) !== null) {
    const storyName = match[1];
    const renderCode = match[2];

    if (!examples.find((e) => e.name === storyName)) {
      examples.push({
        name: storyName,
        code: renderCode.trim(),
      });
    }
  }

  return examples;
}

/**
 * Extract accessibility information from stories and component
 */
function extractAccessibility(
  componentContent: string,
  storyContent: string
): ComponentDoc['accessibility'] {
  const accessibility: ComponentDoc['accessibility'] = {};

  // Look for accessibility section in stories
  const a11yMatch = storyContent.match(/##\s*Accessibility\s*\n([^#]*)/s);
  if (a11yMatch) {
    const a11yText = a11yMatch[1];

    const keyboardMatch = a11yText.match(/keyboard[^:]*:?\s*([^\n]+)/i);
    if (keyboardMatch) {
      accessibility.keyboardNavigation = keyboardMatch[1].trim();
    }

    const screenReaderMatch = a11yText.match(/screen reader[^:]*:?\s*([^\n]+)/i);
    if (screenReaderMatch) {
      accessibility.screenReaderSupport = screenReaderMatch[1].trim();
    }

    if (a11yText.toLowerCase().includes('wcag')) {
      accessibility.wcagCompliance = 'WCAG 2.2 AA compliant';
    }
  }

  // Extract ARIA attributes from component
  const ariaMatches = componentContent.matchAll(/aria-(\w+)/g);
  const ariaAttrs = new Set<string>();
  for (const match of ariaMatches) {
    ariaAttrs.add(`aria-${match[1]}`);
  }
  if (ariaAttrs.size > 0) {
    accessibility.ariaAttributes = Array.from(ariaAttrs);
  }

  // Check for focus management
  if (componentContent.includes('focus') || componentContent.includes('Focus')) {
    accessibility.focusManagement = 'Includes focus management';
  }

  return accessibility;
}

/**
 * Extract version from component
 */
function extractVersion(content: string): string {
  const versionMatch = content.match(/@since\s+(\d+\.\d+\.\d+)/);
  return versionMatch ? versionMatch[1] : '0.1.0';
}

/**
 * Process a single component
 */
function processComponent(
  componentPath: string,
  category: ComponentDoc['category']
): ComponentDoc | null {
  const componentName = path.basename(componentPath, '.tsx');
  const componentDir = path.dirname(componentPath);
  const storyPath = path.join(componentDir, `${componentName}.stories.tsx`);

  // Skip if not a component file
  if (componentName.includes('.test') || componentName.includes('.stories')) {
    return null;
  }

  const componentContent = fs.readFileSync(componentPath, 'utf-8');

  // Check if this is actually a component export
  if (!componentContent.includes(`export const ${componentName}`) &&
      !componentContent.includes(`export function ${componentName}`)) {
    return null;
  }

  const storyContent = fs.existsSync(storyPath)
    ? fs.readFileSync(storyPath, 'utf-8')
    : '';

  const description = extractDescription(componentContent, componentName);
  const props = extractProps(componentContent, componentName);
  const variants = extractVariants(componentContent, componentName);
  const sizes = extractSizes(componentContent, componentName);
  const examples = extractExamples(storyPath);
  const accessibility = extractAccessibility(componentContent, storyContent);
  const since = extractVersion(componentContent);

  return {
    name: componentName,
    category,
    description,
    props,
    variants,
    sizes,
    examples,
    accessibility,
    filePath: componentPath,
    storyPath: fs.existsSync(storyPath) ? storyPath : undefined,
    since,
  };
}

/**
 * Scan all components
 */
function scanComponents(srcDir: string): ComponentDoc[] {
  const components: ComponentDoc[] = [];
  const categories = ['atoms', 'molecules', 'organisms', 'templates'] as const;

  for (const category of categories) {
    const categoryDir = path.join(srcDir, 'src', 'components', category);

    if (!fs.existsSync(categoryDir)) continue;

    const componentDirs = fs.readdirSync(categoryDir);

    for (const componentDir of componentDirs) {
      const componentPath = path.join(
        categoryDir,
        componentDir,
        `${componentDir.charAt(0).toUpperCase() + componentDir.slice(1)}.tsx`
      );

      if (fs.existsSync(componentPath)) {
        const component = processComponent(componentPath, category);
        if (component) {
          components.push(component);
        }
      }
    }
  }

  return components;
}

/**
 * Generate MDX documentation for a component
 */
function generateMDX(component: ComponentDoc): string {
  const mdx = `---
title: ${component.name}
category: ${component.category}
description: ${component.description}
since: ${component.since}
---

# ${component.name}

${component.description}

## Installation

\`\`\`tsx
import { ${component.name} } from '@your-org/ui-library';
\`\`\`

## Props

${component.props.length > 0 ? `
| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
${component.props.map((prop) => {
  return `| \`${prop.name}\` | \`${prop.type}\` | ${prop.defaultValue ? `\`${prop.defaultValue}\`` : '-'} | ${prop.required ? 'Yes' : 'No'} | ${prop.description} |`;
}).join('\n')}
` : 'This component does not accept any custom props beyond standard HTML attributes.'}

${component.variants.length > 0 ? `
## Variants

Available variants: ${component.variants.map((v) => `\`${v}\``).join(', ')}
` : ''}

${component.sizes && component.sizes.length > 0 ? `
## Sizes

Available sizes: ${component.sizes.map((s) => `\`${s}\``).join(', ')}
` : ''}

## Examples

${component.examples.slice(0, 5).map((example) => `
### ${example.name.replace(/([A-Z])/g, ' $1').trim()}

${example.description || ''}

\`\`\`tsx
${example.code}
\`\`\`
`).join('\n')}

## Accessibility

${Object.entries(component.accessibility).map(([key, value]) => {
  const label = key.replace(/([A-Z])/g, ' $1').trim();
  return `### ${label.charAt(0).toUpperCase() + label.slice(1)}\n\n${Array.isArray(value) ? value.map(v => `- \`${v}\``).join('\n') : value}`;
}).join('\n\n')}

${component.accessibility.wcagCompliance ? `\nThis component is ${component.accessibility.wcagCompliance}.` : ''}

## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** \`${component.filePath.replace(/^.*\/src\//, 'src/')}\`
${component.storyPath ? `**Stories:** \`${component.storyPath.replace(/^.*\/src\//, 'src/')}\`` : ''}
`;

  return mdx;
}

/**
 * Generate component catalog index
 */
function generateCatalog(components: ComponentDoc[]): string {
  const byCategory = components.reduce((acc, comp) => {
    if (!acc[comp.category]) acc[comp.category] = [];
    acc[comp.category].push(comp);
    return acc;
  }, {} as Record<string, ComponentDoc[]>);

  const catalog = `---
title: Component Catalog
description: Complete catalog of all UI components
---

# Component Catalog

Browse all ${components.length} components organized by atomic design principles.

## Quick Stats

- **Atoms:** ${byCategory.atoms?.length || 0} components
- **Molecules:** ${byCategory.molecules?.length || 0} components
- **Organisms:** ${byCategory.organisms?.length || 0} components
- **Templates:** ${byCategory.templates?.length || 0} components

---

${(['atoms', 'molecules', 'organisms', 'templates'] as const).map((category) => {
  const comps = byCategory[category] || [];
  return `
## ${category.charAt(0).toUpperCase() + category.slice(1)}

${comps.map((comp) => {
  const variants = comp.variants.length > 0 ? ` (${comp.variants.length} variants)` : '';
  return `### [${comp.name}](./components/${comp.name}.md)${variants}\n\n${comp.description}\n\n**Props:** ${comp.props.length} | **Since:** ${comp.since}`;
}).join('\n\n')}
`;
}).join('\n\n---\n')}

## Component Status

All components follow these standards:
- WCAG 2.2 AA accessibility compliance
- Full TypeScript support
- Comprehensive Storybook documentation
- Unit tested with React Testing Library
- IBM Carbon Design System aesthetic

## Usage

Each component includes:
1. Complete prop documentation
2. Interactive Storybook examples
3. Accessibility guidelines
4. Code examples
5. Best practices
`;

  return catalog;
}

/**
 * Main execution
 */
function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const components = scanComponents(projectRoot);

  console.log(`\n📚 Generating documentation for ${components.length} components...\n`);

  // Generate manifest
  const manifest: ComponentManifest = {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    components,
    categories: {
      atoms: components.filter((c) => c.category === 'atoms').map((c) => c.name),
      molecules: components.filter((c) => c.category === 'molecules').map((c) => c.name),
      organisms: components.filter((c) => c.category === 'organisms').map((c) => c.name),
      templates: components.filter((c) => c.category === 'templates').map((c) => c.name),
    },
  };

  // Write manifest
  const manifestPath = path.join(projectRoot, 'docs', 'component-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`✅ Generated manifest: ${manifestPath}`);

  // Generate MDX files
  const docsDir = path.join(projectRoot, 'docs', 'components');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  for (const component of components) {
    const mdxContent = generateMDX(component);
    const mdxPath = path.join(docsDir, `${component.name}.md`);
    fs.writeFileSync(mdxPath, mdxContent);
    console.log(`  📄 ${component.name}.md`);
  }

  // Generate catalog
  const catalogContent = generateCatalog(components);
  const catalogPath = path.join(projectRoot, 'docs', 'catalog.md');
  fs.writeFileSync(catalogPath, catalogContent);
  console.log(`\n✅ Generated catalog: ${catalogPath}`);

  // Summary
  console.log(`\n📊 Documentation Summary:`);
  console.log(`   Total Components: ${components.length}`);
  console.log(`   - Atoms: ${manifest.categories.atoms.length}`);
  console.log(`   - Molecules: ${manifest.categories.molecules.length}`);
  console.log(`   - Organisms: ${manifest.categories.organisms.length}`);
  console.log(`   - Templates: ${manifest.categories.templates.length}`);
  console.log(`\n   Files Generated:`);
  console.log(`   - component-manifest.json`);
  console.log(`   - catalog.md`);
  console.log(`   - ${components.length} component documentation files`);
  console.log(`\n✨ Documentation generation complete!\n`);
}

main();

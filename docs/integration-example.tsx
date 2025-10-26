/**
 * Integration Examples for Commercial Website
 *
 * This file shows different ways to integrate the component documentation
 * system into your commercial website or documentation portal.
 */

// ============================================================================
// Example 1: Next.js App Router Integration
// ============================================================================

// app/components/page.tsx
'use client';

import { ComponentExplorer } from '@/docs/ComponentExplorer';
import manifest from '@/docs/component-manifest.json';

export default function ComponentsDocPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ComponentExplorer manifest={manifest} />
    </div>
  );
}

// ============================================================================
// Example 2: Next.js with Dynamic API
// ============================================================================

// app/api/components/route.ts
import { NextResponse } from 'next/server';
import manifest from '@/docs/component-manifest.json';

export async function GET() {
  return NextResponse.json(manifest);
}

// app/api/components/[name]/route.ts
import { NextResponse } from 'next/server';
import manifest from '@/docs/component-manifest.json';

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  const component = manifest.components.find(
    (c) => c.name.toLowerCase() === params.name.toLowerCase()
  );

  if (!component) {
    return NextResponse.json({ error: 'Component not found' }, { status: 404 });
  }

  return NextResponse.json(component);
}

// app/components/page.tsx (with API)
'use client';

import { ComponentExplorer } from '@/docs/ComponentExplorer';
import { useState, useEffect } from 'react';
import type { ComponentManifest } from '@/docs/ComponentExplorer';

export default function ComponentsPage() {
  const [manifest, setManifest] = useState<ComponentManifest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/components')
      .then((res) => res.json())
      .then((data) => {
        setManifest(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load components:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading component documentation...</p>
        </div>
      </div>
    );
  }

  if (!manifest) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600">Failed to load component documentation</p>
        </div>
      </div>
    );
  }

  return <ComponentExplorer manifest={manifest} />;
}

// ============================================================================
// Example 3: Search Integration
// ============================================================================

// lib/component-search.ts
import type { ComponentDoc } from '@/docs/ComponentExplorer';
import manifest from '@/docs/component-manifest.json';

export interface SearchFilters {
  query?: string;
  category?: 'atoms' | 'molecules' | 'organisms' | 'templates' | 'all';
  hasVariants?: boolean;
  minProps?: number;
}

export function searchComponents(filters: SearchFilters): ComponentDoc[] {
  let results = [...manifest.components];

  // Text search
  if (filters.query) {
    const query = filters.query.toLowerCase();
    results = results.filter(
      (comp) =>
        comp.name.toLowerCase().includes(query) ||
        comp.description.toLowerCase().includes(query) ||
        comp.props.some((prop) => prop.name.toLowerCase().includes(query))
    );
  }

  // Category filter
  if (filters.category && filters.category !== 'all') {
    results = results.filter((comp) => comp.category === filters.category);
  }

  // Variant filter
  if (filters.hasVariants !== undefined) {
    results = results.filter((comp) =>
      filters.hasVariants ? comp.variants.length > 0 : comp.variants.length === 0
    );
  }

  // Min props filter
  if (filters.minProps !== undefined) {
    results = results.filter((comp) => comp.props.length >= filters.minProps);
  }

  return results;
}

// Usage in component
function ComponentSearch() {
  const [query, setQuery] = useState('');
  const results = searchComponents({ query });

  return (
    <div>
      <input
        type="search"
        placeholder="Search components..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="results">
        {results.map((comp) => (
          <ComponentCard key={comp.name} component={comp} />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Example 4: Component Card Widget
// ============================================================================

// components/ComponentCard.tsx
import type { ComponentDoc } from '@/docs/ComponentExplorer';
import Link from 'next/link';

interface ComponentCardProps {
  component: ComponentDoc;
}

export function ComponentCard({ component }: ComponentCardProps) {
  const categoryColors = {
    atoms: 'bg-blue-100 text-blue-800',
    molecules: 'bg-green-100 text-green-800',
    organisms: 'bg-purple-100 text-purple-800',
    templates: 'bg-orange-100 text-orange-800',
  };

  return (
    <Link
      href={`/components/${component.name.toLowerCase()}`}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-900">{component.name}</h3>
        <span
          className={`px-2.5 py-0.5 rounded text-xs font-medium ${categoryColors[component.category]}`}
        >
          {component.category}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{component.description}</p>

      <div className="flex flex-wrap gap-2 text-sm text-gray-500">
        {component.variants.length > 0 && (
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            {component.variants.length} variants
          </span>
        )}
        <span>•</span>
        <span>{component.props.length} props</span>
        <span>•</span>
        <span>v{component.since}</span>
      </div>
    </Link>
  );
}

// ============================================================================
// Example 5: Individual Component Page
// ============================================================================

// app/components/[name]/page.tsx
import { ComponentExplorer } from '@/docs/ComponentExplorer';
import manifest from '@/docs/component-manifest.json';
import { notFound } from 'next/navigation';

interface ComponentPageProps {
  params: {
    name: string;
  };
}

export async function generateStaticParams() {
  return manifest.components.map((component) => ({
    name: component.name.toLowerCase(),
  }));
}

export default function ComponentPage({ params }: ComponentPageProps) {
  const component = manifest.components.find(
    (c) => c.name.toLowerCase() === params.name.toLowerCase()
  );

  if (!component) {
    notFound();
  }

  // Create a filtered manifest with just this component
  const singleComponentManifest = {
    ...manifest,
    components: [component],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ComponentExplorer manifest={singleComponentManifest} />
    </div>
  );
}

// ============================================================================
// Example 6: Embedded Component Showcase
// ============================================================================

// components/ComponentShowcase.tsx
import type { ComponentDoc } from '@/docs/ComponentExplorer';

interface ComponentShowcaseProps {
  componentName: string;
}

export function ComponentShowcase({ componentName }: ComponentShowcaseProps) {
  const component = manifest.components.find((c) => c.name === componentName);

  if (!component) return null;

  return (
    <div className="border border-gray-200 rounded-lg p-6 my-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">{component.name}</h3>
        <a
          href={`/components/${component.name.toLowerCase()}`}
          className="text-blue-600 hover:underline text-sm"
        >
          View full documentation →
        </a>
      </div>

      <p className="text-gray-600 mb-4">{component.description}</p>

      {component.variants.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Variants:</h4>
          <div className="flex flex-wrap gap-2">
            {component.variants.map((variant) => (
              <span
                key={variant}
                className="px-3 py-1 bg-gray-100 rounded text-sm"
              >
                {variant}
              </span>
            ))}
          </div>
        </div>
      )}

      {component.examples.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Example:</h4>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
            <code>{component.examples[0].code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

// Usage in MDX or blog post
function BlogPost() {
  return (
    <article>
      <h1>Building Better UIs with Our Component Library</h1>

      <p>
        Our Button component makes it easy to create consistent, accessible
        buttons throughout your application.
      </p>

      <ComponentShowcase componentName="Button" />

      <p>Continue reading...</p>
    </article>
  );
}

// ============================================================================
// Example 7: SEO Metadata Generation
// ============================================================================

// app/components/[name]/metadata.ts
import manifest from '@/docs/component-manifest.json';
import type { Metadata } from 'next';

export function generateMetadata({ params }: ComponentPageProps): Metadata {
  const component = manifest.components.find(
    (c) => c.name.toLowerCase() === params.name.toLowerCase()
  );

  if (!component) {
    return {
      title: 'Component Not Found',
    };
  }

  return {
    title: `${component.name} Component - UI Library`,
    description: component.description,
    keywords: [
      component.name,
      component.category,
      'React component',
      'TypeScript',
      'accessible',
      ...component.variants,
    ],
    openGraph: {
      title: `${component.name} Component`,
      description: component.description,
      type: 'website',
    },
  };
}

// ============================================================================
// Example 8: Accessibility Quick Reference
// ============================================================================

// components/A11yQuickRef.tsx
import manifest from '@/docs/component-manifest.json';

export function A11yQuickReference() {
  const componentsWithA11y = manifest.components.filter(
    (c) => Object.keys(c.accessibility).length > 0
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Accessibility Quick Reference</h2>

      <div className="space-y-6">
        {componentsWithA11y.map((component) => (
          <div key={component.name} className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">{component.name}</h3>

            {component.accessibility.ariaAttributes && (
              <div className="mb-2">
                <span className="font-medium text-sm">ARIA Attributes: </span>
                <span className="text-sm text-gray-600">
                  {component.accessibility.ariaAttributes.join(', ')}
                </span>
              </div>
            )}

            {component.accessibility.keyboardNavigation && (
              <div className="mb-2">
                <span className="font-medium text-sm">Keyboard: </span>
                <span className="text-sm text-gray-600">
                  {component.accessibility.keyboardNavigation}
                </span>
              </div>
            )}

            {component.accessibility.wcagCompliance && (
              <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                {component.accessibility.wcagCompliance}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Example 9: Component Stats Dashboard
// ============================================================================

// components/ComponentStats.tsx
import manifest from '@/docs/component-manifest.json';

export function ComponentStats() {
  const stats = {
    total: manifest.components.length,
    byCategory: {
      atoms: manifest.categories.atoms.length,
      molecules: manifest.categories.molecules.length,
      organisms: manifest.categories.organisms.length,
      templates: manifest.categories.templates.length,
    },
    withVariants: manifest.components.filter((c) => c.variants.length > 0).length,
    totalProps: manifest.components.reduce((sum, c) => sum + c.props.length, 0),
    totalExamples: manifest.components.reduce((sum, c) => sum + c.examples.length, 0),
    a11yCompliant: manifest.components.filter(
      (c) => c.accessibility.wcagCompliance
    ).length,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard title="Total Components" value={stats.total} />
      <StatCard title="Atoms" value={stats.byCategory.atoms} />
      <StatCard title="Molecules" value={stats.byCategory.molecules} />
      <StatCard title="Organisms" value={stats.byCategory.organisms} />
      <StatCard title="With Variants" value={stats.withVariants} />
      <StatCard title="Total Props" value={stats.totalProps} />
      <StatCard title="Code Examples" value={stats.totalExamples} />
      <StatCard title="A11y Compliant" value={stats.a11yCompliant} />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <div className="text-3xl font-bold text-blue-600">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{title}</div>
    </div>
  );
}

// ============================================================================
// Example 10: Export to PDF or Print
// ============================================================================

// lib/export-docs.ts
import manifest from '@/docs/component-manifest.json';

export function generatePrintableDocs(componentName?: string) {
  const components = componentName
    ? manifest.components.filter((c) => c.name === componentName)
    : manifest.components;

  return `
<!DOCTYPE html>
<html>
<head>
  <title>Component Documentation</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { border-bottom: 2px solid #333; padding-bottom: 10px; }
    h2 { color: #0066cc; margin-top: 30px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f5f5f5; }
    code { background: #f5f5f5; padding: 2px 6px; border-radius: 3px; }
    pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
    @media print {
      .no-print { display: none; }
      h1 { page-break-before: always; }
    }
  </style>
</head>
<body>
  <h1>Component Library Documentation</h1>
  <p>Generated: ${new Date().toLocaleDateString()}</p>

  ${components.map((component) => `
    <div class="component">
      <h1>${component.name}</h1>
      <p><strong>Category:</strong> ${component.category}</p>
      <p>${component.description}</p>

      <h2>Props</h2>
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${component.props.map((prop) => `
            <tr>
              <td><code>${prop.name}</code></td>
              <td><code>${prop.type}</code></td>
              <td>${prop.defaultValue || '-'}</td>
              <td>${prop.required ? 'Yes' : 'No'}</td>
              <td>${prop.description}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      ${component.variants.length > 0 ? `
        <h2>Variants</h2>
        <p>${component.variants.map((v) => `<code>${v}</code>`).join(', ')}</p>
      ` : ''}

      <h2>Accessibility</h2>
      <ul>
        ${component.accessibility.ariaAttributes ? `
          <li><strong>ARIA Attributes:</strong> ${component.accessibility.ariaAttributes.join(', ')}</li>
        ` : ''}
        ${component.accessibility.wcagCompliance ? `
          <li><strong>WCAG Compliance:</strong> ${component.accessibility.wcagCompliance}</li>
        ` : ''}
      </ul>
    </div>
  `).join('')}
</body>
</html>
  `.trim();
}

// Usage
export function DownloadDocsButton({ componentName }: { componentName?: string }) {
  const handleDownload = () => {
    const html = generatePrintableDocs(componentName);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `component-docs${componentName ? `-${componentName}` : ''}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Download Documentation
    </button>
  );
}

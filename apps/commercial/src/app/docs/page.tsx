import Link from 'next/link';

/**
 * Documentation landing page with quick start guide and navigation.
 */
export default function DocsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <section className="bg-white border-b border-neutral-200 py-12">
        <div className="container-custom">
          <h1>Documentation</h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-3xl">
            Everything you need to get started with Modular UI System.
            From installation to advanced customization.
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h2 className="mb-8">Quick Start</h2>

            {/* Installation */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Installation</h3>
              <p className="text-neutral-600 mb-4">
                Install the library using your preferred package manager:
              </p>
              <div className="bg-neutral-900 text-neutral-50 p-6 overflow-x-auto">
                <pre className="text-sm">
                  <code>{`# Using pnpm (recommended)
pnpm add @modular-ui/system

# Using npm
npm install @modular-ui/system

# Using yarn
yarn add @modular-ui/system`}</code>
                </pre>
              </div>
            </div>

            {/* Setup */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Configuration</h3>
              <p className="text-neutral-600 mb-4">
                Add the library's components to your Tailwind CSS configuration:
              </p>
              <div className="bg-neutral-900 text-neutral-50 p-6 overflow-x-auto mb-4">
                <pre className="text-sm">
                  <code>{`// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@modular-ui/system/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your config
};

export default config;`}</code>
                </pre>
              </div>
            </div>

            {/* Usage */}
            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Basic Usage</h3>
              <p className="text-neutral-600 mb-4">
                Import and use components in your application:
              </p>
              <div className="bg-neutral-900 text-neutral-50 p-6 overflow-x-auto">
                <pre className="text-sm">
                  <code>{`import { Button, Card, Input } from '@modular-ui/system';

export default function App() {
  return (
    <Card>
      <h2>Welcome</h2>
      <Input label="Email" type="email" />
      <Button variant="primary">
        Submit
      </Button>
    </Card>
  );
}`}</code>
                </pre>
              </div>
            </div>

            {/* Documentation Sections */}
            <div className="mt-16">
              <h3 className="text-xl font-semibold mb-6">Documentation Sections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {docSections.map((section, index) => (
                  <Link
                    key={index}
                    href={section.href}
                    className="p-6 bg-white border border-neutral-200 hover:border-primary-500 card-shadow transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{section.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                          {section.title}
                        </h4>
                        <p className="text-sm text-neutral-600">{section.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl">
            <h3 className="text-2xl font-semibold mb-6">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-neutral-50 border border-neutral-200">
                <h4 className="font-semibold mb-2">GitHub Discussions</h4>
                <p className="text-sm text-neutral-600 mb-4">
                  Ask questions and share ideas with the community.
                </p>
                <a href="#" className="text-sm font-medium text-primary-500 hover:text-primary-600">
                  Visit Discussions →
                </a>
              </div>
              <div className="p-6 bg-neutral-50 border border-neutral-200">
                <h4 className="font-semibold mb-2">Discord Community</h4>
                <p className="text-sm text-neutral-600 mb-4">
                  Join our Discord server for real-time support.
                </p>
                <a href="#" className="text-sm font-medium text-primary-500 hover:text-primary-600">
                  Join Discord →
                </a>
              </div>
              <div className="p-6 bg-neutral-50 border border-neutral-200">
                <h4 className="font-semibold mb-2">Report Issues</h4>
                <p className="text-sm text-neutral-600 mb-4">
                  Found a bug? Report it on GitHub Issues.
                </p>
                <a href="#" className="text-sm font-medium text-primary-500 hover:text-primary-600">
                  Open Issue →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Documentation sections
 */
const docSections = [
  {
    title: 'Getting Started',
    description: 'Installation, setup, and first steps with the library.',
    icon: '🚀',
    href: '/docs/getting-started',
  },
  {
    title: 'Components',
    description: 'Complete API reference for all components.',
    icon: '📦',
    href: '/docs/components',
  },
  {
    title: 'Theming',
    description: 'Customize colors, typography, and design tokens.',
    icon: '🎨',
    href: '/docs/theming',
  },
  {
    title: 'Accessibility',
    description: 'WCAG compliance and accessibility best practices.',
    icon: '♿',
    href: '/docs/accessibility',
  },
  {
    title: 'TypeScript',
    description: 'Type definitions and advanced TypeScript usage.',
    icon: '📘',
    href: '/docs/typescript',
  },
  {
    title: 'Migration Guide',
    description: 'Upgrade from previous versions and breaking changes.',
    icon: '🔄',
    href: '/docs/migration',
  },
];

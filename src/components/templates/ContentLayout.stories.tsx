import type { Meta, StoryObj } from '@storybook/react';
import { ContentLayout } from './ContentLayout';
import { Button } from '../atoms/button/Button';
import { Badge } from '../atoms/badge/Badge';

const meta = {
  title: 'Templates/ContentLayout',
  component: ContentLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A flexible content layout for articles, documentation, and long-form content with optional sidebar.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContentLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample Breadcrumb
const SampleBreadcrumb = () => (
  <nav className="flex gap-2 text-sm text-text-secondary">
    <a href="#" className="hover:text-text-primary">Home</a>
    <span>/</span>
    <a href="#" className="hover:text-text-primary">Documentation</a>
    <span>/</span>
    <span className="text-text-primary">Getting Started</span>
  </nav>
);

// Sample Table of Contents
const SampleTOC = () => (
  <div className="space-y-4">
    <h3 className="text-sm font-medium text-text-primary">On this page</h3>
    <nav className="space-y-2 text-sm">
      <a href="#intro" className="block text-text-secondary hover:text-interactive">
        Introduction
      </a>
      <a href="#installation" className="block text-text-secondary hover:text-interactive">
        Installation
      </a>
      <a href="#usage" className="block text-text-secondary hover:text-interactive">
        Basic Usage
      </a>
      <a href="#advanced" className="block text-text-secondary hover:text-interactive">
        Advanced Features
      </a>
      <a href="#api" className="block text-text-secondary hover:text-interactive">
        API Reference
      </a>
    </nav>
  </div>
);

// Sample Article Content
const SampleArticle = () => (
  <article className="prose prose-lg max-w-none">
    <div className="space-y-6">
      <div>
        <h2 id="intro" className="mb-4 text-2xl font-medium text-text-primary">
          Introduction
        </h2>
        <p className="text-text-secondary">
          This is a comprehensive guide to using our UI component library. Built with IBM Carbon
          Design System principles, our library provides a complete set of accessible, production-ready
          components for modern web applications.
        </p>
      </div>

      <div>
        <h2 id="installation" className="mb-4 text-2xl font-medium text-text-primary">
          Installation
        </h2>
        <p className="mb-4 text-text-secondary">
          Install the library using your preferred package manager:
        </p>
        <pre className="rounded-none border border-border-subtle bg-layer-02 p-4">
          <code className="text-sm text-text-primary">npm install @modular-ui/system</code>
        </pre>
      </div>

      <div>
        <h2 id="usage" className="mb-4 text-2xl font-medium text-text-primary">
          Basic Usage
        </h2>
        <p className="mb-4 text-text-secondary">
          Import components and start building:
        </p>
        <pre className="rounded-none border border-border-subtle bg-layer-02 p-4">
          <code className="text-sm text-text-primary">
            {`import { Button, Input } from '@modular-ui/system';

function MyComponent() {
  return (
    <>
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </>
  );
}`}
          </code>
        </pre>
      </div>

      <div>
        <h2 id="advanced" className="mb-4 text-2xl font-medium text-text-primary">
          Advanced Features
        </h2>
        <p className="text-text-secondary">
          Our component library includes advanced features like atomic design organization,
          IBM Carbon design tokens, and comprehensive accessibility support.
        </p>
      </div>

      <div>
        <h2 id="api" className="mb-4 text-2xl font-medium text-text-primary">
          API Reference
        </h2>
        <p className="text-text-secondary">
          Detailed API documentation is available in the component stories and TypeScript
          type definitions.
        </p>
      </div>
    </div>
  </article>
);

export const Documentation: Story = {
  args: {
    title: 'Getting Started',
    description: 'Learn how to use the component library',
    breadcrumb: <SampleBreadcrumb />,
    aside: <SampleTOC />,
    children: <SampleArticle />,
    asidePosition: 'right',
  },
};

export const WithActions: Story = {
  args: {
    title: 'API Documentation',
    description: 'Complete API reference for all components',
    breadcrumb: <SampleBreadcrumb />,
    actions: (
      <>
        <Badge variant="success">v2.0</Badge>
        <Button variant="outline" size="sm">
          Edit
        </Button>
        <Button variant="primary" size="sm">
          Share
        </Button>
      </>
    ),
    aside: <SampleTOC />,
    children: <SampleArticle />,
  },
};

export const LeftSidebar: Story = {
  args: {
    title: 'Documentation',
    breadcrumb: <SampleBreadcrumb />,
    aside: <SampleTOC />,
    children: <SampleArticle />,
    asidePosition: 'left',
  },
};

export const NoSidebar: Story = {
  args: {
    title: 'Article Title',
    description: 'A standalone article without sidebar navigation',
    breadcrumb: <SampleBreadcrumb />,
    children: <SampleArticle />,
  },
};

export const NarrowContent: Story = {
  args: {
    title: 'Blog Post',
    breadcrumb: <SampleBreadcrumb />,
    children: <SampleArticle />,
    maxWidth: 'max-w-4xl',
  },
};

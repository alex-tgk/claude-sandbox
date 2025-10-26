import type { Meta, StoryObj } from '@storybook/react';
import { SplitLayout } from './SplitLayout';
import { Card, CardHeader, CardBody } from '../organisms/card/Card';
import { Button } from '../atoms/button/Button';
import { Badge } from '../atoms/badge/Badge';

const meta = {
  title: 'Templates/SplitLayout',
  component: SplitLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A two-panel split layout perfect for comparison views, image galleries, or side-by-side content.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SplitLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample Image Gallery
const SampleGallery = () => (
  <div className="space-y-4">
    <h2 className="text-xl font-medium text-text-primary">Image Gallery</h2>
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="aspect-square rounded-none border border-border-subtle bg-surface-muted"
        >
          <div className="flex h-full items-center justify-center">
            <span className="text-text-placeholder">Image {i}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Sample Product Details
const SampleProductDetails = () => (
  <div className="space-y-6">
    <div>
      <Badge variant="success">In Stock</Badge>
      <h1 className="mt-2 text-3xl font-medium text-text-primary">
        Premium Wireless Headphones
      </h1>
      <p className="mt-2 text-2xl text-interactive">$299.99</p>
    </div>

    <div className="space-y-4">
      <div>
        <h3 className="mb-2 font-medium text-text-primary">Description</h3>
        <p className="text-text-secondary">
          Experience crystal-clear audio with our premium wireless headphones. Featuring
          active noise cancellation, 30-hour battery life, and premium comfort materials.
        </p>
      </div>

      <div>
        <h3 className="mb-2 font-medium text-text-primary">Features</h3>
        <ul className="list-inside list-disc space-y-1 text-text-secondary">
          <li>Active Noise Cancellation</li>
          <li>30-hour Battery Life</li>
          <li>Bluetooth 5.0</li>
          <li>Premium Leather Cushions</li>
          <li>Foldable Design</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <Button variant="primary" isFullWidth>
          Add to Cart
        </Button>
        <Button variant="outline">
          Wishlist
        </Button>
      </div>
    </div>
  </div>
);

// Sample Code Editor
const SampleCodeEditor = () => (
  <div className="h-full space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="font-medium text-text-primary">editor.tsx</h3>
      <Badge variant="info">TypeScript</Badge>
    </div>
    <pre className="h-96 overflow-auto rounded-none border border-border-subtle bg-surface p-4">
      <code className="text-sm text-text-primary">
        {`import { useState } from 'react';

export function Editor() {
  const [value, setValue] = useState('');

  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full h-full"
    />
  );
}`}
      </code>
    </pre>
  </div>
);

// Sample Preview
const SamplePreview = () => (
  <div className="h-full space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="font-medium text-text-primary">Preview</h3>
      <Button variant="outline" size="sm">
        Refresh
      </Button>
    </div>
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Component Output</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <p className="text-text-secondary">
            This is a live preview of your component. Changes in the editor
            will be reflected here.
          </p>
          <div className="rounded-none border-2 border-dashed border-border-subtle p-8 text-center">
            <span className="text-text-placeholder">Component renders here</span>
          </div>
        </div>
      </CardBody>
    </Card>
  </div>
);

export const ProductView: Story = {
  args: {
    left: <SampleGallery />,
    right: <SampleProductDetails />,
    splitRatio: 40,
  },
};

export const CodeEditorPreview: Story = {
  args: {
    left: <SampleCodeEditor />,
    right: <SamplePreview />,
    splitRatio: 50,
    leftBg: 'layer-02',
    rightBg: 'layer-01',
  },
};

export const EqualSplit: Story = {
  args: {
    left: (
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-text-primary">Option A</h2>
        <Card>
          <CardBody>
            <p className="text-text-secondary">
              Compare two options side by side to make informed decisions.
            </p>
          </CardBody>
        </Card>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-text-primary">Option B</h2>
        <Card>
          <CardBody>
            <p className="text-text-secondary">
              Use the split layout to present alternatives clearly.
            </p>
          </CardBody>
        </Card>
      </div>
    ),
    splitRatio: 50,
  },
};

export const AsymmetricSplit: Story = {
  args: {
    left: (
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-text-primary">Navigation</h2>
        <nav className="space-y-2">
          <a href="#" className="block rounded-none px-4 py-2 text-text-primary hover:bg-surface-hover">
            Section 1
          </a>
          <a href="#" className="block rounded-none px-4 py-2 text-text-primary hover:bg-surface-hover">
            Section 2
          </a>
          <a href="#" className="block rounded-none px-4 py-2 text-text-primary hover:bg-surface-hover">
            Section 3
          </a>
        </nav>
      </div>
    ),
    right: (
      <div className="space-y-4">
        <h2 className="text-xl font-medium text-text-primary">Content</h2>
        <Card>
          <CardBody>
            <p className="text-text-secondary">
              Main content area with more space allocated.
            </p>
          </CardBody>
        </Card>
      </div>
    ),
    splitRatio: 25,
  },
};

export const NoMobileStack: Story = {
  args: {
    left: <SampleGallery />,
    right: <SampleProductDetails />,
    splitRatio: 40,
    stackOnMobile: false,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { useState } from 'react';

/**
 * Badge component for labels, tags, and status indicators.
 *
 * ## Usage
 *
 * Badges are used to highlight information, display status, show counts,
 * or label content. They come in multiple variants, sizes, and styles
 * to support different use cases.
 *
 * ## Accessibility
 *
 * - Semantic `role="status"` for screen readers
 * - ARIA labels for context
 * - Keyboard accessible remove button
 * - Proper focus indicators
 * - Color with sufficient contrast (WCAG AA)
 */
const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    shape: {
      control: 'select',
      options: ['rounded', 'pill'],
      description: 'Badge shape',
    },
    dot: {
      control: 'boolean',
      description: 'Display as a small colored dot',
    },
    removable: {
      control: 'boolean',
      description: 'Show close button',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for context',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default primary badge with medium size
 */
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

/**
 * All badge variants displayed together
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

/**
 * All badge sizes displayed together
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

/**
 * Rounded and pill shapes
 */
export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge shape="rounded" variant="primary">
        Rounded
      </Badge>
      <Badge shape="pill" variant="primary">
        Pill
      </Badge>
      <Badge shape="rounded" variant="success">
        Rounded
      </Badge>
      <Badge shape="pill" variant="success">
        Pill
      </Badge>
    </div>
  ),
};

/**
 * Dot variant for status indicators
 */
export const Dots: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Badge dot variant="success" ariaLabel="Online" />
        <span className="text-sm">Online</span>
      </div>
      <div className="flex items-center gap-3">
        <Badge dot variant="warning" ariaLabel="Away" />
        <span className="text-sm">Away</span>
      </div>
      <div className="flex items-center gap-3">
        <Badge dot variant="error" ariaLabel="Offline" />
        <span className="text-sm">Offline</span>
      </div>
      <div className="flex items-center gap-3">
        <Badge dot variant="info" ariaLabel="Busy" />
        <span className="text-sm">Busy</span>
      </div>
    </div>
  ),
};

/**
 * Dot sizes
 */
export const DotSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge dot size="sm" variant="success" ariaLabel="Small dot" />
      <Badge dot size="md" variant="success" ariaLabel="Medium dot" />
      <Badge dot size="lg" variant="success" ariaLabel="Large dot" />
    </div>
  ),
};

/**
 * Removable badges with close button
 */
export const Removable: Story = {
  render: function RemovableExample() {
    const [badges, setBadges] = useState([
      { id: 1, label: 'React', variant: 'primary' as const },
      { id: 2, label: 'TypeScript', variant: 'info' as const },
      { id: 3, label: 'Tailwind', variant: 'success' as const },
      { id: 4, label: 'Vite', variant: 'warning' as const },
    ]);

    return (
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => (
          <Badge
            key={badge.id}
            variant={badge.variant}
            removable
            onRemove={() => setBadges(badges.filter((b) => b.id !== badge.id))}
          >
            {badge.label}
          </Badge>
        ))}
      </div>
    );
  },
};

/**
 * Badges with icons
 */
export const WithIcons: Story = {
  render: () => {
    const StarIcon = (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    );

    const CheckIcon = (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );

    const AlertIcon = (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    );

    return (
      <div className="flex flex-wrap gap-3">
        <Badge icon={StarIcon} variant="warning">
          Featured
        </Badge>
        <Badge icon={CheckIcon} variant="success">
          Verified
        </Badge>
        <Badge icon={AlertIcon} variant="error">
          Alert
        </Badge>
      </div>
    );
  },
};

/**
 * Notification badges with counts
 */
export const Notifications: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm">Messages</span>
        <Badge variant="error" shape="pill">
          3
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">Notifications</span>
        <Badge variant="primary" shape="pill">
          12
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm">Updates</span>
        <Badge variant="info" shape="pill">
          99+
        </Badge>
      </div>
    </div>
  ),
};

/**
 * All variants in different sizes
 */
export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Small</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary" size="sm">
            Primary
          </Badge>
          <Badge variant="secondary" size="sm">
            Secondary
          </Badge>
          <Badge variant="success" size="sm">
            Success
          </Badge>
          <Badge variant="warning" size="sm">
            Warning
          </Badge>
          <Badge variant="error" size="sm">
            Error
          </Badge>
          <Badge variant="info" size="sm">
            Info
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Medium</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary" size="md">
            Primary
          </Badge>
          <Badge variant="secondary" size="md">
            Secondary
          </Badge>
          <Badge variant="success" size="md">
            Success
          </Badge>
          <Badge variant="warning" size="md">
            Warning
          </Badge>
          <Badge variant="error" size="md">
            Error
          </Badge>
          <Badge variant="info" size="md">
            Info
          </Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Large</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary" size="lg">
            Primary
          </Badge>
          <Badge variant="secondary" size="lg">
            Secondary
          </Badge>
          <Badge variant="success" size="lg">
            Success
          </Badge>
          <Badge variant="warning" size="lg">
            Warning
          </Badge>
          <Badge variant="error" size="lg">
            Error
          </Badge>
          <Badge variant="info" size="lg">
            Info
          </Badge>
        </div>
      </div>
    </div>
  ),
};

/**
 * Status labels use case
 */
export const StatusLabels: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="w-24 text-sm">Active</span>
        <Badge variant="success" shape="pill">
          Active
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-24 text-sm">Pending</span>
        <Badge variant="warning" shape="pill">
          Pending
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-24 text-sm">Failed</span>
        <Badge variant="error" shape="pill">
          Failed
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-24 text-sm">Draft</span>
        <Badge variant="secondary" shape="pill">
          Draft
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-24 text-sm">Published</span>
        <Badge variant="info" shape="pill">
          Published
        </Badge>
      </div>
    </div>
  ),
};

/**
 * Tags use case
 */
export const Tags: Story = {
  render: function TagsExample() {
    const [tags, setTags] = useState([
      'JavaScript',
      'React',
      'TypeScript',
      'CSS',
      'HTML',
      'Node.js',
    ]);

    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            removable
            onRemove={() => setTags(tags.filter((t) => t !== tag))}
          >
            {tag}
          </Badge>
        ))}
      </div>
    );
  },
};

/**
 * Combined features example
 */
export const CombinedFeatures: Story = {
  render: () => {
    const StarIcon = (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
    );

    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge icon={StarIcon} variant="warning" shape="pill" size="lg">
            Premium
          </Badge>
          <Badge
            icon={StarIcon}
            variant="primary"
            shape="pill"
            removable
            onRemove={() => alert('Removed!')}
          >
            Featured
          </Badge>
        </div>
      </div>
    );
  },
};

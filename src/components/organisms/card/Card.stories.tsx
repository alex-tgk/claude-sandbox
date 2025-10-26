import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

/**
 * Card component - A flexible container for grouping related content.
 *
 * ## Usage
 *
 * Cards are used to group related information and actions. They can contain:
 * - Text, images, and other media
 * - Actions like buttons or links
 * - Structured content with headers, body, and footers
 *
 * ## Variants
 *
 * - **Elevated**: Card with shadow (default)
 * - **Outlined**: Card with border
 * - **Flat**: Card with subtle background
 *
 * ## Accessibility
 *
 * - Clickable cards use button semantics with role="button"
 * - Keyboard navigable with Enter and Space key support
 * - Screen reader friendly with proper ARIA attributes
 * - WCAG 2.2 AA compliant color contrast
 * - Focus indicators for keyboard navigation
 */
const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'flat'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Padding size',
    },
    hover: {
      control: 'boolean',
      description: 'Enable hover effects',
    },
    clickable: {
      control: 'boolean',
      description: 'Make card clickable with button semantics',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state (only for clickable cards)',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default card with elevated variant
 */
export const Default: Story = {
  args: {
    children: 'This is a default card with elevated styling',
  },
};

/**
 * Card with structured content using subcomponents
 */
export const WithStructure: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Card Title</h3>
        <p className="text-sm text-text-muted">Subtitle or metadata</p>
      </CardHeader>
      <CardBody>
        <p>
          This is the main content area of the card. It can contain any content
          including text, images, or other components.
        </p>
      </CardBody>
      <CardFooter>
        <button className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700">
          Action
        </button>
      </CardFooter>
    </Card>
  ),
};

/**
 * All three visual variants side by side
 */
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card variant="elevated">
        <CardHeader>
          <h4 className="font-semibold">Elevated</h4>
        </CardHeader>
        <CardBody>Card with shadow elevation</CardBody>
      </Card>
      <Card variant="outlined">
        <CardHeader>
          <h4 className="font-semibold">Outlined</h4>
        </CardHeader>
        <CardBody>Card with border outline</CardBody>
      </Card>
      <Card variant="flat">
        <CardHeader>
          <h4 className="font-semibold">Flat</h4>
        </CardHeader>
        <CardBody>Card with flat background</CardBody>
      </Card>
    </div>
  ),
};

/**
 * Different padding sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card size="sm">
        <CardHeader>
          <h4 className="font-semibold">Small</h4>
        </CardHeader>
        <CardBody>Small padding (12px)</CardBody>
      </Card>
      <Card size="md">
        <CardHeader>
          <h4 className="font-semibold">Medium</h4>
        </CardHeader>
        <CardBody>Medium padding (16px)</CardBody>
      </Card>
      <Card size="lg">
        <CardHeader>
          <h4 className="font-semibold">Large</h4>
        </CardHeader>
        <CardBody>Large padding (24px)</CardBody>
      </Card>
    </div>
  ),
};

/**
 * Cards with hover effects
 */
export const WithHover: Story = {
  render: () => (
    <div className="flex gap-4">
      <Card variant="elevated" hover>
        <CardHeader>
          <h4 className="font-semibold">Elevated + Hover</h4>
        </CardHeader>
        <CardBody>Lifts up and increases shadow on hover</CardBody>
      </Card>
      <Card variant="outlined" hover>
        <CardHeader>
          <h4 className="font-semibold">Outlined + Hover</h4>
        </CardHeader>
        <CardBody>Border color changes on hover</CardBody>
      </Card>
      <Card variant="flat" hover>
        <CardHeader>
          <h4 className="font-semibold">Flat + Hover</h4>
        </CardHeader>
        <CardBody>Shadow appears on hover</CardBody>
      </Card>
    </div>
  ),
};

/**
 * Clickable card that acts as a button
 */
export const Clickable: Story = {
  render: () => (
    <Card
      clickable
      hover
      onClick={() => alert('Card clicked!')}
    >
      <CardHeader>
        <h4 className="font-semibold">Clickable Card</h4>
      </CardHeader>
      <CardBody>
        Click anywhere on this card. Try keyboard navigation too (Tab + Enter/Space).
      </CardBody>
      <CardFooter>
        <span className="text-sm text-brand-600">Click me →</span>
      </CardFooter>
    </Card>
  ),
};

/**
 * Clickable card in disabled state
 */
export const ClickableDisabled: Story = {
  render: () => (
    <Card
      clickable
      disabled
      hover
      onClick={() => alert('This should not appear')}
    >
      <CardHeader>
        <h4 className="font-semibold">Disabled Clickable Card</h4>
      </CardHeader>
      <CardBody>
        This card is disabled and cannot be clicked.
      </CardBody>
    </Card>
  ),
};

/**
 * Product card example
 */
export const ProductCard: Story = {
  render: () => (
    <Card variant="outlined" hover className="max-w-sm">
      <CardHeader>
        <div className="aspect-video bg-surface-muted rounded-md flex items-center justify-center mb-2">
          <span className="text-text-muted">Product Image</span>
        </div>
        <h3 className="text-lg font-semibold">Premium Headphones</h3>
        <p className="text-sm text-text-muted">High-quality audio experience</p>
      </CardHeader>
      <CardBody>
        <p className="text-2xl font-bold text-brand-600">$299.99</p>
        <p className="text-sm text-text-muted mt-1">Free shipping available</p>
      </CardBody>
      <CardFooter>
        <button className="w-full px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700">
          Add to Cart
        </button>
      </CardFooter>
    </Card>
  ),
};

/**
 * User profile card example
 */
export const ProfileCard: Story = {
  render: () => (
    <Card variant="elevated" className="max-w-sm">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            JD
          </div>
          <div>
            <h3 className="text-lg font-semibold">John Doe</h3>
            <p className="text-sm text-text-muted">Software Engineer</p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <p className="text-sm">
          Passionate about building great user experiences and scalable systems.
        </p>
      </CardBody>
      <CardFooter className="flex gap-2">
        <button className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700">
          Follow
        </button>
        <button className="flex-1 px-4 py-2 border-2 border-border text-text rounded-md hover:bg-surface-muted">
          Message
        </button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Statistics card example
 */
export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card variant="flat" size="sm">
        <CardBody>
          <p className="text-sm text-text-muted">Total Users</p>
          <p className="text-3xl font-bold mt-1">1,234</p>
          <p className="text-sm text-success mt-1">↑ 12% this month</p>
        </CardBody>
      </Card>
      <Card variant="flat" size="sm">
        <CardBody>
          <p className="text-sm text-text-muted">Revenue</p>
          <p className="text-3xl font-bold mt-1">$45.2K</p>
          <p className="text-sm text-success mt-1">↑ 8% this month</p>
        </CardBody>
      </Card>
      <Card variant="flat" size="sm">
        <CardBody>
          <p className="text-sm text-text-muted">Active Now</p>
          <p className="text-3xl font-bold mt-1">89</p>
          <p className="text-sm text-text-muted mt-1">users online</p>
        </CardBody>
      </Card>
    </div>
  ),
};

/**
 * Notification card example
 */
export const NotificationCard: Story = {
  render: () => (
    <Card variant="outlined" size="sm" className="max-w-md">
      <CardBody className="flex items-start gap-3">
        <div className="w-2 h-2 bg-brand-600 rounded-full mt-2"></div>
        <div className="flex-1">
          <p className="font-semibold">New message received</p>
          <p className="text-sm text-text-muted mt-1">
            Sarah sent you a message about the project update.
          </p>
          <p className="text-xs text-text-muted mt-2">2 minutes ago</p>
        </div>
      </CardBody>
    </Card>
  ),
};

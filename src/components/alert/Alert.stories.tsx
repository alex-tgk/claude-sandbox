import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { useState } from 'react';

/**
 * Alert component - Display important messages with various severity levels.
 *
 * ## Usage
 *
 * Alerts are used to communicate important information to users. They support different
 * variants to indicate the type of message (info, success, warning, error) and can include
 * titles, descriptions, icons, and action buttons.
 *
 * ## Features
 *
 * - **Four variants**: info, success, warning, error
 * - **Title and description**: Clear hierarchy for message content
 * - **Dismissible**: Optional close button with smooth animations
 * - **Icons**: Auto-selected based on variant or fully customizable
 * - **Action buttons**: Add custom actions to alerts
 * - **Accessible**: ARIA attributes, keyboard navigation, screen reader support
 *
 * ## Accessibility
 *
 * - Uses role="alert" for screen reader announcements
 * - aria-live regions: "polite" for info/success, "assertive" for warning/error
 * - Keyboard navigable dismiss button
 * - Properly labeled icons and buttons
 * - WCAG 2.2 AA compliant color contrast
 */
const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual variant of the alert',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    description: {
      control: 'text',
      description: 'Alert description or content',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showIcon: {
      control: 'boolean',
      description: 'Whether to show an icon',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    'aria-live': {
      control: 'select',
      options: ['polite', 'assertive'],
      description: 'Urgency level for screen readers',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default info alert with basic content.
 */
export const Default: Story = {
  args: {
    children: 'This is an informational alert message.',
  },
};

/**
 * Info variant - Use for general information and tips.
 */
export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Did you know?',
    description: 'You can customize your dashboard layout by dragging and dropping widgets.',
  },
};

/**
 * Success variant - Use for positive feedback and confirmations.
 */
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your changes have been saved successfully.',
  },
};

/**
 * Warning variant - Use for important cautionary messages.
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'This action cannot be undone. Please review before proceeding.',
  },
};

/**
 * Error variant - Use for errors and critical issues.
 */
export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'Failed to save changes. Please try again.',
  },
};

/**
 * Dismissible alert with close button.
 */
export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'New Feature',
    description: 'Check out our new analytics dashboard!',
    dismissible: true,
  },
};

/**
 * Alert with custom action button.
 */
export const WithAction: Story = {
  args: {
    variant: 'warning',
    title: 'Update Available',
    description: 'A new version of the application is available.',
    action: (
      <button
        type="button"
        className="rounded bg-yellow-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-yellow-700"
      >
        Update Now
      </button>
    ),
  },
};

/**
 * Alert with both action and dismiss button.
 */
export const WithActionAndDismiss: Story = {
  args: {
    variant: 'success',
    title: 'Trial Extended',
    description: 'Your trial has been extended by 7 days.',
    dismissible: true,
    action: (
      <button
        type="button"
        className="rounded bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700"
      >
        Upgrade
      </button>
    ),
  },
};

/**
 * Alert without an icon.
 */
export const NoIcon: Story = {
  args: {
    variant: 'info',
    title: 'Clean and Simple',
    description: 'This alert has no icon for a cleaner look.',
    showIcon: false,
  },
};

/**
 * Alert with only a title.
 */
export const TitleOnly: Story = {
  args: {
    variant: 'success',
    title: 'Changes saved',
  },
};

/**
 * Alert with only description (no title).
 */
export const DescriptionOnly: Story = {
  args: {
    variant: 'info',
    description: 'This is an alert with just a description and no title.',
  },
};

/**
 * Alert with custom icon.
 */
export const CustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'Custom Icon',
    description: 'This alert uses a custom rocket icon instead of the default.',
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
};

/**
 * Long content example showing how alerts handle overflow.
 */
export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: 'Important Security Notice',
    description:
      'We have detected unusual activity on your account from an unfamiliar location. If this was not you, please change your password immediately and review your recent account activity. We recommend enabling two-factor authentication for enhanced security. You can do this by visiting your account settings and following the security setup wizard.',
    dismissible: true,
  },
};

/**
 * Multiple alerts stacked vertically.
 */
export const MultipleAlerts: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="error" title="Error" description="Failed to load user data." dismissible />
      <Alert variant="warning" title="Warning" description="Your session will expire soon." />
      <Alert variant="info" title="Info" description="New features are now available." />
      <Alert variant="success" title="Success" description="Profile updated successfully." />
    </div>
  ),
};

/**
 * All variants displayed together for comparison.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        variant="info"
        title="Information"
        description="This is an informational message."
      />
      <Alert
        variant="success"
        title="Success"
        description="This is a success message."
      />
      <Alert
        variant="warning"
        title="Warning"
        description="This is a warning message."
      />
      <Alert
        variant="error"
        title="Error"
        description="This is an error message."
      />
    </div>
  ),
};

/**
 * Interactive example showing dismiss animation.
 */
export const DismissAnimation: Story = {
  render: () => {
    const DismissExample = () => {
      const [visible, setVisible] = useState(true);

      return (
        <div className="space-y-4">
          {visible && (
            <Alert
              variant="info"
              title="Dismissible Alert"
              description="Click the X button to see the smooth dismiss animation."
              dismissible
              onDismiss={() => setVisible(false)}
            />
          )}
          {!visible && (
            <button
              type="button"
              onClick={() => setVisible(true)}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Show Alert Again
            </button>
          )}
        </div>
      );
    };

    return <DismissExample />;
  },
};

/**
 * Complex example with rich content and actions.
 */
export const ComplexExample: Story = {
  render: () => (
    <Alert
      variant="warning"
      title="Payment Method Expiring"
      description="Your credit card ending in 4242 will expire at the end of this month."
      dismissible
      action={
        <button
          type="button"
          className="rounded bg-yellow-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-yellow-700"
        >
          Update Card
        </button>
      }
    />
  ),
};

/**
 * Minimal alert without title or icon.
 */
export const Minimal: Story = {
  args: {
    variant: 'success',
    description: 'Copied to clipboard',
    showIcon: false,
  },
};

/**
 * Alert with custom aria-live for screen readers.
 */
export const CustomAriaLive: Story = {
  args: {
    variant: 'info',
    title: 'Assertive Announcement',
    description: 'This info alert uses assertive aria-live for immediate announcement.',
    'aria-live': 'assertive',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';
import { Button } from '../../atoms/button/Button';

const meta = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'informative', 'positive', 'destructive'],
      description: 'Visual tone for the surface and accent colors',
    },
    layout: {
      control: 'select',
      options: ['centered', 'split'],
      description: 'Switch between stacked and split layouts',
    },
    dense: {
      control: 'boolean',
      description: 'Reduce padding/gaps for compact spaces',
    },
    hideMedia: {
      control: 'boolean',
      description: 'Hide the hero media slot entirely',
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

const ReportsIllustration = () => (
  <svg viewBox="0 0 120 96" className="h-24 w-32" role="img" aria-hidden="true">
    <rect x="8" y="16" width="104" height="64" rx="10" fill="currentColor" opacity="0.08" />
    <rect x="24" y="32" width="20" height="32" rx="4" fill="currentColor" opacity="0.4" />
    <rect x="52" y="40" width="20" height="24" rx="4" fill="currentColor" opacity="0.5" />
    <rect x="80" y="24" width="20" height="40" rx="4" fill="currentColor" opacity="0.7" />
    <circle cx="96" cy="20" r="8" fill="currentColor" opacity="0.45" />
  </svg>
);

/**
 * Default empty state for fresh experiences.
 */
export const Default: Story = {
  args: {
    eyebrow: 'No projects yet',
    title: 'Spin up your first workspace',
    description: 'Create a workspace to invite collaborators, share prompts, and track fine-tunes.',
    primaryAction: <Button>New workspace</Button>,
    secondaryAction: (
      <Button variant="ghost" startIcon={<span aria-hidden="true">+</span>}>
        Import data
      </Button>
    ),
  },
};

/**
 * Showcase the split layout with a custom media illustration.
 */
export const SplitLayout: Story = {
  args: {
    layout: 'split',
    tone: 'informative',
    eyebrow: 'Insights',
    title: 'Build richer analytics',
    description: 'Automate weekly digests and share live dashboards with stakeholders in a click.',
    media: <ReportsIllustration />,
    primaryAction: (
      <Button>
        Launch dashboard
      </Button>
    ),
    secondaryAction: (
      <Button variant="ghost">
        View templates
      </Button>
    ),
  },
};

/**
 * Positive tone with additional guidance content.
 */
export const PositiveWithChecklist: Story = {
  args: {
    tone: 'positive',
    title: 'You’re all caught up',
    description: 'There are no pending reviews. Keep the momentum going with proactive outreach.',
    children: (
      <ul className="list-inside list-disc text-left">
        <li>Schedule a retro to celebrate wins</li>
        <li>Share highlights with the team</li>
      </ul>
    ),
    primaryAction: (
      <Button variant="secondary">
        Share recap
      </Button>
    ),
  },
};

/**
 * Destructive tone for error and recovery states.
 */
export const DestructiveRecovery: Story = {
  args: {
    tone: 'destructive',
    eyebrow: 'Something broke',
    title: 'We couldn’t load your automations',
    description: 'The workflow endpoint is unreachable. Check your network settings or try again later.',
    primaryAction: (
      <Button variant="danger">
        Retry request
      </Button>
    ),
    secondaryAction: (
      <Button variant="ghost">
        Contact support
      </Button>
    ),
  },
};

/**
 * Dense layout without media for sidebars or cards.
 */
export const DenseMinimal: Story = {
  args: {
    dense: true,
    hideMedia: true,
    title: 'Need custom roles?',
    description: 'Upgrade to Enterprise to unlock unlimited seats, custom roles, and audit exports.',
    primaryAction: (
      <Button size="sm">
        Talk to sales
      </Button>
    ),
  },
};

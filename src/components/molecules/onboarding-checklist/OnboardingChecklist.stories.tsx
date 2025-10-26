import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingChecklist, type OnboardingChecklistItem } from './OnboardingChecklist';
import { Button } from '../../atoms/button/Button';

const baseItems: OnboardingChecklistItem[] = [
  {
    id: 'profile',
    title: 'Complete your workspace profile',
    description: 'Add branding, upload a logo, and set a friendly description for teammates.',
    badge: '2 min',
    completed: true,
  },
  {
    id: 'connections',
    title: 'Connect data sources',
    description: 'Link Postgres, BigQuery, or upload CSVs to unlock analysis workflows.',
    badge: '5 min',
  },
  {
    id: 'automation',
    title: 'Publish your first automation',
    description: 'Ship a recurring summary or trigger fine-tunes with our scheduler.',
  },
];

const meta = {
  title: 'Molecules/OnboardingChecklist',
  component: OnboardingChecklist,
  tags: ['autodocs'],
  argTypes: {
    accent: {
      control: 'select',
      options: ['purple', 'blue', 'teal', 'amber'],
      description: 'Accent palette for progress indicators',
    },
    dense: {
      control: 'boolean',
      description: 'Reduce padding for compact surfaces',
    },
  },
} satisfies Meta<typeof OnboardingChecklist>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: baseItems,
    heading: 'Launch checklist',
    subheading: '3 steps to activate collaborative analytics.',
    footer: <Button>Continue setup</Button>,
  },
};

export const TealAllDone: Story = {
  args: {
    items: baseItems.map((item) => ({ ...item, completed: true })),
    accent: 'teal',
    heading: 'Everything looks perfect',
    subheading: 'You can always revisit onboarding from Settings.',
  },
};

export const CompactCard: Story = {
  args: {
    items: baseItems,
    dense: true,
    accent: 'amber',
    heading: 'Billing tasks',
    subheading: 'Keep finance in the loop before launch.',
    footer: (
      <Button variant="secondary" size="sm">
        Assign owner
      </Button>
    ),
  },
};

export const EmptyStateChecklist: Story = {
  args: {
    items: [],
    heading: 'No tasks yet',
    subheading: 'Create tasks in the admin panel to guide each workspace.',
    footer: (
      <Button variant="outline">
        Add task
      </Button>
    ),
  },
};

export const WithInlineActions: Story = {
  args: {
    heading: 'Security essentials',
    accent: 'blue',
    items: [
      {
        id: 'mfa',
        title: 'Require MFA for everyone',
        description: 'Enforce WebAuthn keys or TOTP for admins and builders.',
        completed: false,
        action: (
          <Button variant="ghost" size="sm">
            Update policy
          </Button>
        ),
      },
      {
        id: 'scim',
        title: 'SCIM provisioning',
        description: 'Sync accounts from Okta, Azure AD, or Rippling.',
        completed: true,
      },
      {
        id: 'audit',
        title: 'Ship audit exports',
        description: 'Schedule weekly exports to your SIEM.',
        completed: false,
        action: (
          <Button variant="ghost" size="sm">
            Configure
          </Button>
        ),
      },
    ],
  },
};

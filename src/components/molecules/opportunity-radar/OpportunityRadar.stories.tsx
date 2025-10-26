import type { Meta, StoryObj } from '@storybook/react';
import { OpportunityRadar, type OpportunityRadarItem } from './OpportunityRadar';
import { Button } from '../../atoms/button/Button';

const items: OpportunityRadarItem[] = [
  {
    id: 'benchmarks',
    label: 'Shared benchmark gallery',
    description: 'Publish reusable eval suites so PMs can track shipping velocity.',
    impact: 'high',
    confidence: 0.86,
    owner: 'Dana (Research)',
    tag: 'Retention',
    trend: 'up',
  },
  {
    id: 'assistants',
    label: 'Assistant handoffs',
    description: 'Let humans resume agent conversations with full provenance.',
    impact: 'medium',
    confidence: 0.74,
    owner: 'Marco (AI Ops)',
    tag: 'Trust',
    trend: 'steady',
  },
  {
    id: 'orchestration',
    label: 'Workflow orchestration API',
    description: 'Graph builder for stitching models, tools, and guardrails.',
    impact: 'high',
    confidence: 0.64,
    owner: 'Priya (Platform)',
    tag: 'Enterprise',
    trend: 'up',
  },
  {
    id: 'insights',
    label: 'Insight digest 2.0',
    description: 'Daily narratives that summarize anomalies and forecasts.',
    impact: 'medium',
    confidence: 0.52,
    owner: 'Noah (Insights)',
    tag: 'Adoption',
    trend: 'down',
  },
  {
    id: 'controls',
    label: 'Auditable control center',
    description: 'Full trace of who edited prompts, policies, and connectors.',
    impact: 'high',
    confidence: 0.91,
    owner: 'Mia (Security)',
    tag: 'Compliance',
    trend: 'up',
  },
];

const meta = {
  title: 'Examples/OpportunityRadar',
  component: OpportunityRadar,
  tags: ['autodocs'],
  argTypes: {
    eyebrow: {
      control: 'text',
      description: 'Eyebrow copy rendered above the heading',
    },
    spotlightValue: {
      control: 'text',
      description: 'Hero metric value',
    },
  },
} satisfies Meta<typeof OpportunityRadar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: 'Signal radar',
    title: 'Next-build opportunities',
    subtitle: 'ML research, product, and GTM feeds merge here so the roadmap reflects real-world momentum.',
    spotlightLabel: 'Conviction index',
    spotlightValue: '92',
    spotlightChange: '+12% vs last sprint',
    items,
    primaryAction: <Button variant="primary">Open prioritization</Button>,
    secondaryAction: (
      <Button variant="ghost" size="sm">
        Share snapshot
      </Button>
    ),
  },
};

export const Minimal: Story = {
  args: {
    title: 'Backlog insights',
    items: items.slice(0, 3),
    spotlightValue: '71',
    spotlightChange: '+4% QoQ',
    primaryAction: (
      <Button variant="secondary" size="sm">
        Export CSV
      </Button>
    ),
  },
};

export const EmptyState: Story = {
  args: {
    title: 'No signals yet',
    subtitle: 'Connect product analytics or import qualitative research to populate this radar.',
    items: [],
    primaryAction: (
      <Button>
        Connect sources
      </Button>
    ),
  },
};

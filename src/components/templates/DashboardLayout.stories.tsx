import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from './DashboardLayout';
import { Button } from '../atoms/button/Button';
import { Badge } from '../atoms/badge/Badge';
import { Card, CardHeader, CardBody } from '../organisms/card/Card';

const meta = {
  title: 'Templates/DashboardLayout',
  component: DashboardLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A complete dashboard layout with sidebar, header, and main content area. Perfect for admin panels and data-driven applications.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DashboardLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample Navigation Component
const SampleNav = () => (
  <nav className="flex flex-col gap-2 p-4">
    <a href="#" className="rounded-none px-4 py-2 text-sm text-text-primary hover:bg-surface-hover">
      Dashboard
    </a>
    <a href="#" className="rounded-none px-4 py-2 text-sm text-text-primary hover:bg-surface-hover">
      Analytics
    </a>
    <a href="#" className="rounded-none px-4 py-2 text-sm text-text-primary hover:bg-surface-hover">
      Reports
    </a>
    <a href="#" className="rounded-none px-4 py-2 text-sm text-text-primary hover:bg-surface-hover">
      Settings
    </a>
  </nav>
);

// Sample Header Component
const SampleHeader = () => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-xl font-medium text-text-primary">Dashboard</h1>
      <p className="text-sm text-text-secondary">Welcome back, Admin</p>
    </div>
    <div className="flex gap-3">
      <Badge variant="info">3 New</Badge>
      <Button variant="primary" size="sm">
        New Report
      </Button>
    </div>
  </div>
);

// Sample Content Component
const SampleContent = () => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Total Users</h3>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-medium text-interactive">24,532</p>
          <p className="text-sm text-success">+12.5% from last month</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Revenue</h3>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-medium text-interactive">$45,231</p>
          <p className="text-sm text-success">+8.2% from last month</p>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Active Sessions</h3>
        </CardHeader>
        <CardBody>
          <p className="text-3xl font-medium text-interactive">573</p>
          <p className="text-sm text-text-secondary">Current</p>
        </CardBody>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Recent Activity</h3>
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <div>
              <p className="font-medium text-text-primary">New user registered</p>
              <p className="text-sm text-text-secondary">john@example.com</p>
            </div>
            <span className="text-sm text-text-secondary">2m ago</span>
          </div>
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <div>
              <p className="font-medium text-text-primary">Report generated</p>
              <p className="text-sm text-text-secondary">Monthly Analytics</p>
            </div>
            <span className="text-sm text-text-secondary">15m ago</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-text-primary">System update</p>
              <p className="text-sm text-text-secondary">Version 2.1.0 deployed</p>
            </div>
            <span className="text-sm text-text-secondary">1h ago</span>
          </div>
        </div>
      </CardBody>
    </Card>
  </div>
);

export const Default: Story = {
  args: {
    header: <SampleHeader />,
    sidebar: <SampleNav />,
    children: <SampleContent />,
  },
};

export const CollapsedSidebar: Story = {
  args: {
    header: <SampleHeader />,
    sidebar: <SampleNav />,
    children: <SampleContent />,
    isSidebarCollapsed: true,
  },
};

export const NoHeader: Story = {
  args: {
    sidebar: <SampleNav />,
    children: <SampleContent />,
  },
};

export const NoSidebar: Story = {
  args: {
    header: <SampleHeader />,
    children: <SampleContent />,
  },
};

export const MinimalContent: Story = {
  args: {
    header: <SampleHeader />,
    sidebar: <SampleNav />,
    children: (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-text-primary">No Data Available</h2>
          <p className="mt-2 text-text-secondary">Start by creating your first report</p>
          <Button variant="primary" className="mt-4">
            Create Report
          </Button>
        </div>
      </div>
    ),
  },
};

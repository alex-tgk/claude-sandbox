import type { Meta, StoryObj } from '@storybook/react';
import { NotificationToast } from './NotificationToast';

const meta = {
  title: 'Molecules/NotificationToast',
  component: NotificationToast,
  tags: ['autodocs'],
  args: {
    title: 'Workspace created',
    description: 'You can now invite collaborators and start building.',
    variant: 'info',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
  },
} satisfies Meta<typeof NotificationToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Stack: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <NotificationToast title="Saved" description="Draft saved" variant="success" />
      <NotificationToast title="Heads up" description="Trial expires soon" variant="warning" />
      <NotificationToast title="Sync failed" description="Try again later" variant="danger" />
    </div>
  ),
};

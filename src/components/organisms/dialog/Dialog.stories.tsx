import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog } from './Dialog';
import { Button } from '../../atoms/button/Button';

/**
 * Dialog component for modal interactions.
 *
 * ## Usage
 *
 * Dialogs interrupt users with critical information or actions. They should
 * be used sparingly and only when user attention is required.
 *
 * ## Accessibility
 *
 * - Focus is trapped within the dialog
 * - Focus returns to trigger element on close
 * - Escape key closes the dialog (configurable)
 * - Backdrop click closes the dialog (configurable)
 * - ARIA roles and attributes properly set
 * - Body scroll locked when dialog is open
 */
const meta = {
  title: 'Organisms/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Dialog size',
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Close on backdrop click',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close on Escape key',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button',
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic dialog example
 */
export const Default: Story = {
  render: function DefaultDialog() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Dialog Title"
          description="This is a description of what the dialog is about."
        >
          <p className="text-text-muted">
            This is the dialog content. You can put any React components here.
          </p>
        </Dialog>
      </>
    );
  },
};

/**
 * Confirmation dialog with actions
 */
export const ConfirmationDialog: Story = {
  render: function ConfirmationExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Account
        </Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        >
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                alert('Account deleted!');
                setIsOpen(false);
              }}
            >
              Yes, delete account
            </Button>
          </div>
        </Dialog>
      </>
    );
  },
};

/**
 * Different dialog sizes
 */
export const Sizes: Story = {
  render: function SizesExample() {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full' | null>(null);

    return (
      <>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={() => setSize('sm')}>
            Small
          </Button>
          <Button size="sm" onClick={() => setSize('md')}>
            Medium
          </Button>
          <Button size="sm" onClick={() => setSize('lg')}>
            Large
          </Button>
          <Button size="sm" onClick={() => setSize('xl')}>
            Extra Large
          </Button>
          <Button size="sm" onClick={() => setSize('full')}>
            Full
          </Button>
        </div>

        {size && (
          <Dialog
            isOpen={true}
            onClose={() => setSize(null)}
            title={`${size.toUpperCase()} Dialog`}
            size={size}
          >
            <p>This is a {size} dialog.</p>
          </Dialog>
        )}
      </>
    );
  },
};

/**
 * Form dialog example
 */
export const FormDialog: Story = {
  render: function FormExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Add User</Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Add New User"
          description="Enter the details of the new user."
          size="lg"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Form submitted!');
              setIsOpen(false);
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 block w-full rounded-md border border-border bg-surface px-3 py-2 text-text focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full rounded-md border border-border bg-surface px-3 py-2 text-text focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-text">
                Role
              </label>
              <select
                id="role"
                className="mt-1 block w-full rounded-md border border-border bg-surface px-3 py-2 text-text focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option>Admin</option>
                <option>User</option>
                <option>Guest</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Add User
              </Button>
            </div>
          </form>
        </Dialog>
      </>
    );
  },
};

/**
 * Dialog without close button
 */
export const NoCloseButton: Story = {
  render: function NoCloseButtonExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Important Notice"
          description="You must acknowledge this message to continue."
          showCloseButton={false}
          closeOnBackdropClick={false}
          closeOnEscape={false}
        >
          <p className="text-text-muted">
            This dialog requires explicit acknowledgment. You cannot close it by clicking outside
            or pressing Escape.
          </p>
          <div className="mt-6">
            <Button onClick={() => setIsOpen(false)} isFullWidth>
              I Understand
            </Button>
          </div>
        </Dialog>
      </>
    );
  },
};

/**
 * Scrollable content dialog
 */
export const ScrollableContent: Story = {
  render: function ScrollableExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Scrollable Dialog</Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Terms and Conditions"
          description="Please read the following terms carefully."
        >
          <div className="max-h-96 overflow-y-auto">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="mb-4 text-text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
              </p>
            ))}
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setIsOpen(false)}>Accept</Button>
          </div>
        </Dialog>
      </>
    );
  },
};

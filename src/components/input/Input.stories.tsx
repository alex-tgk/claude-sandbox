import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

/**
 * Input component for text entry.
 *
 * ## Usage
 *
 * Inputs allow users to enter text data. They support labels, helper text,
 * error messages, and adornments for enhanced UX.
 *
 * ## Accessibility
 *
 * - Labels are properly associated with inputs
 * - Helper/error text linked via aria-describedby
 * - Required state communicated via aria-required
 * - Error state communicated via aria-invalid
 * - Keyboard navigable and screen reader friendly
 */
const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Whether input takes full width',
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether input is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default input with label
 */
export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

/**
 * Input with helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'Username must be at least 3 characters',
  },
};

/**
 * Input with error message
 */
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

/**
 * Required input field
 */
export const Required: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    isRequired: true,
    helperText: 'Password is required',
  },
};

/**
 * Disabled input
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit this',
    disabled: true,
    value: 'This field is disabled',
  },
};

/**
 * All input sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Small" size="sm" placeholder="Small input" />
      <Input label="Medium" size="md" placeholder="Medium input" />
      <Input label="Large" size="lg" placeholder="Large input" />
    </div>
  ),
};

/**
 * Input with start adornment (icon)
 */
export const WithStartAdornment: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    startAdornment: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16ZM19 19l-4.35-4.35"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

/**
 * Input with end adornment (icon)
 */
export const WithEndAdornment: Story = {
  args: {
    label: 'Amount',
    type: 'number',
    placeholder: '0.00',
    endAdornment: <span className="text-sm font-medium">USD</span>,
  },
};

/**
 * Full width input
 */
export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    placeholder: 'This input takes the full width',
    isFullWidth: true,
  },
};

/**
 * Different input types
 */
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Text" type="text" placeholder="Text input" />
      <Input label="Email" type="email" placeholder="email@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Input label="Number" type="number" placeholder="123" />
      <Input label="Tel" type="tel" placeholder="+1 (555) 000-0000" />
      <Input label="URL" type="url" placeholder="https://example.com" />
      <Input label="Date" type="date" />
      <Input label="Time" type="time" />
    </div>
  ),
};

/**
 * Form example with validation states
 */
export const FormExample: Story = {
  render: () => (
    <div className="space-y-4">
      <Input
        label="Name"
        placeholder="John Doe"
        isRequired
        variant="success"
        helperText="Looks good!"
        value="John Doe"
      />
      <Input
        label="Email"
        type="email"
        placeholder="email@example.com"
        isRequired
        error="Please enter a valid email address"
        value="invalid-email"
      />
      <Input
        label="Phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
        helperText="We'll never share your phone number"
      />
      <Input
        label="Website"
        type="url"
        placeholder="https://example.com"
      />
    </div>
  ),
};

/**
 * Controlled input example
 */
export const Controlled: Story = {
  render: function ControlledExample() {
    const [value, setValue] = React.useState('');

    return (
      <div className="space-y-4">
        <Input
          label="Controlled Input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
          helperText={`Character count: ${value.length}`}
        />
        <p className="text-sm text-text-muted">
          Current value: <code className="rounded bg-surface-muted px-1">{value || '(empty)'}</code>
        </p>
      </div>
    );
  },
};

// Import React for Controlled story
import * as React from 'react';

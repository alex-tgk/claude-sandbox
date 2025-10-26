import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

/**
 * Switch component - A toggle switch for binary on/off states.
 *
 * ## Features
 *
 * - Controlled and uncontrolled modes
 * - Three sizes: sm, md, lg
 * - Three variants: primary, secondary, success
 * - Label positioning (left or right)
 * - Disabled state support
 * - Smooth animations
 * - Form integration
 *
 * ## Usage
 *
 * ### Uncontrolled
 * ```tsx
 * <Switch label="Enable notifications" defaultChecked />
 * ```
 *
 * ### Controlled
 * ```tsx
 * const [enabled, setEnabled] = useState(false);
 * <Switch checked={enabled} onChange={setEnabled} label="Enable notifications" />
 * ```
 *
 * ## Accessibility
 *
 * - Uses `role="switch"` with `aria-checked`
 * - Keyboard navigable (Space key to toggle)
 * - Screen reader friendly with proper labels
 * - WCAG 2.2 AA compliant
 * - Visible focus indicators
 */
const meta = {
  title: 'Atoms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the switch',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the switch is required',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default switch with a label
 */
export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

/**
 * Switch without a label (requires aria-label)
 */
export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Toggle feature',
  },
};

/**
 * Checked by default (uncontrolled)
 */
export const DefaultChecked: Story = {
  args: {
    label: 'Enable notifications',
    defaultChecked: true,
  },
};

/**
 * Controlled switch example
 */
export const Controlled: Story = {
  render: function ControlledExample() {
    const [checked, setChecked] = useState(false);
    return (
      <div className="space-y-4">
        <Switch
          label="Enable notifications"
          checked={checked}
          onChange={setChecked}
        />
        <div className="text-sm text-text-muted">
          Status: {checked ? 'Enabled' : 'Disabled'}
        </div>
      </div>
    );
  },
};

/**
 * All size variants
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Small switch" size="sm" />
      <Switch label="Medium switch (default)" size="md" />
      <Switch label="Large switch" size="lg" />
    </div>
  ),
};

/**
 * All visual variants
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Primary variant (default)" variant="primary" defaultChecked />
      <Switch label="Secondary variant" variant="secondary" defaultChecked />
      <Switch label="Success variant" variant="success" defaultChecked />
    </div>
  ),
};

/**
 * Label positioning options
 */
export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Label on the right (default)" labelPosition="right" />
      <Switch label="Label on the left" labelPosition="left" />
    </div>
  ),
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Disabled unchecked" disabled />
      <Switch label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

/**
 * Required field indicator
 */
export const Required: Story = {
  args: {
    label: 'Accept terms and conditions',
    isRequired: true,
  },
};

/**
 * Form integration example
 */
export const FormIntegration: Story = {
  render: function FormExample() {
    const [formData, setFormData] = useState({
      notifications: false,
      marketing: false,
      darkMode: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(JSON.stringify(formData, null, 2));
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <Switch
            label="Email notifications"
            name="notifications"
            checked={formData.notifications}
            onChange={(checked) => setFormData({ ...formData, notifications: checked })}
          />
          <Switch
            label="Marketing emails"
            name="marketing"
            checked={formData.marketing}
            onChange={(checked) => setFormData({ ...formData, marketing: checked })}
          />
          <Switch
            label="Dark mode"
            name="darkMode"
            checked={formData.darkMode}
            onChange={(checked) => setFormData({ ...formData, darkMode: checked })}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
        >
          Save Settings
        </button>
      </form>
    );
  },
};

/**
 * Combined example with different configurations
 */
export const Playground: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Notification Settings</h3>
        <Switch
          label="Push notifications"
          variant="primary"
          size="md"
          defaultChecked
        />
        <Switch
          label="Email notifications"
          variant="primary"
          size="md"
        />
        <Switch
          label="SMS notifications"
          variant="primary"
          size="md"
          disabled
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Privacy Settings</h3>
        <Switch
          label="Public profile"
          variant="secondary"
          size="sm"
          labelPosition="left"
        />
        <Switch
          label="Show online status"
          variant="secondary"
          size="sm"
          labelPosition="left"
          defaultChecked
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Required Settings</h3>
        <Switch
          label="Accept terms and conditions"
          variant="success"
          size="lg"
          isRequired
        />
      </div>
    </div>
  ),
};

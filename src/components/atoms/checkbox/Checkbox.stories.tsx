import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

/**
 * Checkbox component for binary selections.
 *
 * ## Usage
 *
 * Checkboxes allow users to select one or more options from a set, or toggle a single option on or off.
 * They come in multiple variants and sizes to support different use cases.
 *
 * ## Accessibility
 *
 * - Keyboard navigable with Tab
 * - Toggleable with Space
 * - Clear focus indicators
 * - Proper label association
 * - ARIA attributes for states
 * - WCAG 2.2 AA compliant
 */
const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Checkbox size',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below checkbox',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state',
    },
    isRequired: {
      control: 'boolean',
      description: 'Required field indicator',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default checkbox with medium size and primary variant
 */
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

/**
 * All checkbox variants displayed together
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Primary variant" variant="primary" />
      <Checkbox label="Secondary variant" variant="secondary" />
      <Checkbox label="Success variant" variant="success" />
      <Checkbox label="Error variant" variant="error" />
    </div>
  ),
};

/**
 * All checkbox sizes displayed together
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Small checkbox" size="sm" />
      <Checkbox label="Medium checkbox" size="md" />
      <Checkbox label="Large checkbox" size="lg" />
    </div>
  ),
};

/**
 * Checked state
 */
export const Checked: Story = {
  args: {
    label: 'I agree',
    defaultChecked: true,
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
      <Checkbox label="Disabled indeterminate" disabled indeterminate />
    </div>
  ),
};

/**
 * Indeterminate state - useful for "select all" scenarios
 */
export const Indeterminate: Story = {
  args: {
    label: 'Select all',
    indeterminate: true,
  },
};

/**
 * With helper text
 */
export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'We will send you updates about new features',
  },
};

/**
 * With error message
 */
export const WithError: Story = {
  args: {
    label: 'I agree to the terms',
    error: 'You must agree to continue',
    isRequired: true,
  },
};

/**
 * Required field
 */
export const Required: Story = {
  args: {
    label: 'Required field',
    isRequired: true,
  },
};

/**
 * Without label - checkbox only
 */
export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Accept terms',
  },
};

/**
 * Controlled checkbox example
 */
export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [checked, setChecked] = useState(false);

      return (
        <div className="flex flex-col gap-4">
          <Checkbox
            label="Controlled checkbox"
            checked={checked}
            onCheckedChange={setChecked}
          />
          <p className="text-sm text-text-muted">
            Checkbox is {checked ? 'checked' : 'unchecked'}
          </p>
          <button
            onClick={() => setChecked(!checked)}
            className="w-fit rounded bg-brand-600 px-4 py-2 text-white"
          >
            Toggle from outside
          </button>
        </div>
      );
    };

    return <ControlledExample />;
  },
};

/**
 * Indeterminate "Select All" example
 */
export const SelectAllExample: Story = {
  render: () => {
    const SelectAllExample = () => {
      const [items, setItems] = useState([
        { id: 1, label: 'Item 1', checked: false },
        { id: 2, label: 'Item 2', checked: false },
        { id: 3, label: 'Item 3', checked: false },
      ]);

      const checkedCount = items.filter((item) => item.checked).length;
      const allChecked = checkedCount === items.length;
      const someChecked = checkedCount > 0 && checkedCount < items.length;

      const handleSelectAll = (checked: boolean) => {
        setItems(items.map((item) => ({ ...item, checked })));
      };

      const handleItemChange = (id: number, checked: boolean) => {
        setItems(items.map((item) => (item.id === id ? { ...item, checked } : item)));
      };

      return (
        <div className="flex flex-col gap-3 rounded border border-border p-4">
          <Checkbox
            label="Select all"
            checked={allChecked}
            indeterminate={someChecked}
            onCheckedChange={handleSelectAll}
          />
          <div className="ml-6 flex flex-col gap-2 border-l-2 border-border pl-4">
            {items.map((item) => (
              <Checkbox
                key={item.id}
                label={item.label}
                checked={item.checked}
                onCheckedChange={(checked) => handleItemChange(item.id, checked)}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-text-muted">
            {checkedCount} of {items.length} selected
          </p>
        </div>
      );
    };

    return <SelectAllExample />;
  },
};

/**
 * All combinations of variants, sizes, and states
 */
export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Small</h3>
        <div className="flex flex-col gap-3">
          <Checkbox label="Primary" variant="primary" size="sm" />
          <Checkbox label="Secondary" variant="secondary" size="sm" />
          <Checkbox label="Success" variant="success" size="sm" />
          <Checkbox label="Error" variant="error" size="sm" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Medium</h3>
        <div className="flex flex-col gap-3">
          <Checkbox label="Primary" variant="primary" size="md" />
          <Checkbox label="Secondary" variant="secondary" size="md" />
          <Checkbox label="Success" variant="success" size="md" />
          <Checkbox label="Error" variant="error" size="md" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Large</h3>
        <div className="flex flex-col gap-3">
          <Checkbox label="Primary" variant="primary" size="lg" />
          <Checkbox label="Secondary" variant="secondary" size="lg" />
          <Checkbox label="Success" variant="success" size="lg" />
          <Checkbox label="Error" variant="error" size="lg" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Interactive states showcase
 */
export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-lg font-semibold">Unchecked</h3>
        <div className="flex flex-col gap-2">
          <Checkbox label="Normal" />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="With error" error="Error message" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Checked</h3>
        <div className="flex flex-col gap-2">
          <Checkbox label="Normal" defaultChecked />
          <Checkbox label="Disabled" disabled defaultChecked />
          <Checkbox label="With success" variant="success" defaultChecked />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">Indeterminate</h3>
        <div className="flex flex-col gap-2">
          <Checkbox label="Normal" indeterminate />
          <Checkbox label="Disabled" disabled indeterminate />
          <Checkbox label="With helper" indeterminate helperText="Some items selected" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Form integration example
 */
export const FormExample: Story = {
  render: () => {
    const FormExample = () => {
      const [formData, setFormData] = useState({
        newsletter: false,
        terms: false,
        privacy: false,
      });

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(JSON.stringify(formData, null, 2));
      };

      return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded border border-border p-6">
          <h3 className="text-lg font-semibold">Sign Up Form</h3>

          <Checkbox
            label="Subscribe to newsletter"
            helperText="Get updates about new features and releases"
            checked={formData.newsletter}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, newsletter: checked })
            }
          />

          <Checkbox
            label="I agree to the terms and conditions"
            isRequired
            checked={formData.terms}
            onCheckedChange={(checked) => setFormData({ ...formData, terms: checked })}
            error={!formData.terms ? 'You must accept the terms' : ''}
          />

          <Checkbox
            label="I agree to the privacy policy"
            isRequired
            checked={formData.privacy}
            onCheckedChange={(checked) => setFormData({ ...formData, privacy: checked })}
            error={!formData.privacy ? 'You must accept the privacy policy' : ''}
          />

          <button
            type="submit"
            disabled={!formData.terms || !formData.privacy}
            className="rounded bg-brand-600 px-4 py-2 text-white disabled:opacity-50"
          >
            Submit
          </button>
        </form>
      );
    };

    return <FormExample />;
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, type SelectOption } from './Select';

const countryOptions: SelectOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'Australia', value: 'au' },
];

const fruitOptions: SelectOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Grape', value: 'grape' },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Strawberry (Out of Season)', value: 'strawberry', disabled: true },
];

/**
 * Select component - A fully accessible dropdown select with single/multiple selection.
 *
 * ## Features
 *
 * - Single and multiple selection modes
 * - Controlled and uncontrolled support
 * - Three sizes: sm, md, lg
 * - Error and success states
 * - Placeholder support
 * - Disabled state (both component and individual options)
 * - Full keyboard navigation
 * - WCAG 2.2 AA compliant
 *
 * ## Keyboard Navigation
 *
 * - **Enter/Space**: Open dropdown or select focused option
 * - **Escape**: Close dropdown
 * - **ArrowDown/ArrowUp**: Navigate through options
 * - **Home/End**: Jump to first/last option
 *
 * ## Accessibility
 *
 * - Proper ARIA attributes (aria-haspopup, aria-expanded, aria-selected)
 * - Screen reader friendly
 * - Keyboard navigable
 * - Focus management
 */
const meta = {
  title: 'Molecules/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select',
    },
    variant: {
      control: 'select',
      options: ['default', 'error', 'success'],
      description: 'Visual variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multiple selection',
    },
    isRequired: {
      control: 'boolean',
      description: 'Required field indicator',
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Full width mode',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default single select with placeholder
 */
export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Select a country',
  },
};

/**
 * Select with a label and helper text
 */
export const WithLabel: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    helperText: 'Select your country of residence',
    placeholder: 'Choose a country',
  },
};

/**
 * Controlled select component
 */
export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = useState<string>('');

    return (
      <div className="space-y-4">
        <Select
          {...args}
          value={value}
          onChange={(val) => setValue(val as string)}
        />
        <p className="text-sm text-text-muted">
          Selected value: <strong>{value || 'None'}</strong>
        </p>
      </div>
    );
  },
  args: {
    options: countryOptions,
    label: 'Controlled Select',
    placeholder: 'Select a country',
  },
};

/**
 * Uncontrolled select with default value
 */
export const Uncontrolled: Story = {
  args: {
    options: countryOptions,
    defaultValue: 'ca',
    label: 'Uncontrolled Select',
    helperText: 'Canada is pre-selected',
  },
};

/**
 * Multiple selection mode
 */
export const Multiple: Story = {
  render: function MultipleStory(args) {
    const [values, setValues] = useState<string[]>([]);

    return (
      <div className="space-y-4">
        <Select
          {...args}
          values={values}
          onChange={(val) => setValues(val as string[])}
        />
        <p className="text-sm text-text-muted">
          Selected: <strong>{values.join(', ') || 'None'}</strong>
        </p>
      </div>
    );
  },
  args: {
    options: fruitOptions,
    multiple: true,
    label: 'Favorite Fruits',
    placeholder: 'Select multiple fruits',
    helperText: 'You can select multiple options',
  },
};

/**
 * Multiple select with default values
 */
export const MultipleWithDefaults: Story = {
  args: {
    options: fruitOptions,
    multiple: true,
    defaultValues: ['apple', 'banana'],
    label: 'Pre-selected Fruits',
    helperText: 'Apple and Banana are pre-selected',
  },
};

/**
 * Small size variant
 */
export const SizeSmall: Story = {
  args: {
    options: countryOptions,
    size: 'sm',
    label: 'Small Select',
    placeholder: 'Select a country',
  },
};

/**
 * Medium size variant (default)
 */
export const SizeMedium: Story = {
  args: {
    options: countryOptions,
    size: 'md',
    label: 'Medium Select',
    placeholder: 'Select a country',
  },
};

/**
 * Large size variant
 */
export const SizeLarge: Story = {
  args: {
    options: countryOptions,
    size: 'lg',
    label: 'Large Select',
    placeholder: 'Select a country',
  },
};

/**
 * Error state with error message
 */
export const WithError: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    error: 'Please select a country',
    isRequired: true,
    placeholder: 'Select a country',
  },
};

/**
 * Success state
 */
export const WithSuccess: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    variant: 'success',
    value: 'us',
    helperText: 'Valid selection',
  },
};

/**
 * Disabled select
 */
export const Disabled: Story = {
  args: {
    options: countryOptions,
    disabled: true,
    label: 'Country',
    placeholder: 'This select is disabled',
  },
};

/**
 * Disabled select with pre-selected value
 */
export const DisabledWithValue: Story = {
  args: {
    options: countryOptions,
    disabled: true,
    value: 'us',
    label: 'Country',
    helperText: 'This field cannot be modified',
  },
};

/**
 * Select with some disabled options
 */
export const WithDisabledOptions: Story = {
  args: {
    options: fruitOptions,
    label: 'Available Fruits',
    placeholder: 'Select a fruit',
    helperText: 'Some fruits are out of season',
  },
};

/**
 * Required field with asterisk
 */
export const Required: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    isRequired: true,
    placeholder: 'Select a country',
    helperText: 'This field is required',
  },
};

/**
 * Full width select
 */
export const FullWidth: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    isFullWidth: true,
    placeholder: 'Select a country',
  },
};

/**
 * Select with form integration
 */
export const FormIntegration: Story = {
  render: function FormIntegrationStory(args) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      alert(`Form submitted with:\n${JSON.stringify(data, null, 2)}`);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select {...args} />
        <button
          type="submit"
          className="rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
        >
          Submit
        </button>
      </form>
    );
  },
  args: {
    options: countryOptions,
    label: 'Country',
    name: 'country',
    placeholder: 'Select a country',
    helperText: 'Select a country and submit the form',
  },
};

/**
 * Complex example with all features
 */
export const ComplexExample: Story = {
  render: function ComplexExampleStory() {
    const [country, setCountry] = useState<string>('');
    const [fruits, setFruits] = useState<string[]>([]);
    const [showError, setShowError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!country) {
        setShowError(true);
        return;
      }
      setShowError(false);
      alert(
        `Submitted:\nCountry: ${country}\nFruits: ${fruits.join(', ') || 'None'}`
      );
    };

    return (
      <form onSubmit={handleSubmit} className="max-w-md space-y-6">
        <Select
          options={countryOptions}
          value={country}
          onChange={(val) => {
            setCountry(val as string);
            setShowError(false);
          }}
          label="Country"
          isRequired
          error={showError ? 'Please select a country' : undefined}
          placeholder="Select your country"
          size="md"
        />

        <Select
          options={fruitOptions}
          values={fruits}
          onChange={(val) => setFruits(val as string[])}
          label="Favorite Fruits"
          multiple
          placeholder="Select your favorite fruits"
          helperText="You can select multiple options"
          size="md"
        />

        <button
          type="submit"
          className="w-full rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          Submit Form
        </button>
      </form>
    );
  },
};

/**
 * Size comparison
 */
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-6">
      <Select
        options={countryOptions}
        size="sm"
        label="Small"
        placeholder="Small select"
      />
      <Select
        options={countryOptions}
        size="md"
        label="Medium"
        placeholder="Medium select"
      />
      <Select
        options={countryOptions}
        size="lg"
        label="Large"
        placeholder="Large select"
      />
    </div>
  ),
};

/**
 * State comparison
 */
export const StateComparison: Story = {
  render: () => (
    <div className="space-y-6">
      <Select
        options={countryOptions}
        variant="default"
        label="Default"
        placeholder="Default state"
      />
      <Select
        options={countryOptions}
        variant="success"
        value="us"
        label="Success"
        helperText="Valid selection"
      />
      <Select
        options={countryOptions}
        variant="error"
        label="Error"
        error="This field is required"
        isRequired
      />
      <Select
        options={countryOptions}
        disabled
        label="Disabled"
        placeholder="Disabled state"
      />
    </div>
  ),
};

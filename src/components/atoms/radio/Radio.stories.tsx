import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio, RadioGroup } from './Radio';

/**
 * Radio component provides accessible radio button inputs that must be used within a RadioGroup.
 *
 * ## Features
 *
 * - **Controlled/Uncontrolled**: Supports both controlled and uncontrolled patterns
 * - **Three sizes**: Small, medium, and large variants
 * - **Layout options**: Vertical (default) and horizontal orientations
 * - **Error states**: Built-in error styling and validation messages
 * - **Disabled states**: Can disable individual radios or the entire group
 * - **Keyboard navigation**: Full arrow key navigation support
 * - **Accessibility**: WCAG 2.2 AA compliant with proper ARIA attributes
 *
 * ## Usage
 *
 * Always use Radio components within a RadioGroup. The RadioGroup manages state,
 * keyboard navigation, and provides context for all child Radio components.
 *
 * ## Accessibility
 *
 * - Uses native `input[type="radio"]` for accessibility
 * - Proper `role="radiogroup"` on the container
 * - `aria-checked` for individual radio states
 * - `aria-labelledby` and `aria-describedby` for proper associations
 * - Full keyboard navigation with arrow keys
 * - Focus management for better UX
 * - Screen reader friendly
 */
const meta = {
  title: 'Atoms/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the radio buttons',
    },
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state for all radios',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
    required: {
      control: 'boolean',
      description: 'Required field indicator',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default radio group with vertical layout
 */
export const Default: Story = {
  args: {
    name: 'default',
    label: 'Choose an option',
    children: (
      <>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </>
    ),
  },
};

/**
 * Radio group with default selected value
 */
export const WithDefaultValue: Story = {
  args: {
    name: 'withDefault',
    label: 'Choose your favorite color',
    defaultValue: 'blue',
    children: (
      <>
        <Radio value="red" label="Red" />
        <Radio value="blue" label="Blue" />
        <Radio value="green" label="Green" />
      </>
    ),
  },
};

/**
 * Controlled radio group using React state
 */
export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState('option2');

      return (
        <div className="space-y-4">
          <RadioGroup
            name="controlled"
            label="Controlled radio group"
            value={value}
            onChange={setValue}
          >
            <Radio value="option1" label="Option 1" />
            <Radio value="option2" label="Option 2" />
            <Radio value="option3" label="Option 3" />
          </RadioGroup>
          <p className="text-sm text-text-muted">Selected value: {value}</p>
        </div>
      );
    };

    return <ControlledExample />;
  },
};

/**
 * Radio group with descriptions for each option
 */
export const WithDescriptions: Story = {
  args: {
    name: 'withDescriptions',
    label: 'Select a plan',
    children: (
      <>
        <Radio
          value="free"
          label="Free Plan"
          description="Perfect for trying out our service"
        />
        <Radio
          value="basic"
          label="Basic Plan"
          description="$10/month - For individuals and small projects"
        />
        <Radio
          value="pro"
          label="Pro Plan"
          description="$25/month - For teams and advanced features"
        />
        <Radio
          value="enterprise"
          label="Enterprise Plan"
          description="Custom pricing - For large organizations"
        />
      </>
    ),
  },
};

/**
 * Small size variant
 */
export const SizeSmall: Story = {
  args: {
    name: 'sizeSmall',
    size: 'sm',
    label: 'Small radio buttons',
    children: (
      <>
        <Radio value="option1" label="Small option 1" />
        <Radio value="option2" label="Small option 2" />
        <Radio value="option3" label="Small option 3" />
      </>
    ),
  },
};

/**
 * Medium size variant (default)
 */
export const SizeMedium: Story = {
  args: {
    name: 'sizeMedium',
    size: 'md',
    label: 'Medium radio buttons',
    children: (
      <>
        <Radio value="option1" label="Medium option 1" />
        <Radio value="option2" label="Medium option 2" />
        <Radio value="option3" label="Medium option 3" />
      </>
    ),
  },
};

/**
 * Large size variant
 */
export const SizeLarge: Story = {
  args: {
    name: 'sizeLarge',
    size: 'lg',
    label: 'Large radio buttons',
    children: (
      <>
        <Radio value="option1" label="Large option 1" />
        <Radio value="option2" label="Large option 2" />
        <Radio value="option3" label="Large option 3" />
      </>
    ),
  },
};

/**
 * Horizontal layout orientation
 */
export const HorizontalOrientation: Story = {
  args: {
    name: 'horizontal',
    orientation: 'horizontal',
    label: 'Choose a size',
    children: (
      <>
        <Radio value="s" label="Small" />
        <Radio value="m" label="Medium" />
        <Radio value="l" label="Large" />
        <Radio value="xl" label="Extra Large" />
      </>
    ),
  },
};

/**
 * Disabled state for the entire group
 */
export const DisabledGroup: Story = {
  args: {
    name: 'disabledGroup',
    label: 'Disabled group',
    disabled: true,
    defaultValue: 'option2',
    children: (
      <>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </>
    ),
  },
};

/**
 * Individual disabled radio buttons
 */
export const IndividualDisabled: Story = {
  args: {
    name: 'individualDisabled',
    label: 'Some options disabled',
    children: (
      <>
        <Radio value="option1" label="Available option" />
        <Radio value="option2" label="Disabled option" disabled />
        <Radio value="option3" label="Another available option" />
        <Radio value="option4" label="Another disabled option" disabled />
      </>
    ),
  },
};

/**
 * Error state with error message
 */
export const ErrorState: Story = {
  args: {
    name: 'errorState',
    label: 'Select a payment method',
    error: true,
    errorMessage: 'Please select a payment method to continue',
    required: true,
    children: (
      <>
        <Radio value="credit" label="Credit Card" />
        <Radio value="debit" label="Debit Card" />
        <Radio value="paypal" label="PayPal" />
      </>
    ),
  },
};

/**
 * With helper text
 */
export const WithHelperText: Story = {
  args: {
    name: 'helperText',
    label: 'Notification preferences',
    helperText: 'Choose how you want to receive notifications',
    children: (
      <>
        <Radio value="email" label="Email only" />
        <Radio value="sms" label="SMS only" />
        <Radio value="both" label="Both email and SMS" />
      </>
    ),
  },
};

/**
 * Required field indicator
 */
export const RequiredField: Story = {
  args: {
    name: 'required',
    label: 'Select your country',
    required: true,
    helperText: 'This field is required',
    children: (
      <>
        <Radio value="us" label="United States" />
        <Radio value="uk" label="United Kingdom" />
        <Radio value="ca" label="Canada" />
        <Radio value="au" label="Australia" />
      </>
    ),
  },
};

/**
 * Complex form example with validation
 */
export const FormExample: Story = {
  render: () => {
    const FormExampleComponent = () => {
      const [deliveryMethod, setDeliveryMethod] = useState('');
      const [submitted, setSubmitted] = useState(false);

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
      };

      const hasError = submitted && !deliveryMethod;

      return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          <RadioGroup
            name="deliveryMethod"
            label="Delivery Method"
            value={deliveryMethod}
            onChange={(value) => {
              setDeliveryMethod(value);
              setSubmitted(false);
            }}
            error={hasError}
            errorMessage={hasError ? 'Please select a delivery method' : undefined}
            required
            helperText="Choose how you want to receive your order"
          >
            <Radio
              value="standard"
              label="Standard Delivery"
              description="5-7 business days - Free"
            />
            <Radio
              value="express"
              label="Express Delivery"
              description="2-3 business days - $10"
            />
            <Radio
              value="overnight"
              label="Overnight Delivery"
              description="Next business day - $25"
            />
          </RadioGroup>

          <button
            type="submit"
            className="px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 transition-colors"
          >
            Continue to Payment
          </button>
        </form>
      );
    };

    return <FormExampleComponent />;
  },
};

/**
 * All sizes comparison
 */
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small</h3>
        <RadioGroup name="small" size="sm" defaultValue="option1">
          <Radio value="option1" label="Small option 1" description="Small description" />
          <Radio value="option2" label="Small option 2" description="Small description" />
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Medium (Default)</h3>
        <RadioGroup name="medium" size="md" defaultValue="option1">
          <Radio value="option1" label="Medium option 1" description="Medium description" />
          <Radio value="option2" label="Medium option 2" description="Medium description" />
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Large</h3>
        <RadioGroup name="large" size="lg" defaultValue="option1">
          <Radio value="option1" label="Large option 1" description="Large description" />
          <Radio value="option2" label="Large option 2" description="Large description" />
        </RadioGroup>
      </div>
    </div>
  ),
};

/**
 * Keyboard navigation demo
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-surface-muted rounded-md">
        <h4 className="font-semibold mb-2">Keyboard Navigation Instructions</h4>
        <ul className="text-sm text-text-muted space-y-1">
          <li>• Use <kbd className="px-1 py-0.5 bg-white border border-border rounded text-xs">Tab</kbd> to focus the radio group</li>
          <li>• Use <kbd className="px-1 py-0.5 bg-white border border-border rounded text-xs">Arrow Down</kbd> or <kbd className="px-1 py-0.5 bg-white border border-border rounded text-xs">Arrow Right</kbd> to move to the next option</li>
          <li>• Use <kbd className="px-1 py-0.5 bg-white border border-border rounded text-xs">Arrow Up</kbd> or <kbd className="px-1 py-0.5 bg-white border border-border rounded text-xs">Arrow Left</kbd> to move to the previous option</li>
          <li>• Navigation wraps around at the start/end</li>
        </ul>
      </div>

      <RadioGroup
        name="keyboardDemo"
        label="Try keyboard navigation"
        defaultValue="option2"
      >
        <Radio value="option1" label="First option" />
        <Radio value="option2" label="Second option (pre-selected)" />
        <Radio value="option3" label="Third option" />
        <Radio value="option4" label="Fourth option" />
      </RadioGroup>
    </div>
  ),
};

/**
 * Custom styling example
 */
export const CustomStyling: Story = {
  args: {
    name: 'customStyling',
    label: 'Custom styled radio group',
    className: 'p-4 bg-surface-muted rounded-lg',
    children: (
      <>
        <Radio
          value="option1"
          label="Custom option 1"
          className="hover:bg-surface-hover p-2 rounded-md transition-colors"
        />
        <Radio
          value="option2"
          label="Custom option 2"
          className="hover:bg-surface-hover p-2 rounded-md transition-colors"
        />
        <Radio
          value="option3"
          label="Custom option 3"
          className="hover:bg-surface-hover p-2 rounded-md transition-colors"
        />
      </>
    ),
  },
};

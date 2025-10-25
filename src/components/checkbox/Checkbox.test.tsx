import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  describe('rendering', () => {
    it('renders without label', () => {
      render(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />);
      expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
      expect(screen.getByText('Accept terms')).toBeInTheDocument();
    });

    it('renders with default variant and size', () => {
      render(<Checkbox label="Default" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('h-5'); // md size
      expect(checkbox).toHaveClass('w-5'); // md size
    });

    it('renders with custom variant', () => {
      render(<Checkbox label="Success" variant="success" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('data-state', 'unchecked');
    });

    it('renders with custom size', () => {
      render(<Checkbox label="Large" size="lg" />);
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass('h-6', 'w-6');
    });

    it('renders all sizes correctly', () => {
      const { rerender } = render(<Checkbox label="Small" size="sm" />);
      expect(screen.getByRole('checkbox')).toHaveClass('h-4', 'w-4');

      rerender(<Checkbox label="Medium" size="md" />);
      expect(screen.getByRole('checkbox')).toHaveClass('h-5', 'w-5');

      rerender(<Checkbox label="Large" size="lg" />);
      expect(screen.getByRole('checkbox')).toHaveClass('h-6', 'w-6');
    });

    it('renders helper text', () => {
      render(<Checkbox label="Option" helperText="This is helpful" />);
      expect(screen.getByText('This is helpful')).toBeInTheDocument();
    });

    it('renders error message', () => {
      render(<Checkbox label="Required" error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.getByText('This field is required')).toHaveClass('text-error');
    });

    it('error message takes precedence over helper text', () => {
      render(
        <Checkbox
          label="Field"
          helperText="Helper text"
          error="Error message"
        />
      );
      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
    });

    it('renders required indicator', () => {
      render(<Checkbox label="Required field" isRequired />);
      const required = screen.getByLabelText('required');
      expect(required).toHaveTextContent('*');
      expect(required).toHaveClass('text-error');
    });
  });

  describe('uncontrolled mode', () => {
    it('starts unchecked by default', () => {
      render(<Checkbox label="Unchecked" />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('starts checked when defaultChecked is true', () => {
      render(<Checkbox label="Checked" defaultChecked />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('toggles on click', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Toggle me" />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(checkbox).toBeChecked();

      await user.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('calls onChange when toggled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox label="Change" onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ checked: true }),
        })
      );
    });

    it('calls onCheckedChange with boolean value', async () => {
      const handleCheckedChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox label="Change" onCheckedChange={handleCheckedChange} />);

      await user.click(screen.getByRole('checkbox'));

      expect(handleCheckedChange).toHaveBeenCalledTimes(1);
      expect(handleCheckedChange).toHaveBeenCalledWith(true);

      await user.click(screen.getByRole('checkbox'));

      expect(handleCheckedChange).toHaveBeenCalledTimes(2);
      expect(handleCheckedChange).toHaveBeenCalledWith(false);
    });
  });

  describe('controlled mode', () => {
    it('uses checked prop when provided', () => {
      const { rerender } = render(<Checkbox label="Controlled" checked={false} />);
      expect(screen.getByRole('checkbox')).not.toBeChecked();

      rerender(<Checkbox label="Controlled" checked={true} />);
      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('does not update state internally when controlled', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Controlled" checked={false} />);
      const checkbox = screen.getByRole('checkbox');

      await user.click(checkbox);

      // Should remain unchecked because it's controlled
      expect(checkbox).not.toBeChecked();
    });

    it('calls onCheckedChange in controlled mode', async () => {
      const handleCheckedChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Checkbox
          label="Controlled"
          checked={false}
          onCheckedChange={handleCheckedChange}
        />
      );

      await user.click(screen.getByRole('checkbox'));

      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });

    it('works with controlled state management', async () => {
      const user = userEvent.setup();
      let checked = false;
      const setChecked = vi.fn((value: boolean) => {
        checked = value;
      });

      const { rerender } = render(
        <Checkbox label="Controlled" checked={checked} onCheckedChange={setChecked} />
      );

      await user.click(screen.getByRole('checkbox'));
      expect(setChecked).toHaveBeenCalledWith(true);

      rerender(
        <Checkbox label="Controlled" checked={true} onCheckedChange={setChecked} />
      );
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
  });

  describe('indeterminate state', () => {
    it('renders indeterminate state', () => {
      render(<Checkbox label="Indeterminate" indeterminate />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox.indeterminate).toBe(true);
      expect(checkbox).toHaveAttribute('data-state', 'indeterminate');
    });

    it('shows indeterminate icon when indeterminate', () => {
      const { container } = render(<Checkbox label="Indeterminate" indeterminate />);
      // Indeterminate icon has a horizontal line path
      const indeterminateIcon = container.querySelector('svg path[d="M4 8H12"]');
      expect(indeterminateIcon).toBeInTheDocument();
    });

    it('shows check icon when checked but not indeterminate', () => {
      const { container } = render(<Checkbox label="Checked" checked />);
      // Check icon has a checkmark path
      const checkIcon = container.querySelector('svg path[d="M13 4L6 11L3 8"]');
      expect(checkIcon).toBeInTheDocument();
    });

    it('indeterminate takes precedence over checked for icon display', () => {
      const { container } = render(
        <Checkbox label="Both" checked indeterminate />
      );

      const indeterminateIcon = container.querySelector('svg path[d="M4 8H12"]');
      const checkIcon = container.querySelector('svg path[d="M13 4L6 11L3 8"]');

      expect(indeterminateIcon).toBeInTheDocument();
      expect(checkIcon).not.toBeInTheDocument();
    });

    it('clears indeterminate state on click', async () => {
      const user = userEvent.setup();
      const handleCheckedChange = vi.fn();

      render(
        <Checkbox
          label="Indeterminate"
          indeterminate
          onCheckedChange={handleCheckedChange}
        />
      );

      await user.click(screen.getByRole('checkbox'));

      expect(handleCheckedChange).toHaveBeenCalledWith(true);
    });
  });

  describe('interactions', () => {
    it('can be toggled by clicking the label', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Click label" />);

      await user.click(screen.getByText('Click label'));

      expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('can be toggled with keyboard (Space)', async () => {
      const user = userEvent.setup();
      render(<Checkbox label="Keyboard" />);
      const checkbox = screen.getByRole('checkbox');

      checkbox.focus();
      await user.keyboard(' ');

      expect(checkbox).toBeChecked();
    });

    it('does not toggle when disabled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Checkbox label="Disabled" disabled onChange={handleChange} />);

      await user.click(screen.getByRole('checkbox'));

      expect(handleChange).not.toHaveBeenCalled();
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('can be focused', () => {
      render(<Checkbox label="Focusable" />);
      const checkbox = screen.getByRole('checkbox');

      checkbox.focus();

      expect(checkbox).toHaveFocus();
    });

    it('cannot be focused when disabled', () => {
      render(<Checkbox label="Not focusable" disabled />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toBeDisabled();
    });
  });

  describe('accessibility', () => {
    it('has correct checkbox role', () => {
      render(<Checkbox label="Accessible" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('associates label with checkbox', () => {
      render(<Checkbox label="Associated label" />);
      const checkbox = screen.getByRole('checkbox', { name: 'Associated label' });
      expect(checkbox).toBeInTheDocument();
    });

    it('sets aria-invalid when error is present', () => {
      render(<Checkbox label="Error" error="Error message" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('sets aria-required when isRequired is true', () => {
      render(<Checkbox label="Required" isRequired />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-required', 'true');
    });

    it('associates helper text with checkbox via aria-describedby', () => {
      render(<Checkbox label="Help" helperText="Helpful information" />);
      const checkbox = screen.getByRole('checkbox');
      const helperText = screen.getByText('Helpful information');

      expect(checkbox).toHaveAttribute('aria-describedby');
      expect(helperText).toHaveAttribute('id', checkbox.getAttribute('aria-describedby'));
    });

    it('associates error message with checkbox via aria-describedby', () => {
      render(<Checkbox label="Error" error="Error message" />);
      const checkbox = screen.getByRole('checkbox');
      const errorMessage = screen.getByText('Error message');

      expect(checkbox).toHaveAttribute('aria-describedby');
      expect(errorMessage).toHaveAttribute('id', checkbox.getAttribute('aria-describedby'));
    });

    it('uses provided ID', () => {
      render(<Checkbox label="Custom ID" id="custom-checkbox" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'custom-checkbox');
    });

    it('generates unique ID when not provided', () => {
      render(
        <>
          <Checkbox label="First" />
          <Checkbox label="Second" />
        </>
      );

      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[0].id).toBeTruthy();
      expect(checkboxes[1].id).toBeTruthy();
      expect(checkboxes[0].id).not.toBe(checkboxes[1].id);
    });

    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Checkbox label="With ref" ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.type).toBe('checkbox');
    });

    it('hides icons from assistive technology', () => {
      const { container } = render(<Checkbox label="Checked" checked />);
      const icon = container.querySelector('svg');

      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('styling', () => {
    it('accepts custom className', () => {
      render(<Checkbox label="Custom" className="custom-class" />);
      expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
    });

    it('merges custom className with base classes', () => {
      render(<Checkbox label="Custom" className="custom-class" />);
      const checkbox = screen.getByRole('checkbox');

      expect(checkbox).toHaveClass('custom-class');
      expect(checkbox).toHaveClass('appearance-none'); // base class
    });

    it('applies disabled styles when disabled', () => {
      render(<Checkbox label="Disabled" disabled />);
      expect(screen.getByRole('checkbox')).toHaveClass('disabled:opacity-50');
      expect(screen.getByText('Disabled')).toHaveClass('opacity-50');
    });

    it('applies all variants correctly', () => {
      const variants = ['primary', 'secondary', 'success', 'error'] as const;

      variants.forEach((variant) => {
        const { unmount } = render(<Checkbox label={variant} variant={variant} />);
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        unmount();
      });
    });

    it('updates data-state attribute based on state', () => {
      const { rerender } = render(<Checkbox label="State" />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'unchecked');

      rerender(<Checkbox label="State" checked />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'checked');

      rerender(<Checkbox label="State" indeterminate />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('data-state', 'indeterminate');
    });
  });

  describe('label click behavior', () => {
    it('label is clickable and not disabled when checkbox is enabled', () => {
      render(<Checkbox label="Enabled" />);
      expect(screen.getByText('Enabled')).toHaveClass('cursor-pointer');
      expect(screen.getByText('Enabled')).not.toHaveClass('cursor-not-allowed');
    });

    it('label appears disabled when checkbox is disabled', () => {
      render(<Checkbox label="Disabled" disabled />);
      expect(screen.getByText('Disabled')).toHaveClass('cursor-not-allowed');
      expect(screen.getByText('Disabled')).toHaveClass('opacity-50');
    });
  });
});

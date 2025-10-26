import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, RadioGroup } from './Radio';

describe('Radio', () => {
  describe('rendering', () => {
    it('renders with label', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );
      expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" description="This is option 1" />
        </RadioGroup>
      );
      expect(screen.getByText('This is option 1')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" className="custom-class" />
        </RadioGroup>
      );
      const label = screen.getByText('Option 1').closest('label');
      expect(label).toHaveClass('custom-class');
    });
  });

  describe('states', () => {
    it('can be checked', async () => {
      const user = userEvent.setup();
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      const radio1 = screen.getByLabelText('Option 1');
      const radio2 = screen.getByLabelText('Option 2');

      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(false);

      await user.click(radio1);
      expect(radio1.checked).toBe(true);
      expect(radio2.checked).toBe(false);

      await user.click(radio2);
      expect(radio1.checked).toBe(false);
      expect(radio2.checked).toBe(true);
    });

    it('can be disabled', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" disabled />
        </RadioGroup>
      );
      const radio = screen.getByLabelText('Option 1');
      expect(radio).toBeDisabled();
    });

    it('inherits disabled state from group', () => {
      render(
        <RadioGroup name="test" disabled>
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );
      const radio = screen.getByLabelText('Option 1');
      expect(radio).toBeDisabled();
    });

    it('shows error state styling', () => {
      render(
        <RadioGroup name="test" error errorMessage="Please select an option">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );
      expect(screen.getByText('Please select an option')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onChange when selected', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <RadioGroup name="test" onChange={onChange}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      await user.click(screen.getByLabelText('Option 1'));
      expect(onChange).toHaveBeenCalledWith('option1');

      await user.click(screen.getByLabelText('Option 2'));
      expect(onChange).toHaveBeenCalledWith('option2');
    });

    it('does not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <RadioGroup name="test" onChange={onChange}>
          <Radio value="option1" label="Option 1" disabled />
        </RadioGroup>
      );

      await user.click(screen.getByLabelText('Option 1'));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <RadioGroup name="test" defaultValue="option1">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      const radio1 = screen.getByLabelText('Option 1');
      const radio2 = screen.getByLabelText('Option 2');

      expect(radio1).toHaveAttribute('aria-checked', 'true');
      expect(radio2).toHaveAttribute('aria-checked', 'false');
    });

    it('associates description with aria-describedby', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" description="Description text" />
        </RadioGroup>
      );

      const radio = screen.getByRole('radio', { name: /Option 1/i });
      const descriptionId = radio.getAttribute('aria-describedby');
      expect(descriptionId).toBeTruthy();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(screen.getByText('Description text')).toHaveAttribute('id', descriptionId!);
    });

    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(
        <RadioGroup name="test">
          <Radio ref={ref} value="option1" label="Option 1" />
        </RadioGroup>
      );
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });
});

describe('RadioGroup', () => {
  describe('rendering', () => {
    it('renders children', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(
        <RadioGroup name="test" label="Choose an option">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );

      expect(screen.getByText('Choose an option')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(
        <RadioGroup name="test" helperText="Select one option">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );

      expect(screen.getByText('Select one option')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(
        <RadioGroup name="test" error errorMessage="This field is required">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );

      const errorMessage = screen.getByText('This field is required');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    it('shows required indicator', () => {
      render(
        <RadioGroup name="test" label="Choose an option" required>
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );

      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  describe('controlled mode', () => {
    it('works in controlled mode', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      const { rerender } = render(
        <RadioGroup name="test" value="option1" onChange={onChange}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      expect((screen.getByLabelText('Option 1')).checked).toBe(true);
      expect((screen.getByLabelText('Option 2')).checked).toBe(false);

      await user.click(screen.getByLabelText('Option 2'));
      expect(onChange).toHaveBeenCalledWith('option2');

      // Simulate parent updating the value
      rerender(
        <RadioGroup name="test" value="option2" onChange={onChange}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      expect((screen.getByLabelText('Option 1')).checked).toBe(false);
      expect((screen.getByLabelText('Option 2')).checked).toBe(true);
    });
  });

  describe('uncontrolled mode', () => {
    it('works in uncontrolled mode', async () => {
      const user = userEvent.setup();

      render(
        <RadioGroup name="test" defaultValue="option1">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      expect((screen.getByLabelText('Option 1')).checked).toBe(true);

      await user.click(screen.getByLabelText('Option 2'));
      expect((screen.getByLabelText('Option 2')).checked).toBe(true);
      expect((screen.getByLabelText('Option 1')).checked).toBe(false);
    });
  });

  describe('sizes', () => {
    it('applies small size', () => {
      render(
        <RadioGroup name="test" size="sm">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );

      const radio = screen.getByLabelText('Option 1');
      expect(radio).toHaveClass('h-4', 'w-4');
    });

    it('applies medium size (default)', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );

      const radio = screen.getByLabelText('Option 1');
      expect(radio).toHaveClass('h-5', 'w-5');
    });

    it('applies large size', () => {
      render(
        <RadioGroup name="test" size="lg">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );

      const radio = screen.getByLabelText('Option 1');
      expect(radio).toHaveClass('h-6', 'w-6');
    });
  });

  describe('orientation', () => {
    it('applies vertical orientation (default)', () => {
      const { container } = render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      const group = container.querySelector('[role="radiogroup"]');
      expect(group).toHaveClass('flex-col');
    });

    it('applies horizontal orientation', () => {
      const { container } = render(
        <RadioGroup name="test" orientation="horizontal">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      const group = container.querySelector('[role="radiogroup"]');
      expect(group).toHaveClass('flex-row');
    });
  });

  describe('keyboard navigation', () => {
    it('navigates with arrow keys in vertical orientation', async () => {
      const user = userEvent.setup();

      render(
        <RadioGroup name="test" orientation="vertical" defaultValue="option1">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      );

      const radio1 = screen.getByLabelText('Option 1');
      const radio2 = screen.getByLabelText('Option 2');
      const radio3 = screen.getByLabelText('Option 3');

      radio1.focus();
      await user.keyboard('{ArrowDown}');
      expect(radio2).toHaveFocus();
      expect(radio2.checked).toBe(true);

      await user.keyboard('{ArrowDown}');
      expect(radio3).toHaveFocus();
      expect(radio3.checked).toBe(true);

      await user.keyboard('{ArrowUp}');
      expect(radio2).toHaveFocus();
      expect(radio2.checked).toBe(true);
    });

    it('navigates with arrow keys in horizontal orientation', async () => {
      const user = userEvent.setup();

      render(
        <RadioGroup name="test" orientation="horizontal" defaultValue="option1">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      );

      const radio1 = screen.getByLabelText('Option 1');
      const radio2 = screen.getByLabelText('Option 2');
      const radio3 = screen.getByLabelText('Option 3');

      radio1.focus();
      await user.keyboard('{ArrowRight}');
      expect(radio2).toHaveFocus();
      expect(radio2.checked).toBe(true);

      await user.keyboard('{ArrowRight}');
      expect(radio3).toHaveFocus();
      expect(radio3.checked).toBe(true);

      await user.keyboard('{ArrowLeft}');
      expect(radio2).toHaveFocus();
      expect(radio2.checked).toBe(true);
    });

    it('wraps around when reaching the end', async () => {
      const user = userEvent.setup();

      render(
        <RadioGroup name="test" orientation="vertical" defaultValue="option2">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      );

      const radio1 = screen.getByLabelText('Option 1');
      const radio2 = screen.getByLabelText('Option 2');

      radio2.focus();
      await user.keyboard('{ArrowDown}');
      expect(radio1).toHaveFocus();
      expect(radio1.checked).toBe(true);

      await user.keyboard('{ArrowUp}');
      expect(radio2).toHaveFocus();
      expect(radio2.checked).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('has role="radiogroup"', () => {
      const { container } = render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );

      expect(container.querySelector('[role="radiogroup"]')).toBeInTheDocument();
    });

    it('associates label with aria-labelledby', () => {
      const { container } = render(
        <RadioGroup name="test" label="Choose an option">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );

      const group = container.querySelector('[role="radiogroup"]');
      const labelId = group?.getAttribute('aria-labelledby');
      expect(labelId).toBeTruthy();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(screen.getByText('Choose an option')).toHaveAttribute('id', labelId!);
    });

    it('sets aria-required when required', () => {
      const { container } = render(
        <RadioGroup name="test" required>
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );

      const group = container.querySelector('[role="radiogroup"]');
      expect(group).toHaveAttribute('aria-required', 'true');
    });

    it('sets aria-invalid when error', () => {
      const { container } = render(
        <RadioGroup name="test" error>
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );

      const group = container.querySelector('[role="radiogroup"]');
      expect(group).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error message with aria-describedby', () => {
      const { container } = render(
        <RadioGroup name="test" error errorMessage="Error message">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );

      const group = container.querySelector('[role="radiogroup"]');
      const errorId = group?.getAttribute('aria-describedby');
      expect(errorId).toBeTruthy();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(screen.getByText('Error message')).toHaveAttribute('id', errorId!);
    });

    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <RadioGroup ref={ref} name="test">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      );
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});

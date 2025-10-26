import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, type SelectOption } from './Select';

const defaultOptions: SelectOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Disabled Option', value: '4', disabled: true },
];

describe('Select', () => {
  describe('rendering', () => {
    it('renders with placeholder when no value is selected', () => {
      render(<Select options={defaultOptions} placeholder="Select an option" />);
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Select options={defaultOptions} label="Test Label" />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(
        <Select options={defaultOptions} helperText="This is helper text" />
      );
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(
        <Select options={defaultOptions} error="This field is required" />
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('renders required indicator when isRequired is true', () => {
      render(
        <Select options={defaultOptions} label="Required Field" isRequired />
      );
      expect(screen.getByLabelText('required')).toBeInTheDocument();
    });

    it('renders with custom size classes', () => {
      const { container } = render(
        <Select options={defaultOptions} size="lg" />
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('px-4', 'py-3', 'text-lg');
    });

    it('renders with full width', () => {
      render(<Select options={defaultOptions} isFullWidth />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full');
    });

    it('shows selected value in single select mode', () => {
      render(<Select options={defaultOptions} value="2" />);
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('shows count in multiple select mode with multiple selections', () => {
      render(<Select options={defaultOptions} multiple values={['1', '2']} />);
      expect(screen.getByText('2 selected')).toBeInTheDocument();
    });

    it('shows label in multiple select mode with one selection', () => {
      render(<Select options={defaultOptions} multiple values={['1']} />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  describe('dropdown interaction', () => {
    it('opens dropdown when clicked', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('closes dropdown when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Select options={defaultOptions} />
          <button>Outside</button>
        </div>
      );

      const selectButton = screen.getByRole('button', { name: /Select/i });
      await user.click(selectButton);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      const outsideButton = screen.getByRole('button', { name: 'Outside' });
      await user.click(outsideButton);

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('displays "No options available" when options array is empty', async () => {
      const user = userEvent.setup();
      render(<Select options={[]} />);

      await user.click(screen.getByRole('button'));

      expect(screen.getByText('No options available')).toBeInTheDocument();
    });

    it('rotates chevron icon when dropdown opens', async () => {
      const user = userEvent.setup();
      const { container } = render(<Select options={defaultOptions} />);

      const button = screen.getByRole('button');
      const chevron = container.querySelector('svg');

      expect(chevron).not.toHaveClass('rotate-180');

      await user.click(button);

      expect(chevron).toHaveClass('rotate-180');
    });
  });

  describe('single select mode', () => {
    it('selects an option when clicked', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Select options={defaultOptions} onChange={handleChange} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 2'));

      expect(handleChange).toHaveBeenCalledWith('2');
    });

    it('closes dropdown after selecting an option', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 2'));

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('works in controlled mode', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(
        <Select options={defaultOptions} value="1" onChange={handleChange} />
      );

      expect(screen.getByText('Option 1')).toBeInTheDocument();

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 3'));

      expect(handleChange).toHaveBeenCalledWith('3');

      rerender(
        <Select options={defaultOptions} value="3" onChange={handleChange} />
      );

      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('works in uncontrolled mode with defaultValue', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} defaultValue="2" />);

      expect(screen.getByText('Option 2')).toBeInTheDocument();

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 3'));

      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
  });

  describe('multiple select mode', () => {
    it('allows selecting multiple options', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Select options={defaultOptions} multiple onChange={handleChange} />
      );

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 1'));

      expect(handleChange).toHaveBeenCalledWith(['1']);

      await user.click(screen.getByText('Option 2'));

      expect(handleChange).toHaveBeenCalledWith(['1', '2']);
    });

    it('allows deselecting options', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Select
          options={defaultOptions}
          multiple
          values={['1', '2']}
          onChange={handleChange}
        />
      );

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 1'));

      expect(handleChange).toHaveBeenCalledWith(['2']);
    });

    it('keeps dropdown open when selecting in multiple mode', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} multiple />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 1'));

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('shows checkmarks for selected options', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Select options={defaultOptions} multiple values={['1', '2']} />
      );

      await user.click(screen.getByRole('button'));

      const checkmarks = container.querySelectorAll('svg.text-brand-600');
      expect(checkmarks.length).toBe(2);
    });

    it('works in uncontrolled mode with defaultValues', async () => {
      const user = userEvent.setup();
      render(
        <Select options={defaultOptions} multiple defaultValues={['1', '2']} />
      );

      expect(screen.getByText('2 selected')).toBeInTheDocument();

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Option 3'));

      expect(screen.getByText('3 selected')).toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    it('opens dropdown with Enter key', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('opens dropdown with Space key', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('closes dropdown with Escape key', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      const button = screen.getByRole('button');
      await user.click(button);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
      });
    });

    it('navigates options with ArrowDown', async () => {
      const user = userEvent.setup();
      const { container } = render(<Select options={defaultOptions} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{ArrowDown}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{ArrowDown}');

      const highlighted = container.querySelector('.bg-surface-muted');
      expect(highlighted).toBeInTheDocument();
    });

    it('navigates options with ArrowUp', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowUp}');

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('selects focused option with Enter', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Select options={defaultOptions} onChange={handleChange} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      expect(handleChange).toHaveBeenCalledWith('1');
    });

    it('moves to first option with Home key', async () => {
      const user = userEvent.setup();
      const { container } = render(<Select options={defaultOptions} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Home}');

      const highlighted = container.querySelector('.bg-surface-muted');
      expect(highlighted).toHaveTextContent('Option 1');
    });

    it('moves to last option with End key', async () => {
      const user = userEvent.setup();
      const { container } = render(<Select options={defaultOptions} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{End}');

      const highlighted = container.querySelector('.bg-surface-muted');
      expect(highlighted).toHaveTextContent('Option 3');
    });
  });

  describe('disabled state', () => {
    it('cannot be opened when disabled', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} disabled />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('has disabled styling', () => {
      render(<Select options={defaultOptions} disabled />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('disabled:opacity-50');
      expect(button).toBeDisabled();
    });

    it('does not respond to keyboard events when disabled', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} disabled />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('cannot select disabled options', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Select options={defaultOptions} onChange={handleChange} />);

      await user.click(screen.getByRole('button'));
      await user.click(screen.getByText('Disabled Option'));

      expect(handleChange).not.toHaveBeenCalled();
    });

    it('applies disabled styling to disabled options', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      await user.click(screen.getByRole('button'));

      const options = screen.getAllByRole('option');
      const disabledOption = options.find(opt => opt.textContent === 'Disabled Option');
      expect(disabledOption).toHaveClass('opacity-50');
      expect(disabledOption).toHaveClass('cursor-not-allowed');
    });
  });

  describe('accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<Select options={defaultOptions} label="Test Select" />);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-haspopup', 'listbox');
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    it('updates aria-expanded when opened', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('displays error message when error is present', () => {
      render(<Select options={defaultOptions} error="Error message" />);

      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(screen.getByText('Error message')).toHaveClass('text-error');
    });

    it('displays required indicator when isRequired is true', () => {
      render(<Select options={defaultOptions} label="Test" isRequired />);

      expect(screen.getByLabelText('required')).toBeInTheDocument();
    });

    it('has aria-describedby for helper text', () => {
      render(
        <Select
          options={defaultOptions}
          helperText="Helper text"
          id="test-select"
        />
      );
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-describedby', 'test-select-helper');
    });

    it('has aria-multiselectable in multiple mode', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} multiple />);

      await user.click(screen.getByRole('button'));

      const listbox = screen.getByRole('listbox');
      expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
    });

    it('marks options with aria-selected', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} value="2" />);

      await user.click(screen.getByRole('button'));

      const options = screen.getAllByRole('option');
      const selectedOption = options.find(opt => opt.getAttribute('aria-selected') === 'true');
      expect(selectedOption).toHaveTextContent('Option 2');
    });

    it('marks disabled options with aria-disabled', async () => {
      const user = userEvent.setup();
      render(<Select options={defaultOptions} />);

      await user.click(screen.getByRole('button'));

      const options = screen.getAllByRole('option');
      const disabledOption = options.find(opt => opt.textContent === 'Disabled Option');
      expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
    });

    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Select ref={ref} options={defaultOptions} />);

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('form integration', () => {
    it('creates hidden input with name for form submission in single mode', () => {
      const { container } = render(
        <Select options={defaultOptions} name="country" value="2" />
      );

      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toHaveAttribute('name', 'country');
      expect(hiddenInput).toHaveAttribute('value', '2');
    });

    it('creates multiple hidden inputs in multiple mode', () => {
      const { container } = render(
        <Select
          options={defaultOptions}
          name="tags"
          multiple
          values={['1', '2']}
        />
      );

      const hiddenInputs = container.querySelectorAll('input[type="hidden"]');
      expect(hiddenInputs.length).toBe(2);
      expect(hiddenInputs[0]).toHaveAttribute('value', '1');
      expect(hiddenInputs[1]).toHaveAttribute('value', '2');
    });
  });

  describe('styling', () => {
    it('accepts custom className', () => {
      const { container } = render(
        <Select options={defaultOptions} className="custom-class" />
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('custom-class');
    });

    it('applies error variant classes', () => {
      const { container } = render(
        <Select options={defaultOptions} variant="error" />
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('border-error');
    });

    it('applies success variant classes', () => {
      const { container } = render(
        <Select options={defaultOptions} variant="success" />
      );
      const button = container.querySelector('button');
      expect(button).toHaveClass('border-success');
    });

    it('applies placeholder styling when no value selected', () => {
      const { container } = render(<Select options={defaultOptions} />);
      const button = container.querySelector('button');
      expect(button).toHaveClass('text-text-muted');
    });
  });
});

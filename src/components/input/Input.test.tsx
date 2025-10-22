import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  describe('rendering', () => {
    it('renders an input field', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with a label', () => {
      render(<Input label="Email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('renders with helper text', () => {
      render(<Input label="Email" helperText="Enter your email address" />);
      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Input label="Email" error="Email is required" />);
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('shows error message instead of helper text when both provided', () => {
      render(
        <Input
          label="Email"
          helperText="Enter your email"
          error="Email is required"
        />
      );
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
    });

    it('renders required indicator', () => {
      render(<Input label="Email" isRequired />);
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });

    it('renders with start adornment', () => {
      render(
        <Input
          label="Search"
          startAdornment={<span data-testid="search-icon">🔍</span>}
        />
      );
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('renders with end adornment', () => {
      render(
        <Input
          label="Password"
          endAdornment={<span data-testid="eye-icon">👁</span>}
        />
      );
      expect(screen.getByTestId('eye-icon')).toBeInTheDocument();
    });

    it('renders full width', () => {
      const { container } = render(<Input isFullWidth />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('w-full');
    });

    it('renders with custom size', () => {
      render(<Input size="lg" />);
      expect(screen.getByRole('textbox')).toHaveClass('text-lg');
    });
  });

  describe('interactions', () => {
    it('calls onChange when text is entered', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input onChange={handleChange} />);

      await user.type(screen.getByRole('textbox'), 'Hello');

      expect(handleChange).toHaveBeenCalled();
    });

    it('updates value when controlled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(
        <Input value="initial" onChange={handleChange} />
      );

      expect(screen.getByRole('textbox')).toHaveValue('initial');

      rerender(<Input value="updated" onChange={handleChange} />);

      expect(screen.getByRole('textbox')).toHaveValue('updated');
    });

    it('can be focused', () => {
      render(<Input label="Focusable" />);
      const input = screen.getByRole('textbox');

      input.focus();

      expect(input).toHaveFocus();
    });

    it('cannot be focused when disabled', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');

      expect(input).toBeDisabled();
    });
  });

  describe('accessibility', () => {
    it('associates label with input via htmlFor', () => {
      render(<Input label="Email" />);
      const label = screen.getByText('Email');
      const input = screen.getByRole('textbox');

      expect(label).toHaveAttribute('for', input.id);
    });

    it('associates helper text with input via aria-describedby', () => {
      render(<Input label="Email" helperText="Enter your email" />);
      const input = screen.getByRole('textbox');
      const helperText = screen.getByText('Enter your email');

      expect(input).toHaveAttribute('aria-describedby', helperText.id);
    });

    it('sets aria-invalid when error is present', () => {
      render(<Input error="This is an error" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('sets aria-required when isRequired is true', () => {
      render(<Input isRequired />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });

    it('uses provided id if given', () => {
      render(<Input id="custom-id" label="Test" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id');
    });

    it('generates unique id if not provided', () => {
      const { container } = render(
        <>
          <Input label="Input 1" />
          <Input label="Input 2" />
        </>
      );

      const inputs = container.querySelectorAll('input');
      expect(inputs[0]?.id).toBeTruthy();
      expect(inputs[1]?.id).toBeTruthy();
      expect(inputs[0]?.id).not.toBe(inputs[1]?.id);
    });

    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Input ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe('INPUT');
    });
  });

  describe('styling', () => {
    it('accepts custom className', () => {
      render(<Input className="custom-class" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });

    it('applies error variant classes when error is provided', () => {
      render(<Input error="Error message" />);
      expect(screen.getByRole('textbox')).toHaveClass('border-error');
    });

    it('applies success variant classes', () => {
      render(<Input variant="success" />);
      expect(screen.getByRole('textbox')).toHaveClass('border-success');
    });
  });
});

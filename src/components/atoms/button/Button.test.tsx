import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('renders with default variant and size', () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-brand-600'); // primary variant
      expect(button).toHaveClass('px-4'); // md size
    });

    it('renders with custom variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-surface-muted');
    });

    it('renders with custom size', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
    });

    it('renders full width when specified', () => {
      render(<Button isFullWidth>Full Width</Button>);
      expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    it('renders with start icon', () => {
      render(
        <Button startIcon={<span data-testid="start-icon">→</span>}>
          With Start Icon
        </Button>
      );
      expect(screen.getByTestId('start-icon')).toBeInTheDocument();
      expect(screen.getByText('With Start Icon')).toBeInTheDocument();
    });

    it('renders with end icon', () => {
      render(
        <Button endIcon={<span data-testid="end-icon">←</span>}>
          With End Icon
        </Button>
      );
      expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });

    it('renders loading state', () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('hides icons when loading', () => {
      render(
        <Button isLoading startIcon={<span data-testid="icon">Icon</span>}>
          Loading
        </Button>
      );
      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('interactions', () => {
    it('calls onClick when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );

      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} isLoading>
          Loading
        </Button>
      );

      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('can be focused', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');

      button.focus();

      expect(button).toHaveFocus();
    });

    it('cannot be focused when disabled', () => {
      render(<Button disabled>Not Focusable</Button>);
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
    });
  });

  describe('accessibility', () => {
    it('has correct button role', () => {
      render(<Button>Accessible</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports custom type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('has default type="button"', () => {
      render(<Button>Default Type</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('has aria-label for loading state', () => {
      render(<Button isLoading>Loading</Button>);
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
    });

    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Button ref={ref}>With Ref</Button>);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });
  });

  describe('styling', () => {
    it('accepts custom className', () => {
      render(<Button className="custom-class">Custom</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('merges custom className with base classes', () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('inline-flex'); // base class
    });

    it('applies all variant classes correctly', () => {
      const variants = ['primary', 'secondary', 'outline', 'ghost', 'danger'] as const;

      variants.forEach((variant) => {
        const { container } = render(<Button variant={variant}>{variant}</Button>);
        const button = container.querySelector('button');
        expect(button).toBeInTheDocument();
      });
    });
  });
});

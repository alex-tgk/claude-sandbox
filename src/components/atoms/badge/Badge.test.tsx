import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('rendering', () => {
    it('renders with children', () => {
      render(<Badge>Test content</Badge>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<Badge className="custom-class">Content</Badge>);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders with default variant and size', () => {
      const { container } = render(<Badge>Default</Badge>);
      const badge = container.firstChild as HTMLElement;
      expect(badge).toHaveClass('bg-brand-10', 'text-brand-80');
      expect(badge).toHaveClass('px-2.5', 'py-1', 'text-sm');
    });

    it('renders with icon', () => {
      const icon = <span data-testid="test-icon">Icon</span>;
      render(<Badge icon={icon}>With Icon</Badge>);
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('With Icon')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('renders primary variant', () => {
      const { container } = render(<Badge variant="primary">Primary</Badge>);
      expect(container.firstChild).toHaveClass('bg-brand-10', 'text-brand-80');
    });

    it('renders secondary variant', () => {
      const { container } = render(<Badge variant="secondary">Secondary</Badge>);
      expect(container.firstChild).toHaveClass('bg-surface-muted', 'text-text');
    });

    it('renders success variant', () => {
      const { container } = render(<Badge variant="success">Success</Badge>);
      expect(container.firstChild).toHaveClass('bg-success-light', 'text-success');
    });

    it('renders warning variant', () => {
      const { container } = render(<Badge variant="warning">Warning</Badge>);
      expect(container.firstChild).toHaveClass('bg-warning-light', 'text-warning');
    });

    it('renders error variant', () => {
      const { container } = render(<Badge variant="error">Error</Badge>);
      expect(container.firstChild).toHaveClass('bg-error-light', 'text-error');
    });

    it('renders info variant', () => {
      const { container } = render(<Badge variant="info">Info</Badge>);
      expect(container.firstChild).toHaveClass('bg-info-light', 'text-info');
    });
  });

  describe('sizes', () => {
    it('renders small size', () => {
      const { container } = render(<Badge size="sm">Small</Badge>);
      expect(container.firstChild).toHaveClass('px-2', 'py-0.5', 'text-xs');
    });

    it('renders medium size', () => {
      const { container } = render(<Badge size="md">Medium</Badge>);
      expect(container.firstChild).toHaveClass('px-2.5', 'py-1', 'text-sm');
    });

    it('renders large size', () => {
      const { container } = render(<Badge size="lg">Large</Badge>);
      expect(container.firstChild).toHaveClass('px-3', 'py-1.5', 'text-base');
    });
  });

  describe('shapes', () => {
    it('renders rounded shape by default', () => {
      const { container } = render(<Badge>Rounded</Badge>);
      expect(container.firstChild).toHaveClass('rounded-md');
    });

    it('renders pill shape', () => {
      const { container } = render(<Badge shape="pill">Pill</Badge>);
      expect(container.firstChild).toHaveClass('rounded-full');
    });
  });

  describe('dot variant', () => {
    it('renders as a dot without children', () => {
      const { container } = render(<Badge dot variant="success" />);
      const dot = container.firstChild as HTMLElement;
      expect(dot.tagName).toBe('SPAN');
      expect(dot).toHaveClass('rounded-full', 'bg-success-light');
      expect(dot).toHaveClass('h-2.5', 'w-2.5'); // medium size
    });

    it('renders dot with different sizes', () => {
      const { container: smallContainer } = render(<Badge dot size="sm" />);
      expect(smallContainer.firstChild).toHaveClass('h-2', 'w-2');

      const { container: largeContainer } = render(<Badge dot size="lg" />);
      expect(largeContainer.firstChild).toHaveClass('h-3', 'w-3');
    });

    it('renders dot with aria-label', () => {
      render(<Badge dot ariaLabel="Active status" variant="success" />);
      expect(screen.getByLabelText('Active status')).toBeInTheDocument();
    });
  });

  describe('removable variant', () => {
    it('renders close button when removable', () => {
      const handleRemove = vi.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Removable
        </Badge>
      );
      expect(screen.getByLabelText('Remove badge')).toBeInTheDocument();
    });

    it('calls onRemove when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Removable
        </Badge>
      );

      const closeButton = screen.getByLabelText('Remove badge');
      await user.click(closeButton);
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      const handleBadgeClick = vi.fn();

      render(
        <Badge removable onRemove={handleRemove} onClick={handleBadgeClick}>
          Removable
        </Badge>
      );

      const closeButton = screen.getByLabelText('Remove badge');
      await user.click(closeButton);

      expect(handleRemove).toHaveBeenCalledTimes(1);
      expect(handleBadgeClick).not.toHaveBeenCalled();
    });

    it('does not render close button when removable is true but onRemove is not provided', () => {
      render(<Badge removable>No Remove</Badge>);
      expect(screen.queryByLabelText('Remove badge')).not.toBeInTheDocument();
    });

    it('renders close button with different sizes', () => {
      const { container: smallContainer } = render(
        <Badge removable onRemove={() => {}} size="sm">
          Small
        </Badge>
      );
      const smallButton = smallContainer.querySelector('button');
      expect(smallButton).toHaveClass('h-3', 'w-3');

      const { container: largeContainer } = render(
        <Badge removable onRemove={() => {}} size="lg">
          Large
        </Badge>
      );
      const largeButton = largeContainer.querySelector('button');
      expect(largeButton).toHaveClass('h-4', 'w-4');
    });
  });

  describe('accessibility', () => {
    it('has role="status"', () => {
      render(<Badge>Status</Badge>);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Badge ariaLabel="New notification">5</Badge>);
      expect(screen.getByLabelText('New notification')).toBeInTheDocument();
    });

    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Badge ref={ref}>Content</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('supports ref forwarding for dot variant', () => {
      const ref = { current: null as HTMLSpanElement | null };
      render(<Badge ref={ref} dot />);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });

    it('close button has accessible label', () => {
      render(
        <Badge removable onRemove={() => {}}>
          Removable
        </Badge>
      );
      expect(screen.getByLabelText('Remove badge')).toBeInTheDocument();
    });

    it('close button is keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      render(
        <Badge removable onRemove={handleRemove}>
          Removable
        </Badge>
      );

      const closeButton = screen.getByLabelText('Remove badge');
      closeButton.focus();
      expect(closeButton).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });
  });

  describe('combined features', () => {
    it('renders badge with icon and removable', () => {
      const icon = <span data-testid="test-icon">Icon</span>;
      render(
        <Badge icon={icon} removable onRemove={() => {}}>
          Complete
        </Badge>
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('Complete')).toBeInTheDocument();
      expect(screen.getByLabelText('Remove badge')).toBeInTheDocument();
    });

    it('renders pill badge with all features', () => {
      const icon = <span data-testid="test-icon">Icon</span>;
      const { container } = render(
        <Badge
          shape="pill"
          size="lg"
          variant="warning"
          icon={icon}
          removable
          onRemove={() => {}}
          ariaLabel="Warning tag"
        >
          Warning
        </Badge>
      );
      expect(container.firstChild).toHaveClass('rounded-full');
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(screen.getByLabelText('Remove badge')).toBeInTheDocument();
      expect(screen.getByLabelText('Warning tag')).toBeInTheDocument();
    });
  });
});

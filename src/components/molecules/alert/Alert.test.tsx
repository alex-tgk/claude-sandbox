import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  describe('rendering', () => {
    it('renders with children', () => {
      render(<Alert>Test content</Alert>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders with title', () => {
      render(<Alert title="Test Title">Content</Alert>);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(<Alert title="Title" description="Test description" />);
      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('renders with both title and children', () => {
      render(<Alert title="Title">Content</Alert>);
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<Alert className="custom-class">Content</Alert>);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('variants', () => {
    it('renders info variant by default', () => {
      const { container } = render(<Alert>Content</Alert>);
      expect(container.firstChild).toHaveClass('bg-blue-50');
    });

    it('renders success variant', () => {
      const { container } = render(<Alert variant="success">Content</Alert>);
      expect(container.firstChild).toHaveClass('bg-green-50');
    });

    it('renders warning variant', () => {
      const { container } = render(<Alert variant="warning">Content</Alert>);
      expect(container.firstChild).toHaveClass('bg-yellow-50');
    });

    it('renders error variant', () => {
      const { container } = render(<Alert variant="error">Content</Alert>);
      expect(container.firstChild).toHaveClass('bg-red-50');
    });
  });

  describe('icons', () => {
    it('shows default icon by default', () => {
      const { container } = render(<Alert>Content</Alert>);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('hides icon when showIcon is false', () => {
      const { container } = render(<Alert showIcon={false}>Content</Alert>);
      const svg = container.querySelector('svg');
      expect(svg).not.toBeInTheDocument();
    });

    it('renders custom icon', () => {
      const customIcon = <span data-testid="custom-icon">Custom</span>;
      render(<Alert icon={customIcon}>Content</Alert>);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('shows different default icons for each variant', () => {
      const { container: infoContainer } = render(<Alert variant="info">Info</Alert>);
      const { container: successContainer } = render(<Alert variant="success">Success</Alert>);

      const infoPath = infoContainer.querySelector('path')?.getAttribute('d');
      const successPath = successContainer.querySelector('path')?.getAttribute('d');

      expect(infoPath).not.toBe(successPath);
    });
  });

  describe('dismissible', () => {
    it('does not show close button by default', () => {
      render(<Alert>Content</Alert>);
      expect(screen.queryByLabelText('Dismiss alert')).not.toBeInTheDocument();
    });

    it('shows close button when dismissible', () => {
      render(<Alert dismissible>Content</Alert>);
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument();
    });

    it('calls onDismiss when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(
        <Alert dismissible onDismiss={handleDismiss}>
          Content
        </Alert>
      );

      const closeButton = screen.getByLabelText('Dismiss alert');
      await user.click(closeButton);

      await waitFor(() => {
        expect(handleDismiss).toHaveBeenCalledTimes(1);
      });
    });

    it('hides alert after dismiss animation', async () => {
      const user = userEvent.setup();
      render(<Alert dismissible>Content</Alert>);

      const closeButton = screen.getByLabelText('Dismiss alert');
      await user.click(closeButton);

      await waitFor(
        () => {
          expect(screen.queryByText('Content')).not.toBeInTheDocument();
        },
        { timeout: 200 }
      );
    });

    it('applies animation classes when dismissing', async () => {
      const user = userEvent.setup();
      const { container } = render(<Alert dismissible>Content</Alert>);

      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass('opacity-100');

      const closeButton = screen.getByLabelText('Dismiss alert');
      await user.click(closeButton);

      expect(alert).toHaveClass('opacity-0');
    });
  });

  describe('action button', () => {
    it('renders action button', () => {
      const action = <button type="button">Action</button>;
      render(<Alert action={action}>Content</Alert>);
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });

    it('renders both action and dismiss button', () => {
      const action = <button type="button">Action</button>;
      render(
        <Alert dismissible action={action}>
          Content
        </Alert>
      );
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has role="alert"', () => {
      render(<Alert>Content</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('has aria-live="polite" for info variant by default', () => {
      render(<Alert variant="info">Content</Alert>);
      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite');
    });

    it('has aria-live="polite" for success variant by default', () => {
      render(<Alert variant="success">Content</Alert>);
      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'polite');
    });

    it('has aria-live="assertive" for warning variant by default', () => {
      render(<Alert variant="warning">Content</Alert>);
      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
    });

    it('has aria-live="assertive" for error variant by default', () => {
      render(<Alert variant="error">Content</Alert>);
      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
    });

    it('accepts custom aria-live value', () => {
      render(
        <Alert variant="info" aria-live="assertive">
          Content
        </Alert>
      );
      expect(screen.getByRole('alert')).toHaveAttribute('aria-live', 'assertive');
    });

    it('has aria-hidden on icons', () => {
      const { container } = render(<Alert>Content</Alert>);
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });

    it('has aria-label on dismiss button', () => {
      render(<Alert dismissible>Content</Alert>);
      const closeButton = screen.getByLabelText('Dismiss alert');
      expect(closeButton).toHaveAttribute('aria-label', 'Dismiss alert');
    });

    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Alert ref={ref}>Content</Alert>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('dismiss button is keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(
        <Alert dismissible onDismiss={handleDismiss}>
          Content
        </Alert>
      );

      const closeButton = screen.getByLabelText('Dismiss alert');
      closeButton.focus();
      expect(closeButton).toHaveFocus();

      await user.keyboard('{Enter}');
      await waitFor(() => {
        expect(handleDismiss).toHaveBeenCalled();
      });
    });
  });

  describe('styling', () => {
    it('applies correct background color for each variant', () => {
      const { container: info } = render(<Alert variant="info">Info</Alert>);
      const { container: success } = render(<Alert variant="success">Success</Alert>);
      const { container: warning } = render(<Alert variant="warning">Warning</Alert>);
      const { container: error } = render(<Alert variant="error">Error</Alert>);

      expect(info.firstChild).toHaveClass('bg-blue-50');
      expect(success.firstChild).toHaveClass('bg-green-50');
      expect(warning.firstChild).toHaveClass('bg-yellow-50');
      expect(error.firstChild).toHaveClass('bg-red-50');
    });

    it('applies focus ring colors matching variant on dismiss button', () => {
      const { container } = render(
        <Alert variant="success" dismissible>
          Content
        </Alert>
      );
      const closeButton = screen.getByLabelText('Dismiss alert');
      expect(closeButton).toHaveClass('focus:ring-green-500');
    });
  });

  describe('edge cases', () => {
    it('renders without title or description', () => {
      render(<Alert />);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('prefers description over children when both provided', () => {
      render(
        <Alert description="Description text">
          Children text
        </Alert>
      );
      expect(screen.getByText('Description text')).toBeInTheDocument();
      expect(screen.queryByText('Children text')).not.toBeInTheDocument();
    });

    it('renders with all props combined', () => {
      const action = <button type="button">Action</button>;
      const customIcon = <span data-testid="custom-icon">Icon</span>;

      render(
        <Alert
          variant="warning"
          title="Warning Title"
          description="Warning message"
          dismissible
          icon={customIcon}
          action={action}
          className="custom-class"
        />
      );

      expect(screen.getByText('Warning Title')).toBeInTheDocument();
      expect(screen.getByText('Warning message')).toBeInTheDocument();
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument();
    });
  });
});

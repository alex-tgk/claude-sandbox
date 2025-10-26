import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  describe('rendering', () => {
    it('does not render when isOpen is false', () => {
      render(
        <Dialog isOpen={false} onClose={() => {}} title="Test Dialog">
          Content
        </Dialog>
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders when isOpen is true', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}} title="Test Dialog">
          Content
        </Dialog>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('renders with title', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}} title="Test Title">
          Content
        </Dialog>
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(
        <Dialog
          isOpen={true}
          onClose={() => {}}
          title="Test"
          description="Test description"
        >
          Content
        </Dialog>
      );

      expect(screen.getByText('Test description')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}} title="Test">
          <p>Dialog content</p>
        </Dialog>
      );

      expect(screen.getByText('Dialog content')).toBeInTheDocument();
    });

    it('renders close button by default', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}} title="Test">
          Content
        </Dialog>
      );

      expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
    });

    it('hides close button when showCloseButton is false', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}} title="Test" showCloseButton={false}>
          Content
        </Dialog>
      );

      expect(screen.queryByLabelText('Close dialog')).not.toBeInTheDocument();
    });

    it('renders with different sizes', () => {
      const { rerender } = render(
        <Dialog isOpen={true} onClose={() => {}} title="Test" size="sm">
          Content
        </Dialog>
      );

      expect(screen.getByRole('dialog')).toHaveClass('max-w-sm');

      rerender(
        <Dialog isOpen={true} onClose={() => {}} title="Test" size="lg">
          Content
        </Dialog>
      );

      expect(screen.getByRole('dialog')).toHaveClass('max-w-lg');
    });
  });

  describe('interactions', () => {
    it('calls onClose when close button is clicked', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(
        <Dialog isOpen={true} onClose={handleClose} title="Test">
          Content
        </Dialog>
      );

      await user.click(screen.getByLabelText('Close dialog'));

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when Escape is pressed', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(
        <Dialog isOpen={true} onClose={handleClose} title="Test">
          Content
        </Dialog>
      );

      await user.keyboard('{Escape}');

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not close on Escape when closeOnEscape is false', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(
        <Dialog isOpen={true} onClose={handleClose} title="Test" closeOnEscape={false}>
          Content
        </Dialog>
      );

      await user.keyboard('{Escape}');

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('calls onClose when backdrop is clicked', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(
        <Dialog isOpen={true} onClose={handleClose} title="Test">
          Content
        </Dialog>
      );

      // Click the backdrop (parent of dialog)
      const backdrop = screen.getByRole('dialog').parentElement?.firstChild as HTMLElement;
      await user.click(backdrop);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('does not close on backdrop click when closeOnBackdropClick is false', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(
        <Dialog isOpen={true} onClose={handleClose} title="Test" closeOnBackdropClick={false}>
          Content
        </Dialog>
      );

      const backdrop = screen.getByRole('dialog').parentElement?.firstChild as HTMLElement;
      await user.click(backdrop);

      expect(handleClose).not.toHaveBeenCalled();
    });

    it('does not close when clicking dialog content', async () => {
      const handleClose = vi.fn();
      const user = userEvent.setup();

      render(
        <Dialog isOpen={true} onClose={handleClose} title="Test">
          <button>Inside button</button>
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: 'Inside button' }));

      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has correct dialog role', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}} title="Test">
          Content
        </Dialog>
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-modal attribute', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}} title="Test">
          Content
        </Dialog>
      );

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('has aria-labelledby pointing to title', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}} title="Test Title">
          Content
        </Dialog>
      );

      const dialog = screen.getByRole('dialog');
      const title = screen.getByText('Test Title');

      expect(dialog).toHaveAttribute('aria-labelledby', title.id);
    });

    it('has aria-describedby when description is provided', () => {
      render(
        <Dialog
          isOpen={true}
          onClose={() => {}}
          title="Test"
          description="Test description"
        >
          Content
        </Dialog>
      );

      const dialog = screen.getByRole('dialog');
      const description = screen.getByText('Test description');

      expect(dialog).toHaveAttribute('aria-describedby', description.id);
    });

    it('does not have aria-describedby when description is not provided', () => {
      render(
        <Dialog isOpen={true} onClose={() => {}} title="Test">
          Content
        </Dialog>
      );

      expect(screen.getByRole('dialog')).not.toHaveAttribute('aria-describedby');
    });

    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(
        <Dialog ref={ref} isOpen={true} onClose={() => {}} title="Test">
          Content
        </Dialog>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.getAttribute('role')).toBe('dialog');
    });
  });

  describe('focus management', () => {
    it('traps focus within dialog', async () => {
      const user = userEvent.setup();

      render(
        <Dialog isOpen={true} onClose={() => {}} title="Test">
          <button>Button 1</button>
          <button>Button 2</button>
        </Dialog>
      );

      const button1 = screen.getByRole('button', { name: 'Button 1' });
      const button2 = screen.getByRole('button', { name: 'Button 2' });
      const closeButton = screen.getByLabelText('Close dialog');

      // Focus should start on first focusable element
      expect(button1).toHaveFocus();

      // Tab to next element
      await user.tab();
      expect(button2).toHaveFocus();

      // Tab to close button
      await user.tab();
      expect(closeButton).toHaveFocus();

      // Tab should cycle back to first element
      await user.tab();
      expect(button1).toHaveFocus();
    });
  });
});

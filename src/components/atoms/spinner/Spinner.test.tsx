import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });

    it('renders with circular variant by default', () => {
      const { container } = render(<Spinner />);
      const circular = container.querySelector('.animate-spin');
      expect(circular).toBeInTheDocument();
    });

    it('renders with dots variant', () => {
      const { container } = render(<Spinner variant="dots" />);
      const dots = container.querySelectorAll('.animate-bounce');
      expect(dots).toHaveLength(3);
    });

    it('renders with bars variant', () => {
      const { container } = render(<Spinner variant="bars" />);
      const bars = container.querySelectorAll('.animate-pulse');
      expect(bars).toHaveLength(3);
    });

    it('renders with custom className', () => {
      render(<Spinner className="custom-class" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('custom-class');
    });
  });

  describe('sizes', () => {
    it('renders with xs size', () => {
      const { container } = render(<Spinner size="xs" />);
      const circular = container.querySelector('.h-3.w-3');
      expect(circular).toBeInTheDocument();
    });

    it('renders with sm size', () => {
      const { container } = render(<Spinner size="sm" />);
      const circular = container.querySelector('.h-4.w-4');
      expect(circular).toBeInTheDocument();
    });

    it('renders with md size (default)', () => {
      const { container } = render(<Spinner size="md" />);
      const circular = container.querySelector('.h-6.w-6');
      expect(circular).toBeInTheDocument();
    });

    it('renders with lg size', () => {
      const { container } = render(<Spinner size="lg" />);
      const circular = container.querySelector('.h-8.w-8');
      expect(circular).toBeInTheDocument();
    });
  });

  describe('colors', () => {
    it('renders with primary color (default)', () => {
      render(<Spinner color="primary" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('text-brand-600');
    });

    it('renders with secondary color', () => {
      render(<Spinner color="secondary" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('text-text-secondary');
    });

    it('renders with success color', () => {
      render(<Spinner color="success" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('text-success');
    });

    it('renders with warning color', () => {
      render(<Spinner color="warning" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('text-warning');
    });

    it('renders with error color', () => {
      render(<Spinner color="error" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('text-error');
    });

    it('renders with inherit color', () => {
      render(<Spinner color="inherit" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('text-current');
    });
  });

  describe('speed', () => {
    it('renders with normal speed (default)', () => {
      const { container } = render(<Spinner speed="normal" />);
      const spinner = container.querySelector('[class*="animation-duration:1s"]');
      expect(spinner).toBeInTheDocument();
    });

    it('renders with slow speed', () => {
      const { container } = render(<Spinner speed="slow" />);
      const spinner = container.querySelector('[class*="animation-duration:1.5s"]');
      expect(spinner).toBeInTheDocument();
    });

    it('renders with fast speed', () => {
      const { container } = render(<Spinner speed="fast" />);
      const spinner = container.querySelector('[class*="animation-duration:0.6s"]');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('positioning', () => {
    it('renders inline by default', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('inline-flex');
      expect(spinner).not.toHaveClass('absolute');
    });

    it('renders centered when center prop is true', () => {
      render(<Spinner center />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('absolute');
      expect(spinner).toHaveClass('inset-0');
      expect(spinner).toHaveClass('items-center');
      expect(spinner).toHaveClass('justify-center');
    });
  });

  describe('accessibility', () => {
    it('has role="status"', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });

    it('has aria-live="polite"', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-live', 'polite');
    });

    it('has aria-busy="true"', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-busy', 'true');
    });

    it('renders with default accessible label', () => {
      render(<Spinner />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders with custom accessible label', () => {
      render(<Spinner label="Fetching data..." />);
      expect(screen.getByText('Fetching data...')).toBeInTheDocument();
    });

    it('hides visual spinner from screen readers', () => {
      const { container } = render(<Spinner variant="circular" />);
      const visualSpinner = container.querySelector('.animate-spin');
      expect(visualSpinner).toHaveAttribute('aria-hidden', 'true');
    });

    it('label is screen reader only', () => {
      render(<Spinner label="Loading content" />);
      const label = screen.getByText('Loading content');
      expect(label).toHaveClass('sr-only');
    });

    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Spinner ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('variants with different sizes', () => {
    it('renders dots variant with different sizes', () => {
      const { container: xs } = render(<Spinner variant="dots" size="xs" />);
      expect(xs.querySelector('.gap-0\\.5')).toBeInTheDocument();

      const { container: sm } = render(<Spinner variant="dots" size="sm" />);
      expect(sm.querySelector('.gap-1')).toBeInTheDocument();

      const { container: md } = render(<Spinner variant="dots" size="md" />);
      expect(md.querySelector('.gap-1\\.5')).toBeInTheDocument();

      const { container: lg } = render(<Spinner variant="dots" size="lg" />);
      expect(lg.querySelector('.gap-2')).toBeInTheDocument();
    });

    it('renders bars variant with different sizes', () => {
      const { container: xs } = render(<Spinner variant="bars" size="xs" />);
      expect(xs.querySelector('.gap-0\\.5')).toBeInTheDocument();

      const { container: sm } = render(<Spinner variant="bars" size="sm" />);
      expect(sm.querySelector('.gap-1')).toBeInTheDocument();

      const { container: md } = render(<Spinner variant="bars" size="md" />);
      expect(md.querySelector('.gap-1\\.5')).toBeInTheDocument();

      const { container: lg } = render(<Spinner variant="bars" size="lg" />);
      expect(lg.querySelector('.gap-2')).toBeInTheDocument();
    });
  });

  describe('HTML attributes', () => {
    it('forwards additional props to the div element', () => {
      render(<Spinner data-testid="custom-spinner" />);
      const spinner = screen.getByTestId('custom-spinner');
      expect(spinner).toBeInTheDocument();
    });

    it('applies id prop', () => {
      render(<Spinner id="my-spinner" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('id', 'my-spinner');
    });
  });

  describe('combined props', () => {
    it('renders with all custom props combined', () => {
      render(
        <Spinner
          variant="dots"
          size="lg"
          color="success"
          speed="fast"
          label="Processing..."
          center
          className="custom-spinner"
        />
      );

      const spinner = screen.getByRole('status');
      expect(spinner).toHaveClass('custom-spinner');
      expect(spinner).toHaveClass('text-success');
      expect(spinner).toHaveClass('absolute');
      expect(screen.getByText('Processing...')).toBeInTheDocument();
    });
  });
});

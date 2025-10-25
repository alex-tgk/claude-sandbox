import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

describe('Card', () => {
  describe('rendering', () => {
    it('renders with children', () => {
      render(<Card>Test content</Card>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<Card className="custom-class">Content</Card>);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders with default variant (elevated)', () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild).toHaveClass('bg-surface', 'shadow-md');
    });

    it('renders with outlined variant', () => {
      const { container } = render(<Card variant="outlined">Content</Card>);
      expect(container.firstChild).toHaveClass('bg-surface', 'border-2', 'border-border');
    });

    it('renders with flat variant', () => {
      const { container } = render(<Card variant="flat">Content</Card>);
      expect(container.firstChild).toHaveClass('bg-surface-muted');
    });
  });

  describe('sizes', () => {
    it('renders with small padding', () => {
      const { container } = render(<Card size="sm">Content</Card>);
      expect(container.firstChild).toHaveClass('p-3');
    });

    it('renders with medium padding (default)', () => {
      const { container } = render(<Card size="md">Content</Card>);
      expect(container.firstChild).toHaveClass('p-4');
    });

    it('renders with large padding', () => {
      const { container } = render(<Card size="lg">Content</Card>);
      expect(container.firstChild).toHaveClass('p-6');
    });
  });

  describe('hover effects', () => {
    it('applies hover classes when hover is true', () => {
      const { container } = render(<Card hover>Content</Card>);
      expect(container.firstChild).toHaveClass('hover:shadow-lg');
    });

    it('applies translate on hover for elevated variant', () => {
      const { container } = render(<Card hover variant="elevated">Content</Card>);
      expect(container.firstChild).toHaveClass('hover:-translate-y-0.5');
    });

    it('applies border change on hover for outlined variant', () => {
      const { container } = render(<Card hover variant="outlined">Content</Card>);
      expect(container.firstChild).toHaveClass('hover:border-border-focus');
    });

    it('does not apply hover classes when hover is false', () => {
      const { container } = render(<Card hover={false}>Content</Card>);
      expect(container.firstChild).not.toHaveClass('hover:shadow-lg');
    });
  });

  describe('clickable cards', () => {
    it('renders with button role when clickable', () => {
      render(<Card clickable>Content</Card>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card clickable onClick={handleClick}>Content</Card>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick on Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card clickable onClick={handleClick}>Content</Card>);

      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick on Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card clickable onClick={handleClick}>Content</Card>);

      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('is focusable when clickable', () => {
      render(<Card clickable>Content</Card>);
      expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '0');
    });

    it('applies cursor pointer when clickable', () => {
      const { container } = render(<Card clickable>Content</Card>);
      expect(container.firstChild).toHaveClass('cursor-pointer');
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card clickable disabled onClick={handleClick}>Content</Card>);

      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies disabled styles when disabled', () => {
      const { container } = render(<Card clickable disabled>Content</Card>);
      expect(container.firstChild).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('has aria-disabled when disabled', () => {
      render(<Card clickable disabled>Content</Card>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('supports custom role', () => {
      render(<Card clickable role="link">Content</Card>);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<Card ref={ref}>Content</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it('does not have button role when not clickable', () => {
      render(<Card>Content</Card>);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('has focus ring styles when clickable', () => {
      const { container } = render(<Card clickable>Content</Card>);
      expect(container.firstChild).toHaveClass('focus-visible:outline-none', 'focus-visible:ring-2');
    });
  });
});

describe('CardHeader', () => {
  it('renders with children', () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('applies bottom margin', () => {
    const { container } = render(<CardHeader>Header</CardHeader>);
    expect(container.firstChild).toHaveClass('mb-3');
  });

  it('supports custom className', () => {
    const { container } = render(<CardHeader className="custom">Header</CardHeader>);
    expect(container.firstChild).toHaveClass('custom', 'mb-3');
  });

  it('supports ref forwarding', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<CardHeader ref={ref}>Header</CardHeader>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardBody', () => {
  it('renders with children', () => {
    render(<CardBody>Body content</CardBody>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('supports custom className', () => {
    const { container } = render(<CardBody className="custom">Body</CardBody>);
    expect(container.firstChild).toHaveClass('custom');
  });

  it('supports ref forwarding', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<CardBody ref={ref}>Body</CardBody>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardFooter', () => {
  it('renders with children', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('applies top margin', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    expect(container.firstChild).toHaveClass('mt-3');
  });

  it('supports custom className', () => {
    const { container } = render(<CardFooter className="custom">Footer</CardFooter>);
    expect(container.firstChild).toHaveClass('custom', 'mt-3');
  });

  it('supports ref forwarding', () => {
    const ref = { current: null as HTMLDivElement | null };
    render(<CardFooter ref={ref}>Footer</CardFooter>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Card composition', () => {
  it('renders complete card with all sections', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});

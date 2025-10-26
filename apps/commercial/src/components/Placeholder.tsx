/**
 * Placeholder component for demo purposes.
 * Replace with actual library components when @modular-ui/system is built.
 */

interface PlaceholderProps {
  type: 'button' | 'card' | 'input';
  children?: React.ReactNode;
}

export function Placeholder({ type, children }: PlaceholderProps) {
  const styles = {
    button: 'inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white hover:bg-primary-600',
    card: 'p-6 bg-white border border-neutral-200',
    input: 'w-full px-3 py-2 border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500',
  };

  return (
    <div className={styles[type]}>
      {children || `${type.charAt(0).toUpperCase() + type.slice(1)} Placeholder`}
    </div>
  );
}

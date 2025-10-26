import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';
import { Spinner } from '../../atoms/spinner/Spinner';

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, isLoading = false, onClear, value, placeholder = 'Search', ...props }, ref) => {
    const showClear = Boolean(onClear && value);

    return (
      <div
        className={cn(
          'flex items-center gap-2 rounded-lg border border-border-subtle bg-surface px-3 py-2 shadow-sm',
          'focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-200',
          className
        )}
      >
        <svg
          aria-hidden="true"
          className="h-4 w-4 text-text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.65" y1="16.65" x2="21" y2="21" />
        </svg>
        <input
          ref={ref}
          type="search"
          value={value}
          placeholder={placeholder}
          className="flex-1 border-none bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
          {...props}
        />
        {isLoading ? (
          <Spinner size="sm" aria-label="Searching" />
        ) : showClear ? (
          <button
            type="button"
            aria-label="Clear search"
            className="text-sm text-text-muted transition hover:text-text"
            onClick={onClear}
          >
            x
          </button>
        ) : null}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

import { useState, useMemo, memo, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { Button } from '../../atoms/button/Button';
import { Input } from '../../atoms/input/Input';
import { Checkbox } from '../../atoms/checkbox/Checkbox';
import { Badge } from '../../atoms/badge/Badge';
import { Spinner } from '../../atoms/spinner/Spinner';

/**
 * Column definition for DataTable
 *
 * @since 0.2.0
 */
export interface DataTableColumn<T = any> {
  /**
   * Unique key for the column
   */
  key: string;

  /**
   * Display header for the column
   */
  header: string;

  /**
   * Optional custom render function
   */
  render?: (value: any, row: T, index: number) => ReactNode;

  /**
   * Whether column is sortable
   * @defaultValue false
   */
  sortable?: boolean;

  /**
   * Custom sort function
   */
  sortFn?: (a: T, b: T) => number;

  /**
   * Column width
   */
  width?: string;

  /**
   * Text alignment
   * @defaultValue 'left'
   */
  align?: 'left' | 'center' | 'right';
}

/**
 * Sort direction type
 */
export type SortDirection = 'asc' | 'desc' | null;

/**
 * DataTable Props
 *
 * @since 0.2.0
 */
export interface DataTableProps<T = any> {
  /**
   * Array of data rows
   */
  data: T[];

  /**
   * Column definitions
   */
  columns: DataTableColumn<T>[];

  /**
   * Unique key field in data
   * @defaultValue 'id'
   */
  keyField?: string;

  /**
   * Whether to show row selection checkboxes
   * @defaultValue false
   */
  selectable?: boolean;

  /**
   * Selected row keys
   */
  selectedKeys?: Set<string | number>;

  /**
   * Selection change callback
   */
  onSelectionChange?: (keys: Set<string | number>) => void;

  /**
   * Whether to enable search
   * @defaultValue false
   */
  searchable?: boolean;

  /**
   * Search placeholder text
   */
  searchPlaceholder?: string;

  /**
   * Custom search function
   */
  searchFn?: (row: T, query: string) => boolean;

  /**
   * Whether to enable pagination
   * @defaultValue false
   */
  paginated?: boolean;

  /**
   * Rows per page
   * @defaultValue 10
   */
  pageSize?: number;

  /**
   * Whether table is loading
   * @defaultValue false
   */
  isLoading?: boolean;

  /**
   * Empty state message
   */
  emptyMessage?: string;

  /**
   * Actions to show when rows are selected
   */
  bulkActions?: ReactNode;

  /**
   * Additional toolbar actions
   */
  toolbarActions?: ReactNode;

  /**
   * Table title
   */
  title?: string;

  /**
   * Table description
   */
  description?: string;

  /**
   * Row click handler
   */
  onRowClick?: (row: T, index: number) => void;

  /**
   * Custom className
   */
  className?: string;
}

/**
 * DataTable Organism
 *
 * @remarks
 * A comprehensive, feature-rich data table component combining multiple atoms
 * and molecules. Perfect for displaying and managing complex datasets.
 *
 * Features:
 * - Sortable columns
 * - Search/filtering
 * - Row selection
 * - Bulk actions
 * - Pagination
 * - Loading states
 * - Custom cell rendering
 * - Responsive design
 * - IBM Carbon design
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={[
 *     { key: 'name', header: 'Name', sortable: true },
 *     { key: 'email', header: 'Email' },
 *     { key: 'status', header: 'Status', render: (value) => <Badge>{value}</Badge> }
 *   ]}
 *   selectable
 *   searchable
 *   paginated
 * />
 * ```
 *
 * @since 0.2.0
 */
function DataTableComponent<T = any>({
  data,
  columns,
  keyField = 'id',
  selectable = false,
  selectedKeys: controlledSelectedKeys,
  onSelectionChange,
  searchable = false,
  searchPlaceholder = 'Search...',
  searchFn,
  paginated = false,
  pageSize = 10,
  isLoading = false,
  emptyMessage = 'No data available',
  bulkActions,
  toolbarActions,
  title,
  description,
  onRowClick,
  className,
}: DataTableProps<T>) {
  // Internal state
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<Set<string | number>>(
    new Set()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Use controlled or internal selection
  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;
  const setSelectedKeys = onSelectionChange ?? setInternalSelectedKeys;

  // Search filtering
  const searchedData = useMemo(() => {
    if (!searchable || !searchQuery) return data;

    const query = searchQuery.toLowerCase();
    return data.filter((row) => {
      if (searchFn) return searchFn(row, query);

      // Default: search all string values
      return Object.values(row as object).some((value) =>
        String(value).toLowerCase().includes(query)
      );
    });
  }, [data, searchQuery, searchable, searchFn]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return searchedData;

    const column = columns.find((col) => col.key === sortKey);
    if (!column) return searchedData;

    const sorted = [...searchedData].sort((a, b) => {
      if (column.sortFn) {
        return column.sortFn(a, b);
      }

      const aVal = (a as any)[sortKey];
      const bVal = (b as any)[sortKey];

      if (aVal < bVal) return -1;
      if (aVal > bVal) return 1;
      return 0;
    });

    return sortDirection === 'desc' ? sorted.reverse() : sorted;
  }, [searchedData, sortKey, sortDirection, columns]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = paginated
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const displayData = paginatedData;

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allKeys = new Set(displayData.map((row) => (row as any)[keyField]));
      setSelectedKeys(allKeys);
    } else {
      setSelectedKeys(new Set());
    }
  };

  const handleSelectRow = (key: string | number, checked: boolean) => {
    const newKeys = new Set(selectedKeys);
    if (checked) {
      newKeys.add(key);
    } else {
      newKeys.delete(key);
    }
    setSelectedKeys(newKeys);
  };

  // Sort handler
  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortKey(null);
      }
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const allSelected =
    displayData.length > 0 &&
    displayData.every((row) => selectedKeys.has((row as any)[keyField]));
  const someSelected = displayData.some((row) =>
    selectedKeys.has((row as any)[keyField])
  );

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      {(title || description) && (
        <div>
          {title && <h2 className="text-2xl font-medium text-text-primary">{title}</h2>}
          {description && (
            <p className="mt-1 text-sm text-text-secondary">{description}</p>
          )}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          {/* Search */}
          {searchable && (
            <div className="w-full sm:max-w-xs">
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                isFullWidth
              />
            </div>
          )}

          {/* Bulk Actions */}
          {selectedKeys.size > 0 && bulkActions && (
            <div className="flex items-center gap-3">
              <Badge variant="info">{selectedKeys.size} selected</Badge>
              {bulkActions}
            </div>
          )}
        </div>

        {/* Toolbar Actions */}
        {toolbarActions && <div className="flex gap-2">{toolbarActions}</div>}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-none border border-border-subtle">
        <table className="w-full">
          {/* Header */}
          <thead className="border-b border-border-subtle bg-layer-02">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected && !allSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-left text-sm font-medium text-text-primary',
                    column.sortable && 'cursor-pointer select-none hover:bg-surface-hover',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <span className="text-text-secondary">
                        {sortKey === column.key && sortDirection === 'asc' && '↑'}
                        {sortKey === column.key && sortDirection === 'desc' && '↓'}
                        {sortKey !== column.key && '⇅'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-border-subtle">
            {isLoading ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-12 text-center"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Spinner size="md" />
                    <span className="text-text-secondary">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : displayData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-12 text-center text-text-secondary"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              displayData.map((row, index) => {
                const rowKey = (row as any)[keyField];
                const isSelected = selectedKeys.has(rowKey);

                return (
                  <tr
                    key={rowKey}
                    className={cn(
                      'transition-colors duration-110',
                      onRowClick && 'cursor-pointer hover:bg-surface-hover',
                      isSelected && 'bg-brand-10'
                    )}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {selectable && (
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            handleSelectRow(rowKey, checked as boolean)
                          }
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      const value = (row as any)[column.key];
                      const content = column.render
                        ? column.render(value, row, index)
                        : value;

                      return (
                        <td
                          key={column.key}
                          className={cn(
                            'px-4 py-3 text-sm text-text-primary',
                            column.align === 'center' && 'text-center',
                            column.align === 'right' && 'text-right'
                          )}
                        >
                          {content}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length}{' '}
            results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

DataTableComponent.displayName = 'DataTable';

// Export memoized version for performance
export const DataTable = memo(DataTableComponent) as typeof DataTableComponent;

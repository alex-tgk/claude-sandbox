import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataTable, type DataTableColumn } from './DataTable';
import { Badge } from '../../atoms/badge/Badge';
import { Button } from '../../atoms/button/Button';

const meta = {
  title: 'Organisms/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comprehensive, feature-rich data table combining sorting, filtering, pagination, row selection, and bulk actions. Perfect for complex datasets.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
  department: string;
  salary: number;
}

// Generate sample data
const generateUsers = (count: number): User[] => {
  const roles = ['Admin', 'Developer', 'Designer', 'Manager', 'Analyst'];
  const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales'];
  const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'inactive', 'pending'];
  const names = [
    'Alice Johnson',
    'Bob Smith',
    'Carol White',
    'David Brown',
    'Emma Davis',
    'Frank Miller',
    'Grace Wilson',
    'Henry Moore',
    'Ivy Taylor',
    'Jack Anderson',
    'Kate Thomas',
    'Liam Jackson',
    'Mia Martin',
    'Noah Lee',
    'Olivia Harris',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length],
    email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    joinedDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toISOString().split('T')[0],
    department: departments[i % departments.length],
    salary: 50000 + i * 5000,
  }));
};

const sampleUsers = generateUsers(50);

// Column definitions
const userColumns: DataTableColumn<User>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    width: '200px',
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
  },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
    width: '150px',
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    width: '120px',
    render: (value: 'active' | 'inactive' | 'pending') => {
      const variants = {
        active: 'success' as const,
        inactive: 'secondary' as const,
        pending: 'warning' as const,
      };
      return <Badge variant={variants[value]}>{value}</Badge>;
    },
  },
  {
    key: 'department',
    header: 'Department',
    sortable: true,
    width: '150px',
  },
  {
    key: 'joinedDate',
    header: 'Joined',
    sortable: true,
    width: '120px',
  },
];

const salaryColumns: DataTableColumn<User>[] = [
  ...userColumns,
  {
    key: 'salary',
    header: 'Salary',
    sortable: true,
    width: '120px',
    align: 'right',
    render: (value: number) => `$${value.toLocaleString()}`,
  },
];

// Basic table
export const Basic: Story = {
  args: {
    data: sampleUsers.slice(0, 5),
    columns: userColumns,
    title: 'Team Members',
    description: 'View and manage your team',
  },
};

// With search
export const WithSearch: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    title: 'Searchable Users',
    searchable: true,
    searchPlaceholder: 'Search by name, email, or role...',
  },
};

// With pagination
export const WithPagination: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    title: 'Paginated Data',
    paginated: true,
    pageSize: 10,
  },
};

// Full featured
export const FullFeatured: Story = {
  args: {
    data: sampleUsers,
    columns: salaryColumns,
    title: 'Employee Directory',
    description: 'Complete employee information with all features enabled',
    searchable: true,
    paginated: true,
    pageSize: 10,
    selectable: true,
    toolbarActions: (
      <>
        <Button variant="outline" size="sm">
          Export
        </Button>
        <Button variant="primary" size="sm">
          Add Employee
        </Button>
      </>
    ),
  },
};

// With selection and bulk actions
const SelectionDemo = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());

  return (
    <DataTable
      data={sampleUsers.slice(0, 20)}
      columns={userColumns}
      title="User Management"
      description="Select users to perform bulk actions"
      searchable
      paginated
      pageSize={10}
      selectable
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      bulkActions={
        <>
          <Button variant="outline" size="sm">
            Send Email
          </Button>
          <Button variant="outline" size="sm">
            Change Status
          </Button>
          <Button variant="danger" size="sm">
            Delete
          </Button>
        </>
      }
      toolbarActions={
        <Button variant="primary" size="sm">
          Invite User
        </Button>
      }
    />
  );
};

export const WithSelectionAndBulkActions: Story = {
  render: () => <SelectionDemo />,
};

// Loading state
export const Loading: Story = {
  args: {
    data: [],
    columns: userColumns,
    title: 'Loading Data',
    isLoading: true,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    data: [],
    columns: userColumns,
    title: 'No Users',
    emptyMessage: 'No users found. Click "Add User" to create one.',
    toolbarActions: (
      <Button variant="primary" size="sm">
        Add User
      </Button>
    ),
  },
};

// With row click
const RowClickDemo = () => {
  const [clickedRow, setClickedRow] = useState<User | null>(null);

  return (
    <div className="space-y-4">
      {clickedRow && (
        <div className="rounded-none border border-border-interactive bg-brand-10 p-4">
          <h3 className="font-medium text-text-primary">Selected User:</h3>
          <p className="text-sm text-text-secondary">
            {clickedRow.name} ({clickedRow.email}) - {clickedRow.role}
          </p>
        </div>
      )}
      <DataTable
        data={sampleUsers.slice(0, 10)}
        columns={userColumns}
        title="Click a Row"
        description="Click any row to see details"
        onRowClick={(row) => setClickedRow(row)}
      />
    </div>
  );
};

export const WithRowClick: Story = {
  render: () => <RowClickDemo />,
};

// Custom rendering
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  featured: boolean;
}

const products: Product[] = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', price: 299, stock: 45, rating: 4.5, featured: true },
  { id: 2, name: 'Smart Watch', category: 'Electronics', price: 399, stock: 23, rating: 4.8, featured: true },
  { id: 3, name: 'Laptop Stand', category: 'Accessories', price: 49, stock: 156, rating: 4.2, featured: false },
  { id: 4, name: 'USB-C Cable', category: 'Accessories', price: 19, stock: 234, rating: 4.0, featured: false },
  { id: 5, name: 'Mechanical Keyboard', category: 'Electronics', price: 159, stock: 67, rating: 4.7, featured: true },
];

const productColumns: DataTableColumn<Product>[] = [
  {
    key: 'name',
    header: 'Product',
    sortable: true,
    render: (value, row) => (
      <div>
        <div className="font-medium text-text-primary">{value}</div>
        {row.featured && (
          <Badge variant="info" size="sm">Featured</Badge>
        )}
      </div>
    ),
  },
  {
    key: 'category',
    header: 'Category',
    sortable: true,
  },
  {
    key: 'price',
    header: 'Price',
    sortable: true,
    align: 'right',
    render: (value: number) => (
      <span className="font-medium text-text-primary">${value}</span>
    ),
  },
  {
    key: 'stock',
    header: 'Stock',
    sortable: true,
    align: 'right',
    render: (value: number) => {
      const variant = value > 100 ? 'success' : value > 50 ? 'warning' : 'error';
      return <Badge variant={variant}>{value}</Badge>;
    },
  },
  {
    key: 'rating',
    header: 'Rating',
    sortable: true,
    align: 'center',
    render: (value: number) => (
      <span className="text-text-primary">{'⭐'.repeat(Math.round(value))}</span>
    ),
  },
];

export const CustomRendering: Story = {
  args: {
    data: products,
    columns: productColumns,
    title: 'Product Catalog',
    description: 'Products with custom cell rendering',
    searchable: true,
  },
};

// Compact variant
export const Compact: Story = {
  args: {
    data: sampleUsers.slice(0, 15),
    columns: [
      { key: 'name', header: 'Name', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Role', sortable: true },
      {
        key: 'status',
        header: 'Status',
        render: (value: string) => (
          <Badge size="sm" variant={value === 'active' ? 'success' : 'secondary'}>
            {value}
          </Badge>
        ),
      },
    ],
    title: 'Compact View',
    searchable: true,
    paginated: true,
    pageSize: 5,
  },
};

// All features combined
const CompleteDemo = () => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());

  return (
    <DataTable
      data={sampleUsers}
      columns={salaryColumns}
      title="Complete Employee Management System"
      description="Full-featured data table with all capabilities demonstrated"
      keyField="id"
      searchable
      searchPlaceholder="Search employees by name, email, role, or department..."
      paginated
      pageSize={15}
      selectable
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      bulkActions={
        <>
          <Button variant="outline" size="sm">
            Export Selected
          </Button>
          <Button variant="outline" size="sm">
            Send Email
          </Button>
          <Button variant="outline" size="sm">
            Update Status
          </Button>
          <Button variant="danger" size="sm">
            Remove
          </Button>
        </>
      }
      toolbarActions={
        <>
          <Button variant="outline" size="sm">
            Import
          </Button>
          <Button variant="outline" size="sm">
            Export All
          </Button>
          <Button variant="primary" size="sm">
            Add Employee
          </Button>
        </>
      }
      onRowClick={(row) => console.log('Clicked:', row)}
    />
  );
};

export const CompleteExample: Story = {
  render: () => <CompleteDemo />,
};

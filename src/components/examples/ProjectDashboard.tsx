import { useState } from 'react';
import { cn } from '../../utils/cn';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Badge,
  Avatar,
  Tag,
  ProgressBar,
  StatCard,
  DataTable,
  CommandPalette,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  NotificationToast,
  SearchInput,
  Select,
  EmptyState,
  Stepper,
  Alert,
  SegmentedControl,
  type DataTableColumn,
  type CommandItem,
  type Step,
  type SegmentedControlOption,
} from '../index';

/**
 * ProjectDashboard - A comprehensive real-world example
 *
 * @remarks
 * This example demonstrates how to compose multiple components from the library
 * to create a production-ready project management interface. It showcases:
 * - Complex layouts with Cards and Tabs
 * - Data visualization with DataTable and StatCards
 * - Interactive features with CommandPalette
 * - Form controls and filters
 * - State management patterns
 * - Responsive design
 *
 * @example
 * ```tsx
 * <ProjectDashboard />
 * ```
 */

// Types for our data
interface Task {
  id: string;
  title: string;
  assignee: {
    name: string;
    avatar?: string;
  };
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  progress: number;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  tasksCompleted: number;
  tasksActive: number;
}

// Mock data
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design system component library',
    assignee: { name: 'Sarah Chen', avatar: 'SC' },
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-11-01',
    progress: 65,
  },
  {
    id: '2',
    title: 'API integration for user authentication',
    assignee: { name: 'Michael Rodriguez', avatar: 'MR' },
    status: 'review',
    priority: 'urgent',
    dueDate: '2025-10-28',
    progress: 90,
  },
  {
    id: '3',
    title: 'Database schema optimization',
    assignee: { name: 'Emily Watson', avatar: 'EW' },
    status: 'done',
    priority: 'medium',
    dueDate: '2025-10-25',
    progress: 100,
  },
  {
    id: '4',
    title: 'Mobile responsive layout fixes',
    assignee: { name: 'David Kim', avatar: 'DK' },
    status: 'todo',
    priority: 'low',
    dueDate: '2025-11-05',
    progress: 0,
  },
  {
    id: '5',
    title: 'Performance optimization - lazy loading',
    assignee: { name: 'Sarah Chen', avatar: 'SC' },
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-10-30',
    progress: 45,
  },
];

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Lead Developer',
    avatar: 'SC',
    status: 'online',
    tasksCompleted: 24,
    tasksActive: 2,
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    role: 'Backend Engineer',
    avatar: 'MR',
    status: 'online',
    tasksCompleted: 18,
    tasksActive: 1,
  },
  {
    id: '3',
    name: 'Emily Watson',
    role: 'Database Admin',
    avatar: 'EW',
    status: 'away',
    tasksCompleted: 31,
    tasksActive: 0,
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Frontend Developer',
    avatar: 'DK',
    status: 'offline',
    tasksCompleted: 15,
    tasksActive: 1,
  },
];

const projectSteps: Step[] = [
  { label: 'Planning', status: 'complete' },
  { label: 'Design', status: 'complete' },
  { label: 'Development', status: 'current' },
  { label: 'Testing', status: 'upcoming' },
  { label: 'Deployment', status: 'upcoming' },
];

export function ProjectDashboard() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<string>('kanban');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Helper function to get status badge variant
  const getStatusBadge = (status: Task['status']) => {
    const variants: Record<Task['status'], any> = {
      'todo': 'default',
      'in-progress': 'info',
      'review': 'warning',
      'done': 'success',
    };
    const labels: Record<Task['status'], string> = {
      'todo': 'To Do',
      'in-progress': 'In Progress',
      'review': 'Review',
      'done': 'Done',
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  // Helper function to get priority tag variant
  const getPriorityTag = (priority: Task['priority']) => {
    const variants: Record<Task['priority'], any> = {
      'low': 'default',
      'medium': 'info',
      'high': 'warning',
      'urgent': 'error',
    };
    return <Tag variant={variants[priority]} size="sm">{priority.toUpperCase()}</Tag>;
  };

  // DataTable columns
  const taskColumns: DataTableColumn<Task>[] = [
    {
      key: 'title',
      header: 'Task',
      sortable: true,
      render: (value, row) => (
        <div className="py-1">
          <div className="font-semibold text-text-primary group-hover:text-brand-60 transition-colors">
            {value}
          </div>
          <div className="mt-2 flex items-center gap-2">
            {getPriorityTag(row.priority)}
          </div>
        </div>
      ),
    },
    {
      key: 'assignee',
      header: 'Assignee',
      render: (value) => (
        <div className="flex items-center gap-3">
          <Avatar size="sm" status={value.avatar ? undefined : 'online'}>
            {value.avatar}
          </Avatar>
          <span className="text-sm font-medium text-text-primary">{value.name}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      align: 'center',
      render: (value) => getStatusBadge(value),
    },
    {
      key: 'progress',
      header: 'Progress',
      render: (value) => (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium text-text-secondary">
            <span>{value}%</span>
          </div>
          <ProgressBar
            value={value}
            tone={value === 100 ? 'success' : 'brand'}
            showValue={false}
          />
        </div>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
      render: (value) => {
        const date = new Date(value);
        const today = new Date();
        const daysUntil = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const isOverdue = daysUntil < 0;
        const isUrgent = daysUntil <= 2 && daysUntil >= 0;

        return (
          <div className="space-y-1">
            <div className={cn(
              "text-sm font-medium",
              isOverdue && "text-error",
              isUrgent && "text-warning",
              !isOverdue && !isUrgent && "text-text-primary"
            )}>
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            {(isOverdue || isUrgent) && (
              <div className={cn(
                "text-xs font-medium",
                isOverdue && "text-error",
                isUrgent && "text-warning"
              )}>
                {isOverdue ? `${Math.abs(daysUntil)}d overdue` : `${daysUntil}d left`}
              </div>
            )}
          </div>
        );
      },
    },
  ];

  // Command palette commands
  const commands: CommandItem[] = [
    {
      id: 'new-task',
      label: 'Create New Task',
      description: 'Add a new task to the project',
      category: 'Actions',
      shortcut: ['⌘', 'N'],
      badge: 'Quick',
      onSelect: () => showToast('Creating new task...'),
    },
    {
      id: 'new-sprint',
      label: 'Start New Sprint',
      description: 'Begin a new development sprint',
      category: 'Actions',
      shortcut: ['⌘', 'Shift', 'S'],
      onSelect: () => showToast('Starting new sprint...'),
    },
    {
      id: 'export-data',
      label: 'Export Project Data',
      description: 'Download project data as CSV',
      category: 'Actions',
      onSelect: () => showToast('Exporting data...'),
    },
    {
      id: 'view-team',
      label: 'View Team Members',
      description: 'See all team members and their status',
      category: 'Navigation',
      onSelect: () => showToast('Navigating to team...'),
    },
    {
      id: 'settings',
      label: 'Project Settings',
      description: 'Configure project preferences',
      category: 'Settings',
      shortcut: ['⌘', ','],
      onSelect: () => showToast('Opening settings...'),
    },
  ];

  const showToast = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const viewOptions: SegmentedControlOption[] = [
    { value: 'kanban', label: 'Kanban' },
    { value: 'list', label: 'List' },
    { value: 'timeline', label: 'Timeline' },
  ];

  // Filter tasks based on status
  const filteredTasks = filterStatus === 'all'
    ? mockTasks
    : mockTasks.filter(task => task.status === filterStatus);

  return (
    <div className="min-h-screen bg-layer-01 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">
              Project Management Dashboard
            </h1>
            <p className="text-sm text-text-secondary sm:text-base">
              Track progress, manage tasks, and collaborate with your team
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCommandPaletteOpen(true)}
              className="text-text-secondary hover:text-text-primary"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Quick Actions
              <kbd className="ml-2 hidden rounded border border-border-subtle bg-layer-02 px-1.5 py-0.5 text-xs font-medium sm:inline-block">
                ⌘K
              </kbd>
            </Button>
            <Button variant="primary" size="sm" className="shadow-sm">
              <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Task
            </Button>
          </div>
        </div>

        {/* Project Progress Stepper */}
        <div className="mt-8">
          <Card variant="outlined" className="overflow-hidden border-brand-60/20 bg-gradient-to-br from-brand-10/50 to-transparent">
            <CardBody className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-text-primary">
                    Project Timeline
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    Currently in Development phase
                  </p>
                </div>
                <Badge variant="info" className="hidden sm:inline-flex">
                  On Track
                </Badge>
              </div>
              <Stepper steps={projectSteps} orientation="horizontal" />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Tasks"
          value="47"
          delta="+12% vs last sprint"
          trend="up"
          className="transition-all duration-110 hover:shadow-md hover:-translate-y-0.5"
        />
        <StatCard
          label="Completed"
          value="28"
          delta="+8 this week"
          trend="up"
          className="transition-all duration-110 hover:shadow-md hover:-translate-y-0.5"
        />
        <StatCard
          label="In Progress"
          value="12"
          delta="no change"
          trend="neutral"
          className="transition-all duration-110 hover:shadow-md hover:-translate-y-0.5"
        />
        <StatCard
          label="Team Velocity"
          value="8.5"
          delta="+15% points/day"
          trend="up"
          className="transition-all duration-110 hover:shadow-md hover:-translate-y-0.5"
        />
      </div>

      {/* Alert for urgent items */}
      <div className="mb-8">
        <Alert variant="warning" className="border-l-4 border-l-warning">
          <div className="flex items-start gap-3">
            <svg className="mt-0.5 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold">Attention Required</p>
              <p className="mt-1 text-sm">
                1 urgent task requires review - API integration deadline is approaching in 2 days.
              </p>
            </div>
          </div>
        </Alert>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="tasks" className="space-y-6">
        <TabList className="border-b border-border-subtle">
          <Tab value="tasks" className="relative">
            <span>Tasks</span>
            <Badge variant="secondary" size="sm" className="ml-2">
              {filteredTasks.length}
            </Badge>
          </Tab>
          <Tab value="team" className="relative">
            <span>Team</span>
            <Badge variant="secondary" size="sm" className="ml-2">
              {mockTeamMembers.length}
            </Badge>
          </Tab>
          <Tab value="activity" className="relative">
            Activity
          </Tab>
        </TabList>

        {/* Tasks Tab */}
        <TabPanel value="tasks" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card variant="outlined" className="shadow-sm">
            <CardHeader className="border-b border-border-subtle bg-layer-02/50">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">Task Management</h2>
                  <p className="mt-1 text-sm text-text-secondary">
                    Organize and track your team's work
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <SegmentedControl
                    options={viewOptions}
                    value={selectedView}
                    onChange={setSelectedView}
                    size="sm"
                  />
                  <Select
                    value={filterStatus}
                    onChange={(value) => setFilterStatus(value as string)}
                    size="sm"
                    options={[
                      { label: 'All Status', value: 'all' },
                      { label: 'To Do', value: 'todo' },
                      { label: 'In Progress', value: 'in-progress' },
                      { label: 'Review', value: 'review' },
                      { label: 'Done', value: 'done' },
                    ]}
                  />
                  <SearchInput placeholder="Search tasks..." className="min-w-[200px]" />
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <DataTable
                data={filteredTasks}
                columns={taskColumns}
                searchable
                selectable
                paginated
                pageSize={5}
                emptyMessage="No tasks found. Create one to get started!"
              />
            </CardBody>
          </Card>
        </TabPanel>

        {/* Team Tab */}
        <TabPanel value="team" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Team Members</h2>
              <p className="mt-1 text-sm text-text-secondary">
                {mockTeamMembers.filter(m => m.status === 'online').length} members online
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mockTeamMembers.map((member, index) => (
              <Card
                key={member.id}
                variant="elevated"
                hover
                className="group transition-all duration-110 hover:shadow-lg"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardBody className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Avatar
                      size="lg"
                      status={member.status}
                      className="transition-transform duration-110 group-hover:scale-110"
                    >
                      {member.avatar}
                    </Avatar>
                    <Badge
                      variant={member.status === 'online' ? 'success' : 'secondary'}
                      className="capitalize"
                    >
                      {member.status}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">{member.name}</h3>
                    <p className="text-sm text-text-secondary">{member.role}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 rounded-none border border-border-subtle bg-layer-02/50 p-3">
                    <div className="text-center">
                      <div className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                        Completed
                      </div>
                      <div className="mt-1 text-xl font-bold text-text-primary">
                        {member.tasksCompleted}
                      </div>
                    </div>
                    <div className="text-center border-l border-border-subtle">
                      <div className="text-xs font-medium uppercase tracking-wide text-text-secondary">
                        Active
                      </div>
                      <div className="mt-1 text-xl font-bold text-brand-60">
                        {member.tasksActive}
                      </div>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="border-t border-border-subtle bg-layer-02/30">
                  <Button
                    variant="ghost"
                    size="sm"
                    isFullWidth
                    className="font-medium"
                  >
                    View Profile →
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabPanel>

        {/* Activity Tab */}
        <TabPanel value="activity" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card variant="outlined" className="shadow-sm">
            <CardBody className="py-16">
              <EmptyState
                title="Activity Feed Coming Soon"
                description="We're building a comprehensive activity timeline to help you track all project changes and team updates in real-time."
                tone="informative"
                primaryAction={
                  <Button variant="primary" size="md">
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Learn More
                  </Button>
                }
                secondaryAction={
                  <Button variant="ghost" size="md">
                    View Roadmap
                  </Button>
                }
              />
            </CardBody>
          </Card>
        </TabPanel>
      </Tabs>

      {/* Command Palette */}
      <CommandPalette
        items={commands}
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        placeholder="Type a command or search..."
      />

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-2 fade-in duration-200 sm:bottom-6 sm:right-6">
          <NotificationToast
            variant="success"
            title="Action Completed"
            description={notificationMessage}
            onDismiss={() => setShowNotification(false)}
            dismissible
          />
        </div>
      )}
    </div>
  );
}

ProjectDashboard.displayName = 'ProjectDashboard';

import { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  StatCard,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  DataTable,
  ProgressBar,
  SegmentedControl,
  Avatar,
  type DataTableColumn,
  type SegmentedControlOption,
} from '../index';

/**
 * AnalyticsDashboard - Analytics & Metrics Example
 *
 * @remarks
 * This example demonstrates a data-focused analytics dashboard with:
 * - Different layout from ProjectDashboard
 * - Focus on charts and metrics visualization
 * - Real-time data simulation
 * - Multiple stat cards with trends
 * - Time-based data filtering
 *
 * Components Used:
 * - StatCard, Card, Tabs, DataTable, ProgressBar, Badge, SegmentedControl, Avatar
 *
 * @example
 * ```tsx
 * <AnalyticsDashboard />
 * ```
 */

// Types
interface MetricData {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down' | 'neutral';
}

interface PerformanceData {
  id: string;
  metric: string;
  current: number;
  target: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  category: string;
}

interface UserActivity {
  id: string;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  action: string;
  timestamp: string;
  impact: 'high' | 'medium' | 'low';
  details: string;
}

interface ChannelMetric {
  id: string;
  channel: string;
  visitors: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
  trend: 'up' | 'down' | 'neutral';
}

// Mock data generators
const generateMetrics = (timeRange: string): MetricData[] => {
  const multiplier = timeRange === '7d' ? 1 : timeRange === '30d' ? 1.5 : 0.5;

  return [
    {
      label: 'Total Revenue',
      value: `$${(142567 * multiplier).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      delta: '+23.5% vs last period',
      trend: 'up',
    },
    {
      label: 'Active Users',
      value: (8945 * multiplier).toLocaleString(undefined, { maximumFractionDigits: 0 }),
      delta: '+12.3% vs last period',
      trend: 'up',
    },
    {
      label: 'Conversion Rate',
      value: '4.8%',
      delta: '+0.8% vs last period',
      trend: 'up',
    },
    {
      label: 'Avg Session Duration',
      value: '5m 42s',
      delta: '-0.3% vs last period',
      trend: 'down',
    },
    {
      label: 'Page Views',
      value: (234567 * multiplier).toLocaleString(undefined, { maximumFractionDigits: 0 }),
      delta: '+18.2% vs last period',
      trend: 'up',
    },
    {
      label: 'Bounce Rate',
      value: '42.3%',
      delta: '-2.1% vs last period',
      trend: 'up',
    },
  ];
};

const performanceData: PerformanceData[] = [
  {
    id: '1',
    metric: 'Website Load Time',
    current: 92,
    target: 100,
    status: 'excellent',
    category: 'Performance',
  },
  {
    id: '2',
    metric: 'API Response Time',
    current: 85,
    target: 100,
    status: 'good',
    category: 'Performance',
  },
  {
    id: '3',
    metric: 'Mobile Responsiveness',
    current: 95,
    target: 100,
    status: 'excellent',
    category: 'User Experience',
  },
  {
    id: '4',
    metric: 'Accessibility Score',
    current: 88,
    target: 100,
    status: 'good',
    category: 'User Experience',
  },
  {
    id: '5',
    metric: 'Security Score',
    current: 78,
    target: 100,
    status: 'fair',
    category: 'Security',
  },
  {
    id: '6',
    metric: 'SEO Optimization',
    current: 91,
    target: 100,
    status: 'excellent',
    category: 'Marketing',
  },
  {
    id: '7',
    metric: 'Code Quality',
    current: 83,
    target: 100,
    status: 'good',
    category: 'Development',
  },
  {
    id: '8',
    metric: 'Test Coverage',
    current: 68,
    target: 100,
    status: 'fair',
    category: 'Development',
  },
];

const userActivity: UserActivity[] = [
  {
    id: '1',
    user: {
      name: 'Alex Johnson',
      avatar: 'AJ',
      role: 'Product Manager',
    },
    action: 'Created new campaign',
    timestamp: '2 minutes ago',
    impact: 'high',
    details: 'Q4 2025 Product Launch Campaign',
  },
  {
    id: '2',
    user: {
      name: 'Sarah Williams',
      avatar: 'SW',
      role: 'Marketing Lead',
    },
    action: 'Updated analytics settings',
    timestamp: '15 minutes ago',
    impact: 'medium',
    details: 'Enabled conversion tracking for new funnel',
  },
  {
    id: '3',
    user: {
      name: 'Mike Chen',
      avatar: 'MC',
      role: 'Data Analyst',
    },
    action: 'Generated report',
    timestamp: '1 hour ago',
    impact: 'low',
    details: 'Monthly performance summary exported',
  },
  {
    id: '4',
    user: {
      name: 'Emily Brown',
      avatar: 'EB',
      role: 'SEO Specialist',
    },
    action: 'Optimized 15 pages',
    timestamp: '2 hours ago',
    impact: 'high',
    details: 'Improved meta descriptions and keywords',
  },
  {
    id: '5',
    user: {
      name: 'David Lee',
      avatar: 'DL',
      role: 'Developer',
    },
    action: 'Deployed tracking update',
    timestamp: '3 hours ago',
    impact: 'medium',
    details: 'Enhanced event tracking implementation',
  },
];

const channelMetrics: ChannelMetric[] = [
  {
    id: '1',
    channel: 'Organic Search',
    visitors: 45234,
    conversions: 2341,
    revenue: 89456.32,
    conversionRate: 5.18,
    trend: 'up',
  },
  {
    id: '2',
    channel: 'Direct Traffic',
    visitors: 32145,
    conversions: 1876,
    revenue: 67234.89,
    conversionRate: 5.84,
    trend: 'up',
  },
  {
    id: '3',
    channel: 'Social Media',
    visitors: 28934,
    conversions: 1234,
    revenue: 45678.12,
    conversionRate: 4.26,
    trend: 'down',
  },
  {
    id: '4',
    channel: 'Email Marketing',
    visitors: 18765,
    conversions: 1456,
    revenue: 54321.45,
    conversionRate: 7.76,
    trend: 'up',
  },
  {
    id: '5',
    channel: 'Paid Ads',
    visitors: 23456,
    conversions: 987,
    revenue: 34567.78,
    conversionRate: 4.21,
    trend: 'neutral',
  },
  {
    id: '6',
    channel: 'Referral',
    visitors: 12345,
    conversions: 678,
    revenue: 23456.90,
    conversionRate: 5.49,
    trend: 'up',
  },
];

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<string>('7d');
  const [metrics, setMetrics] = useState<MetricData[]>(generateMetrics('7d'));
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLiveUpdates] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    if (!isLiveUpdates) return;

    const interval = setInterval(() => {
      setMetrics(generateMetrics(timeRange));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isLiveUpdates, timeRange]);

  const timeRangeOptions: SegmentedControlOption[] = [
    { value: '24h', label: '24h' },
    { value: '7d', label: '7d' },
    { value: '30d', label: '30d' },
  ];

  const categoryOptions: SegmentedControlOption[] = [
    { value: 'all', label: 'All' },
    { value: 'Performance', label: 'Performance' },
    { value: 'User Experience', label: 'UX' },
    { value: 'Security', label: 'Security' },
  ];

  // Filter performance data
  const filteredPerformance =
    selectedCategory === 'all'
      ? performanceData
      : performanceData.filter((item) => item.category === selectedCategory);

  // Performance table columns
  const performanceColumns: DataTableColumn<PerformanceData>[] = [
    {
      key: 'metric',
      header: 'Metric',
      sortable: true,
      render: (value, row) => (
        <div className="py-1">
          <div className="font-semibold text-text-primary">{value}</div>
          <div className="text-xs text-text-secondary">{row.category}</div>
        </div>
      ),
    },
    {
      key: 'current',
      header: 'Current Score',
      sortable: true,
      align: 'center',
      render: (value, row) => (
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-text-primary">{value}%</span>
            <Badge
              variant={
                row.status === 'excellent'
                  ? 'success'
                  : row.status === 'good'
                  ? 'info'
                  : row.status === 'fair'
                  ? 'warning'
                  : 'error'
              }
              size="sm"
            >
              {row.status}
            </Badge>
          </div>
          <ProgressBar
            value={value}
            tone={
              row.status === 'excellent' || row.status === 'good'
                ? 'success'
                : 'brand'
            }
            showValue={false}
          />
        </div>
      ),
    },
    {
      key: 'target',
      header: 'Target',
      align: 'center',
      render: (value) => (
        <div className="font-medium text-text-secondary">{value}%</div>
      ),
    },
  ];

  // Channel metrics table columns
  const channelColumns: DataTableColumn<ChannelMetric>[] = [
    {
      key: 'channel',
      header: 'Channel',
      sortable: true,
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-text-primary">{value}</span>
          {row.trend === 'up' && (
            <svg className="h-4 w-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
          {row.trend === 'down' && (
            <svg className="h-4 w-4 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
        </div>
      ),
    },
    {
      key: 'visitors',
      header: 'Visitors',
      sortable: true,
      align: 'right',
      render: (value) => <span className="font-medium text-text-primary">{value.toLocaleString()}</span>,
    },
    {
      key: 'conversions',
      header: 'Conversions',
      sortable: true,
      align: 'right',
      render: (value) => <span className="font-medium text-text-primary">{value.toLocaleString()}</span>,
    },
    {
      key: 'conversionRate',
      header: 'Conv. Rate',
      sortable: true,
      align: 'right',
      render: (value) => (
        <Badge variant={value >= 6 ? 'success' : value >= 4 ? 'info' : 'warning'}>
          {value.toFixed(2)}%
        </Badge>
      ),
    },
    {
      key: 'revenue',
      header: 'Revenue',
      sortable: true,
      align: 'right',
      render: (value) => (
        <span className="font-semibold text-brand-60">
          ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-layer-01 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">
              Analytics Dashboard
            </h1>
            <p className="text-sm text-text-secondary sm:text-base">
              Real-time insights and performance metrics
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-none border border-border-subtle bg-layer-02 px-3 py-2">
              <div className={cn('h-2 w-2 rounded-full', isLiveUpdates ? 'bg-success animate-pulse' : 'bg-text-disabled')}>
              </div>
              <span className="text-xs font-medium text-text-secondary">
                {isLiveUpdates ? 'Live Updates' : 'Paused'}
              </span>
            </div>
            <SegmentedControl
              options={timeRangeOptions}
              value={timeRange}
              onChange={(value) => {
                setTimeRange(value);
                setMetrics(generateMetrics(value));
              }}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {metrics.map((metric, index) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            delta={metric.delta}
            trend={metric.trend}
            className="transition-all duration-110 hover:shadow-md hover:-translate-y-0.5"
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabList className="border-b border-border-subtle">
          <Tab value="performance">Performance</Tab>
          <Tab value="channels">Channels</Tab>
          <Tab value="activity">Activity</Tab>
        </TabList>

        {/* Performance Tab */}
        <TabPanel value="performance" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card variant="outlined" className="shadow-sm">
            <CardHeader className="border-b border-border-subtle bg-layer-02/50">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">Performance Metrics</h2>
                  <p className="mt-1 text-sm text-text-secondary">
                    Track key performance indicators across your platform
                  </p>
                </div>
                <SegmentedControl
                  options={categoryOptions}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  size="sm"
                />
              </div>
            </CardHeader>
            <CardBody>
              <DataTable
                data={filteredPerformance}
                columns={performanceColumns}
                searchable
                paginated
                pageSize={8}
                emptyMessage="No performance metrics found"
              />
            </CardBody>
          </Card>
        </TabPanel>

        {/* Channels Tab */}
        <TabPanel value="channels" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card variant="outlined" className="shadow-sm">
            <CardHeader className="border-b border-border-subtle bg-layer-02/50">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">Traffic Channels</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Analyze visitor sources and conversion performance by channel
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <DataTable
                data={channelMetrics}
                columns={channelColumns}
                searchable
                selectable
                paginated
                pageSize={6}
                emptyMessage="No channel data available"
              />
            </CardBody>
          </Card>

          {/* Channel Summary Cards */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card variant="outlined" className="border-l-4 border-l-brand-60">
              <CardBody className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-text-secondary">Total Visitors</h3>
                  <Badge variant="info">All Channels</Badge>
                </div>
                <div className="text-3xl font-bold text-text-primary">
                  {channelMetrics.reduce((sum, ch) => sum + ch.visitors, 0).toLocaleString()}
                </div>
                <div className="text-xs text-text-secondary">
                  Across {channelMetrics.length} active channels
                </div>
              </CardBody>
            </Card>

            <Card variant="outlined" className="border-l-4 border-l-success">
              <CardBody className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-text-secondary">Total Conversions</h3>
                  <Badge variant="success">+18.2%</Badge>
                </div>
                <div className="text-3xl font-bold text-text-primary">
                  {channelMetrics.reduce((sum, ch) => sum + ch.conversions, 0).toLocaleString()}
                </div>
                <div className="text-xs text-text-secondary">
                  Average rate: {(
                    (channelMetrics.reduce((sum, ch) => sum + ch.conversions, 0) /
                      channelMetrics.reduce((sum, ch) => sum + ch.visitors, 0)) *
                    100
                  ).toFixed(2)}%
                </div>
              </CardBody>
            </Card>

            <Card variant="outlined" className="border-l-4 border-l-warning">
              <CardBody className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-text-secondary">Total Revenue</h3>
                  <Badge variant="warning">Top Sources</Badge>
                </div>
                <div className="text-3xl font-bold text-brand-60">
                  ${channelMetrics.reduce((sum, ch) => sum + ch.revenue, 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="text-xs text-text-secondary">
                  Avg per visitor: ${(
                    channelMetrics.reduce((sum, ch) => sum + ch.revenue, 0) /
                    channelMetrics.reduce((sum, ch) => sum + ch.visitors, 0)
                  ).toFixed(2)}
                </div>
              </CardBody>
            </Card>
          </div>
        </TabPanel>

        {/* Activity Tab */}
        <TabPanel value="activity" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card variant="outlined" className="shadow-sm">
            <CardHeader className="border-b border-border-subtle bg-layer-02/50">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Track team actions and system events in real-time
                </p>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-0 divide-y divide-border-subtle">
                {userActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex gap-4 py-4 first:pt-0 last:pb-0 hover:bg-layer-02/30 transition-colors px-4 -mx-4 first:-mt-4 last:-mb-4"
                  >
                    <Avatar size="md" status="online">
                      {activity.user.avatar}
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-text-primary">
                            {activity.user.name}
                          </p>
                          <p className="text-sm text-text-secondary">{activity.user.role}</p>
                        </div>
                        <Badge
                          variant={
                            activity.impact === 'high'
                              ? 'error'
                              : activity.impact === 'medium'
                              ? 'warning'
                              : 'secondary'
                          }
                          size="sm"
                        >
                          {activity.impact} impact
                        </Badge>
                      </div>
                      <p className="text-sm text-text-primary">
                        <span className="font-medium">{activity.action}</span>
                      </p>
                      <p className="text-sm text-text-secondary">{activity.details}</p>
                      <p className="text-xs text-text-disabled">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </TabPanel>
      </Tabs>
    </div>
  );
}

AnalyticsDashboard.displayName = 'AnalyticsDashboard';

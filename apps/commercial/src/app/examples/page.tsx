'use client';

import Link from 'next/link';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Tag,
  Grid,
  Stack,
  Divider,
  Alert,
} from '@modular-ui/system';

/**
 * Examples showcase page demonstrating real-world usage patterns
 * and component combinations - built using actual library components.
 */
export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <section className="bg-white border-b border-neutral-200 py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl space-y-8">
            <Badge variant="info" size="lg">Example Applications</Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight">
              Real-World Examples
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-3xl">
              Real-world examples and patterns showing how to combine components
              to build common UI patterns and workflows. All examples are
              production-ready and fully functional.
            </p>
            <Alert variant="info">
              💡 <strong>Tip:</strong> Click "View Demo" to see the full interactive example,
              or "View Code" to see the implementation.
            </Alert>
          </div>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="py-20 md:py-32">
        <div className="container-custom">
          <Grid cols={2} gap="8" className="grid-cols-1 lg:grid-cols-2">
            {examples.map((example, index) => (
              <Card key={index} variant="elevated" hover>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">
                      {example.category}
                    </Badge>
                    <ComplexityBadge level={example.complexity} />
                  </div>
                </CardHeader>

                <CardBody>
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 leading-snug">
                      {example.title}
                    </h3>
                    <p className="text-base text-neutral-700 leading-relaxed">
                      {example.description}
                    </p>

                    {/* Components Used */}
                    <div className="space-y-3 pt-4 border-t border-neutral-200">
                      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                        Components Used
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {example.componentsUsed.map((comp, i) => (
                          <Tag key={i} size="sm" variant="secondary">{comp}</Tag>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 pt-4 border-t border-neutral-200">
                      <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                        Key Features
                      </div>
                      <ul className="text-sm text-neutral-700 space-y-2">
                        {example.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-green-600 flex-shrink-0 mt-0.5 font-semibold">✓</span>
                            <span className="leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardBody>

                <CardFooter>
                  <div className="flex gap-3 w-full">
                    <Link href={`/examples/${example.slug}`} className="flex-1">
                      <Button variant="primary" isFullWidth>View Demo</Button>
                    </Link>
                    <Link href={`https://github.com/yourusername/modular-ui/tree/main/src/components/examples/${example.slug}`}>
                      <Button variant="outline">View Code</Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      <Divider />

      {/* Coming Soon */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <Card variant="flat" size="lg" className="max-w-4xl mx-auto bg-primary-50 border-2 border-primary-200">
            <CardBody>
              <div className="text-center space-y-8 py-8">
                <Badge variant="info" size="lg">Coming Soon</Badge>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
                  More Examples on the Way
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                  We're constantly adding new examples and patterns including authentication flows,
                  data tables, charts & graphs, and more. Check back regularly or star our GitHub
                  repository to stay updated.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <Button variant="primary" size="lg">
                    Star on GitHub ⭐
                  </Button>
                  <Button variant="outline" size="lg">
                    Request Example
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  );
}

/**
 * Complexity badge component using library Badge
 */
function ComplexityBadge({ level }: { level: ComplexityLevel }) {
  const labels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  return (
    <Badge variant="secondary" size="sm">
      {labels[level]}
    </Badge>
  );
}

/**
 * Type definitions
 */
type ComplexityLevel = 'beginner' | 'intermediate' | 'advanced';

interface ExampleInfo {
  title: string;
  description: string;
  category: string;
  complexity: ComplexityLevel;
  slug: string;
  componentsUsed: string[];
  features: string[];
}

/**
 * Example data - Now featuring REAL examples from the library!
 */
const examples: ExampleInfo[] = [
  {
    title: 'Project Dashboard',
    description: 'Comprehensive project management interface with tasks, team overview, command palette, and real-time notifications. Features 20+ components working together seamlessly.',
    category: 'Dashboards',
    complexity: 'intermediate',
    slug: 'project-dashboard',
    componentsUsed: ['DataTable', 'Tabs', 'StatCard', 'Avatar', 'Badge', 'Dialog', 'CommandPalette', 'Tag', '+12 more'],
    features: [
      'Task management with filtering and sorting',
      'Team member overview with avatars',
      'Command palette for quick actions (Cmd+K)',
      'Real-time notifications system',
      'Responsive design for mobile and desktop',
      'Full keyboard navigation support',
    ],
  },
  {
    title: 'Product Catalog',
    description: 'E-commerce product browsing with grid layout, filtering, search, shopping cart, and toast notifications. Perfect foundation for online stores.',
    category: 'E-Commerce',
    complexity: 'intermediate',
    slug: 'product-catalog',
    componentsUsed: ['Card', 'Badge', 'Button', 'SearchInput', 'Select', 'NotificationToast', 'Tag', 'Avatar'],
    features: [
      'Product grid with responsive layout',
      'Real-time search and filtering',
      'Shopping cart with quantity management',
      'Toast notifications for user feedback',
      'Sale price badges and inventory status',
      'Category-based filtering',
    ],
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time analytics interface with live data updates, stat cards with trends, performance tracking, and channel analysis tables.',
    category: 'Dashboards',
    complexity: 'intermediate',
    slug: 'analytics-dashboard',
    componentsUsed: ['StatCard', 'DataTable', 'ProgressBar', 'Badge', 'Tabs', 'Card', 'Tag'],
    features: [
      'Live data updates every 5 seconds',
      'Trend indicators (up/down/neutral)',
      'Performance metrics with progress bars',
      'Channel analysis with sortable tables',
      'Date range filtering',
      'Export data capabilities',
    ],
  },
  {
    title: 'Settings & Profile',
    description: 'Complete settings management with 4 tabbed sections, change detection, unsaved changes warnings, and comprehensive form controls.',
    category: 'Forms',
    complexity: 'intermediate',
    slug: 'settings-profile',
    componentsUsed: ['Tabs', 'Input', 'Checkbox', 'Switch', 'Radio', 'Select', 'Button', 'Alert', 'Avatar', '+4 more'],
    features: [
      'Multi-section tabbed interface',
      'Change detection across all settings',
      'Unsaved changes warning on navigation',
      'Profile photo upload with preview',
      'Notification preferences management',
      'Privacy and security settings',
    ],
  },
];

'use client';

import Link from 'next/link';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  StatCard,
  Alert,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Avatar,
  Tag,
  ProgressBar,
  Divider,
  Grid,
  Stack,
  IconButton,
} from '@modular-ui/system';

/**
 * Landing page for the Modular UI System commercial showcase.
 * Built entirely using components from the library to showcase them in action.
 */
export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-24 md:pt-32 md:pb-40 bg-gradient-to-b from-white to-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="animate-slide-up">
              <Badge variant="info" size="lg">⚠️ Alpha: Active Development</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance leading-tight animate-slide-up animation-delay-100">
              Built for<br />
              <span className="inline-block mt-2">Modern Development</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
              Everything you need to build enterprise applications with confidence.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-4 animate-slide-up animation-delay-300">
              <Link href="/docs">
                <Button variant="primary" size="lg">
                  Get Started →
                </Button>
              </Link>
              <Link href="/components">
                <Button variant="outline" size="lg">
                  View Components
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="ghost" size="lg">
                  See Examples
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Tag variant="success">35 Components</Tag>
              <Tag variant="info">TypeScript Strict</Tag>
              <Tag variant="secondary">WCAG 2.2 AA Target</Tag>
              <Tag variant="primary">MIT License</Tag>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with StatCards */}
      <section className="py-16 md:py-20 border-y border-neutral-200 bg-white">
        <div className="container-custom">
          <Grid cols={4} gap="8" className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total Components"
              value="35"
              delta="+4 this month"
              trend="up"
            />
            <StatCard
              label="Test Coverage"
              value="97.2%"
              delta="478/492 passing"
              trend="up"
            />
            <StatCard
              label="TypeScript"
              value="100%"
              delta="Strict mode"
              trend="up"
            />
            <StatCard
              label="Status"
              value="Alpha"
              delta="Active development"
              trend="up"
            />
          </Grid>
        </div>
      </section>

      {/* Alert Banner */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <Alert variant="warning">
            ⚠️ <strong>Alpha Status:</strong> v0.2.0 - Under active development. API may change. Includes 35 components, 5 themes, and 3 example applications.
            <Link href="/examples" className="ml-2 underline font-medium">
              View examples →
            </Link>
          </Alert>
        </div>
      </section>

      {/* Features Section with Cards */}
      <section className="py-20 md:py-32 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <Badge variant="primary">Features</Badge>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Built for Modern Development
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              Everything you need to build enterprise applications with confidence.
            </p>
          </div>

          <Grid cols={3} gap="8" className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} variant="elevated" hover>
                <CardBody>
                  <div className="space-y-4">
                    <div className="h-14 w-14 bg-primary-500 flex items-center justify-center text-white text-3xl rounded-none">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-base text-neutral-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <Badge variant="secondary" size="sm">{feature.badge}</Badge>
                  </div>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      {/* Component Categories with Interactive Cards */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <Badge variant="success">Component Library</Badge>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Comprehensive Component Collection
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              From basic atoms to complex organisms. All components are accessible, tested, and documented.
            </p>
          </div>

          <Tabs defaultValue="atoms">
            <TabList className="mb-12">
              <Tab value="atoms">Atoms (19)</Tab>
              <Tab value="molecules">Molecules (10)</Tab>
              <Tab value="organisms">Organisms (6)</Tab>
            </TabList>

            <TabPanel value="atoms">
              <Grid cols={4} gap="md" className="grid-cols-2 md:grid-cols-4">
                {atomComponents.map((comp, i) => (
                  <Link key={i} href="/components">
                    <Card variant="outlined" hover clickable>
                      <CardBody>
                        <Stack direction="column" gap="sm" align="center">
                          <div className="text-3xl">{comp.icon}</div>
                          <h4 className="text-sm font-semibold">{comp.name}</h4>
                          <Badge size="sm" variant="info">{comp.count}</Badge>
                        </Stack>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value="molecules">
              <Grid cols={4} gap="md" className="grid-cols-2 md:grid-cols-4">
                {moleculeComponents.map((comp, i) => (
                  <Link key={i} href="/components">
                    <Card variant="outlined" hover clickable>
                      <CardBody>
                        <Stack direction="column" gap="sm" align="center">
                          <div className="text-3xl">{comp.icon}</div>
                          <h4 className="text-sm font-semibold">{comp.name}</h4>
                          <Badge size="sm" variant="success">{comp.count}</Badge>
                        </Stack>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value="organisms">
              <Grid cols={4} gap="md" className="grid-cols-2 md:grid-cols-4">
                {organismComponents.map((comp, i) => (
                  <Link key={i} href="/components">
                    <Card variant="outlined" hover clickable>
                      <CardBody>
                        <Stack direction="column" gap="sm" align="center">
                          <div className="text-3xl">{comp.icon}</div>
                          <h4 className="text-sm font-semibold">{comp.name}</h4>
                          <Badge size="sm" variant="warning">{comp.count}</Badge>
                        </Stack>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </Grid>
            </TabPanel>
          </Tabs>

          <div className="mt-16 text-center">
            <Link href="/components">
              <Button variant="primary" size="lg">
                Explore All Components →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* Real-World Examples Section */}
      <section className="py-20 md:py-32 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <Badge variant="info">Example Applications</Badge>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Real-World Examples
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              See how components work together in complete application examples (alpha quality).
            </p>
          </div>

          <Grid cols={2} gap="8" className="grid-cols-1 lg:grid-cols-2">
            {examples.map((example, index) => (
              <Card key={index} variant="elevated" hover>
                <CardHeader>
                  <Stack direction="row" justify="between" align="center">
                    <h3 className="text-xl font-semibold">{example.title}</h3>
                    <Badge variant={example.badgeVariant as any}>{example.complexity}</Badge>
                  </Stack>
                </CardHeader>
                <CardBody>
                  <Stack direction="column" gap="md">
                    <p className="text-neutral-600">{example.description}</p>
                    <ProgressBar
                      value={example.completeness}
                      tone="brand"
                      label={`${example.completeness}% Complete`}
                    />
                    <Stack direction="row" gap="xs" className="flex-wrap">
                      {example.components.map((comp, i) => (
                        <Tag key={i} size="sm" variant="secondary">{comp}</Tag>
                      ))}
                    </Stack>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <Stack direction="row" gap="sm" className="w-full">
                    <Link href="/examples" className="flex-1">
                      <Button variant="primary" isFullWidth>View Demo</Button>
                    </Link>
                    <Link href="/examples">
                      <Button variant="outline">Code</Button>
                    </Link>
                  </Stack>
                </CardFooter>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      {/* CTA Section with Card */}
      <section className="py-20 md:py-32 bg-primary-500">
        <div className="container-custom">
          <Card variant="flat" size="lg" className="bg-primary-600/20 border-2 border-white/20 max-w-4xl mx-auto">
            <CardBody>
              <div className="text-center text-white space-y-8 py-8">
                <Badge variant="secondary" size="lg">Ready to Start?</Badge>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                  Start Building Today
                </h2>
                <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
                  Explore 35 Carbon-inspired components in alpha. Perfect for prototyping
                  and development. Full documentation and examples included.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <Link href="/docs">
                    <Button variant="secondary" size="lg">
                      Read Documentation
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10">
                      View Pricing
                    </Button>
                  </Link>
                </div>
                <div className="text-sm text-primary-100 pt-2">
                  Open source • MIT License • Active development
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>
    </>
  );
}

const features = [
  {
    icon: '🎨',
    title: 'IBM Carbon Inspired',
    description: 'Sharp, professional aesthetic with clean lines and consistent spacing.',
    badge: 'Design System',
  },
  {
    icon: '♿',
    title: 'Accessibility Focused',
    description: 'Targeting WCAG 2.2 Level AA compliance with keyboard and screen reader support.',
    badge: 'A11y',
  },
  {
    icon: '⚡',
    title: 'TypeScript Native',
    description: 'Written in TypeScript with comprehensive type definitions.',
    badge: 'Type-Safe',
  },
  {
    icon: '🎯',
    title: 'Tailwind CSS',
    description: 'Built with Tailwind for maximum customization and consistency.',
    badge: 'Customizable',
  },
  {
    icon: '📦',
    title: 'Tree-Shakeable',
    description: 'Optimized bundle sizes with ESM and tree-shaking support.',
    badge: 'Optimized',
  },
  {
    icon: '🧪',
    title: 'Well Tested',
    description: '97.2% test coverage (478/492 tests passing) with Vitest and React Testing Library.',
    badge: 'High Quality',
  },
] as const;

const atomComponents = [
  { name: 'Button', icon: '🔘', count: '5 variants' },
  { name: 'Input', icon: '📝', count: '3 sizes' },
  { name: 'TextArea', icon: '📄', count: 'New!' },
  { name: 'Checkbox', icon: '☑️', count: '3 states' },
  { name: 'Radio', icon: '⭕', count: 'Groups' },
  { name: 'Switch', icon: '🔄', count: '3 sizes' },
  { name: 'Badge', icon: '🏷️', count: '6 colors' },
  { name: 'Avatar', icon: '👤', count: '4 sizes' },
  { name: 'Tag', icon: '🔖', count: '6 variants' },
  { name: 'Spinner', icon: '⏳', count: '4 sizes' },
  { name: 'Grid', icon: '📐', count: 'New!' },
  { name: 'Stack', icon: '📚', count: 'New!' },
  { name: 'Flex', icon: '🔀', count: 'New!' },
  { name: 'Divider', icon: '➖', count: 'Layouts' },
  { name: 'Progress', icon: '📊', count: 'Bars' },
  { name: 'IconButton', icon: '⚡', count: '5 variants' },
];

const moleculeComponents = [
  { name: 'Alert', icon: '⚠️', count: '4 variants' },
  { name: 'Select', icon: '📋', count: 'With search' },
  { name: 'Tooltip', icon: '💬', count: '4 positions' },
  { name: 'StatCard', icon: '📊', count: 'With trends' },
  { name: 'Stepper', icon: '🪜', count: 'Progress' },
  { name: 'EmptyState', icon: '📭', count: 'Placeholders' },
  { name: 'SearchInput', icon: '🔍', count: 'Search' },
  { name: 'SegmentedControl', icon: '🎛️', count: 'Toggle' },
];

const organismComponents = [
  { name: 'Card', icon: '🎴', count: '3 variants' },
  { name: 'Dialog', icon: '🪟', count: '5 sizes' },
  { name: 'Tabs', icon: '📑', count: 'Carbon style' },
  { name: 'DataTable', icon: '📈', count: 'Full featured' },
  { name: 'CommandPalette', icon: '⌘', count: 'Keyboard UI' },
];

const examples = [
  {
    title: 'Analytics Dashboard',
    description: 'Analytics interface with charts, KPIs, and data tables using Carbon design patterns.',
    complexity: 'Example',
    badgeVariant: 'info',
    completeness: 100,
    components: ['StatCard', 'ProgressBar', 'DataTable', 'Grid', 'Badge'],
  },
  {
    title: 'Product Catalog',
    description: 'E-commerce product grid with filtering, search, and responsive layout primitives.',
    complexity: 'Example',
    badgeVariant: 'info',
    completeness: 100,
    components: ['Card', 'Grid', 'Badge', 'Tag', 'Button', 'Stack'],
  },
  {
    title: 'Settings & Profile',
    description: 'User settings interface with tabs, form controls, and validation patterns.',
    complexity: 'Example',
    badgeVariant: 'info',
    completeness: 100,
    components: ['Tabs', 'Input', 'TextArea', 'Checkbox', 'Switch', 'Button'],
  },
];

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
 * SaaSquatch - Referral Marketing & Customer Loyalty Platform
 * A demonstration SaaS website built with the Modular UI System.
 */
export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-24 md:pt-32 md:pb-40 bg-gradient-to-b from-primary-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="animate-slide-up">
              <Badge variant="success" size="lg">🚀 Turn Customers into Champions</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-balance leading-tight animate-slide-up animation-delay-100">
              Grow Your Business<br />
              <span className="inline-block mt-2 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Through Referrals</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
              SaaSquatch helps you launch referral programs, loyalty rewards, and viral growth campaigns that turn your customers into your best marketing channel.
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-4 animate-slide-up animation-delay-300">
              <Link href="/docs">
                <Button variant="primary" size="lg">
                  Start Free Trial →
                </Button>
              </Link>
              <Link href="/examples">
                <Button variant="outline" size="lg">
                  See Demo
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="ghost" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-2">
              <Tag variant="success">14-Day Free Trial</Tag>
              <Tag variant="info">No Credit Card Required</Tag>
              <Tag variant="secondary">Setup in 5 Minutes</Tag>
              <Tag variant="primary">SOC 2 Compliant</Tag>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with StatCards */}
      <section className="py-16 md:py-20 border-y border-neutral-200 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-2">Trusted by Growing Companies</h2>
            <p className="text-neutral-600">Join thousands of businesses growing through referrals</p>
          </div>
          <Grid cols={4} gap="8" className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Active Programs"
              value="12,500+"
              delta="+850 this month"
              trend="up"
            />
            <StatCard
              label="Referrals Generated"
              value="2.4M"
              delta="+15% from last month"
              trend="up"
            />
            <StatCard
              label="Average Conversion"
              value="24%"
              delta="3x industry average"
              trend="up"
            />
            <StatCard
              label="Customer Satisfaction"
              value="4.9/5"
              delta="Based on 3,200+ reviews"
              trend="up"
            />
          </Grid>
        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <Alert variant="success">
            🎉 <strong>New:</strong> Advanced analytics and AI-powered reward optimization now available on Pro and Enterprise plans.
            <Link href="/pricing" className="ml-2 underline font-medium">
              Upgrade now →
            </Link>
          </Alert>
        </div>
      </section>

      {/* Features Section with Cards */}
      <section className="py-20 md:py-32 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <Badge variant="primary">Platform Features</Badge>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Everything You Need to Scale
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              Build powerful referral programs with our comprehensive platform designed for growth.
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

      {/* Program Types with Interactive Cards */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <Badge variant="success">Program Types</Badge>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Programs for Every Growth Strategy
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              From simple referral programs to sophisticated loyalty systems. Launch any campaign in minutes.
            </p>
          </div>

          <Tabs defaultValue="referral">
            <TabList className="mb-12">
              <Tab value="referral">Referral Programs</Tab>
              <Tab value="loyalty">Loyalty & Rewards</Tab>
              <Tab value="partner">Partner Programs</Tab>
            </TabList>

            <TabPanel value="referral">
              <Grid cols={4} gap="md" className="grid-cols-2 md:grid-cols-4">
                {referralPrograms.map((program, i) => (
                  <Link key={i} href="/examples">
                    <Card variant="outlined" hover clickable>
                      <CardBody>
                        <Stack direction="column" gap="sm" align="center">
                          <div className="text-3xl">{program.icon}</div>
                          <h4 className="text-sm font-semibold text-center">{program.name}</h4>
                          <Badge size="sm" variant="info">{program.type}</Badge>
                        </Stack>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value="loyalty">
              <Grid cols={4} gap="md" className="grid-cols-2 md:grid-cols-4">
                {loyaltyPrograms.map((program, i) => (
                  <Link key={i} href="/examples">
                    <Card variant="outlined" hover clickable>
                      <CardBody>
                        <Stack direction="column" gap="sm" align="center">
                          <div className="text-3xl">{program.icon}</div>
                          <h4 className="text-sm font-semibold text-center">{program.name}</h4>
                          <Badge size="sm" variant="success">{program.type}</Badge>
                        </Stack>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value="partner">
              <Grid cols={4} gap="md" className="grid-cols-2 md:grid-cols-4">
                {partnerPrograms.map((program, i) => (
                  <Link key={i} href="/examples">
                    <Card variant="outlined" hover clickable>
                      <CardBody>
                        <Stack direction="column" gap="sm" align="center">
                          <div className="text-3xl">{program.icon}</div>
                          <h4 className="text-sm font-semibold text-center">{program.name}</h4>
                          <Badge size="sm" variant="warning">{program.type}</Badge>
                        </Stack>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </Grid>
            </TabPanel>
          </Tabs>

          <div className="mt-16 text-center">
            <Link href="/examples">
              <Button variant="primary" size="lg">
                Explore All Program Types →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Divider />

      {/* Use Cases Section */}
      <section className="py-20 md:py-32 bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <Badge variant="info">Success Stories</Badge>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Built for Every Industry
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              See how companies across industries use SaaSquatch to drive growth through referrals.
            </p>
          </div>

          <Grid cols={2} gap="8" className="grid-cols-1 lg:grid-cols-2">
            {useCases.map((useCase, index) => (
              <Card key={index} variant="elevated" hover>
                <CardHeader>
                  <Stack direction="row" justify="between" align="center">
                    <h3 className="text-xl font-semibold">{useCase.title}</h3>
                    <Badge variant={useCase.badgeVariant as any}>{useCase.industry}</Badge>
                  </Stack>
                </CardHeader>
                <CardBody>
                  <Stack direction="column" gap="md">
                    <p className="text-neutral-600">{useCase.description}</p>
                    <ProgressBar
                      value={useCase.growth}
                      tone="brand"
                      label={`${useCase.growth}% growth achieved`}
                    />
                    <Stack direction="row" gap="xs" className="flex-wrap">
                      {useCase.features.map((feature, i) => (
                        <Tag key={i} size="sm" variant="secondary">{feature}</Tag>
                      ))}
                    </Stack>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <Stack direction="row" gap="sm" className="w-full">
                    <Link href="/examples" className="flex-1">
                      <Button variant="primary" isFullWidth>Read Case Study</Button>
                    </Link>
                    <Link href="/docs">
                      <Button variant="outline">Learn More</Button>
                    </Link>
                  </Stack>
                </CardFooter>
              </Card>
            ))}
          </Grid>
        </div>
      </section>

      {/* CTA Section with Card */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary-600 to-primary-500">
        <div className="container-custom">
          <Card variant="flat" size="lg" className="bg-white/10 border-2 border-white/20 max-w-4xl mx-auto backdrop-blur-sm">
            <CardBody>
              <div className="text-center text-white space-y-8 py-8">
                <Badge variant="secondary" size="lg">Start Growing Today</Badge>
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                  Launch Your Referral Program
                </h2>
                <p className="text-lg md:text-xl text-primary-50 max-w-2xl mx-auto leading-relaxed">
                  Join 12,500+ companies using SaaSquatch to turn customers into advocates.
                  Start your 14-day free trial today, no credit card required.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <Link href="/docs">
                    <Button variant="secondary" size="lg">
                      Start Free Trial →
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white/10">
                      View Pricing
                    </Button>
                  </Link>
                </div>
                <div className="text-sm text-primary-50 pt-2">
                  14-day free trial • No credit card required • Setup in 5 minutes
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
    icon: '🎯',
    title: 'Customizable Programs',
    description: 'Build referral, loyalty, and partner programs tailored to your unique business goals.',
    badge: 'Flexible',
  },
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Track performance, measure ROI, and optimize campaigns with real-time insights.',
    badge: 'Data-Driven',
  },
  {
    icon: '⚡',
    title: 'Quick Setup',
    description: 'Launch your first program in minutes with pre-built templates and easy integration.',
    badge: 'Fast',
  },
  {
    icon: '🔗',
    title: 'Seamless Integration',
    description: 'Connect with your existing tools via REST API, webhooks, and native integrations.',
    badge: 'Connected',
  },
  {
    icon: '🎁',
    title: 'Flexible Rewards',
    description: 'Offer cash, credits, discounts, or custom rewards that drive engagement.',
    badge: 'Rewarding',
  },
  {
    icon: '🔒',
    title: 'Enterprise Security',
    description: 'SOC 2 Type II certified with bank-level encryption and fraud prevention.',
    badge: 'Secure',
  },
] as const;

const referralPrograms = [
  { name: 'Friend Referral', icon: '👥', type: 'Classic' },
  { name: 'Gift Cards', icon: '🎁', type: 'Popular' },
  { name: 'Influencer', icon: '⭐', type: 'Trending' },
  { name: 'Employee Advocacy', icon: '👔', type: 'B2B' },
  { name: 'Share & Earn', icon: '💰', type: 'Revenue' },
  { name: 'Milestone Rewards', icon: '🎯', type: 'Advanced' },
  { name: 'Social Sharing', icon: '📱', type: 'Viral' },
  { name: 'Email Referral', icon: '📧', type: 'Direct' },
];

const loyaltyPrograms = [
  { name: 'Points System', icon: '⭐', type: 'Core' },
  { name: 'VIP Tiers', icon: '👑', type: 'Premium' },
  { name: 'Cashback', icon: '💵', type: 'Revenue' },
  { name: 'Punch Cards', icon: '🎫', type: 'Simple' },
  { name: 'Birthday Rewards', icon: '🎂', type: 'Engagement' },
  { name: 'Anniversary Gifts', icon: '🎊', type: 'Retention' },
  { name: 'Early Access', icon: '🔓', type: 'Exclusive' },
  { name: 'Free Shipping', icon: '📦', type: 'Benefit' },
];

const partnerPrograms = [
  { name: 'Affiliate', icon: '🤝', type: 'Revenue Share' },
  { name: 'Reseller', icon: '🏪', type: 'Channel' },
  { name: 'Integration Partners', icon: '🔌', type: 'Tech' },
  { name: 'Agency Program', icon: '🎨', type: 'Service' },
  { name: 'Co-Marketing', icon: '📢', type: 'Joint' },
  { name: 'White Label', icon: '🏷️', type: 'Enterprise' },
];

const useCases = [
  {
    title: 'E-commerce Growth',
    description: 'Online retailer increased customer acquisition by 156% using friend referral and loyalty rewards programs.',
    industry: 'Retail',
    badgeVariant: 'success',
    growth: 156,
    features: ['Friend Referral', 'Points System', 'VIP Tiers', 'Email Campaigns'],
  },
  {
    title: 'SaaS Expansion',
    description: 'B2B software company reduced CAC by 43% while scaling to 10,000+ active referrers through partner programs.',
    industry: 'Technology',
    badgeVariant: 'info',
    growth: 243,
    features: ['Affiliate Program', 'Partner Portal', 'Tiered Commissions', 'Analytics'],
  },
  {
    title: 'Subscription Service',
    description: 'Streaming platform improved retention by 68% with milestone rewards and exclusive member benefits.',
    industry: 'Media',
    badgeVariant: 'warning',
    growth: 168,
    features: ['Milestone Rewards', 'Early Access', 'Social Sharing', 'Personalization'],
  },
];

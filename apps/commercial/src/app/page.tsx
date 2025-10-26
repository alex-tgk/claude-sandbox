import Link from 'next/link';

/**
 * Landing page for the Modular UI System commercial showcase.
 * Features hero section, key benefits, component preview, and CTA sections.
 */
export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-white to-neutral-50">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-slide-up text-balance">
              Enterprise-Grade React Components
            </h1>
            <p className="mt-6 text-lg md:text-xl text-neutral-600 text-balance animate-slide-up animation-delay-200">
              Build production-ready applications faster with our accessible, customizable,
              and fully-typed component library. Inspired by IBM Carbon Design System.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-400">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary-500 hover:bg-primary-600 focus-ring transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/components"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-neutral-900 bg-white border border-neutral-300 hover:bg-neutral-50 focus-ring transition-colors"
              >
                View Components
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-neutral-200 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Components', value: '50+' },
              { label: 'Accessibility', value: 'WCAG 2.1' },
              { label: 'TypeScript', value: '100%' },
              { label: 'Bundle Size', value: '<50KB' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-500">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2>Built for Modern Development</h2>
            <p className="mt-4 text-lg text-neutral-600">
              Everything you need to build enterprise applications with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 card-shadow hover:border-primary-500 border border-transparent transition-all"
              >
                <div className="h-12 w-12 bg-primary-500 flex items-center justify-center text-white text-2xl">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Component Preview Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2>Comprehensive Component Library</h2>
            <p className="mt-4 text-lg text-neutral-600">
              From basic atoms to complex organisms. All components are accessible, tested, and documented.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {componentCategories.map((category, index) => (
              <Link
                key={index}
                href={`/components#${category.slug}`}
                className="group p-6 bg-neutral-50 hover:bg-primary-50 border border-neutral-200 hover:border-primary-500 transition-all focus-ring"
              >
                <div className="text-2xl mb-3">{category.icon}</div>
                <h4 className="text-sm font-semibold text-neutral-900 group-hover:text-primary-600">
                  {category.name}
                </h4>
                <p className="text-xs text-neutral-600 mt-1">{category.count} components</p>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/components"
              className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium focus-ring rounded px-4 py-2"
            >
              View All Components
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-500 text-white">
        <div className="container-custom">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-white">Ready to Build Something Great?</h2>
            <p className="mt-6 text-lg text-primary-100">
              Join thousands of developers building modern applications with Modular UI System.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-primary-500 bg-white hover:bg-neutral-50 focus-ring transition-colors"
              >
                Start Building
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white border-2 border-white hover:bg-primary-600 focus-ring transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Feature highlights for the landing page
 */
const features = [
  {
    icon: '🎨',
    title: 'IBM Carbon Inspired',
    description: 'Sharp, professional aesthetic with clean lines and consistent spacing following enterprise design standards.',
  },
  {
    icon: '♿',
    title: 'Accessibility First',
    description: 'WCAG 2.1 Level AA compliant. Full keyboard navigation, screen reader support, and ARIA attributes.',
  },
  {
    icon: '⚡',
    title: 'TypeScript Native',
    description: 'Written in TypeScript with comprehensive type definitions. Full IntelliSense support and type safety.',
  },
  {
    icon: '🎯',
    title: 'Tailwind CSS',
    description: 'Built with Tailwind CSS for maximum customization. Override any style to match your brand.',
  },
  {
    icon: '📦',
    title: 'Tree-Shakeable',
    description: 'Optimized bundle sizes with ESM and tree-shaking support. Only include what you use.',
  },
  {
    icon: '🧪',
    title: 'Thoroughly Tested',
    description: 'Comprehensive test coverage with Vitest and React Testing Library. Production-ready code.',
  },
] as const;

/**
 * Component categories for quick navigation
 */
const componentCategories = [
  { name: 'Atoms', slug: 'atoms', icon: '🔸', count: 12 },
  { name: 'Molecules', slug: 'molecules', icon: '🔹', count: 15 },
  { name: 'Organisms', slug: 'organisms', icon: '🔷', count: 10 },
  { name: 'Templates', slug: 'templates', icon: '📋', count: 8 },
  { name: 'Forms', slug: 'forms', icon: '📝', count: 11 },
  { name: 'Navigation', slug: 'navigation', icon: '🧭', count: 6 },
  { name: 'Feedback', slug: 'feedback', icon: '💬', count: 7 },
  { name: 'Layout', slug: 'layout', icon: '📐', count: 5 },
] as const;

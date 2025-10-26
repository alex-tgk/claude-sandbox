/**
 * Examples showcase page demonstrating real-world usage patterns
 * and component combinations.
 */
export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <section className="bg-white border-b border-neutral-200 py-12">
        <div className="container-custom">
          <h1>Examples</h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-3xl">
            Real-world examples and patterns showing how to combine components
            to build common UI patterns and workflows.
          </p>
        </div>
      </section>

      {/* Examples Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <ExampleCard key={index} {...example} />
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="border-t border-neutral-200 bg-white py-16">
        <div className="container-custom text-center">
          <h3 className="text-2xl font-semibold">More Examples Coming Soon</h3>
          <p className="mt-4 text-neutral-600 max-w-2xl mx-auto">
            We're constantly adding new examples and patterns. Check back regularly
            or subscribe to our newsletter to stay updated.
          </p>
        </div>
      </section>
    </div>
  );
}

/**
 * Example card component
 */
function ExampleCard({ title, description, category, complexity }: ExampleInfo) {
  return (
    <div className="bg-white p-6 border border-neutral-200 hover:border-primary-500 card-shadow transition-all group">
      {/* Category & Complexity */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium px-2 py-1 bg-primary-100 text-primary-700">
          {category}
        </span>
        <ComplexityBadge level={complexity} />
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-semibold mb-3 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-neutral-600 mb-6">{description}</p>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-neutral-100">
        <button className="text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors">
          View Demo
        </button>
        <button className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
          View Code
        </button>
      </div>
    </div>
  );
}

/**
 * Complexity badge component
 */
function ComplexityBadge({ level }: { level: ComplexityLevel }) {
  const styles = {
    beginner: 'bg-success-100 text-success-700',
    intermediate: 'bg-warning-100 text-warning-700',
    advanced: 'bg-error-100 text-error-700',
  };

  const labels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  return (
    <span className={`text-xs px-2 py-1 font-medium ${styles[level]}`}>
      {labels[level]}
    </span>
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
}

/**
 * Example data - Now featuring REAL examples from the library!
 */
const examples: ExampleInfo[] = [
  {
    title: 'Project Dashboard',
    description: 'Comprehensive project management interface with tasks, team overview, command palette, and real-time notifications. Features 20+ components working together.',
    category: 'Dashboards',
    complexity: 'advanced',
  },
  {
    title: 'Product Catalog',
    description: 'E-commerce product browsing with grid layout, filtering, search, shopping cart, and toast notifications. Perfect for online stores.',
    category: 'E-Commerce',
    complexity: 'intermediate',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time analytics interface with live data updates, stat cards with trends, performance tracking, and channel analysis tables.',
    category: 'Dashboards',
    complexity: 'advanced',
  },
  {
    title: 'Settings & Profile',
    description: 'Complete settings management with 4 tabbed sections, change detection, unsaved changes warnings, and comprehensive form controls.',
    category: 'Forms',
    complexity: 'intermediate',
  },
];

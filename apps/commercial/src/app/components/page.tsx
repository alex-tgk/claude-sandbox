import { ComponentExplorer } from '@/components/ComponentExplorer';
import manifest from '../../../../../docs/component-manifest.json';

export const metadata = {
  title: 'Component Library | Modular UI System',
  description: 'Browse our comprehensive library of 50+ production-ready React components built with TypeScript and Tailwind CSS.',
};

/**
 * Component explorer page showcasing all available components
 * organized by atomic design categories.
 */
export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Page Header */}
      <section className="bg-white border-b border-neutral-200 py-12">
        <div className="container-custom">
          <h1>Component Library</h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-3xl">
            Explore our comprehensive collection of production-ready React components.
            Each component is accessible, customizable, and fully typed with TypeScript.
          </p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg border border-neutral-200 bg-white p-4">
              <div className="text-3xl font-bold text-primary-600">{manifest.components.length}</div>
              <div className="mt-1 text-sm text-neutral-600">Components</div>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-4">
              <div className="text-3xl font-bold text-primary-600">100%</div>
              <div className="mt-1 text-sm text-neutral-600">TypeScript</div>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-4">
              <div className="text-3xl font-bold text-primary-600">WCAG 2.1</div>
              <div className="mt-1 text-sm text-neutral-600">Accessible</div>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-4">
              <div className="text-3xl font-bold text-primary-600">MIT</div>
              <div className="mt-1 text-sm text-neutral-600">License</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Component Explorer */}
      <section className="section-padding">
        <div className="container-custom">
          <ComponentExplorer manifest={manifest} />
        </div>
      </section>
    </div>
  );
}

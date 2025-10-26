/**
 * Component Explorer - Interactive component documentation browser
 *
 * This React component provides an interactive interface for exploring
 * all UI components with live examples, prop documentation, and search.
 *
 * Usage on commercial website:
 * ```tsx
 * import { ComponentExplorer } from './docs/ComponentExplorer';
 * import manifest from './docs/component-manifest.json';
 *
 * <ComponentExplorer manifest={manifest} />
 * ```
 */

import React, { useState, useMemo } from 'react';

interface PropDefinition {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
  required: boolean;
}

interface StoryExample {
  name: string;
  code: string;
  description?: string;
}

interface ComponentDoc {
  name: string;
  category: 'atoms' | 'molecules' | 'organisms' | 'templates';
  description: string;
  props: PropDefinition[];
  variants: string[];
  sizes?: string[];
  examples: StoryExample[];
  accessibility: {
    keyboardNavigation?: string;
    ariaAttributes?: string[];
    screenReaderSupport?: string;
    focusManagement?: string;
    wcagCompliance?: string;
  };
  filePath: string;
  storyPath?: string;
  since: string;
}

interface ComponentManifest {
  version: string;
  generatedAt: string;
  components: ComponentDoc[];
  categories: {
    atoms: string[];
    molecules: string[];
    organisms: string[];
    templates: string[];
  };
}

interface ComponentExplorerProps {
  manifest: ComponentManifest;
}

const CategoryBadge: React.FC<{ category: ComponentDoc['category'] }> = ({ category }) => {
  const colors = {
    atoms: 'bg-blue-100 text-blue-800',
    molecules: 'bg-green-100 text-green-800',
    organisms: 'bg-purple-100 text-purple-800',
    templates: 'bg-orange-100 text-orange-800',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${colors[category]}`}>
      {category}
    </span>
  );
};

const PropTable: React.FC<{ props: PropDefinition[] }> = ({ props }) => {
  if (props.length === 0) {
    return (
      <p className="text-gray-500 italic">
        This component does not accept custom props beyond standard HTML attributes.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prop
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Default
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Required
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.map((prop) => (
            <tr key={prop.name}>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-mono text-blue-600">
                {prop.name}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-mono text-gray-700">
                {prop.type}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-mono text-gray-500">
                {prop.defaultValue || '-'}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm">
                {prop.required ? (
                  <span className="text-red-600 font-semibold">Yes</span>
                ) : (
                  <span className="text-gray-400">No</span>
                )}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'tsx' }) => {
  return (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto text-sm">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

const ComponentDetails: React.FC<{ component: ComponentDoc }> = ({ component }) => {
  const [activeTab, setActiveTab] = useState<'props' | 'examples' | 'accessibility'>('props');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold text-gray-900">{component.name}</h2>
          <CategoryBadge category={component.category} />
        </div>
        <p className="text-gray-600 mb-4">{component.description}</p>

        <div className="flex flex-wrap gap-2">
          {component.variants.length > 0 && (
            <div className="text-sm">
              <span className="font-semibold">Variants:</span>{' '}
              {component.variants.map((v) => (
                <span key={v} className="inline-block bg-gray-100 px-2 py-1 rounded mr-1">
                  {v}
                </span>
              ))}
            </div>
          )}
          {component.sizes && component.sizes.length > 0 && (
            <div className="text-sm">
              <span className="font-semibold">Sizes:</span>{' '}
              {component.sizes.map((s) => (
                <span key={s} className="inline-block bg-gray-100 px-2 py-1 rounded mr-1">
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {(['props', 'examples', 'accessibility'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm capitalize
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'props' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Props</h3>
            <PropTable props={component.props} />

            <div className="mt-6 p-4 bg-blue-50 rounded">
              <h4 className="font-semibold mb-2">Installation</h4>
              <CodeBlock code={`import { ${component.name} } from '@your-org/ui-library';`} language="tsx" />
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Examples</h3>
            {component.examples.length > 0 ? (
              <div className="space-y-6">
                {component.examples.slice(0, 5).map((example, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      {example.name.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    {example.description && (
                      <p className="text-gray-600 mb-3">{example.description}</p>
                    )}
                    <CodeBlock code={example.code} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No examples available yet.</p>
            )}
          </div>
        )}

        {activeTab === 'accessibility' && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Accessibility</h3>
            <div className="space-y-4">
              {component.accessibility.keyboardNavigation && (
                <div>
                  <h4 className="font-semibold text-gray-900">Keyboard Navigation</h4>
                  <p className="text-gray-700">{component.accessibility.keyboardNavigation}</p>
                </div>
              )}

              {component.accessibility.ariaAttributes && component.accessibility.ariaAttributes.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900">ARIA Attributes</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {component.accessibility.ariaAttributes.map((attr) => (
                      <li key={attr} className="text-gray-700 font-mono text-sm">
                        {attr}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {component.accessibility.screenReaderSupport && (
                <div>
                  <h4 className="font-semibold text-gray-900">Screen Reader Support</h4>
                  <p className="text-gray-700">{component.accessibility.screenReaderSupport}</p>
                </div>
              )}

              {component.accessibility.focusManagement && (
                <div>
                  <h4 className="font-semibold text-gray-900">Focus Management</h4>
                  <p className="text-gray-700">{component.accessibility.focusManagement}</p>
                </div>
              )}

              {component.accessibility.wcagCompliance && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-800 font-semibold">
                    {component.accessibility.wcagCompliance}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Version {component.since}</span>
          <a
            href={component.storyPath}
            className="text-blue-600 hover:text-blue-800 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View in Storybook →
          </a>
        </div>
      </div>
    </div>
  );
};

export const ComponentExplorer: React.FC<ComponentExplorerProps> = ({ manifest }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ComponentDoc['category'] | 'all'>('all');
  const [selectedComponent, setSelectedComponent] = useState<ComponentDoc | null>(null);

  const filteredComponents = useMemo(() => {
    return manifest.components.filter((component) => {
      const matchesSearch =
        searchQuery === '' ||
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [manifest.components, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Component Library</h1>
          <p className="text-gray-600">
            Browse {manifest.components.length} production-ready components with comprehensive documentation
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ComponentDoc['category'] | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="atoms">Atoms ({manifest.categories.atoms.length})</option>
                <option value="molecules">Molecules ({manifest.categories.molecules.length})</option>
                <option value="organisms">Organisms ({manifest.categories.organisms.length})</option>
                <option value="templates">Templates ({manifest.categories.templates.length})</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Component List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">
                  Components ({filteredComponents.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-200 max-h-[calc(100vh-300px)] overflow-y-auto">
                {filteredComponents.map((component) => (
                  <button
                    key={component.name}
                    onClick={() => setSelectedComponent(component)}
                    className={`
                      w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors
                      ${selectedComponent?.name === component.name ? 'bg-blue-50 border-l-4 border-blue-500' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{component.name}</span>
                      <CategoryBadge category={component.category} />
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {component.description}
                    </p>
                    <div className="mt-2 flex gap-2 text-xs text-gray-500">
                      {component.variants.length > 0 && (
                        <span>{component.variants.length} variants</span>
                      )}
                      {component.props.length > 0 && (
                        <span>• {component.props.length} props</span>
                      )}
                    </div>
                  </button>
                ))}

                {filteredComponents.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No components found matching your criteria.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Component Details */}
          <div className="lg:col-span-2">
            {selectedComponent ? (
              <ComponentDetails component={selectedComponent} />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Select a component</h3>
                <p className="mt-2 text-gray-500">
                  Choose a component from the list to view its documentation, props, examples, and accessibility
                  guidelines.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">{manifest.components.length}</div>
              <div className="text-sm text-gray-600">Total Components</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{manifest.categories.atoms.length}</div>
              <div className="text-sm text-gray-600">Atoms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{manifest.categories.molecules.length}</div>
              <div className="text-sm text-gray-600">Molecules</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">{manifest.categories.organisms.length}</div>
              <div className="text-sm text-gray-600">Organisms</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

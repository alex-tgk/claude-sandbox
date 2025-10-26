'use client';

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
  category: string;
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
}

interface ComponentExplorerProps {
  manifest: ComponentManifest;
}

export function ComponentExplorer({ manifest }: ComponentExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedComponent, setSelectedComponent] = useState<ComponentDoc | null>(null);
  const [activeTab, setActiveTab] = useState<'props' | 'examples' | 'accessibility'>('props');

  // Filter components based on search and category
  const filteredComponents = useMemo(() => {
    return manifest.components.filter((component) => {
      const matchesSearch =
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [manifest.components, searchQuery, selectedCategory]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: manifest.components.length,
      atoms: manifest.components.filter((c) => c.category === 'atoms').length,
      molecules: manifest.components.filter((c) => c.category === 'molecules').length,
      organisms: manifest.components.filter((c) => c.category === 'organisms').length,
      templates: manifest.components.filter((c) => c.category === 'templates').length,
    };
  }, [manifest.components]);

  return (
    <div className="flex gap-6 h-full">
      {/* Sidebar */}
      <div className="w-80 flex-shrink-0">
        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Categories</h3>
          <div className="space-y-1">
            {(['all', 'atoms', 'molecules', 'organisms', 'templates'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-100 text-primary-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="capitalize">{category}</span>
                <span className="float-right text-gray-500">{categoryCounts[category]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Component List */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Components ({filteredComponents.length})
          </h3>
          <div className="space-y-1 max-h-[500px] overflow-y-auto">
            {filteredComponents.map((component) => (
              <button
                key={component.name}
                onClick={() => setSelectedComponent(component)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedComponent?.name === component.name
                    ? 'bg-primary-100 text-primary-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{component.name}</div>
                <div className="text-xs text-gray-500 capitalize">{component.category}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-lg border border-gray-200 p-8">
        {selectedComponent ? (
          <>
            {/* Component Header */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedComponent.name}
                  </h2>
                  <p className="text-lg text-gray-600">{selectedComponent.description}</p>
                </div>
                <CategoryBadge category={selectedComponent.category} />
              </div>

              {/* Meta Info */}
              <div className="flex gap-6 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Props:</span> {selectedComponent.props.length}
                </div>
                {selectedComponent.variants.length > 0 && (
                  <div>
                    <span className="font-medium">Variants:</span>{' '}
                    {selectedComponent.variants.length}
                  </div>
                )}
                {selectedComponent.sizes && selectedComponent.sizes.length > 0 && (
                  <div>
                    <span className="font-medium">Sizes:</span> {selectedComponent.sizes.length}
                  </div>
                )}
                <div>
                  <span className="font-medium">Since:</span> {selectedComponent.since}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex gap-6">
                  {(['props', 'examples', 'accessibility'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 px-1 border-b-2 text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <span className="capitalize">{tab}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'props' && <PropTable props={selectedComponent.props} />}
            {activeTab === 'examples' && <ExampleList examples={selectedComponent.examples} />}
            {activeTab === 'accessibility' && (
              <AccessibilityInfo accessibility={selectedComponent.accessibility} />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Select a Component
              </h3>
              <p className="text-gray-600">
                Choose a component from the sidebar to view its documentation
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    atoms: 'bg-blue-100 text-blue-800',
    molecules: 'bg-green-100 text-green-800',
    organisms: 'bg-purple-100 text-purple-800',
    templates: 'bg-orange-100 text-orange-800',
  };

  const colorClass = colors[category] || 'bg-gray-100 text-gray-800';

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
    >
      {category}
    </span>
  );
}

function PropTable({ props }: { props: PropDefinition[] }) {
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
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prop
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Default
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {props.map((prop) => (
            <tr key={prop.name} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">
                <code className="text-purple-600 font-mono">{prop.name}</code>
                {prop.required && (
                  <span className="ml-2 text-red-500 text-xs">*</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm">
                <code className="text-blue-600 font-mono text-xs">{prop.type}</code>
              </td>
              <td className="px-4 py-3 text-sm">
                {prop.defaultValue ? (
                  <code className="text-gray-600 font-mono text-xs">{prop.defaultValue}</code>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExampleList({ examples }: { examples: StoryExample[] }) {
  if (examples.length === 0) {
    return <p className="text-gray-500 italic">No examples available yet.</p>;
  }

  return (
    <div className="space-y-6">
      {examples.map((example, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900">{example.name}</h4>
            {example.description && (
              <p className="text-sm text-gray-600 mt-1">{example.description}</p>
            )}
          </div>
          <div className="bg-gray-900 p-4 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              <code>{example.code}</code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}

function AccessibilityInfo({ accessibility }: { accessibility: ComponentDoc['accessibility'] }) {
  const sections = [
    { key: 'wcagCompliance', title: 'WCAG Compliance', value: accessibility.wcagCompliance },
    { key: 'keyboardNavigation', title: 'Keyboard Navigation', value: accessibility.keyboardNavigation },
    { key: 'screenReaderSupport', title: 'Screen Reader Support', value: accessibility.screenReaderSupport },
    { key: 'focusManagement', title: 'Focus Management', value: accessibility.focusManagement },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        section.value && (
          <div key={section.key}>
            <h4 className="text-sm font-semibold text-gray-900 mb-2">{section.title}</h4>
            <p className="text-gray-700">{section.value}</p>
          </div>
        )
      ))}

      {accessibility.ariaAttributes && accessibility.ariaAttributes.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-2">ARIA Attributes</h4>
          <div className="flex flex-wrap gap-2">
            {accessibility.ariaAttributes.map((attr, index) => (
              <code
                key={index}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-mono rounded"
              >
                {attr}
              </code>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

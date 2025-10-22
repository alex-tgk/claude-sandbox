/**
 * Vitest test setup configuration
 *
 * @remarks
 * - Imports jest-dom matchers for enhanced assertions
 * - Configures global test environment
 * - Can be extended with mocks and polyfills as needed
 *
 * @since 0.1.0
 */

import '@testing-library/jest-dom';

// Mock IntersectionObserver for components that use it
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as unknown as typeof IntersectionObserver;

// Mock ResizeObserver for components that use it
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as unknown as typeof ResizeObserver;

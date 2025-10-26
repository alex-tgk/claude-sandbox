import type { Meta, StoryObj } from '@storybook/react';
import { ProductCatalog } from './ProductCatalog';

/**
 * ProductCatalog - E-Commerce Example
 *
 * A comprehensive e-commerce product catalog demonstrating:
 * - Responsive grid layouts for product cards
 * - Advanced filtering and search functionality
 * - Shopping cart interaction with real-time feedback
 * - Product presentation with images, badges, and tags
 * - Dynamic pricing and discount displays
 *
 * ## Components Used
 *
 * ### Layout & Structure
 * - **Card** - Product containers with image, details, and actions
 * - **Grid** - Responsive product layout (1-4 columns based on screen size)
 *
 * ### Form Controls
 * - **SearchInput** - Full-text product search
 * - **Select** - Category filter and sort dropdown
 * - **Button** - Add to cart and view cart actions
 * - **IconButton** - Cart icon with badge counter
 *
 * ### Display Components
 * - **Badge** - Status indicators (New, Sale, Featured, Stock status)
 * - **Tag** - Product attributes (Bestseller, Premium, etc.)
 * - **Avatar** - Brand initials display
 *
 * ### Feedback
 * - **NotificationToast** - Shopping cart confirmation messages
 *
 * ## Key Features
 *
 * 1. **Product Grid** - Responsive 1-4 column layout adapts to screen size
 * 2. **Advanced Filtering** - Category and search-based filtering
 * 3. **Multiple Sort Options** - Featured, price, rating, reviews
 * 4. **Shopping Cart** - Add items with quantity tracking
 * 5. **Real-time Feedback** - Toast notifications for cart actions
 * 6. **Product Details** - Price, ratings, reviews, stock status
 * 7. **Visual Hierarchy** - Badges for new, sale, featured items
 * 8. **Hover Effects** - Quick view and interactive states
 *
 * ## Real-World Use Cases
 *
 * - **E-Commerce Stores** - Amazon, Shopify-style product listings
 * - **Marketplace Platforms** - Etsy, eBay-style catalogs
 * - **Digital Product Stores** - Plugin, theme marketplaces
 * - **B2B Catalogs** - Industrial product listings
 * - **Subscription Boxes** - Curated product selections
 */
const meta = {
  title: 'Examples/ProductCatalog',
  component: ProductCatalog,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A production-ready e-commerce product catalog with filtering, search, and shopping cart functionality. Demonstrates grid layouts, product cards, and interactive commerce features.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProductCatalog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full Product Catalog
 *
 * The complete e-commerce catalog experience with all features.
 *
 * ## Try It Out
 *
 * 1. **Search Products**: Type in the search box to filter by name, description, or brand
 * 2. **Filter by Category**: Use the category dropdown (All, Electronics, Furniture, Lifestyle)
 * 3. **Sort Products**: Choose sort order (Featured, Price, Rating, Reviews)
 * 4. **Add to Cart**: Click "Add to Cart" to add items
 * 5. **View Cart Badge**: See the cart counter update in the header
 * 6. **Check Stock**: Notice badges for low stock and out of stock items
 * 7. **Hover Cards**: Hover over products to see the Quick View button
 * 8. **View Discounts**: See sale badges and original prices with percentage off
 *
 * ## Interactive Features
 *
 * - Real-time search with instant filtering
 * - Category and sort combination filtering
 * - Shopping cart with quantity tracking
 * - Toast notifications for cart actions
 * - Stock status indicators
 * - Rating and review display
 * - Discount percentage calculation
 */
export const Default: Story = {
  render: () => <ProductCatalog />,
};

/**
 * Mobile View
 *
 * The catalog adapts to mobile screens with a single-column layout.
 * Product cards stack vertically for optimal mobile browsing.
 */
export const Mobile: Story = {
  render: () => <ProductCatalog />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Tablet View
 *
 * On tablet devices, the layout uses a 2-column grid for product cards,
 * providing a balanced experience between mobile and desktop.
 */
export const Tablet: Story = {
  render: () => <ProductCatalog />,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

/**
 * Dark Mode
 *
 * The product catalog automatically adapts to dark mode with proper
 * contrast for product cards, badges, and text elements.
 */
export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <ProductCatalog />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

/**
 * Component Architecture
 *
 * ```
 * ProductCatalog
 * ├─ Header Section
 * │  ├─ Title & Description
 * │  ├─ IconButton (Cart with Badge)
 * │  └─ Button - View Cart
 * │
 * ├─ Filters Card
 * │  ├─ SearchInput - Product Search
 * │  ├─ Select - Category Filter
 * │  └─ Select - Sort Options
 * │
 * ├─ Results Summary
 * │  └─ Text - Product Count
 * │
 * ├─ Product Grid (Responsive 1-4 columns)
 * │  └─ For each product:
 * │     └─ Card (elevated, hover)
 * │        ├─ Product Image Area
 * │        │  ├─ Colored Background (gradient)
 * │        │  ├─ Badge - New/Sale/Featured
 * │        │  ├─ Badge - Stock Status
 * │        │  └─ Button - Quick View (on hover)
 * │        │
 * │        ├─ CardBody
 * │        │  ├─ Avatar - Brand Initials
 * │        │  ├─ Product Name
 * │        │  ├─ Description
 * │        │  ├─ Tags (Bestseller, Premium, etc.)
 * │        │  ├─ Rating Stars & Reviews
 * │        │  └─ Price & Discount
 * │        │
 * │        └─ CardFooter
 * │           └─ Button - Add to Cart
 * │
 * └─ Notifications (fixed bottom-right)
 *    └─ NotificationToast - Cart confirmations
 * ```
 *
 * ## Data Flow
 *
 * 1. **State Management**:
 *    - `searchQuery` - Current search text
 *    - `selectedCategory` - Active category filter
 *    - `selectedSort` - Current sort order
 *    - `cart` - Shopping cart items with quantities
 *    - `notifications` - Toast notification queue
 *
 * 2. **Filtering Logic**:
 *    - Products filtered by category AND search query
 *    - Results sorted based on selected option
 *    - Filter combinations work together
 *
 * 3. **Cart Management**:
 *    - Add to cart updates quantity if item exists
 *    - New items initialized with quantity 1
 *    - Toast notification shown for each add
 *    - Badge shows total item count
 *
 * 4. **Stock Display**:
 *    - Out of stock: Error badge, disabled button
 *    - Low stock (< 10): Warning badge with count
 *    - Limited stock (< 50): Success badge
 *    - High stock (≥ 50): No badge
 */
export const ComponentArchitecture: Story = {
  render: () => <ProductCatalog />,
  parameters: {
    docs: {
      description: {
        story: 'See the source code and component breakdown in the documentation above.',
      },
    },
  },
};

/**
 * Design Patterns
 *
 * This example demonstrates several key patterns:
 *
 * ## 1. Filter Composition
 * Multiple filters (search, category, sort) work together to narrow results.
 * Each filter is independent but combines with others for precise control.
 *
 * ## 2. Optimistic UI Updates
 * Cart updates happen immediately with visual feedback via toast notifications.
 * No loading states needed for local state updates.
 *
 * ## 3. Responsive Grid Layout
 * Grid component adapts from 1 column (mobile) to 4 columns (desktop):
 * - Mobile (< 640px): 1 column
 * - Tablet (≥ 640px): 2 columns
 * - Desktop (≥ 1024px): 3 columns
 * - Large Desktop (≥ 1280px): 4 columns
 *
 * ## 4. Progressive Disclosure
 * Additional actions (Quick View) appear on hover to reduce visual clutter.
 * Essential information always visible, advanced features revealed on interaction.
 *
 * ## 5. Visual Hierarchy
 * - Badges draw attention to special states (New, Sale, Featured)
 * - Tags provide secondary metadata
 * - Price is most prominent in the card
 * - Disabled state clearly indicates out of stock
 *
 * ## 6. Real-time Feedback
 * Every user action receives immediate visual feedback:
 * - Add to cart → Toast notification
 * - Cart updates → Badge counter updates
 * - Search/filter → Results update instantly
 */
export const DesignPatterns: Story = {
  render: () => <ProductCatalog />,
  parameters: {
    docs: {
      description: {
        story:
          'This example showcases production-ready patterns for e-commerce catalogs, including filtering, cart management, and responsive design.',
      },
    },
  },
};

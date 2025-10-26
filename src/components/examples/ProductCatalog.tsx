import { useState } from 'react';
import { cn } from '../../utils/cn';
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Badge,
  Tag,
  Avatar,
  Select,
  SearchInput,
  NotificationToast,
  IconButton,
  type SelectOption,
} from '../index';

/**
 * ProductCatalog - E-Commerce Product Catalog Example
 *
 * @remarks
 * This example demonstrates an e-commerce product catalog interface with:
 * - Grid layout of product cards
 * - Filtering with Select and SearchInput
 * - Product cards with images, badges, tags, buttons
 * - Shopping cart interaction with NotificationToast
 * - Responsive design with mobile-first approach
 *
 * Components Used:
 * - Card, Badge, Tag, Button, Avatar, Select, SearchInput, Grid, NotificationToast, IconButton
 *
 * @example
 * ```tsx
 * <ProductCatalog />
 * ```
 */

// Types
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  stock: number;
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  tags: string[];
  imageColor: string;
}

interface CartItem {
  productId: string;
  quantity: number;
}

interface Notification {
  id: string;
  variant: 'success' | 'danger' | 'warning' | 'info';
  title: string;
  description: string;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life',
    price: 299.99,
    originalPrice: 399.99,
    category: 'electronics',
    brand: 'AudioTech',
    rating: 4.8,
    reviews: 1247,
    stock: 23,
    isNew: false,
    isSale: true,
    isFeatured: true,
    tags: ['Bestseller', 'Premium'],
    imageColor: 'bg-gradient-to-br from-purple-500 to-blue-500',
  },
  {
    id: '2',
    name: 'Ergonomic Office Chair',
    description: 'Premium mesh back chair with lumbar support and adjustable armrests',
    price: 449.00,
    category: 'furniture',
    brand: 'ComfortPro',
    rating: 4.6,
    reviews: 892,
    stock: 12,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['Ergonomic', 'Premium'],
    imageColor: 'bg-gradient-to-br from-gray-600 to-gray-800',
  },
  {
    id: '3',
    name: 'Stainless Steel Water Bottle',
    description: 'Double-walled insulated bottle keeps drinks cold for 24h, hot for 12h',
    price: 34.99,
    originalPrice: 44.99,
    category: 'lifestyle',
    brand: 'HydroFlow',
    rating: 4.9,
    reviews: 2341,
    stock: 156,
    isNew: false,
    isSale: true,
    isFeatured: false,
    tags: ['Eco-Friendly', 'Bestseller'],
    imageColor: 'bg-gradient-to-br from-teal-400 to-cyan-600',
  },
  {
    id: '4',
    name: 'Smart Fitness Watch',
    description: 'Track your health with heart rate monitor, GPS, and 7-day battery',
    price: 199.99,
    category: 'electronics',
    brand: 'FitTrack',
    rating: 4.5,
    reviews: 3412,
    stock: 45,
    isNew: true,
    isSale: false,
    isFeatured: true,
    tags: ['Smart', 'Fitness'],
    imageColor: 'bg-gradient-to-br from-red-500 to-orange-500',
  },
  {
    id: '5',
    name: 'Mechanical Keyboard - RGB',
    description: 'Premium mechanical keyboard with Cherry MX switches and customizable RGB',
    price: 159.99,
    originalPrice: 199.99,
    category: 'electronics',
    brand: 'KeyMaster',
    rating: 4.7,
    reviews: 1876,
    stock: 31,
    isNew: false,
    isSale: true,
    isFeatured: false,
    tags: ['Gaming', 'RGB'],
    imageColor: 'bg-gradient-to-br from-indigo-500 to-purple-600',
  },
  {
    id: '6',
    name: 'Leather Messenger Bag',
    description: 'Handcrafted genuine leather bag with padded laptop compartment',
    price: 189.00,
    category: 'lifestyle',
    brand: 'UrbanCarry',
    rating: 4.8,
    reviews: 654,
    stock: 8,
    isNew: false,
    isSale: false,
    isFeatured: false,
    tags: ['Premium', 'Handcrafted'],
    imageColor: 'bg-gradient-to-br from-amber-700 to-orange-900',
  },
  {
    id: '7',
    name: 'Desk Lamp with Wireless Charging',
    description: 'LED desk lamp with adjustable brightness and built-in Qi wireless charger',
    price: 79.99,
    originalPrice: 99.99,
    category: 'electronics',
    brand: 'BrightSpace',
    rating: 4.4,
    reviews: 423,
    stock: 67,
    isNew: true,
    isSale: true,
    isFeatured: false,
    tags: ['Smart', 'LED'],
    imageColor: 'bg-gradient-to-br from-yellow-400 to-amber-500',
  },
  {
    id: '8',
    name: 'Standing Desk Converter',
    description: 'Adjustable height desk riser for ergonomic sit-stand workstation',
    price: 279.00,
    category: 'furniture',
    brand: 'StandEasy',
    rating: 4.6,
    reviews: 789,
    stock: 15,
    isNew: false,
    isSale: false,
    isFeatured: true,
    tags: ['Ergonomic', 'Adjustable'],
    imageColor: 'bg-gradient-to-br from-slate-600 to-gray-800',
  },
  {
    id: '9',
    name: 'Premium Yoga Mat',
    description: 'Non-slip eco-friendly yoga mat with carrying strap, 6mm thick',
    price: 49.99,
    originalPrice: 69.99,
    category: 'lifestyle',
    brand: 'ZenFlow',
    rating: 4.7,
    reviews: 1123,
    stock: 94,
    isNew: false,
    isSale: true,
    isFeatured: false,
    tags: ['Eco-Friendly', 'Fitness'],
    imageColor: 'bg-gradient-to-br from-green-400 to-emerald-600',
  },
];

const categoryOptions: SelectOption[] = [
  { label: 'All Categories', value: 'all' },
  { label: 'Electronics', value: 'electronics' },
  { label: 'Furniture', value: 'furniture' },
  { label: 'Lifestyle', value: 'lifestyle' },
];

const sortOptions: SelectOption[] = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rating', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
];

export function ProductCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('featured');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Filter and sort products
  const filteredAndSortedProducts = mockProducts
    .filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });

  const addToCart = (productId: string, productName: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, quantity: 1 }];
    });

    showNotification({
      id: `cart-${Date.now()}`,
      variant: 'success',
      title: 'Added to Cart',
      description: `${productName} has been added to your cart`,
    });
  };

  const showNotification = (notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    }, 3000);
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="error">Out of Stock</Badge>;
    }
    if (stock < 10) {
      return <Badge variant="warning">Only {stock} left</Badge>;
    }
    if (stock < 50) {
      return <Badge variant="success">In Stock</Badge>;
    }
    return null;
  };

  const getTotalCartItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={cn(
              'h-4 w-4',
              i < fullStars
                ? 'fill-yellow-500 text-yellow-500'
                : i === fullStars && hasHalfStar
                ? 'fill-yellow-500/50 text-yellow-500'
                : 'fill-none text-border-subtle'
            )}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-layer-01 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">
              Product Catalog
            </h1>
            <p className="text-sm text-text-secondary sm:text-base">
              Browse our curated selection of premium products
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <IconButton
                variant="ghost"
                size="md"
                aria-label="View Cart"
                className="relative"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getTotalCartItems() > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-60 text-xs font-bold text-white">
                    {getTotalCartItems()}
                  </span>
                )}
              </IconButton>
            </div>
            <Button variant="primary" size="sm">
              View Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card variant="outlined" className="mb-8 shadow-sm">
        <CardBody className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-text-primary">
                Search Products
              </label>
              <SearchInput
                placeholder="Search by name, description, or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:items-end">
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Category
                </label>
                <Select
                  value={selectedCategory}
                  onChange={(value) => setSelectedCategory(value as string)}
                  options={categoryOptions}
                  size="md"
                  className="w-full sm:w-[180px]"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">
                  Sort By
                </label>
                <Select
                  value={selectedSort}
                  onChange={(value) => setSelectedSort(value as string)}
                  options={sortOptions}
                  size="md"
                  className="w-full sm:w-[200px]"
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          Showing <span className="font-semibold text-text-primary">{filteredAndSortedProducts.length}</span> of{' '}
          <span className="font-semibold text-text-primary">{mockProducts.length}</span> products
        </p>
      </div>

      {/* Product Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAndSortedProducts.map((product, index) => (
          <Card
            key={product.id}
            variant="elevated"
            hover
            className="group flex flex-col transition-all duration-110 hover:shadow-lg"
            style={{ animationDelay: `${index * 30}ms` }}
          >
            {/* Product Image Placeholder */}
            <div className="relative h-48 w-full overflow-hidden rounded-none">
              <div className={cn('h-full w-full', product.imageColor)} />
              {/* Badges */}
              <div className="absolute left-3 top-3 flex flex-col gap-2">
                {product.isNew && (
                  <Badge variant="info" className="shadow-sm">
                    New
                  </Badge>
                )}
                {product.isSale && (
                  <Badge variant="error" className="shadow-sm">
                    Sale
                  </Badge>
                )}
                {product.isFeatured && (
                  <Badge variant="warning" className="shadow-sm">
                    Featured
                  </Badge>
                )}
              </div>
              {/* Stock Badge */}
              {getStockBadge(product.stock) && (
                <div className="absolute right-3 top-3">
                  {getStockBadge(product.stock)}
                </div>
              )}
              {/* Quick View Button */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-200 group-hover:bg-black/40">
                <Button
                  variant="secondary"
                  size="sm"
                  className="translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  Quick View
                </Button>
              </div>
            </div>

            <CardBody className="flex flex-1 flex-col p-4">
              {/* Brand */}
              <div className="mb-2 flex items-center gap-2">
                <Avatar size="xs" className="bg-layer-02">
                  {product.brand.substring(0, 2)}
                </Avatar>
                <span className="text-xs font-medium text-text-secondary">{product.brand}</span>
              </div>

              {/* Product Name */}
              <h3 className="mb-2 line-clamp-2 font-semibold text-text-primary transition-colors group-hover:text-brand-60">
                {product.name}
              </h3>

              {/* Description */}
              <p className="mb-3 line-clamp-2 text-sm text-text-secondary">
                {product.description}
              </p>

              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <Tag key={tag} size="sm">
                    {tag}
                  </Tag>
                ))}
              </div>

              {/* Rating */}
              <div className="mb-4 flex items-center gap-2">
                {renderStars(product.rating)}
                <span className="text-sm font-medium text-text-primary">{product.rating}</span>
                <span className="text-xs text-text-secondary">({product.reviews.toLocaleString()})</span>
              </div>

              {/* Price */}
              <div className="mb-4 mt-auto flex items-baseline gap-2">
                <span className="text-2xl font-bold text-text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-text-secondary line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge variant="error" size="sm">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>
            </CardBody>

            <CardFooter className="border-t border-border-subtle bg-layer-02/30 p-4">
              <Button
                variant="primary"
                size="md"
                isFullWidth
                disabled={product.stock === 0}
                onClick={() => addToCart(product.id, product.name)}
                className="font-semibold shadow-sm"
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-6">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="animate-in slide-in-from-bottom-2 fade-in duration-200"
          >
            <NotificationToast
              variant={notification.variant}
              title={notification.title}
              description={notification.description}
              onDismiss={() =>
                setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
              }
              dismissible
            />
          </div>
        ))}
      </div>
    </div>
  );
}

ProductCatalog.displayName = 'ProductCatalog';

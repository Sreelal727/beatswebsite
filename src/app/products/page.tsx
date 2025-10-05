'use client';

import { useState, useMemo, useEffect } from 'react';
import { StarIcon, HeartIcon, ShoppingBagIcon, FunnelIcon, Squares2X2Icon, ListBulletIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useCart, Product } from '@/components/context/CartContext';
import { getProducts, getCategories, sortProducts } from '@/utils/productService';
import FloatingCheckout from '@/components/ui/FloatingCheckout';
import Image from 'next/image';
const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'popularity', label: 'Most Popular' }
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const { addToCart, getItemQuantity, updateQuantity } = useCart();

  // Load products and categories from CSV
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);
        
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    if (loading || products.length === 0) return [];
    
    const filtered = selectedCategory === 'All' 
      ? products 
      : products.filter(product => product.category === selectedCategory);

    return sortProducts(filtered, sortBy);
  }, [products, selectedCategory, sortBy, loading]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
    }).format(price);
  };

  const handleAddToCart = async (product: Product) => {
    if (!product.inStock || addingToCart === product.id) return;
    
    setAddingToCart(product.id);
    addToCart(product);
    
    // Reset animation after 1.5 seconds
    setTimeout(() => {
      setAddingToCart(null);
    }, 1500);
  };

  const handleIncrement = (product: Product) => {
    const currentQuantity = getItemQuantity(product.id);
    updateQuantity(product.id, currentQuantity + 1);
  };

  const handleDecrement = (product: Product) => {
    const currentQuantity = getItemQuantity(product.id);
    if (currentQuantity > 0) {
      updateQuantity(product.id, currentQuantity - 1);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Medical Equipment Store
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover our comprehensive range of high-quality biomedical equipment from leading international brands.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <FunnelIcon className="h-5 w-5 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Results Count */}
              <span className="text-sm text-gray-600">
                {filteredAndSortedProducts.length} products
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Loading products...
              </h3>
              <p className="text-gray-500">
                Please wait while we load the product catalog.
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-red-400 mb-4">
                <ShoppingBagIcon className="mx-auto h-16 w-16" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Error loading products
              </h3>
              <p className="text-gray-500 mb-4">
                {error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <ShoppingBagIcon className="mx-auto h-16 w-16" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or browse all categories.
              </p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8'
                : 'space-y-4'
            }>
              {filteredAndSortedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className={`relative ${viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-medium">Out of Stock</span>
                      </div>
                    )}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                      {wishlist.includes(product.id) ? (
                        <HeartIconSolid className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="mb-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center space-x-1 mb-3">
                      <div className="flex">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      
                      {!product.inStock ? (
                        <button
                          disabled
                          className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
                        >
                          <ShoppingBagIcon className="h-4 w-4" />
                          <span>Out of Stock</span>
                        </button>
                      ) : getItemQuantity(product.id) === 0 ? (
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={addingToCart === product.id}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                            addingToCart === product.id
                              ? 'bg-green-600 text-white scale-95'
                              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                          }`}
                        >
                          {addingToCart === product.id ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Adding...</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBagIcon className="h-4 w-4" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDecrement(product)}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-200"
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="text-lg font-semibold text-gray-900 min-w-[2rem] text-center">
                            {getItemQuantity(product.id)}
                          </span>
                          <button
                            onClick={() => handleIncrement(product)}
                            className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors duration-200"
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <FloatingCheckout />
    </div>
  );
}
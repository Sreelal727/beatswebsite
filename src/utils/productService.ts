import { Product } from '@/components/context/CartContext';
import { loadProductsFromCSV, getUniqueCategories } from './csvParser';

const CSV_FILE_PATH = '/Products.csv';

// Cache for products data
let productsCache: Product[] | null = null;
let categoriesCache: string[] | null = null;

/**
 * Get all products from CSV file with caching
 * @param forceReload - Force reload from CSV file, bypassing cache
 * @returns Promise<Product[]>
 */
export async function getProducts(forceReload: boolean = false): Promise<Product[]> {
  if (!productsCache || forceReload) {
    try {
      productsCache = await loadProductsFromCSV('Products.csv');
      // Clear categories cache when products are reloaded
      categoriesCache = null;
    } catch (error) {
      console.error('Failed to load products from CSV, using fallback data:', error);
      // Return fallback data if CSV loading fails
      productsCache = getFallbackProducts();
    }
  }
  
  return productsCache;
}

/**
 * Get unique categories from products
 * @param forceReload - Force reload categories from products
 * @returns Promise<string[]>
 */
export async function getCategories(forceReload: boolean = false): Promise<string[]> {
  if (!categoriesCache || forceReload) {
    const products = await getProducts(forceReload);
    categoriesCache = getUniqueCategories(products);
  }
  
  return categoriesCache;
}

/**
 * Get products filtered by category
 * @param category - Category to filter by ('All' returns all products)
 * @returns Promise<Product[]>
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  const products = await getProducts();
  
  if (category === 'All') {
    return products;
  }
  
  return products.filter(product => product.category === category);
}

/**
 * Get a single product by ID
 * @param id - Product ID
 * @returns Promise<Product | null>
 */
export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(product => product.id === id) || null;
}

/**
 * Search products by name or description
 * @param query - Search query
 * @returns Promise<Product[]>
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const lowercaseQuery = query.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Sort products by various criteria
 * @param products - Products to sort
 * @param sortBy - Sort criteria
 * @returns Sorted products array
 */
export function sortProducts(products: Product[], sortBy: string): Product[] {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'popularity':
      return sorted.sort((a, b) => b.reviews - a.reviews);
    default:
      return sorted;
  }
}

/**
 * Fallback products data in case CSV loading fails
 * @returns Product[]
 */
function getFallbackProducts(): Product[] {
  return [
    {
      id: 'FALLBACK1',
      name: 'Dental Compressor A101',
      price: 1299.99,
      image: '/api/placeholder/300/300',
      category: 'DENTAL',
      brand: 'DENTAL',
      description: 'Oil-free dental compressor with 25L tank, designed for dental clinics with quiet operation.',
      inStock: true,
      rating: 4.5,
      reviews: 28
    },
    {
      id: 'FALLBACK2',
      name: 'Medical Equipment Sample',
      price: 899.99,
      image: '/api/placeholder/300/300',
      category: 'MEDICAL',
      brand: 'MEDICAL',
      description: 'Professional medical equipment for healthcare facilities.',
      inStock: true,
      rating: 4.3,
      reviews: 15
    },
    {
      id: 'FALLBACK3',
      name: 'Laboratory Instrument',
      price: 2499.99,
      image: '/api/placeholder/300/300',
      category: 'LABORATORY',
      brand: 'LABORATORY',
      description: 'High-precision laboratory instrument for research and diagnostics.',
      inStock: true,
      rating: 4.7,
      reviews: 42
    }
  ];
}

/**
 * Clear the products cache (useful for development/testing)
 */
export function clearProductsCache(): void {
  productsCache = null;
  categoriesCache = null;
}
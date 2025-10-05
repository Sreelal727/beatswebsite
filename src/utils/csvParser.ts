import { Product } from '@/components/context/CartContext';

// Function to convert Google Drive sharing URLs to direct image URLs
function convertGoogleDriveUrl(url: string): string {
  if (!url || url === '/api/placeholder/300/300') {
    return url;
  }
  
  // Check if it's a Google Drive sharing URL
  const driveMatch = url.match(/https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) {
    const fileId = driveMatch[1];
    // Convert to direct image URL format
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  // If it's already a direct URL or different format, return as is
  return url;
}

export interface CSVProduct {
  'Product code': string;
  'Product Name': string;
  'Product Main Category': string;
  'Product Sub Category': string;
  'DEPARTMENT ': string;
  'DESCRIPTION ': string;
  'Video Link': string;
  'Image 2': string;
  'Catalogue ': string;
  'Price 1 (Customer type 1)': string;
  'Price 2 ( Customer type 2)': string;
  'Price 3 ( Customer type 3)': string;
}

/**
 * Parse CSV with multiline support
 * @param csvContent - Raw CSV content as string
 * @returns Array of rows, each row is an array of values
 */
function parseCSVWithMultilineSupport(csvContent: string): string[][] {
  const rows: string[][] = [];
  const lines = csvContent.split('\n');
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex];
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          // Escaped quote
          currentField += '"';
          i++; // Skip next quote
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        // End of field
        currentRow.push(currentField.trim());
        currentField = '';
      } else {
        currentField += char;
      }
    }
    
    // If we're not in quotes, this line ends the current row
    if (!inQuotes) {
      currentRow.push(currentField.trim());
      if (currentRow.some(field => field.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      // We're in a multiline field, add a newline
      currentField += '\n';
    }
  }
  
  // Handle case where file doesn't end with newline
  if (currentRow.length > 0 || currentField.length > 0) {
    if (currentField.length > 0) {
      currentRow.push(currentField.trim());
    }
    if (currentRow.some(field => field.length > 0)) {
      rows.push(currentRow);
    }
  }
  
  return rows;
}

/**
 * Parse CSV content and convert to Product array
 * @param csvContent - Raw CSV content as string
 * @returns Array of Product objects
 */
export function parseCSVToProducts(csvContent: string): Product[] {
  // Use a more robust approach to parse CSV with multiline fields
  const rows = parseCSVWithMultilineSupport(csvContent);
  
  if (rows.length < 2) {
    console.warn('CSV file appears to be empty or has insufficient data');
    return [];
  }

  const headers = rows[0];
  console.log('CSV Headers:', headers);
  console.log('Total rows found:', rows.length);
  
  const products: Product[] = [];
  
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i];
    
    if (values.length !== headers.length) {
      console.warn(`Row ${i + 1} has ${values.length} values but expected ${headers.length}. Skipping.`);
      continue;
    }

    // Create object from headers and values
    const csvProduct: Record<string, string> = {};
    headers.forEach((header, index) => {
      csvProduct[header] = values[index];
    });

    // Convert to Product format
    try {
      // Clean and extract price from Price 1 column
      const priceStr = csvProduct['Price 1 (Customer type 1)'] || '0';
      const price = parseFloat(priceStr.replace(/[^0-9.-]/g, '')) || 0;
      
      // Clean description and handle missing values
      const description = csvProduct['DESCRIPTION ']?.trim() || 'No description available';
      
      // Handle image URL - convert Google Drive sharing URLs to direct image URLs
      let imageUrl = csvProduct['Image 2']?.trim() || '/api/placeholder/300/300';
      imageUrl = convertGoogleDriveUrl(imageUrl);
      
      // Handle catalog link
      const catalogLink = csvProduct['Catalogue ']?.trim() || '';

      const product: Product = {
        id: csvProduct['Product code']?.trim() || `product-${i}`,
        name: csvProduct['Product Name']?.trim() || 'Unnamed Product',
        price: price,
        image: imageUrl,
        category: csvProduct['Product Main Category']?.trim() || 'General',
        brand: csvProduct['DEPARTMENT ']?.trim() || csvProduct['Product Sub Category']?.trim() || 'Unknown',
        description: description,
        inStock: true, // Default to true since inStock info not in CSV
        rating: 4.0, // Default rating since not in CSV
        reviews: Math.floor(Math.random() * 100) + 10, // Random reviews since not in CSV
      };

      // Add additional properties if available
      if (catalogLink) {
        (product as Product & { catalogLink?: string }).catalogLink = catalogLink;
      }
      
      if (csvProduct['Video Link']?.trim()) {
        (product as Product & { videoLink?: string }).videoLink = csvProduct['Video Link'].trim();
      }
      
      if (csvProduct['Product Sub Category']?.trim()) {
        (product as Product & { subCategory?: string }).subCategory = csvProduct['Product Sub Category'].trim();
      }

      products.push(product);
    } catch (error) {
      console.warn(`Error parsing row ${i + 1}:`, error);
    }
  }

  return products;
}



/**
 * Load and parse CSV file from the data directory
 * @param filename - Name of the CSV file in the data directory
 * @returns Promise<Product[]>
 */
export async function loadProductsFromCSV(filename: string = 'products.csv'): Promise<Product[]> {
  try {
    // Construct the full URL for the CSV file
    let csvUrl: string;
    if (filename.startsWith('http')) {
      csvUrl = filename;
    } else {
      // Check if we're in a server-side context (Node.js)
      const isServer = typeof window === 'undefined';
      if (isServer) {
        // For server-side, use localhost URL
        csvUrl = `http://localhost:3000/${filename}`;
      } else {
        // For client-side, use relative URL
        csvUrl = `/${filename}`;
      }
    }
    const response = await fetch(csvUrl);
    
    if (!response.ok) {
      console.error('CSV fetch failed:', response.status, response.statusText);
      throw new Error(`Failed to fetch CSV file: ${response.status} ${response.statusText}`);
    }
    
    const csvContent = await response.text();
    const products = parseCSVToProducts(csvContent);
    console.log(`Successfully loaded ${products.length} products from CSV`);
    
    return products;
  } catch (error) {
    console.error('Error loading CSV:', error);
    throw error;
  }
}

/**
 * Get unique categories from products array
 * @param products - Array of products
 * @returns Array of unique category names
 */
export function getUniqueCategories(products: Product[]): string[] {
  const categories = products.map(product => product.category);
  return ['All', ...Array.from(new Set(categories)).sort()];
}

/**
 * Validate CSV headers against expected format
 * @param headers - Array of header names from CSV
 * @returns Object with validation result and missing/extra headers
 */
export function validateCSVHeaders(headers: string[]): boolean {
  const requiredHeaders = ['Product code', 'Product Name', 'Product Main Category'];
  return requiredHeaders.every(header => 
    headers.some(h => h.trim() === header)
  );
}
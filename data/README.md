# CSV Product Data Integration

This directory contains the CSV product data integration for the e-commerce website.

## File Structure

```
data/
├── README.md (this file)
└── (your CSV files should be placed in public/data/)

public/data/
└── products.csv (sample product data)

src/utils/
├── csvParser.ts (CSV parsing utilities)
└── productService.ts (Product data service)
```

## CSV File Format

Your CSV file should be placed in `public/data/products.csv` and must include the following columns:

### Required Columns:
- `id` - Unique product identifier
- `name` - Product name
- `price` - Product price (numeric)
- `category` - Product category
- `brand` - Product brand
- `description` - Product description
- `inStock` - Stock status (true/false or 1/0)

### Optional Columns:
- `image` - Product image URL
- `rating` - Product rating (0-5)
- `reviews` - Number of reviews
- `catalogLink` - Link to product catalog
- `specifications` - Product specifications
- `warranty` - Warranty information
- `model` - Product model number

## Example CSV Format

```csv
id,name,price,image,category,brand,description,inStock,rating,reviews,catalogLink
1,"Digital Blood Pressure Monitor",299.99,"/api/placeholder/300/300","Cardiology","MedTech Pro","Professional digital blood pressure monitor",true,4.5,128,"https://example.com/catalog"
```

## How to Use

1. **Replace the sample data**: Place your CSV file at `public/data/products.csv`
2. **Ensure proper format**: Make sure your CSV includes all required columns
3. **Test the integration**: The products page will automatically load data from your CSV file
4. **Handle images**: Update image URLs to point to your actual product images

## Features

- **Automatic loading**: Products are loaded automatically from the CSV file
- **Error handling**: Fallback to sample data if CSV loading fails
- **Caching**: Products are cached for better performance
- **Dynamic categories**: Categories are automatically extracted from your data
- **Sorting and filtering**: All existing e-commerce features work with CSV data

## Troubleshooting

- **404 errors**: Ensure your CSV file is in `public/data/products.csv`
- **Parsing errors**: Check that your CSV format matches the expected structure
- **Missing products**: Verify that required columns are present and properly formatted
- **Performance issues**: Consider optimizing large CSV files or implementing pagination

## Development

To modify the CSV parsing logic, edit:
- `src/utils/csvParser.ts` - CSV parsing functions
- `src/utils/productService.ts` - Product data service and caching
#!/bin/bash

# Hostinger Static Build Script
echo "🚀 Building Beats Medical website for Hostinger deployment..."

# Backup original config
cp next.config.ts next.config.ts.backup

# Copy Hostinger config
cp next.config.hostinger.ts next.config.ts

# Temporarily disable API routes for static export
if [ -d "src/app/api" ]; then
    mv src/app/api src/app/api.temp
    echo "✅ Temporarily disabled API routes"
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Static files are ready in the 'out' directory"
    echo ""
    echo "📋 Next steps for Hostinger deployment:"
    echo "1. Upload all files from the 'out/' folder to your Hostinger public_html directory"
    echo "2. Configure your domain to point to beatsmed.ae"
    echo "3. Set up EmailJS for the contact form (see .env.hostinger for configuration)"
    echo ""
    echo "🌐 Your static website is ready for deployment!"
else
    echo "❌ Build failed. Please check the errors above."
fi

# Restore API routes
if [ -d "src/app/api.temp" ]; then
    mv src/app/api.temp src/app/api
    echo "✅ Restored API routes"
fi

# Restore original config
mv next.config.ts.backup next.config.ts
echo "✅ Restored original configuration"
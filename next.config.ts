import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed 'output: export' for VPS hosting - enables SSR and API routes
  images: { 
    // Re-enabled image optimization for better performance on VPS
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  // Optimizations for VPS hosting
  compress: true,                 // Enable gzip compression
  poweredByHeader: false,         // Remove X-Powered-By header for security
  generateEtags: true,            // Enable ETags for better caching
  eslint: {
    ignoreDuringBuilds: true,     // ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true,      // ignore TypeScript errors during build
  },
  // Performance optimizations
  experimental: {
    optimizeCss: true,            // Optimize CSS for production
    scrollRestoration: true,      // Better scroll behavior
  },
};

export default nextConfig;

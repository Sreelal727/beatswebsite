import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',                // emits plain HTML/JS/CSS in /out
  images: { 
    unoptimized: true,            // required for static export
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
  trailingSlash: true,            // optional for nicer URLs
  eslint: {
    ignoreDuringBuilds: true,     // ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true,      // ignore TypeScript errors during build
  },
};

export default nextConfig;

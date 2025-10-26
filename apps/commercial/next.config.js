/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Optimize for monorepo setup - transpile workspace packages
  transpilePackages: ['@modular-ui/system'],

  // Skip ESLint during build (we'll run it separately)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Skip TypeScript checking during build (we'll run it separately)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Configure image domains if needed for external images
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },

  // Improve build output
  output: 'standalone',

  // Enable experimental features if needed
  experimental: {
    // optimizePackageImports: ['@modular-ui/system'],
  },

  // Configure webpack for better monorepo support
  webpack: (config, { isServer }) => {
    // Resolve symlinks for workspace packages
    config.resolve.symlinks = true;

    return config;
  },
};

module.exports = nextConfig;

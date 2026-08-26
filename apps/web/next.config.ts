import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow images from external domains used in seed data
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
  // Server-side environment variables are accessed via process.env
  // NEXT_PUBLIC_* vars are exposed to the client automatically
};

export default nextConfig;

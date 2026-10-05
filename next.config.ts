import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['pg'],
  reactCompiler: true,
  output: 'standalone',
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: '**.cdninstagram.com',
  //     },
  //   ],
  // },
};

export default nextConfig;

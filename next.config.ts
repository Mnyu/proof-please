import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['pg'],
  reactCompiler: true,
  output: 'standalone',
};

export default nextConfig;

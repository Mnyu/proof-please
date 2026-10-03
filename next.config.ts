import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['pg'],
  reactCompiler: true,
};

export default nextConfig;

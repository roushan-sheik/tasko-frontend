import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // This will ignore TypeScript errors during production builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

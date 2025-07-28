import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: "export",
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['cloud.umami.is'],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60
  },
  swcMinify: true,
  experimental: {
    optimizeFonts: true,
    optimizeCss: true
  },
  // Enable trailing slash for consistency
  trailingSlash: true,
  // Disable TypeScript and ESLint checks during build
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default withMDX(config);

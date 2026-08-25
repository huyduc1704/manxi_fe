import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.zadn.vn', // Cho phép tất cả subdomain của Zalo (s120, s240, ...)
      },
    ],
  },
};

export default withNextIntl(nextConfig);

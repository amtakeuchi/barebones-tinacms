/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    tina: {
      enabled: true,
    },
  },
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  // Disable static generation for pages that use TinaCMS
  async generateStaticParams() {
    return [];
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
      {
        source: "/admin",
        destination: "/admin/index.html",
      },
    ];
  },
}

module.exports = nextConfig

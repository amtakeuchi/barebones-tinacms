/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    tina: {
      enabled: true,
    },
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

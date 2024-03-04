/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['i.annihil.us'],
  },
};

module.exports = nextConfig;

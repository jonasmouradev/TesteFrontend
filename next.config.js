/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['i.annihil.us'],
  },
};

module.exports = nextConfig;

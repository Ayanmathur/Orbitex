/** @type {import('next').NextConfig} */
const nextConfig = {
  staticPageGenerationTimeout: 180,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'gm8oqnmc6iroodwk.public.blob.vercel-storage.com',
      },
    ],
  },
};

module.exports = nextConfig;

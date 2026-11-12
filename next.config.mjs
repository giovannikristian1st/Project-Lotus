/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Memudahkan iframe bridge & multi-event game state
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;

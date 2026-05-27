import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/course/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/uploads/course/**',
      },

      {
        protocol: 'https',
        hostname:"**"
      },
    ],
  },
};

export default nextConfig;


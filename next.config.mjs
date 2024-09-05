/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Corrected arrow function syntax
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          fs: false, // Disable 'fs' module on the client side
        },
      };
    }
    return config;
  },
  images: {
    domains: ["cloud.appwrite.io"], // Add external image domains here
  },
};

export default nextConfig;

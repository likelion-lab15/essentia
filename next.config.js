/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "onyx-onyx.koyeb.app",
      },
    ],
  },
};

module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev', '192.168.10.188', '192.168.10.51'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com"
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org"
      }
    ],
  }
};

export default nextConfig;

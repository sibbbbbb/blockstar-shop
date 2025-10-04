import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dcdn-us.mitiendanube.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "acdn-us.mitiendanube.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;

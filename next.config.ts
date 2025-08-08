import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "3000-firebase-studio-1754513067619.cluster-joak5ukfbnbyqspg4tewa33d24.cloudworkstations.dev",
  ],
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", port: "", pathname: "/**" },
    ],
  },
};

export default nextConfig;

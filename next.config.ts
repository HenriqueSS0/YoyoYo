import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/YoyoYo",
  assetPrefix: "/YoyoYo/",
};

export default nextConfig;

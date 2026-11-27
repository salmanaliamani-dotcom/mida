import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server-only code (ffmpeg, filesystem, job runner) runs in the Node.js runtime.
  serverExternalPackages: ["@anthropic-ai/sdk"],
};

export default nextConfig;

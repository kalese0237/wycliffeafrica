import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdfkit reads its font metrics (.afm) files from disk relative to its own
  // module directory at runtime — bundling it breaks that path resolution,
  // so it must run as a plain require() instead.
  serverExternalPackages: ["pdfkit"],
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdfkit reads its font metrics (.afm) files from disk relative to its own
  // module directory at runtime — bundling it breaks that path resolution,
  // so it must run as a plain require() instead.
  serverExternalPackages: ["pdfkit"],
  images: {
    // Every <Image> (public/photos and the /media/[id] Directus proxy) is
    // re-encoded to whichever of these the browser's Accept header supports.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Traces and copies only the runtime-needed node_modules into .next/standalone
  // instead of running `next start` against the full install, cutting the
  // server's baseline memory footprint.
  output: "standalone",
  // pdfkit reads its font metrics (.afm) files from disk relative to its own
  // module directory at runtime — bundling it breaks that path resolution,
  // so it must run as a plain require() instead.
  serverExternalPackages: ["pdfkit"],
  async redirects() {
    return [
      // The Pray With Us page briefly lived here before it became the prayer hub.
      { source: "/prayer/pray-with-us", destination: "/prayer", permanent: true },
    ];
  },
  images: {
    // Every <Image> (public/photos and the /media/[id] Directus proxy) is
    // re-encoded to whichever of these the browser's Accept header supports.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

import type { MetadataRoute } from "next";

/**
 * The site isn't publicly launched yet. Disallow all crawling so search
 * engines and bots don't index or repeatedly hit the Railway preview URL
 * before there's a real domain and launch announcement.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}

import type { MetadataRoute } from "next";
import { getAllPages, isIndexable } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

/**
 * Only pages approved by the quality gate (seo/indexability.json) are listed.
 * At 4,000 URLs this stays well under the 50,000-URL sitemap limit; switch to
 * generateSitemaps() for a sitemap index if the catalog ever grows past that.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return getAllPages()
    .filter((p) => isIndexable(p.path))
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((p) => ({
      url: absoluteUrl(p.path),
      lastModified: new Date(p.updated),
    }));
}

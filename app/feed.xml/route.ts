import { getAllPages, isIndexable } from "@/lib/content";
import { absoluteUrl, BRAND, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const pages = getAllPages()
    .filter((p) => isIndexable(p.path) && p.path !== "/")
    .sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime());

  const items = pages
    .map(
      (p) => `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${absoluteUrl(p.path)}</link>
      <guid isPermaLink="true">${absoluteUrl(p.path)}</guid>
      <description><![CDATA[${p.description}]]></description>
      <pubDate>${new Date(p.updated).toUTCString()}</pubDate>
    </item>`,
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${BRAND} - Guides, Setup &amp; Streaming Updates</title>
    <link>${SITE_URL}</link>
    <description>Latest IPTV setup guides, app walkthroughs, server architecture insights, and streaming tutorials for US homes.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}


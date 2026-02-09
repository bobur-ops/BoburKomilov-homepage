import { getCollection } from "astro:content";
import { PRIMARY_NAME, SITE_URL } from "../lib/seo";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getCollection("database");

  const items = posts
    .map((post) => {
      const slug = post.data.properties.slug.rich_text[0]?.plain_text;
      const title = post.data.properties.title.title[0]?.plain_text;
      const digest = (post as any).digest;
      const description = (post.rendered?.html || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 200);

      if (!slug || !title || !digest) return null;

      return {
        title,
        link: `${SITE_URL}/blog/${slug}`,
        pubDate: new Date(digest).toUTCString(),
        description,
      };
    })
    .filter(Boolean)
    .sort((a, b) =>
      new Date((b as { pubDate: string }).pubDate).getTime() -
      new Date((a as { pubDate: string }).pubDate).getTime(),
    ) as Array<{ title: string; link: string; pubDate: string; description: string }>;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${PRIMARY_NAME} Blog`)}</title>
    <description>${escapeXml(`Latest posts by ${PRIMARY_NAME}`)}</description>
    <link>${SITE_URL}/blog</link>
    ${items
      .map(
        (item) => `<item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid>${item.link}</guid>
      <pubDate>${item.pubDate}</pubDate>
      <description>${escapeXml(item.description)}</description>
    </item>`,
      )
      .join("\n")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

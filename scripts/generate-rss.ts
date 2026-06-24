// ── RSS Feed 生成脚本 · 构建时执行 ──
import fs from "fs";
import path from "path";
import { getAllPosts, getPostBySlug } from "../lib/posts";
import { siteConfig } from "../lib/config";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRss(): string {
  const posts = getAllPosts();
  const url = siteConfig.url;
  const now = new Date().toUTCString();

  const items = posts
    .map((p) => {
      const full = getPostBySlug(p.slug);
      const desc = p.description || "";
      const contentHtml = full ? escapeXml(full.content.slice(0, 500)) : "";
      return `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${url}/${p.slug}</link>
      <guid isPermaLink="true">${url}/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(desc)}</description>
      <content:encoded><![CDATA[${contentHtml}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

const outDir = path.join(process.cwd(), "public");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "rss.xml"), generateRss());
console.log("✅ rss.xml generated");

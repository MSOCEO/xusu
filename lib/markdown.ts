// ── Markdown 渲染 ──
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import { textToId } from "@/lib/utils";

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(gfm).use(html).process(markdown);
  return addHeadingIds(result.toString());
}

/** 为渲染后的 HTML h2/h3 添加 id 和锚点链接 */
function addHeadingIds(html: string): string {
  return html.replace(
    /<h([2-3])>(.+?)<\/h\1>/g,
    (_match, level, inner) => {
      const text = inner.replace(/<[^>]*>/g, "");
      const id = textToId(text);
      const anchor = `<a href="#${id}" class="heading-anchor" aria-hidden="true">#</a>`;
      return `<h${level} id="${id}">${anchor}${inner}</h${level}>`;
    }
  );
}

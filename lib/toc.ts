// ── 目录提取 ──
import { textToId } from "@/lib/utils";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

/** 从 Markdown 中提取标题，生成 anchor id */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];
  const lines = markdown.split("\n");
  for (const line of lines) {
    const match = line.match(/^(#{2,4})\s+(.+)/);
    if (!match) continue;
    const level = match[1].length;
    const raw = match[2].trim();
    const text = raw.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/[`*_~]/g, "");
    const id = textToId(text);
    headings.push({ id, text, level });
  }
  return headings;
}

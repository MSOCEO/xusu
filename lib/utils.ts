// ── 公共工具函数 ──

export function textToId(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u4e00-\u9fff\-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

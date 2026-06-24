import type { ThemeId } from "@/lib/themes";

export const siteConfig = {
  name: process.env.SITE_NAME || "叙溯",
  description: process.env.SITE_DESCRIPTION || "一边讲述，一边溯源。在书写中厘清思路，在回顾中看见轨迹。",
  url: process.env.SITE_URL || "https://msoceo.github.io/blog",
  mode: (process.env.BLOG_MODE || "static") as "static" | "dynamic",
  // "product" = 产品官方站（Hero + 特性 + 主题展示）
  // "blog" = 博客站（双主题首页，文章列表）
  siteMode: (process.env.SITE_MODE || "blog") as "product" | "blog",
  postsPerPage: 10,
  author: "MSOCEO",
  year: new Date().getFullYear(),
  // 当前主题：修改此处即可全局切换
  // "zen-editorial" = A.文档极简风（暖琥珀、时间轴）
  // "bookish" = B.杂志卡片风（朱砂红、卡片列表、侧边 Profile）
  // "personal" = C.个人品牌风（深蓝主色、打字机副标题、网格卡片）
  theme: (process.env.NEXT_THEME || "zen-editorial") as ThemeId,
  // Waline 评论系统后端地址，留空则禁用评论
  walineServerURL: process.env.NEXT_PUBLIC_WALINE_SERVER_URL || "",
} as const;

export type SiteConfig = typeof siteConfig;

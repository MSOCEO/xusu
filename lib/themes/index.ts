// ── Xusu Theme System ──
// 三种模板变体：A.文档极简风 / B.杂志卡片风 / C.个人品牌风

export type ThemeId = "bookish" | "zen-editorial" | "personal";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  template: "documentarian" | "magazine" | "personal";
  description: string;
  homeNavLabel: string;
  footerSlogan: string;
  postBackLabel: string;
}

const themes: Record<ThemeId, ThemeConfig> = {
  "zen-editorial": {
    id: "zen-editorial",
    name: "禅意社论风",
    template: "documentarian",
    description: "琥珀暖色、时间轴溯源长河、正文两端对齐、虚线分割、纸质感",
    homeNavLabel: "归档",
    footerSlogan: `"一边讲述，一边溯源"`,
    postBackLabel: "返回源头",
  },
  "bookish": {
    id: "bookish",
    name: "现代中式书卷气",
    template: "magazine",
    description: "朱砂红点缀、米白墨色底、卡片式文章列表、侧边 Profile，暗色模式适配",
    homeNavLabel: "文章",
    footerSlogan: "叙 说 与 溯 源",
    postBackLabel: "返回文章列表",
  },
  "personal": {
    id: "personal",
    name: "个人品牌风",
    template: "personal",
    description: "深蓝主色、打字机副标题、精选网格、时间自动暗色，适合建立个人 IP",
    homeNavLabel: "首页",
    footerSlogan: "书写 · 溯源 · 构建",
    postBackLabel: "返回首页",
  },
};

export function getTheme(id: ThemeId): ThemeConfig {
  return themes[id];
}

export function getActiveTheme(): ThemeConfig {
  const id = (process.env.NEXT_THEME || "zen-editorial") as ThemeId;
  return themes[id];
}

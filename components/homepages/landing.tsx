// ── 产品官方站首页 · 叙溯博客引擎 ──
import { siteConfig } from "@/lib/config";
import { getTheme } from "@/lib/themes";

const themes = [getTheme("bookish"), getTheme("zen-editorial")];

export default function HomepageLanding() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* ═══════════════════════════════════════════════
          Hero
          ═══════════════════════════════════════════════ */}
      <section className="pt-20 pb-10 text-center">
        <p
          className="text-xs font-mono tracking-[0.3em] uppercase mb-6"
          style={{ color: "var(--color-accent)", opacity: 0.6 }}
        >
          为书写而生
        </p>
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none"
          style={{ fontFamily: "ui-monospace, SFMono-Regular, 'Cascadia Code', monospace", color: "var(--color-text)" }}
        >
          Xusu
        </h1>
        <p
          className="mt-6 text-lg sm:text-xl leading-relaxed max-w-lg mx-auto"
          style={{ color: "var(--color-text-muted)" }}
        >
          一个自带双主题的极简博客引擎。
        </p>
        <p
          className="mt-2 text-sm leading-relaxed max-w-md mx-auto"
          style={{ color: "var(--color-text-muted)", opacity: 0.7 }}
        >
          不追热点，不卷框架。Markdown 写作，一键部署，让读者舒适地读。
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <a
            href="https://github.com/msoceo/xusu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}
          >
            <GitHubIcon />
            GitHub
          </a>
          <a
            href="https://msoceo.github.io/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 border hover:bg-[var(--color-surface)]"
            style={{ borderColor: "var(--color-border)", color: "var(--color-text)" }}
          >
            在线 Demo
            <span style={{ color: "var(--color-text-muted)", fontSize: 11 }}>&rarr;</span>
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          Install Block
          ═══════════════════════════════════════════════ */}
      <section className="py-4">
        <div
          className="max-w-lg mx-auto rounded-xl overflow-hidden border"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
        >
          <div
            className="px-4 py-2 border-b flex items-center gap-2"
            style={{ borderColor: "var(--color-border)" }}
          >
            <Dot color="#FF5F56" />
            <Dot color="#FFBD2E" />
            <Dot color="#27C93F" />
            <span className="text-[10px] font-mono ml-2 tracking-wider" style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>
              终端
            </span>
          </div>
          <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto" style={{ color: "var(--color-text)" }}>
            <Line>$ git clone https://github.com/msoceo/xusu.git my-blog</Line>
            <Line>$ cd my-blog && npm install</Line>
            <Line>$ npm run build</Line>
            <Line>{`$ # 推送到 GitHub Pages，开始写作 ✍️`}</Line>
          </div>
        </div>
        <p
          className="text-center text-[11px] mt-4 tracking-wide"
          style={{ color: "var(--color-text-muted)", opacity: 0.45 }}
        >
          或者直接 Fork → 改 content/ → push → 上线，五分钟内拥有自己的博客
        </p>
      </section>

      {/* ═══════════════════════════════════════════════
          统计条
          ═══════════════════════════════════════════════ */}
      <section className="py-10">
        <div className="flex justify-center gap-10 sm:gap-16 text-center">
          <StatBox value="2" label="内置主题" />
          <StatBox value="2" label="运行模式" />
          <StatBox value="&lt;5s" label="构建速度" />
          <StatBox value="100%" label="开源免费" />
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════
          为什么选叙溯
          ═══════════════════════════════════════════════ */}
      <section className="py-8">
        <SectionLabel>为什么是叙溯</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          {sellingPoints.map((p, i) => (
            <div
              key={i}
              className="rounded-xl p-6 border"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
            >
              <h3
                className="text-base font-semibold mb-2"
                style={{ fontFamily: '"Noto Serif SC", Georgia, serif' }}
              >
                {p.title}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════
          双主题引擎 · 核心卖点
          ═══════════════════════════════════════════════ */}
      <section className="py-8">
        <SectionLabel>双主题引擎</SectionLabel>
        <p
          className="text-center text-sm mt-3 max-w-md mx-auto leading-relaxed"
          style={{ color: "var(--color-text-muted)" }}
        >
          朱墨与溯光两套主题内置于同一个构建产物，构建时选定默认，运行时通过 URL 参数即刻切换——无需重新构建，无需服务器。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
          {themes.map((t) => (
            <div
              key={t.id}
              className="rounded-xl overflow-hidden border"
              style={{ borderColor: "var(--color-border)" }}
            >
              {/* 主题预览区 */}
              <div
                className="h-40 relative overflow-hidden"
                style={{
                  background:
                    t.id === "bookish"
                      ? "oklch(0.985 0.002 85)"
                      : "#FAF9F6",
                }}
              >
                {/* 模拟排版 */}
                <div className="absolute inset-0 p-6">
                  {/* 标题 */}
                  <div
                    className="h-5 rounded w-3/4 mb-4"
                    style={{
                      background: t.id === "bookish"
                        ? "oklch(0.55 0.22 25 / 0.15)"
                        : "linear-gradient(90deg, #8E5529, transparent)",
                      height: t.id === "bookish" ? 20 : 28,
                      borderRadius: t.id === "bookish" ? 4 : 2,
                    }}
                  />
                  {/* 正文行 */}
                  <div className="space-y-2.5">
                    <Bar w="full" id={t.id} />
                    <Bar w="85%" id={t.id} />
                    <Bar w="92%" id={t.id} />
                    <Bar w="60%" id={t.id} />
                  </div>
                  {/* 时间轴装饰 (溯光) */}
                  {t.id === "zen-editorial" && (
                    <div className="absolute left-6 top-10 bottom-6 w-px" style={{ background: "var(--color-accent-soft)", opacity: 0.4 }} />
                  )}
                </div>
              </div>

              <div className="p-6" style={{ backgroundColor: "var(--color-surface)" }}>
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="text-lg font-semibold" style={{ fontFamily: '"Noto Serif SC", Georgia, serif' }}>
                    {t.name}
                  </h3>
                  <span
                    className="text-xs font-mono tracking-wider px-2 py-0.5 rounded"
                    style={{
                      color: "var(--color-accent)",
                      border: "1px solid var(--color-accent)",
                      opacity: 0.6,
                    }}
                  >
                    {t.id === "bookish" ? "朱墨" : "溯光"}
                  </span>
                </div>
                <p className="text-sm leading-relaxed mt-2" style={{ color: "var(--color-text-muted)" }}>
                  {t.description}
                </p>
                <div
                  className="mt-4 flex flex-wrap gap-2"
                  style={{ color: "var(--color-text-muted)", fontSize: 11 }}
                >
                  {(t.id === "bookish"
                    ? ["朱砂红", "卡片列表", "衬线标题", "暗色适配"]
                    : ["琥珀暖色", "时间轴", "两端对齐", "虚线分割"]
                  ).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded"
                      style={{ backgroundColor: "var(--color-base)", border: "1px solid var(--color-border)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-6 text-xs font-mono tracking-wider"
          style={{ color: "var(--color-accent)", opacity: 0.5 }}
        >
          访问 ?theme=bookish 或 ?theme=zen-editorial 即刻切换
        </p>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════
          引擎特性
          ═══════════════════════════════════════════════ */}
      <section className="py-8">
        <SectionLabel>引擎特性</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl p-6 border flex gap-4"
              style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
            >
              <div className="text-2xl shrink-0 mt-0.5">{f.icon}</div>
              <div>
                <h3 className="font-semibold text-sm mb-1.5" style={{ fontFamily: '"Noto Serif SC", Georgia, serif' }}>
                  {f.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════
          两种用法
          ═══════════════════════════════════════════════ */}
      <section className="py-8">
        <SectionLabel>两种用法</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
          <ModeCard
            title="产品官方站"
            tag="siteMode: product"
            desc="Hero 页 + 特性展示 + 主题画廊。作为博客引擎的对外展示页，像 Hexo / Hugo 官网一样。"
          />
          <ModeCard
            title="个人博客站"
            tag="siteMode: blog"
            desc="双主题文章列表首页，运行时一键切换朱墨与溯光。写作、发布、切换主题，全在 Markdown 中完成。"
          />
        </div>
        <p
          className="text-center mt-5 text-xs"
          style={{ color: "var(--color-text-muted)", opacity: 0.45 }}
        >
          同一份代码，修改一行配置即可切换。一套引擎，两种身份。
        </p>
      </section>

      <Divider />

      {/* ═══════════════════════════════════════════════
          技术栈
          ═══════════════════════════════════════════════ */}
      <section className="py-8 text-center">
        <SectionLabel>技术栈</SectionLabel>
        <div className="flex justify-center flex-wrap gap-3 mt-6">
          {["Next.js 15", "TypeScript", "Tailwind CSS 4", "remark", "gray-matter"].map((t) => (
            <span
              key={t}
              className="px-3 py-1.5 rounded text-xs font-mono tracking-wide"
              style={{ border: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          Bottom CTA
          ═══════════════════════════════════════════════ */}
      <section
        className="text-center py-14 mb-10 rounded-2xl"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <p
          className="text-xl font-semibold mb-2"
          style={{ fontFamily: '"Noto Serif SC", Georgia, serif' }}
        >
          开始使用叙溯
        </p>
        <p className="text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>
          Markdown 写作 · 一键部署 · 双主题自由切换
        </p>
        <div className="inline-flex items-stretch rounded-lg overflow-hidden border" style={{ borderColor: "var(--color-border)" }}>
          <code
            className="px-5 py-3 text-sm font-mono flex items-center"
            style={{ backgroundColor: "var(--color-base)", color: "var(--color-text)" }}
          >
            git clone https://github.com/msoceo/xusu.git
          </code>
          <CopyHint />
        </div>
        <p className="mt-5">
          <a
            href="https://github.com/msoceo/xusu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium tracking-wide px-4 py-2 rounded-md border transition-colors duration-200 hover:bg-[var(--color-surface)]"
            style={{ borderColor: "var(--color-border)", color: "var(--color-accent)" }}
          >
            查看仓库 &rarr;
          </a>
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="text-center py-8 border-t border-dashed" style={{ borderColor: "var(--color-border)" }}>
        <p className="text-xs tracking-wider" style={{ color: "var(--color-text-muted)", opacity: 0.4 }}>
          {siteConfig.name} &middot; {siteConfig.author} &middot; {siteConfig.year}
        </p>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Sub-components
   ═══════════════════════════════════════════ */

function SectionLabel({ children }: { children: string }) {
  return (
    <h2
      className="text-center text-xs font-mono tracking-[0.3em] uppercase"
      style={{ color: "var(--color-text-muted)", opacity: 0.5 }}
    >
      {children}
    </h2>
  );
}

function Divider() {
  return (
    <hr
      className="my-4 border-t border-dashed max-w-xs mx-auto"
      style={{ borderColor: "var(--color-border)" }}
    />
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span
      className="inline-block w-3 h-3 rounded-full shrink-0"
      style={{ backgroundColor: color }}
    />
  );
}

function Line({ children }: { children: string }) {
  return (
    <div className="flex items-center">
      <span style={{ color: "var(--color-text-muted)", opacity: 0.4, marginRight: 8, flexShrink: 0 }}>
        $
      </span>
      <span>{children}</span>
    </div>
  );
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        className="text-2xl sm:text-3xl font-bold tracking-tight"
        style={{ color: "var(--color-accent)", fontFamily: '"Noto Serif SC", Georgia, serif' }}
      >
        {value}
      </div>
      <div className="text-[10px] mt-1 tracking-wider uppercase" style={{ color: "var(--color-text-muted)", opacity: 0.5 }}>
        {label}
      </div>
    </div>
  );
}

function Bar({ w, id }: { w: string; id: string }) {
  return (
    <div
      className="h-2 rounded"
      style={{
        width: w,
        background:
          id === "bookish"
            ? "oklch(0.55 0.22 25 / 0.08)"
            : "#D9D4CC",
        borderRadius: id === "bookish" ? 4 : 1,
      }}
    />
  );
}

function ModeCard({ title, tag, desc }: { title: string; tag: string; desc: string }) {
  return (
    <div
      className="rounded-xl p-6 border"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
    >
      <span
        className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded mb-3 inline-block"
        style={{ color: "var(--color-accent)", border: "1px solid var(--color-accent)", opacity: 0.5 }}
      >
        {tag}
      </span>
      <h3 className="text-base font-semibold mb-2" style={{ fontFamily: '"Noto Serif SC", Georgia, serif' }}>
        {title}
      </h3>
      <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
        {desc}
      </p>
    </div>
  );
}

function CopyHint() {
  return (
    <span
      className="px-4 text-[10px] font-mono tracking-wider flex items-center cursor-pointer transition-colors duration-150 hover:opacity-70"
      style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}
    >
      复制
    </span>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */

const sellingPoints = [
  {
    title: "中文排版优先",
    body: "Noto Serif SC 衬线标题，正文两端对齐，行高 1.8，虚线分割。不是翻译过来的排版，是从中文阅读习惯出发设计的。",
  },
  {
    title: "双主题，零等待",
    body: "朱墨与溯光内置于同一份构建产物。读者在 URL 后加 ?theme=bookish 就能换一套风格，不需要你重新构建部署。",
  },
  {
    title: "一套代码，两种身份",
    body: "siteMode: product 是产品官方站，siteMode: blog 是个人博客。同一份引擎代码，改一行配置即可。",
  },
];

const features = [
  {
    icon: "📝",
    title: "Markdown 原生",
    desc: "content/ 目录下写 .md 文件，gray-matter 解析元信息，remark 渲染。无需数据库，文件即文章。",
  },
  {
    icon: "⚡",
    title: "双模架构",
    desc: "静态模式导出纯 HTML，一键部署 GitHub Pages。动态模式接入数据库后支持在线编辑，同一套代码按需切换。",
  },
  {
    icon: "🌗",
    title: "暗色模式适配",
    desc: "跟随系统或手动切换，朱墨与溯光各自拥有独立的暗色调配方案，夜间阅读柔和不刺眼。",
  },
  {
    icon: "🚀",
    title: "零运行时依赖",
    desc: "纯 Next.js 静态导出，产物是一堆 HTML + JS + CSS 文件。扔到任何静态服务器上直接跑。",
  },
];

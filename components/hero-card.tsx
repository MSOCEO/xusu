"use client";

import { siteConfig } from "@/lib/config";

/**
 * 可复用 Hero 区 — 3 种 Variant：
 * - "documentarian": 极简标题 + 描述（对标 NexT / PaperMod）
 * - "magazine": 大标题 + 标签线 + 描述（对标 Stack / Icarus）
 * - "personal": 大标题 + 打字机副标题（对标 Butterfly / LoveIt）
 */

type HeroVariant = "documentarian" | "magazine" | "personal";

interface HeroCardProps {
  variant: HeroVariant;
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export default function HeroCard({
  variant,
  title = siteConfig.name,
  subtitle,
  description = siteConfig.description,
  className = "",
}: HeroCardProps) {
  if (variant === "documentarian") {
    return (
      <section
        className={`mb-20 pt-2 pb-6 ${className}`}
        style={{ borderBottom: "1px dashed var(--color-line)" }}
      >
        <h1
          className="text-3xl sm:text-4xl font-bold tracking-wider text-[var(--color-text)] mb-3"
          style={{ fontFamily: '"Noto Serif SC", Georgia, serif' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm leading-relaxed opacity-35 max-w-xl italic mb-2"
             style={{ fontFamily: '"Noto Serif SC", Georgia, serif' }}>
            {subtitle}
          </p>
        )}
        <p className="text-sm leading-relaxed opacity-45 max-w-xl">
          {description}
        </p>
      </section>
    );
  }

  if (variant === "magazine") {
    return (
      <section className={`mb-16 pt-4 ${className}`}>
        <div className="flex items-baseline gap-3 mb-3">
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-wider text-[var(--color-text)]"
            style={{ fontFamily: '"Noto Serif SC", serif' }}
          >
            {title}
          </h1>
          <span className="text-xs tracking-[0.2em] uppercase opacity-25 font-mono mt-1">
            Xusu
          </span>
        </div>
        {subtitle && (
          <p className="text-sm leading-relaxed opacity-40 max-w-lg mb-2 italic"
             style={{ fontFamily: '"Noto Serif SC", serif' }}>
            {subtitle}
          </p>
        )}
        <p className="text-sm leading-relaxed opacity-50 max-w-lg">
          {description}
        </p>
        <div
          className="mt-6 h-[2px] w-8 rounded-full"
          style={{ background: "var(--color-accent)" }}
        />
      </section>
    );
  }

  // personal
  return (
    <section className={`mb-20 pt-6 text-center ${className}`}>
      <div
        className="w-20 h-20 mx-auto mb-5 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: "var(--color-accent-soft)", background: "var(--color-surface)" }}
      >
        <span
          className="text-2xl select-none"
          style={{ fontFamily: '"Noto Serif SC", serif', color: "var(--color-accent)" }}
        >
          {title.charAt(0)}
        </span>
      </div>
      <h1
        className="text-3xl sm:text-4xl font-bold tracking-wider text-[var(--color-text)] mb-4"
        style={{ fontFamily: '"Noto Serif SC", Georgia, serif' }}
      >
        {title}
      </h1>

      {/* Typewriter subtitle */}
      <p
        className="typewriter-text text-sm opacity-45 mx-auto mb-4"
        style={{ fontFamily: '"Noto Serif SC", Georgia, serif' }}
        aria-label={subtitle || description}
      >
        {subtitle || description}
      </p>

      <p className="text-xs opacity-30 max-w-sm mx-auto leading-relaxed">
        {subtitle ? description : ""}
      </p>

      <div className="flex justify-center gap-3 mt-6">
        <a
          href="/archive"
          className="text-xs px-5 py-2 rounded-full border transition-all duration-200 hover:scale-105"
          style={{
            borderColor: "var(--color-accent)",
            color: "var(--color-accent)",
            textDecoration: "none",
          }}
        >
          浏览文章
        </a>
        <a
          href="/about"
          className="text-xs px-5 py-2 rounded-full transition-all duration-200 hover:scale-105"
          style={{
            background: "var(--color-accent)",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          关于我
        </a>
      </div>
    </section>
  );
}

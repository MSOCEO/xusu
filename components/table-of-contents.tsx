"use client";

import { useEffect, useState, useCallback } from "react";
import type { Heading } from "@/lib/toc";

/** 增强目录 — ScrollSpy + 平滑滚动，对标 VuePress 侧边栏体验 */
export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);

  // ScrollSpy: 滚动监听高亮
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 找第一个进入视口的标题
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          setActiveId(intersecting[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    for (const el of els) observer.observe(el);

    return () => observer.disconnect();
  }, [headings]);

  // 延迟显示，避免 FOUC
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  }, []);

  if (headings.length === 0 || !visible) return null;

  return (
    <nav
      aria-label="目录"
      className="hidden xl:block fixed top-28 right-[max(2rem,calc((100vw-52rem)/2-14rem))] w-44 max-h-[calc(100vh-10rem)] overflow-y-auto"
    >
      <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-20 mb-4 select-none">
        目录
      </h2>
      <ul className="space-y-0.5 border-l border-[var(--color-line)]">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li
              key={h.id}
              style={{ paddingLeft: `${Math.max(0.5, (h.level - 1) * 0.6)}rem` }}
            >
              <a
                href={`#${h.id}`}
                onClick={(e) => handleClick(e, h.id)}
                className={`block text-xs py-1 transition-all duration-150 border-l-2 -ml-px pl-2.5 ${
                  isActive
                    ? "border-[var(--color-accent)] text-[var(--color-accent)] opacity-100 font-medium"
                    : "border-transparent opacity-30 hover:opacity-55"
                }`}
                style={{ textDecoration: "none", lineHeight: 1.5 }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

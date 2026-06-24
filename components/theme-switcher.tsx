"use client";

import { useEffect, useState } from "react";

const THEMES = [
  { id: "zen-editorial", label: "溯光" },
  { id: "bookish", label: "朱墨" },
  { id: "personal", label: "星霜" },
] as const;

export default function ThemeSwitcher() {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const stored = (() => {
      try { return localStorage.getItem("xusu-theme"); } catch { return null; }
    })();
    const el = document.documentElement.getAttribute("data-theme");
    setCurrent(stored || el || THEMES[0].id);
  }, []);

  const switchTo = (id: string) => {
    setCurrent(id);
    document.documentElement.setAttribute("data-theme", id);
    try { localStorage.setItem("xusu-theme", id); } catch {}
  };

  return (
    <div className="flex items-center gap-0.5 ml-1">
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => switchTo(t.id)}
          className={`text-[11px] px-2 py-1 rounded transition-all duration-150 tracking-wider ${
            current === t.id
              ? "bg-[var(--color-accent)] text-white font-medium"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
          }`}
          aria-label={`切换到 ${t.label} 主题`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

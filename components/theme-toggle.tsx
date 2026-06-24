"use client";

import { useState, useEffect, useCallback } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    if (stored === "dark") setIsDark(true);
    else if (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDark(true);
    }
  }, []);

  const toggle = useCallback(() => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }, [isDark]);

  if (!mounted) {
    return <span className="w-9 h-9 block" />;
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "切换到亮色模式" : "切换到暗色模式"}
      className="relative w-9 h-9 flex items-center justify-center rounded-md
        text-[var(--color-text-muted)] hover:text-[var(--color-text)]
        hover:bg-[oklch(from_var(--color-accent)_l_c_h_/_0.06)]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]
        active:scale-95
        transition-all duration-150 ease-out"
      style={{ minWidth: "44px", minHeight: "44px" }}
    >
      <SunIcon className="h-5 w-5 transition-all duration-300 ease-out-expo
        dark:opacity-0 dark:scale-50 dark:rotate-90 dark:absolute" />
      <MoonIcon className="h-5 w-5 transition-all duration-300 ease-out-expo
        opacity-0 scale-50 -rotate-90 absolute
        dark:opacity-100 dark:scale-100 dark:rotate-0 dark:relative" />
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

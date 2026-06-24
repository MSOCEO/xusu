"use client";

/** 侧边栏作者卡片 — 对标 Icarus / Stack 的 Profile Card */
export default function SidebarProfile() {
  return (
    <aside
      className="hidden lg:block fixed top-28 left-[max(1.5rem,calc((100vw-52rem)/2-14rem))] w-44"
      aria-label="作者信息"
    >
      {/* 头像占位 */}
      <div
        className="w-16 h-16 rounded-full mb-4 border-2"
        style={{
          borderColor: "var(--color-accent-soft)",
          background: "var(--color-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          className="text-xl select-none"
          style={{ fontFamily: '"Noto Serif SC", serif', color: "var(--color-accent)" }}
        >
          叙
        </span>
      </div>

      <h3
        className="text-sm font-semibold text-[var(--color-text)] mb-1"
        style={{ fontFamily: '"Noto Serif SC", serif' }}
      >
        叙溯
      </h3>
      <p className="text-[11px] leading-relaxed opacity-35 mb-4 pr-2">
        一边讲述，一边溯源。在书写中厘清思路，在回顾中看见轨迹。
      </p>

      {/* 社交链接 */}
      <div className="flex gap-3">
        <SocialLink href="https://github.com/MSOCEO" label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </SocialLink>
      </div>
    </aside>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="opacity-25 hover:opacity-55 transition-opacity duration-200"
      style={{ color: "var(--color-text)", textDecoration: "none" }}
    >
      {children}
    </a>
  );
}

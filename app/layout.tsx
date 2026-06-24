// ── 修改后的 layout.tsx：接入插件注入 ──
import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { loadPlugins } from "@/lib/plugins";
import ThemeToggle from "@/components/theme-toggle";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const plugins = loadPlugins();

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/* 插件注入：head 区域 */}
        {plugins.head && (
          <div dangerouslySetInnerHTML={{ __html: plugins.head }} />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* 插件注入：body 顶部 */}
        {plugins.bodyStart && (
          <div dangerouslySetInnerHTML={{ __html: plugins.bodyStart }} />
        )}

        <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
            <span className="font-bold text-lg">{siteConfig.name}</span>
            <div className="flex items-center gap-4 text-sm">
              <a href="/" className="hover:text-blue-600 transition-colors">首页</a>
              <a href="/about" className="hover:text-blue-600 transition-colors">关于</a>
              <a href="/admin" className="hover:text-blue-600 transition-colors">管理</a>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
          {children}
        </main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-sm text-zinc-500">
          &copy; {siteConfig.year} {siteConfig.name}. Powered by DualBlog.
        </footer>

        {/* 插件注入：body 底部 */}
        {plugins.bodyEnd && (
          <div dangerouslySetInnerHTML={{ __html: plugins.bodyEnd }} />
        )}
      </body>
    </html>
  );
}

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function ArchivePage() {
  const posts = getAllPosts();
  const grouped: Record<string, typeof posts> = {};
  posts.forEach((p) => { const year = p.date.slice(0, 4); if (!grouped[year]) grouped[year] = []; grouped[year].push(p); });

  return (
    <div className="max-w-2xl mx-auto">
      <header className="mb-12"><h1 className="text-3xl font-bold mb-2">归档</h1><p className="text-zinc-500">{posts.length} 篇文章</p></header>
      {posts.length === 0 ? <p className="text-zinc-400 text-center py-16">还没有文章。</p> : (
        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-700" />
          {Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0])).map(([year, items]) => (
            <div key={year} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[23px] h-[23px] rounded-full border-2 border-blue-500 bg-white dark:bg-zinc-900 flex items-center justify-center shrink-0 z-10"><div className="w-[7px] h-[7px] rounded-full bg-blue-500" /></div>
                <span className="text-lg font-bold text-zinc-300 dark:text-zinc-600">{year}</span>
                <span className="text-xs text-zinc-400">{items.length} 篇</span>
              </div>
              <div className="ml-[30px] space-y-0">
                {items.map((post) => (
                  <Link key={post.slug} href={`/${post.slug}`} className="group block pl-6 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">{post.title}</span>
                      <time className="text-[10px] text-zinc-400 font-mono whitespace-nowrap">{post.date.slice(5)}</time>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function TagsPage() {
  const posts = getAllPosts();
  const tagCounts: Record<string, number> = {};
  posts.forEach((p) => p.tags?.forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1)));
  const tags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);

  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-12"><h1 className="text-3xl font-bold mb-2">标签</h1><p className="text-zinc-500">{tags.length} 个标签</p></header>
      {tags.length === 0 ? <p className="text-zinc-400 text-center py-16">还没有标签。</p> : (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            const count = tagCounts[tag];
            const size = Math.min(1.8, 0.8 + count * 0.15);
            return (
              <Link key={tag} href={`/?tag=${encodeURIComponent(tag)}`}
                className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all"
                style={{ fontSize: `${size}rem` }}>
                <span className="font-medium hover:text-blue-600 transition-colors">{tag}</span>
                <span className="ml-1.5 text-[0.7em] text-zinc-400">{count}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

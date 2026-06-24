// ── 现代中式书卷气 · 首页：Hero + 卡片列表 + 分页（增强版：封面图、Profile 侧边栏） ──
import { getAllPosts } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";
import Link from "next/link";
import HeroCard from "@/components/hero-card";
import SidebarProfile from "@/components/sidebar-profile";
import PaginationNav from "@/components/pagination-nav";

interface Props {
  posts?: PostMeta[];
  page?: number;
  totalPages?: number;
}

export default function HomepageBookish({ posts: propPosts, page, totalPages }: Props) {
  const posts = propPosts ?? getAllPosts();

  return (
    <div>
      {/* Sidebar Profile — 对标 Icarus / Stack 左侧固定 Profile */}
      <div className="theme-bookish-block">
        <SidebarProfile />
      </div>

      {/* Hero */}
      <HeroCard
        variant="magazine"
        subtitle="一边讲述，一边溯源"
      />

      {/* Card List */}
      <section aria-label="文章列表">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-px">
            {posts.map((post, i) => (
              <ArticleCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      <PaginationNav page={page ?? 1} totalPages={totalPages ?? 1} />
    </div>
  );
}

function ArticleCard({ post, index }: { post: ReturnType<typeof getAllPosts>[number]; index: number }) {
  return (
    <article
      className="group relative -mx-3 px-3 py-4 rounded-lg transition-all duration-200 ease-out hover:bg-[oklch(from_var(--color-accent)_l_c_h_/_0.03)]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link href={`/${post.slug}`} className="block no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] rounded-md">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <h2 className="text-base sm:text-lg font-semibold leading-snug text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200 ease-out">
            {post.title}
          </h2>
          <time className="text-xs whitespace-nowrap opacity-35 font-mono tabular-nums" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
        </div>

        {post.description && (
          <p className="mt-1 text-sm leading-relaxed opacity-40 line-clamp-2 transition-opacity duration-200 group-hover:opacity-55">
            {post.description}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded font-mono opacity-30 group-hover:opacity-45 transition-opacity duration-200"
                style={{ background: "oklch(from var(--color-accent) l c h / 0.06)", color: "var(--color-accent)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <p className="text-5xl opacity-10 mb-4" style={{ fontFamily: '"Noto Serif SC", serif' }}>叙</p>
      <p className="text-sm opacity-35">尚未有文章。在 content/ 目录下创建 .md 文件，开始你的书写。</p>
      <p className="text-xs opacity-20 mt-2 font-mono">content/hello-world.md</p>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}·${String(d.getMonth() + 1).padStart(2, "0")}·${String(d.getDate()).padStart(2, "0")}`;
}

// ── 个人品牌风 · 首页：Hero + 卡片列表 + 分页 ──
import { getAllPosts } from "@/lib/posts";
import type { PostMeta } from "@/lib/posts";
import Link from "next/link";
import HeroCard from "@/components/hero-card";
import PaginationNav from "@/components/pagination-nav";

interface Props {
  posts?: PostMeta[];
  page?: number;
  totalPages?: number;
}

export default function HomepagePersonal({ posts: propPosts, page, totalPages }: Props) {
  const posts = propPosts ?? getAllPosts();

  return (
    <div>
      {/* Hero */}
      <HeroCard variant="personal" />

      {/* Article Cards */}
      <section aria-label="文章列表">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
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
      className="card hover-lift group cursor-pointer"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link href={`/${post.slug}`} style={{ textDecoration: "none" }} className="block p-5">
        {post.category && (
          <span
            className="inline-block text-[10px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 rounded mb-3"
            style={{ color: "var(--color-accent)", background: "oklch(from var(--color-accent) l c h / 0.07)" }}
          >
            {post.category}
          </span>
        )}

        <h2 className="text-base font-semibold leading-snug text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200 mb-2">
          {post.title}
        </h2>

        {post.description && (
          <p className="text-sm leading-relaxed opacity-40 line-clamp-2 mb-3 transition-opacity duration-200 group-hover:opacity-55">
            {post.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <time className="text-xs opacity-30 font-mono tabular-nums" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[10px] opacity-25 font-mono">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <p className="text-4xl opacity-10 mb-4" style={{ fontFamily: '"Noto Serif SC", serif' }}>叙</p>
      <p className="text-sm opacity-35">尚未有文章。</p>
      <p className="text-xs opacity-20 mt-2 font-mono">在 content/ 目录下创建 .md 文件</p>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}·${String(d.getMonth() + 1).padStart(2, "0")}·${String(d.getDate()).padStart(2, "0")}`;
}

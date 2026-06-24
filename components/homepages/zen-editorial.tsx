// ── 禅意社论风 · 首页：溯源长河时间轴 + 分页（增强版：Hero + 进度条） ──
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

export default function HomepageZenEditorial({ posts: propPosts, page, totalPages }: Props) {
  const posts = propPosts ?? getAllPosts();

  return (
    <div>
      {/* Hero */}
      <HeroCard variant="documentarian" />

      {/* Timeline */}
      <section aria-label="文章列表">
        {posts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="relative">
            {posts.map((post, i) => (
              <TimelineItem key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      <PaginationNav page={page ?? 1} totalPages={totalPages ?? 1} />
    </div>
  );
}

function TimelineItem({ post, index }: { post: ReturnType<typeof getAllPosts>[number]; index: number }) {
  return (
    <article className="relative pl-10 pb-12 group" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="absolute left-[9px] top-2 bottom-0 w-px" style={{ background: "var(--color-line)" }} />
      <div
        className="absolute left-[3px] top-2 w-[13px] h-[13px] rounded-full border-2 transition-all duration-300 ease-out"
        style={{ borderColor: "var(--color-line)", backgroundColor: "var(--color-base)" }}
      >
        <div
          className="absolute inset-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
          style={{ backgroundColor: "var(--color-accent)" }}
        />
      </div>

      <Link href={`/${post.slug}`} className="block no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] rounded-md">
        <div className="flex flex-wrap items-center gap-3 mb-1.5">
          <time className="text-xs opacity-35 font-mono tabular-nums tracking-wide" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          {post.category && (
            <span
              className="text-[10px] font-mono tracking-[0.2em] uppercase px-2 py-0.5 rounded"
              style={{ color: "var(--color-accent)", background: "rgba(142, 85, 41, 0.06)" }}
            >
              {post.category}
            </span>
          )}
        </div>

        <h2 className="text-base sm:text-lg font-semibold leading-snug text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors duration-200 ease-out">
          {post.title}
        </h2>

        {post.description && (
          <p className="mt-1.5 text-sm leading-relaxed opacity-35 line-clamp-2 transition-opacity duration-200 group-hover:opacity-50">
            {post.description}
          </p>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="text-[11px] italic opacity-25 group-hover:opacity-40 transition-opacity duration-200" style={{ color: "var(--color-text-muted)" }}>
                #{tag}
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
    <div className="relative pl-10">
      <div className="absolute left-[9px] top-2 bottom-0 w-px" style={{ background: "var(--color-line)" }} />
      <div className="absolute left-[3px] top-2 w-[13px] h-[13px] rounded-full border-2" style={{ borderColor: "var(--color-line)", backgroundColor: "var(--color-base)" }} />
      <div className="py-16 px-6 text-center border border-dashed rounded-lg" style={{ borderColor: "var(--color-line)" }}>
        <p className="text-5xl opacity-8 mb-3 select-none" style={{ fontFamily: '"Noto Serif SC", Georgia, serif' }}>叙</p>
        <p className="text-sm opacity-30">尚未有文章。</p>
        <p className="text-xs opacity-20 mt-1 font-mono">在 content/ 目录下创建 .md 文件，开始溯源书写。</p>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}·${String(d.getMonth() + 1).padStart(2, "0")}·${String(d.getDate()).padStart(2, "0")}`;
}

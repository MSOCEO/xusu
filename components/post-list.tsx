import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

/** 文章条目 — 朱墨用卡片、溯光用时间轴行，CSS 变量驱动 */
export function PostListItem({ post, variant = "card" }: { post: PostMeta; variant?: "card" | "row" }) {
  const date = new Date(post.date);
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  return (
    <article className="group">
      <Link
        href={`/${post.slug}`}
        style={{
          display: "block",
          padding: variant === "card" ? "1.25rem" : "0.75rem 0",
          borderBottom: variant === "row" ? "1px dashed var(--color-border)" : "none",
          borderRadius: variant === "card" ? "0.75rem" : "0",
          border: variant === "card" ? "1px solid var(--color-border)" : "none",
          backgroundColor: variant === "card" ? "var(--color-surface)" : "transparent",
          textDecoration: "none",
          transition: "background-color 0.15s",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "0.75rem" }}>
          <h3
            style={{
              margin: 0,
              fontSize: variant === "card" ? "1rem" : "0.9375rem",
              fontWeight: 600,
              color: "var(--color-text)",
              fontFamily: "'Noto Serif SC', Georgia, serif",
              lineHeight: 1.5,
            }}
          >
            {post.title}
          </h3>
          <time
            style={{
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
              whiteSpace: "nowrap",
              opacity: 0.5,
              flexShrink: 0,
            }}
          >
            {dateStr}
          </time>
        </div>
        {post.description && (
          <p style={{ margin: "0.4rem 0 0", fontSize: "0.8125rem", color: "var(--color-text-muted)", lineHeight: 1.6, opacity: 0.7 }}>
            {post.description}
          </p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: "flex", gap: "0.375rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
            {post.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "0.6875rem",
                  padding: "0.125rem 0.5rem",
                  borderRadius: "0.25rem",
                  backgroundColor: "var(--color-base)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-muted)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}

/** 文章列表容器 */
export function PostList({ posts, variant = "card" }: { posts: PostMeta[]; variant?: "card" | "row" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: variant === "card" ? "0.75rem" : "0" }}>
      {posts.map((post) => (
        <PostListItem key={post.slug} post={post} variant={variant} />
      ))}
    </div>
  );
}

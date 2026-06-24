import Link from "next/link";

export default function PaginationNav({
  page,
  totalPages,
  basePath = "/posts",
}: {
  page: number;
  totalPages: number;
  basePath?: string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-16 pt-8 flex items-center justify-center gap-6"
      aria-label="分页"
    >
      {page > 1 ? (
        <Link
          href={page === 2 ? "/" : `${basePath}/${page - 1}`}
          className="text-sm opacity-35 hover:opacity-65 transition-opacity"
          style={{ textDecoration: "none" }}
        >
          ← 上一页
        </Link>
      ) : (
        <span className="text-sm opacity-15">← 上一页</span>
      )}
      <span className="text-xs font-mono tabular-nums opacity-25">
        {page} / {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={`${basePath}/${page + 1}`}
          className="text-sm opacity-35 hover:opacity-65 transition-opacity"
          style={{ textDecoration: "none" }}
        >
          下一页 →
        </Link>
      ) : (
        <span className="text-sm opacity-15">下一页 →</span>
      )}
    </nav>
  );
}

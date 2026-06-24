// ── 管理后台：文章状态 + 评论概览 ──
import { getAllPosts } from "@/lib/posts";
import { getCommentStats } from "@/lib/comment";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export default function AdminPage() {
  const posts = getAllPosts();
  const commentStats = getCommentStats();
  const totalComments = commentStats.reduce((sum, s) => sum + s.count, 0);

  // 从 frontmatter 中提取草稿（需要遍历，这里用 getAllPosts 已过滤 draft）
  // 提示：当前 getAllPosts 默认过滤 draft:true，如需显示需修改 lib/posts.ts

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">管理后台</h1>
      <p className="text-sm text-zinc-500 mb-8">
        当前模式：<strong>{siteConfig.mode === "static" ? "静态" : "动态"}</strong>
        {" · "}主题：<strong>{siteConfig.theme}</strong>
      </p>

      {/* 概览卡片 */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-center">
          <div className="text-2xl font-bold">{posts.length}</div>
          <div className="text-xs text-zinc-500 mt-1">已发布文章</div>
        </div>
        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-center">
          <div className="text-2xl font-bold">{totalComments}</div>
          <div className="text-xs text-zinc-500 mt-1">总评论数</div>
        </div>
        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 text-center">
          <div className="text-2xl font-bold">{commentStats.filter((s) => s.count > 0).length}</div>
          <div className="text-xs text-zinc-500 mt-1">有评论的文章</div>
        </div>
      </div>

      {/* 文章列表 */}
      <h2 className="text-lg font-semibold mb-3">文章列表</h2>
      <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 dark:bg-zinc-800">
            <tr>
              <th className="text-left px-4 py-2 font-medium">标题</th>
              <th className="text-left px-4 py-2 font-medium hidden sm:table-cell">日期</th>
              <th className="text-center px-4 py-2 font-medium w-20">评论</th>
              <th className="text-center px-4 py-2 font-medium w-16">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {posts.map((post) => {
              const stat = commentStats.find((s) => s.slug === post.slug);
              return (
                <tr key={post.slug} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="px-4 py-2">
                    <Link
                      href={`/${post.slug}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {post.title}
                    </Link>
                    {post.category && (
                      <span className="text-xs text-zinc-400 ml-2">{post.category}</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-zinc-500 hidden sm:table-cell">
                    {post.date.slice(0, 10)}
                  </td>
                  <td className="px-4 py-2 text-center text-zinc-500">
                    {stat?.count || 0}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                      已发布
                    </span>
                  </td>
                </tr>
              );
            })}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-400">
                  暂无文章
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-zinc-400 mt-4">
        提示：评论数据存储在浏览器 localStorage 中，仅本地可见。
        管理后台仅展示当前浏览器中的评论数据概览。
      </p>
    </div>
  );
}

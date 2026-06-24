const friends = [
  { name: "Hexo", url: "https://hexo.io", description: "快速、简洁且高效的博客框架", avatar: "🟢" },
  { name: "Hugo", url: "https://gohugo.io", description: "世界上最快的网站构建框架", avatar: "🟠" },
  { name: "Astro", url: "https://astro.build", description: "内容驱动网站的最佳框架", avatar: "🚀" },
  { name: "Nostr", url: "https://nostr.com", description: "去中心化社交协议", avatar: "🟣" },
  { name: "IPFS", url: "https://ipfs.tech", description: "去中心化文件存储网络", avatar: "📦" },
  { name: "Matrix", url: "https://matrix.org", description: "去中心化通信协议", avatar: "💬" },
];

export default function FriendsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-10"><h1 className="text-3xl font-bold mb-2">友链</h1><p className="text-zinc-500">互相链接，共建开放网络。</p></header>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {friends.map((f) => (
          <a key={f.name} href={f.url} target="_blank" rel="noopener noreferrer"
            className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 hover:shadow-md transition-all flex items-start gap-4 no-underline">
            <div className="text-2xl shrink-0">{f.avatar}</div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold group-hover:text-blue-600 transition-colors">{f.name}</h3>
              <p className="text-xs text-zinc-500 mt-1">{f.description}</p>
              <span className="text-[10px] text-zinc-400 font-mono mt-2 inline-block truncate">{f.url.replace("https://", "")}</span>
            </div>
          </a>
        ))}
      </div>
      <div className="mt-12 p-6 rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-700 text-center">
        <p className="text-sm text-zinc-400">想交换友链？通过评论或 GitHub Issue 提交。</p>
      </div>
    </div>
  );
}

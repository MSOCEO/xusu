import Link from "next/link";
import fs from "fs";
import path from "path";

interface Murmur {
  date: string;
  content: string;
  tags?: string[];
}

function getMurmurs(): Murmur[] {
  const filePath = path.join(process.cwd(), "content", "murmur", "index.md");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  const entries: Murmur[] = [];
  const blocks = raw.split("---\n").filter((b) => b.trim());
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    const entry: Partial<Murmur> = {};
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("date:")) entry.date = trimmed.slice(5).trim().replace(/^["']|["']$/g, "");
      else if (trimmed.startsWith("content:")) entry.content = trimmed.slice(8).trim().replace(/^["']|["']$/g, "");
      else if (trimmed.startsWith("tags:")) {
        try { entry.tags = JSON.parse(trimmed.slice(5).trim()); } catch { entry.tags = [trimmed.slice(5).trim()]; }
      }
    }
    if (entry.date && entry.content) entries.push(entry as Murmur);
  }
  return entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function MurmurPage() {
  const murmurs = getMurmurs();
  const grouped: Record<string, Murmur[]> = {};
  murmurs.forEach((m) => { const month = m.date.slice(0, 7); if (!grouped[month]) grouped[month] = []; grouped[month].push(m); });

  return (
    <div className="max-w-2xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-bold mb-2">碎念</h1>
        <p className="text-zinc-500 dark:text-zinc-400">短句、随想、碎碎念。{murmurs.length} 条</p>
      </header>
      {Object.keys(grouped).length === 0 ? (
        <p className="text-zinc-400 text-center py-16">还没有碎念。</p>
      ) : (
        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-zinc-700" />
          {Object.entries(grouped).sort((a, b) => b[0].localeCompare(a[0])).map(([month, items]) => (
            <div key={month} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-[23px] h-[23px] rounded-full border-2 border-blue-500 bg-white dark:bg-zinc-900 flex items-center justify-center shrink-0 z-10">
                  <div className="w-[7px] h-[7px] rounded-full bg-blue-500" />
                </div>
                <time className="text-xs font-bold text-zinc-400">{month}</time>
              </div>
              <div className="ml-[30px] space-y-0">
                {items.map((m, i) => (
                  <div key={`${m.date}-${i}`} className="group relative pl-6 py-3 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg transition-colors">
                    <div className="absolute left-[-3px] top-[18px] w-[7px] h-[7px] rounded-full bg-zinc-300 dark:bg-zinc-600 group-hover:bg-blue-400 transition-colors" />
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{m.content}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <time className="text-[10px] text-zinc-400 font-mono">{m.date.slice(5)}</time>
                      {m.tags?.map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded font-mono text-blue-500 bg-blue-50 dark:bg-blue-950/30">{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import fs from "fs";
import path from "path";

interface GardenNote { slug: string; title: string; tags: string[]; links: string[]; excerpt: string; }
const gardenDir = path.join(process.cwd(), "content", "garden");

function parseFM(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, unknown> = {};
  let curKey = "", curArr: string[] = [];
  for (const line of match[1].split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    if (t.startsWith("- ")) { curArr.push(t.slice(2).trim().replace(/^["']|["']$/g, "")); continue; }
    if (curKey && curArr.length > 0) { data[curKey] = curArr; curArr = []; curKey = ""; }
    const ci = t.indexOf(":");
    if (ci > 0) { const k = t.slice(0, ci).trim(); let v = t.slice(ci + 1).trim().replace(/^["']|["']$/g, ""); if (v.startsWith("[") && v.endsWith("]")) { try { data[k] = JSON.parse(v); } catch { data[k] = v; } } else data[k] = v; curKey = k; }
  }
  if (curKey && curArr.length > 0) data[curKey] = curArr;
  return { data, content: match[2] };
}

function getAllNotes(): GardenNote[] {
  if (!fs.existsSync(gardenDir)) return [];
  return fs.readdirSync(gardenDir).filter((f) => f.endsWith(".md")).map((file) => {
    const raw = fs.readFileSync(path.join(gardenDir, file), "utf-8");
    const { data, content } = parseFM(raw);
    const slug = file.replace(/\.md$/, "");
    return { slug, title: (data.title as string) || slug, tags: (data.tags as string[]) || [], links: (data.links as string[]) || [], excerpt: content.replace(/^#.*$/gm, "").replace(/\[\[(.*?)\]\]/g, "$1").trim().slice(0, 200) };
  });
}

export default function GardenPage() {
  const notes = getAllNotes();
  const allTags = [...new Set(notes.flatMap((n) => n.tags))].sort();
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">数字花园</h1>
        <p className="text-zinc-500 dark:text-zinc-400">{notes.length} 篇笔记</p>
      </header>
      {notes.length === 0 ? <p className="text-zinc-400 text-center py-16">花园里还没有笔记。</p> : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap gap-1.5 mb-6">{allTags.map((tag) => (<span key={tag} className="text-[10px] px-2 py-0.5 rounded-full font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800">{tag}</span>))}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notes.map((note) => (
                <Link key={note.slug} href={`/garden/${note.slug}`} className="group p-5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 hover:shadow-md transition-all">
                  <h3 className="text-base font-bold group-hover:text-blue-600 transition-colors mb-2">{note.title}</h3>
                  <p className="text-xs text-zinc-500 line-clamp-2">{note.excerpt}</p>
                  {note.links.length > 0 && <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800"><div className="flex flex-wrap gap-1">{note.links.map((l) => (<span key={l} className="text-[9px] px-1.5 py-0.5 rounded font-mono text-blue-500 bg-blue-50 dark:bg-blue-950/30">← {l}</span>))}</div></div>}
                </Link>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-20 p-5 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <h3 className="text-xs font-bold text-zinc-400 uppercase mb-4">知识图谱</h3>
              <div className="space-y-2">
                {notes.map((note) => (
                  <Link key={note.slug} href={`/garden/${note.slug}`} className="block p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm hover:text-blue-600">{note.title}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

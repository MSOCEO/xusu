import { notFound } from "next/navigation";
import Link from "next/link";
import fs from "fs";
import path from "path";

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

function getNote(slug: string) {
  const fp = path.join(gardenDir, `${slug}.md`);
  if (!fs.existsSync(fp)) return null;
  const raw = fs.readFileSync(fp, "utf-8");
  const { data, content } = parseFM(raw);
  return { slug, title: (data.title as string) || slug, tags: (data.tags as string[]) || [], links: (data.links as string[]) || [], content };
}

function getAllSlugs() { if (!fs.existsSync(gardenDir)) return []; return fs.readdirSync(gardenDir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, "")); }

function renderContent(content: string): string {
  return content.replace(/\[\[(.*?)\]\]/g, (_m, title) => {
    const target = getAllSlugs().map((s) => getNote(s)).find((n) => n?.title === title);
    return target ? `<a href="/garden/${target.slug}" class="text-blue-500 underline">${title}</a>` : `<span class="text-zinc-400 line-through">${title}</span>`;
  });
}

export function generateStaticParams() { return getAllSlugs().map((slug) => ({ slug })); }

export default async function GardenNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const backlinks = getAllSlugs().filter((s) => s !== slug).map((s) => getNote(s)).filter((n): n is NonNullable<typeof n> => n !== null).filter((n) => n.links.includes(note.title));

  return (
    <div className="max-w-3xl mx-auto">
      <nav className="mb-6"><Link href="/garden" className="text-sm text-zinc-500 hover:text-blue-600 transition-colors">← 数字花园</Link></nav>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-3">{note.title}</h1>
        {note.tags.length > 0 && <div className="flex gap-1.5">{note.tags.map((tag) => (<span key={tag} className="text-[10px] px-2 py-0.5 rounded font-mono text-blue-500 bg-blue-50 dark:bg-blue-950/30">{tag}</span>))}</div>}
      </header>
      {note.links.length > 0 && (
        <div className="mb-8 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
          <h3 className="text-xs font-bold text-zinc-400 uppercase mb-2">链接到</h3>
          <div className="flex flex-wrap gap-1.5">{note.links.map((link) => { const t = getAllSlugs().map((s) => getNote(s)).find((n) => n?.title === link); return t ? (<Link key={link} href={`/garden/${t.slug}`} className="text-xs px-2.5 py-1 rounded-full border border-blue-200 text-blue-500 hover:bg-blue-50 transition-colors">{link}</Link>) : (<span key={link} className="text-xs px-2.5 py-1 rounded-full border border-dashed border-zinc-300 text-zinc-400">{link}</span>); })}</div>
        </div>
      )}
      <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderContent(note.content) }} />
      {backlinks.length > 0 && (
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-700">
          <h3 className="text-xs font-bold text-zinc-400 uppercase mb-3">反向链接 ({backlinks.length})</h3>
          <div className="flex flex-wrap gap-2">{backlinks.map((bl) => (<Link key={bl.slug} href={`/garden/${bl.slug}`} className="text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-blue-300 hover:text-blue-600 transition-all">{bl.title}</Link>))}</div>
        </div>
      )}
    </div>
  );
}

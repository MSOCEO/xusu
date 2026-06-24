import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

const contentDir = path.join(process.cwd(), "content");

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title || file,
        date: data.date || new Date().toISOString(),
        description: data.description,
        tags: data.tags,
        category: data.category,
        draft: data.draft === true,
      } as PostMeta;
    })
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString(),
    description: data.description,
    tags: data.tags,
    category: data.category,
    draft: data.draft === true,
    content,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export interface TagInfo {
  name: string;
  count: number;
}

export function getAllTags(): TagInfo[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();
  for (const p of posts) {
    if (!p.tags) continue;
    for (const t of p.tags) {
      const tag = t.trim();
      if (tag) map.set(tag, (map.get(tag) || 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name, "zh"));
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter(
    (p) => p.tags && p.tags.map((t) => t.trim()).includes(tag)
  );
}

export function getAllTagSlugs(): string[] {
  return getAllTags().map((t) => t.name);
}

export interface ArchiveGroup {
  year: string;
  posts: PostMeta[];
}

export function getArchive(): ArchiveGroup[] {
  const posts = getAllPosts();
  const map = new Map<string, PostMeta[]>();
  for (const p of posts) {
    const year = new Date(p.date).getFullYear().toString();
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(p);
  }
  return Array.from(map.entries())
    .map(([year, posts]) => ({ year, posts }))
    .sort((a, b) => b.year.localeCompare(a.year));
}

export interface Stats {
  totalPosts: number;
  totalChars: number;
  totalWords: number;
  avgCharsPerPost: number;
  earliestPost: PostMeta | null;
  latestPost: PostMeta | null;
  years: { year: string; count: number }[];
  tags: TagInfo[];
}

export function getStats(): Stats {
  const posts = getAllPosts();
  const tags = getAllTags();
  let totalChars = 0;

  const yearsMap = new Map<string, number>();
  for (const p of posts) {
    const year = new Date(p.date).getFullYear().toString();
    yearsMap.set(year, (yearsMap.get(year) || 0) + 1);
  }

  // 字符/字数统计需要读全文
  for (const slug of posts.map((p) => p.slug)) {
    const filePath = path.join(contentDir, `${slug}.md`);
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const { content } = matter(raw);
      // 去除 front matter 后的正文，去掉空白和 markdown 标记
      const text = content.replace(/[#*`\[\]()>_~|{}\-+=.!:;,，。！？、；：""''（）【】《》\s]/g, "");
      totalChars += text.length;
    } catch {}
  }

  const years = Array.from(yearsMap.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => b.year.localeCompare(a.year));

  return {
    totalPosts: posts.length,
    totalChars,
    totalWords: Math.round(totalChars / 2),
    avgCharsPerPost: posts.length > 0 ? Math.round(totalChars / posts.length) : 0,
    earliestPost: posts.length > 0 ? posts[posts.length - 1] : null,
    latestPost: posts.length > 0 ? posts[0] : null,
    years,
    tags,
  };
}

/** 获取当前文章的上一页和下一页 */
export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  };
}

/** 分页：获取指定页的文章列表 */
export function getPaginatedPosts(page: number, perPage: number): PostMeta[] {
  const posts = getAllPosts();
  const start = (page - 1) * perPage;
  return posts.slice(start, start + perPage);
}

/** 总页数 */
export function getTotalPages(perPage: number): number {
  return Math.max(1, Math.ceil(getAllPosts().length / perPage));
}

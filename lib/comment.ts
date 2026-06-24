// ── 自写评论系统 (localStorage 存储) ──

export interface Comment {
  id: string;
  nick: string;
  content: string;
  date: string;
  replyTo?: string;
  region?: string;
  device?: string;
  gifUrl?: string;
  /** DiceBear avatar seed */
  avatarSeed?: string;
}

interface CommentStore {
  [slug: string]: Comment[];
}

const STORAGE_KEY = "xusu_comments";

function loadAll(): CommentStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(data: CommentStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function getComments(slug: string): Comment[] {
  const data = loadAll();
  return (data[slug] || []).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function addComment(
  slug: string,
  nick: string,
  content: string,
  replyTo?: string,
  meta?: { region?: string; device?: string; gifUrl?: string; avatarSeed?: string }
): Comment {
  const data = loadAll();
  if (!data[slug]) data[slug] = [];

  const comment: Comment = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    nick: nick.trim().slice(0, 30) || "匿名",
    content: content.trim().slice(0, 2000),
    date: new Date().toISOString(),
    replyTo,
    region: meta?.region,
    device: meta?.device,
    gifUrl: meta?.gifUrl,
    avatarSeed: meta?.avatarSeed,
  };

  data[slug].push(comment);
  saveAll(data);
  return comment;
}

export function deleteComment(slug: string, id: string): boolean {
  const data = loadAll();
  if (!data[slug]) return false;
  const idx = data[slug].findIndex((c) => c.id === id);
  if (idx === -1) return false;
  data[slug].splice(idx, 1);
  saveAll(data);
  return true;
}

export function getCommentCount(slug: string): number {
  const data = loadAll();
  return data[slug]?.length || 0;
}

export function getTotalCommentCount(): number {
  const data = loadAll();
  return Object.values(data).reduce((sum, arr) => sum + arr.length, 0);
}

export function getCommentStats(): { slug: string; count: number }[] {
  const data = loadAll();
  return Object.entries(data).map(([slug, comments]) => ({
    slug,
    count: comments.length,
  }));
}

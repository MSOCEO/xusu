// ── 自写评论组件（头像·随机昵称·Emoji·GIF·IP·设备）──
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getComments,
  addComment,
  deleteComment,
  type Comment,
} from "@/lib/comment";

// ══════════════════════════════════════
// 常量
// ══════════════════════════════════════

const EMOJI_LIST = [
  "😀","😂","🤣","😍","🥰","😎","🤩","😭","😤","😡",
  "👍","👎","👏","🙌","💪","🤝","❤️","🧡","💛","💚",
  "💙","💜","🖤","🤍","🔥","⭐","✨","🎉","🎊","💯",
  "🐱","🐶","🐼","🐨","🦊","🐰","🌹","🌸","🌻","🍀",
  "☕","🍵","🍺","🎂","🍰","🎵","🎶","📚","💻","🚀",
];

const NICKNAMES = [
  "橘猫侠","月亮邮差","风铃草","深海咸鱼","野原小白",
  "草莓奶盖","可乐冰块","晚风旅人","云朵收藏家","薄荷糖",
  "追光者","柠檬气泡水","银河投递员","沙发土豆","废柴魔法师",
  "松饼骑士","树洞精灵","甜橙布丁","北极星","熬夜冠军",
  "人间观察员","泡面仙人","蓝调时刻","海盐芝士","盛夏白瓷梅子汤",
  "等风来","白日梦想家","煎饼狗子","薯条队长","雾里看花",
  "慢吞吞的蜗牛","不羁的风","起司猫","彩虹糖","月光诗人",
  "种太阳的人","麦田守望者","三明治艺术家","桃花仙人","拉格朗日妖",
];

function randomNick(): string {
  return NICKNAMES[Math.floor(Math.random() * NICKNAMES.length)];
}

/** 生成 8 位随机 seed */
function randomSeed(): string {
  return Math.random().toString(36).slice(2, 10);
}

/** DiceBear adventurer 风格头像（高质量二次元风） */
function avatarUrl(seed: string): string {
  return `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(seed)}`;
}

// ══════════════════════════════════════
// 工具函数
// ══════════════════════════════════════

function parseDevice(): string {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return "iPhone";
  if (/Android/.test(ua)) return "Android";
  if (/Macintosh|Mac OS X/.test(ua)) return "Mac";
  if (/Windows/.test(ua)) return "Windows";
  if (/Linux/.test(ua)) return "Linux";
  return "Unknown";
}

async function fetchRegion(): Promise<string> {
  try {
    const res = await fetch("https://api.ip.sb/geoip", { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    const parts = [data.country, data.region, data.city].filter(Boolean);
    return parts.length > 0 ? parts.join(" · ") : "";
  } catch {
    return "";
  }
}

// ══════════════════════════════════════
// 组件
// ══════════════════════════════════════

interface Props {
  slug: string;
}

export default function CommentSection({ slug }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [nick, setNick] = useState(() => randomNick());
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | undefined>(undefined);
  const [submitting, setSubmitting] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [gifUrl, setGifUrl] = useState("");
  const [gifPreview, setGifPreview] = useState("");
  const [region, setRegion] = useState("");
  const [avatarSeed] = useState(randomSeed);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const refresh = useCallback(() => {
    setComments(getComments(slug));
  }, [slug]);

  useEffect(() => { refresh(); }, [refresh]);
  useEffect(() => { fetchRegion().then(setRegion); }, []);

  // ── Emoji ──
  const insertEmoji = (emoji: string) => {
    setContent((prev) => prev + emoji);
    setShowEmoji(false);
    textareaRef.current?.focus();
  };

  // ── GIF ──
  const handleGifPreview = () => {
    const url = gifUrl.trim();
    if (/\.(gif|webp)(\?.*)?$/i.test(url) || /(giphy|tenor|imgur)\.com/i.test(url)) {
      setGifPreview(url);
    }
  };

  // ── 提交 ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !gifPreview) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 100));
    addComment(slug, nick, content, replyTo, {
      region,
      device: parseDevice(),
      gifUrl: gifPreview || undefined,
      avatarSeed,
    });
    setContent("");
    setReplyTo(undefined);
    setGifUrl("");
    setGifPreview("");
    setSubmitting(false);
    refresh();
  };

  return (
    <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
      <h2 className="text-lg font-semibold mb-6">
        评论
        {comments.length > 0 && (
          <span className="text-zinc-400 font-normal ml-2 text-sm">
            ({comments.length})
          </span>
        )}
      </h2>

      {/* ═══ 评论列表 ═══ */}
      {comments.length > 0 && (
        <div className="space-y-4 mb-8">
          {comments.map((c) => (
            <div
              key={c.id}
              className="group p-3 -mx-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <div className="flex gap-3">
                {/* 头像 */}
                <img
                  src={avatarUrl(c.avatarSeed || c.id)}
                  alt=""
                  className="w-8 h-8 rounded-full flex-shrink-0 mt-0.5 bg-zinc-100 dark:bg-zinc-800"
                  loading="lazy"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-sm text-zinc-800 dark:text-zinc-200">
                      {c.nick}
                    </span>
                    <time className="text-xs text-zinc-400 font-mono tabular-nums">
                      {new Date(c.date).toLocaleString("zh-CN", {
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                    <span className="text-[10px] text-zinc-400 ml-auto flex items-center gap-2">
                      {c.device && <span className="opacity-60">{c.device}</span>}
                      {c.region && <span className="opacity-60">{c.region}</span>}
                    </span>
                    <button
                      onClick={() => deleteComment(slug, c.id)}
                      className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
                    >
                      删除
                    </button>
                  </div>

                  {c.replyTo && (
                    <div className="text-xs text-zinc-400 mb-1">
                      回复 @{comments.find((r) => r.id === c.replyTo)?.nick || "?"}
                    </div>
                  )}

                  {c.gifUrl && (
                    <div className="mb-2">
                      <img
                        src={c.gifUrl}
                        alt="GIF"
                        className="max-w-[200px] max-h-[160px] rounded-lg object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {c.content && (
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                      {c.content}
                    </p>
                  )}

                  <button
                    onClick={() => setReplyTo(c.id)}
                    className="text-xs text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 mt-1"
                  >
                    回复
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═══ 评论表单 ═══ */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {replyTo && (
          <div className="text-xs text-zinc-500 flex items-center gap-2">
            回复 @{comments.find((c) => c.id === replyTo)?.nick || "?"}
            <button type="button" onClick={() => setReplyTo(undefined)} className="text-zinc-400 hover:text-zinc-600">
              × 取消
            </button>
          </div>
        )}

        {/* 头像 + 昵称行 */}
        <div className="flex items-center gap-3">
          <img
            src={avatarUrl(avatarSeed)}
            alt=""
            className="w-10 h-10 rounded-full flex-shrink-0 bg-zinc-100 dark:bg-zinc-800"
          />
          <div className="flex-1">
            <input
              type="text"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              placeholder="昵称（选填）"
              maxLength={30}
              className="w-full px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 文本域 + 工具栏 */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="写下你的想法…"
            maxLength={2000}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-zinc-300 dark:border-zinc-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
            required={!gifPreview}
          />
          <div className="flex items-center gap-1 mt-1">
            <button
              type="button"
              onClick={() => { setShowEmoji(!showEmoji); setShowGif(false); }}
              className="text-sm px-1.5 py-0.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Emoji"
            >
              😊
            </button>
            <button
              type="button"
              onClick={() => { setShowGif(!showGif); setShowEmoji(false); }}
              className="text-sm px-1.5 py-0.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="GIF"
            >
              GIF
            </button>
          </div>

          {/* Emoji 面板 */}
          {showEmoji && (
            <div className="absolute left-0 bottom-full mb-1 p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-10 grid grid-cols-10 gap-1 max-w-[320px]">
              {EMOJI_LIST.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => insertEmoji(emoji)}
                  className="w-7 h-7 flex items-center justify-center text-sm rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          {/* GIF 面板 */}
          {showGif && (
            <div className="absolute left-0 bottom-full mb-1 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-10 w-[300px]">
              <p className="text-xs text-zinc-500 mb-2">
                粘贴 GIF 图片链接（Giphy / Tenor / Imgur）
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={gifUrl}
                  onChange={(e) => setGifUrl(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleGifPreview(); } }}
                  placeholder="https://media.giphy.com/..."
                  className="flex-1 px-2 py-1 text-xs border border-zinc-300 dark:border-zinc-600 rounded bg-transparent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleGifPreview}
                  className="text-xs px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded hover:opacity-80"
                >
                  预览
                </button>
              </div>
              {gifPreview && (
                <div className="mt-2 relative">
                  <img src={gifPreview} alt="GIF预览" className="max-w-full max-h-[120px] rounded-lg object-cover" onError={() => setGifPreview("")} />
                  <button type="button" onClick={() => setGifPreview("")} className="absolute top-1 right-1 text-xs bg-zinc-800 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-500">×</button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 已选 GIF 缩略 */}
        {gifPreview && !showGif && (
          <div className="relative inline-block">
            <img src={gifPreview} alt="GIF" className="max-w-[160px] max-h-[120px] rounded-lg" />
            <button type="button" onClick={() => setGifPreview("")} className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">×</button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            {content.length}/2000
            {region && <span className="ml-2 opacity-60">{parseDevice()} · {region}</span>}
          </span>
          <button
            type="submit"
            disabled={submitting || (!content.trim() && !gifPreview)}
            className="px-4 py-1.5 text-sm bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:opacity-80 disabled:opacity-40 transition-opacity"
          >
            {submitting ? "提交中…" : "发表评论"}
          </button>
        </div>
      </form>
    </div>
  );
}

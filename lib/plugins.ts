import fs from "fs";
import path from "path";

export interface Plugins {
  head: string;
  bodyStart: string;
  bodyEnd: string;
}

const pluginFile = path.join(process.cwd(), "content", "_plugins.json");

export function loadPlugins(): Plugins {
  try {
    if (!fs.existsSync(pluginFile)) return { head: "", bodyStart: "", bodyEnd: "" };
    const raw = fs.readFileSync(pluginFile, "utf-8");
    const data = JSON.parse(raw);
    return {
      head: sanitize(data.head || ""),
      bodyStart: sanitize(data.bodyStart || ""),
      bodyEnd: sanitize(data.bodyEnd || ""),
    };
  } catch {
    return { head: "", bodyStart: "", bodyEnd: "" };
  }
}

function sanitize(s: string): string {
  // 移除可能破坏模板的 </script> 标签
  return s.replace(/<\/script>/gi, "<\\/script>");
}

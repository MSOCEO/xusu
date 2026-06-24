"use client";

import { useEffect, useState } from "react";

/** 滚动进度条 — 对标 NexT 顶栏细红线的克制设计 */
export default function ProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) { setWidth(0); return; }
      setWidth(Math.min(100, (scrollTop / docHeight) * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="progress-bar"
      style={{ width: `${width}%` }}
      aria-hidden="true"
    />
  );
}

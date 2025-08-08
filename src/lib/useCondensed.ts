"use client";
import { useEffect, useState } from "react";

export function useCondensed(sentinelId: string) {
  const [condensed, setCondensed] = useState(false);
  useEffect(() => {
    const el = document.getElementById(sentinelId);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setCondensed(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [sentinelId]);
  return condensed;
}

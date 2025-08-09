import { useEffect, useRef } from "react";

export function useEdgeSwipeBack(
  onBack: () => void,
  opts?: { edge?: number; min?: number; maxY?: number; timeout?: number }
) {
  const triggered = useRef(false);

  useEffect(() => {
    const edge   = opts?.edge   ?? 28; // px from left to arm gesture
    const min    = opts?.min    ?? 60; // required horizontal travel
    const maxY   = opts?.maxY   ?? 40; // max vertical drift
    const tmo    = opts?.timeout?? 600;

    let sx = 0, sy = 0, t0 = 0, active = false;

    const start = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      if (t.clientX > edge) return;       // must begin at left edge
      sx = t.clientX; sy = t.clientY; t0 = Date.now();
      active = true; triggered.current = false;
    };
    const move = (e: TouchEvent) => {
      if (!active || triggered.current) return;
      const t = e.touches[0];
      const dx = t.clientX - sx;
      const dy = Math.abs(t.clientY - sy);
      const dt = Date.now() - t0;
      if (dt > tmo) { active = false; return; }
      if (dx > min && dy < maxY) {
        triggered.current = true; active = false; onBack();
      }
    };
    const end = () => { active = false; };

    window.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("touchmove",  move,  { passive: true });
    window.addEventListener("touchend",   end,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchmove",  move);
      window.removeEventListener("touchend",   end);
    };
  }, [onBack, opts?.edge, opts?.min, opts?.maxY, opts?.timeout]);
}

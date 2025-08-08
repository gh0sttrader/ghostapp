"use client";
import { Bar, delta } from "@/lib/range";

export default function TopRangeStrip({ bars, label }: { bars: Bar[]; label: string }) {
  const { abs, pct } = delta(bars);
  const up = pct > 0, flat = pct === 0;
  const sign = up ? "+" : "";
  const cls = flat ? "text-white/80" : up ? "text-up" : "text-down";

  return (
    <div className="bg-black px-4 py-2">
      <span className={`tabular-nums text-[14px] ${cls}`}>
        {sign}{abs.toFixed(2)} ({sign}{pct.toFixed(2)}%)
      </span>
      <span className="ml-2 text-[14px] text-white/80">Last {label}</span>
    </div>
  );
}

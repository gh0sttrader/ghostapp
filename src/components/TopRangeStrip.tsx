"use client";
import { Bar, delta } from "@/lib/range";

export default function TopRangeStrip({ bars, label }: { bars: Bar[]; label: string }) {
  const { abs, pct } = delta(bars);
  const up = pct > 0, flat = pct === 0;
  const sign = up ? "+" : "";

  return (
    <div className="w-full bg-black">
      <div className="px-4 pt-2">
        {/* thin divider under header */}
        <div className="h-px w-full bg-white/10" />
      </div>
      <div className="px-4 py-2">
        <span className={`tabular-nums text-[14px] ${flat ? "text-white/80" : up ? "text-up" : "text-down"}`}>
          {sign}{abs.toFixed(2)} ({sign}{pct.toFixed(2)}%)
        </span>
        <span className="ml-2 text-[14px] text-white/80">Last {label}</span>
      </div>
    </div>
  );
}

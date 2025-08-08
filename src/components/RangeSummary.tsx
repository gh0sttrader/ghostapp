
"use client";
import { Bar, delta } from "@/lib/range";

export default function RangeSummary({ bars, label }: { bars: Bar[]; label: string }) {
  const { abs, pct } = delta(bars);
  const up = pct > 0, flat = pct === 0;
  const sign = up ? "+" : ""; // minus comes from number itself
  const cls = flat ? "text-white/80" : up ? "text-up" : "text-down";

  return (
    <div className="px-4 py-2">
      <div className="h-px w-full bg-white/10 mb-2" />
      <div className="flex items-baseline gap-2 text-[14px]">
        <span className={`tabular-nums ${cls}`}>
          {sign}{abs.toFixed(2)} ({sign}{pct.toFixed(2)}%)
        </span>
        <span className="text-white/80">{label}</span>
      </div>
    </div>
  );
}

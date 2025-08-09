// components/TopRangeStrip.tsx
"use client";
import { Bar, delta } from "@/lib/range";
import TradeAttributes from "./TradeAttributes";

export default function TopRangeStrip({
  bars, label, attrs,
}: { bars: Bar[]; label: string; attrs: Parameters<typeof TradeAttributes>[0]["attrs"] }) {
  const { abs, pct } = delta(bars);
  const up = pct > 0, flat = pct === 0;
  const sign = up ? "+" : "";
  const cls = flat ? "text-white/80" : up ? "text-up" : "text-down";

  return (
    <div className="bg-black px-3 py-1">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-2 text-[12px] leading-4">
          <span className={`tabular-nums ${cls}`}>
            {sign}{abs.toFixed(2)} ({sign}{pct.toFixed(2)}%)
          </span>
          <span className="text-white/80">Last {label}</span>
        </div>

        <TradeAttributes attrs={attrs} size={16} />
      </div>
    </div>
  );
}

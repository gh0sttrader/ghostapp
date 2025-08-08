
"use client";
import { ChevronLeft } from "lucide-react";

type Props = {
  symbol: string;
  name: string;
  exchange?: string;
  price: number;
  change: number;
  changePct: number;
  high: number;
  low: number;
  volume: number;
};

const money = (n: number) => n.toFixed(2);
const pct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(2)}%`;
const vol = (n: number) =>
  n >= 1e9 ? `${(n / 1e9).toFixed(2)}B` :
  n >= 1e6 ? `${(n / 1e6).toFixed(2)}M` :
  n >= 1e3 ? `${(n / 1e3).toFixed(2)}K` : `${n}`;

export default function TradeHeaderCompact({
  symbol, name, exchange, price, change, changePct, high, low, volume,
}: Props) {
  const up = change > 0 || (change === 0 && changePct > 0);
  const dn = change < 0 || (change === 0 && changePct < 0);
  const deltaColor = up ? "text-emerald-400" : dn ? "text-red-400" : "text-white/60";
  const deltaIcon = up ? "▲" : dn ? "▼" : "◆";

  return (
    <header className="sticky top-0 z-40 bg-black">
      <div className="px-3 pt-1">
        {/* Row 1: symbol+name (left), stats (right) */}
        <div className="flex items-start">
          <button
            aria-label="Back"
            onClick={() => history.back()}
            className="mr-1 inline-flex h-6 w-6 items-center justify-center"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          <div className="min-w-0 flex-1 leading-none">
            <div className="text-[12px] font-semibold tracking-tight">{symbol}</div>
            <div className="truncate text-[10px] text-white/70">
              {name}{exchange ? ` ${exchange}` : ""}
            </div>
          </div>

          <div className="ml-2 text-right leading-tight">
            <div className="flex items-baseline justify-end gap-3">
              <span className="text-[10px] text-white/60">High</span>
              <span className="text-[12px] tabular-nums">{money(high)}</span>
            </div>
            <div className="mt-0.5 flex items-baseline justify-end gap-3">
              <span className="text-[10px] text-white/60">Low</span>
              <span className="text-[12px] tabular-nums">{money(low)}</span>
            </div>
            <div className="mt-0.5 flex items-baseline justify-end gap-3">
              <span className="text-[10px] text-white/60">Vol</span>
              <span className="text-[12px] tabular-nums">{vol(volume)}</span>
            </div>
          </div>
        </div>

        {/* Row 2: price + delta (left only) */}
        <div className="mt-1 flex items-end justify-between">
          <div>
            <div className="tabular-nums text-[20px] font-extrabold leading-none tracking-tight">
              {money(price)}
            </div>
            <div className={`mt-0.5 text-[10px] tabular-nums ${deltaColor}`}>
              <span className="mr-1">{deltaIcon}</span>
              {money(change)} {pct(changePct)}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-1 h-px w-full bg-white/10" />
    </header>
  );
}

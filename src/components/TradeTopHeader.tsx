
"use client";
import { ChevronLeft, Search, Heart } from "lucide-react";

type Props = {
  symbol: string;              // "VOO"
  name: string;                // "Vanguard S&P 500 ETF"
  exchange?: string;           // "NYSEARCA"
  price: number;               // 581.29
  change: number;              // -0.35
  changePct: number;           // -0.06 (percent)
  high: number; low: number;
  volume: number;              // 4590000
  showSearch?: boolean;        // optional UI on right
  showHeart?: boolean;         // optional UI on right
};

const fmtMoney = (n: number) => n.toFixed(2);
const fmtPct = (n: number) => `${n > 0 ? "+" : ""}${n.toFixed(2)}%`;
const fmtVol = (n: number) =>
  n >= 1e9 ? `${(n/1e9).toFixed(2)}B` :
  n >= 1e6 ? `${(n/1e6).toFixed(2)}M` :
  n >= 1e3 ? `${(n/1e3).toFixed(2)}K` : `${n}`;

export default function TradeTopHeader({
  symbol, name, exchange, price, change, changePct, high, low, volume,
  showSearch = false, showHeart = false,
}: Props) {
  const up = change > 0 || (change === 0 && changePct > 0);
  const dn = change < 0 || (change === 0 && changePct < 0);
  const deltaColor = up ? "text-emerald-400" : dn ? "text-red-400" : "text-white/70";
  const deltaIcon = up ? "▲" : dn ? "▼" : "◆";

  return (
    <header className="sticky top-0 z-40 bg-black">
      {/* Row 1 */}
      <div className="flex items-center px-3 pt-2">
        <button
          aria-label="Back"
          onClick={() => history.back()}
          className="mr-2 inline-flex h-8 w-8 items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="text-base font-semibold leading-5">{symbol}</div>
          <div className="truncate text-sm text-white/70">
            {name}{exchange ? ` ${exchange}` : ""}
          </div>
        </div>

        {/* Right corner (kept open; icons optional for later) */}
        {showSearch && (
          <button aria-label="Search" className="mx-2 inline-flex h-8 w-8 items-center justify-center">
            <Search className="h-5 w-5" />
          </button>
        )}
        {showHeart && (
          <button aria-label="Favorite" className="inline-flex h-8 w-8 items-center justify-center">
            <Heart className="h-5 w-5" />
          </button>
        )}
        {!showSearch && !showHeart && <div className="w-8" />}
      </div>

      {/* Row 2 */}
      <div className="flex items-end justify-between px-3 pb-2 pt-1">
        {/* Left: price + delta */}
        <div>
          <div className="tabular-nums text-5xl font-extrabold leading-[1.1]">
            {fmtMoney(price)}
          </div>
          <div className={`mt-1 text-sm tabular-nums ${deltaColor}`}>
            <span className="mr-1">{deltaIcon}</span>
            {change.toFixed(2)} {fmtPct(changePct)}
          </div>
        </div>

        {/* Right: stats */}
        <div className="text-right text-base">
          <div className="flex items-baseline gap-6">
            <span className="text-white/70">High</span>
            <span className="tabular-nums">{fmtMoney(high)}</span>
          </div>
          <div className="mt-1 flex items-baseline gap-6">
            <span className="text-white/70">Low</span>
            <span className="tabular-nums">{fmtMoney(low)}</span>
          </div>
          <div className="mt-1 flex items-baseline gap-6">
            <span className="text-white/70">Volume</span>
            <span className="tabular-nums">{fmtVol(volume)}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-white/10" />
    </header>
  );
}

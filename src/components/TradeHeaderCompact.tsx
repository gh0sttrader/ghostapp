
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
  const deltaClass = up ? "text-up" : dn ? "text-down" : "text-white/70";
  const deltaIcon = up ? "▲" : dn ? "▼" : "◆";

  return (
    <header className="sticky top-0 z-40 bg-black">
      {/* Row 1 */}
      <div className="flex items-center px-3 pt-3">
        <button
          aria-label="Back"
          onClick={() => history.back()}
          className="mr-[0.1875rem] inline-flex h-7 w-7 items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1 leading-tight">
          <div className="text-[16px] font-semibold">{symbol}</div>
          <div className="truncate text-[12px] text-white/70">
            {name}{exchange ? ` ${exchange}` : ""}
          </div>
        </div>

        {/* right corner reserved */}
        <div className="w-6" />
      </div>

      {/* Row 2 */}
      <div className="flex items-end justify-between px-3 pb-1">
        <div>
          <div className="tabular-nums text-[22px] font-extrabold leading-[1.05] tracking-tight">
            {money(price)}
          </div>
          <div className={`mt-0.5 text-[10px] tabular-nums ${deltaClass}`}>
            <span className="mr-1">{deltaIcon}</span>
            {money(change)} {pct(changePct)}
          </div>
        </div>

        <div className="text-right text-[12px] leading-5">
          {/* much tighter label/value spacing + fixed narrow value column */}
          <div className="grid grid-cols-[max-content_6.5ch] gap-x-1 gap-y-0.5 items-baseline">
            <span className="text-white/70">High</span>
            <span className="tabular-nums whitespace-nowrap text-right">{money(high)}</span>

            <span className="text-white/70">Low</span>
            <span className="tabular-nums whitespace-nowrap text-right">{money(low)}</span>

            <span className="text-white/70">Volume</span>
            <span className="tabular-nums whitespace-nowrap text-right">{vol(volume)}</span>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />
    </header>
  );
}

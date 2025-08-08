"use client";
import { useState } from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";

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
  const [open, setOpen] = useState(false);

  const up = change > 0 || (change === 0 && changePct > 0);
  const dn = change < 0 || (change === 0 && changePct < 0);
  const deltaClass = up ? "text-up" : dn ? "text-down" : "text-white/70";
  const deltaIcon = up ? "▲" : dn ? "▼" : "◆";

  // ---- dummy detailed stats (replace later with API) ----
  const details = {
    Open: 582.96,
    "Prev Close": 581.29,
    NAV: 581.06,
    Dividend: 6.93,
    "%Range": "0.51%",
    "52 Week High": 588.16,
    "52 Week Low": 441.44,
    Expenses: "0.03%",
    "Div Yield": "1.18%",
    "Inception Date": "09/07/2010",
    "Total Assets": "1.24T",
    Turnover: "--",
    "1Y Return (cum.)": "23.53%",
    "Ex-Date": "06/30/2025",
    Beta: "--",
    "Lot Size": 1,
    "Morningstar Rating": "★★★★★",
  };
  // -------------------------------------------------------

  return (
    <>
      <header className="sticky top-0 z-40 bg-black">
        {/* Row 1: back + title (unchanged) */}
        <div className="flex items-center px-3 pt-3">
          <button aria-label="Back" onClick={() => history.back()} className="mr-[0.1875rem] inline-flex h-7 w-7 items-center justify-center">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex-1 leading-tight">
            <div className="text-[16px] font-semibold">{symbol}</div>
            <div className="truncate text-[12px] text-white/70">{name}{exchange ? ` ${exchange}` : ""}</div>
          </div>

          {/* keep right corner free for future dropdown */}
          <div className="w-8" />
        </div>

        {/* Row 2: price left + stats right + chevron */}
        <div className="flex items-end justify-between px-3 pb-2 pt-1">
          <div>
            <div className="tabular-nums text-5xl font-extrabold leading-[1.1]">{price.toFixed(2)}</div>
            <div className={`mt-1 text-sm tabular-nums ${deltaClass}`}>
              <span className="mr-1">{deltaIcon}</span>
              {change.toFixed(2)} {`${changePct > 0 ? "+" : ""}${changePct.toFixed(2)}%`}
            </div>
          </div>

          <div className="flex items-center">
            {/* right stats grid */}
            <div className="text-right text-[12px] leading-4">
              <div className="grid grid-cols-[max-content_6.5ch] gap-x-1 gap-y-0 items-baseline">
                <span className="text-white/70">High</span>
                <span className="tabular-nums whitespace-nowrap text-right">{high.toFixed(2)}</span>

                <span className="text-white/70">Low</span>
                <span className="tabular-nums whitespace-nowrap text-right">{low.toFixed(2)}</span>

                <span className="text-white/70">Volume</span>
                <span className="tabular-nums whitespace-nowrap text-right">{vol(volume)}</span>
              </div>
            </div>

            {/* tiny chevron button */}
            <button
              aria-label={open ? "Hide details" : "Show details"}
              onClick={() => setOpen((v) => !v)}
              className="ml-2 inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/5 hover:bg-white/10"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />
      </header>

      {/* Sliding details panel */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out`}
        style={{ maxHeight: open ? 900 : 0, opacity: open ? 1 : 0 }}
      >
        <div className="px-3 py-3">
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[13px] md:grid-cols-3">
            {Object.entries(details).map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4">
                <span className="text-white/70">{k}</span>
                <span className="tabular-nums">{typeof v === "number" ? v.toString() : v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-white/10" />
      </div>
    </>
  );
}


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useCondensed } from "@/lib/useCondensed";
import SearchButton from "@/components/common/SearchButton";

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
  sentinelId?: string;
};

const vol = (n: number) =>
  n >= 1e9 ? `${(n / 1e9).toFixed(2)}B` :
  n >= 1e6 ? `${(n / 1e6).toFixed(2)}M` :
  n >= 1e3 ? `${(n / 1e3).toFixed(2)}K` : `${n}`;

export default function TradeHeaderCompact({
  symbol, name, exchange, price, change, changePct, high, low, volume, sentinelId = "trade-header-sentinel"
}: Props) {
  const [open, setOpen] = useState(false);
  const condensed = useCondensed(sentinelId);
  const router = useRouter();

  const handleBack = () => {
    const prev = sessionStorage.getItem("prevPath");
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else if (prev) {
      router.push(prev);
    } else {
      router.push("/list");
    }
  };


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
    Inception: "09/07/2010",
    "Total Assets": "1.24T",
    Turnover: "--",
    "1Y Return (cum.)": "23.53%",
    "Ex-Date": "06/30/2025",
    Beta: "--",
    "Lot Size": 1,
  };
  // -------------------------------------------------------

  return (
    <>
      <header className="sticky top-0 z-40 bg-black">
        <div className="relative">
          {/* Row 1: back + title */}
          <div className="flex items-center px-3 pt-3">
            <button aria-label="Back" onClick={handleBack} className="mr-[0.1875rem] inline-flex h-7 w-7 items-center justify-center">
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1 leading-tight">
              <div className="text-[16px] font-semibold">{symbol}</div>
              <div className="truncate text-[12px] text-white/70">{name}{exchange ? ` ${exchange}` : ""}</div>
            </div>
          </div>
          
          <SearchButton
            className="
              absolute
              top-[max(env(safe-area-inset-top),0.1rem)]
              right-[max(env(safe-area-inset-right),0.5rem)]
              z-30
            "
            href="/search"
          />
        </div>
        
        <div
          className={[
            "overflow-hidden transition-[max-height,opacity,transform] duration-200",
            condensed ? "max-h-0 opacity-0 -translate-y-1" : "max-h-28 opacity-100 translate-y-0",
          ].join(" ")}
        >
            <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_auto_auto] items-stretch px-3 pb-2 pt-1">
              {/* LEFT: price + delta must fit between top(row1) and bottom(row3) */}
              <div className="row-span-3 flex flex-col justify-between self-stretch">
                <div className="tabular-nums font-extrabold leading-none text-[32px]">
                  {price.toFixed(2)}
                </div>
                <div className={`tabular-nums ${deltaClass} text-[12px]`}>
                  <span className="mr-1 align-middle">{deltaIcon}</span>
                  {change.toFixed(2)} {`${changePct > 0 ? "+" : ""}${changePct.toFixed(2)}%`}
                </div>
              </div>

              {/* RIGHT: stats grid + absolute chevron */}
              <div className="relative row-span-3 text-right text-[12px] leading-4 pr-9">
                <div className="grid grid-cols-[max-content_6.5ch] gap-x-2 gap-y-0 items-baseline">
                  <span className="text-white/70">High</span>
                  <span className="tabular-nums whitespace-nowrap text-right">{high.toFixed(2)}</span>
                  <span className="text-white/70">Low</span>
                  <span className="tabular-nums whitespace-nowrap text-right">{low.toFixed(2)}</span>
                  <span className="text-white/70">Volume</span>
                  <span className="tabular-nums whitespace-nowrap text-right">{vol(volume)}</span>
                </div>
                <button
                  aria-label={open ? "Hide details" : "Show details"}
                  onClick={() => setOpen(v => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-5 w-5 items-center justify-center z-10"
                >
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          <div className="h-px w-full bg-white/10" />
        </div>
      </header>

      {/* Sliding details panel */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out`}
        style={{ maxHeight: open ? 900 : 0, opacity: open ? 1 : 0 }}
      >
        <div className="px-3 py-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-1 text-[12px]">
            {Object.entries(details)
              .filter(([k]) => k !== "Morningstar Rating")
              .map(([k, v]) => (
              <div
                key={k}
                className="flex items-center justify-between gap-3 leading-4 py-0.5"
              >
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

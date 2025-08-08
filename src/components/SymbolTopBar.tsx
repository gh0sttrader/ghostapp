
"use client";
import { ChevronLeft } from "lucide-react";

type Props = {
  symbol: string;
  name: string;
  price: number | string;
  changePct: number | string; // e.g. 1.42 for +1.42%
};

export default function SymbolTopBar({ symbol, name, price, changePct }: Props) {
  const p = Number(price);
  const pct = Number(changePct);
  const pctCls = pct > 0 ? "text-emerald-400" : pct < 0 ? "text-red-400" : "text-white/70";

  return (
    <div className="sticky top-0 z-40 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="mx-auto flex h-12 items-center gap-2 px-3">
        <button
          aria-label="Back"
          onClick={() => history.back()}
          className="inline-flex h-8 w-8 items-center justify-center"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-2 text-sm">
          <span className="font-semibold">{symbol}</span>
          <span className="text-white/50">·</span>
          <span className="truncate">{name}</span>
          <span className="text-white/80 tabular-nums">${p.toFixed(2)}</span>
          <span className={`tabular-nums ${pctCls}`}>
            {pct > 0 ? "+" : ""}{pct.toFixed(2)}%
          </span>
        </div>

        {/* Right corner reserved for future dropdown */}
        <div className="w-8" />
      </div>
    </div>
  );
}

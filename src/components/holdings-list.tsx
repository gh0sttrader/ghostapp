// components/HoldingsList.tsx
"use client";
import React, { useMemo } from "react";

type Position = {
  symbol: string;
  marketValue: number;
};

function currency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(n);
}

const HoldingsTable: React.FC<{ holdings: Position[] }> = ({ holdings }) => {
  const rows = useMemo(() => {
    const total = holdings.reduce((acc, h) => acc + (h.marketValue ?? 0), 0) || 1;
    return holdings
      .sort((a,b) => (b.marketValue ?? 0) - (a.marketValue ?? 0))
      .map(h => {
        const mv = h.marketValue ?? 0;
        const pct = mv / total;
        return { symbol: h.symbol, marketValue: mv, allocationPct: pct };
      });
  }, [holdings]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="grid grid-cols-3 items-end px-4 pb-2 pt-3 text-zinc-400 text-[13px] tracking-wide">
        <div>Symbol</div>
        <div className="text-right">Market value</div>
        <div className="text-right">Allocation</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-zinc-800/80">
        {rows.map(({symbol, marketValue, allocationPct}) => {
          const width = Math.max(0, Math.min(100, allocationPct * 100));
          return (
            <div key={symbol} className="grid grid-cols-3 gap-x-3 px-4 py-3">
              {/* Symbol */}
              <div className="flex items-center">
                <span className="font-medium text-[16px] text-white">{symbol}</span>
              </div>

              {/* Market value */}
              <div className="flex items-center justify-end">
                <span className="text-white text-[16px] tabular-nums">{currency(marketValue)}</span>
              </div>

              {/* Allocation */}
              <div className="flex flex-col items-end justify-center">
                <span className="text-[13px] text-zinc-300 tabular-nums">
                  {width.toFixed(2)}%
                </span>
                <div className="mt-1 w-[120px] h-1.5 rounded-full bg-zinc-800/70 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${width}%`, backgroundColor: "#04cf7a" }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export function HoldingsList() {
  const positions: Position[] = [
    { symbol: "IYW", marketValue: 3125.18 },
    { symbol: "ARKB", marketValue: 987.42 },
    { symbol: "IBIT", marketValue: 756.31 },
    { symbol: "AAPL", marketValue: 6313.09 },
  ];

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[18px] font-semibold text-white">Holdings</h2>
      </div>
      <HoldingsTable holdings={positions} />
    </section>
  );
}

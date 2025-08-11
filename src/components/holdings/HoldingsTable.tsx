// components/holdings/HoldingsTable.tsx
import React, { memo, useMemo } from "react";

type Holding = {
  symbol: string;             // e.g., "AAPL"
  marketValue?: number;       // total $ value you own for this symbol
  shares?: number;            // if marketValue missing, compute from shares * price
  price?: number;             // used only as fallback with shares
};

type Props = {
  holdings: Holding[];
  className?: string;
};

const fmtUSD = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });

const HoldingsTable: React.FC<Props> = ({ holdings, className }) => {
  const rows = useMemo(() => {
    return holdings.map(h => {
      const mv = typeof h.marketValue === "number"
        ? h.marketValue
        : ( (h.shares ?? 0) * (h.price ?? 0) );
      return { ...h, marketValue: mv };
    });
  }, [holdings]);

  const total = useMemo(() => rows.reduce((acc, h) => acc + (h.marketValue ?? 0), 0), [rows]) || 1;

  return (
    <div className={className}>
      {/* Header */}
      <div className="grid grid-cols-12 gap-x-6 items-center px-3 pt-3 pb-2 text-[12px] text-zinc-400">
        <div className="col-span-4">Symbol</div>
        <div className="col-span-4 text-center">Market value</div>
        <div className="col-span-4 text-right">Allocation</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/10">
        {rows.map((r, i) => {
          const marketValue = r.marketValue ?? 0;
          const pct = total > 0 ? (marketValue / total) * 100 : 0;
          return (
            <div key={`${r.symbol}-${i}`} className="grid grid-cols-12 gap-x-6 items-center px-3 py-3 min-h-[56px]">
              {/* Symbol */}
              <div className="col-span-4 text-[14px]">{r.symbol}</div>

              {/* Market value — centered & vertically aligned */}
              <div className="col-span-4 text-center text-[14px] tabular-nums flex items-center justify-center">
                {fmtUSD(marketValue)}
              </div>
              
              {/* Allocation */}
              <div className="col-span-4 flex items-center justify-end">
                <div className="relative">
                  {/* % label above the bar, centered; this does NOT push the bar down */}
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[13px] tabular-nums text-zinc-400">
                    {pct.toFixed(2)}%
                  </span>
                  {/* bar is vertically centered in the row, matching the MV text alignment */}
                  <div className="w-28 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.min(100, Math.max(0, pct))}%`, backgroundColor: "#04cf7a" }}
                    />
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(HoldingsTable);
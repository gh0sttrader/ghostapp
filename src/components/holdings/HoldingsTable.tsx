// components/holdings/HoldingsTable.tsx
import React, { memo, useMemo } from "react";

type Holding = {
  symbol: string;
  marketValue?: number;
  shares?: number;
  price?: number;
};

type Props = {
  holdings: Holding[];
  className?: string;
};

const fmtUSD = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });

const HoldingsTable: React.FC<Props> = ({ holdings, className }) => {
  const rows = useMemo(() => {
    const withMV = holdings.map(h => ({
      ...h,
      marketValue: h.marketValue ?? ((h.shares ?? 0) * (h.price ?? 0)),
    }));
    const total = withMV.reduce((acc, h) => acc + h.marketValue, 0) || 1;
    return withMV
      .map(h => ({
        symbol: h.symbol,
        marketValue: h.marketValue,
        allocationPct: h.marketValue / total,
      }))
      .sort((a, b) => b.marketValue - a.marketValue);
  }, [holdings]);

  return (
    <div className={className}>
      {/* Header */}
      <div className="grid grid-cols-[72px_1fr_auto] items-center gap-x-5 px-4 pb-2 text-xs text-zinc-400">
        <div className="text-left">Symbol</div>
        <div className="text-center">Market value</div>
        <div className="text-right w-[120px]">Allocation</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/10">
        {rows.map(({ symbol, marketValue, allocationPct }) => {
          const pct = allocationPct * 100;
          return (
            <div key={symbol} className="grid grid-cols-[72px_1fr_auto] items-center gap-x-5 px-4 min-h-[56px]">
              {/* Symbol */}
              <div className="text-sm font-medium">{symbol}</div>

              {/* Market value */}
              <div className="text-center text-sm tabular-nums">
                {fmtUSD(marketValue)}
              </div>
              
              {/* Allocation */}
              <div className="flex flex-col items-end justify-center w-[120px]">
                <span className="text-xs text-zinc-300 tabular-nums mb-1.5">
                  {pct.toFixed(2)}%
                </span>
                <div className="w-full h-1.5 rounded-full bg-zinc-800/70 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: "#04cf7a" }}
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

export default memo(HoldingsTable);
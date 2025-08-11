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
    const withMV = holdings.map(h => {
      const mv = typeof h.marketValue === "number"
        ? h.marketValue
        : ( (h.shares ?? 0) * (h.price ?? 0) );
      return { ...h, marketValue: mv };
    });

    const total = withMV.reduce((acc, h) => acc + (h.marketValue ?? 0), 0) || 1;

    return withMV
      .sort((a,b) => (b.marketValue ?? 0) - (a.marketValue ?? 0))
      .map(h => {
        const mv = h.marketValue ?? 0;
        const pct = mv / total;
        return { symbol: h.symbol, marketValue: mv, allocationPct: pct };
      });
  }, [holdings]);

  const total = useMemo(() => rows.reduce((acc, h) => acc + (h.marketValue ?? 0), 0), [rows]) || 1;

  return (
    <div className={className}>
      {/* Header */}
      <div className="grid grid-cols-[1fr_1fr_1.5fr] gap-x-4 items-center px-4 pb-2 pt-3 text-xs text-zinc-400">
        <div className="col-span-1">Symbol</div>
        <div className="col-span-1 text-center">Market value</div>
        <div className="col-span-1 text-right">Allocation</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/10">
        {rows.map(({symbol, marketValue, allocationPct}) => {
          const width = Math.max(0, Math.min(100, allocationPct * 100));
          return (
            <div key={symbol} className="grid grid-cols-[1fr_1fr_1.5fr] gap-x-4 items-center px-4 py-3 min-h-[56px]">
              {/* Symbol */}
              <div className="col-span-1 text-sm font-medium">{symbol}</div>

              {/* Market value */}
              <div className="col-span-1 text-center text-sm tabular-nums flex items-center justify-center">
                {fmtUSD(marketValue)}
              </div>
              
              {/* Allocation */}
              <div className="col-span-1">
                <div className="flex flex-col items-end" >
                    <span className="text-xs text-zinc-300 tabular-nums mb-1.5">
                        {width.toFixed(2)}%
                    </span>
                    <div className="w-full max-w-[140px] h-1.5 rounded-full bg-zinc-800/70 overflow-hidden">
                        <div
                            className="h-full rounded-full"
                            style={{ width: `${width}%`, backgroundColor: "#04cf7a" }}
                            aria-hidden="true"
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
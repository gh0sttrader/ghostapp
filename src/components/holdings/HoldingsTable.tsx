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

    return withMV
      .sort((a,b) => (b.marketValue ?? 0) - (a.marketValue ?? 0));
  }, [holdings]);

  const total = useMemo(() => rows.reduce((acc, h) => acc + (h.marketValue ?? 0), 0), [rows]) || 1;

  return (
    <div className={["rounded-2xl border border-white/10 bg-black", className].join(" ")}>
      {/* Header */}
      <div className="grid grid-cols-12 gap-x-6 items-center px-3 pt-3 pb-2 text-[12px] text-zinc-400">
        <div className="col-span-4">Symbol</div>
        <div className="col-span-4 text-right">Market value</div>
        <div className="col-span-4 text-right">Allocation</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/10">
        {rows.map((r, i) => {
          const mv = r.marketValue ?? 0;
          const pct = total > 0 ? (mv / total) * 100 : 0;

          return (
            <div key={`${r.symbol}-${i}`} className="grid grid-cols-12 gap-x-6 items-center px-3 py-2.5">
              {/* Symbol */}
              <div className="col-span-4 text-[14px] font-medium tracking-wide">
                {r.symbol}
              </div>

              {/* Market value */}
              <div className="col-span-4 text-right text-[14px] tabular-nums pr-6 md:pr-8">
                {fmtUSD(mv)}
              </div>

              {/* Allocation */}
              <div className="col-span-4 pl-2 md:pl-4">
                <div className="flex items-center justify-end gap-3 md:gap-4">
                  <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, Math.max(0, pct))}%`,
                        backgroundColor: "#04cf7a", // brand green
                      }}
                      aria-hidden
                    />
                  </div>
                  <span className="w-12 text-right text-[14px] tabular-nums">
                    {pct.toFixed(2)}%
                  </span>
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

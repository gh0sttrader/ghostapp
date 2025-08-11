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
    <div className={className}>
      {/* Header */}
      <div className="grid grid-cols-[1fr_1fr_1.25fr] items-center gap-x-10 px-3 pt-3 pb-2 text-[12px] text-zinc-400">
        <div>Symbol</div>
        <div className="text-center">Market value</div>
        <div className="text-right">Allocation</div>
      </div>

      {/* Rows */}
      <ul className="divide-y divide-white/10">
        {rows.map(({symbol, marketValue}) => {
          const pct = total > 0 ? (marketValue / total) * 100 : 0;
          return (
            <li
              key={symbol}
              className="grid grid-cols-[1fr_1fr_1.25fr] items-center gap-x-10 px-3 py-4 min-h-[56px]"
            >
              {/* Symbol */}
              <div className="text-[14px]">{symbol}</div>

              {/* Market value — centered & vertically aligned */}
              <div className="text-center text-[14px] tabular-nums flex items-center justify-center">
                {fmtUSD(marketValue)}
              </div>

              {/* Allocation — evenly spaced: [%]  |  [bar] */}
              <div className="flex items-center justify-end gap-4">
                {/* Fixed width keeps all % signs aligned across rows */}
                <span className="w-16 text-right text-[13px] tabular-nums leading-none">
                  {pct.toFixed(2)}%
                </span>

                {/* Bar */}
                <div className="relative h-2 w-40 sm:w-44 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(0, pct))}%`, backgroundColor: '#04cf7a' }}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default memo(HoldingsTable);

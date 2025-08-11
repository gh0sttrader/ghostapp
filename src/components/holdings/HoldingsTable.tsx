// src/components/holdings/HoldingsTable.tsx
import React from "react";
import AllocationBar from "./AllocationBar";

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
    const rows = React.useMemo(() => {
        const withMV = holdings.map(h => ({
            ...h,
            marketValue: h.marketValue ?? ((h.shares ?? 0) * (h.price ?? 0)),
        }));
        const total = withMV.reduce((acc, h) => acc + h.marketValue, 0) || 1;
        return withMV
            .map(h => ({
                symbol: h.symbol,
                marketValue: h.marketValue,
                allocationPct: (h.marketValue / total) * 100,
            }))
            .sort((a, b) => b.marketValue - a.marketValue);
    }, [holdings]);


  return (
    <div className={className}>
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-6 px-4 pb-2 text-xs text-zinc-400">
            <div className="text-left">Symbol</div>
            <div className="text-center w-28">Market value</div>
            <div className="text-right w-40">Allocation</div>
        </div>

      <div className="divide-y divide-white/10">
        {rows.map(({ symbol, marketValue, allocationPct }) => {
          return (
            <div key={symbol} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-6 px-4 min-h-[56px]">
              <div className="text-sm font-medium">{symbol}</div>

              <div className="text-center text-sm tabular-nums w-28">
                {fmtUSD(marketValue)}
              </div>
              
              <div className="w-40">
                <AllocationBar value={allocationPct} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(HoldingsTable);
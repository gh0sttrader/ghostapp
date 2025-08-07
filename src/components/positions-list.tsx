"use client";

import { cn } from "@/lib/utils";

const taxable = [
  { ticker: 'IYW', name: 'iShares U.S. Technology ETF', price: 181.76, change: 1.96, percent: 1.09 },
  { ticker: 'ARKB', name: 'ARK 21Shares Bitcoin ETF', price: 38.32, change: 0.53, percent: 1.40 },
  { ticker: 'IBIT', name: 'iShares Bitcoin Trust', price: 65.51, change: 0.96, percent: 1.49 },
];

const roth = [
  { ticker: 'VOO', name: 'Vanguard S&P 500 ETF', price: 581.64, change: 4.29, percent: 0.74 },
  { ticker: 'SOXX', name: 'iShares Semiconductor ETF', price: 236.93, change: -1.80, percent: -0.75 },
];

type Position = {
  ticker: string;
  name: string;
  price: number;
  change: number;
  percent: number;
};

function PositionRow({ item }: { item: Position }) {
  const isUp = item.change >= 0;
  return (
    <div className="flex flex-row items-center py-2 border-b border-neutral-800">
      <div className="flex-1">
        <p className="text-white text-base font-semibold">{item.ticker}</p>
        <p className="text-neutral-400 text-xs">{item.name}</p>
      </div>
      <div className="items-end text-right">
        <p className="text-white text-base font-semibold">{item.price.toFixed(2)}</p>
        <p className={cn("text-xs", isUp ? "text-accent" : "text-destructive")}>
          {isUp ? "+" : ""}{item.change.toFixed(2)} ({isUp ? "+" : ""}{item.percent.toFixed(2)}%)
        </p>
      </div>
    </div>
  );
}

export function PositionsList({ account }: { account: "All" | "Taxable" | "Roth" }) {
  if (account === 'All') {
    return (
      <div>
        <h3 className="text-neutral-400 text-xs font-semibold mt-4 mb-1">Taxable</h3>
        {taxable.map((item, idx) => (
          <PositionRow item={item} key={`taxable-${idx}`} />
        ))}
        <h3 className="text-neutral-400 text-xs font-semibold mt-4 mb-1">Roth</h3>
        {roth.map((item, idx) => (
          <PositionRow item={item} key={`roth-${idx}`} />
        ))}
      </div>
    );
  }

  const data = account === "Taxable" ? taxable : roth;
  return (
    <div>
      {data.map((item, idx) => (
        <PositionRow item={item} key={idx} />
      ))}
    </div>
  );
}

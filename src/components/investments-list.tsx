
"use client";

import { cn } from "@/lib/utils";

const investments = [
  { ticker: 'IYW', name: 'iShares U.S. Technology ETF', price: 181.76, change: 1.96, percent: 1.09 },
  { ticker: 'ARKB', name: 'ARK 21Shares Bitcoin ETF', price: 38.32, change: -0.53, percent: -1.40 },
  { ticker: 'IBIT', name: 'iShares Bitcoin Trust', price: 65.51, change: 0.96, percent: 1.49 },
];

type Investment = {
  ticker: string;
  name: string;
  price: number;
  change: number;
  percent: number;
};

function InvestmentRow({ item }: { item: Investment }) {
  const isUp = item.change >= 0;
  return (
    <div className="flex flex-row items-center py-2">
      <div className="flex-1">
        <p className="text-white text-sm font-semibold">{item.ticker}</p>
        <p className="text-neutral-400 text-xs">{item.name}</p>
      </div>
      <div className="items-end text-right">
        <p className="text-white text-sm font-semibold">{item.price.toFixed(2)}</p>
        <p className={cn("text-xs", isUp ? "text-accent" : "text-destructive")}>
          {isUp ? "+" : ""}{item.percent.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

export function InvestmentsList() {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-bold text-white mb-2">Investments</h2>
      <div>
        {investments.map((item, idx) => (
          <InvestmentRow item={item} key={idx} />
        ))}
      </div>
    </section>
  );
}

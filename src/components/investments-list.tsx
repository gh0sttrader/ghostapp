
"use client";

import { cn } from "@/lib/utils";

const investments = [
  { ticker: 'IYW', name: 'iShares U.S. Technology ETF', price: 181.76 },
  { ticker: 'ARKB', name: 'ARK 21Shares Bitcoin ETF', price: 38.32 },
  { ticker: 'IBIT', name: 'iShares Bitcoin Trust', price: 65.51 },
];

type Investment = {
  ticker: string;
  name: string;
  price: number;
};

function InvestmentRow({ item }: { item: Investment }) {
  return (
    <div className="flex flex-row items-center py-2 border-b border-neutral-800">
      <div className="flex-1">
        <p className="text-white text-sm font-semibold">{item.ticker}</p>
        <p className="text-neutral-400 text-xs">{item.name}</p>
      </div>
      <div className="items-end text-right">
        <p className="text-white text-sm font-semibold">{item.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export function InvestmentsList() {
  return (
    <section className="mt-6">
      <h2 className="text-sm font-bold text-white mb-2">Investments</h2>
      <div>
        {investments.map((item, idx) => (
          <InvestmentRow item={item} key={idx} />
        ))}
      </div>
    </section>
  );
}

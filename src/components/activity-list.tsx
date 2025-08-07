
"use client";

import { cn } from "@/lib/utils";

const activity = [
  { type: 'Buy', symbol: 'IYW', amount: -200.00, date: '08/06/25' },
  { type: 'Sell', symbol: 'ARKB', amount: 150.50, date: '08/05/25' },
  { type: 'Dividend', symbol: 'IBIT', amount: 2.16, date: '08/01/25' },
  { type: 'Deposit', symbol: 'Cash', amount: 1000.00, date: '07/31/25' },
];

type Activity = {
  type: string;
  symbol: string;
  amount: number;
  date: string;
};

function ActivityRow({ item }: { item: Activity }) {
  const isOutflow = item.amount < 0;
  const amountColor = isOutflow ? "text-destructive" : "text-accent";

  return (
    <div className="flex flex-row items-center py-2">
      <div className="flex-1">
        <div className="flex flex-row items-center">
          <p className="text-white text-sm font-bold mr-2">{item.type}</p>
          <p className="text-neutral-400 text-xs">{item.symbol}</p>
        </div>
        <p className="text-neutral-400 text-xs mt-1">{item.date}</p>
      </div>
      <div className="items-end text-right">
        <p className={cn("text-sm font-bold", amountColor)}>
          {isOutflow ? "" : "+"}${item.amount.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export function ActivityList() {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-bold text-white mb-2">Activity</h2>
      <div>
        {activity.map((item, idx) => (
          <ActivityRow item={item} key={idx} />
        ))}
      </div>
    </section>
  );
}

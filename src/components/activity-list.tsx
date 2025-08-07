
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const activityData = [
  { type: 'Buy', symbol: 'IYW', amount: -200.00, date: '08/06/25' },
  { type: 'Sell', symbol: 'ARKB', amount: 150.50, date: '08/05/25' },
  { type: 'Dividend', symbol: 'IBIT', amount: 2.16, date: '08/01/25' },
  { type: 'Deposit', symbol: 'Cash', amount: 1000.00, date: '07/31/25' },
];

const filterOptions = ["All", "Buy", "Sell", "Deposit", "Dividend"];

type Activity = {
  type: string;
  symbol: string;
  amount: number;
  date: string;
};

function ActivityRow({ item }: { item: Activity }) {
  const isOutflow = item.amount < 0;
  // In the prompt, positive amounts are green (accent) and negative are red (destructive)
  // But sell and withdrawal are positive amounts but should probably not be green.
  // For now, sticking to the prompt's logic.
  const amountColor = item.amount > 0 ? "text-accent" : "text-destructive";

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
          {isOutflow ? "" : "+"}${Math.abs(item.amount).toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export function ActivityList() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredActivity = selectedFilter === "All"
    ? activityData
    : activityData.filter(item => item.type === selectedFilter);

  return (
    <section className="mt-8">
      <h2 className="text-sm font-bold text-white mb-2">Activity</h2>

      <div className="flex w-full items-center justify-start gap-4 mb-2 -ml-3" role="tablist">
        {filterOptions.map((filter) => (
          <Button
            key={filter}
            variant="ghost"
            role="tab"
            aria-selected={selectedFilter === filter}
            size="sm"
            onClick={() => setSelectedFilter(filter)}
            className={cn(
              "rounded-none px-3 py-1 text-xs text-white transition-colors h-auto underline-offset-4",
              selectedFilter === filter ? 'font-bold underline' : 'font-normal'
            )}
            data-state={selectedFilter === filter ? 'active' : 'inactive'}
          >
            {filter}
          </Button>
        ))}
      </div>

      <div>
        {filteredActivity.map((item, idx) => (
          <ActivityRow item={item} key={idx} />
        ))}
      </div>
    </section>
  );
}

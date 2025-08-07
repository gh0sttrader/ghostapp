"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

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
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
           <Button variant="ghost" className="flex items-center gap-1 p-0 h-auto mb-2 focus-visible:ring-0 focus-visible:ring-offset-0">
             <h2 className="text-sm font-bold text-white">Activity</h2>
             <ChevronDown className="h-4 w-4 text-neutral-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-neutral-900 border-neutral-700 text-white w-40">
          {filterOptions.map((filter) => (
            <DropdownMenuItem
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={cn("focus:bg-neutral-800 focus:text-white", selectedFilter === filter ? 'font-bold' : 'font-normal')}
            >
              {filter}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div>
        {filteredActivity.map((item, idx) => (
          <ActivityRow item={item} key={idx} />
        ))}
      </div>
    </section>
  );
}

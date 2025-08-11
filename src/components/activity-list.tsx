
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
  const amountColor = item.amount > 0 ? "text-up" : "text-down";

  return (
    <div className="flex items-center py-2 text-sm text-white">
      {/* Date */}
      <div className="w-1/4">{item.date}</div>
      {/* Symbol */}
      <div className="w-1/4 font-semibold">{item.symbol}</div>
      {/* Action */}
      <div className="w-1/4">{item.type}</div>
      {/* Value */}
      <div className={cn("w-1/4 text-right font-semibold", amountColor)}>
        {isOutflow ? "" : "+"}${Math.abs(item.amount).toFixed(2)}
      </div>
      {/* Spacer to ensure alignment */}
      <div className="w-1/4">
        
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
        <DropdownMenuContent className="bg-transparent backdrop-blur-xl border-neutral-700/50 text-white w-40">
          {filterOptions.map((filter) => (
            <DropdownMenuItem
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={cn("focus:bg-white/10 focus:text-white", selectedFilter === filter ? 'font-bold' : 'font-normal')}
            >
              {filter}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Activity Header Row */}
      <div className="flex items-center text-xs font-medium text-neutral-400 uppercase mb-2">
        <div className="w-1/4">Date</div>
        <div className="w-1/4">Symbol</div>
        <div className="w-1/4">Action</div>
        <div className="w-1/4 text-right">Value</div>
        {/* Spacer to ensure alignment */}
        <div className="w-1/4"></div>
      </div>

      <div>
        {filteredActivity.map((item, idx) => (
          <ActivityRow item={item} key={idx} />
        ))}
      </div>
    </section>
  );
}

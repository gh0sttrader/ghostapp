"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const investmentsData = [
  { ticker: 'IYW', name: 'iShares U.S. Technology ETF', price: 181.76, change: 1.96, percent: 1.09, type: 'ETF' },
  { ticker: 'ARKB', name: 'ARK 21Shares Bitcoin ETF', price: 38.32, change: -0.53, percent: -1.40, type: 'ETF' },
  { ticker: 'IBIT', name: 'iShares Bitcoin Trust', price: 65.51, change: 0.96, percent: 1.49, type: 'Crypto' },
  { ticker: 'AAPL', name: 'Apple Inc.', price: 214.29, change: 2.50, percent: 1.18, type: 'Stock' },
];

const filterOptions = ["All", "Stocks", "ETFs", "Options", "Crypto"];

type Investment = {
  ticker: string;
  name: string;
  price: number;
  change: number;
  percent: number;
  type: string;
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
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredInvestments = selectedFilter === "All"
    ? investmentsData
    : investmentsData.filter(item => item.type === selectedFilter.slice(0, -1)); // "Stocks" -> "Stock"

  return (
    <section className="mt-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1 p-0 h-auto mb-2 focus-visible:ring-0 focus-visible:ring-offset-0">
             <h2 className="text-sm font-bold text-white">{selectedFilter === 'All' ? 'Investments' : `Investments · ${selectedFilter}`}</h2>
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
        {filteredInvestments.map((item, idx) => (
          <InvestmentRow item={item} key={idx} />
        ))}
      </div>
    </section>
  );
}

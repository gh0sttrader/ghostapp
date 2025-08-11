
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import styles from './holdings/holdings-table.module.css';

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
             <h2 className={styles.header}>Activity</h2>
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

      <div className={styles.tableWrapper} style={{ padding: 0 }}>
        <table className={styles.holdingsTable}>
          <thead>
            <tr>
              <th className={styles.symbolHeader}>Date</th>
              <th className={styles.symbolHeader}>Symbol</th>
              <th className={styles.symbolHeader}>Action</th>
              <th className={cn(styles.marketHeader, "text-right")}>Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivity.map((item, idx) => {
              const isOutflow = item.amount < 0;
              const amountColor = item.amount > 0 ? "text-up" : "";

              return (
                <tr key={idx} className={styles.row}>
                  <td className={styles.symbolCell}>{item.date}</td>
                  <td className={styles.symbolCell}>{item.symbol}</td>
                  <td className={styles.symbolCell}>{item.type}</td>
                  <td className={cn(styles.valueCell, amountColor, "text-right")}>
                    {isOutflow ? "-" : "+"}${Math.abs(item.amount).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}


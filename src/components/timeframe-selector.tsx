"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const timeframes = ['1D', '1W', '1M', '3M', 'YTD', '1Y', '5Y', 'MAX'];

export function TimeframeSelector() {
  const [activeTimeframe, setActiveTimeframe] = useState('5Y');

  return (
    <div className="flex w-full items-center justify-between" role="tablist">
      {timeframes.map((timeframe) => (
        <Button
          key={timeframe}
          variant="ghost"
          role="tab"
          aria-selected={activeTimeframe === timeframe}
          size="sm"
          onClick={() => setActiveTimeframe(timeframe)}
          className={cn(
            "rounded-full px-3 py-1 text-xs text-white transition-colors",
            activeTimeframe === timeframe ? 'font-bold' : 'font-normal'
          )}
          data-state={activeTimeframe === timeframe ? 'active' : 'inactive'}
        >
          {timeframe}
        </Button>
      ))}
    </div>
  );
}

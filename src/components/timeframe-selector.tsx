"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

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
          className="rounded-full px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:hover:bg-primary/90"
          data-state={activeTimeframe === timeframe ? 'active' : 'inactive'}
        >
          {timeframe}
        </Button>
      ))}
    </div>
  );
}

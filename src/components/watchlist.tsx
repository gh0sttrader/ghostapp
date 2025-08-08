
"use client";

import { cn } from "@/lib/utils";
import { useWatchlistSymbols } from "@/hooks/use-watchlist-symbols";

// This is now placeholder data for stocks that aren't in a watchlist yet.
// In a real app, you'd fetch this from a market data API.
const allStockData: Record<string, any> = {
  RGTI: { name: 'Rigetti Computing', price: 1.23, change: -0.09, percent: -6.82 },
  NVDA: { name: 'NVIDIA', price: 120.11, change: -3.15, percent: -2.55 },
  TQQQ: { name: 'ProShares UltraPro QQQ', price: 46.30, change: -0.91, percent: -1.93 },
  QQQ: { name: 'Invesco QQQ Trust', price: 445.20, change: 6.81, percent: 1.55 },
  VTI: { name: 'Vanguard Total Stock Market', price: 267.04, change: 2.03, percent: 0.77 },
  SCHD: { name: 'Schwab US Dividend Equity', price: 80.33, change: 0.52, percent: 0.65 },
  TSLA: { name: 'Tesla Inc.', price: 801.16, change: 8.92, percent: 1.13 },
  GOOG: { name: 'Alphabet Inc.', price: 137.52, change: 1.19, percent: 0.87 },
  VYM: { name: 'Vanguard High Dividend', price: 112.19, change: 0.22, percent: 0.20 },
  CRM: { name: 'Salesforce Inc.', price: 199.85, change: 3.15, percent: 1.60 },
  ORCL: { name: 'Oracle Corp.', price: 110.60, change: 1.25, percent: 1.14 },
  'BTC-USD': { name: 'Bitcoin', price: 28750.00, change: 750, percent: 2.68 },
  'ETH-USD': { name: 'Ethereum', price: 1650.20, change: -12.4, percent: -0.75 },
  BND: { name: 'Vanguard Total Bond', price: 75.31, change: 0.07, percent: 0.09 },
  AAPL: { name: "Apple Inc.", price: 218.75, change: 2.50, percent: 1.18 },
  VOO: { name: "Vanguard S&P 500 ETF", price: 504.23, change: 4.29, percent: 0.74 },
};


type Position = {
  ticker: string;
  name: string;
  price: number;
  change: number;
  percent: number;
};

function PositionRow({ item }: { item: Position }) {
  const isUp = item.change >= 0;
  return (
    <div className="flex flex-row items-center py-2 border-b border-neutral-800">
      <div className="flex-1">
        <p className="text-white text-base font-semibold">{item.ticker}</p>
        <p className="text-neutral-400 text-xs">{item.name}</p>
      </div>
      <div className="items-end text-right">
        <p className="text-white text-base font-semibold">{item.price.toFixed(2)}</p>
        <p className={cn("text-xs", isUp ? "text-accent" : "text-destructive")}>
          {isUp ? "+" : ""}{item.change.toFixed(2)} ({isUp ? "+" : ""}{item.percent.toFixed(2)}%)
        </p>
      </div>
    </div>
  );
}

export function Watchlist({ userId, watchlistId }: { userId: string, watchlistId: string }) {
  const symbols = useWatchlistSymbols(userId, watchlistId);

  if (!watchlistId) {
    return <div className="text-center text-muted-foreground py-20"><p>Please select a watchlist.</p></div>;
  }
  
  if (symbols.length === 0) {
    return <div className="text-center text-muted-foreground py-20"><p>This watchlist is empty.</p></div>;
  }

  // Enrich the symbol ID with full stock data
  const data = symbols
    .map(symbol => ({
        ticker: symbol.id, 
        ...(allStockData[symbol.id] || { name: 'Unknown Symbol', price: 0, change: 0, percent: 0 })
    }));

  return (
    <div>
      {data.map((item, idx) => (
        <PositionRow item={item} key={idx} />
      ))}
    </div>
  );
}

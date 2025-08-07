
"use client";

import { cn } from "@/lib/utils";

export const watchlistsData = {
  "Short": [
    { ticker: 'RGTI', name: 'Rigetti Computing', price: 1.23, change: -0.09, percent: -6.82 },
    { ticker: 'NVDA', name: 'NVIDIA', price: 120.11, change: -3.15, percent: -2.55 },
    { ticker: 'TQQQ', name: 'ProShares UltraPro QQQ', price: 46.30, change: -0.91, percent: -1.93 },
  ],
  "Long": [
    { ticker: 'QQQ', name: 'Invesco QQQ Trust', price: 445.20, change: 6.81, percent: 1.55 },
    { ticker: 'VTI', name: 'Vanguard Total Stock Market', price: 267.04, change: 2.03, percent: 0.77 },
    { ticker: 'SCHD', name: 'Schwab US Dividend Equity', price: 80.33, change: 0.52, percent: 0.65 },
  ],
  "Growth": [
    { ticker: 'TSLA', name: 'Tesla Inc.', price: 801.16, change: 8.92, percent: 1.13 },
    { ticker: 'GOOG', name: 'Alphabet Inc.', price: 137.52, change: 1.19, percent: 0.87 },
  ],
  "Dividends": [
    { ticker: 'VYM', name: 'Vanguard High Dividend', price: 112.19, change: 0.22, percent: 0.20 },
    { ticker: 'SCHD', name: 'Schwab US Dividend', price: 78.44, change: -0.19, percent: -0.24 },
  ],
  "Tech": [
    { ticker: 'CRM', name: 'Salesforce Inc.', price: 199.85, change: 3.15, percent: 1.60 },
    { ticker: 'ORCL', name: 'Oracle Corp.', price: 110.60, change: 1.25, percent: 1.14 },
  ],
  "Crypto": [
    { ticker: 'BTC-USD', name: 'Bitcoin', price: 28750.00, change: 750, percent: 2.68 },
    { ticker: 'ETH-USD', name: 'Ethereum', price: 1650.20, change: -12.4, percent: -0.75 },
  ],
  "Income": [
    { ticker: 'BND', name: 'Vanguard Total Bond', price: 75.31, change: 0.07, percent: 0.09 },
  ],
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

export function Watchlist({ type }: { type: keyof typeof watchlistsData }) {
  const data = watchlistsData[type] || [];
  return (
    <div>
      {data.map((item, idx) => (
        <PositionRow item={item} key={idx} />
      ))}
    </div>
  );
}

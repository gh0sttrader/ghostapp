"use client";

import { cn } from "@/lib/utils";

const watchlistShort = [
  { ticker: 'RGTI', name: 'Rigetti Computing', price: 1.23, change: -0.09, percent: -6.82 },
  { ticker: 'NVDA', name: 'NVIDIA', price: 120.11, change: -3.15, percent: -2.55 },
  { ticker: 'TQQQ', name: 'ProShares UltraPro QQQ', price: 46.30, change: -0.91, percent: -1.93 },
];

const watchlistLong = [
  { ticker: 'QQQ', name: 'Invesco QQQ Trust', price: 445.20, change: 6.81, percent: 1.55 },
  { ticker: 'VTI', name: 'Vanguard Total Stock Market', price: 267.04, change: 2.03, percent: 0.77 },
  { ticker: 'SCHD', name: 'Schwab US Dividend Equity', price: 80.33, change: 0.52, percent: 0.65 },
];


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
    <div className="flex flex-row items-center py-3 border-b border-neutral-800">
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

export function Watchlist({ type }: { type: "Short" | "Long" }) {
  const data = type === "Short" ? watchlistShort : watchlistLong;
  return (
    <div>
      {data.map((item, idx) => (
        <PositionRow item={item} key={idx} />
      ))}
    </div>
  );
}

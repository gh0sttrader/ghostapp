"use client";

import { cn } from "@/lib/utils";

const topGainers = [
  { ticker: 'SMCI', name: 'Super Micro Computer', price: 933.89, change: 67.44, percent: 7.79 },
  { ticker: 'TSLA', name: 'Tesla', price: 261.70, change: 13.91, percent: 5.61 },
  { ticker: 'MARA', name: 'Marathon Digital', price: 20.53, change: 0.95, percent: 4.85 },
];

const topLosers = [
  { ticker: 'PLTR', name: 'Palantir Technologies', price: 24.55, change: -1.31, percent: -5.07 },
  { ticker: 'COIN', name: 'Coinbase', price: 217.50, change: -7.92, percent: -3.51 },
  { ticker: 'AMD', name: 'Advanced Micro Devices', price: 173.21, change: -4.22, percent: -2.38 },
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

export function ScreenerList({ type }: { type: "Top Gainers" | "Top Losers" }) {
  const data = type === "Top Gainers" ? topGainers : topLosers;
  return (
    <div>
      {data.map((item, idx) => (
        <PositionRow item={item} key={idx} />
      ))}
    </div>
  );
}

"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const newsData = [
  { time: '2m', symbol: 'TSLA', headline: 'Tesla Surges on Record Q2 Deliveries', sentiment: 'Positive' },
  { time: '3m', symbol: 'AAPL', headline: 'Apple Announces New iPhone Event', sentiment: 'Neutral' },
  { time: '5m', symbol: 'NVDA', headline: 'Nvidia Stock Hits All-Time High', sentiment: 'Positive' },
  { time: '7m', symbol: 'GOOGL', headline: 'Google Under Antitrust Scrutiny Again', sentiment: 'Negative' },
  { time: '11m', symbol: 'MSFT', headline: 'Microsoft Teams Outage Impacts Users', sentiment: 'Negative' },
  { time: '16m', symbol: 'META', headline: 'Meta Expands Threads Features', sentiment: 'Neutral' },
  { time: '21m', symbol: 'AMZN', headline: 'Amazon Launches Same-Day Grocery', sentiment: 'Positive' },
];

const sentimentStyles = {
  Positive: { color: 'text-accent', icon: TrendingUp },
  Negative: { color: 'text-destructive', icon: TrendingDown },
  Neutral:  { color: 'text-muted-foreground', icon: Minus },
};

type NewsItem = {
  time: string;
  symbol: string;
  headline: string;
  sentiment: 'Positive' | 'Negative' | 'Neutral';
}

function NewsRow({ item }: { item: NewsItem }) {
  const sentiment = sentimentStyles[item.sentiment] || sentimentStyles.Neutral;
  const Icon = sentiment.icon;

  return (
    <div className="flex flex-row items-center py-3 border-b border-neutral-800">
      <div className="w-10 text-xs text-neutral-400">{item.time}</div>
      <div className="mx-1 rounded-full bg-neutral-800 px-3 py-1">
        <p className="text-xs font-bold text-white">{item.symbol}</p>
      </div>
      <div className="flex-1 ml-2">
        <p className="text-sm text-white">{item.headline}</p>
      </div>
      <div className="flex flex-row items-center ml-2">
        <Icon className={cn("h-4 w-4", sentiment.color)} />
        <p className={cn("ml-1 text-xs", sentiment.color)}>{item.sentiment}</p>
      </div>
    </div>
  );
}

export function NewsList() {
  return (
    <div>
      {newsData.map((item, idx) => (
        <NewsRow item={item} key={idx} />
      ))}
    </div>
  );
}

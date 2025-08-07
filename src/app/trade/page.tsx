
"use client";

import { Search } from 'lucide-react';

const RECENT_SEARCHES = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust' },
  { symbol: 'ARKK', name: 'ARK Innovation ETF' },
];

export default function TradePage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="w-full max-w-md px-4 py-3 sm:px-6 mx-auto">
        <header className="flex items-center py-4">
          <Search className="text-neutral-400 w-5 h-5 mr-3" />
          <input
            type="text"
            className="w-full bg-transparent border-none outline-none text-white text-lg placeholder-neutral-500"
            placeholder="Search"
            disabled
          />
        </header>

        <section>
          <h2 className="text-neutral-400 text-xs tracking-wide font-semibold px-1 py-2">
            RECENT SEARCHES
          </h2>
          <div className="flex flex-col">
            {RECENT_SEARCHES.map((item) => (
              <button key={item.symbol} className="text-left py-2.5 border-b border-neutral-800/50 flex flex-col">
                <span className="text-white font-semibold text-sm">{item.symbol}</span>
                <span className="text-neutral-400 text-xs">{item.name}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

"use client";

import { Search, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RECENT_SEARCHES = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF' },
  { symbol: 'QQQ', name: 'Invesco QQQ Trust' },
  { symbol: 'ARKK', name: 'ARK Innovation ETF' },
];

export default function SearchPage() {
  const router = useRouter();

  const handleSearchClick = (symbol: string) => {
    router.push(`/trade/${symbol}`);
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="w-full max-w-md px-4 py-3 sm:px-6 mx-auto">
        <header className="flex items-center py-4">
          <Search className="text-neutral-400 w-5 h-5 mr-3" />
          <input
            type="search"
            className="w-full bg-transparent border-none outline-none text-white text-lg placeholder-neutral-500"
            placeholder="Search"
            autoFocus={true}
          />
        </header>

        <section className="mt-6">
          <h2 className="text-neutral-400 text-xs tracking-wide font-semibold px-1 py-2 uppercase">
            Recent Searches
          </h2>
          <div className="list-compact">
            {RECENT_SEARCHES.map((item) => (
              <Link
                key={item.symbol}
                href={`/trade/${item.symbol}`}
                className="row row-grid text-left"
              >
                <div>
                  <div className="symbol">{item.symbol}</div>
                  <div className="name">{item.name}</div>
                </div>
                <div className="grid place-items-center">
                    <ChevronRight className="h-5 w-5 text-zinc-500" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

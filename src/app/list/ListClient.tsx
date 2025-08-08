"use client";

import { useState, useEffect } from 'react';
import { ListSidebar } from '@/components/list-sidebar';
import { ChevronLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PositionsList } from '@/components/positions-list';
import { Watchlist } from '@/components/watchlist';
import { ScreenerList } from '@/components/screener-list';
import { NewsList } from '@/components/news-list';
import { AlertsList } from '@/components/alerts-list';
import { cn } from '@/lib/utils';

// This maps the display name to a Firestore-safe ID.
// In a real app, this would come from Firestore.
const watchlistNameToId: Record<string, string> = {
  'Short': 'short_id',
  'Long': 'long_id',
  'Growth': 'growth_id',
  'Dividends': 'dividends_id',
  'Tech': 'tech_id',
  'Crypto': 'crypto_id',
  'Income': 'income_id',
}

const listStructure = {
  Positions: ['All', 'Taxable', 'Roth'],
  Watchlists: ['Short', 'Long', 'Growth', 'Dividends', 'Tech', 'Crypto', 'Income'],
  Screeners: ['Top Gainers', 'Top Losers'],
  News: [],
  Alerts: [],
};

const getParentKey = (value: string): keyof typeof listStructure | undefined => {
  for (const key in listStructure) {
    const parentKey = key as keyof typeof listStructure;
    if (listStructure[parentKey].includes(value) || parentKey === value) {
      return parentKey;
    }
  }
};

export default function ListClient() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [selected, setSelected] = useState('Short');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userId = "dummy-user-id"; // Placeholder for actual user ID

  const parentKey = getParentKey(selected) || 'Watchlists';
  const subOptions = listStructure[parentKey] || [];

  const renderContent = () => {
    switch (parentKey) {
      case 'Positions':
        return <PositionsList account={selected as 'All' | 'Taxable' | 'Roth'} />;
      case 'Watchlists':
        const watchlistId = watchlistNameToId[selected];
        return <Watchlist userId={userId} watchlistId={watchlistId} />;
      case 'Screeners':
        return <ScreenerList type={selected as 'Top Gainers' | 'Top Losers'} />;
      case 'News':
        return <NewsList />;
      case 'Alerts':
        return <AlertsList />;
      default:
        return (
          <div className="text-center text-muted-foreground py-20">
            <p>Your {selected.toLowerCase()} will appear here.</p>
          </div>
        );
    }
  };

  if (!mounted) return null;

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <ListSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="w-full max-w-md px-4 py-2 sm:px-6 mx-auto flex flex-col flex-1">
        <header className="flex items-center gap-1 my-2">
          <Button variant="ghost" size="icon" className="-ml-2 h-auto p-2" aria-label="Open list selector" onClick={() => setIsSidebarOpen(true)}>
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <h1 className="text-lg font-bold tracking-tight text-center flex-1">
            {parentKey}
          </h1>
          <div className="w-8" />
        </header>

        {subOptions.length > 0 && (
          <div className="flex w-full items-center justify-start gap-4 mb-2 overflow-x-auto pb-2" role="tablist">
            {subOptions.map((option) => (
              <Button
                key={option}
                variant="ghost"
                role="tab"
                aria-selected={selected === option}
                size="sm"
                onClick={() => setSelected(option)}
                className={cn(
                  "px-1 py-1 text-sm text-white transition-all h-auto rounded-none whitespace-nowrap",
                  selected === option
                    ? "font-bold opacity-100"
                    : "font-normal text-neutral-400 opacity-60"
                )}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        <div className="flex-1 pb-20">
          {renderContent()}
        </div>

        {parentKey === 'Watchlists' && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-white font-semibold text-base"
              disabled
            >
              <Plus size={20} />
              <span>Add Symbol</span>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

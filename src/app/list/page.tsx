
"use client";

import { useState } from 'react';
import { ListSidebar } from '@/components/list-sidebar';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PositionsList } from '@/components/positions-list';
import { Watchlist } from '@/components/watchlist';
import { ScreenerList } from '@/components/screener-list';
import { NewsList } from '@/components/news-list';
import { AlertsList } from '@/components/alerts-list';
import { cn } from '@/lib/utils';

const listStructure = {
  Positions: ['All', 'Taxable', 'Roth'],
  Watchlists: ['Short', 'Long'],
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

export default function ListPage() {
  const [selected, setSelected] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const parentKey = getParentKey(selected) || 'Positions';
  const subOptions = listStructure[parentKey] || [];

  const renderContent = () => {
    switch (parentKey) {
      case 'Positions':
        return <PositionsList account={selected as 'All' | 'Taxable' | 'Roth'} />;
      case 'Watchlists':
        return <Watchlist type={selected as 'Short' | 'Long'} />;
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
  
  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <ListSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="w-full max-w-md px-4 py-2 sm:px-6 mx-auto">
        <header className="flex items-center gap-1 my-2">
          <Button variant="ghost" size="icon" className="-ml-2 h-auto p-2" aria-label="Open list selector" onClick={() => setIsSidebarOpen(true)}>
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <h1 className="text-lg font-bold tracking-tight">
            {parentKey}
          </h1>
        </header>

        {subOptions.length > 0 && (
          <div className="flex w-full items-center justify-start gap-4 mb-2" role="tablist">
            {subOptions.map((option) => (
              <Button
                key={option}
                variant="ghost"
                role="tab"
                aria-selected={selected === option}
                size="sm"
                onClick={() => setSelected(option)}
                className={cn(
                  "px-1 py-1 text-sm text-white transition-all h-auto rounded-none border-b-2",
                  selected === option
                    ? "font-bold border-white"
                    : "font-normal border-transparent text-neutral-400"
                )}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {renderContent()}
      </div>
    </main>
  );
}


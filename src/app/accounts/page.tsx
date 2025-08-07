
"use client";

import { useState } from 'react';
import { Line, LineChart } from 'recharts';
import {
  ChartContainer,
} from '@/components/ui/chart';
import { ChevronDown } from 'lucide-react';
import { AccountSwitcher } from '@/components/account-switcher';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { InvestmentsList } from '@/components/investments-list';
import { ActivityList } from '@/components/activity-list';

const chartData = {
  '1D': [
    { date: '12:00', value: 10182.17 },
    { date: '13:00', value: 10185.30 },
    { date: '14:00', value: 10180.50 },
    { date: '15:00', value: 10188.00 },
    { date: '16:00', value: 10190.12 },
  ],
  '1W': [
    { date: 'Mon', value: 10100 },
    { date: 'Tue', value: 10120 },
    { date: 'Wed', value: 10080 },
    { date: 'Thu', value: 10150 },
    { date: 'Fri', value: 10182.17 },
  ],
  '1M': [
    { date: 'Week 1', value: 9900 },
    { date: 'Week 2', value: 10050 },
    { date: 'Week 3', value: 10020 },
    { date: 'Week 4', value: 10182.17 },
  ],
  '3M': [
    { date: 'Month 1', value: 9500 },
    { date: 'Month 2', value: 9800 },
    { date: 'Month 3', value: 10182.17 },
  ],
  'YTD': [
    { date: 'Jan', value: 9200 },
    { date: 'Apr', value: 9700 },
    { date: 'Jul', value: 10182.17 },
  ],
  '1Y': [
    { date: 'Last Year', value: 8500 },
    { date: '6 Mo Ago', value: 9200 },
    { date: 'Today', value: 10182.17 },
  ],
  'Max': [
    { date: 'Start', value: 8000 },
    { date: 'Mid', value: 9500 },
    { date: 'Today', value: 10182.17 },
  ],
};

const returnsData = {
  '1D':  { amount: 14.22, percent: 0.14, isPositive: true },
  '1W':  { amount: 52.10, percent: 0.52, isPositive: true },
  '1M':  { amount: -120.88, percent: -1.20, isPositive: false },
  '3M':  { amount: 400.32, percent: 4.35, isPositive: true },
  'YTD': { amount: 550.00, percent: 6.10, isPositive: true },
  '1Y':  { amount: 982.45, percent: 11.10, isPositive: true },
  'Max': { amount: 1800.50, percent: 20.01, isPositive: true },
};

const chartConfig = {
  value: {
    label: 'Balance',
    color: '#ffffff',
  },
};

const timeframes = ['1D', '1W', '1M', '3M', 'YTD', '1Y', 'Max'];

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState('Taxable');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState('1D');
  const currentReturn = returnsData[activeTimeframe as keyof typeof returnsData];

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="w-full max-w-md px-4 py-3 sm:px-6 mx-auto">
        <header className="mb-1 mt-1">
          <Button
            variant="ghost"
            onClick={() => setIsSheetOpen(true)}
            className="flex items-center -ml-2 p-2 h-auto"
          >
            <h1 className="text-lg font-bold">{selectedAccount}</h1>
            <ChevronDown className="h-4 w-4 text-neutral-300 ml-1" />
          </Button>
        </header>

        <section className="mb-2">
          <p className="text-2xl font-bold">$10,182.17</p>
          <div className="flex gap-4 text-xs">
             <p className={cn("text-xs", currentReturn.isPositive ? "text-accent" : "text-destructive")}>
              {currentReturn.isPositive ? '+' : ''}${currentReturn.amount.toFixed(2)} ({currentReturn.isPositive ? '+' : ''}{currentReturn.percent.toFixed(2)}%) {activeTimeframe}
            </p>
          </div>
        </section>

        <section className="mb-2 bg-black rounded-lg">
          <ChartContainer config={chartConfig} className="aspect-video h-[120px] w-full">
            <LineChart accessibilityLayer data={chartData[activeTimeframe as keyof typeof chartData]} margin={{ top: 10, bottom: 0, left: 5, right: 5 }}>
              <Line dataKey="value" type="monotone" stroke="var(--color-value)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </section>

        <div className="flex w-full items-center justify-between mb-4" role="tablist">
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe}
              variant="ghost"
              role="tab"
              aria-selected={activeTimeframe === timeframe}
              size="sm"
              onClick={() => setActiveTimeframe(timeframe)}
              className={cn(
                "rounded-none px-3 py-1 text-xs text-white transition-colors h-auto",
                activeTimeframe === timeframe ? 'font-bold' : 'font-normal'
              )}
              data-state={activeTimeframe === timeframe ? 'active' : 'inactive'}
            >
              {timeframe}
            </Button>
          ))}
        </div>

        <InvestmentsList />
        <ActivityList />

        <AccountSwitcher
          isOpen={isSheetOpen}
          setIsOpen={setIsSheetOpen}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
        />
      </div>
    </main>
  );
}


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
    { date: '9:30', value: 10150.00 }, { date: '10:00', value: 10165.50 },
    { date: '10:30', value: 10155.20 }, { date: '11:00', value: 10175.80 },
    { date: '11:30', value: 10180.10 }, { date: '12:00', value: 10160.70 },
    { date: '12:30', value: 10185.30 }, { date: '13:00', value: 10192.40 },
    { date: '13:30', value: 10188.90 }, { date: '14:00', value: 10205.60 },
    { date: '14:30', value: 10198.20 }, { date: '15:00', value: 10210.00 },
    { date: '15:30', value: 10200.50 }, { date: '16:00', value: 10182.17 },
  ],
  '1W': [
    { date: 'Mon', value: 10100.12 }, { date: 'Tue', value: 10050.45 },
    { date: 'Wed', value: 10120.80 }, { date: 'Thu', value: 10080.22 },
    { date: 'Fri', value: 10182.17 },
  ],
  '1M': [
    { date: 'W1', value: 9980.50 }, { date: 'W2', value: 10050.70 },
    { date: 'W3', value: 10010.90 }, { date: 'W4', value: 10182.17 },
  ],
  '3M': [
    { date: 'M1', value: 9800.00 }, { date: 'M2', value: 9950.30 },
    { date: 'M3', value: 10182.17 },
  ],
  'YTD': [
    { date: 'Jan', value: 9500.00 }, { date: 'Feb', value: 9650.20 },
    { date: 'Mar', value: 9400.80 }, { date: 'Apr', value: 9750.60 },
    { date: 'May', value: 9900.10 }, { date: 'Jun', value: 10050.40 },
    { date: 'Jul', value: 10182.17 },
  ],
  '1Y': [
    { date: 'Prev', value: 9200.00 }, { date: '10M', value: 9300.50 },
    { date: '8M', value: 9100.20 }, { date: '6M', value: 9400.90 },
    { date: '4M', value: 9700.70 }, { date: '2M', value: 9900.30 },
    { date: 'Today', value: 10182.17 },
  ],
  'Max': [
    { date: 'Start', value: 8000.00 }, { date: 'Y1', value: 8500.50 },
    { date: 'Y2', value: 8200.80 }, { date: 'Y3', value: 9000.20 },
    { date: 'Y4', value: 9500.60 }, { date: 'Today', value: 10182.17 },
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

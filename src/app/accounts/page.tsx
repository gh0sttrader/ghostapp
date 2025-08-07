
"use client";

import { useState } from 'react';
import { Area, AreaChart, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ChevronDown } from 'lucide-react';
import { AccountSwitcher } from '@/components/account-switcher';
import { Button } from '@/components/ui/button';

const chartData = [
  { date: '2024-07-01', value: 10000 },
  { date: '2024-07-02', value: 10050 },
  { date: '2024-07-03', value: 10020 },
  { date: '2024-07-04', value: 10100 },
  { date: '2024-07-05', value: 10150 },
  { date: '2024-07-06', value: 10120 },
  { date: '2024-07-07', value: 10200 },
];

const chartConfig = {
  value: {
    label: 'Balance',
    color: 'hsl(var(--accent))',
  },
};

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState('Taxable');
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isPositive = true; // dummy value

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
             <p className={isPositive ? "text-accent" : "text-destructive"}>
              +$14.22 (+0.14%) Today
            </p>
            <p className={isPositive ? "text-accent" : "text-destructive"}>
              +$2.01 (+0.02%) Overnight
            </p>
          </div>
        </section>

        <section className="mb-4">
          <ChartContainer config={chartConfig} className="aspect-video h-[120px] w-full">
            <AreaChart accessibilityLayer data={chartData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
               <defs>
                  <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
              <Tooltip
                cursor={{ stroke: 'hsl(var(--muted-foreground))', strokeWidth: 1, strokeDasharray: "3 3" }}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    className="bg-card border-border"
                    labelClassName="font-bold"
                    formatter={(value) => typeof value === 'number' ? `$${value.toLocaleString()}` : ''}
                  />
                }
              />
              <Area dataKey="value" type="monotone" fill="url(#fillValue)" stroke="var(--color-value)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ChartContainer>
        </section>

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

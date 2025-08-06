"use client"

import { Area, AreaChart, Tooltip, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", price: 12.0 },
  { month: "February", price: 18.0 },
  { month: "March", price: 15.0 },
  { month: "April", price: 25.0 },
  { month: "May", price: 22.0 },
  { month: "June", price: 32.0 },
  { month: "July", price: 35.0 },
  { month: "August", price: 45.0 },
  { month: "September", price: 40.0 },
  { month: "October", price: 55.0 },
  { month: "November", price: 60.0 },
  { month: "December", price: 87.51 },
];

const chartConfig = {
  price: {
    label: "Price",
    color: "hsl(var(--accent))",
  },
}

export function StockChart() {
  return (
    <ChartContainer config={chartConfig} className="aspect-video h-[250px] w-full rounded-lg bg-card p-2 sm:p-4">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 12,
          top: 10,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="fillPrice" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-price)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-price)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <YAxis
          dataKey="price"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          orientation="right"
          tickFormatter={(value) => `$${value}`}
          className="fill-muted-foreground text-xs"
        />
        <Tooltip
          cursor={{
            stroke: 'hsl(var(--muted-foreground))',
            strokeWidth: 1,
            strokeDasharray: "3 3",
          }}
          content={
            <ChartTooltipContent
              indicator="dot"
              className="bg-card border-border"
              labelClassName="font-bold"
              formatter={(value) => (typeof value === 'number' ? `$${value.toFixed(2)}` : '')}
            />
          }
        />
        <Area
          dataKey="price"
          type="natural"
          fill="url(#fillPrice)"
          stroke="var(--color-price)"
          strokeWidth={2.5}
          dot={false}
        />
      </AreaChart>
    </ChartContainer>
  )
}

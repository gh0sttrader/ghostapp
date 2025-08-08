
"use client";

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState, use } from 'react';
import { createChart, IChartApi, ISeriesApi, LineSeries, ColorType } from 'lightweight-charts';

const symbols: { [key: string]: { name: string; price: number } } = {
  AAPL: { name: 'Apple', price: 218.75 },
  TSLA: { name: 'Tesla Inc.', price: 183.01 },
  VOO: { name: 'Vanguard S&P 500 ETF', price: 504.23 },
  QQQ: { name: 'Invesco QQQ Trust', price: 445.2 },
  ARKK: { name: 'ARK Innovation ETF', price: 43.12 },
};

const seriesesData = new Map([
  ["1D", [{ time: "2024-07-01", value: 210 }, { time: "2024-07-02", value: 215 }, { time: "2024-07-03", value: 218.75 }]],
  ["1W", [{ time: "2024-06-27", value: 200 }, { time: "2024-07-03", value: 218.75 }]],
  ["1M", [{ time: "2024-06-01", value: 190 }, { time: "2024-07-03", value: 218.75 }]],
  ["3M", [{ time: "2024-04-01", value: 180 }, { time: "2024-07-03", value: 218.75 }]],
  ["YTD", [{ time: "2024-01-02", value: 170 }, { time: "2024-07-03", value: 218.75 }]],
  ["1Y", [{ time: "2023-07-01", value: 150 }, { time: "2024-07-03", value: 218.75 }]],
  ["Max", [{ time: "2020-01-01", value: 100 }, { time: "2024-07-03", value: 218.75 }]],
]);

export default function SymbolPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = use(params);
  const data = symbols[symbol.toUpperCase()] || { name: symbol.toUpperCase(), price: 0.0 };
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<{chart: IChartApi, lineSeries: ISeriesApi<"Line">} | null>(null);
  const [currentInterval, setCurrentInterval] = useState("1D");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: { background: { type: ColorType.Solid, color: "black" }, textColor: "white" },
      width: chartContainerRef.current.clientWidth,
      height: 260,
      grid: { vertLines: { color: "rgba(255,255,255,0.1)" }, horzLines: { color: "rgba(255,255,255,0.1)" } },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
    });

    const lineSeries = chart.addSeries(LineSeries, { color: "#ffffff", lineWidth: 2 });
    lineSeries.setData(seriesesData.get(currentInterval) || []);
    chart.timeScale().fitContent();
    chartRef.current = { chart, lineSeries };

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.lineSeries.setData(seriesesData.get(currentInterval) || []);
      chartRef.current.chart.timeScale().fitContent();
    }
  }, [currentInterval]);

  const intervals = ["1D", "1W", "1M", "3M", "YTD", "1Y", "Max"];

  const currentPrice = seriesesData.get(currentInterval)?.slice(-1)[0]?.value ?? data.price;

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      {/* Header */}
      <header className="flex items-center px-2 pt-4 pb-1">
        <Link href="/trade" className="p-1 -ml-2">
          <ChevronLeft className="h-6 w-6 text-white" />
        </Link>
      </header>

      {/* Title & Price */}
      <div className="px-4">
        <h1 className="text-white text-xl sm:text-2xl font-bold">{data.name}</h1>
        <p className="text-white text-3xl sm:text-4xl font-semibold">${currentPrice.toFixed(2)}</p>
      </div>

      {/* Chart */}
      <div className="w-full h-[260px] px-2 mt-2" ref={chartContainerRef} />

      {/* Range Selector */}
      <div className="flex justify-around mt-2 pb-2 px-2">
        {intervals.map((interval) => (
          <button
            key={interval}
            onClick={() => setCurrentInterval(interval)}
            className={`text-sm transition-colors duration-200 px-2 py-1 rounded-md ${
              currentInterval === interval ? "text-white font-semibold" : "text-gray-400 hover:text-white"
            }`}
          >
            {interval}
          </button>
        ))}
      </div>
    </main>
  );
}

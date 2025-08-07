"use client";

import React, { useEffect, useRef, useState, use } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { createChart, LineSeries, IChartApi, ISeriesApi } from "lightweight-charts";

// Dummy symbol data
const symbols: { [key: string]: { name: string; price: number } } = {
  AAPL: { name: "Apple", price: 218.75 },
  TSLA: { name: "Tesla Inc.", price: 183.01 },
  VOO: { name: "Vanguard S&P 500 ETF", price: 504.23 },
  QQQ: { name: "Invesco QQQ Trust", price: 445.2 },
  ARKK: { name: "ARK Innovation ETF", price: 43.12 },
};

// Dummy chart data for timeframes
const seriesesData = new Map([
  [
    "1D",
    [
      { time: "2024-07-01", value: 210 },
      { time: "2024-07-02", value: 215 },
      { time: "2024-07-03", value: 218.75 },
    ],
  ],
  [
    "1W",
    [
      { time: "2024-06-28", value: 200 },
      { time: "2024-07-01", value: 210 },
      { time: "2024-07-02", value: 215 },
      { time: "2024-07-03", value: 218.75 },
    ],
  ],
  [
    "1M",
    [
      { time: "2024-06-01", value: 190 },
      { time: "2024-06-10", value: 200 },
      { time: "2024-06-20", value: 210 },
      { time: "2024-07-03", value: 218.75 },
    ],
  ],
  [
    "1Y",
    [
      { time: "2023-07-01", value: 150 },
      { time: "2023-10-01", value: 170 },
      { time: "2024-01-01", value: 200 },
      { time: "2024-07-03", value: 218.75 },
    ],
  ],
]);

// Colors for each interval
const intervalColors: Record<string, string> = {
  "1D": "#ffffff",
  "1W": "#4ade80",
  "1M": "#60a5fa",
  "1Y": "#facc15",
};

export default function SymbolPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = use(params);
  const data = symbols[symbol] || { name: symbol, price: 0.0 };

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  const [currentInterval, setCurrentInterval] = useState("1D");

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: "solid", color: "black" },
        textColor: "white",
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      grid: {
        vertLines: { color: "#222" },
        horzLines: { color: "#222" },
      },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
    });

    // Add line series
    const lineSeries = chart.addSeries(LineSeries, {
      color: intervalColors[currentInterval],
      lineWidth: 2,
    });

    lineSeries.setData(seriesesData.get(currentInterval) || []);
    chart.timeScale().fitContent();

    chartRef.current = chart;
    lineSeriesRef.current = lineSeries;

    // Resize on window change
    const handleResize = () => {
      chart.applyOptions({
        width: chartContainerRef.current?.clientWidth || 0,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  // Update chart when timeframe changes
  useEffect(() => {
    if (lineSeriesRef.current && chartRef.current) {
      lineSeriesRef.current.setData(seriesesData.get(currentInterval) || []);
      lineSeriesRef.current.applyOptions({
        color: intervalColors[currentInterval],
      });
      chartRef.current.timeScale().fitContent();
    }
  }, [currentInterval]);

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="w-full max-w-md px-4 py-3 sm:px-6 mx-auto">
        <header className="flex items-center py-4">
          <Link href="/trade" className="p-2 -ml-2">
            <ChevronLeft className="h-6 w-6 text-white" />
          </Link>
        </header>

        {/* Symbol Name & Price */}
        <div className="flex flex-col mt-2">
          <h1 className="text-white text-2xl font-bold mb-1">{data.name}</h1>
          <p className="text-white text-4xl font-semibold">
            ${data.price.toFixed(2)}
          </p>
        </div>
        
        {/* Timeframe Buttons */}
        <div className="flex justify-center gap-2 mt-4">
          {["1D", "1W", "1M", "1Y"].map((interval) => (
            <button
              key={interval}
              className={`px-3 py-1 rounded-full border ${
                currentInterval === interval
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white border-neutral-700"
              }`}
              onClick={() => setCurrentInterval(interval)}
            >
              {interval}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div ref={chartContainerRef} className="mt-4 w-full h-[300px]" />

      </div>
    </main>
  );
}

"use client";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { createChart, LineSeries } from "lightweight-charts";
import { useParams } from 'next/navigation';

// dummy symbol data
const symbols: Record<string, { name: string; price: number }> = {
  AAPL: { name: "Apple", price: 218.75 },
  TSLA: { name: "Tesla Inc.", price: 183.01 },
  VOO:  { name: "Vanguard S&P 500 ETF", price: 504.23 },
  QQQ:  { name: "Invesco QQQ Trust", price: 445.2 },
  ARKK: { name: "ARK Innovation ETF", price: 43.12 },
};

// dummy chart data
const chartData: Record<string, { time: string; value: number }[]> = {
  AAPL: [
    { time: "2024-07-01", value: 210.31 },
    { time: "2024-07-02", value: 213.2 },
    { time: "2024-07-03", value: 216.02 },
    { time: "2024-07-04", value: 217.0 },
    { time: "2024-07-05", value: 218.75 },
  ],
  TSLA: [
    { time: "2024-07-01", value: 178.14 },
    { time: "2024-07-02", value: 180.0 },
    { time: "2024-07-03", value: 181.6 },
    { time: "2024-07-04", value: 182.3 },
    { time: "2024-07-05", value: 183.01 },
  ],
  VOO: [
    { time: '2024-07-01', value: 500.00 }, { time: '2024-07-02', value: 501.50 },
    { time: '2024-07-03', value: 503.25 }, { time: '2024-07-04', value: 502.80 },
    { time: '2024-07-05', value: 504.23 },
  ],
  QQQ: [
    { time: '2024-07-01', value: 440.10 }, { time: '2024-07-02', value: 442.30 },
    { time: '2024-07-03', value: 444.80 }, { time: '2024-07-04', value: 443.90 },
    { time: '2024-07-05', value: 445.20 },
  ],
  ARKK: [
    { time: '2024-07-01', value: 42.50 }, { time: '2024-07-02', value: 42.80 },
    { time: '2024-07-03', value: 43.00 }, { time: '2024-07-04', value: 42.90 },
    { time: '2024-07-05', value: 43.12 },
  ],
};

export default function SymbolPage() {
  const params = useParams();
  const symbol = ((params.symbol || '') as string).toUpperCase();
  const data = symbols[symbol] || { name: symbol, price: 0 };
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !symbol) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 220,
      layout: { background: { type: "solid", color: "#000" }, textColor: "#fff" },
      grid: { vertLines: { color: "#1a1a1a" }, horzLines: { color: "#1a1a1a" } },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
    });

    const series = chart.addSeries(LineSeries, { color: "#fff", lineWidth: 2 });
    
    const seriesData = chartData[symbol] ?? chartData["AAPL"];
    series.setData(seriesData);
    
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [symbol]);

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="w-full max-w-md px-4 py-3 sm:px-6 mx-auto">
        <header className="flex items-center py-4">
          <Link href="/trade" className="p-2 -ml-2">
            <ChevronLeft className="h-6 w-6 text-white" />
          </Link>
        </header>

        <div className="flex flex-col mt-2">
          <h1 className="text-white text-2xl font-bold mb-1">{data.name}</h1>
          <p className="text-white text-4xl font-semibold">
            ${data.price.toFixed(2)}
          </p>
        </div>

        <div ref={containerRef} className="w-full h-[220px] mt-6" />
      </div>
    </main>
  );
}
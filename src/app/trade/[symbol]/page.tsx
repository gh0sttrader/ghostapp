
"use client";

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";

// Dummy data for demonstration
const symbols: { [key: string]: { name: string, price: number } } = {
  AAPL: { name: "Apple", price: 218.75 },
  TSLA: { name: "Tesla Inc.", price: 183.01 },
  VOO: { name: "Vanguard S&P 500 ETF", price: 504.23 },
  QQQ: { name: "Invesco QQQ Trust", price: 445.20 },
  ARKK: { name: "ARK Innovation ETF", price: 43.12 },
};

// Dummy chart data (timestamps should be in YYYY-MM-DD format)
const chartData: { [key: string]: { time: string, value: number }[] } = {
  AAPL: [
    { time: '2024-07-01', value: 210.31 },
    { time: '2024-07-02', value: 213.20 },
    { time: '2024-07-03', value: 216.02 },
    { time: '2024-07-04', value: 217.00 },
    { time: '2024-07-05', value: 218.75 },
  ],
  TSLA: [
    { time: '2024-07-01', value: 178.14 },
    { time: '2024-07-02', value: 180.00 },
    { time: '2024-07-03', value: 181.60 },
    { time: '2024-07-04', value: 182.30 },
    { time: '2024-07-05', value: 183.01 },
  ],
  // Add more if you want
};

export default function SymbolPage({ params: { symbol } }: { params: { symbol: string } }) {
  const data = symbols[symbol.toUpperCase()] || { name: symbol.toUpperCase(), price: 0.00 };
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create the chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 220,
      layout: {
        background: { type: "solid", color: "#000" },
        textColor: "#fff",
      },
      grid: {
        vertLines: { color: "#222" },
        horzLines: { color: "#222" },
      },
    });

    const lineSeries = chart.addLineSeries({
      color: "#fff",
      lineWidth: 2,
    });

    // Use dummy data for chart (fallback to AAPL)
    lineSeries.setData(chartData[symbol.toUpperCase() as keyof typeof chartData] || chartData["AAPL"]);

    chart.timeScale().fitContent();

    // Responsive resize
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      chart.remove();
      window.removeEventListener("resize", handleResize);
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
          <p className="text-white text-4xl font-semibold">${data.price.toFixed(2)}</p>
        </div>

        {/* Chart */}
        <div
          ref={chartContainerRef}
          style={{
            width: "100%",
            height: "220px",
            marginTop: "1.5rem",
          }}
        />
      </div>
    </main>
  );
}

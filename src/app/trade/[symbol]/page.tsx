
"use client";

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useEffect, useState } from "react";
import type { IChartApi, ISeriesApi } from "lightweight-charts";
import { useParams } from 'next/navigation';

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
  const symbol = (params.symbol || '') as string;
  const data = symbols[symbol.toUpperCase()] || { name: symbol.toUpperCase(), price: 0.00 };
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current || !symbol) return;

    // Dynamically import createChart to ensure it only runs on the client
    import('lightweight-charts').then(({ createChart }) => {
      if (!chartContainerRef.current) return;

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
      chartRef.current = chart;

      const lineSeries = chart.addLineSeries({
        color: "#fff",
        lineWidth: 2,
      });
      seriesRef.current = lineSeries;

      const seriesData = chartData[symbol.toUpperCase() as keyof typeof chartData] || chartData["AAPL"];
      if (seriesData) {
        lineSeries.setData(seriesData);
      }
      
      chart.timeScale().fitContent();

      const handleResize = () => {
        if (chartContainerRef.current && chartRef.current) {
          chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
        }
      };

      window.addEventListener("resize", handleResize);

      // Cleanup on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
        }
      };
    });
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

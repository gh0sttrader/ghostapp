
"use client";

import React, { useEffect, useRef, useState, use } from "react";
import { createChart } from "lightweight-charts";
import { ChevronLeft, Star, X } from "lucide-react";
import Link from "next/link";
import { useParams } from 'next/navigation';


// --- dummy symbol + chart (unchanged content) ---
const symbols: Record<string, { name: string; price: number }> = {
  AAPL: { name: "Apple Inc.", price: 218.75 },
  TSLA: { name: "Tesla Inc.", price: 183.01 },
  VOO: { name: "Vanguard S&P 500 ETF", price: 504.23 },
};

const seriesesData = new Map([
  ["1D", [
    { time: 1719878400, value: 210 },
    { time: 1719882000, value: 215 },
    { time: 1719885600, value: 213 },
    { time: 1719889200, value: 218 },
  ]],
  ["1W", [
    { time: 1719302400, value: 200 },
    { time: 1719388800, value: 205 },
    { time: 1719475200, value: 207 },
    { time: 1719561600, value: 212 },
    { time: 1719648000, value: 218 },
  ]],
]);

export default function SymbolPage() {
  const params = useParams();
  const symbol = params.symbol as string;
  const data = symbols[symbol] || { name: symbol, price: 0 };

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<any>(null);
  const [currentInterval, setCurrentInterval] = useState<"1D" | "1W">("1D");

  // ⭐ modal state
  const [showWatchlist, setShowWatchlist] = useState(false);
  const watchlists = ["Short", "Long", "Growth", "Dividends", "Tech"];
  const [selectedWatchlist, setSelectedWatchlist] = useState<string | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: { background: { type: "solid", color: "#000" }, textColor: "#fff" },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
      width: chartContainerRef.current.clientWidth,
      height: 260,
    });

    const lineSeries = chart.addLineSeries({ color: "#00FF00", lineWidth: 2, priceLineVisible: true });
    lineSeries.setData(seriesesData.get(currentInterval) || []);
    chart.timeScale().fitContent();

    chartRef.current = { chart, lineSeries };
    return () => chart.remove();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.lineSeries.setData(seriesesData.get(currentInterval) || []);
    chartRef.current.chart.timeScale().fitContent();
  }, [currentInterval]);

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="relative w-full max-w-md px-4 pt-1 sm:px-6 mx-auto">
        {/* header */}
        <header className="flex items-center pb-2">
          <Link href="/trade" className="p-2 -ml-2 active:opacity-70">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <div className="ml-2 mr-auto">
            <h1 className="text-lg font-bold">{data.name}</h1>
            <p className="text-green-500 text-xl font-semibold">${data.price.toFixed(2)}</p>
          </div>

          {/* ⭐ outlined star button (top-right) */}
          <button
            onClick={() => setShowWatchlist(true)}
            aria-label="Add to Watchlist"
            className="p-2 rounded-full active:scale-95 focus:outline-none"
          >
            <Star className="h-6 w-6 stroke-white" fill="none" />
          </button>
        </header>

        {/* chart */}
        <div ref={chartContainerRef} className="mt-1 rounded-lg overflow-hidden" />

        {/* ranges (kept minimal) */}
        <div className="flex justify-around mt-1">
          {(["1D", "1W"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setCurrentInterval(r)}
              className={`text-xs px-2 py-1 rounded ${
                currentInterval === r ? "bg-green-600 text-black" : "text-gray-400"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 🔲 Frosted modal (transparent card) */}
      {showWatchlist && (
        <div
          className="fixed inset-0 z-50 bg-transparent backdrop-blur-xl"
          onClick={() => setShowWatchlist(false)}
        >
          <div
            className="absolute left-1/2 top-1/2 w-[92%] max-w-sm -translate-x-1/2 -translate-y-1/2
                       bg-transparent backdrop-blur-xl rounded-2xl ring-1 ring-white/10 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold">Add to Watchlist</h2>
              <button onClick={() => setShowWatchlist(false)} aria-label="Close" className="p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-1">
              {watchlists.map((wl) => (
                <button
                  key={wl}
                  onClick={() => setSelectedWatchlist(wl)}
                  className={`w-full text-left px-3 py-2 rounded-lg ring-1 ring-white/10
                              ${selectedWatchlist === wl ? "bg-white/10" : "bg-transparent"}
                              active:opacity-80`}
                >
                  {wl}
                </button>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setShowWatchlist(false)}
                className="flex-1 py-2 rounded-lg ring-1 ring-white/15 bg-transparent"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // TODO: persist to Firestore
                  setShowWatchlist(false);
                }}
                disabled={!selectedWatchlist}
                className="flex-1 py-2 rounded-lg bg-white text-black disabled:opacity-40"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

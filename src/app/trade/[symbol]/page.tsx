"use client";

import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import { ChevronLeft, Star, X } from "lucide-react";
import Link from "next/link";
import { useParams } from 'next/navigation';

const symbols: Record<string, { name: string; price: number }> = {
  AAPL: { name: "Apple Inc.", price: 218.75 },
  TSLA: { name: "Tesla Inc.", price: 183.01 },
  VOO: { name: "Vanguard S&P 500 ETF", price: 504.23 },
};

// ASC timestamps
const seriesesData = new Map<string, { time: number; value: number }[]>([
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

  const chartWrapRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const lineRef = useRef<any>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const [range, setRange] = useState<"1D" | "1W">("1D");

  const [showWatchlist, setShowWatchlist] = useState(false);
  const [selectedWatchlist, setSelectedWatchlist] = useState<string | null>(null);
  const watchlists = ["Short", "Long", "Growth", "Dividends", "Tech"];

  useEffect(() => {
    if (!chartWrapRef.current) return;

    const container = chartWrapRef.current;
    const chart = createChart(container, {
      layout: { background: { type: "solid", color: "#000" }, textColor: "#fff" },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false, fixLeftEdge: true, fixRightEdge: true },
      width: container.clientWidth,
      height: 360,                   // <- back to taller header/graph feel
    });

    const lineSeries = chart.addLineSeries({ color: "#00FF00", lineWidth: 2, priceLineVisible: true });
    lineSeries.setData(seriesesData.get(range) || []);
    chart.timeScale().fitContent();

    // keep it responsive without shifting layout
    const ro = new ResizeObserver(() => {
      if (!chartWrapRef.current) return;
      chart.applyOptions({ width: chartWrapRef.current.clientWidth });
    });
    ro.observe(container);

    chartRef.current = chart;
    lineRef.current = lineSeries;
    roRef.current = ro;

    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current = null;
      lineRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!lineRef.current || !chartRef.current) return;
    lineRef.current.setData(seriesesData.get(range) || []);
    chartRef.current.timeScale().fitContent();
  }, [range]);

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="relative w-full max-w-md px-4 pt-1 sm:px-6 mx-auto">
        {/* header restored: big name + big white price on left; star does not shift layout */}
        <header className="relative pb-2">
          <div className="flex items-start gap-2">
            <Link href="/trade" className="p-2 -ml-2 active:opacity-70">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <div className="mt-0.5">
              <div className="text-xs text-gray-300">{symbol}</div>
              <h1 className="text-[22px] font-semibold leading-6">{data.name}</h1>
              <p className="text-[34px] font-bold leading-8 text-white">${data.price.toFixed(2)}</p>
            </div>
          </div>

          {/* star: absolute top-right so it doesn’t affect header/chart layout */}
          <button
            onClick={() => setShowWatchlist(true)}
            aria-label="Add to Watchlist"
            className="absolute right-1 top-1 p-2 rounded-full active:scale-95"
          >
            <Star className="h-6 w-6 stroke-white" fill="none" />
          </button>
        </header>

        {/* chart (restored spacing) */}
        <div ref={chartWrapRef} className="mt-1 rounded-lg overflow-hidden" />

        {/* ranges below chart (unchanged behavior) */}
        <div className="flex justify-between mt-2 px-1 text-gray-300">
          {(["1D", "1W"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`text-sm px-2 py-1 rounded ${
                range === r ? "bg-green-600 text-black" : "hover:text-white"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* frosted modal (unchanged) */}
      {showWatchlist && (
        <div className="fixed inset-0 z-50 bg-transparent backdrop-blur-xl" onClick={() => setShowWatchlist(false)}>
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
                  className={`w-full text-left px-3 py-2 rounded-lg ring-1 ring-white/10 ${
                    selectedWatchlist === wl ? "bg-white/10" : "bg-transparent"
                  }`}
                >
                  {wl}
                </button>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <button onClick={() => setShowWatchlist(false)} className="flex-1 py-2 rounded-lg ring-1 ring-white/15">
                Cancel
              </button>
              <button
                onClick={() => setShowWatchlist(false)}
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
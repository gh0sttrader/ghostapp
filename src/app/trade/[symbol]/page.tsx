"use client";

import React, { useEffect, useRef, useState } from "react";
import { createChart, LineSeries } from "lightweight-charts";
import { ChevronLeft, Star, X } from "lucide-react";
import Link from "next/link";
import { useParams } from 'next/navigation';
import WatchlistModal from "@/components/watchlist-modal";

type RangeKey = "1D" | "1W" | "1M" | "3M" | "YTD" | "1Y" | "Max";
const RANGES: RangeKey[] = ["1D", "1W", "1M", "3M", "YTD", "1Y", "Max"];

const symbols: Record<string, { name: string; price: number }> = {
  AAPL: { name: "Apple Inc.", price: 218.75 },
  TSLA: { name: "Tesla Inc.", price: 183.01 },
  VOO: { name: "Vanguard S&P 500 ETF", price: 504.23 },
};

const buildSeries = (count: number, start = 210) =>
  Array.from({ length: count }, (_, i) => ({
    time: Math.floor(Date.now() / 1000) - (count - i) * 86400,
    value: start + i * 2 + Math.sin(i / 10) * 10 + (Math.random() - 0.5) * 5,
  })).sort((a, b) => a.time - b.time);

const seriesesData = new Map<RangeKey, { time: number; value: number }[]>([
  ["1D", buildSeries(1 * 8, 215)],
  ["1W", buildSeries(7 * 8, 210)],
  ["1M", buildSeries(30, 200)],
  ["3M", buildSeries(90, 180)],
  ["YTD", buildSeries(180, 150)],
  ["1Y", buildSeries(365, 160)],
  ["Max", buildSeries(720, 100)],
]);

export default function SymbolPage() {
  const params = useParams();
  const symbol = params.symbol as string;
  const data = symbols[symbol] || { name: symbol, price: 0 };

  const chartWrapRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const lineRef = useRef<LineSeries | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  const [range, setRange] = useState<RangeKey>("1D");

  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  
  // Dummy data for the modal - will be replaced with Firestore data
  const dummyWatchlists = [
    { id: "1", name: "Short" },
    { id: "2", name: "Long" },
    { id: "3", name: "Growth" },
  ];

  useEffect(() => {
    if (!chartWrapRef.current) return;

    const el = chartWrapRef.current;
    const chart = createChart(el, {
      layout: { background: { type: "solid", color: "#000" }, textColor: "#fff" },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      rightPriceScale: { borderVisible: false },
      timeScale: {
        borderVisible: false,
        visible: false,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
      width: el.clientWidth,
      height: 330,
    });
    
    chart.priceScale("right").applyOptions({
      scaleMargins: {
        top: 0.05,
        bottom: 0,
      },
    });

    const line = chart.addSeries(LineSeries, { color: "#00FF00", lineWidth: 2, priceLineVisible: true });
    line.setData(seriesesData.get("1D") || []);
    chart.timeScale().fitContent();

    const ro = new ResizeObserver(() => {
      if (!chartWrapRef.current) return;
      chart.applyOptions({ width: chartWrapRef.current.clientWidth });
    });
    ro.observe(el);

    chartRef.current = chart;
    lineRef.current = line;
    roRef.current = ro;

    return () => {
      ro.disconnect();
      chart.remove();
      chartRef.current = null;
      lineRef.current = null;
    };
  }, []);

  const handleSetRange = (r: RangeKey) => {
    setRange(r);
    if (!lineRef.current || !chartRef.current) return;
    const data = seriesesData.get(r) || [];
    lineRef.current.setData(data);
    chartRef.current.applyOptions({
      timeScale: { tickMarkFormatter: () => "" },
    });
    chartRef.current.timeScale().fitContent();
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
        <header className="px-4 pt-2">
            {/* top row: back + star */}
            <div className="flex items-center justify-between">
                <Link href="/trade" aria-label="Back" className="-ml-2 p-2">
                <ChevronLeft className="h-6 w-6 text-white" />
                </Link>

                <button
                type="button"
                aria-label="Add to Watchlist"
                className="p-2"
                onClick={() => setIsWatchlistOpen(true)}
                >
                <Star className="h-6 w-6 text-white/90" strokeWidth={1.5} fill="transparent" />
                </button>
            </div>

            {/* info block: sits right under the back arrow */}
            <div className="mt-1">
                <p className="text-xs text-gray-400">{symbol}</p>
                <h1 className="text-[20px] leading-tight font-semibold text-white">
                {data.name}
                </h1>
                <p className="text-[42px] leading-none font-semibold text-white">
                ${data.price.toFixed(2)}
                </p>
            </div>
        </header>

        <div className="mx-4 mt-2">
            <div ref={chartWrapRef} className="h-[330px] w-full mb-1" />
            <div className="-mt-1 flex items-center justify-between px-1">
                {RANGES.map((r) => (
                <button
                    key={r}
                    onClick={() => handleSetRange(r)}
                    className={`text-[14px] ${range === r ? "text-white font-semibold underline underline-offset-4" : "text-gray-300"}`}
                >
                    {r}
                </button>
                ))}
            </div>
        </div>

      <WatchlistModal
        open={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        userId="dummy-user-id" // Placeholder
        symbol={symbol}
        watchlists={dummyWatchlists} // Placeholder
      />
    </main>
  );
}
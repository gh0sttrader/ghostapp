"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { createChart, LineSeries, IChartApi, ISeriesApi } from "lightweight-charts";

// Dummy data sets
const seriesesData = new Map<string, { time: string; value: number }[]>([
  ["1D", [
    { time: '2025-07-01', value: 212 },
    { time: '2025-07-02', value: 216 },
    { time: '2025-07-03', value: 217 },
    { time: '2025-07-04', value: 218.75 },
  ]],
  ["1W", [
    { time: '2025-07-01', value: 200 },
    { time: '2025-07-02', value: 205 },
    { time: '2025-07-03', value: 210 },
    { time: '2025-07-04', value: 218.75 },
  ]],
  ["1M", [
    { time: '2025-06-01', value: 180 },
    { time: '2025-06-15', value: 200 },
    { time: '2025-07-01', value: 218.75 },
  ]],
  ["1Y", [
    { time: '2024-07-01', value: 140 },
    { time: '2025-01-01', value: 180 },
    { time: '2025-07-01', value: 218.75 },
  ]],
]);

const intervalColors: Record<string, string> = {
  "1D": "#2962FF",
  "1W": "#E1575A",
  "1M": "#F28E2C",
  "1Y": "#A459D1",
};

const symbols: { [key: string]: { name: string; price: number } } = {
  AAPL: { name: "Apple", price: 218.75 },
  TSLA: { name: "Tesla Inc.", price: 183.01 },
  VOO: { name: "Vanguard S&P 500 ETF", price: 504.23 },
  QQQ: { name: "Invesco QQQ Trust", price: 445.2 },
  ARKK: { name: "ARK Innovation ETF", price: 43.12 },
};

export default function SymbolPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  const data = symbols[symbol] || { name: symbol, price: 0.0 };
  
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const [activeInterval, setActiveInterval] = useState("1D");

  useEffect(() => {
    if (chartContainerRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        layout: {
          textColor: "white",
          background: { type: "solid", color: "black" },
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

      lineSeriesRef.current = chartRef.current.addSeries(LineSeries, {
        color: intervalColors[activeInterval],
        lineWidth: 2,
      });

      setChartInterval(activeInterval);

      const handleResize = () => {
        if (chartRef.current && chartContainerRef.current) {
          chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chartRef.current?.remove();
      }
    }
  }, []);

  function setChartInterval(interval: string) {
    if (lineSeriesRef.current && chartRef.current) {
      lineSeriesRef.current.setData(seriesesData.get(interval) || []);
      lineSeriesRef.current.applyOptions({ color: intervalColors[interval] });
      chartRef.current.timeScale().fitContent();
      setActiveInterval(interval);
    }
  }

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

        {/* Time Range Buttons */}
        <div className="flex justify-center gap-2 mt-4">
          {["1D", "1W", "1M", "1Y"].map((interval) => (
            <button
              key={interval}
              onClick={() => setChartInterval(interval)}
              className={`px-3 py-1 rounded-full border ${
                activeInterval === interval ? "bg-white text-black" : "bg-transparent text-white"
              }`}
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
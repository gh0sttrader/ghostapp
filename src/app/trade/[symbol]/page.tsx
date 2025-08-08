"use client";

import { useRef, useEffect, useState, use } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { createChart, IChartApi, ISeriesApi, LineSeries } from "lightweight-charts";

// Dummy symbol data
const symbols: { [key: string]: { name: string; price: number } } = {
  AAPL: { name: "Apple", price: 218.75 },
  TSLA: { name: "Tesla Inc.", price: 183.01 },
  VOO: { name: "Vanguard S&P 500 ETF", price: 504.23 },
  QQQ: { name: "Invesco QQQ Trust", price: 445.2 },
  ARKK: { name: "ARK Innovation ETF", price: 43.12 },
};

// Dummy data for each range (ascending order required)
const seriesesData = new Map([
  ['1D', [
    { time: '2024-07-01', value: 210 },
    { time: '2024-07-02', value: 215 },
    { time: '2024-07-03', value: 218.75 },
  ]],
  ['1W', [
    { time: '2024-06-28', value: 205 },
    { time: '2024-07-01', value: 210 },
    { time: '2024-07-02', value: 215 },
    { time: '2024-07-03', value: 218.75 },
  ]],
  ['1M', [
    { time: '2024-06-01', value: 200 },
    { time: '2024-06-15', value: 210 },
    { time: '2024-07-01', value: 218.75 },
  ]],
  ['3M', [
    { time: '2024-04-01', value: 190 },
    { time: '2024-05-01', value: 200 },
    { time: '2024-06-01', value: 210 },
    { time: '2024-07-01', value: 218.75 },
  ]],
  ['YTD', [
    { time: '2024-01-02', value: 170 },
    { time: '2024-03-01', value: 190 },
    { time: '2024-05-01', value: 210 },
    { time: '2024-07-01', value: 218.75 },
  ]],
  ['1Y', [
    { time: '2023-07-01', value: 150 },
    { time: '2023-10-01', value: 180 },
    { time: '2024-01-02', value: 170 },
    { time: '2024-07-01', value: 218.75 },
  ]],
  ['Max', [
    { time: '2020-01-02', value: 80 },
    { time: '2021-01-02', value: 120 },
    { time: '2022-01-02', value: 140 },
    { time: '2023-07-01', value: 150 },
    { time: '2024-07-01', value: 218.75 },
  ]]
]);

export default function SymbolPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  const data = symbols[symbol.toUpperCase()] || { name: symbol.toUpperCase(), price: 0.00 };
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<{chart: IChartApi, series: ISeriesApi<"Line">} | null>(null);
  const [currentInterval, setCurrentInterval] = useState('1D');

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: { background: { color: 'black' }, textColor: 'white' },
      grid: { vertLines: { color: '#333' }, horzLines: { color: '#333' } },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
    });

    const lineSeries = chart.addSeries(LineSeries, { color: "#fff", lineWidth: 2 });

    lineSeries.setData(seriesesData.get(currentInterval) || []);
    chart.timeScale().fitContent();
    chartRef.current = { chart, series: lineSeries };

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
      chartRef.current.series.setData(seriesesData.get(currentInterval) || []);
      chartRef.current.chart.timeScale().fitContent();
    }
  }, [currentInterval]);

  const currentPrice = seriesesData.get(currentInterval)?.slice(-1)[0]?.value ?? data.price;


  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="w-full max-w-md px-4 py-3 sm:px-6 mx-auto">
        <header className="flex items-center py-4">
          <Link href="/trade" className="p-2 -ml-2">
            <ChevronLeft className="h-6 w-6 text-white" />
          </Link>
        </header>

        <h1 className="text-2xl font-bold mb-1">{data.name}</h1>
        <p className="text-4xl font-semibold mb-4">${currentPrice.toFixed(2)}</p>

        <div ref={chartContainerRef} className="w-full h-[300px]" />

        {/* Time Range Buttons at bottom */}
        <div className="flex justify-between mt-2">
          {['1D', '1W', '1M', '3M', 'YTD', '1Y', 'Max'].map((interval) => (
            <button
              key={interval}
              onClick={() => setCurrentInterval(interval)}
              className={`text-sm px-2 py-1 rounded ${
                currentInterval === interval
                  ? 'font-bold text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {interval}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}


"use client";

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState, use } from 'react';
import { createChart, IChartApi, ISeriesApi, LineSeries } from 'lightweight-charts';

const symbols: { [key: string]: { name: string; price: number } } = {
  AAPL: { name: 'Apple', price: 218.75 },
  TSLA: { name: 'Tesla Inc.', price: 183.01 },
  VOO: { name: 'Vanguard S&P 500 ETF', price: 504.23 },
  QQQ: { name: 'Invesco QQQ Trust', price: 445.2 },
  ARKK: { name: 'ARK Innovation ETF', price: 43.12 },
};

const dayData = [
  { time: '2024-07-01', value: 210 },
  { time: '2024-07-02', value: 215 },
  { time: '2024-07-03', value: 218.75 },
];
const weekData = [
  { time: '2024-06-24', value: 200 },
  { time: '2024-07-01', value: 218.75 },
];
const monthData = [
  { time: '2024-06-01', value: 190 },
  { time: '2024-07-01', value: 218.75 },
];
const threeMonthData = [
  { time: '2024-05-01', value: 180 },
  { time: '2024-07-01', value: 218.75 },
];
const ytdData = [
  { time: '2024-01-01', value: 150 },
  { time: '2024-07-01', value: 218.75 },
];
const yearData = [
  { time: '2023-07-01', value: 140 },
  { time: '2024-07-01', value: 218.75 },
];
const maxData = [
  { time: '2020-07-01', value: 100 },
  { time: '2024-07-01', value: 218.75 },
];

const seriesesData = new Map([
  ['1D', dayData],
  ['1W', weekData],
  ['1M', monthData],
  ['3M', threeMonthData],
  ['YTD', ytdData],
  ['1Y', yearData],
  ['Max', maxData],
]);

export default function SymbolPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = use(params);
  const data = symbols[symbol.toUpperCase()] || { name: symbol.toUpperCase(), price: 0.0 };

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const [currentInterval, setCurrentInterval] = useState('1D');

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: { background: { color: '#000000' }, textColor: '#FFFFFF' },
      grid: { vertLines: { color: '#222' }, horzLines: { color: '#222' } },
      rightPriceScale: { borderVisible: false },
      timeScale: { borderVisible: false },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const lineSeries = chart.addSeries(LineSeries, {
      color: '#ffffff',
      lineWidth: 2,
    });

    lineSeries.setData(seriesesData.get(currentInterval) || []);
    chart.timeScale().fitContent();

    chartRef.current = chart;
    lineSeriesRef.current = lineSeries;
    
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  const handleIntervalChange = (interval: string) => {
    setCurrentInterval(interval);
    if (lineSeriesRef.current && chartRef.current) {
      lineSeriesRef.current.setData(seriesesData.get(interval) || []);
      chartRef.current?.timeScale().fitContent();
    }
  };
  
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
              onClick={() => handleIntervalChange(interval)}
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


"use client";

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState, use } from 'react';
import { createChart, IChartApi, ISeriesApi, LineSeries, ColorType, LineStyle } from 'lightweight-charts';

const symbols: { [key: string]: { name: string; price: number } } = {
  AAPL: { name: 'Apple', price: 218.75 },
  TSLA: { name: 'Tesla Inc.', price: 183.01 },
  VOO: { name: 'Vanguard S&P 500 ETF', price: 504.23 },
  QQQ: { name: 'Invesco QQQ Trust', price: 445.2 },
  ARKK: { name: 'ARK Innovation ETF', price: 43.12 },
};

const seriesesData = new Map([
  ["1D", [{ time: "2024-07-01", value: 210.0 }, { time: "2024-07-02", value: 215.0 }, { time: "2024-07-03", value: 218.75 }]],
  ["1W", [{ time: "2024-06-28", value: 208.0 }, { time: "2024-07-05", value: 218.75 }]],
  ["1M", [{ time: "2024-06-01", value: 200.0 }, { time: "2024-07-01", value: 218.75 }]],
  ["3M", [{ time: "2024-04-01", value: 180.0 }, { time: "2024-07-01", value: 218.75 }]],
  ["YTD", [{ time: "2024-01-01", value: 150.0 }, { time: "2024-07-01", value: 218.75 }]],
  ["1Y", [{ time: "2023-07-01", value: 140.0 }, { time: "2024-07-01", value: 218.75 }]],
  ["Max", [{ time: "2020-01-01", value: 80.0 }, { time: "2024-07-01", value: 218.75 }]]
]);

export default function SymbolPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = use(params);
  const data = symbols[symbol.toUpperCase()] || { name: symbol.toUpperCase(), price: 0.0 };
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<{ chart: IChartApi, lineSeries: ISeriesApi<"Line"> } | null>(null);
  const [currentInterval, setCurrentInterval] = useState("1D");
  const [chartHeight, setChartHeight] = useState(300); // Default height

  useEffect(() => {
    // Set chart height on client mount
    setChartHeight(Math.floor(window.innerHeight * 0.48));

    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#fff",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.05)" },
        horzLines: { color: "rgba(255,255,255,0.05)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: Math.floor(window.innerHeight * 0.48), // ~48% screen height
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
      },
    });

    const lineSeries = chart.addSeries(LineSeries, {
      color: "#fff",
      lineWidth: 2,
      priceLineVisible: true,
      crossHairMarkerVisible: true,
    });

    lineSeries.setData(seriesesData.get(currentInterval) || []);
    chart.timeScale().fitContent();
    chartRef.current = { chart, lineSeries };
    
    const handleResize = () => {
        const newHeight = Math.floor(window.innerHeight * 0.48);
        chart.applyOptions({ width: chartContainerRef.current!.clientWidth, height: newHeight });
        setChartHeight(newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
    };
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.lineSeries.setData(seriesesData.get(currentInterval) || []);
      chartRef.current.chart.timeScale().fitContent();
    }
  }, [currentInterval]);

  const intervals = ["1D", "1W", "1M", "3M", "YTD", "1Y", "Max"];
  const currentPrice = seriesesData.get(currentInterval)?.slice(-1)[0]?.value ?? data.price;


  return (
    <div className="bg-black text-white h-screen flex flex-col">
      {/* Header */}
      <div
        className="flex items-center px-4 pt-4 pb-2 animate-slideDownFade"
        style={{ paddingTop: "12px" }}
      >
        <Link href="/trade" className="text-white text-2xl mr-3">←</Link>
        <div>
          <h1 className="text-xl font-bold">{data.name}</h1>
          <p className="text-3xl font-bold">${currentPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Chart */}
      <div
        ref={chartContainerRef}
        className="w-full animate-slideUpFade"
        style={{
          flexShrink: 0,
          height: chartHeight > 0 ? `${chartHeight}px` : '48vh',
        }}
      />

      {/* Time Range Selector */}
      <div
        className="flex justify-around items-center px-2 mt-2 animate-slideUpFade"
        style={{ minHeight: "40px" }}
      >
        {intervals.map((interval) => (
          <button
            key={interval}
            onClick={() => setCurrentInterval(interval)}
            className={`px-2 text-sm ${
              currentInterval === interval ? "font-bold text-white" : "text-gray-400"
            }`}
          >
            {interval}
          </button>
        ))}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideUpFade {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideDownFade {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUpFade {
          animation: slideUpFade 0.6s ease forwards;
        }
        .animate-slideDownFade {
          animation: slideDownFade 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
}

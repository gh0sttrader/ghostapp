
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createChart, LineSeries } from "lightweight-charts";
import { useParams } from 'next/navigation';
import AboutSection, { Security } from "@/components/AboutSection";
import { MOCK_AAPL, MOCK_VOO } from "@/mock/aboutData";
import SectorsSection from "@/components/SectorsSection";
import { MOCK_VOO_SECTORS } from "@/mock/etfSectors";
import TopHoldingsSection from "@/components/TopHoldingsSection";
import { MOCK_VOO_TOP10 } from "@/mock/top10_voo";
import AverageAnnualReturn from "@/components/AverageAnnualReturn";
import { MOCK_VOO_AAR } from "@/mock/avgAnnualReturn_voo";
import AnalystRating from "@/components/AnalystRating";
import { WHITE_LINE } from "@/lib/chartTheme";
import TradeHistory from "@/components/TradeHistory";
import { MOCK_VOO_HISTORY } from "@/mock/history";
import TradeHeaderCompact from "@/components/TradeHeaderCompact";
import ScrollMiniHeader from "@/components/ScrollMiniHeader";
import { Bar, rangeLabel, sliceByRange } from "@/lib/range";
import TopRangeStrip from "@/components/TopRangeStrip";
import TradeAttributes from "@/components/TradeAttributes";

type RangeKey = "1D" | "1W" | "1M" | "3M" | "YTD" | "1Y" | "Max";
const RANGES: RangeKey[] = ["1D", "1W", "1M", "3M", "YTD", "1Y", "Max"];

const symbols: Record<string, { name: string; price: number, type: 'stock' | 'etf', change: number, changePct: number, exchange: string, high: number, low: number, volume: number }> = {
  AAPL: { name: "Apple Inc.", price: 218.75, type: 'stock', change: 2.50, changePct: 1.18, exchange: 'NASDAQ', high: 220.15, low: 217.45, volume: 45_120_000 },
  TSLA: { name: "Tesla Inc.", price: 183.01, type: 'stock', change: -4.88, changePct: -2.55, exchange: 'NASDAQ', high: 188.50, low: 182.10, volume: 87_654_321 },
  VOO: { name: "Vanguard S&P 500 ETF", price: 504.23, type: 'etf', change: 7.12, changePct: 1.42, exchange: 'NYSEARCA', high: 505.00, low: 502.50, volume: 3_210_987 },
};

const aboutData: Record<string, Security> = {
  AAPL: MOCK_AAPL,
  VOO: MOCK_VOO,
}

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
  const data = symbols[symbol] || { name: symbol, price: 0, type: 'stock', change: 0, changePct: 0, exchange: '', high: 0, low: 0, volume: 0 };
  const currentAboutData = aboutData[symbol];


  const chartWrapRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const lineRef = useRef<LineSeries | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  const [range, setRange] = useState<RangeKey>("1D");

  const allBars: Bar[] = useMemo(() => {
    const maxData = seriesesData.get("Max") || [];
    return maxData.map(d => ({ time: d.time * 1000, close: d.value }));
  }, []);

  const barsForRange = useMemo(() => sliceByRange(allBars, range), [allBars, range]);

  const aarRows = useMemo(() => {
    return MOCK_VOO_AAR.map(r => ({
      label: r.period === "Since" ? "Inception" : r.period,
      price: `${r.price?.toFixed(2) ?? '—'}%`,
      nav: `${r.nav?.toFixed(2) ?? '—'}%`,
      subLabel: r.period === "Since" ? r.sinceDate : undefined,
    }));
  }, []);
  

  const inceptionDate = useMemo(() => {
    const sinceRow = MOCK_VOO_AAR.find(r => r.period === "Since");
    return sinceRow?.sinceDate ? new Date(sinceRow.sinceDate).toISOString() : new Date().toISOString();
  }, []);
  
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

    const line = chart.addSeries(LineSeries, WHITE_LINE);
    const initialData = (seriesesData.get("1D") || []).map(d => ({ ...d, time: d.time as any }));
    line.setData(initialData);
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
    const data = (seriesesData.get(r) || []).map(d => ({...d, time: d.time as any}));
    lineRef.current.setData(data);
    chartRef.current.applyOptions({
      timeScale: { tickMarkFormatter: () => "" },
    });
    chartRef.current.timeScale().fitContent();
  };

  const attrs = {
    level2: true,
    shortable: true,
    marginable: true,
    hardToBorrow: false,
    options: true,
    fractional: true,
    extendedHours: true,
    "24h": false, // e.g., crypto → true
  } as const;

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <TradeHeaderCompact
        symbol={symbol}
        name={data.name}
        exchange={data.exchange}
        price={data.price}
        change={data.change}
        changePct={data.changePct}
        high={data.high}
        low={data.low}
        volume={data.volume}
        sentinelId="trade-header-sentinel"
      />

      <div id="trade-header-sentinel" className="h-1" />

      <ScrollMiniHeader
        symbol={symbol}
        price={data.price}
        sentinelId="trade-header-sentinel"
      />

      <TopRangeStrip bars={barsForRange} label={rangeLabel(range)} attrs={attrs} />
      <div className="h-px w-full bg-white/10" />

      <div className="mx-4 mt-1">
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
          {currentAboutData && <AboutSection security={currentAboutData} />}
          {currentAboutData && currentAboutData.type === 'etf' && <SectorsSection data={MOCK_VOO_SECTORS} />}
          {currentAboutData && currentAboutData.type === 'etf' && <TopHoldingsSection data={MOCK_VOO_TOP10} />}
          
          {currentAboutData && currentAboutData.type === 'etf' && (
            <AverageAnnualReturn rows={aarRows} inceptionDate={inceptionDate} />
          )}
          
          <TradeHistory
            events={MOCK_VOO_HISTORY}
            initialCount={10}
            hasMore={true}
            onLoadMore={async () => {
              // replace with Firestore/broker fetch later
              return [
                { id: "old-1", type: "BUY", date: "2024-12-10", qty: 3, price: 210.4 },
                { id: "old-2", type: "DIVIDEND", date: "2024-11-30", amount: 8.12 },
              ];
            }}
          />

          {currentAboutData && <AnalystRating label="Strong buy" />}
      </div>
    </main>
  );
}

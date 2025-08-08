// components/AnalystRating.tsx
"use client";
import { useEffect, useState } from "react";
import { httpsCallable, getFunctions } from "firebase/functions";
import { app } from "@/lib/firebase";

type Data = {
  strongBuy: number; buy: number; hold: number; sell: number; strongSell: number;
  asOf?: string | null;
};

const COLORS = ["#4F0F99","#3E179F","#2C1FA7","#2632AF","#2B52BA",
                "#2E74C6","#3199D2","#39BED9","#40E2E0","#45ECCB"];

function labelFrom(score: number) {
  if (score <= -4) return "Strong sell";
  if (score <  -1) return "Sell";
  if (score <=  1) return "Neutral";
  if (score <   4) return "Buy";
  return "Strong buy";
}

function Gauge({ pct }: { pct: number }) {
  const w = 280, h = 150, cx = 140, cy = 140, r = 105, sw = 14;
  const C = 2 * Math.PI * r, half = C / 2, off = C / 4;
  const ang = -90 + pct * 180, rad = (Math.PI / 180) * ang;
  const nx = cx + Math.cos(rad) * 82, ny = cy + Math.sin(rad) * 82;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id="arc" x1="0%" y1="0%" x2="100%" y2="0%">
          {COLORS.map((c, i) => (
            <stop key={i} offset={`${(i/(COLORS.length-1))*100}%`} stopColor={c} />
          ))}
        </linearGradient>
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={sw}
        strokeDasharray={`${half} ${C}`} strokeDashoffset={off} transform={`rotate(180 ${cx} ${cy})`} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#arc)" strokeWidth={sw}
        strokeDasharray={`${half * pct} ${C}`} strokeDashoffset={off} transform={`rotate(180 ${cx} ${cy})`} />
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="white" strokeWidth={2} />
    </svg>
  );
}

export default function AnalystRating({
  symbol, type, holdings, // holdings only if ETF (optional)
}: {
  symbol: string;
  type: "stock" | "etf";
  holdings?: { symbol: string; weight: number }[];
}) {
  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    // This is a placeholder for fetching data. In a real app, you would
    // want to handle loading and error states. This example will not
    // show anything until data is "fetched" and will not handle errors.
    const functions = getFunctions(app);
    const fn = httpsCallable(functions, "getAnalystRating");
    fn({ symbol, type, holdings }).then((r: any) => setData(r.data ?? r)).catch(console.error);
  }, [symbol, type, holdings]);

  if (!data) return null; // Or return a loading skeleton

  const buy = (data.strongBuy || 0) + (data.buy || 0);
  const neutral = data.hold || 0;
  const sell = (data.strongSell || 0) + (data.sell || 0);

  const score =
    2 * (data.strongBuy || 0) +
    (data.buy || 0) -
    (data.hold || 0) -
    (data.sell || 0) -
    2 * (data.strongSell || 0);

  const pct = Math.max(0, Math.min(1, (score + 8) / 16));
  const text = labelFrom(score);

  return (
    <section className="mt-6 border-t border-white/10 pt-4">
      <h3 className="text-base font-semibold">Analyst rating</h3>

      <div className="mt-2 flex flex-col items-center">
        <Gauge pct={pct} />
        <div className="mt-1 text-lg font-semibold">{text}</div>
        <div className="mt-1 text-sm">
          <span className="tabular-nums">{buy}</span> Buy&nbsp;&nbsp;|&nbsp;&nbsp;
          <span className="tabular-nums">{neutral}</span> Neutral&nbsp;&nbsp;|&nbsp;&nbsp;
          <span className="tabular-nums">{sell}</span> Sell
        </div>
        {data.asOf && (
          <div className="mt-2 text-xs text-white/60">As of {data.asOf}</div>
        )}
      </div>
    </section>
  );
}

// components/AnalystRating.tsx
"use client";
type Props = { data?: { buy: number; neutral: number; sell: number } };

const COLORS = [
  "#4F0F99","#3E179F","#2C1FA7","#2632AF","#2B52BA",
  "#2E74C6","#3199D2","#39BED9","#40E2E0","#45ECCB",
];

function labelFor(pct: number) {
  if (pct <= 0.2) return "Strong sell";
  if (pct <  0.4) return "Sell";
  if (pct <= 0.6) return "Neutral";
  if (pct <  0.8) return "Buy";
  return "Strong buy";
}

export default function AnalystRating({ data }: Props) {
  const d = data ?? { buy: 15, neutral: 10, sell: 3 }; // dummy defaults
  const total = Math.max(1, d.buy + d.neutral + d.sell);
  const pct = Math.min(1, Math.max(0, 0.5 + (d.buy - d.sell) / (2 * total)));
  const label = labelFor(pct);

  return (
    <section className="mt-6 border-t border-white/10 pt-4">
      <h3 className="text-base font-semibold">Analyst rating</h3>

      {/* Bar */}
      <div className="mt-3">
        <svg className="w-full" viewBox="0 0 640 48" preserveAspectRatio="none" aria-label="Analyst rating">
          <defs>
            <linearGradient id="ar-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              {COLORS.map((c, i) => (
                <stop key={i} offset={`${(i / (COLORS.length - 1)) * 100}%`} stopColor={c} />
              ))}
            </linearGradient>
          </defs>
          {/* track */}
          <rect x="0" y="16" width="640" height="16" rx="8" fill="url(#ar-grad)" opacity="0.9" />
          {/* needle */}
          <line
            x1={640 * pct}
            x2={640 * pct}
            y1="8"
            y2="40"
            stroke="white"
            strokeWidth="2"
          />
          <circle cx={640 * pct} cy="8" r="3" fill="white" />
        </svg>
      </div>

      {/* Label + counts */}
      <div className="mt-2 flex flex-col items-center gap-1">
        <div className="text-lg font-semibold">{label}</div>
        <div className="text-sm">
          <span className="tabular-nums">{d.sell}</span> Sell&nbsp;&nbsp;|&nbsp;&nbsp;
          <span className="tabular-nums">{d.neutral}</span> Neutral&nbsp;&nbsp;|&nbsp;&nbsp;
          <span className="tabular-nums">{d.buy}</span> Buy
        </div>
        <div className="text-xs text-white/50">Dummy data</div>
      </div>
    </section>
  );
}

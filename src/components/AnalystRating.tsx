// components/AnalystRating.tsx
"use client";

type RatingLabel = "Strong sell" | "Sell" | "Neutral" | "Buy" | "Strong buy";

export default function AnalystRating({
  label,
  score, // 0..1, optional if label provided
}: {
  label?: RatingLabel;
  score?: number;
}) {
  const COLORS = ["#4F0F99","#3E179F","#2C1FA7","#2632AF","#2B52BA","#2E74C6","#3199D2","#39BED9","#40E2E0","#45ECCB"];

  const pctFromLabel = (l: RatingLabel) =>
    l === "Strong sell" ? 0.05 :
    l === "Sell"       ? 0.25 :
    l === "Neutral"    ? 0.50 :
    l === "Buy"        ? 0.75 : 0.95;

  const pct = Math.max(0, Math.min(1, score ?? (label ? pctFromLabel(label) : 0.75)));
  const display = label ?? (pct <= .1 ? "Strong sell" : pct < .4 ? "Sell" : pct <= .6 ? "Neutral" : pct < .9 ? "Buy" : "Strong buy");

  // gauge geometry
  const w = 280, h = 160, cx = 140, cy = 140, r = 105, sw = 14;
  const C = 2 * Math.PI * r, half = C / 2, off = C / 4;
  const ang = -90 + pct * 180, rad = (Math.PI/180) * ang;
  const nx = cx + Math.cos(rad) * 82, ny = cy + Math.sin(rad) * 82;

  return (
    <section className="mt-6">
      <h3 className="text-base font-semibold">Analyst rating</h3>

      <div className="mt-2 flex flex-col items-center">
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
          <defs>
            <linearGradient id="ar-arc" x1="0%" y1="0%" x2="100%" y2="0%">
              {COLORS.map((c,i)=>(
                <stop key={i} offset={`${(i/(COLORS.length-1))*100}%`} stopColor={c}/>
              ))}
            </linearGradient>
          </defs>

          {/* track */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,.08)" strokeWidth={sw}
                  strokeDasharray={`${half} ${C}`} strokeDashoffset={off}
                  transform={`rotate(180 ${cx} ${cy})`} />
          {/* value arc */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#ar-arc)" strokeWidth={sw}
                  strokeDasharray={`${half * pct} ${C}`} strokeDashoffset={off}
                  transform={`rotate(180 ${cx} ${cy})`} />
          {/* needle */}
          <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="white" strokeWidth={2} />
        </svg>

        {/* ends */}
        <div className="flex w-full max-w-xs justify-between text-xs text-white/70">
          <span>Strong sell</span>
          <span>Strong buy</span>
        </div>

        {/* big label */}
        <div
          className="mt-1 text-2xl font-semibold bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg,#4F0F99 0%,#3E179F 12%,#2C1FA7 24%,#2632AF 36%,#2B52BA 48%,#2E74C6 60%,#3199D2 72%,#39BED9 84%,#40E2E0 92%,#45ECCB 100%)",
          }}
        >
          {display}
        </div>
      </div>
    </section>
  );
}
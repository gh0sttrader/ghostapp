
// components/SectorsSection.tsx
"use client";
type Sector = { name: string; weight: number };

const PALETTE = ["#44c6ff", "#8b77ff", "#ff79c6", "#ffb84d", "#24d38a", "#ffd166"];

export default function SectorsSection({ data }: { data: Sector[] }) {
  const total = Math.max(1, data.reduce((s, d) => s + d.weight, 0));
  const size = 220, cx = size / 2, cy = size / 2, r = 80, stroke = 22;
  const C = 2 * Math.PI * r;
  let acc = 0;

  return (
    <section className="mt-6 border-t border-white/10 pt-4">
      <h3 className="text-base font-semibold">Sectors</h3>

      <div className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
        {/* Legend */}
        <ul className="space-y-3">
          {data.map((s, i) => (
            <li key={s.name} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: PALETTE[i % PALETTE.length] }} />
                {s.name}
              </span>
              <span className="tabular-nums">{s.weight.toFixed(2)}%</span>
            </li>
          ))}
        </ul>

        {/* Donut */}
        <svg width={size} height={size} aria-label="Sector weights donut">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} />
          {data.map((s, i) => {
            const f = s.weight / total;
            const dasharray = `${f * C} ${C}`;
            const offset = -(acc * C);
            acc += f;
            return (
              <circle
                key={s.name}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={PALETTE[i % PALETTE.length]}
                strokeWidth={stroke}
                strokeLinecap="butt"
                strokeDasharray={dasharray}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            );
          })}
        </svg>
      </div>
    </section>
  );
}

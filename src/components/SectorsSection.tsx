// components/SectorsSection.tsx
"use client";
type Sector = { name: string; weight: number };

const PALETTE = ["#44c6ff", "#8b77ff", "#ff79c6", "#ffb84d", "#24d38a", "#ffd166"];

export default function SectorsSection({ data }: { data: Sector[] }) {
  return (
    <section className="mt-6 border-t border-white/10 pt-4">
      <h3 className="text-base font-semibold">Sectors</h3>
      <ul className="mt-3 space-y-3">
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
    </section>
  );
}

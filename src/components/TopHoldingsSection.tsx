// components/TopHoldingsSection.tsx
"use client";
import { GRADIENT_10 } from "@/constants/palette";

type Holding = { name: string; weight: number };

export default function TopHoldingsSection({
  data,
}: {
  data: Holding[]; // pass exactly 10 (sorted desc)
}) {
  const top10 = data.slice(0, 10);
  const total = top10.reduce((s, h) => s + h.weight, 0);
  const left = top10.slice(0, 5);
  const right = top10.slice(5, 10);

  const Cell = ({ h, i }: { h: Holding; i: number }) => (
    <div className="flex items-start gap-2">
      <span
        className="mt-1 h-3 w-3 rounded-[4px]"
        style={{ backgroundColor: GRADIENT_10[i % GRADIENT_10.length] }}
      />
      <div className="flex-1">
        <div className="text-[15px] leading-5">{h.name}</div>
        <div className="tabular-nums text-sm text-white/70">{h.weight.toFixed(2)}%</div>
      </div>
    </div>
  );

  return (
    <section className="mt-6 border-t border-white/10 pt-4">
      <h3 className="text-base font-semibold">Top 10 Holdings</h3>
      <div className="mt-1 text-sm text-white/70">
        {total.toFixed(2)}% of total assets
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-5">
        <div className="space-y-5">
          {left.map((h, i) => <Cell key={h.name} h={h} i={i} />)}
        </div>
        <div className="space-y-5">
          {right.map((h, i) => <Cell key={h.name} h={h} i={i + 5} />)}
        </div>
      </div>
    </section>
  );
}

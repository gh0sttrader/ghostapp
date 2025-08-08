// components/TopHoldingsSection.tsx
"use client";

type Holding = { name: string; weight: number };

const PALETTE = ["#7cc3ff","#a59bff","#ff9bd4","#ffd27a","#4de0a3",
                 "#ffd166","#8bd3ff","#c3b9ff","#ffb2e1","#ffe09e"];

export default function TopHoldingsSection({
  data,
  asOf, // e.g., "Jun 30, 2025"
}: {
  data: Holding[]; // pass exactly 10 (sorted desc)
  asOf?: string;
}) {
  const top10 = data.slice(0, 10);
  const total = top10.reduce((s, h) => s + h.weight, 0);
  const left = top10.slice(0, 5);
  const right = top10.slice(5, 10);

  const Cell = ({ h, i }: { h: Holding; i: number }) => (
    <div className="flex items-start gap-2">
      <span className="mt-1 h-3 w-3 rounded-[4px]" style={{ backgroundColor: PALETTE[i % PALETTE.length] }} />
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
        {total.toFixed(2)}% of total assets{asOf ? <span className="ml-2">• As of {asOf}</span> : null}
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

// components/AverageAnnualReturn.tsx
"use client";
import { differenceInDays, format } from "date-fns";

type Row = { label: string; subLabel?: string; price: string; nav: string };
type Props = {
  rows: Row[];                // includes the "Since"/"Inception" row
  inceptionDate: string;      // ISO or any Date-parsable string, e.g. "2010-09-07"
};

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function AverageAnnualReturn({ rows, inceptionDate }: Props) {
  // find CAGR from the "Since"/"Inception" row (use % price return)
  const sinceRow = rows.find(r => r.label === "Since" || r.label === "Inception");
  const cagr = sinceRow ? parseFloat(sinceRow.price.replace("%","")) / 100 : 0;

  // years since inception (fractional)
  const inc = new Date(inceptionDate);
  const years = Math.max(0, differenceInDays(new Date(), inc) / 365.25);

  // 10k compounded at CAGR
  const atInception = Math.round(10000 * Math.pow(1 + cagr, years));

  return (
    <section className="mt-6 border-t border-white/10 pt-4">
      <h3 className="mb-3 text-base font-semibold">Average annual return</h3>

      <div className="grid grid-cols-[80px_1fr_1fr] items-baseline text-[14px] text-white/60">
        <div></div>
        <div className="text-right">% price return</div>
        <div className="text-right">% NAV return</div>
      </div>

      <div className="mt-2 space-y-3 text-sm">
        {rows.map((r) => {
          const isSince = r.label === "Since" || r.label === "Inception";
          const label = isSince ? "Inception" : r.label;
          const sub = isSince ? format(new Date(inceptionDate), "MM.dd.yyyy") : r.subLabel;

          return (
            <div key={r.label} className="grid grid-cols-[80px_1fr_1fr] items-baseline">
              <div>
                <div className="font-medium">{label}</div>
                {sub && <div className="text-[12px] text-white/60">{sub}</div>}
              </div>
              <div className="tabular-nums text-right">{r.price}</div>
              <div className="tabular-nums text-right">{r.nav}</div>
            </div>
          );
        })}
      </div>

      {/* footer: $10,000 at inception */}
      <div className="mt-4 h-px w-full bg-white/10" />
      <div className="mt-2 flex items-baseline justify-between text-sm">
        <span className="text-white/70">$10,000 at inception</span>
        <span className="tabular-nums font-semibold">{usd.format(atInception)}</span>
      </div>
    </section>
  );
}

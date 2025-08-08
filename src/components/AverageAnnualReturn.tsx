// components/AverageAnnualReturn.tsx
"use client";

type Row = {
  period: "1Y" | "3Y" | "5Y" | "10Y" | "Since";
  price?: number | null;
  nav?: number | null;
  sinceDate?: string; // only for "Since"
};

export default function AverageAnnualReturn({
  rows,
}: { rows: Row[]}) {
  const fmt = (n?: number | null) =>
    typeof n === "number" ? n.toFixed(2) + "%" : "—";

  return (
    <section className="mt-6 border-t border-white/10 pt-4">
      <h3 className="text-base font-semibold">Average annual return</h3>

      {/* main surface only */}
      <div className="mt-3">
        <table className="w-full text-sm border-collapse bg-transparent">
          <thead className="text-white/60">
            <tr>
              <th className="px-4 py-3 text-left font-medium"> </th>
              <th className="px-4 py-3 text-right font-medium">% price return</th>
              <th className="px-4 py-3 text-right font-medium">% NAV return</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.period} className="bg-transparent">
                <td className="px-4 py-3 align-top bg-transparent">
                  <div className="leading-5">{r.period}</div>
                  {r.period === "Since" && r.sinceDate && (
                    <div className="text-xs text-white/50">{r.sinceDate}</div>
                  )}
                </td>
                <td className="px-4 py-3 text-right tabular-nums bg-transparent">
                  {fmt(r.price)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums bg-transparent">
                  {fmt(r.nav)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </section>
  );
}

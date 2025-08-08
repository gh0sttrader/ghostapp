// components/TradeHistory.tsx
"use client";

type EventType = "BUY" | "SELL" | "DIVIDEND" | "SPLIT";
type Event = {
  id: string;
  type: EventType;
  date: string;          // ISO string
  qty?: number;
  price?: number;        // per-share
  amount?: number;       // cash impact (+dividend, +sell, -buy)
  note?: string;
};

const dot = (t: EventType) =>
  t === "BUY" ? "#45ECCB" : t === "SELL" ? "#4F0F99" : t === "DIVIDEND" ? "#39BED9" : "#2E74C6";

const money = (n: number | undefined) =>
  typeof n === "number" ? `$${n.toFixed(2)}` : "—";

export default function TradeHistory({ events }: { events: Event[] }) {
  const data = [...events].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 10);

  return (
    <section className="mt-8">
      <h3 className="text-base font-semibold">History</h3>
      <ul className="mt-3 divide-y divide-white/10">
        {data.map((e) => {
          const title =
            e.type === "BUY"
              ? `Buy ${e.qty ?? "—"} @ ${money(e.price)}`
              : e.type === "SELL"
              ? `Sell ${e.qty ?? "—"} @ ${money(e.price)}`
              : e.type === "DIVIDEND"
              ? "Dividend"
              : "Split / Corporate action";

          const right =
            e.type === "BUY"
              ? money(-(e.qty ?? 0) * (e.price ?? 0))
              : e.type === "SELL"
              ? money((e.qty ?? 0) * (e.price ?? 0))
              : money(e.amount);

          const rightColor =
            e.type === "BUY" ? "text-red-400" : e.type === "SELL" ? "text-emerald-400" : "text-white/80";

          return (
            <li key={e.id} className="flex items-start gap-3 py-3">
              <span className="mt-1 h-3 w-3 rounded-full" style={{ backgroundColor: dot(e.type) }} />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex w-full items-baseline justify-between gap-3">
                  <p className="truncate text-sm">{title}</p>
                  <p className={`shrink-0 tabular-nums text-sm ${rightColor}`}>{right}</p>
                </div>
                <p className="mt-0.5 text-xs text-white/60">
                  {new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  {e.note ? ` • ${e.note}` : ""}
                </p>
              </div>
            </li>
          );
        })}
        {data.length === 0 && <li className="py-3 text-sm text-white/60">No history yet.</li>}
      </ul>
    </section>
  );
}

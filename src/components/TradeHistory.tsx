// components/TradeHistory.tsx
"use client";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type EventType = "BUY" | "SELL" | "DIVIDEND" | "SPLIT";
export type TradeEvent = {
  id: string;
  type: EventType;
  date: string;         // ISO
  qty?: number;
  price?: number;       // per-share
  amount?: number;      // cash impact
  note?: string;
};

const dot = (t: EventType) =>
  t === "BUY" ? "#45ECCB" : t === "SELL" ? "#4F0F99" : t === "DIVIDEND" ? "#39BED9" : "#2E74C6";
const money = (n?: number) => (typeof n === "number" ? `$${n.toFixed(2)}` : "—");

function Row({ e }: { e: TradeEvent }) {
  const title =
    e.type === "BUY" ? `Buy ${e.qty ?? "—"} @ ${money(e.price)}`
    : e.type === "SELL" ? `Sell ${e.qty ?? "—"} @ ${money(e.price)}`
    : e.type === "DIVIDEND" ? "Dividend"
    : "Split / Corporate action";

  const right =
    e.type === "BUY" ? money(-(e.qty ?? 0) * (e.price ?? 0))
    : e.type === "SELL" ? money((e.qty ?? 0) * (e.price ?? 0))
    : money(e.amount);

  const rightColor =
    e.type === "BUY" ? "text-red-400" : e.type === "SELL" ? "text-emerald-400" : "text-white/80";

  return (
    <li className="flex items-start gap-3 py-3">
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
}

export default function TradeHistory({
  events,
  initialCount = 10,
  hasMore = false,
  onLoadMore, // async: fetch older events
}: {
  events: TradeEvent[];
  initialCount?: number;
  hasMore?: boolean;
  onLoadMore?: () => Promise<TradeEvent[]>;
}) {
  const base = useMemo(
    () => [...events].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [events]
  );
  const [all, setAll] = useState<TradeEvent[]>(base);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const top = all.slice(0, initialCount);
  const extra = all.slice(initialCount);
  const showToggle = hasMore || all.length > initialCount;

  const toggle = async () => {
    if (!expanded && hasMore && onLoadMore) {
      setLoading(true);
      try {
        const older = await onLoadMore();
        setAll((prev) =>
          [...prev, ...older].sort((a, b) => +new Date(b.date) - +new Date(a.date))
        );
      } finally {
        setLoading(false);
      }
    }
    setExpanded((v) => !v);
  };

  return (
    <section className="mt-8">
      <h3 className="text-base font-semibold">History</h3>

      <ul className="mt-3 divide-y divide-white/10">
        {top.map((e) => <Row key={e.id} e={e} />)}
        {top.length === 0 && <li className="py-3 text-sm text-white/60">No history yet.</li>}
      </ul>

      {showToggle && (
        <>
          <button
            onClick={toggle}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm hover:border-white/20 disabled:opacity-50"
            disabled={loading}
            aria-expanded={expanded}
          >
            {expanded ? <>Hide history <ChevronUp className="h-4 w-4" /></> : <>Show more history <ChevronDown className="h-4 w-4" /></>}
          </button>

          {expanded && (
            <ul className="mt-2 divide-y divide-white/10">
              {extra.map((e) => <Row key={e.id} e={e} />)}
            </ul>
          )}
        </>
      )}
    </section>
  );
}
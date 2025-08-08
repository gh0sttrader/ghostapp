// components/TradeHistory.tsx
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type EventType = "BUY" | "SELL" | "DIVIDEND" | "SPLIT";
export type TradeEvent = {
  id: string; type: EventType; date: string;
  qty?: number; price?: number; amount?: number; note?: string;
};

const dedupe = (arr: TradeEvent[]) => Array.from(new Map(arr.map(e => [e.id, e])).values());

function Row({ e }: { e: TradeEvent }) {
  const money = (n?: number) => (typeof n === "number" ? `$${n.toFixed(2)}` : "—");

  const title =
    e.type === "BUY"
      ? `Buy ${e.qty ?? "—"} @ ${money(e.price)}`
      : e.type === "SELL"
      ? `Sell ${e.qty ?? "—"} @ ${money(e.price)}`
      : e.type === "DIVIDEND"
      ? "Dividend"
      : "Split / Corporate action";

  const amount =
    e.type === "BUY"
      ? -(e.qty ?? 0) * (e.price ?? 0)
      : e.type === "SELL"
      ? (e.qty ?? 0) * (e.price ?? 0)
      : e.amount;

  const rightColor =
    (e.type === "BUY" && "text-red-400") ||
    (e.type === "SELL" && "text-emerald-400") ||
    "text-white/80";

  return (
    <li className="flex items-start justify-between py-3">
      <div className="min-w-0">
        <p className="truncate text-sm">{title}</p>
        <p className="mt-0.5 text-xs text-white/60">
          {new Date(e.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          {e.note ? ` • ${e.note}` : ""}
        </p>
      </div>
      <p className={`shrink-0 tabular-nums text-sm ${rightColor}`}>
        {typeof amount === "number" ? money(amount) : "—"}
      </p>
    </li>
  );
}


export default function TradeHistory({
  events, initialCount = 10, hasMore = false, onLoadMore,
}: {
  events: TradeEvent[];
  initialCount?: number;
  hasMore?: boolean;
  onLoadMore?: () => Promise<TradeEvent[]>;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const sorted = useMemo(
    () => [...events].sort((a, b) => +new Date(b.date) - +new Date(a.date)),
    [events]
  );

  const [all, setAll] = useState<TradeEvent[]>(sorted);
  const [expanded, setExpanded] = useState(false);
  const [loadedMore, setLoadedMore] = useState(false);

  // keep in sync with parent updates
  useEffect(() => setAll(sorted), [sorted]);

  // scroll AFTER collapsing render
  useEffect(() => {
    if (!expanded) {
      // Small delay to allow the DOM to update before scrolling
      const timer = setTimeout(() => {
        rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [expanded]);

  const handleToggle = async () => {
    if (!expanded && hasMore && onLoadMore && !loadedMore) {
      const older = await onLoadMore();
      setAll(prev =>
        dedupe([...prev, ...older]).sort((a, b) => +new Date(b.date) - +new Date(a.date))
      );
      setLoadedMore(true);
    }
    setExpanded(v => !v);
  };

  const visible = expanded ? all : all.slice(0, initialCount);

  return (
    <section ref={rootRef} className="mt-8 scroll-mt-20">
      <h3 className="text-base font-semibold">History</h3>

      <ul className="mt-3 divide-y divide-white/10">
        {visible.map(e => <Row key={e.id} e={e} />)}
        {visible.length === 0 && <li className="py-3 text-sm text-white/60">No history yet.</li>}
      </ul>

      {(hasMore || all.length > initialCount) && (
        <div className="mt-3 flex justify-center">
          <button
            onClick={handleToggle}
            aria-expanded={expanded}
            className="flex items-center gap-1 text-sm text-white/70 hover:text-white"
          >
            History
            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      )}
    </section>
  );
}

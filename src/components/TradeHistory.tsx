// components/TradeHistory.tsx
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type EventType = "BUY" | "SELL" | "DIVIDEND" | "SPLIT";
export type TradeEvent = {
  id: string; type: EventType; date: string;
  qty?: number; price?: number; amount?: number; note?: string;
};

const dot = (t: EventType) =>
  t === "BUY" ? "#45ECCB" : t === "SELL" ? "#4F0F99" : t === "DIVIDEND" ? "#39BED9" : "#2E74C6";
const money = (n?: number) => (typeof n === "number" ? `$${n.toFixed(2)}` : "—");
const dedupe = (arr: TradeEvent[]) => {
  const m = new Map<string, TradeEvent>();
  for (const e of arr) m.set(e.id, e);
  return [...m.values()];
};

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

  const rightColor = e.type === "BUY" ? "text-red-400"
    : e.type === "SELL" ? "text-emerald-400"
    : "text-white/80";

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

  useEffect(() => setAll(sorted), [sorted]);

  const handleToggle = async () => {
    if (!expanded && hasMore && onLoadMore && !loadedMore) {
      const older = await onLoadMore();
      setAll(prev =>
        dedupe([...prev, ...older]).sort((a, b) => +new Date(b.date) - +new Date(a.date))
      );
      setLoadedMore(true);
    }
    // if collapsing, scroll back to section top after DOM shrinks
    if (expanded) {
      setExpanded(false);
      requestAnimationFrame(() => {
        rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      setExpanded(true);
    }
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
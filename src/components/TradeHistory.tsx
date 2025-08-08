// components/TradeHistory.tsx
"use client";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

type EventType = "BUY" | "SELL" | "DIVIDEND" | "SPLIT";
type Event = {
  id: string;
  type: EventType;
  date: string;           // ISO
  qty?: number;
  price?: number;         // per-share
  amount?: number;        // cash impact
  note?: string;
};

const dot = (t: EventType) =>
  t === "BUY" ? "#45ECCB" : t === "SELL" ? "#4F0F99" : t === "DIVIDEND" ? "#39BED9" : "#2E74C6";
const money = (n?: number) => (typeof n === "number" ? `$${n.toFixed(2)}` : "—");

function Row({ e }: { e: Event }) {
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
}: {
  events: Event[];
  initialCount?: number;
}) {
  const sorted = [...events].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const top = sorted.slice(0, initialCount);
  const extra = sorted.slice(initialCount);

  return (
    <section className="mt-8">
      <h3 className="text-base font-semibold">History</h3>

      <ul className="mt-3 divide-y divide-white/10">
        {top.map((e) => <Row key={e.id} e={e} />)}
        {top.length === 0 && <li className="py-3 text-sm text-white/60">No history yet.</li>}
      </ul>

      {extra.length > 0 && (
        <Collapsible.Root>
          <Collapsible.Trigger
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm hover:border-white/20"
          >
            <span className="data-[state=open]:hidden">Show more history</span>
            <span className="hidden data-[state=open]:inline">Hide history</span>
            <ChevronDown className="h-4 w-4 data-[state=open]:hidden" />
            <ChevronUp className="hidden h-4 w-4 data-[state=open]:block" />
          </Collapsible.Trigger>

          <Collapsible.Content className="mt-2">
            <ul className="divide-y divide-white/10">
              {extra.map((e) => <Row key={e.id} e={e} />)}
            </ul>
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </section>
  );
}
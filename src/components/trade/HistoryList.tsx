import HistoryRow, { HistoryKind } from "./HistoryRow";

type Item = { kind: HistoryKind; date: string; label: string; amount: number };

export default function HistoryList({ items }: { items: Item[] }) {
  return (
    <section aria-labelledby="history-title" className="mt-8">
      <h2 id="history-title" className="text-base font-semibold mb-2">
        History
      </h2>
      <div className="rounded-xl overflow-hidden bg-black/0">
        {items.map((it, i) => (
          <HistoryRow key={i} {...it} />
        ))}
      </div>
    </section>
  );
}

// quick dummy data for wiring
export const DUMMY_HISTORY: Item[] = [
  { kind: "BUY", date: "2025-07-14", label: "Buy 5 @ $230.12", amount: -1150.6 },
  { kind: "DIVIDEND", date: "2025-06-30", label: "Dividend", amount: 12.34 },
  { kind: "SELL", date: "2025-06-19", label: "Sell 2 @ $235.50", amount: 471.0 },
  { kind: "CORP_ACTION", date: "2025-06-09", label: "Split / Index rebalancing", amount: 0 },
];

import HistoryRow, { HistoryKind } from "./HistoryRow";

type Item = { kind: HistoryKind; date: string; amount: number };

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

// Dummy examples (now no label text is needed)
export const DUMMY_HISTORY: Item[] = [
  { kind: "BUY",        date: "2025-07-13", amount: -1150.60 },
  { kind: "DIVIDEND",   date: "2025-06-29", amount: 12.34 },
  { kind: "SELL",       date: "2025-06-18", amount: 471.00 },
  { kind: "CORP_ACTION",date: "2025-06-08", amount: 0.00 },
];

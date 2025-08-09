"use client";
import { format } from "date-fns";

export type HistoryKind = "BUY" | "SELL" | "DIVIDEND" | "CORP_ACTION";

export default function HistoryRow({
  kind,
  date,          // ISO string
  label,         // e.g. "Buy 5 @ $230.12"
  amount,        // negative for Buy/outflow
}: {
  kind: HistoryKind;
  date: string;
  label: string;
  amount: number;
}) {
  const dateText = format(new Date(date), "MMM d, yyyy");
  const GREEN = "#04cf7a";
  const isOutflow = amount < 0 || kind === "BUY";
  const amountText =
    (isOutflow ? "- " : "") +
    Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      Math.abs(amount)
    );

  return (
    <div className="w-full">
      <div className="grid grid-cols-[92px,1fr,auto] items-center gap-3 py-3 min-h-11">
        <time className="text-sm text-white/70">{dateText}</time>
        <div className="text-base text-white">{label}</div>
        <div
          className={`text-base tabular-nums ${
            isOutflow ? "text-white/90" : ""
          }`}
          style={!isOutflow ? { color: GREEN } : undefined}
        >
          {amountText}
        </div>
      </div>
      <div className="h-px bg-white/10" />
    </div>
  );
}

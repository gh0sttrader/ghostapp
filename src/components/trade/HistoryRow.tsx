"use client";
import { format } from "date-fns";

export type HistoryKind = "BUY" | "SELL" | "DIVIDEND" | "CORP_ACTION";

export default function HistoryRow({
  kind,
  date,          // ISO string
  amount,        // negative for outflow
}: {
  kind: HistoryKind;
  date: string;
  amount: number;
}) {
  const actionLabel =
    kind === "BUY"
      ? "Buy"
      : kind === "SELL"
      ? "Sell"
      : kind === "DIVIDEND"
      ? "Dividend"
      : "Split"; // treat corp actions here as "Split"

  // Single-line date like 07-13-2025
  const dateText = format(new Date(date), "MM-dd-yyyy");

  // Styling rules you set earlier
  const GREEN = "#04cf7a";
  const isOutflow = amount < 0 || kind === "BUY";
  const amountText =
    (isOutflow ? "- " : "") +
    Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
      Math.abs(amount)
    );

  return (
    <div className="w-full">
      {/* 3 columns: date | action | amount */}
      <div className="grid grid-cols-[110px,1fr,auto] items-center gap-3 py-3 min-h-11">
        <time className="text-sm text-white/70 whitespace-nowrap">{dateText}</time>
        <div className="text-base text-white">{actionLabel}</div>
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

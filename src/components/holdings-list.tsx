// components/HoldingsList.tsx
"use client";
import React from "react";
import HoldingsTable from "@/components/holdings/HoldingsTable";

export function HoldingsList() {
  const positions = [
    { symbol: "IYW", marketValue: 3125.18 },
    { symbol: "ARKB", marketValue: 987.42 },
    { symbol: "IBIT", marketValue: 756.31 },
    { symbol: "AAPL", marketValue: 6313.09 },
  ];

  return (
    <section className="mt-6">
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-[18px] font-semibold text-white">Holdings</h2>
      </div>
      <HoldingsTable holdings={positions} />
    </section>
  );
}

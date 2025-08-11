// components/HoldingsList.tsx
"use client";
import React from "react";
import HoldingsTable from "@/components/holdings/HoldingsTable";

export function HoldingsList() {
  const positions = [
    { symbol: "IYW", marketValue: 3125.18, allocationPct: 27.95 },
    { symbol: "ARKB", marketValue: 987.42, allocationPct: 8.83 },
    { symbol: "IBIT", marketValue: 756.31, allocationPct: 6.76 },
    { symbol: "AAPL", marketValue: 6313.09, allocationPct: 56.46 },
  ];

  const sortedPositions = [...positions].sort((a, b) => b.allocationPct - a.allocationPct);

  return (
    <section className="mt-6">
      <HoldingsTable holdings={sortedPositions} />
    </section>
  );
}

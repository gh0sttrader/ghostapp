// src/components/TradeQuickBar.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function TradeQuickBar({
  symbol,                       // unused for now
  accountName = "Individual",
  onToggle,                     // stub for later
}: {
  symbol: string;
  accountName?: string;
  onToggle?: () => void;
}) {
  useEffect(() => {
    document.body.classList.add("has-trade-quick");
    return () => document.body.classList.remove("has-trade-quick");
  }, []);

  return (
    <div
      data-quickbar
      className="fixed inset-x-0 z-40 bg-black"
      style={{ bottom: "var(--nav-h)", height: "var(--overlay-h)" }}
    >
      <div className="h-full w-full px-4 flex items-center">
        {/* LEFT 50% — account selector */}
        <div className="basis-1/2 flex items-center justify-center">
          <button
            onClick={onToggle}
            className="h-11 px-2 bg-transparent text-white/90 text-[15px] font-semibold
                       flex items-center gap-1.5 focus:outline-none"
            aria-label="Switch account"
          >
            <span>{accountName}</span>
            <ChevronDown className="h-4 w-4 text-white/60" />
          </button>
        </div>

        {/* RIGHT 50% — Trade label (UI only, no action) */}
        <div className="basis-1/2 flex items-center justify-center">
          <div
            className="h-11 px-2 text-white/90 text-[15px] font-semibold
                       flex items-center gap-1.5 select-none cursor-default"
            aria-disabled="true"
          >
            <span>Trade</span>
            <ChevronDown className="h-4 w-4 text-white/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
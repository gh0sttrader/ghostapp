
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, ArrowDownRight, TrendingDown } from "lucide-react";

export default function TradeActionBar({ symbol }: { symbol: string }) {
  const r = useRouter();
  const go = (side: "buy" | "sell" | "short") =>
    r.push(`/order?symbol=${encodeURIComponent(symbol)}&side=${side}`);

  // add bottom padding while the bar is mounted
  useEffect(() => {
    document.body.classList.add("has-trade-bar");
    return () => document.body.classList.remove("has-trade-bar");
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10
                 bg-black/95 pb-[env(safe-area-inset-bottom)]
                 backdrop-blur supports-[backdrop-filter]:bg-black/80"
      style={{ height: "var(--nav-h)" }}
    >
      <div className="h-full w-full px-3 flex items-center gap-2">
        <button
          onClick={() => go("buy")}
          className="flex-1 h-[calc(var(--nav-h)-12px)] rounded-xl
                     bg-[#04cf7a] text-black font-semibold
                     flex items-center justify-center gap-2 active:opacity-90"
        >
          <ArrowUpRight className="h-4 w-4" /> Buy
        </button>

        <button
          onClick={() => go("sell")}
          className="flex-1 h-[calc(var(--nav-h)-12px)] rounded-xl
                     bg-[#ce0d0c] text-white font-semibold
                     flex items-center justify-center gap-2 active:opacity-90"
        >
          <ArrowDownRight className="h-4 w-4" /> Sell
        </button>

        <button
          onClick={() => go("short")}
          className="flex-1 h-[calc(var(--nav-h)-12px)] rounded-xl
                     bg-[#2C1FA7] text-white font-semibold
                     flex items-center justify-center gap-2 active:opacity-90"
        >
          <TrendingDown className="h-4 w-4" /> Short
        </button>
      </div>
    </div>
  );
}

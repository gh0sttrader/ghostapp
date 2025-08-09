"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TradeActionBar({
  symbol,
  rightSlot, // optional future widget (e.g., toggle, menu)
}: {
  symbol: string;
  rightSlot?: React.ReactNode;
}) {
  const r = useRouter();
  const go = (side: "buy" | "sell" | "short") =>
    r.push(`/order?symbol=${encodeURIComponent(symbol)}&side=${side}`);

  useEffect(() => {
    document.body.classList.add("has-trade-bar");
    return () => document.body.classList.remove("has-trade-bar");
  }, []);

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10
                 bg-black/95 pb-[env(safe-area-inset-bottom)]
                 backdrop-blur supports-[backdrop-filter]:bg-black/80"
      style={{ height: "var(--nav-h)" }} // same height as BottomNav
    >
      <div className="h-full w-full px-3 flex items-center gap-3">
        {/* Left 75%: text-only buttons, slightly smaller height */}
        <div className="flex items-center gap-2 flex-[0_0_75%]">
          <button
            onClick={() => go("buy")}
            className="flex-1 h-[36px] rounded-lg bg-[#04cf7a] text-black
                       text-sm font-semibold active:opacity-90"
          >
            Buy
          </button>
          <button
            onClick={() => go("sell")}
            className="flex-1 h-[36px] rounded-lg bg-[#ce0d0c] text-white
                       text-sm font-semibold active:opacity-90"
          >
            Sell
          </button>
          <button
            onClick={() => go("short")}
            className="flex-1 h-[36px] rounded-lg bg-[#2C1FA7] text-white
                       text-sm font-semibold active:opacity-90"
          >
            Short
          </button>
        </div>

        {/* Right 25%: reserved space (kept dark so it feels like one bar) */}
        <div className="flex items-center justify-end flex-[0_0_25%] h-[36px]">
          {rightSlot ?? null}
        </div>
      </div>
    </div>
  );
}

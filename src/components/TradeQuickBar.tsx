
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function TradeQuickBar({
  symbol,
  accountName = "Individual",
  onToggle,                  // optional, wire up later
}: {
  symbol: string;
  accountName?: string;
  onToggle?: () => void;
}) {
  const r = useRouter();
  useEffect(() => {
    document.body.classList.add("has-trade-quick");
    return () => document.body.classList.remove("has-trade-quick");
  }, []);

  return (
    <div
      className="fixed inset-x-0 z-40 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80"
      style={{ bottom: "var(--nav-h)", height: "var(--overlay-h)" }}
    >
      <div className="h-full w-full px-4 flex items-center gap-3">
        {/* Account toggle (placeholder only) */}
        <button
          onClick={onToggle}
          className="h-11 px-1 bg-transparent text-white/90 text-[15px] font-semibold flex items-center gap-1 focus:outline-none focus-visible:ring-0"
          aria-label="Switch account"
        >
          <span>{accountName}</span>
          <ChevronDown className="h-4 w-4 text-white/60" />
        </button>

        {/* Trade CTA (fills remaining width) */}
        <button
          onClick={() => r.push(`/order?symbol=${encodeURIComponent(symbol)}`)}
          className="h-11 flex-1 rounded-full bg-[#04cf7a] text-black font-bold text-[18px]
                     active:opacity-90"
        >
          Trade
        </button>
      </div>
    </div>
  );
}

// src/components/TradeQuickBar.tsx
"use client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTradeAccount } from "@/context/tradeAccount";
import AccountSelectSheet from "@/components/AccountSelectSheet";

export default function TradeQuickBar({ symbol }: { symbol: string }) {
  const { accounts, selectedId, setSelectedId } = useTradeAccount();
  const selected = accounts.find(a => a.id === selectedId);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("has-trade-quick");
    return () => document.body.classList.remove("has-trade-quick");
  }, []);

  if (!selected) return null; // Don't render if selected account not found yet

  return (
    <div
      data-quickbar
      className="fixed inset-x-0 z-40 bg-black"
      style={{ bottom: "var(--nav-h)", height: "var(--overlay-h)" }}
    >
      <div className="h-full w-full px-4 flex items-center">
        {/* left 50%: account selector */}
        <div className="basis-1/2 flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="h-11 px-2 text-white/90 text-[15px] font-semibold flex items-center gap-1.5"
          >
            <span>{selected.name}</span>
            <ChevronDown className="h-4 w-4 text-white/60" />
          </button>
        </div>

        {/* right 50%: Trade label (UI only) */}
        <div className="basis-1/2 flex justify-center">
          <div
            className="h-11 px-2 text-white/90 text-[15px] font-semibold flex items-center gap-1.5 select-none"
            aria-disabled="true"
          >
            <span>Trade</span>
            <ChevronDown className="h-4 w-4 text-white/60" />
          </div>
        </div>
      </div>

      <AccountSelectSheet
        open={open}
        onOpenChange={setOpen}
        accounts={accounts}
        value={selectedId}
        onChange={setSelectedId}
      />
    </div>
  );
}

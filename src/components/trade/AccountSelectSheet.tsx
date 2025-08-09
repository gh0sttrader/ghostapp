// src/components/trade/AccountSelectSheet.tsx
"use client";

import * as React from "react";

type Account = {
  id: string;
  name: string;
  buyingPower: number; // in USD
};

function fmtUSD(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export default function AccountSelectSheet({
  open,
  onOpenChange,
  accounts,
  selectedId,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  accounts: Account[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  if (!open) return null;

  return (
    <>
      {/* blurred + dimmed backdrop */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-md bg-black/45"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />

      {/* bottom sheet */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 rounded-t-3xl bg-black p-4 pb-5 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Select an account"
      >
        <h2 className="text-center text-xl font-semibold mb-3">Select an account</h2>

        <div className="space-y-3">
          {accounts.map((a) => {
            const active = a.id === selectedId;
            return (
              <button
                key={a.id}
                onClick={() => onSelect(a.id)}
                className={[
                  // layout
                  "w-full flex items-center justify-between rounded-2xl px-4 py-4",
                  // visual: fully black, NO outline/ring/shadow
                  "bg-black border-0 ring-0 shadow-none outline-none",
                  "focus:outline-none focus:ring-0 active:opacity-90",
                ].join(" ")}
              >
                <div className="text-left">
                  <div className="text-[17px] leading-5 font-medium text-white">{a.name}</div>

                  {/* subtitle line */}
                  <div className="mt-1 text-[13px] leading-4 text-white/60">Buying power</div>

                  {/* amount */}
                  <div className="mt-0.5 text-[15px] leading-5 text-white/90 tabular-nums">
                    {fmtUSD(a.buyingPower)}
                  </div>
                </div>

                {/* custom radio: white when selected */}
                <span
                  aria-hidden
                  className={[
                    "ml-3 inline-grid h-5 w-5 place-items-center rounded-full",
                    "border border-white/55",
                    active ? "bg-white" : "bg-transparent",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onOpenChange(false)}
          className="mt-4 w-full rounded-2xl bg-white text-black py-3 text-[17px] font-semibold"
        >
          Close
        </button>
      </div>
    </>
  );
}

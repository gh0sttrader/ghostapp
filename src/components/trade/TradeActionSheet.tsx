"use client";

import * as React from "react";

export default function TradeActionSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop (blur + dim) */}
      <div
        className="fixed inset-0 z-[60] backdrop-blur-md bg-black/45"
        onClick={() => onOpenChange(false)}
        aria-hidden
      />

      {/* Bottom sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Trade actions"
        className={[
          "fixed inset-x-0 bottom-0 z-[61] bg-black",
          "rounded-t-3xl p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl",
        ].join(" ")}
      >
        <div className="mx-auto w-full max-w-md">
          <div className="space-y-3">
            {/* White pill buttons — non-functional */}
            <button
              type="button"
              className="w-full rounded-full bg-white text-black py-4 text-[17px] font-semibold hover:bg-neutral-200 active:bg-neutral-300 transition"
            >
              Buy
            </button>
            <button
              type="button"
              className="w-full rounded-full bg-white text-black py-4 text-[17px] font-semibold hover:bg-neutral-200 active:bg-neutral-300 transition"
            >
              Sell
            </button>
            <button
              type="button"
              className="w-full rounded-full bg-white text-black py-4 text-[17px] font-semibold hover:bg-neutral-200 active:bg-neutral-300 transition"
            >
              Short
            </button>
          </div>

          {/* Divider */}
          <div className="mt-4 border-t border-white/10" />

          {/* Close row */}
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-white/90 hover:bg-white/10 active:bg-white/15 transition"
            >
              <span aria-hidden>✕</span>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

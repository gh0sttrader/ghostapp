"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TradeQuickActions({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // ~50% smaller than before
  const actionPill =
    "w-36 rounded-full bg-white text-black text-sm font-medium py-2 " +
    "shadow-md hover:bg-white/90 active:bg-white/80 transition";

  const closePill =
    "w-36 rounded-full border border-white/30 text-white text-sm font-medium py-2 " +
    "bg-transparent hover:bg-white/10 active:bg-white/15 transition";

  return (
    <>
      {/* Blur background but DO NOT block touches so the account toggle stays usable */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm bg-black/40 pointer-events-none"
        aria-hidden="true"
      />

      {/* Compact card, pinned to right above bottom nav */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Trade actions"
        className="fixed right-4 bottom-24 z-50 rounded-2xl border border-white/10
                   bg-black/75 shadow-xl backdrop-blur-md"
      >
        <div className="p-3 flex flex-col items-center space-y-3">
          <button type="button" className={actionPill}>Buy</button>
          <button type="button" className={actionPill}>Sell</button>
          <button type="button" className={actionPill}>Short</button>
          <button type="button" className={closePill} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

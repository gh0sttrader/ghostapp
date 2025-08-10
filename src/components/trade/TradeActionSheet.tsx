"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TradeActionSheet({ open, onClose }: Props) {
  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // 50% smaller pills: w-40/44, py-2.5, text-sm
  const pill =
    "w-44 rounded-full bg-white text-black text-sm font-semibold " +
    "py-2.5 shadow-md hover:bg-white/90 active:bg-white/80 transition";

  return (
    <>
      {/* dim/blur background */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* card anchored right; smaller and tighter padding */}
      <div
        className="fixed right-4 bottom-28 z-50 rounded-2xl border border-white/10 bg-black/70
                   shadow-xl backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label="Trade actions"
      >
        <div className="p-3 flex flex-col items-center space-y-3">
          <button type="button" className={pill}>
            Buy
          </button>

          <button type="button" className={pill}>
            Sell
          </button>

          <button type="button" className={pill}>
            Short
          </button>

          {/* NEW: replace floating X with a fourth pill */}
          <button
            type="button"
            onClick={onClose}
            className={pill}
            aria-label="Close trade actions"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

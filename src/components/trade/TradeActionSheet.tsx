// src/components/trade/TradeActionsPopover.tsx
"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TradeActionsPopover({ open, onClose }: Props) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // close on outside click (but keep the rest of the page interactive)
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, onClose]);

  if (!open) return null;

  return (
    // wrapper does NOT block the whole screen; only the box blurs its own backdrop
    <div
      className={cn(
        "fixed z-[70] right-4",              // keep to the right
        "bottom-[84px]",                     // ~ height of bottom nav + spacing
        "pointer-events-none"                // allow taps elsewhere, except inside the box
      )}
      aria-live="polite"
    >
      <div
        ref={boxRef}
        className={cn(
          "pointer-events-auto",
          "backdrop-blur-md bg-black/30",    // blur ONLY behind the box
          "rounded-2xl shadow-2xl ring-1 ring-white/10",
          "p-3 w-[220px] space-y-3 select-none"
        )}
      >
        <button
          type="button"
          className="w-full h-10 rounded-full bg-white text-black font-medium"
          onClick={() => {/* hook up later */}}
        >
          Buy
        </button>
        <button
          type="button"
          className="w-full h-10 rounded-full bg-white text-black font-medium"
          onClick={() => {/* hook up later */}}
        >
          Sell
        </button>
        <button
          type="button"
          className="w-full h-10 rounded-full bg-white text-black font-medium"
          onClick={() => {/* hook up later */}}
        >
          Short
        </button>

        <div className="flex justify-end">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="h-9 w-9 rounded-full border border-white/25 text-white/80 hover:bg-white/10 grid place-items-center"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function TradeActionSheet({ open, onClose }: Props) {
  // close on ESC
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Dim+blur the page but do NOT block clicks to the nav; the panel handles its own clicks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[48] bg-black/45 backdrop-blur-[2px]"
          />

          {/* Floating panel just above the bottom nav */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="fixed left-1/2 z-[49] -translate-x-1/2"
            style={{
              // keep it above the nav bar; adjust --nav-h if your nav is taller/shorter
              bottom: 'calc(var(--nav-h,56px) + env(safe-area-inset-bottom) + 12px)',
            }}
          >
            <div className="mx-auto w-[88vw] max-w-sm rounded-[20px] border border-white/10 bg-black/80 p-3 shadow-2xl backdrop-blur">
              <div className="flex flex-col items-stretch gap-10">
                <div className="flex flex-col gap-8">
                  <button
                    onClick={onClose}
                    className="h-10 w-full rounded-full bg-white text-black font-semibold"
                  >
                    Buy
                  </button>
                  <button
                    onClick={onClose}
                    className="h-10 w-full rounded-full bg-white text-black font-semibold"
                  >
                    Sell
                  </button>
                  <button
                    onClick={onClose}
                    className="h-10 w-full rounded-full bg-white text-black font-semibold"
                  >
                    Short
                  </button>
                </div>

                {/* X only (no “Close” text) */}
                <div className="flex justify-center">
                  <button
                    aria-label="Close"
                    onClick={onClose}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black text-white shadow"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

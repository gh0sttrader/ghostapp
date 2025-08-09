'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  open: boolean;
  onClose: () => void;
  className?: string;
};

export default function TradeActionSheet({ open, onClose, className }: Props) {
  // ESC closes
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
          {/* Dim + blur overlay, but DO NOT block clicks (so account toggle/nav remain usable) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[48] bg-black/45 backdrop-blur-[2px]"
          />

          {/* Centered floating card, never off-screen */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className={cn(
              'fixed inset-x-0 z-[49] mx-auto',
              className
            )}
            style={{
              // sits just above the bottom nav
              bottom:
                'calc(var(--nav-height,56px) + env(safe-area-inset-bottom) + 10px)',
              width: 'min(92vw, 320px)',
            }}
          >
            <div className="relative rounded-2xl border border-white/10 bg-black/85 p-3 shadow-2xl backdrop-blur">
              {/* X close (top-right) */}
              <button
                aria-label="Close"
                onClick={onClose}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Actions – condensed */}
              <div className="flex flex-col gap-3 pt-4 pb-2">
                <button
                  onClick={onClose}
                  className="h-9 w-full rounded-full bg-white text-sm font-semibold text-black"
                >
                  Buy
                </button>
                <button
                  onClick={onClose}
                  className="h-9 w-full rounded-full bg-white text-sm font-semibold text-black"
                >
                  Sell
                </button>
                <button
                  onClick={onClose}
                  className="h-9 w-full rounded-full bg-white text-sm font-semibold text-black"
                >
                  Short
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

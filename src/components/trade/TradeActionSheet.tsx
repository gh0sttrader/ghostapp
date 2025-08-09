'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  open: boolean;
  onClose: () => void;
  accountName: string;                 // e.g., "Individual"
  onOpenAccountPicker: () => void;     // open your existing account modal
  className?: string;
};

export default function TradeActionSheet({
  open,
  onClose,
  accountName,
  onOpenAccountPicker,
  className,
}: Props) {
  // ESC to close
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
          {/* Dim + subtle blur. Keep bottom nav visible & tappable */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[48] bg-black/45 backdrop-blur-[2px]"
          />

          {/* Floating card */}
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            className={cn(
              'fixed left-1/2 z-[49] -translate-x-1/2',
              className
            )}
            style={{
              bottom:
                'calc(var(--nav-height,56px) + env(safe-area-inset-bottom) + 10px)',
            }}
          >
            <div className="mx-4 w-[92vw] max-w-[360px] rounded-2xl border border-white/10 bg-black/85 p-3 shadow-2xl backdrop-blur">
              {/* X close (top-right) */}
              <button
                aria-label="Close"
                onClick={onClose}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Account selector row */}
              <div className="mb-3 mt-1 flex justify-center">
                <button
                  onClick={onOpenAccountPicker}
                  className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-sm text-white/90"
                >
                  <span className="truncate max-w-[200px]">{accountName}</span>
                  <ChevronDown className="h-4 w-4 opacity-80" />
                </button>
              </div>

              {/* Actions – condensed */}
              <div className="flex flex-col gap-3 pt-1 pb-2">
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

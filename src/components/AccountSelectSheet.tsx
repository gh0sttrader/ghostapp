// src/components/AccountSelectSheet.tsx
"use client";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useTradeAccount } from "@/context/tradeAccount";

export default function AccountSelectSheet({
  open, onOpenChange,
}: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { accounts, selectedId, setSelectedId } = useTradeAccount();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-[#141414] p-4 pb-6 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full"
          style={{ paddingBottom: `calc(1rem + env(safe-area-inset-bottom))` }}
        >
          <div className="mx-auto max-w-md">
            <Dialog.Title className="text-white text-lg font-semibold text-center mb-4">
              Select an account
            </Dialog.Title>

            <RadioGroup.Root
              value={selectedId}
              onValueChange={setSelectedId}
              className="flex flex-col gap-3"
            >
              {accounts.map(a => (
                <label key={a.id}
                  className="flex items-center justify-between rounded-xl bg-black/25 px-3 py-3">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{a.name}</span>
                    <span className="text-white/60 text-sm">{a.buyingPower} available</span>
                  </div>
                  <RadioGroup.Item
                    value={a.id}
                    className="grid place-items-center h-5 w-5 rounded-full border border-white/40
                               data-[state=checked]:border-[#04cf7a]"
                  >
                    <RadioGroup.Indicator className="h-3 w-3 rounded-full bg-[#04cf7a]" />
                  </RadioGroup.Item>
                </label>
              ))}
            </RadioGroup.Root>

            <button
              onClick={() => onOpenChange(false)}
              className="mt-4 w-full h-11 rounded-full bg-white text-black font-semibold"
            >
              Close
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

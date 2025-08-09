// src/components/AccountSelectSheet.tsx
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";

type Account = { id: string; name: string; buyingPower: string };
export default function AccountSelectSheet({
  open,
  onOpenChange,
  accounts,
  value,
  onChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  accounts: Account[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* 1) BLURRED BACKDROP */}
        <Dialog.Overlay
          className="
            fixed inset-0 z-40 bg-black/50 backdrop-blur-md
            supports-[backdrop-filter]:bg-black/40
          "
        />
        {/* 2) SHEET: PURE BLACK */}
        <Dialog.Content
          className="
            fixed inset-x-0 bottom-0 z-50 max-h-[85vh]
            rounded-t-2xl bg-black text-white shadow-2xl
            p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]
          "
        >
          <div className="mx-auto max-w-md">
            <Dialog.Title className="text-center text-lg font-semibold">
              Select an account
            </Dialog.Title>

            {/* 3) WHITE RADIO DOT WHEN CHECKED */}
            <RadioGroup.Root
              className="mt-4 flex flex-col gap-3"
              value={value}
              onValueChange={onChange}
            >
              {accounts.map((a) => (
                <label
                  key={a.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black px-3 py-3"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{a.name}</span>
                    <span className="text-white/60 text-sm">{a.buyingPower} available</span>
                  </div>

                  <RadioGroup.Item
                    value={a.id}
                    aria-label={`Select ${a.name}`}
                    className="
                      grid h-5 w-5 place-items-center rounded-full
                      border border-white/40 data-[state=checked]:border-white
                      outline-none
                    "
                  >
                    <RadioGroup.Indicator className="h-3 w-3 rounded-full bg-white" />
                  </RadioGroup.Item>
                </label>
              ))}
            </RadioGroup.Root>

            <button
              onClick={() => onOpenChange(false)}
              className="mt-4 h-11 w-full rounded-full bg-white text-black font-semibold"
            >
              Close
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

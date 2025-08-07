
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Check } from 'lucide-react';
import { cn } from "@/lib/utils";

const accounts = ['Taxable', 'Roth'];

type AccountSwitcherProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedAccount: string;
  setSelectedAccount: (account: string) => void;
};

export function AccountSwitcher({ isOpen, setIsOpen, selectedAccount, setSelectedAccount }: AccountSwitcherProps) {
  const handleSelect = (account: string) => {
    setSelectedAccount(account);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="bottom" className="bg-transparent text-white border-0 rounded-t-2xl h-auto backdrop-blur-2xl">
        <SheetHeader className="text-left mb-2">
          <SheetTitle className="text-base font-semibold text-center">Select Account</SheetTitle>
          <SheetDescription className="sr-only">
            Choose between your Taxable and Roth accounts.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          {accounts.map((account) => (
            <Button
              key={account}
              variant="ghost"
              onClick={() => handleSelect(account)}
              className="w-full flex justify-between items-center py-4 text-base"
            >
              <span className={cn("text-white", selectedAccount === account ? "font-bold" : "font-normal")}>
                {account}
              </span>
              {selectedAccount === account && <Check className="h-4 w-4 text-accent" />}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

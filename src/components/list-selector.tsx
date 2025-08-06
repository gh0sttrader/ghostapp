"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const options = [
  { name: 'Positions' },
  { name: 'Watchlist' },
  { name: 'Screeners' },
  { name: 'News' },
  { name: 'Alerts' },
];

type ListSelectorProps = {
  children: React.ReactNode;
  selected: string;
  setSelected: (selected: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function ListSelector({ children, selected, setSelected, isOpen, setIsOpen }: ListSelectorProps) {

  const handleSelect = (optionName: string) => {
    setSelected(optionName);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="bottom" className="bg-[#181818] text-white border-t-0 rounded-t-2xl">
        <SheetHeader className="text-left">
          <SheetTitle className="text-white sr-only">Select a list</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <ul className="space-y-2">
            {options.map((opt) => (
              <li key={opt.name}>
                <button
                  onClick={() => handleSelect(opt.name)}
                  className={cn(
                    "w-full text-left py-3 text-xl hover:opacity-80 transition-opacity flex items-center gap-4",
                    selected === opt.name ? "text-accent font-bold" : "text-white"
                  )}
                >
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full",
                      selected === opt.name ? "bg-accent" : ""
                    )}
                  />
                  {opt.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}

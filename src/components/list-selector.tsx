"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import Link from 'next/link';

const options = [
  { name: 'Positions' },
  { name: 'Watchlist' },
  { name: 'Screeners' },
  { name: 'News' },
  { name: 'Alerts' },
];

export function ListSelector() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open list selector">
          <SlidersHorizontal className="h-6 w-6 text-white" />
        </Button>
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
                  onClick={() => setIsOpen(false)} 
                  className="w-full text-left py-3 text-xl hover:opacity-80 transition-opacity"
                >
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

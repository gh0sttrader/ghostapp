
"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Settings, Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const mainOptions = [
  {
    name: 'Positions',
    subItems: ['All', 'Taxable', 'Roth'],
  },
  {
    name: 'Watchlists',
    subItems: ['Short', 'Long', 'Growth', 'Dividends', 'Tech', 'Crypto', 'Income'],
  },
  {
    name: 'Screeners',
    subItems: ['Top Gainers', 'Top Losers'],
   },
  { name: 'News' },
  { name: 'Alerts' },
];

type ListSidebarProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selected: string;
  setSelected: (selected: string) => void;
};

export function ListSidebar({ isOpen, setIsOpen, selected, setSelected }: ListSidebarProps) {
  const LS_KEY = "lists.openGroups.v1";
  const [openSections, setOpenSections] = useState<string[]>([]);
  
  // Hydrate from localStorage on mount to avoid SSR mismatch
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "['Positions', 'Watchlists']");
      if (Array.isArray(saved)) setOpenSections(saved);
    } catch {}
  }, []);

  // Persist to localStorage on change
  const onOpenChange = (next: string[]) => {
    setOpenSections(next);
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(next));
    } catch {}
  };

  useEffect(() => {
    // Find which parent section is currently active to ensure it is open
    const parentSection = mainOptions.find(opt => opt.subItems?.includes(selected))?.name;
    if (parentSection && !openSections.includes(parentSection)) {
      const newOpenSections = [...openSections, parentSection];
      setOpenSections(newOpenSections);
      localStorage.setItem(LS_KEY, JSON.stringify(newOpenSections));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);


  const handleSelect = (optionName: string) => {
    setSelected(optionName);
    setIsOpen(false);
  };

  const handleParentSelect = (optionName: string) => {
    const parent = mainOptions.find(opt => opt.name === optionName);
    if (parent && parent.subItems) {
      setSelected(parent.subItems[0]); // Select 'All' for positions, 'Short' for watchlists etc.
    } else {
      setSelected(optionName);
    }
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="bg-transparent text-white w-[75%] max-w-sm p-0 border-r-0 rounded-r-3xl flex flex-col backdrop-blur-xl">
        <SheetHeader className="p-4 pt-6 pb-2 text-left">
           <SheetTitle className="text-lg font-bold text-white mb-1">My Lists</SheetTitle>
          <SheetDescription className="sr-only">
            A list of sections to navigate to, including positions, watchlists, screeners, news, and alerts.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-2">
          <AccordionPrimitive.Root type="multiple" className="w-full" value={openSections} onValueChange={onOpenChange}>
            {mainOptions.map((opt) => (
              opt.subItems ? (
                <AccordionItem value={opt.name} key={opt.name} className="border-b-0">
                  <AccordionPrimitive.Header>
                     <AccordionTrigger className="flex items-center justify-between py-1.5 px-4 rounded-md w-full hover:no-underline hover:bg-white/5">
                       <span
                        onClick={(e) => { e.stopPropagation(); handleParentSelect(opt.name); }}
                        className={cn(
                          "text-base font-semibold cursor-pointer",
                          opt.subItems.includes(selected) ? "text-white font-bold" : "text-white font-normal"
                        )}
                      >
                        {opt.name}
                      </span>
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                    </AccordionTrigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="pb-0 pl-6">
                    <ul className="space-y-0.5">
                      {opt.subItems.map(subItem => (
                        <li key={subItem}>
                           <button
                              onClick={() => handleSelect(subItem)}
                              className={cn(
                                "w-full text-left py-1 text-sm transition-opacity flex items-center gap-3 hover:bg-transparent",
                                selected === subItem ? "text-white font-bold" : "text-neutral-300 font-normal"
                              )}
                            >
                              {subItem}
                            </button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                 <button
                    key={opt.name}
                    onClick={() => handleSelect(opt.name)}
                    className={cn(
                      "w-full text-left text-base font-semibold hover:no-underline py-2 px-4 rounded-md flex items-center gap-4 transition-colors hover:bg-white/5",
                       selected === opt.name ? "text-white font-bold" : "text-white font-normal"
                    )}
                  >
                    {opt.name}
                  </button>
              )
            ))}
          </AccordionPrimitive.Root>
        </div>
        <div className="p-4 mt-auto border-t border-neutral-800/50">
            <div className="flex justify-around items-center">
                 <Button variant="ghost" className="flex flex-col h-auto items-center text-white hover:bg-transparent">
                    <Settings className="h-5 w-5 mb-1" />
                    <span className="text-xs">Manage Lists</span>
                </Button>
                <Button variant="ghost" className="flex flex-col h-auto items-center text-white hover:bg-transparent">
                    <Plus className="h-5 w-5 mb-1" />
                    <span className="text-xs">Add List</span>
                </Button>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

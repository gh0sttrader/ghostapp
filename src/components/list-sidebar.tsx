
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Settings, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const mainOptions = [
  {
    name: 'Positions',
    subItems: ['Taxable', 'Roth'],
  },
  {
    name: 'Watchlists',
    subItems: ['Short', 'Long'],
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
  const [openSections, setOpenSections] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setOpenSections([]);
    }
  }, [isOpen]);

  const handleSelect = (optionName: string) => {
    setSelected(optionName);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="left" className="bg-transparent text-white w-[75%] max-w-sm p-0 border-r-0 rounded-r-3xl flex flex-col backdrop-blur-xl">
        <SheetHeader className="p-4 pt-8 pb-2 text-left">
           <SheetTitle className="text-lg font-bold text-white mb-2">My Lists</SheetTitle>
          <SheetDescription className="sr-only">
            A list of sections to navigate to, including positions, watchlists, screeners, news, and alerts.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-2">
          <Accordion type="multiple" className="w-full" value={openSections} onValueChange={setOpenSections}>
            {mainOptions.map((opt) => (
              opt.subItems ? (
                <AccordionItem value={opt.name} key={opt.name} className="border-b-0">
                  <AccordionTrigger className="text-base font-semibold hover:no-underline py-2 px-4 rounded-md hover:bg-neutral-800/50">
                    {opt.name}
                  </AccordionTrigger>
                  <AccordionContent className="pb-0 pl-6">
                    <ul className="space-y-0.5">
                      {opt.subItems.map(subItem => (
                        <li key={subItem}>
                           <button
                              onClick={() => handleSelect(subItem)}
                              className={cn(
                                "w-full text-left py-1.5 text-sm hover:opacity-80 transition-opacity flex items-center gap-3",
                                selected === subItem ? "text-accent font-semibold" : "text-neutral-300"
                              )}
                            >
                               <div className={cn("h-1.5 w-1.5 rounded-full", selected === subItem ? "bg-accent" : "")} />
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
                      "w-full text-left text-base font-semibold hover:no-underline py-2 px-4 rounded-md hover:bg-neutral-800/50 flex items-center gap-4 transition-colors",
                       selected === opt.name ? "text-accent font-bold" : "text-white"
                    )}
                  >
                    {opt.name}
                  </button>
              )
            ))}
          </Accordion>
        </div>
        <div className="p-4 mt-auto border-t border-neutral-800/50">
            <div className="flex justify-around items-center">
                 <Button variant="ghost" className="flex flex-col h-auto items-center text-white hover:text-accent">
                    <Settings className="h-6 w-6 mb-1" />
                    <span className="text-xs">Manage Lists</span>
                </Button>
                <Button variant="ghost" className="flex flex-col h-auto items-center text-white hover:text-accent">
                    <Plus className="h-6 w-6 mb-1" />
                    <span className="text-xs">Add List</span>
                </Button>
            </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

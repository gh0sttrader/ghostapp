"use client";

import { useState } from 'react';
import { ListSelector } from '@/components/list-selector';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ListPage() {
  const [selected, setSelected] = useState('Positions');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="w-full max-w-md px-4 py-4 sm:px-6 mx-auto">
        <header className="flex items-center gap-4 mb-6 pt-4">
          <ListSelector
            selected={selected}
            setSelected={setSelected}
            isOpen={isSheetOpen}
            setIsOpen={setIsSheetOpen}
          >
            <Button variant="ghost" size="icon" aria-label="Open list selector">
              <Menu className="h-7 w-7 text-white" />
            </Button>
          </ListSelector>
          <h1 className="text-3xl font-bold tracking-tight">
            {selected}
          </h1>
        </header>
        <div className="text-center text-muted-foreground py-20">
          <p>Your {selected.toLowerCase()} will appear here.</p>
        </div>
      </div>
    </main>
  );
}

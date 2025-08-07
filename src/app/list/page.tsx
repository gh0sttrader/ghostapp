"use client";

import { useState } from 'react';
import { ListSidebar } from '@/components/list-sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ListPage() {
  const [selected, setSelected] = useState('Positions');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <ListSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        selected={selected}
        setSelected={setSelected}
      />
      <div className="w-full max-w-md px-4 py-2 sm:px-6 mx-auto">
        <header className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" className="-ml-2 h-auto p-2" aria-label="Open list selector" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-white" />
          </Button>
          <h1 className="text-lg font-bold tracking-tight">
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

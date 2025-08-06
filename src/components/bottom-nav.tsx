"use client";

import { List, User, ArrowRightLeft, LineChart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BottomNav() {
  const navItems = [
    { name: 'List', icon: List },
    { name: 'Accounts', icon: User },
    { name: 'Trade', icon: ArrowRightLeft },
    { name: 'Performance', icon: LineChart },
    { name: 'Menu', icon: Menu },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-neutral-800 flex justify-around items-center px-2 z-50">
      {navItems.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          className="flex-1 flex flex-col h-full justify-center items-center rounded-none text-white hover:bg-neutral-900 hover:text-white"
          aria-label={item.name}
        >
          <item.icon className="h-7 w-7" />
        </Button>
      ))}
    </nav>
  );
}

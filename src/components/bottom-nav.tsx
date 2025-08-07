
"use client";

import { List, User, ArrowRightLeft, LineChart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function BottomNav() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);


  const navItems = [
    { name: 'List', href: '/list', icon: List },
    { name: 'Accounts', href: '/accounts', icon: User },
    { name: 'Trade', href: '/trade', icon: ArrowRightLeft },
    { name: 'Stats', href: '/performance', icon: LineChart },
    { name: 'Menu', href: '/menu', icon: Menu },
  ];

  if (!currentPath) {
    // Render a placeholder or null on the server and initial client render
    return null; 
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black flex justify-around items-center px-2 z-50">
      {navItems.map((item) => {
        const isActive = currentPath.startsWith(item.href);
        return (
          <Link href={item.href} key={item.name} className="flex-1">
            <Button
              variant="ghost"
              className={cn(
                "flex-1 flex flex-col h-full w-full justify-center items-center rounded-none",
                isActive ? 'text-white' : 'text-neutral-400'
              )}
              aria-label={item.name}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-bold mt-0">{item.name}</span>
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}

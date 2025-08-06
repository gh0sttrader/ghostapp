"use client";

import { List, User, ArrowRightLeft, LineChart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();
  const navItems = [
    { name: 'List', href: '/list', icon: List },
    { name: 'Accounts', href: '/accounts', icon: User },
    { name: 'Trade', href: '/trade', icon: ArrowRightLeft },
    { name: 'Performance', href: '/performance', icon: LineChart },
    { name: 'Menu', href: '/menu', icon: Menu },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-neutral-800 flex justify-around items-center px-2 z-50">
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <Link href={item.href} key={item.name} className="flex-1">
            <Button
              variant="ghost"
              className={cn(
                "flex-1 flex flex-col h-full w-full justify-center items-center rounded-none text-white hover:bg-neutral-900 hover:text-white",
                isActive ? 'text-accent' : 'text-white'
              )}
              aria-label={item.name}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-7 w-7" />
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}


"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, User, ArrowRightLeft, LineChart, Menu } from "lucide-react";

const TABS = [
  { href: "/list", label: "List", icon: List },
  { href: "/accounts", label: "Accounts", icon: User },
  { href: "/trade", label: "Trade", icon: ArrowRightLeft },
  { href: "/stats", label: "Stats", icon: LineChart },
  { href: "/menu", label: "Menu", icon: Menu },
];

export function BottomNav() {
  const path = usePathname();
  return (
    <nav data-bottom-nav
         className="fixed inset-x-0 bottom-0 bg-black"
         style={{ height: "var(--nav-h)" }}>
      <div className="grid h-full grid-cols-5 place-items-center">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = path?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="group inline-flex h-12 w-12 items-center justify-center"
              data-active={active}
            >
              <Icon
                className="h-5 w-5 text-white/70 group-data-[active=true]:text-white"
                strokeWidth={2}
              />
              <span className="sr-only">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}


"use client";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";
import TradeQuickBar from "@/components/TradeQuickBar";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const m = pathname.match(/^\/trade\/([^/]+)$/);
  const isTrade = !!m;
  const symbol = isTrade ? decodeURIComponent(m![1]) : "";

  return (
    <>
      {children}
      <BottomNav />
      {isTrade && <TradeQuickBar symbol={symbol} />}
    </>
  );
}


"use client";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";
import TradeActionBar from "@/components/TradeActionBar";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const m = pathname.match(/^\/trade\/([^/]+)$/);
  const isTradeDetail = !!m;
  const symbol = m ? decodeURIComponent(m[1]) : "";

  return (
    <>
      {children}
      {isTradeDetail ? <TradeActionBar symbol={symbol} /> : <BottomNav />}
    </>
  );
}


"use client";
import { usePathname } from "next/navigation";
import { BottomNav } from "@/components/bottom-nav";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";

  // Hide on trade detail screens like /trade/VOO
  const hideNav = /^\/trade\/[^/]+$/.test(pathname);

  return (
    <>
      {children}
      {!hideNav && <BottomNav />}
    </>
  );
}

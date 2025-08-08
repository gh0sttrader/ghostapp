
"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function RouteMemory() {
  const pathname = usePathname();
  const prev = useRef<string | null>(null);

  useEffect(() => {
    if (prev.current && prev.current !== pathname) {
      sessionStorage.setItem("prevPath", prev.current);
    }
    prev.current = pathname;
  }, [pathname]);

  return null;
}

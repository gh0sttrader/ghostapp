"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

type Props = { className?: string; href?: string };

export default function SearchButton({ className, href = "/search" }: Props) {
  const router = useRouter();

  // Quick keyboard shortcut: press "/" to jump to Search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        router.push(href);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [href, router]);

  return (
    <button
      type="button"
      aria-label="Search"
      onClick={() => router.push(href)}
      className={[
        // 44×44px tap target, subtle hover
        "h-11 w-11 rounded-full flex items-center justify-center",
        "bg-transparent hover:bg-white/10 active:bg-white/20",
        "outline-none ring-0 transition",
        className || "",
      ].join(" ")}
    >
      <Search className="h-5 w-5 text-white" strokeWidth={2.25} />
    </button>
  );
}

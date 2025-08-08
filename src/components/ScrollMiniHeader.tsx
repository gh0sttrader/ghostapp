"use client";
import { useCondensed } from "@/lib/useCondensed";

type Props = {
  symbol: string;
  price: number;
  /** The id of an element placed right AFTER the big header. */
  sentinelId: string;
};

export default function ScrollMiniHeader({ symbol, price, sentinelId }: Props) {
  const condensed = useCondensed(sentinelId);

  return (
    <div
      className={[
        "pointer-events-none fixed inset-x-0 top-0 z-50",
        "transition-all duration-200",
        condensed ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
      ].join(" ")}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto h-12 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/70">
        <div className="flex h-full flex-col items-center justify-center leading-tight">
          <span className="tabular-nums text-[14px] font-semibold">${price.toFixed(2)}</span>
          <span className="text-[14px] font-semibold">{symbol}</span>
        </div>
      </div>
    </div>
  );
}

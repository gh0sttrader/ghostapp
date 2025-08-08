// src/components/TradeAttributes.tsx
"use client";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  Clock3, Banknote, ArrowDownWideNarrow, Lock,
  Sigma, PieChart, Moon, SignalHigh
} from "lucide-react";
import { GRADIENT_10 as ATTR_COLORS } from "@/constants/palette";

type Attrs = {
  "24h"?: boolean;          // trades 24/7
  marginable?: boolean;     // margin eligible
  shortable?: boolean;      // can short
  hardToBorrow?: boolean;   // HTB flag
  options?: boolean;        // options available
  fractional?: boolean;     // fractional trading
  extendedHours?: boolean;  // pre/post market
  level2?: boolean;         // Level 2 data
};

const ICONS: { key: keyof Attrs; label: string; Icon: any }[] = [
  { key: "level2",        label: "Level 2",           Icon: SignalHigh },
  { key: "shortable",     label: "Shortable",         Icon: ArrowDownWideNarrow },
  { key: "marginable",    label: "Margin eligible",   Icon: Banknote },
  { key: "hardToBorrow",  label: "Hard to borrow",    Icon: Lock },
  { key: "options",       label: "Options",           Icon: Sigma },
  { key: "fractional",    label: "Fractional",        Icon: PieChart },
  { key: "extendedHours", label: "Extended hours",    Icon: Moon },
  { key: "24h",           label: "24H trading",       Icon: Clock3 },
];

export default function TradeAttributes({ attrs }: { attrs: Attrs }) {
  const active = ICONS.filter(({ key }) => attrs[key]);
  if (!active.length) return null;

  return (
    <Tooltip.Provider delayDuration={100}>
      <div className="flex items-center gap-2">
        {active.map(({ key, label, Icon }, i) => (
          <Tooltip.Root key={String(key)}>
            <Tooltip.Trigger asChild>
              <div
                className="h-5 w-5 shrink-0 rounded-md grid place-items-center"
                style={{ background: ATTR_COLORS[Math.min(i, ATTR_COLORS.length - 1)] }}
                aria-label={label}
              >
                <Icon className="h-3.5 w-3.5 text-black/90" strokeWidth={2.5} />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content
              side="bottom" sideOffset={6}
              className="rounded-md bg-white/95 px-2 py-1 text-[11px] font-medium text-black shadow"
            >
              {label}
            </Tooltip.Content>
          </Tooltip.Root>
        ))}
      </div>
    </Tooltip.Provider>
  );
}

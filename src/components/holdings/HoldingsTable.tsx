
// src/components/holdings/HoldingsTable.tsx
import React from "react";
import AllocationBar from "./AllocationBar";
import styles from './holdings-table.module.css';

type Holding = {
  symbol: string;
  marketValue?: number;
  shares?: number;
  price?: number;
};

type Props = {
  holdings: Holding[];
  className?: string;
};

const fmtUSD = (n: number) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });

const HoldingsTable: React.FC<Props> = ({ holdings, className }) => {
    const rows = React.useMemo(() => {
        const withMV = holdings.map(h => ({
            ...h,
            marketValue: h.marketValue ?? ((h.shares ?? 0) * (h.price ?? 0)),
        }));
        const total = withMV.reduce((acc, h) => acc + h.marketValue, 0) || 1;
        return withMV
            .map(h => ({
                symbol: h.symbol,
                marketValue: h.marketValue,
                allocationPct: (h.marketValue / total) * 100,
            }))
            .sort((a, b) => b.marketValue - a.marketValue);
    }, [holdings]);


  return (
    <div className={styles.tableWrapper}>
      <table className={styles.holdingsTable}>
        <thead className="text-xs text-zinc-400">
          <tr>
            <th className={styles.symbolCell}>Symbol</th>
            <th className={styles.marketValueCell}>Market value</th>
            <th className={styles.allocationCell}>Allocation</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map(({ symbol, marketValue, allocationPct }) => (
            <tr key={symbol} className="h-[56px]">
              <td className={`${styles.symbolCell} text-sm font-medium`}>{symbol}</td>
              <td className={`${styles.marketValueCell} text-sm tabular-nums`}>
                {fmtUSD(marketValue)}
              </td>
              <td className={styles.allocationCell}>
                <div className={styles.barWrapper}>
                  <AllocationBar value={allocationPct} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(HoldingsTable);

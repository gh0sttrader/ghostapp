// src/components/holdings/HoldingsTable.tsx
import React from "react";
import styles from './holdings-table.module.css';

type Holding = {
  symbol: string;
  marketValue?: number;
  shares?: number;
  price?: number;
  allocationPct: number;
};

type Props = {
  holdings: Holding[];
};

const HoldingsTable: React.FC<Props> = ({ holdings }) => {
  const fmtUSD = (n: number) =>
    n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 2 });

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.header}>Holdings</div>
      <table className={styles.holdingsTable}>
        <thead>
          <tr>
            <th className={styles.symbolCell}>Symbol</th>
            <th className={styles.marketValueCell}>Market value</th>
            <th className={styles.allocationCell}>Allocation</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map(({ symbol, marketValue, allocationPct }) => (
            <tr key={symbol}>
              <td className={styles.symbolCell}>{symbol}</td>
              <td className={styles.marketValueCell}>
                {fmtUSD(marketValue || 0)}
              </td>
              <td className={styles.allocationCell}>
                <div className={styles.allocationPercent}>
                  {allocationPct.toFixed(2)}%
                </div>
                <div className={styles.allocationBarWrapper}>
                  <div
                    className={styles.allocationBarFill}
                    style={{ width: `${allocationPct}%` }}
                  />
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

// components/holdings/AllocationBar.tsx
import React from "react";
import styles from "./allocation-bar.module.css";

type Props = {
  /** 0–100 (e.g., 27.95) */
  value: number;
  /** optional aria-label, falls back to "Allocation {value}%" */
  label?: string;
};

export default function AllocationBar({ value, label }: Props) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={styles.wrapper} aria-label={label ?? `Allocation ${pct.toFixed(2)}%`}>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%` }}
          aria-hidden="true"
        />
      </div>
      <span className={styles.percent}>{pct.toFixed(2)}%</span>
    </div>
  );
}
// src/context/tradeAccount.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Account = { id: string; name: string; buyingPower: string };

const DUMMY: Account[] = [
  { id: "individual", name: "Individual", buyingPower: "$4,250.00" },
  { id: "roth",       name: "Roth IRA",   buyingPower: "$0.00" },
];

type Ctx = { accounts: Account[]; selectedId: string; setSelectedId: (id: string) => void };
const C = createContext<Ctx | null>(null);

export function TradeAccountProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState("individual");
  
  useEffect(() => {
    // This effect runs only on the client, where localStorage is available.
    const savedAccountId = localStorage.getItem("trade.selected");
    if (savedAccountId) {
      setSelectedId(savedAccountId);
    }
  }, []);

  useEffect(() => {
    // This effect runs when selectedId changes.
    localStorage.setItem("trade.selected", selectedId);
  }, [selectedId]);
  
  return <C.Provider value={{ accounts: DUMMY, selectedId, setSelectedId }}>{children}</C.Provider>;
}

export function useTradeAccount() {
  const v = useContext(C);
  if (!v) throw new Error("useTradeAccount must be used inside TradeAccountProvider");
  return v;
}

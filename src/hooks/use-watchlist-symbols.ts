
"use client";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Symbol = {
    id: string;
    // other fields if they exist
};

export function useWatchlistSymbols(userId: string, listId: string) {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  useEffect(() => {
    if (!userId || !listId) {
        setSymbols([]);
        return;
    };
    
    const q = query(collection(db, "users", userId, "watchlists", listId, "symbols"), orderBy("addedAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snap) => {
        const symbolsData = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        setSymbols(symbolsData as Symbol[]);
    }, (error) => {
        console.error("Error fetching watchlist symbols:", error);
        setSymbols([]);
    });

    return () => unsubscribe();

  }, [userId, listId]);
  
  return symbols;
}

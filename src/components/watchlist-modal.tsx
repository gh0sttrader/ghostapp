
// WatchlistModal.tsx
"use client";
import { useState } from "react";
import {
  getFirestore, addDoc, collection, doc, setDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type Watchlist = { id: string; name: string };

export default function WatchlistModal({
  open, onClose, userId, symbol, watchlists,
}: {
  open: boolean;
  onClose: () => void;
  userId: string;
  symbol: string;
  watchlists: Watchlist[];
}) {
  if (!open) return null;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [busy, setBusy] = useState(false);

  const addToWatchlist = async (listId: string) =>
    setDoc(
      doc(db, "users", userId, "watchlists", listId, "symbols", symbol),
      { symbol, addedAt: serverTimestamp() },
      { merge: true }
    );

  const handleAdd = async () => {
    if (!selectedId || busy) return;
    try {
      setBusy(true);
      await addToWatchlist(selectedId);
      onClose();
    } finally {
      setBusy(false);
    }
  };

  const handleCreate = async () => {
    if (!creating) return setCreating(true);
    if (!newName.trim() || busy) return;
    try {
      setBusy(true);
      const ref = await addDoc(collection(db, "users", userId, "watchlists"), {
        name: newName.trim(),
        createdAt: serverTimestamp(),
      });
      await addToWatchlist(ref.id);
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 100% transparent overlay */}
      <button onClick={onClose} aria-label="Close" className="absolute inset-0 bg-transparent" />
      {/* Card: the ONLY element that blurs */}
      <div className="relative w-[min(92vw,420px)] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add to Watchlist</h2>
          <button onClick={onClose} aria-label="Close" className="-m-2 p-2 text-white/70">✕</button>
        </div>

        <div className="mt-3 max-h-64 space-y-3 overflow-y-auto">
          {watchlists.map((wl) => (
            <button
              key={wl.id}
              onClick={() => setSelectedId(wl.id)}
              className={`w-full rounded-xl border px-4 py-3 text-left text-base
                ${selectedId === wl.id ? "border-white/30 bg-white/10" : "border-white/10 hover:border-white/20"}`}
            >
              {wl.name}
            </button>
          ))}
        </div>

        {creating && (
          <div className="mt-3">
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New watchlist name"
              className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 outline-none focus:border-white/30"
            />
          </div>
        )}

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleCreate}
            disabled={busy || (creating && !newName.trim())}
            className="flex-1 rounded-xl border border-white/25 px-4 py-3 text-base font-medium disabled:opacity-50"
          >
            {creating ? (busy ? "Creating…" : "Create") : "Create"}
          </button>
          <button
            onClick={handleAdd}
            disabled={busy || !selectedId}
            className="flex-1 rounded-xl bg-white px-4 py-3 text-base font-semibold text-black disabled:opacity-50"
          >
            {busy ? "Adding…" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

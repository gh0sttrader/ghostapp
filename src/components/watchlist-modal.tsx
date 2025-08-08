// WatchlistModal.tsx
"use client";
import { useState } from "react";
import { getFirestore, addDoc, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

type Watchlist = { id: string; name: string };

export default function WatchlistModal({
  open,
  onClose,
  userId,
  symbol,
  watchlists,
}: {
  open: boolean;
  onClose: () => void;
  userId: string;
  symbol: string;           // e.g., "AAPL"
  watchlists: Watchlist[];  // preload from Firestore
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const db = getFirestore();

  const addToWatchlist = async (listId: string) => {
    await setDoc(
      doc(db, "users", userId, "watchlists", listId, "symbols", symbol),
      { symbol, addedAt: serverTimestamp() },
      { merge: true }
    );
  };

  const handleAdd = async () => {
    if (!selectedId || busy) return;
    setBusy(true);
    await addToWatchlist(selectedId);
    setBusy(false);
    onClose();
  };

  const handleCreate = async () => {
    if (!creating) return setCreating(true);
    if (!newName.trim() || busy) return;
    setBusy(true);
    const ref = await addDoc(collection(db, "users", userId, "watchlists"), {
      name: newName.trim(),
      createdAt: serverTimestamp(),
    });
    await addToWatchlist(ref.id);
    setBusy(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay: no blur anywhere here */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />
      {/* Card: only this area blurs the background */}
      <div className="absolute inset-x-4 bottom-8 sm:inset-0 sm:flex sm:items-center sm:justify-center">
        <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Add to Watchlist</h2>
            <button onClick={onClose} aria-label="Close" className="p-2 -m-2 text-white/70">✕</button>
          </div>

          <div className="mt-3 max-h-64 space-y-3 overflow-y-auto">
            {watchlists.map((wl) => (
              <button
                key={wl.id}
                onClick={() => setSelectedId(wl.id)}
                className={`w-full rounded-xl border px-4 py-3 text-left text-base
                  ${selectedId === wl.id
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 hover:border-white/20"}`}
              >
                {wl.name}
              </button>
            ))}
          </div>

          {creating && (
            <div className="mt-3 flex gap-2">
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
              className="flex-1 rounded-xl border border-white/25 bg-transparent px-4 py-3 text-base font-medium disabled:opacity-50"
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
    </div>
  );
}
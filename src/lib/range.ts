
export type Bar = { time: number | string; close: number }; // ASC sorted

export function sliceByRange(all: Bar[], range: string): Bar[] {
  if (!all?.length) return [];
  const now = +new Date(all[all.length - 1].time);
  const ms = {
    "1D": 1, "1W": 7, "1M": 30, "3M": 90, "YTD": 366, "1Y": 365, "Max": 100*365,
  };
  if (range === "YTD") {
    const y0 = new Date(now); y0.setMonth(0, 1); y0.setHours(0,0,0,0);
    return all.filter(b => +new Date(b.time) >= +y0);
  }
  if (range === "Max") return all;
  const days = ms[range as keyof typeof ms] ?? 30;
  const cutoff = now - days * 86400000;
  return all.filter(b => +new Date(b.time) >= cutoff);
}

export function delta(bars: Bar[]) {
  const first = bars[0]?.close, last = bars.at(-1)?.close;
  if (typeof first !== 'number' || typeof last !== 'number' || bars.length < 2) return { abs: 0, pct: 0 };
  const abs = +(last - first).toFixed(2);
  const pct = +(((last - first) / first) * 100).toFixed(2);
  return { abs, pct };
}

export const rangeLabel = (r: string) => (r === "1Y" ? "Last 1Y" : r === "YTD" ? "YTD" : `Last ${r}`);

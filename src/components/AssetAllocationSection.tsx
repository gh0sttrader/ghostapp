// components/AssetAllocationSection.tsx
"use client";

export default function AssetAllocationSection() {
  const COLORS = ["#6D28D9","#5B21B6","#3B82F6","#38BDF8","#22D3EE","#2DD4BF"];
  const sectors = [
    { name: "Info Tech", value: 41.2 },
    { name: "Healthcare", value: 14.6 },
    { name: "Financials", value: 12.3 },
    { name: "Comm.", value: 11.8 },
    { name: "Cons. Discr.", value: 10.1 },
    { name: "Industrials", value: 10.0 },
  ];

  return (
    <section className="w-full">
      <h2 className="text-white font-bold mb-3">Asset Allocation</h2>
      <div className="mt-2">
        <ul className="space-y-2 flex-1">
          {sectors.map((s,i)=>(
            <li key={s.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm" style={{backgroundColor:COLORS[i%COLORS.length]}}/>
                <span className="text-xs text-gray-200">{s.name}</span>
              </div>
              <span className="text-xs text-gray-400">{s.value.toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

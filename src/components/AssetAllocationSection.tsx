// components/AssetAllocationSection.tsx
"use client";

const COLORS = ["#6D28D9","#5B21B6","#3B82F6","#38BDF8","#22D3EE","#2DD4BF"];

// replace with real sector weights later; must sum ~100
const data = [
  { name: "Information Tech", value: 41.2 },
  { name: "Healthcare", value: 14.6 },
  { name: "Financials", value: 12.3 },
  { name: "Communication", value: 11.8 },
  { name: "Consumer Discr.", value: 10.1 },
  { name: "Industrials", value: 10.0 },
];

function buildConic(d: {value:number}[]) {
  const total = d.reduce((s,x)=>s+x.value,0) || 1;
  let acc = 0;
  return d.map((x,i)=>{
    const from = (acc/total)*360;
    acc += x.value;
    const to = (acc/total)*360;
    return `${COLORS[i%COLORS.length]} ${from}deg ${to}deg`;
  }).join(", ");
}

export default function AssetAllocationSection() {
  const conic = buildConic(data);
  const total = data.reduce((s,x)=>s+x.value,0);

  return (
    <section className="w-full">
      <h2 className="text-white font-bold mb-3">Asset Allocation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
        {/* Left: sectors */}
        <ul className="space-y-3">
          {data.map((d,i)=>(
            <li key={d.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-3.5 w-3.5 rounded-sm" style={{backgroundColor:COLORS[i%COLORS.length]}}/>
                <span className="text-sm text-gray-200">{d.name}</span>
              </div>
              <span className="text-sm text-gray-400">{d.value.toFixed(1)}%</span>
            </li>
          ))}
        </ul>

        {/* Right: donut */}
        <div className="flex justify-center">
          <div className="relative h-56 w-56 rounded-full shadow-[0_0_30px_rgba(109,40,217,0.25)]"
               style={{ backgroundImage:`conic-gradient(${conic})` }}>
            {/* hole */}
            <div className="absolute inset-6 bg-[#0B0B0F] rounded-full border border-white/5"/>
            {/* center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-gray-300">Sectors</span>
              <span className="text-xl font-bold text-white">{Math.round(total)}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

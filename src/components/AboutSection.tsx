// components/AboutSection.tsx
"use client";
type Base = { symbol: string; name: string; type: "stock" | "etf"; about: string };
type Stock = Base & {
  type: "stock"; ceo: string; employees: string | number; headquarters: string; founded: string | number;
};
type Etf = Base & {
  type: "etf"; indexTracked: string; category: string; holdingsCount: string | number; inceptionDate: string;
};
export type Security = Stock | Etf;

export default function AboutSection({ security }: { security: Security }) {
  return (
    <section className="mt-6 border-t border-white/10 pt-4">
      <h3 className="text-base font-semibold">About</h3>
      <p className="mt-2 text-sm text-white/80">{security.about}</p>

      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-4">
        {security.type === "stock" ? (
          <>
            <div><dt className="text-white/60">CEO</dt><dd className="font-medium">{security.ceo}</dd></div>
            <div><dt className="text-white/60">Employees</dt><dd className="font-medium">{security.employees}</dd></div>
            <div><dt className="text-white/60">Headquarters</dt><dd className="font-medium">{security.headquarters}</dd></div>
            <div><dt className="text-white/60">Founded</dt><dd className="font-medium">{security.founded}</dd></div>
          </>
        ) : (
          <>
            <div><dt className="text-white/60">Index-Tracked</dt><dd className="font-medium">{security.indexTracked}</dd></div>
            <div><dt className="text-white/60">Category</dt><dd className="font-medium">{security.category}</dd></div>
            <div><dt className="text-white/60">Number of holdings</dt><dd className="font-medium">{security.holdingsCount}</dd></div>
            <div><dt className="text-white/60">Inception Date</dt><dd className="font-medium">{security.inceptionDate}</dd></div>
          </>
        )}
      </dl>
    </section>
  );
}

import { StockChart } from "@/components/stock-chart";
import { TimeframeSelector } from "@/components/timeframe-selector";

export default function Home() {
  const isPositive = true; // dummy value for color styling

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-black">
      <div className="w-full max-w-md px-4 py-8 sm:px-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            ProShares Ultra Semiconductors ETF
          </h1>
          <div className="mt-2 flex items-baseline gap-2">
            <p className={`text-5xl font-bold ${isPositive ? 'text-accent' : 'text-destructive'}`}>
              $87.51
            </p>
          </div>
          <p className={`mt-1 text-base font-medium ${isPositive ? 'text-accent' : 'text-destructive'}`}>
            +$79.29 (+964.44%) Past 5 years
          </p>
        </header>

        <StockChart />

        <div className="mt-6 mb-8">
          <TimeframeSelector />
        </div>

        <section aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-xl font-semibold mb-3">About</h2>
          <p className="text-muted-foreground text-base">
            USD provides 2x exposure to a market-cap-weighted index that tracks the performance of large US semiconductor companies.
          </p>
        </section>
      </div>
    </main>
  );
}

import { StockChart } from "@/components/stock-chart";
import { TimeframeSelector } from "@/components/timeframe-selector";

export default function Home() {
  const isPositive = true; // dummy value for color styling

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-black">
      <div className="w-full max-w-md px-4 py-8 sm:px-6">
        <header className="mb-4">
          <h1 className="text-2xl font-bold tracking-tight">
            ProShares Ultra Semiconductors ETF
          </h1>
          <div className="mt-1 flex items-baseline gap-2">
            <p className={`text-4xl font-bold ${isPositive ? 'text-accent' : 'text-destructive'}`}>
              $87.51
            </p>
          </div>
          <p className={`mt-1 text-sm font-medium ${isPositive ? 'text-accent' : 'text-destructive'}`}>
            +$79.29 (+964.44%) Past 5 years
          </p>
        </header>

        <StockChart />

        <div className="mt-4 mb-6">
          <TimeframeSelector />
        </div>

        <section aria-labelledby="about-heading">
          <h2 id="about-heading" className="text-lg font-semibold mb-2">About</h2>
          <p className="text-muted-foreground text-sm">
            USD provides 2x exposure to a market-cap-weighted index that tracks the performance of large US semiconductor companies.
          </p>
        </section>
      </div>
    </main>
  );
}

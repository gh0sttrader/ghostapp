
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

// Dummy data for demonstration
const symbols: { [key: string]: { name: string, price: number } } = {
  AAPL: { name: "Apple", price: 218.75 },
  TSLA: { name: "Tesla Inc.", price: 183.01 },
  VOO: { name: "Vanguard S&P 500 ETF", price: 504.23 },
  QQQ: { name: "Invesco QQQ Trust", price: 445.20 },
  ARKK: { name: "ARK Innovation ETF", price: 43.12 },
};

export default function SymbolPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params;
  const data = symbols[symbol] || { name: symbol, price: 0.00 };

  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="w-full max-w-md px-4 py-3 sm:px-6 mx-auto">
        <header className="flex items-center py-4">
          <Link href="/trade" className="p-2 -ml-2">
            <ChevronLeft className="h-6 w-6 text-white" />
          </Link>
        </header>

        <div className="flex flex-col mt-2">
          <h1 className="text-white text-2xl font-bold mb-1">{data.name}</h1>
          <p className="text-white text-4xl font-semibold">${data.price.toFixed(2)}</p>
        </div>
      </div>
    </main>
  );
}

import { ListSelector } from '@/components/list-selector';

export default function ListPage() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-black text-white">
      <div className="w-full max-w-md px-4 py-4 sm:px-6 mx-auto">
        <header className="flex justify-between items-center mb-6 pt-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Positions
          </h1>
          <ListSelector />
        </header>
        <div className="text-center text-muted-foreground py-20">
          <p>Your list content will appear here.</p>
        </div>
      </div>
    </main>
  );
}

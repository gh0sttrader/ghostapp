"use client";

import { cn } from "@/lib/utils";

const alertsData = [
  { symbol: 'AAPL', desc: 'Price above $200', time: '3m', status: 'new' },
  { symbol: 'TSLA', desc: 'Down 5% today', time: '15m', status: 'unread' },
  { symbol: 'SOXX', desc: 'Volume spike', time: '1H', status: 'read' },
  { symbol: 'BTC', desc: 'Hits new high', time: '2H', status: 'snoozed' },
];

const statusStyles = {
  new:      { dot: 'bg-green-500', font: 'font-bold' },
  unread:   { dot: 'bg-yellow-400', font: 'font-bold' },
  snoozed:  { dot: 'bg-sky-500', font: 'font-normal' },
  read:     { dot: 'bg-neutral-500', font: 'font-normal' },
};

type Alert = {
  symbol: string;
  desc: string;
  time: string;
  status: 'new' | 'unread' | 'snoozed' | 'read';
}

function AlertRow({ alert }: { alert: Alert }) {
  const style = statusStyles[alert.status] || statusStyles.read;
  return (
    <button className="flex flex-row items-center py-3 border-b border-neutral-800 w-full text-left">
      <div className="w-16">
        <div className="bg-neutral-800 rounded-full px-3 py-1 inline-block">
          <p className="text-white text-xs font-bold">{alert.symbol}</p>
        </div>
      </div>
      <div className={cn("flex-1 ml-2 text-white text-sm", style.font)}>
        <p>{alert.desc}</p>
      </div>
      <div className="text-neutral-400 text-xs w-10 text-right">
        {alert.time}
      </div>
      <div className="ml-3">
        <div className={cn("h-2.5 w-2.5 rounded-full", style.dot)} />
      </div>
    </button>
  );
}


export function AlertsList() {
  return (
    <div>
      {alertsData.map((alert, idx) => (
        <AlertRow alert={alert} key={idx} />
      ))}
    </div>
  );
}

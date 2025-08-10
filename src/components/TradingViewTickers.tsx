'use client';

import { useEffect, useRef, memo } from 'react';

function TradingViewTickers() {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elRef.current) return;

    // Reset container (prevents duplicate embeds on route changes)
    elRef.current.innerHTML = `
      <div class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span class="blue-text">Quotes by TradingView</span>
        </a>
      </div>
    `;

    const s = document.createElement('script');
    s.src = 'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'AMEX:SPY', title: 'S&P 500' },
        { proName: 'NASDAQ:QQQ', title: 'NASDAQ' },
        { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
      ],
      colorTheme: 'dark',
      locale: 'en',
      largeChartUrl: '',
      isTransparent: true,
      showSymbolLogo: false,
    });

    elRef.current.appendChild(s);

    return () => {
      if (elRef.current) elRef.current.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={elRef}
      className="tradingview-widget-container rounded-xl border border-zinc-800/60 bg-black/40 p-2"
      style={{ minHeight: 56 }}
    />
  );
}

export default memo(TradingViewTickers);

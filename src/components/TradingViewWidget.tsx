
'use client';

import { useEffect, useRef, memo } from 'react';

function TradingViewWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // clear (avoid duplicate scripts when navigating)
    if (containerRef.current.querySelector('script')) {
        return;
    }

    const script = document.createElement('script');
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-tickers.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'AMEX:SPY', title: 'S&P 500' },
        { proName: 'NASDAQ:QQQ', title: 'NASDAQ' },
        { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
      ],
      colorTheme: 'dark',
      locale: 'en',
      isTransparent: true,
      showSymbolLogo: false,
      largeChartUrl: '',
    });

    containerRef.current.appendChild(script);

  }, []);

  return (
    <div
      ref={containerRef}
      className="
        tradingview-widget-container
      "
    >
        <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TradingViewWidget);

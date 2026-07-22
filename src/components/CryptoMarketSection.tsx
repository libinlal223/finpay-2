import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EXCHANGE_RATES: Record<string, number> = {
  USD: 1.0,
  CNY: 7.25,
  JPY: 155.80,
  MYR: 4.70,
  BDT: 117.50,
  NPR: 133.50,
  AED: 3.67,
  INR: 83.50,
};

const CURRENCY_DETAILS: Record<string, { name: string; symbol: string; bgClass: string }> = {
  USD: { name: 'US Dollar', symbol: '$', bgClass: 'bg-green-50 text-green-600' },
  CNY: { name: 'Chinese Yuan', symbol: '¥', bgClass: 'bg-red-50 text-red-600' },
  JPY: { name: 'Japanese Yen', symbol: '¥', bgClass: 'bg-rose-50 text-rose-600' },
  MYR: { name: 'Malaysian Ringgit', symbol: 'RM', bgClass: 'bg-blue-50 text-blue-600' },
  BDT: { name: 'Bangladeshi Taka', symbol: '৳', bgClass: 'bg-green-50 text-green-700' },
  NPR: { name: 'Nepalese Rupee', symbol: '₨', bgClass: 'bg-orange-50 text-orange-600' },
  AED: { name: 'United Arab Emirates Dirham', symbol: 'د.إ', bgClass: 'bg-teal-50 text-teal-600' },
  INR: { name: 'Indian Rupee', symbol: '₹', bgClass: 'bg-indigo-50 text-indigo-600' },
};

const formatAmount = (num: number) => {
  if (isNaN(num)) return '';
  if (num === 0) return '0';
  if (num < 0.0001) return num.toFixed(6);
  if (num < 0.01) return num.toFixed(4);
  if (num < 1) return num.toFixed(3);
  return num.toFixed(2);
};

const formatAmount6 = (num: number) => {
  if (isNaN(num)) return '';
  if (num === 0) return '0.000000';
  if (num >= 100) return num.toFixed(2);
  if (num >= 10) return num.toFixed(4);
  return num.toFixed(6);
};

const COIN_KEYS = ['BTC', 'ETH', 'SOL', 'BNB', 'NEAR', 'USDT'];

export default function CryptoMarketSection() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [amountFrom, setAmountFrom] = useState('1');
  const [amountTo, setAmountTo] = useState('83.50');

  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const [fromFocused, setFromFocused] = useState(false);
  const [toFocused, setToFocused] = useState(false);

  const [rates, setRates] = useState<Record<string, number>>(EXCHANGE_RATES);
  const [step, setStep] = useState(0);

  // Cycle ticker box flips: every 3 seconds one of the boxes flips in turn
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Fetch live exchange rates on mount
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        
        if (data && data.result === 'success' && data.rates) {
          const apiRates = data.rates;
          const updatedRates: Record<string, number> = { ...EXCHANGE_RATES };
          
          // Map API rates to our supported currencies
          Object.keys(EXCHANGE_RATES).forEach((code) => {
            if (apiRates[code] !== undefined) {
              updatedRates[code] = apiRates[code];
            }
          });
          
          setRates(updatedRates);
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (err) {
        console.error('Failed to fetch live exchange rates. Falling back to local static rates.', err);
      }
    };

    fetchRates();
  }, []);

  const [cryptoPrices, setCryptoPrices] = useState<Record<string, { priceUsd: number; change24h: number }>>({
    BTC: { priceUsd: 65000.00, change24h: -2.30 },
    ETH: { priceUsd: 3450.00, change24h: 0.77 },
    SOL: { priceUsd: 145.20, change24h: 2.65 },
    BNB: { priceUsd: 580.40, change24h: 1.85 },
    NEAR: { priceUsd: 5.50, change24h: 4.12 },
    USDT: { priceUsd: 1.00, change24h: 0.00 },
  });
  const [syncStatus, setSyncStatus] = useState<'syncing' | 'live' | 'offline'>('offline');

  // Fetch live crypto prices on mount and every 20 seconds
  useEffect(() => {
    const fetchCryptoPrices = async () => {
      setSyncStatus('syncing');

      const fetchWithTimeout = async (url: string) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        try {
          const response = await fetch(url, { signal: controller.signal });
          clearTimeout(timeoutId);
          if (!response.ok) throw new Error(`Fetch failed for ${url}`);
          return await response.json();
        } catch (err) {
          clearTimeout(timeoutId);
          throw err;
        }
      };

      try {
        let data;
        try {
          // Primary Binance API endpoint
          data = await fetchWithTimeout('https://api.binance.com/api/v3/ticker/24hr?symbols=[%22BTCUSDT%22,%22ETHUSDT%22,%22SOLUSDT%22,%22BNBUSDT%22,%22NEARUSDT%22]');
        } catch (primaryErr) {
          console.warn('Primary Binance API blocked or slow, attempting mirror API3...', primaryErr);
          // Mirror API3 endpoint fallback
          data = await fetchWithTimeout('https://api3.binance.com/api/v3/ticker/24hr?symbols=[%22BTCUSDT%22,%22ETHUSDT%22,%22SOLUSDT%22,%22BNBUSDT%22,%22NEARUSDT%22]');
        }

        if (data && Array.isArray(data)) {
          setCryptoPrices((prev) => {
            const newPrices = { ...prev };
            data.forEach((item: any) => {
              const baseSymbol = item.symbol.replace('USDT', '');
              newPrices[baseSymbol] = {
                priceUsd: parseFloat(item.lastPrice),
                change24h: parseFloat(item.priceChangePercent),
              };
            });
            return newPrices;
          });
          setSyncStatus('live');
        }
      } catch (err) {
        console.error('All crypto APIs failed or timed out. Operating in offline/fallback mode.', err);
        setSyncStatus('offline');
      }
    };

    fetchCryptoPrices();
    const interval = setInterval(fetchCryptoPrices, 20000);
    return () => clearInterval(interval);
  }, []);

  // Recalculate amountTo when amountFrom, currencies, or rates change
  useEffect(() => {
    const val = parseFloat(amountFrom);
    if (!isNaN(val)) {
      const converted = val * (rates[toCurrency] / rates[fromCurrency]);
      setAmountTo(formatAmount(converted));
    } else {
      setAmountTo('');
    }
  }, [fromCurrency, toCurrency, amountFrom, rates]);

  const handleAmountFromChange = (val: string) => {
    // Only allow numbers and decimal point
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setAmountFrom(val);
    }
  };

  const handleAmountToChange = (val: string) => {
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setAmountTo(val);
      const parsedVal = parseFloat(val);
      if (!isNaN(parsedVal)) {
        const original = parsedVal * (rates[fromCurrency] / rates[toCurrency]);
        setAmountFrom(formatAmount(original));
      } else {
        setAmountFrom('');
      }
    }
  };

  const handleSwap = () => {
    const prevFrom = fromCurrency;
    const prevTo = toCurrency;
    setFromCurrency(prevTo);
    setToCurrency(prevFrom);

    // Also swap the amounts
    setAmountFrom(amountTo);
    setAmountTo(amountFrom);
  };

  const usdToInrRate = rates['INR'] || 83.50;

  const formatCryptoUsd = (price: number) => {
    return '$' + price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 10 ? 4 : 2
    });
  };

  const formatCryptoInr = (priceUsd: number) => {
    const priceInr = priceUsd * usdToInrRate;
    return '₹' + priceInr.toLocaleString('en-IN', {
      maximumFractionDigits: priceInr < 100 ? 2 : 0
    });
  };

  const getTickerCoinData = (code: string) => {
    const asset = cryptoPrices[code] || { priceUsd: 1.0, change24h: 0.0 };
    const priceFormatted = formatCryptoUsd(asset.priceUsd);
    const inrFormatted = formatCryptoInr(asset.priceUsd);
    const changeSign = asset.change24h >= 0 ? '+' : '';
    const changeFormatted = `${changeSign}${asset.change24h.toFixed(2)}%`;
    
    return {
      code,
      pair: code === 'USDT' ? 'USDT / USD' : `${code} / USDT`,
      price: priceFormatted,
      inrPrice: inrFormatted,
      change: changeFormatted,
      isPositive: asset.change24h >= 0,
      changeVal: asset.change24h
    };
  };

  const box1Index = (Math.floor((step + 1) / 2) * 2) % COIN_KEYS.length;
  const box2Index = ((Math.floor(step / 2) * 2) + 1) % COIN_KEYS.length;

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black flex items-center justify-center px-4 md:px-[6vw] py-24 z-10">

      <div
        className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16"
        style={{ alignItems: 'flex-start', paddingTop: '80px' }}
      >

        {/* Left Side: Feature content for the layout */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center w-full max-w-[420px] crypto-market-left-col"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 bg-white/[0.02] rounded font-['Outfit'] text-[11px] font-medium tracking-[0.15em] uppercase text-[#00E6A7] mb-6 w-fit">
            <span className="text-white/40">[</span>
            <span>Real-Time Market Rates</span>
            <span className="text-white/40">]</span>
          </div>
          <h2 className="shiny-text font-[800] text-[2rem] sm:text-[2.4rem] md:text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.05em] mb-10">
            GLOBAL<br />
            <span>EXCHANGE HUB</span>
          </h2>
          <p className="text-xs font-medium tracking-wide text-white/40 mt-1 mb-4">
            Real-time crypto valuations and live multi-currency conversions.
          </p>
          {/* Interactive Conversion Box */}
          <div
            className="shadow-[0_25px_60px_rgba(15,23,42,0.1)] w-full max-w-[420px] crypto-conversion-box"
          >
            {fromOpen && <div className="fixed inset-0 z-35" onClick={() => setFromOpen(false)} />}
            {toOpen && <div className="fixed inset-0 z-35" onClick={() => setToOpen(false)} />}

            {/* Top Row: Title & Live Rates Badge */}
            <div className="flex items-center justify-between" style={{ marginBottom: '1px' }}>
              <span
                className="text-[#1e293b]"
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '18px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em'
                }}
              >
                Instant Currency Converter
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(0,160,127,0.06)] border border-[rgba(0,160,127,0.15)] h-6 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgb(0,160,127)] animate-pulse shrink-0" />
                <span className="text-[9px] font-extrabold text-[rgb(0,160,127)] tracking-wider uppercase leading-none whitespace-nowrap">
                  Live Rates
                </span>
              </div>
            </div>

            {/* Prominent Core Exchange Rate Display */}
            <div style={{ marginBottom: '18px', textAlign: 'left' }}>
              <span
                className="text-xs text-[#64748b] font-medium block"
                style={{ marginBottom: '6px', fontFamily: 'Outfit, sans-serif' }}
              >
                Current Exchange Rate
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-[#1e293b] tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', lineHeight: '1.4' }}>
                {`1 ${CURRENCY_DETAILS[fromCurrency].name} = `}
                <span style={{ color: 'rgb(0, 160, 127)' }}>
                  {formatAmount(rates[toCurrency] / rates[fromCurrency])}
                </span>
                {` ${CURRENCY_DETAILS[toCurrency].name}`}
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
              {/* Box 1 (From) */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid',
                  borderColor: fromFocused ? 'rgb(0, 160, 127)' : '#cbd5e1',
                  boxShadow: fromFocused ? '0 0 0 4px rgba(0,160,127,0.08), 0 4px 12px rgba(15,23,42,0.03)' : '0 2px 4px rgba(15,23,42,0.01)',
                  borderRadius: '16px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease-in-out',
                  position: 'relative',
                  zIndex: fromOpen ? 40 : 20
                }}
              >
                <div className="flex flex-col flex-1 min-w-0 pr-4">
                  <span className="text-xs text-[#64748b] font-semibold mb-1">From</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amountFrom}
                    onChange={(e) => handleAmountFromChange(e.target.value)}
                    onFocus={() => setFromFocused(true)}
                    onBlur={() => setFromFocused(false)}
                    className="bg-transparent text-[#1e293b] font-bold text-2xl outline-none border-none p-0 focus:ring-0 placeholder-[#94a3b8] w-full h-8 leading-none"
                    placeholder="0.00"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  />
                </div>
                <div className="flex items-center shrink-0">
                  <div className="w-[1px] h-8 bg-[#e2e8f0] mr-4" />
                  <button
                    type="button"
                    onClick={() => {
                      setFromOpen(!fromOpen);
                      setToOpen(false);
                    }}
                    style={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '9999px',
                      padding: '6px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                      transition: 'all 0.15s ease-in-out',
                      color: '#1e293b',
                      fontWeight: 750,
                      fontSize: '14px',
                      fontFamily: "'Outfit', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <span className="font-extrabold text-sm tracking-wide">
                      {CURRENCY_DETAILS[fromCurrency].name}
                    </span>
                    <span style={{ fontSize: '9px', color: '#64748b' }}>▼</span>
                  </button>
                </div>
                {/* Dropdown Menu 1 */}
                <AnimatePresence>
                  {fromOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: 'calc(100% + 8px)',
                        width: '250px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px',
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        zIndex: 100,
                        maxHeight: '220px',
                        overflowY: 'auto',
                        fontFamily: "'Outfit', sans-serif"
                      }}
                    >
                      {Object.keys(rates).map((code) => {
                        const detail = CURRENCY_DETAILS[code];
                        return (
                          <button
                            key={code}
                            type="button"
                            className="w-full px-4 py-2.5 flex items-center justify-between text-left transition-colors text-sm hover:bg-[#f1f5f9]"
                            style={{
                              backgroundColor: fromCurrency === code ? '#f8fafc' : 'transparent',
                              color: fromCurrency === code ? 'rgb(0, 160, 127)' : '#1e293b',
                              fontWeight: fromCurrency === code ? 'bold' : 'normal',
                              border: 'none',
                              outline: 'none',
                              cursor: 'pointer',
                              fontFamily: "'Outfit', sans-serif"
                            }}
                            onClick={() => {
                              setFromCurrency(code);
                              setFromOpen(false);
                            }}
                          >
                            <div className="flex flex-col py-0.5">
                              <span className="font-bold text-[#1e293b] leading-tight">{code}</span>
                              <span className="text-[#64748b] text-[10px] truncate max-w-[170px]">{detail.name}</span>
                            </div>
                            {fromCurrency === code && (
                              <span className="text-[rgb(0, 160, 127)] text-sm font-bold">✓</span>
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Swap Button (Centered vertically between Box 1 and Box 2) */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '-14px',
                  marginBottom: '-14px',
                  position: 'relative',
                  zIndex: 30,
                  flexShrink: 0
                }}
              >
                <button
                  type="button"
                  onClick={handleSwap}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgb(0, 160, 127)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,160,127,0.25), 0 2px 4px rgba(0,0,0,0.05)',
                    border: '3.5px solid #ffffff',
                    transition: 'all 0.2s ease-in-out',
                    flexShrink: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(0, 130, 102)';
                    e.currentTarget.style.transform = 'scale(1.1) rotate(180deg)';
                    e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,160,127,0.35), 0 2px 4px rgba(0,0,0,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(0, 160, 127)';
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,160,127,0.25), 0 2px 4px rgba(0,0,0,0.05)';
                  }}
                  title="Swap Currencies"
                >
                  <svg style={{ width: '16px', height: '16px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>

              {/* Box 2 (To) */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid',
                  borderColor: toFocused ? 'rgb(0, 160, 127)' : '#cbd5e1',
                  boxShadow: toFocused ? '0 0 0 4px rgba(0,160,127,0.08), 0 4px 12px rgba(15,23,42,0.03)' : '0 2px 4px rgba(15,23,42,0.01)',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease-in-out',
                  position: 'relative',
                  zIndex: toOpen ? 40 : 20
                }}
              >
                <div className="flex flex-col flex-1 min-w-0 pr-4">
                  <span className="text-xs text-[#64748b] font-semibold mb-1">To</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amountTo}
                    onChange={(e) => handleAmountToChange(e.target.value)}
                    onFocus={() => setToFocused(true)}
                    onBlur={() => setToFocused(false)}
                    className="bg-transparent text-[#1e293b] font-bold text-2xl outline-none border-none p-0 focus:ring-0 placeholder-[#94a3b8] w-full h-8 leading-none"
                    placeholder="0.00"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  />
                </div>
                <div className="flex items-center shrink-0">
                  <div className="w-[1px] h-8 bg-[#e2e8f0] mr-4" />
                  <button
                    type="button"
                    onClick={() => {
                      setToOpen(!toOpen);
                      setFromOpen(false);
                    }}
                    style={{
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '9999px',
                      padding: '6px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                      transition: 'all 0.15s ease-in-out',
                      color: '#1e293b',
                      fontWeight: 750,
                      fontSize: '14px',
                      fontFamily: "'Outfit', sans-serif"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8fafc';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <span className="font-extrabold text-sm tracking-wide">
                      {CURRENCY_DETAILS[toCurrency].name}
                    </span>
                    <span style={{ fontSize: '9px', color: '#64748b' }}>▼</span>
                  </button>
                </div>
                {/* Dropdown Menu 2 */}
                <AnimatePresence>
                  {toOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        bottom: 'calc(100% + 8px)',
                        width: '250px',
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '16px',
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        boxShadow: '0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 -10px 10px -5px rgba(0, 0, 0, 0.04)',
                        zIndex: 100,
                        maxHeight: '220px',
                        overflowY: 'auto',
                        fontFamily: "'Outfit', sans-serif"
                      }}
                    >
                      {Object.keys(rates).map((code) => {
                        const detail = CURRENCY_DETAILS[code];
                        return (
                          <button
                            key={code}
                            type="button"
                            className="w-full px-4 py-2.5 flex items-center justify-between text-left transition-colors text-sm hover:bg-[#f1f5f9]"
                            style={{
                              backgroundColor: toCurrency === code ? '#f8fafc' : 'transparent',
                              color: toCurrency === code ? 'rgb(0, 160, 127)' : '#1e293b',
                              fontWeight: toCurrency === code ? 'bold' : 'normal',
                              border: 'none',
                              outline: 'none',
                              cursor: 'pointer',
                              fontFamily: "'Outfit', sans-serif"
                            }}
                            onClick={() => {
                              setToCurrency(code);
                              setToOpen(false);
                            }}
                          >
                            <div className="flex flex-col py-0.5">
                              <span className="font-bold text-[#1e293b] leading-tight">{code}</span>
                              <span className="text-[#64748b] text-[10px] truncate max-w-[170px]">{detail.name}</span>
                            </div>
                            {toCurrency === code && (
                              <span className="text-[rgb(0, 160, 127)] text-sm font-bold">✓</span>
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          {/* Left Column closed */}
        </motion.div>

        {/* Right Side Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="w-full max-w-[420px] min-w-0 crypto-market-right-col-wrapper"
        >
          <div className="crypto-market-right-col-inner">
            {/* Top Conversions Dynamic Card */}
            <div
              className="shadow-[0_25px_60px_rgba(15,23,42,0.06)] w-full currency-rate-card"
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '8px',
                  borderBottom: '1px solid #f1f5f9',
                  marginBottom: '6px'
                }}
              >
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>
                  Currency
                </span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#64748b' }}>
                  Rate (INR)
                </span>
              </div>
              <div
                style={{
                  fontSize: '9.5px',
                  color: '#94a3b8',
                  fontWeight: 500,
                  marginBottom: '10px',
                  textAlign: 'right',
                  lineHeight: '1'
                }}
              >
                Rates calculated against 1.00 unit base
              </div>

              {/* Dynamic Rates List */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {Object.keys(rates)
                  .filter((code) => code !== 'INR')
                  .slice(0, 9)
                  .map((code) => {
                    const detail = CURRENCY_DETAILS[code];
                    const rate = rates['INR'] / rates[code];
                    return (
                      <div
                        key={code}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '6px 0',
                          borderBottom: '1px solid #f8fafc'
                        }}
                        className="last:border-0"
                      >
                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#475569' }}>
                          {detail?.name || code}
                        </span>
                        <span style={{ fontSize: '13px', fontWeight: 750, color: 'rgb(0, 160, 127)', fontFamily: 'Outfit, sans-serif' }}>
                          {code === 'INR' ? '1.00' : formatAmount6(rate)}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Crypto Market Box Replica */}
            <div
              className="shadow-[0_20px_50px_rgba(0,0,0,0.3)] w-full border border-[#e2e8f0] crypto-market-box"
            >
              {/* Status Indicator */}
              <div style={{ position: 'absolute', top: '16px', right: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: syncStatus === 'live' ? '#10b981' : syncStatus === 'syncing' ? '#eab308' : '#64748b'
                }} />
                <span style={{ fontSize: '9px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>
                  {syncStatus}
                </span>
              </div>

              {/* Ticker Cards */}
              {(() => {
                const coin1 = getTickerCoinData(COIN_KEYS[box1Index]);
                const coin2 = getTickerCoinData(COIN_KEYS[box2Index]);
                return (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px', width: '100%' }}>
                    {/* Left Ticker Card */}
                    <div
                      className="min-w-0"
                      style={{
                        backgroundColor: '#f1f5f9',
                        borderRadius: '16px',
                        padding: '12px 20px',
                        overflow: 'hidden',
                        height: '84px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={box1Index}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#64748b', marginBottom: '4px' }}>
                            {coin1.pair}
                          </div>
                          <div className="text-[18px] font-bold leading-none" style={{ color: 'rgb(0, 160, 127)', marginBottom: '4px' }}>
                            {coin1.price}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-semibold" style={{ color: coin1.isPositive ? '#10b981' : coin1.changeVal < 0 ? '#ef4444' : '#64748b' }}>
                              {coin1.change}
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Right Ticker Card */}
                    <div
                      className="min-w-0"
                      style={{
                        backgroundColor: '#f1f5f9',
                        borderRadius: '16px',
                        padding: '12px 20px',
                        overflow: 'hidden',
                        height: '84px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                      }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={box2Index}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -12 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#64748b', marginBottom: '4px' }}>
                            {coin2.pair}
                          </div>
                          <div className="text-[18px] font-bold leading-none" style={{ color: 'rgb(0, 160, 127)', marginBottom: '4px' }}>
                            {coin2.price}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-semibold" style={{ color: coin2.isPositive ? '#10b981' : coin2.changeVal < 0 ? '#ef4444' : '#64748b' }}>
                              {coin2.change}
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })()}

              {/* Tabs */}
              <div className="flex gap-5 border-b pb-2 mb-3 text-[12px] font-bold" style={{ borderColor: '#f1f5f9' }}>
                <span className="border-b-2 pb-2 flex items-center gap-1 cursor-pointer" style={{ color: '#0f172a', borderColor: '#0f172a' }}>
                  USDT Markets <span className="text-[8px] translate-y-[0.5px]">▼</span>
                </span>
              </div>

               {/* Table */}
               <div className="overflow-x-auto w-full mt-4">
                 <table className="w-full text-left border-collapse" style={{ backgroundColor: 'transparent' }}>
                   <thead>
                     <tr className="border-b" style={{ borderColor: '#f1f5f9' }}>
                       <th className="text-[10px] font-extrabold uppercase tracking-wider pb-2 pr-3 w-[20%]" style={{ color: '#94a3b8' }}>Coin</th>
                       <th className="text-[10px] font-extrabold uppercase tracking-wider pb-2 px-3 w-[30%] text-right" style={{ color: '#94a3b8' }}>USDT</th>
                       <th className="text-[10px] font-extrabold uppercase tracking-wider pb-2 px-3 w-[30%] text-right" style={{ color: '#94a3b8' }}>INR</th>
                       <th className="text-[10px] font-extrabold uppercase tracking-wider pb-2 pl-3 text-right w-[20%]" style={{ color: '#94a3b8' }}>24H</th>
                     </tr>
                   </thead>
                   <tbody className="text-[11px] font-bold" style={{ color: '#1e293b' }}>
                     {COIN_KEYS.map((code, index) => {
                       const coin = getTickerCoinData(code);
                       const isLast = index === COIN_KEYS.length - 1;
                       return (
                         <tr
                           key={code}
                           className={`hover:bg-slate-50/50 transition-colors ${!isLast ? 'border-b' : ''}`}
                           style={{ borderColor: '#f1f5f9' }}
                         >
                           <td className="py-2.5 pr-3 font-extrabold" style={{ color: '#94a3b8' }}>
                             {coin.code}
                           </td>
                           <td className="py-2.5 px-3 text-right" style={{ color: '#1e293b' }}>
                             {coin.price}
                           </td>
                           <td className="py-2.5 px-3 text-right" style={{ color: '#475569' }}>
                             {coin.inrPrice}
                           </td>
                           <td className="py-2.5 pl-3 text-right">
                             <span
                               style={{
                                 color: coin.isPositive ? '#10b981' : coin.changeVal < 0 ? '#ef4444' : '#64748b'
                               }}
                             >
                               {coin.change}
                             </span>
                           </td>
                         </tr>
                       );
                     })}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
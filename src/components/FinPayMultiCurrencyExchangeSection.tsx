import { motion } from 'framer-motion';
import { Globe, Zap } from 'lucide-react';
import { Circle } from "lucide-react";

export default function FinPayMultiCurrencyExchangeSection() {
  return (
    <section className="relative w-full min-h-screen text-[#e8f0ee] py-20 px-6 md:px-10 lg:px-16 xl:px-24 selection:bg-[#00ff9d]/30 overflow-hidden bg-black flex items-center justify-center">

      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E6A7]/3 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="mx-auto max-w-[1440px] w-full relative z-10 flex flex-col items-center justify-center min-h-[80vh] gap-12">

        {/* Main Grid Layout - side-by-side on all viewports */}
        <div className="w-full grid grid-cols-12 gap-8 md:gap-12 items-center my-auto">

          {/* LEFT COLUMN: 8-Orbit Solar System Currency Animation */}
          <div className="col-span-6 flex items-center justify-center w-full relative min-h-[500px] md:min-h-[540px]">

            {/* Orbit Container with even larger scale multipliers for a bigger layout representation */}
            <div className="relative w-[800px] h-[800px] flex items-center justify-center select-none scale-[0.6] sm:scale-[0.8] md:scale-[0.98] lg:scale-[1.18] xl:scale-[1.38] 2xl:scale-[1.55] origin-center">

              {/* Concentric Orbit Rings and Orbiting Nodes */}
              {[
                { id: 1, diameter: 200, duration: 14, reverse: false, code: "MYR", startAngle: 0 },
                { id: 2, diameter: 280, duration: 18, reverse: true, code: "SGD", startAngle: 45 },
                { id: 3, diameter: 360, duration: 22, reverse: false, code: "THB", startAngle: 90 },
                { id: 4, diameter: 440, duration: 26, reverse: true, code: "JPY", startAngle: 135 },
                { id: 5, diameter: 520, duration: 30, reverse: false, code: "AED", startAngle: 180 },
                { id: 6, diameter: 600, duration: 34, reverse: true, code: "INR", startAngle: 225 },
                { id: 7, diameter: 680, duration: 38, reverse: false, code: "BDT", startAngle: 270 },
                { id: 8, diameter: 760, duration: 42, reverse: true, code: "CNY", startAngle: 315 }
              ].map(({ id, diameter, duration, reverse, code, startAngle }) => (
                <div
                  key={id}
                  className={`absolute rounded-full border border-[#00E6A7]/10 pointer-events-none ${id % 2 === 0 ? 'border-dashed' : ''
                    }`}
                  style={{ width: `${diameter}px`, height: `${diameter}px` }}
                >
                  {/* Rotating wrapper */}
                  <motion.div
                    style={{ rotate: startAngle }}
                    animate={{ rotate: reverse ? startAngle - 360 : startAngle + 360 }}
                    transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* Node positioned on orbit circumference, counter-rotated to remain upright */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        style={{ rotate: -startAngle }}
                        animate={{ rotate: reverse ? -(startAngle - 360) : -(startAngle + 360) }}
                        transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
                        className="px-4 py-2 rounded-full bg-[#050505]/95 border border-[#00E6A7]/40 shadow-[0_0_12px_rgba(0,230,167,0.25)] flex items-center justify-center pointer-events-auto cursor-pointer hover:border-[#00E6A7] transition-colors"
                      >
                        <span className="font-digital text-[0.95rem] font-bold text-[#00E6A7] tracking-wider uppercase">
                          {code}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              ))}

              {/* CENTER CIRCLE: USDT (The Sun) */}
              <div className="absolute w-[110px] h-[110px] rounded-full bg-[#050505] border-[3px] border-[#00E6A7] shadow-[0_0_32px_rgba(0,230,167,0.4)] flex items-center justify-center z-10 select-none pointer-events-none">
                <span className="font-['Outfit'] font-black text-lg text-white tracking-wide">
                  USDT
                </span>
                {/* Subtle pulse wave */}
                <div className="absolute inset-0 rounded-full border border-[#00E6A7] animate-ping opacity-20"></div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Text Content & Stacked Cards */}
          <div className="col-span-6 flex flex-col gap-6 md:gap-8 text-left w-full pl-[50px]">

            {/* Header info */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[0.75rem] md:text-[0.8rem] font-bold tracking-[0.3em] text-[#00E6A7]/80 uppercase block terminal-text-glow">
                SERVICE 03
              </span>
              <h2 className="font-['Outfit'] font-extrabold text-[clamp(2.0rem,4vw,3.0rem)] text-white leading-tight tracking-wide">
                Multi Currency Exchange
              </h2>
            </div>

            <p className="font-['Sora'] text-[0.88rem] md:text-[0.95rem] leading-relaxed text-zinc-400 tracking-wide max-w-[500px]">
              A global network built exchange USDT into multiple international currencies with competitive rates and reliable processing.
            </p>
            <br />
            <div className="flex flex-col gap-2 mt-1 max-w-[500px]">
              <span className="font-['Outfit'] font-bold text-[0.85rem] md:text-[0.9rem] text-zinc-200 uppercase tracking-widest text-[#00E6A7]/80 block">
                Supported Currencies
              </span>
              <div className="grid grid-cols-2 gap-x-12 gap-y-3.5 border-l border-zinc-800/80 pl-4 py-1">
                {[
                  { name: "Indian Rupee", code: "INR" },
                  { name: "UAE Dirham", code: "AED" },
                  { name: "Malaysian Ringgit", code: "MYR" },
                  { name: "Chinese Yuan", code: "CNY" },
                  { name: "Bangladeshi Taka", code: "BDT" },
                  { name: "Japanese Yen", code: "JPY" },
                  { name: "Indonesian Rupiah", code: "IDR" },
                  { name: "Nepalese Rupee", code: "NPR" }
                ].map(({ name, code }) => (
                  <div key={code} className="flex items-center gap-3 group/item">
                    {/* Special glowing green diamond bullet */}
                    <div className="w-3 h-3 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 bg-[#00E6A7] rotate-45 shadow-[0_0_8px_#00E6A7] group-hover/item:scale-125 transition-transform duration-300"></div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400 flex-shrink-0" />
                      <span className="font-['Outfit'] text-[0.85rem] md:text-[0.9rem] font-medium text-zinc-300 group-hover/item:text-white transition-colors duration-300">
                        {name}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
            <br />
            {/* Vertical Stack of Horizontal Cards with spacious design and thin borders */}
            <div className="flex flex-col gap-6 w-full max-w-[540px] mt-8">

              {/* Card 1: Global Reach */}
              <div className="relative rounded-xl border border-zinc-800/50 bg-[#0c0c0c]/40 backdrop-blur-sm p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_4px_24px_rgba(0,0,0,0.5)] hover:border-[#00E6A7]/30 hover:shadow-[0_0_24px_rgba(0,230,167,0.04)] transition-all duration-300 group flex items-center gap-6">

                {/* Left Side Icon Badge - transparent inside with border outline */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#00E6A7]/30 bg-black/40 flex items-center justify-center text-[#00E6A7] group-hover:border-[#00E6A7] group-hover:shadow-[0_0_12px_rgba(0,230,167,0.2)] group-hover:scale-105 transition-all duration-300">
                  <Globe className="w-5.5 h-5.5 text-[#00E6A7]" />
                </div>

                {/* Right Side Text details */}
                <div className="flex-grow">
                  <h4 className="font-['Outfit'] font-bold text-[1.02rem] md:text-[1.08rem] text-white tracking-wide mb-1 leading-snug">
                    Multi-Currency Support
                  </h4>
                  <p className="font-['Sora'] text-[0.82rem] md:text-[0.88rem] text-zinc-400 leading-normal">
                    Exchange USDT into major international currencies.                  </p>
                </div>

              </div>
              <br />
              {/* Card 2: Optimized Spreads */}
              <div className="relative rounded-xl border border-zinc-800/50 bg-[#0c0c0c]/40 backdrop-blur-sm p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03),0_4px_24px_rgba(0,0,0,0.5)] hover:border-[#00E6A7]/30 hover:shadow-[0_0_24px_rgba(0,230,167,0.04)] transition-all duration-300 group flex items-center gap-6">

                {/* Left Side Icon Badge - transparent inside with border outline */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#00E6A7]/30 bg-black/40 flex items-center justify-center text-[#00E6A7] group-hover:border-[#00E6A7] group-hover:shadow-[0_0_12px_rgba(0,230,167,0.2)] group-hover:scale-105 transition-all duration-300">
                  <Zap className="w-5.5 h-5.5 text-[#00E6A7]" />
                </div>

                {/* Right Side Text details */}
                <div className="flex-grow">
                  <h4 className="font-['Outfit'] font-bold text-[1.02rem] md:text-[1.08rem] text-white tracking-wide mb-1 leading-snug">
                    Optimized Spreads
                  </h4>
                  <p className="font-['Sora'] text-[0.82rem] md:text-[0.88rem] text-zinc-400 leading-normal">
                    Institutional grade liquidity pooling.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

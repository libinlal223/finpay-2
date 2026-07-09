import { motion } from 'framer-motion';
import { Clock, Layers, Globe, Shield } from 'lucide-react';

export default function FinPayCollectionSettlementSection() {
  return (
    <section className="relative w-full min-h-[65vh] text-[#e8f0ee] py-22 px-6 md:px-10 lg:px-16 xl:px-24 selection:bg-[#00ff9d]/30 overflow-hidden bg-black flex items-center justify-center">

      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E6A7]/3 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="mx-auto max-w-[1440px] w-full relative z-10 flex flex-col items-center justify-center min-h-[60vh] gap-12">

        {/* Main Grid Layout - side-by-side on all viewports */}
        <div className="w-full grid grid-cols-12 gap-8 md:gap-12 items-center my-auto">

          {/* LEFT COLUMN: Text Header & Feature Cards shifted 70px to the right */}
          <div className="col-span-6 flex flex-col gap-6 md:gap-8 text-left w-full pl-[70px]">
            <br />
            <br />
            <br />
            <br />
            {/* Header info */}
            <div className="flex flex-col gap-3">
              <span className="font-digital text-[0.80rem] md:text-[0.8rem] font-bold tracking-[0.25em] text-[#00E6A7] uppercase block terminal-text-glow">
                SERVICE 02
              </span>
              <h2 className="font-['Outfit'] font-black text-[clamp(2.2rem,3.5vw,3.6rem)] text-white leading-none tracking-tight">
                Payment Collection &<br />Settlement
              </h2>
            </div>
            <br />
            <p className="font-['Sora'] text-[0.85rem] md:text-[0.92rem] leading-relaxed text-zinc-400 max-w-[600px]">
              Automate the lifecycle of every transaction. Our settlement engine utilizes neural traces to track, verify, and consolidate payments from multiple origins into a unified digital vault.
            </p>
            <br />
            {/* Grid of 4 feature cards - 2x2 rectangular card layout */}
            <div
              className="grid grid-cols-2 mt-4 w-full max-w-[480px] md:max-w-[540px]"
              style={{ gap: '20px' }}
            >

              {/* Card 1: Real-time */}
              <div
                className="relative rounded-2xl border border-zinc-800/45 border-l-[3px] border-l-[#00E6A7] bg-white/[0.01] hover:bg-white/[0.02] shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-300 group flex flex-col justify-center"
                style={{ padding: '20px 20px 20px 28px', minHeight: '115px' }}
              >
                {/* Icon badge centered on the left border */}
                <div className="absolute left-[-15px] top-6 w-[30px] h-[30px] rounded-full bg-[#050505] border-2 border-[#00E6A7] flex items-center justify-center text-[#00E6A7] shadow-[0_0_8px_rgba(0,230,167,0.3)] z-10 group-hover:scale-105 transition-transform">
                  <Clock className="w-3.5 h-3.5 text-[#00E6A7]" />
                </div>
                <div>
                  <h4 className="font-['Outfit'] font-bold text-[0.85rem] md:text-[0.92rem] text-white tracking-wide mb-1 leading-snug">
                    Real-time
                  </h4>
                  <p className="font-['Sora'] text-[0.65rem] md:text-[0.72rem] text-zinc-400 leading-normal">
                    Instant ledger updates across global nodes.
                  </p>
                </div>
              </div>

              {/* Card 2: Bulk */}
              <div
                className="relative rounded-2xl border border-zinc-800/45 border-l-[3px] border-l-[#00E6A7] bg-white/[0.01] hover:bg-white/[0.02] shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-300 group flex flex-col justify-center"
                style={{ padding: '20px 20px 20px 28px', minHeight: '115px' }}
              >
                {/* Icon badge centered on the left border */}
                <div className="absolute left-[-15px] top-6 w-[30px] h-[30px] rounded-full bg-[#050505] border-2 border-[#00E6A7] flex items-center justify-center text-[#00E6A7] shadow-[0_0_8px_rgba(0,230,167,0.3)] z-10 group-hover:scale-105 transition-transform">
                  <Layers className="w-3.5 h-3.5 text-[#00E6A7]" />
                </div>
                <div>
                  <h4 className="font-['Outfit'] font-bold text-[0.85rem] md:text-[0.92rem] text-white tracking-wide mb-1 leading-snug">
                    Bulk
                  </h4>
                  <p className="font-['Sora'] text-[0.65rem] md:text-[0.72rem] text-zinc-400 leading-normal">
                    High-volume processing for payroll and payouts.
                  </p>
                </div>
              </div>

              {/* Card 3: Cross-border */}
              <div
                className="relative rounded-2xl border border-zinc-800/45 border-l-[3px] border-l-[#00E6A7] bg-white/[0.01] hover:bg-white/[0.02] shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all duration-300 group flex flex-col justify-center"
                style={{ padding: '20px 20px 20px 28px', minHeight: '115px' }}
              >
                {/* Icon badge centered on the left border */}
                <div className="absolute left-[-15px] top-6 w-[30px] h-[30px] rounded-full bg-[#050505] border-2 border-[#00E6A7] flex items-center justify-center text-[#00E6A7] shadow-[0_0_8px_rgba(0,230,167,0.3)] z-10 group-hover:scale-105 transition-transform">
                  <Globe className="w-3.5 h-3.5 text-[#00E6A7]" />
                </div>
                <div>
                  <h4 className="font-['Outfit'] font-bold text-[0.85rem] md:text-[0.92rem] text-white tracking-wide mb-1 leading-snug">
                    Cross-border
                  </h4>
                  <p className="font-['Sora'] text-[0.65rem] md:text-[0.72rem] text-zinc-400 leading-normal">
                    Frictionless international capital flow.
                  </p>
                </div>
              </div>

              {/* Card 4: Immutable */}
              <div
                className="relative rounded-2xl border border-zinc-800/45 border-l-[3px] border-l-[#00E6A7] bg-white/[0.01] hover:bg-white/[0.02] shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 group flex flex-col justify-center"
                style={{ padding: '20px 20px 20px 28px', minHeight: '115px' }}
              >
                {/* Icon badge centered on the left border */}
                <div className="absolute left-[-15px] top-6 w-[30px] h-[30px] rounded-full bg-[#050505] border-2 border-[#00E6A7] flex items-center justify-center text-[#00E6A7] shadow-[0_0_8px_rgba(0,230,167,0.3)] z-10 group-hover:scale-105 transition-transform">
                  <Shield className="w-3.5 h-3.5 text-[#00E6A7]" />
                </div>
                <div>
                  <h4 className="font-['Outfit'] font-bold text-[0.85rem] md:text-[0.92rem] text-white tracking-wide mb-1 leading-snug">
                    Immutable
                  </h4>
                  <p className="font-['Sora'] text-[0.65rem] md:text-[0.72rem] text-zinc-400 leading-normal">
                    Cryptographic proof for every operation.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN: Service 2 Image with Seesaw Animation */}
          <div className="col-span-6 flex items-center justify-center w-full">
            <motion.div
              animate={{
                rotate: [-3, 3, -3],
                x: [-12, 12, -12]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-full flex justify-center"
            >
              <img
                src="/service2.PNG"
                alt="Service 2 Graphic"
                className="w-full max-w-[500px] object-contain select-none pointer-events-none"
              />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}

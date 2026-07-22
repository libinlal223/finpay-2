export default function HeroSection() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>

      {/* Heading Content - Left */}
      <div className="absolute top-[10vh] left-[4vw] max-w-[600px] z-20 pointer-events-auto">
        <h1 className="shiny-text font-[800] text-[clamp(4rem,7vw,9rem)] leading-[0.9] tracking-[-0.06em] max-w-[800px]">
          THE NEW STANDARD<br />FOR  DIGITAL PAYMENTS
        </h1>
        <p className="mt-6 max-w-[480px] text-[1.1rem] leading-[1.6] text-white/65 tracking-[-0.02em]">
          Built for businesses, designed for growth, and engineered for the future of financial connectivity.
        </p>
        <div className="mt-8 inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 bg-white/[0.02] rounded font-['Outfit'] text-xs font-medium tracking-[0.15em] uppercase text-white/90">
          <span className="text-[#00E6A7]/70">[</span>
          <span>Finpay Ecosystem</span>
          <span className="text-[#00E6A7]/70">]</span>
        </div>
      </div>

      {/* Stats Card - Bottom Right */}
      <div className="absolute bottom-[5vh] right-[4vw] w-[240px] px-5 py-4 border border-white/10 bg-white/[0.02] rounded z-20 pointer-events-auto font-['Outfit']">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00E6A7] animate-pulse" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/55">Transactions</span>
        </div>
        <div className="text-base font-semibold tracking-wide text-white/90">24/7 Processing</div>
      </div>

    </div>
  );
}

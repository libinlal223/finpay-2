import { ShoppingCart, Cpu, Factory, Network, Layers } from 'lucide-react';

export default function FinPayBusinessSolutionsSection() {
  return (
    <section className="relative w-full min-h-[50vh] text-[#e8f0ee] py-10 px-6 md:px-10 lg:px-16 xl:px-24 selection:bg-[#00ff9d]/30 overflow-hidden bg-black flex items-center justify-center">

      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E6A7]/3 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="mx-auto max-w-[1440px] w-full relative z-10 flex flex-col items-center justify-center min-h-[45vh] gap-12">

        {/* Header Block */}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto w-full">
          <span className="font-digital text-[0.80rem] md:text-[0.8rem] font-bold tracking-[0.25em] text-[#00E6A7] uppercase block terminal-text-glow">
            SERVICE 04
          </span>
          <h2 className="font-['Outfit'] font-extrabold text-[clamp(2.2rem,4vw,3.2rem)] text-white leading-tight tracking-wide mb-4">
            Business Solutions
          </h2>
          <p className="font-['Sora'] text-[0.88rem] md:text-[0.95rem] leading-relaxed text-zinc-400 max-w-[560px] mx-auto">
            End-to-end onboarding support for merchants requiring international payment gateway infrastructure and collection systems.          </p>
        </div>
        <br />
        {/* 1 Row of 5 Columns Layout with Guaranteed Gap */}
        <div className="grid grid-cols-5 w-full max-w-[1320px] mx-auto mt-4" style={{ gap: '24px' }}>

          {/* Card 1: E-Commerce */}
          <div className="relative rounded-[28px] border border-[#00E6A7]/20 bg-[#070707] py-16 px-6 flex flex-col items-center text-center shadow-[0_0_20px_rgba(0,230,167,0.05),inset_0_1px_1px_rgba(255,255,255,0.02)] hover:border-[#00E6A7]/45 hover:shadow-[0_0_30px_rgba(0,230,167,0.18),inset_0_1px_1px_rgba(255,255,255,0.04)] transition-all duration-300 group">
            {/* Icon Outline Badge */}
            <br />
            <div className="w-12 h-12 rounded-full border border-[#00E6A7]/30 bg-black/40 flex items-center justify-center text-[#00E6A7] group-hover:border-[#00E6A7] group-hover:shadow-[0_0_12px_rgba(0,230,167,0.2)] group-hover:scale-105 transition-all duration-300 mb-8 flex-shrink-0">
              <ShoppingCart className="w-5.5 h-5.5 text-[#00E6A7]" />
            </div>
            <h3 className="font-['Outfit'] font-bold text-[1.12rem] text-white tracking-wide mb-4 leading-snug">
              E-Commerce
            </h3>
            <br />
            <p className="font-['Sora'] text-[0.8rem] text-zinc-400 leading-relaxed">
              Scalable checkout experiences with multi-asset support and instant vendor payouts.
            </p>
            <br />
          </div>

          {/* Card 2: Digital Merchants */}
          <div className="relative rounded-[28px] border border-[#00E6A7]/20 bg-[#070707] py-16 px-6 flex flex-col items-center text-center shadow-[0_0_20px_rgba(0,230,167,0.05),inset_0_1px_1px_rgba(255,255,255,0.02)] hover:border-[#00E6A7]/45 hover:shadow-[0_0_30px_rgba(0,230,167,0.18),inset_0_1px_1px_rgba(255,255,255,0.04)] transition-all duration-300 group">
            {/* Icon Outline Badge */}
            <br />
            <div className="w-12 h-12 rounded-full border border-[#00E6A7]/30 bg-black/40 flex items-center justify-center text-[#00E6A7] group-hover:border-[#00E6A7] group-hover:shadow-[0_0_12px_rgba(0,230,167,0.2)] group-hover:scale-105 transition-all duration-300 mb-8 flex-shrink-0">
              <Cpu className="w-5.5 h-5.5 text-[#00E6A7]" />
            </div>
            <h3 className="font-['Outfit'] font-bold text-[1.12rem] text-white tracking-wide mb-4 leading-snug">
              Digital Merchants
            </h3>
            <br />
            <p className="font-['Sora'] text-[0.8rem] text-zinc-400 leading-relaxed">
              Native stablecoin acceptance for SaaS, gaming, and digital service providers.
            </p>
          </div>

          {/* Card 3: Int. Suppliers */}
          <div className="relative rounded-[28px] border border-[#00E6A7]/20 bg-[#070707] py-16 px-6 flex flex-col items-center text-center shadow-[0_0_20px_rgba(0,230,167,0.05),inset_0_1px_1px_rgba(255,255,255,0.02)] hover:border-[#00E6A7]/45 hover:shadow-[0_0_30px_rgba(0,230,167,0.18),inset_0_1px_1px_rgba(255,255,255,0.04)] transition-all duration-300 group">
            {/* Icon Outline Badge */}
            <br />
            <div className="w-12 h-12 rounded-full border border-[#00E6A7]/30 bg-black/40 flex items-center justify-center text-[#00E6A7] group-hover:border-[#00E6A7] group-hover:shadow-[0_0_12px_rgba(0,230,167,0.2)] group-hover:scale-105 transition-all duration-300 mb-8 flex-shrink-0">
              <Factory className="w-5.5 h-5.5 text-[#00E6A7]" />
            </div>
            <h3 className="font-['Outfit'] font-bold text-[1.12rem] text-white tracking-wide mb-4 leading-snug">
              Int. Suppliers
            </h3>
            <br />
            <p className="font-['Sora'] text-[0.8rem] text-zinc-400 leading-relaxed">
              High-value supply chain financing and cross-border settlement protocols.
            </p>
            <br />
          </div>

          {/* Card 4: Global Ops */}
          <div className="relative rounded-[28px] border border-[#00E6A7]/20 bg-[#070707] py-16 px-6 flex flex-col items-center text-center shadow-[0_0_20px_rgba(0,230,167,0.05),inset_0_1px_1px_rgba(255,255,255,0.02)] hover:border-[#00E6A7]/45 hover:shadow-[0_0_30px_rgba(0,230,167,0.18),inset_0_1px_1px_rgba(255,255,255,0.04)] transition-all duration-300 group">
            {/* Icon Outline Badge */}
            <br />
            <div className="w-12 h-12 rounded-full border border-[#00E6A7]/30 bg-black/40 flex items-center justify-center text-[#00E6A7] group-hover:border-[#00E6A7] group-hover:shadow-[0_0_12px_rgba(0,230,167,0.2)] group-hover:scale-105 transition-all duration-300 mb-8 flex-shrink-0">
              <Network className="w-5.5 h-5.5 text-[#00E6A7]" />
            </div>
            <h3 className="font-['Outfit'] font-bold text-[1.12rem] text-white tracking-wide mb-4 leading-snug">
              Global Ops
            </h3>
            <br />
            <p className="font-['Sora'] text-[0.8rem] text-zinc-400 leading-relaxed">
              Unified treasury management for enterprises with distributed teams.
            </p>
            <br />
          </div>

          {/* Card 5: SaaS Platforms */}
          <div className="relative rounded-[28px] border border-[#00E6A7]/20 bg-[#070707] py-16 px-6 flex flex-col items-center text-center shadow-[0_0_20px_rgba(0,230,167,0.05),inset_0_1px_1px_rgba(255,255,255,0.02)] hover:border-[#00E6A7]/45 hover:shadow-[0_0_30px_rgba(0,230,167,0.18),inset_0_1px_1px_rgba(255,255,255,0.04)] transition-all duration-300 group">
            {/* Icon Outline Badge */}
            <br />
            <div className="w-12 h-12 rounded-full border border-[#00E6A7]/30 bg-black/40 flex items-center justify-center text-[#00E6A7] group-hover:border-[#00E6A7] group-hover:shadow-[0_0_12px_rgba(0,230,167,0.2)] group-hover:scale-105 transition-all duration-300 mb-8 flex-shrink-0">
              <Layers className="w-5.5 h-5.5 text-[#00E6A7]" />
            </div>
            <h3 className="font-['Outfit'] font-bold text-[1.12rem] text-white tracking-wide mb-4 leading-snug">
              SaaS Platforms
            </h3>
            <br />
            <p className="font-['Sora'] text-[0.8rem] text-zinc-400 leading-relaxed">
              Multi-tenant billing infrastructure with automated splits and global sub-accounts.
            </p>
            <br />
          </div>

        </div>

      </div>
    </section>
  );
}

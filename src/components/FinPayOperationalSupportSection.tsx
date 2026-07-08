import { ShoppingCart, Cpu, Factory, Network, Globe } from 'lucide-react';

export default function FinPayOperationalSupportSection() {
  return (
    <section className="relative w-full min-h-screen text-[#e8f0ee] py-24 px-6 md:px-10 lg:px-16 xl:px-24 selection:bg-[#00ff9d]/30 overflow-hidden bg-black flex items-center justify-center">

      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E6A7]/3 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="mx-auto max-w-[1440px] w-full relative z-10 flex flex-col items-center justify-center min-h-[80vh] gap-20">

        {/* Header Block */}
        <div className="flex flex-col items-center text-center max-w-[800px] mx-auto w-full">
          <span className="font-mono text-[0.75rem] md:text-[0.8rem] font-bold tracking-[0.3em] text-[#00E6A7]/80 uppercase block terminal-text-glow mb-3">

          </span>
          <h2 className="font-['Outfit'] font-extrabold text-[clamp(2.2rem,4vw,3.2rem)] text-white leading-tight tracking-wide">
            Payment Gateway Onboarding
          </h2>
        </div>
        <br />
        <p className="font-['Sora'] text-[0.8rem] text-zinc-400 leading-relaxed">
          Tailored financial infrastructure solutions for     </p>
        <br />
        <br />
        {/* Timeline Stepper Container Wrapper */}
        <div className="relative w-full max-w-[1100px] mx-auto">

          {/* Step Nodes Row */}
          <div className="relative z-10 w-full flex items-start justify-between">
            {/* Horizontal Connection Line */}
            <div
              className="absolute left-[9%] right-[9%] z-0 pointer-events-none"
              style={{
                backgroundColor: '#00E6A7',
                opacity: 0.35,
                top: '24px',
                height: '1.5px',
                boxShadow: '0 0 8px rgba(0, 230, 167, 0.4)'
              }}
            ></div>

            {/* Step 1: E-Commerce Businesses */}
            <div className="relative flex flex-col items-center w-[18%] text-center group">
              {/* Outline Circle Icon Badge */}
              <div
                className="rounded-full shadow-[0_0_12px_rgba(0,230,167,0.1)] group-hover:border-[#00E6A7] group-hover:shadow-[0_0_16px_rgba(0,230,167,0.25)] group-hover:scale-105 transition-all duration-300 flex-shrink-0"
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid rgba(0, 230, 167, 0.3)',
                  backgroundColor: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00E6A7',
                  marginBottom: '24px'
                }}
              >
                <ShoppingCart style={{ width: '22px', height: '22px', color: '#00E6A7' }} />
              </div>
              <h3 className="font-['Outfit'] font-bold text-[1.05rem] text-white tracking-wide mb-2 leading-snug">
                E-Commerce Businesses
              </h3>
              <p className="font-['Sora'] text-[0.75rem] text-zinc-400 leading-relaxed max-w-[150px]">
                Scalable global checkout and automated merchant settlement
              </p>
            </div>

            {/* Step 2: Digital Merchants */}
            <div className="relative flex flex-col items-center w-[18%] text-center group">
              {/* Outline Circle Icon Badge */}
              <div
                className="rounded-full shadow-[0_0_12px_rgba(0,230,167,0.1)] group-hover:border-[#00E6A7] group-hover:shadow-[0_0_16px_rgba(0,230,167,0.25)] group-hover:scale-105 transition-all duration-300 flex-shrink-0"
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid rgba(0, 230, 167, 0.3)',
                  backgroundColor: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00E6A7',
                  marginBottom: '24px'
                }}
              >
                <Cpu style={{ width: '22px', height: '22px', color: '#00E6A7' }} />
              </div>
              <h3 className="font-['Outfit'] font-bold text-[1.05rem] text-white tracking-wide mb-2 leading-snug">
                Digital Merchants
              </h3>
              <p className="font-['Sora'] text-[0.75rem] text-zinc-400 leading-relaxed max-w-[150px]">
                Seamless API integrations for digital goods and subscriptions
              </p>
            </div>

            {/* Step 3: International Suppliers */}
            <div className="relative flex flex-col items-center w-[18%] text-center group">
              {/* Outline Circle Icon Badge */}
              <div
                className="rounded-full shadow-[0_0_12px_rgba(0,230,167,0.1)] group-hover:border-[#00E6A7] group-hover:shadow-[0_0_16px_rgba(0,230,167,0.25)] group-hover:scale-105 transition-all duration-300 flex-shrink-0"
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid rgba(0, 230, 167, 0.3)',
                  backgroundColor: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00E6A7',
                  marginBottom: '24px'
                }}
              >
                <Factory style={{ width: '22px', height: '22px', color: '#00E6A7' }} />
              </div>
              <h3 className="font-['Outfit'] font-bold text-[1.05rem] text-white tracking-wide mb-2 leading-snug">
                International Suppliers
              </h3>
              <p className="font-['Sora'] text-[0.75rem] text-zinc-400 leading-relaxed max-w-[150px]">
                B2B payment processing and supply chain financing
              </p>
            </div>

            {/* Step 4: Global Payment Operations */}
            <div className="relative flex flex-col items-center w-[18%] text-center group">
              {/* Outline Circle Icon Badge */}
              <div
                className="rounded-full shadow-[0_0_12px_rgba(0,230,167,0.1)] group-hover:border-[#00E6A7] group-hover:shadow-[0_0_16px_rgba(0,230,167,0.25)] group-hover:scale-105 transition-all duration-300 flex-shrink-0"
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid rgba(0, 230, 167, 0.3)',
                  backgroundColor: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00E6A7',
                  marginBottom: '24px'
                }}
              >
                <Network style={{ width: '22px', height: '22px', color: '#00E6A7' }} />
              </div>
              <h3 className="font-['Outfit'] font-bold text-[1.05rem] text-white tracking-wide mb-2 leading-snug">
                Global Payment Operations
              </h3>
              <p className="font-['Sora'] text-[0.75rem] text-zinc-400 leading-relaxed max-w-[150px]">
                Multi-entity treasury control and payment routing
              </p>
            </div>

            {/* Step 5: Cross-Border Enterprises */}
            <div className="relative flex flex-col items-center w-[18%] text-center group">
              {/* Outline Circle Icon Badge */}
              <div
                className="rounded-full shadow-[0_0_12px_rgba(0,230,167,0.1)] group-hover:border-[#00E6A7] group-hover:shadow-[0_0_16px_rgba(0,230,167,0.25)] group-hover:scale-105 transition-all duration-300 flex-shrink-0"
                style={{
                  width: '48px',
                  height: '48px',
                  border: '1px solid rgba(0, 230, 167, 0.3)',
                  backgroundColor: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00E6A7',
                  marginBottom: '24px'
                }}
              >
                <Globe style={{ width: '22px', height: '22px', color: '#00E6A7' }} />
              </div>
              <h3 className="font-['Outfit'] font-bold text-[1.05rem] text-white tracking-wide mb-2 leading-snug">
                Cross-Border Enterprises
              </h3>
              <p className="font-['Sora'] text-[0.75rem] text-zinc-400 leading-relaxed max-w-[150px]">
                Unified global scale cross-border payments & FX management
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

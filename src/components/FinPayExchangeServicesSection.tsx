export default function FinPayExchangeServicesSection() {
  return (
    <section className="relative w-full min-h-[65vh] text-[#e8f0ee] py-22 px-4 md:px-8 xl:px-12 selection:bg-[#00ff9d]/30 overflow-hidden bg-black flex items-center justify-center">

      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col items-center justify-between min-h-[60vh] gap-12">

        {/* ========================================================= */}
        {/* HEADER                                                    */}
        {/* ========================================================= */}
        <div className="text-center w-full mt-4">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <h2 className="font-['Outfit'] font-extrabold text-[clamp(2.5rem,5vw,3.8rem)] tracking-tight leading-tight mt-2 uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#00E6A7] to-[#00D4FF] filter drop-shadow-[0_0_15px_rgba(0,230,167,0.3)]">
            GLOBAL PAYMENT SOLUTIONS
          </h2>
        </div>

        {/* ========================================================= */}
        {/* MAIN LAYOUT                                               */}
        {/* ========================================================= */}
        <div className="w-full grid grid-cols-12 gap-8 md:gap-12 items-center px-4 md:px-12 my-auto">

          {/* LEFT COLUMN: Exchange Corridors Image */}
          <div className="col-span-6 flex items-center justify-center w-full">
            <img
              src="/usdtex.png"
              alt="USDT Exchange Corridors"
              className="w-full max-w-[500px] object-contain select-none pointer-events-none"
            />
          </div>

          {/* RIGHT COLUMN: Description & Features */}
          <div className="col-span-6 flex flex-col gap-6 text-left w-full">

            <div className="flex flex-col gap-2">
              <span className="font-digital text-[0.80rem] md:text-[0.8rem] font-bold tracking-[0.25em] text-[#00E6A7] uppercase block terminal-text-glow">
                SERVICE 01
              </span>
              <h2 className="font-['Outfit'] font-extrabold text-[clamp(2.0rem,4vw,3.0rem)] text-white leading-tight tracking-wide">
                USDT Exchange Services
              </h2>
            </div>
            <br />
            <p className="font-['Sora'] text-[0.88rem] md:text-[0.95rem] leading-relaxed text-zinc-400 tracking-wide">
              Fast and reliable USDT exchange services with competitive market pricing and high-volume liquidity support.
            </p>

            <div className="flex flex-col gap-6 mt-6 w-full">

              {/* Item 1 */}
              <div className="border-l-2 border-zinc-800 hover:border-[#00E6A7] pl-4 py-1 transition-all duration-300 group cursor-pointer w-full max-w-[500px]">
                <span className="font-['Outfit'] text-[1.02rem] md:text-[1.1rem] font-semibold text-zinc-400 group-hover:text-white transition-colors tracking-wide block">
                  Instant USDT to global currency exchange
                </span>
              </div>

              {/* Item 2 */}
              <div className="border-l-2 border-zinc-800 hover:border-[#00E6A7] pl-4 py-1 transition-all duration-300 group cursor-pointer w-full max-w-[500px]">
                <span className="font-['Outfit'] text-[1.02rem] md:text-[1.1rem] font-semibold text-zinc-400 group-hover:text-white transition-colors tracking-wide block">
                  Fast and secure settlements
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

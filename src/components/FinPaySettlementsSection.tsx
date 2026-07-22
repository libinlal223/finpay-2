
export default function FinPaySettlementsSection() {
  return (
    <section className="relative w-full min-h-fit md:min-h-screen text-[#e8f0ee] about-finpay-section pb-20 px-4 md:px-8 xl:px-12 selection:bg-[#00ff9d]/30 overflow-hidden bg-black">

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center justify-start md:justify-between min-h-0 md:min-h-[85vh] gap-8 md:gap-12">

        {/* ========================================================= */}
        {/* HEADER                                                    */}
        {/* ========================================================= */}
        <div className="text-center w-full max-w-[900px] mt-4">

          <h2 className="font-['Outfit'] font-extrabold text-[clamp(2.5rem,5vw,3.8rem)] tracking-tight leading-tight mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00E6A7] to-[#00D4FF] filter drop-shadow-[0_0_15px_rgba(0,230,167,0.3)]">
            About  Finpay
          </h2>

        </div>

        {/* ========================================================= */}
        {/* MAIN LAYOUT (Overlapping Text columns and centered image) */}
        {/* ========================================================= */}
        <div className="w-full relative min-h-[60vh] flex items-center justify-center my-auto">

          {/* Centered Image Layer (z-index 10) */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-full max-w-[520px] md:max-w-[700px] aspect-square flex items-center justify-center opacity-25 md:opacity-75 transition-opacity duration-300">
              <img
                src="/set12.webp"
                alt="Settlements Graphic"
                className="w-full h-full object-contain select-none pointer-events-none"
              />
            </div>
          </div>

          {/* Interactive Text Columns Layer (z-index 20) */}
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-center justify-center z-20 relative px-4 md:px-8 xl:px-12 pointer-events-none">

            {/* LEFT SIDE: Developers/Platform Features */}
            <div className="col-span-1 md:col-span-4 flex flex-col gap-8 py-6 pointer-events-auto settlements-left-col">

              {/* Item 01 */}
              <div className="flex gap-4 items-start group settlements-first-para-item">
                <div>

                  <p className="font-['Sora'] text-[0.95rem] md:text-[1.02rem] leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors max-w-[420px] settlements-para-mobile-shift">
                    FINPAY is a global digital payment and settlement solutions <br className="hidden md:inline" /> provider specializing in stablecoin- <br className="hidden md:inline" /> based infrastructure and international support.
                  </p>
                </div>
              </div>
              <br />
              {/* Item 02 */}
              <div className="flex gap-4 items-start group">
                <div>

                  <p className="font-['Sora'] text-[0.95rem] md:text-[1.02rem] leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors max-w-[420px] settlements-para-mobile-shift">
                    We help businesses simplify cross-border payments, <br className="hidden md:inline" /> merchant settlements, and multi-currency exchanges
                  </p>
                </div>
              </div>

            </div>

            {/* CENTER EMPTY SPACER FOR OVERLAY */}
            <div className="hidden md:block col-span-4 h-full pointer-events-none" />

            {/* RIGHT SIDE: Enterprise/Ecosystem Features */}
            <div className="col-span-1 md:col-span-4 flex flex-col gap-8 py-6 pointer-events-auto settlements-right-col">
              <div className="mb-2">

              </div>
              <br />
              <br />
              <br />
              {/* Item 01 */}
              <div className="flex gap-4 items-start group settlements-right-item">
                <div>
                  <p className="font-['Sora'] text-[0.95rem] md:text-[1.02rem] leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors max-w-[420px] settlements-right-para">
                    Our services are designed for businesses <br className="hidden md:inline" /> requiring faster settlements, international payment <br className="hidden md:inline" /> flexibility, and scalable operations.
                  </p>
                </div>
              </div>
              <br />
              {/* Item 02 */}
              <div className="flex gap-4 items-start group settlements-right-item">
                <div>
                  <p className="font-['Sora'] text-[0.95rem] md:text-[1.02rem] leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors max-w-[420px] settlements-right-para">
                    FINPAY supports merchants, e-commerce, <br className="hidden md:inline" /> and trading partners with reliable <br className="hidden md:inline" /> payment collection systems and global currency exchange capabilities.
                  </p>
                </div>
              </div>


            </div>

          </div>

        </div>

      </div>
    </section >
  );
}

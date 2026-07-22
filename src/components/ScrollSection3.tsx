export default function GlobalNetworkSection() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>

      {/* Heading - Left Aligned with Slit Line */}
      <div className="absolute top-1/2 -translate-y-1/2 left-[4vw] max-w-[600px] z-20 flex gap-8 items-start pointer-events-auto">
        <div className="w-[2px] bg-[#00E6A7]/40 rounded-full h-[120px] mt-2 flex-shrink-0" />
        <div>
          <h2 className="shiny-text font-[800] text-[clamp(4rem,7vw,8rem)] leading-[0.9] tracking-[-0.06em]">
            FROM A SINGLE<br />TRANSACTION<br />TO A GLOBAL NETWORK
          </h2>
          <p className="mt-6 text-[1.2rem] text-white/65 max-w-[480px]">
            Every payment becomes part of a larger financial ecosystem connecting people, businesses, and opportunities.
          </p>
        </div>
      </div>

    </div>
  );
}

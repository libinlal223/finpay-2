export default function MoveMoneySection() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>

      {/* Heading & Stats - Right Aligned block */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[4vw] max-w-[500px] z-20 pointer-events-auto">
        <h2 className="shiny-text font-[800] text-[clamp(3.5rem,6vw,7rem)] leading-[0.9] tracking-[-0.06em]">
          MOVE MONEY<br />AT THE SPEED<br />OF MODERN BUSINESS
        </h2>
        <p className="mt-6 text-[1.1rem] text-white/65 max-w-[400px]">
          Whether local or global, every transaction flows through a secure and intelligent payment infrastructure.
        </p>
        <div className="mt-12 flex flex-col gap-6">
          <div className="flex gap-4 items-baseline">
            <span className="font-numbers text-[#00E6A7] font-bold text-xl">01</span>
            <span className="text-xl font-medium text-white/90">Instant Processing</span>
          </div>
          <div className="flex gap-4 items-baseline">
            <span className="font-numbers text-[#00E6A7] font-bold text-xl">02</span>
            <span className="text-xl font-medium text-white/90">Enterprise Security</span>
          </div>
          <div className="flex gap-4 items-baseline">
            <span className="font-numbers text-[#00E6A7] font-bold text-xl">03</span>
            <span className="text-xl font-medium text-white/90">Global Reach</span>
          </div>
        </div>
      </div>

    </div>
  );
}

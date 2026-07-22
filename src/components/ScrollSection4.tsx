export default function ConnectedSection() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>

      {/* Heading Content - Right Aligned */}
      <div className="absolute top-[15vh] right-[4vw] max-w-[600px] text-right z-20 pointer-events-auto">
        <h2 className="shiny-text font-[900] text-[clamp(4rem,7vw,9rem)] leading-[0.9] tracking-[-0.05em]">
          CONNECTED<br />WITHOUT BORDERS
        </h2>
        <p className="mt-6 text-[1.2rem] text-white/65 max-w-[480px] ml-auto">
          A unified infrastructure enabling secure financial interactions across markets, industries, and regions.
        </p>
      </div>

      {/* Stats 1 - Top Left */}
      <div className="absolute top-[20vh] left-[4vw] z-20 pointer-events-auto">
        <div className="shiny-text font-numbers text-4xl font-[700] mb-2">150+</div>
        <div className="text-white/70 text-sm tracking-wide uppercase">
          <span className="block md:inline">Countries</span>{" "}
          <span className="block md:inline">Connected</span>
        </div>
      </div>

      {/* Stats 2 - Bottom Left */}
      <div className="absolute bottom-[10vh] left-[4vw] z-20 pointer-events-auto">
        <div className="shiny-text font-numbers text-4xl font-[700] mb-2">Millions</div>
        <div className="text-white/70 text-sm tracking-wide uppercase">Transactions Enabled</div>
      </div>

      {/* Stats 3 - Bottom Right */}
      <div className="absolute bottom-[15vh] right-[4vw] text-right z-20 pointer-events-auto">
        <div className="shiny-text font-numbers text-4xl font-[700] mb-2">24/7</div>
        <div className="text-white/70 text-sm tracking-wide uppercase">Always Active</div>
      </div>

    </div>
  );
}

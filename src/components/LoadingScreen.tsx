interface LoadingScreenProps {
  progress: number;
  isComplete: boolean;
}

export default function LoadingScreen({ progress, isComplete }: LoadingScreenProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        backgroundColor: '#050505',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isComplete ? 0 : 1,
        pointerEvents: isComplete ? 'none' : 'auto',
        transform: isComplete ? 'scale(1.05)' : 'scale(1)',
        transition: 'opacity 0.7s ease-in-out, transform 0.7s ease-in-out',
      }}
    >
      {/* Ambient Radial Background Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(0, 230, 167, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content Box */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">


        {/* Large Shiny Percentage Counter */}
        <div className="shiny-text font-numbers text-6xl md:text-8xl font-[800] tracking-tight mb-8">
          {Math.min(100, Math.max(0, Math.round(progress)))}%
        </div>

        {/* Very Thin Green Loading Bar */}
        <div className="w-[240px] sm:w-[300px] md:w-[360px] h-[2px] bg-white/10 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-[#00E6A7] transition-all duration-200 ease-out rounded-full"
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              boxShadow: '0 0 12px rgba(0, 230, 167, 0.9), 0 0 4px rgba(0, 230, 167, 0.6)',
            }}
          />
        </div>

        {/* Dynamic Telemetry Status */}
        <div className="font-['Outfit'] text-xs uppercase tracking-[0.25em] text-white/60 h-6">
          {progress < 30 && 'Initializing Secure Gateway...'}
          {progress >= 30 && progress < 80 && 'Preloading Financial Scene...'}
          {progress >= 80 && progress < 100 && 'Finalizing Network Handshake...'}
          {progress >= 100 && 'System Ready'}
        </div>
      </div>
    </div>
  );
}


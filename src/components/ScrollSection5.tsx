import { motion } from 'framer-motion';

const nodes = [
  // Left Column (wavy, organic)
  { code: 'CNY', cx: '-8%',  cy: '12%' },
  { code: 'JPY', cx: '1%',   cy: '35%' },
  { code: 'IDR', cx: '-4%',  cy: '63%' },
  { code: 'MYR', cx: '-1%',  cy: '88%' },
  // Right Column (wavy, organic, unsymmetrical to left)
  { code: 'BDT', cx: '99%',  cy: '18%' },
  { code: 'NPR', cx: '106%', cy: '42%' },
  { code: 'INR', cx: '103%', cy: '58%' },
  { code: 'AED', cx: '110%', cy: '83%' },
];

export default function USDTExchangeSection() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>

      {/* Headline Layer */}
      <div className="absolute inset-0 w-full h-full z-30 pointer-events-none">
        {/* Top Title strictly positioned */}
        <div className="absolute top-[4vh] md:top-[6vh] left-1/2 -translate-x-1/2 w-full max-w-[900px] text-center px-6 pointer-events-auto">
          <h2 className="font-['Outfit'] font-[800] text-[clamp(2.4rem,4vw,3.6rem)] text-white leading-snug tracking-tight">
            Global USDT Exchange Services
          </h2>
          <p className="mt-6 text-sm md:text-[0.95rem] font-['Outfit'] leading-relaxed max-w-none mx-auto" style={{ color: '#00a07f' }}>
            Fast and reliable USDT exchange services with competitive market pricing and high-volume liquidity support.
          </p>
        </div>
      </div>

      {/* Orbit System Layer */}
      <div className="absolute inset-0 w-full h-full z-30 pointer-events-none section5-orbit-layer">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[500px] max-h-[500px] md:w-[500px] md:h-[500px]">
          <div className="orbit-container w-full h-full relative">

            {/* SVG Connection Lines */}
            <svg className="absolute inset-0 w-full h-full overflow-visible">
              {nodes.map((n, idx) => (
                <line
                  key={`line-${idx}`}
                  x1="50%" y1="50%"
                  x2={n.cx} y2={n.cy}
                  stroke="rgba(0,230,167,0.6)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  className="orbit-line-anim"
                />
              ))}
            </svg>

            {/* Orbiting Nodes */}
            {nodes.map((n, idx) => (
              <div
                key={`node-${idx}`}
                className="orbit-node absolute pointer-events-auto"
                style={{ top: n.cy, left: n.cx }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3.5 + (idx % 3) * 0.6,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/85 border border-[#00E6A7]/25 backdrop-blur-sm shadow-[0_0_12px_rgba(0,230,167,0.08)] hover:border-[#00E6A7]/50 transition-all duration-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E6A7] shadow-[0_0_6px_#00E6A7]" />
                  <div className="font-['Outfit'] font-bold text-white text-[0.75rem] md:text-[0.8rem] tracking-wider leading-none">
                    {n.code}
                  </div>
                </motion.div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Floating Icons Layer */}
      <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">

        {/* Left Side Icon 1 - Top Left */}
        <motion.div
          className="absolute left-[4vw] md:left-[6vw] top-[20vh] md:top-[22vh] flex items-center justify-center pointer-events-auto"
          style={{ width: 'clamp(48px, 6vw, 84px)', height: 'clamp(48px, 6vw, 84px)' }}
          animate={{ y: [0, -12, 8, -6, 0], x: [0, 8, -8, 6, 0], rotate: [0, 6, -6, 4, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img src="/icon1.webp" alt="Icon 1" className="object-contain w-full h-full"
            style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }} />
        </motion.div>

        {/* Left Side Icon 3 - Mid Left */}
        <motion.div
          className="absolute left-[10vw] md:left-[14vw] top-[43vh] md:top-[45vh] flex items-center justify-center pointer-events-auto"
          style={{ width: 'clamp(44px, 5.5vw, 80px)', height: 'clamp(44px, 5.5vw, 80px)' }}
          animate={{ y: [0, -10, 6, -8, 0], x: [0, -6, 8, -4, 0], rotate: [0, -5, 5, -3, 0] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        >
          <img src="/icon3.webp" alt="Icon 3" className="object-contain w-full h-full"
            style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }} />
        </motion.div>

        {/* Left Side Icon 2 - Bottom Left */}
        <motion.div
          className="absolute left-[5vw] md:left-[7vw] top-[66vh] md:top-[68vh] flex items-center justify-center pointer-events-auto"
          style={{ width: 'clamp(48px, 6vw, 84px)', height: 'clamp(48px, 6vw, 84px)' }}
          animate={{ y: [0, -11, 7, -5, 0], x: [0, 7, -7, 5, 0], rotate: [0, -6, 6, -4, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <img src="/icon2.webp" alt="Icon 2" className="object-contain w-full h-full"
            style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }} />
        </motion.div>

        {/* Right Side Icon 2 - Top Right */}
        <motion.div
          className="absolute right-[4vw] md:right-[6vw] top-[24vh] md:top-[26vh] flex items-center justify-center pointer-events-auto"
          style={{ width: 'clamp(44px, 5.5vw, 80px)', height: 'clamp(44px, 5.5vw, 80px)' }}
          animate={{ y: [0, -9, 5, -7, 0], x: [0, -7, 7, -5, 0], rotate: [0, 5, -5, 3, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <img src="/icon2.webp" alt="Icon 2 Duplicate" className="object-contain w-full h-full"
            style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }} />
        </motion.div>

        {/* Right Side Icon 1 - Mid Right */}
        <motion.div
          className="absolute right-[9vw] md:right-[12vw] top-[55vh] md:top-[58vh] flex items-center justify-center pointer-events-auto"
          style={{ width: 'clamp(48px, 6vw, 84px)', height: 'clamp(48px, 6vw, 84px)' }}
          animate={{ y: [0, -13, 8, -6, 0], x: [0, 9, -9, 6, 0], rotate: [0, -7, 7, -5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        >
          <img src="/icon1.webp" alt="Icon 1 Duplicate" className="object-contain w-full h-full"
            style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }} />
        </motion.div>

        {/* Right Side Icon 3 - Bottom Right */}
        <motion.div
          className="absolute right-[5vw] md:right-[8vw] top-[70vh] md:top-[74vh] flex items-center justify-center pointer-events-auto"
          style={{ width: 'clamp(44px, 5.5vw, 80px)', height: 'clamp(44px, 5.5vw, 80px)' }}
          animate={{ y: [0, -11, 7, -6, 0], x: [0, -8, 8, -5, 0], rotate: [0, 6, -6, 3, 0] }}
          transition={{ duration: 8.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        >
          <img src="/icon3.webp" alt="Icon 3 Duplicate" className="object-contain w-full h-full"
            style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }} />
        </motion.div>

      </div>

      {/* Built For High-Volume... TEXT LAYER - Positioned at the bottom of the page */}
      <div className="absolute bottom-[3vh] md:bottom-[5vh] left-1/2 -translate-x-1/2 w-full max-w-[1000px] text-center px-6 pointer-events-auto">
        <h3 className="font-['Outfit'] font-[800] text-[clamp(1.4rem,2.5vw,2.2rem)] text-white mb-5 tracking-tight">
          Built For High-Volume Digital Asset Exchange
        </h3>
        <p className="font-['Outfit'] text-xs md:text-sm mb-3.5 leading-relaxed max-w-none mx-auto" style={{ color: '#00a180' }}>
          Secure, reliable, and efficient USDT conversion services designed for traders, businesses, brokers, and liquidity partners.
        </p>
      </div>

    </div>
  );
}

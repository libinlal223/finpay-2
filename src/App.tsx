import { useEffect, useState, useRef } from 'react';
import { useScroll, useSpring, useTransform, useMotionValueEvent, motion } from 'framer-motion';
import FinPaySettlementsSection from './components/FinPaySettlementsSection';
import FinPayExchangeServicesSection from './components/FinPayExchangeServicesSection';
import FinPayCollectionSettlementSection from './components/FinPayCollectionSettlementSection';
import FinPayMultiCurrencyExchangeSection from './components/FinPayMultiCurrencyExchangeSection';
import FinPayBusinessSolutionsSection from './components/FinPayBusinessSolutionsSection';
import FinPayOperationalSupportSection from './components/FinPayOperationalSupportSection';
import GlobalPaymentsMap from './components/GlobalPaymentsMap';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import Subpage from './components/Subpage';

const FRAME_COUNT = 192;

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHash = () => {
      setCurrentRoute(window.location.hash || '#home');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const isSubpage = ['#docs', '#security', '#privacy', '#terms', '#support'].includes(currentRoute);

  const [loadedCount, setLoadedCount] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [globeImages, setGlobeImages] = useState<HTMLImageElement[]>([]);

  // Float animation trigger state for the background canvas globe
  const [floatEnabled, setFloatEnabled] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const s6ScrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  // Mappings for total document height
  const rawFrameIndex1 = useTransform(scrollYProgress, [0, 0.35], [1, FRAME_COUNT]);
  const smoothFrameIndex1 = useSpring(rawFrameIndex1, { stiffness: 400, damping: 40, restDelta: 0.5 });

  const rawFrameIndex2 = useTransform(scrollYProgress, [0.35, 0.65], [1, FRAME_COUNT]);
  const smoothFrameIndex2 = useSpring(rawFrameIndex2, { stiffness: 400, damping: 40, restDelta: 0.5 });

  const seq1Opacity = useTransform(scrollYProgress, [0.3, 0.35], [1, 0]);
  const seq2Opacity = useTransform(scrollYProgress, [0.3, 0.35], [0, 1]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let loaded = 0;
    const totalToLoad = FRAME_COUNT * 2;
    const seq1: HTMLImageElement[] = [];
    const seq2: HTMLImageElement[] = [];

    const handleLoad = () => {
      loaded++;
      setLoadedCount(loaded);
      if (loaded === totalToLoad) {
        setImages(seq1);
        setGlobeImages(seq2);
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        requestAnimationFrame(() => renderCanvas(progress, seq1, seq2));
      }
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img1 = new Image();
      img1.src = `/sequence/frame_${String(i).padStart(6, '0')}.webp`;
      img1.decode().then(handleLoad).catch(handleLoad);
      seq1.push(img1);

      const img2 = new Image();
      img2.src = `/globe-sequence/frame_${String(i).padStart(3, '0')}.webp`;
      img2.decode().then(handleLoad).catch(handleLoad);
      seq2.push(img2);
    }
  }, []);

  function renderCanvas(progress: number, arr1 = images, arr2 = globeImages) {
    if (!canvasRef.current || arr1.length === 0 || arr2.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let f1 = Math.round(smoothFrameIndex1.get()) - 1;
    let f2 = Math.round(smoothFrameIndex2.get()) - 1;

    // Safety fallback
    if (f1 < 0) f1 = progress <= 0.35 ? Math.round((progress / 0.35) * (FRAME_COUNT - 1)) : FRAME_COUNT - 1;
    if (f2 < 0) {
      if (progress >= 0.4 && progress <= 0.8) f2 = Math.round(((progress - 0.4) / 0.4) * (FRAME_COUNT - 1));
      else if (progress > 0.8) f2 = FRAME_COUNT - 1;
      else f2 = 0;
    }

    f1 = Math.min(Math.max(f1, 0), FRAME_COUNT - 1);
    f2 = Math.min(Math.max(f2, 0), FRAME_COUNT - 1);

    const alpha1 = progress > 0.4 ? 0 : (progress < 0.35 ? 1 : seq1Opacity.get());
    const alpha2 = progress < 0.35 ? 0 : (progress > 0.4 ? 1 : seq2Opacity.get());

    const img1 = arr1[0];
    if (img1 && canvas.width !== img1.width) {
      canvas.width = img1.width;
      canvas.height = img1.height;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (alpha1 > 0 && arr1[f1]) {
      ctx.globalAlpha = alpha1;
      ctx.drawImage(arr1[f1], 0, 0, canvas.width, canvas.height);
    }

    if (alpha2 > 0 && arr2[f2]) {
      ctx.globalAlpha = alpha2;
      ctx.drawImage(arr2[f2], 0, 0, canvas.width, canvas.height);
    }
    ctx.globalAlpha = 1.0;
  };

  useMotionValueEvent(smoothFrameIndex1, "change", () => renderCanvas(scrollYProgress.get()));
  useMotionValueEvent(smoothFrameIndex2, "change", () => renderCanvas(scrollYProgress.get()));
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    renderCanvas(latest);
    if (latest >= 0.68 && !floatEnabled) {
      setFloatEnabled(true);
    } else if (latest < 0.68 && floatEnabled) {
      setFloatEnabled(false);
    }

    // Reset Section 06 scroll position to top when not fully at the end
    if (latest < 0.99 && s6ScrollRef.current) {
      s6ScrollRef.current.scrollTop = 0;
    }
  });

  // Section 01
  const s1Opacity = useTransform(scrollYProgress, [0, 0.015, 0.045, 0.06], [0, 1, 1, 0]);
  const s1Y = useTransform(scrollYProgress, [0, 0.015, 0.045, 0.06], [24, 0, 0, -24]);

  // Section 02
  const s2Opacity = useTransform(scrollYProgress, [0.06, 0.075, 0.12, 0.135], [0, 1, 1, 0]);
  const s2Y = useTransform(scrollYProgress, [0.06, 0.075, 0.12, 0.135], [24, 0, 0, -24]);
  const s2Stat1Op = useTransform(scrollYProgress, [0.065, 0.08, 0.12, 0.135], [0, 1, 1, 0]);
  const s2Stat1Y = useTransform(scrollYProgress, [0.065, 0.08, 0.12, 0.135], [24, 0, 0, -24]);
  const s2Stat2Op = useTransform(scrollYProgress, [0.07, 0.085, 0.12, 0.135], [0, 1, 1, 0]);
  const s2Stat2Y = useTransform(scrollYProgress, [0.07, 0.085, 0.12, 0.135], [24, 0, 0, -24]);
  const s2Stat3Op = useTransform(scrollYProgress, [0.075, 0.09, 0.12, 0.135], [0, 1, 1, 0]);
  const s2Stat3Y = useTransform(scrollYProgress, [0.075, 0.09, 0.12, 0.135], [24, 0, 0, -24]);

  // Section 03
  const s3Opacity = useTransform(scrollYProgress, [0.135, 0.15, 0.2, 0.21], [0, 1, 1, 0]);
  const s3Y = useTransform(scrollYProgress, [0.135, 0.15, 0.2, 0.21], [24, 0, 0, -24]);
  const s3LineHeight = useTransform(scrollYProgress, [0.135, 0.165, 0.2, 0.21], [0, 120, 120, 0]);

  // Section 04
  const s4Opacity = useTransform(scrollYProgress, [0.21, 0.225, 0.26, 0.27], [0, 1, 1, 0]);
  const s4Y = useTransform(scrollYProgress, [0.21, 0.225, 0.26, 0.27], [24, 0, 0, -24]);

  // Section 05 (USDT Exchange UI - Fades out before the last section)
  const s5Opacity = useTransform(scrollYProgress, [0.68, 0.72, 0.81, 0.84], [0, 1, 1, 0]);
  const s5Y = useTransform(scrollYProgress, [0.68, 0.72, 0.81, 0.84], [24, 0, 0, -24]);
  const s5PointerEvents = useTransform(scrollYProgress, (progress) => progress >= 0.7 && progress <= 0.81 ? "auto" as const : "none" as const);

  // Section 06 & 07 (Combined scrollable container in normal website flow)
  const s6Opacity = useTransform(scrollYProgress, [0.84, 0.87], [0, 1]);
  const s6PointerEvents = useTransform(scrollYProgress, (progress) => progress >= 0.85 ? "auto" as const : "none" as const);

  // Fade out the globe background when transitioning to Section 06
  const globeOpacity = useTransform(scrollYProgress, [0.80, 0.83], [1, 0]);
  const globeDisplay = useTransform(scrollYProgress, (progress) => progress >= 0.83 ? "none" as const : "block" as const);

  const nodes = [
    // Left Column (wavy, organic)
    { code: 'CNY', cx: '-8%', cy: '12%' },
    { code: 'JPY', cx: '1%', cy: '35%' },
    { code: 'IDR', cx: '-4%', cy: '63%' },
    { code: 'MYR', cx: '-1%', cy: '88%' },
    // Right Column (wavy, organic, unsymmetrical to left)
    { code: 'BDT', cx: '99%', cy: '18%' },
    { code: 'NPR', cx: '106%', cy: '42%' },
    { code: 'INR', cx: '103%', cy: '58%' },
    { code: 'AED', cx: '110%', cy: '83%' }
  ];

  if (isSubpage) {
    return <Subpage route={currentRoute} />;
  }

  return (
    <>
      {/* Loading Overlay */}
      {loadedCount < FRAME_COUNT * 2 && (
        <div className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center overflow-hidden touch-none">
          <div className="loader-container">
            <h1 className="text-3xl font-bold mb-4 tracking-tight">INITIALIZING EXPERIENCE</h1>
            <div className="text-xl text-zinc-400">Loading High-Fidelity Assets... {Math.round((loadedCount / (FRAME_COUNT * 2)) * 100)}%</div>
            <div className="loader-bar-bg">
              <div className="loader-bar-fill" style={{ width: `${(loadedCount / (FRAME_COUNT * 2)) * 100}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Experience */}
      <div className="bg-[#050505] text-white w-full">

        {/* FIXED MAIN CONTAINER */}
        <div className="fixed inset-0 w-full h-screen z-10 pointer-events-none">

          {/* Permanent Top Left Logo */}
          <div className="absolute top-6 left-6 z-50 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
            <img src="/logo.png" alt="Finpay Logo" style={{ width: '80px', height: 'auto', opacity: 0.95 }} />
          </div>

          {/* Canvas Background (Globe) */}
          <motion.div 
            className={`absolute inset-0 w-full h-full z-0 pointer-events-none ${floatEnabled ? 'float-globe' : ''}`}
            style={{ opacity: globeOpacity, display: globeDisplay }}
          >
            <canvas ref={canvasRef} className="w-full h-full object-cover block" />
          </motion.div>

          {/* SECTION 01 */}
          <motion.div
            className="absolute top-[10vh] left-[4vw] max-w-[600px] z-20 pointer-events-none"
            style={{ opacity: s1Opacity, y: s1Y }}
          >
            <motion.h1 className="shiny-text font-[800] text-[clamp(4rem,7vw,9rem)] leading-[0.9] tracking-[-0.06em] max-w-[800px]">
              THE NEW STANDARD<br />FOR  DIGITAL PAYMENTS
            </motion.h1>
            <motion.p className="mt-6 max-w-[480px] text-[1.1rem] leading-[1.6] text-white/65 tracking-[-0.02em]">
              Built for businesses, designed for growth, and engineered for the future of financial connectivity.
            </motion.p>
            <div className="mt-8 inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 bg-white/[0.02] rounded font-['Outfit'] text-xs font-medium tracking-[0.15em] uppercase text-white/90">
              <span className="text-[#00E6A7]/70">[</span>
              <span>Finpay Ecosystem</span>
              <span className="text-[#00E6A7]/70">]</span>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-[5vh] right-[4vw] w-[240px] px-5 py-4 border border-white/10 bg-white/[0.02] rounded z-20 pointer-events-none font-['Outfit']"
            style={{ opacity: s1Opacity, y: s1Y }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00E6A7] animate-pulse"></div>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/55">Transactions</span>
            </div>
            <div className="text-base font-semibold tracking-wide text-white/90">24/7 Processing</div>
          </motion.div>

          {/* SECTION 02 */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 right-[4vw] max-w-[500px] z-20 pointer-events-none"
            style={{ opacity: s2Opacity, y: s2Y }}
          >
            <motion.h2 className="shiny-text font-[800] text-[clamp(3.5rem,6vw,7rem)] leading-[0.9] tracking-[-0.06em]">
              MOVE MONEY<br />AT THE SPEED<br />OF MODERN BUSINESS
            </motion.h2>
            <motion.p className="mt-6 text-[1.1rem] text-white/65 max-w-[400px]">
              Whether local or global, every transaction flows through a secure and intelligent payment infrastructure.
            </motion.p>
            <div className="mt-12 flex flex-col gap-6">
              <motion.div style={{ opacity: s2Stat1Op, y: s2Stat1Y }} className="flex gap-4 items-baseline">
                <span className="font-numbers text-[#00E6A7] font-bold text-xl">01</span>
                <span className="text-xl font-medium text-white/90">Instant Processing</span>
              </motion.div>
              <motion.div style={{ opacity: s2Stat2Op, y: s2Stat2Y }} className="flex gap-4 items-baseline">
                <span className="font-numbers text-[#00E6A7] font-bold text-xl">02</span>
                <span className="text-xl font-medium text-white/90">Enterprise Security</span>
              </motion.div>
              <motion.div style={{ opacity: s2Stat3Op, y: s2Stat3Y }} className="flex gap-4 items-baseline">
                <span className="font-numbers text-[#00E6A7] font-bold text-xl">03</span>
                <span className="text-xl font-medium text-white/90">Global Reach</span>
              </motion.div>
            </div>
          </motion.div>

          {/* SECTION 03 */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 left-[4vw] max-w-[600px] z-20 flex gap-8 items-start pointer-events-none"
            style={{ opacity: s3Opacity, y: s3Y }}
          >
            <motion.div className="w-[2px] bg-[#00E6A7]/40 rounded-full mt-2" style={{ height: s3LineHeight }} />
            <div>
              <motion.h2 className="shiny-text font-[800] text-[clamp(4rem,7vw,8rem)] leading-[0.9] tracking-[-0.06em]">
                FROM A SINGLE<br />TRANSACTION<br />TO A GLOBAL NETWORK
              </motion.h2>
              <motion.p className="mt-6 text-[1.2rem] text-white/65 max-w-[480px]">
                Every payment becomes part of a larger financial ecosystem connecting people, businesses, and opportunities.
              </motion.p>
            </div>
          </motion.div>

          {/* SECTION 04 */}
          <motion.div
            className="absolute top-[15vh] right-[4vw] max-w-[600px] text-right z-20 pointer-events-none"
            style={{ opacity: s4Opacity, y: s4Y }}
          >
            <motion.h2 className="shiny-text font-[900] text-[clamp(4rem,7vw,9rem)] leading-[0.9] tracking-[-0.06em]">
              CONNECTED<br />WITHOUT BORDERS
            </motion.h2>
            <motion.p className="mt-6 text-[1.2rem] text-white/65 max-w-[480px] ml-auto">
              A unified infrastructure enabling secure financial interactions across markets, industries, and regions.
            </motion.p>
          </motion.div>

          <motion.div className="absolute top-[20vh] left-[4vw] z-20 pointer-events-none" style={{ opacity: s4Opacity, y: s4Y }}>
            <div className="shiny-text font-numbers text-4xl font-[700] mb-2">150+</div>
            <div className="text-white/70 text-sm tracking-wide uppercase">Countries Connected</div>
          </motion.div>

          <motion.div className="absolute bottom-[10vh] left-[4vw] z-20 pointer-events-none" style={{ opacity: s4Opacity, y: s4Y }}>
            <div className="shiny-text font-numbers text-4xl font-[700] mb-2">Millions</div>
            <div className="text-white/70 text-sm tracking-wide uppercase">Transactions Enabled</div>
          </motion.div>

          <motion.div className="absolute bottom-[15vh] right-[4vw] z-20 text-right pointer-events-none" style={{ opacity: s4Opacity, y: s4Y }}>
            <div className="shiny-text font-numbers text-4xl font-[700] mb-2">24/7</div>
            <div className="text-white/70 text-sm tracking-wide uppercase">Always Active</div>
          </motion.div>

          {/* SECTION 05 (USDT Exchange UI) */}
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: s5Opacity, y: s5Y, pointerEvents: s5PointerEvents }}
          >
            {/* Headline Layer */}
            <div className="absolute inset-0 w-full h-full z-30 pointer-events-none">
              {/* Top Title strictly positioned */}
              <div className="absolute top-[4vh] md:top-[6vh] left-[50%] -translate-x-[50%] w-full max-w-[900px] text-center px-6 pointer-events-auto">
                <h2 className="font-['Outfit'] font-[800] text-[clamp(2.4rem,4vw,3.6rem)] text-white leading-snug tracking-tight">
                  Global USDT Exchange Services
                </h2>
                <p className="mt-6 text-sm md:text-[0.95rem] font-['Outfit'] leading-relaxed max-w-none mx-auto" style={{ color: '#00a07f' }}>
                  Fast and reliable USDT exchange services with competitive market pricing and high-volume liquidity support.
                </p>
              </div>
            </div>

            {/* Orbit System Layer */}
            <div className="absolute inset-0 w-full h-full z-30 pointer-events-none">
              <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90vw] h-[90vw] max-w-[500px] max-h-[500px] md:w-[500px] md:h-[500px]">
                <div className="orbit-container w-full h-full">
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
                      className="orbit-node pointer-events-auto"
                      style={{ top: n.cy, left: n.cx }}
                    >
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 3.5 + (idx % 3) * 0.6,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/85 border border-[#00E6A7]/25 backdrop-blur-sm shadow-[0_0_12px_rgba(0,230,167,0.08)] hover:border-[#00E6A7]/50 transition-all duration-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E6A7] shadow-[0_0_6px_#00E6A7]"></span>
                        <div className="font-['Outfit'] font-bold text-white text-[0.75rem] md:text-[0.8rem] tracking-wider leading-none">{n.code}</div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Icons Layer */}
            <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
              {/* Left Side Icon 1: icon1.png (Original) */}
              <motion.div
                className="absolute left-[6vw] top-[22vh] flex items-center justify-center pointer-events-auto"
                style={{ width: '84px', height: '84px' }}
                animate={{
                  y: [0, -12, 8, -6, 0],
                  x: [0, 8, -8, 6, 0],
                  rotate: [0, 4, -4, 3, 0]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img
                  src="/icon1.png"
                  alt="Icon 1"
                  className="object-contain w-full h-full"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }}
                />
              </motion.div>

              {/* Left Side Icon 3: icon3.png (Original) */}
              <motion.div
                className="absolute left-[14vw] top-[45vh] flex items-center justify-center pointer-events-auto"
                style={{ width: '80px', height: '80px' }}
                animate={{
                  y: [0, -10, 6, -8, 0],
                  x: [0, -6, 8, -4, 0],
                  rotate: [0, -3, 3, -2, 0]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
              >
                <img
                  src="/icon3.png"
                  alt="Icon 3"
                  className="object-contain w-full h-full"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }}
                />
              </motion.div>

              {/* Left Side Icon 2: icon2.png (Original) */}
              <motion.div
                className="absolute left-[7vw] top-[68vh] flex items-center justify-center pointer-events-auto"
                style={{ width: '84px', height: '84px' }}
                animate={{
                  y: [0, -11, 7, -5, 0],
                  x: [0, 7, -7, 5, 0],
                  rotate: [0, -4, 4, -3, 0]
                }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <img
                  src="/icon2.png"
                  alt="Icon 2"
                  className="object-contain w-full h-full"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }}
                />
              </motion.div>

              {/* Right Side Icon 2 Duplicate: icon2.png */}
              <motion.div
                className="absolute right-[6vw] top-[26vh] flex items-center justify-center pointer-events-auto"
                style={{ width: '80px', height: '80px' }}
                animate={{
                  y: [0, -9, 5, -7, 0],
                  x: [0, -7, 7, -5, 0],
                  rotate: [0, 3, -3, 2, 0]
                }}
                transition={{
                  duration: 7.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <img
                  src="/icon2.png"
                  alt="Icon 2 Duplicate"
                  className="object-contain w-full h-full"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }}
                />
              </motion.div>

              {/* Right Side Icon 1 Duplicate: icon1.png */}
              <motion.div
                className="absolute right-[12vw] top-[58vh] flex items-center justify-center pointer-events-auto"
                style={{ width: '84px', height: '84px' }}
                animate={{
                  y: [0, -13, 8, -6, 0],
                  x: [0, 9, -9, 6, 0],
                  rotate: [0, -5, 5, -4, 0]
                }}
                transition={{
                  duration: 8.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <img
                  src="/icon1.png"
                  alt="Icon 1 Duplicate"
                  className="object-contain w-full h-full"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }}
                />
              </motion.div>
            </div>

            {/* Built For High-Volume... TEXT LAYER - Positioned at the bottom of the page */}
            <div className="absolute bottom-[3vh] md:bottom-[5vh] left-[50%] -translate-x-[50%] w-full max-w-[1000px] text-center px-6 pointer-events-auto">
              <h1 className="font-['Outfit'] font-[800] text-[clamp(1.4rem,2.5vw,2.2rem)] text-white mb-5 tracking-tight">
                Built For High-Volume Digital Asset Exchange
              </h1>
              <p className="font-['Outfit'] text-xs md:text-sm mb-3.5 leading-relaxed max-w-none mx-auto" style={{ color: '#00a180' }}>
                Secure, reliable, and efficient USDT conversion services designed for traders, businesses, brokers, and liquidity partners.
              </p>
            </div>
          </motion.div>

          {/* SECTION 06 & 07 (Combined scrollable container in normal website flow) */}
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: s6Opacity, pointerEvents: s6PointerEvents }}
          >
            <div ref={s6ScrollRef} className="w-full h-full pointer-events-auto overflow-y-auto">
              <FinPaySettlementsSection />
              <FinPayExchangeServicesSection />
              <FinPayCollectionSettlementSection />
              <FinPayMultiCurrencyExchangeSection />
              <FinPayBusinessSolutionsSection />
              <FinPayOperationalSupportSection />
              <GlobalPaymentsMap />
              <FAQSection />
              <Footer />
            </div>
          </motion.div>
        </div>

        {/* DUMMY SCROLL TRACK for the 3D Animation */}
        <div className="relative z-0 h-[1600vh] pointer-events-none"></div>
      </div>
    </>
  );
}


import { useEffect, useState, useRef } from 'react';
import { useScroll, useSpring, useTransform, useMotionValueEvent, useMotionValue, motion } from 'framer-motion';
import FinPaySettlementsSection from './components/FinPaySettlementsSection';
import FinPayExchangeServicesSection from './components/FinPayExchangeServicesSection';
import FinPayCollectionSettlementSection from './components/FinPayCollectionSettlementSection';
import FinPayMultiCurrencyExchangeSection from './components/FinPayMultiCurrencyExchangeSection';
import FinPayBusinessSolutionsSection from './components/FinPayBusinessSolutionsSection';
import FinPayOperationalSupportSection from './components/FinPayOperationalSupportSection';
import FinPayContactSection from './components/FinPayContactSection';
import GlobalPaymentsMap from './components/GlobalPaymentsMap';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import Subpage from './components/Subpage';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import Navbar from './components/Navbar';

const FRAME_COUNT = 192;
const MOBILE_INITIAL_PRELOAD = 25;
const MOBILE_WINDOW_BEHIND = 5;
const MOBILE_WINDOW_AHEAD = 20;
const MOBILE_UNLOAD_BUFFER = 10;

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
  const [targetPreloadCount, setTargetPreloadCount] = useState(192);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // ── Phase state machine ────────────────────────────────────────────────────
  // FRAMES              : Image-sequence globe (scroll 0–35%)
  // FORWARD_TRANSITION  : Forward video playing
  // SECTION5            : Video ended, orbit overlay visible
  // NORMAL_PAGE         : Scrolled past spacer into About/content sections
  // REVERSE_TRANSITION  : Reverse video playing (user scrolled back up)
  type HeroPhase = 'FRAMES' | 'FORWARD_TRANSITION' | 'SECTION5' | 'NORMAL_PAGE' | 'REVERSE_TRANSITION';
  const [heroPhase, setHeroPhase] = useState<HeroPhase>('FRAMES');
  const heroPhaseRef = useRef<HeroPhase>('FRAMES');

  const floatEnabled = heroPhase === 'SECTION5';
  const [section5ScrollTop, setSection5ScrollTop] = useState(0);

  // Performance optimizations
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const lastRenderRef = useRef({ f1: -1, alpha1: -1, alpha2: -1 });

  useEffect(() => {
    const checkPerformance = () => {
      const isMobile = window.innerWidth < 1024;
      const isTouch = navigator.maxTouchPoints > 0;
      const isLowPerf = isMobile || isTouch;
      setIsLowPerformance(isLowPerf);
      setTargetPreloadCount(isLowPerf ? MOBILE_INITIAL_PRELOAD : FRAME_COUNT);
    };
    checkPerformance();
    window.addEventListener('resize', checkPerformance);
    return () => window.removeEventListener('resize', checkPerformance);
  }, []);

  // Scroll lock during video transitions to prevent scroll drift
  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    if (heroPhase === 'FORWARD_TRANSITION' || heroPhase === 'REVERSE_TRANSITION') {
      document.body.style.overflow = 'hidden';
      window.addEventListener('wheel', preventDefault, { passive: false });
      window.addEventListener('touchmove', preventDefault, { passive: false });
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
    };
  }, [heroPhase]);



  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollTrackRef,
    offset: ["start start", "end end"]
  });

  // Mappings for total document height
  const rawFrameIndex1 = useTransform(scrollYProgress, [0, 0.35], [1, FRAME_COUNT]);
  const smoothFrameIndex1 = useSpring(rawFrameIndex1, { stiffness: 400, damping: 40, restDelta: 0.5 });

  const seq1Opacity = useTransform(scrollYProgress, [0.3, 0.35], [1, 0]);
  const seq2Opacity = useTransform(scrollYProgress, [0.3, 0.35], [0, 1]);

  const videoForRef = useRef<HTMLVideoElement | null>(null);
  const videoRevRef = useRef<HTMLVideoElement | null>(null);
  const activeVideoRef = useRef<'forward' | 'reverse'>('forward');
  const animationFrameIdRef = useRef<number | null>(null);
  const section5ScrollTopRef = useRef(0);

  const startVideoRenderLoop = () => {
    if (animationFrameIdRef.current) return;
    const loop = () => {
      renderCanvas(scrollYProgress.get(), undefined, true);
      const video = activeVideoRef.current === 'forward' ? videoForRef.current : videoRevRef.current;
      if (video && !video.paused && !video.ended) {
        animationFrameIdRef.current = requestAnimationFrame(loop);
      } else {
        animationFrameIdRef.current = null;
      }
    };
    animationFrameIdRef.current = requestAnimationFrame(loop);
  };

  const stopVideoRenderLoop = () => {
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
      animationFrameIdRef.current = null;
    }
  };

  // ── Stable transitionTo via ref pattern ──────────────────────────────────
  // transitionToRef always points to the current render's transitionTo.
  // Event listeners registered once in useEffect(fn, []) call
  // transitionToRef.current() so they always invoke the latest logic
  // without stale-closure risk, and without adding new hook calls.
  const transitionToRef = useRef<(next: HeroPhase) => void>(() => {});

  const transitionTo = (next: HeroPhase) => {
    const prev = heroPhaseRef.current;
    if (prev === next) return;
    heroPhaseRef.current = next;
    setHeroPhase(next);

    const videoFor = videoForRef.current;
    const videoRev = videoRevRef.current;

    // Stop whatever was playing
    if (prev === 'FORWARD_TRANSITION' || prev === 'REVERSE_TRANSITION') {
      stopVideoRenderLoop();
    }

    switch (next) {
      case 'FRAMES':
        if (videoFor) { videoFor.pause(); videoFor.currentTime = 0; }
        if (videoRev) { videoRev.pause(); videoRev.currentTime = 0; }
        activeVideoRef.current = 'forward';
        renderCanvas(scrollYProgress.get());
        break;

      case 'FORWARD_TRANSITION':
        activeVideoRef.current = 'forward';
        if (videoRev) { videoRev.pause(); videoRev.currentTime = 0; }
        if (videoFor) {
          videoFor.currentTime = 0;
          videoFor.playbackRate = 2.0;
          videoFor.play().then(startVideoRenderLoop).catch(console.error);
        }
        break;

      case 'SECTION5':
        if (videoFor) videoFor.pause();
        stopVideoRenderLoop();
        renderCanvas(scrollYProgress.get());
        const currentScroll = window.scrollY;
        setSection5ScrollTop(currentScroll);
        section5ScrollTopRef.current = currentScroll;
        aboutScrollProgressVal.set(0);
        break;

      case 'NORMAL_PAGE':
        // Fixed overlay fades out via aboutScrollProgress visuals — no video action
        break;

      case 'REVERSE_TRANSITION':
        activeVideoRef.current = 'reverse';
        if (videoFor) { videoFor.pause(); videoFor.currentTime = 0; }
        if (videoRev) {
          videoRev.currentTime = 0;
          videoRev.playbackRate = 2.0;
          videoRev.play().then(startVideoRenderLoop).catch(console.error);
        }
        break;
    }
  };

  // Keep the ref in sync with the current render's transitionTo.
  // This single assignment runs on every render (no hooks involved).
  transitionToRef.current = transitionTo;


  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const isTouch = navigator.maxTouchPoints > 0;
    const isMobileOrTouch = isMobile || isTouch;
    const targetCount = isMobileOrTouch ? MOBILE_INITIAL_PRELOAD : FRAME_COUNT;

    let loaded = 0;
    const seq1: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null);

    const handleLoad = () => {
      loaded++;
      setLoadedCount(loaded);
      if (loaded === targetCount) {
        setImages(seq1 as HTMLImageElement[]);
        imagesRef.current = seq1 as HTMLImageElement[];
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
        requestAnimationFrame(() => renderCanvas(progress, seq1 as HTMLImageElement[]));
      }
    };

    for (let i = 0; i < targetCount; i++) {
      const img1 = new Image();
      img1.src = `/sequence/frame_${String(i + 1).padStart(6, '0')}.webp`;
      img1.decode().then(handleLoad).catch(handleLoad);
      seq1[i] = img1;
    }

    const videoFor = videoForRef.current;
    const videoRev = videoRevRef.current;

    const handleLoadedData = () => renderCanvas(scrollYProgress.get());
    const handleEndedFor = () => transitionToRef.current('SECTION5');
    const handleEndedRev = () => transitionToRef.current('FRAMES');

    if (videoFor) {
      videoFor.addEventListener('loadeddata', handleLoadedData);
      videoFor.addEventListener('ended', handleEndedFor);
      if (videoFor.readyState >= 2) handleLoadedData();
    }
    if (videoRev) {
      videoRev.addEventListener('loadeddata', handleLoadedData);
      videoRev.addEventListener('ended', handleEndedRev);
      if (videoRev.readyState >= 2) handleLoadedData();
    }

    // ── Spacer-boundary detection (SECTION5 ↔ NORMAL_PAGE) ───────────────────
    // Calculated dynamically from window.scrollY to prevent Framer Motion's
    // cached element heights from locking aboutScrollProgress and causing overlaps.
    const handleBoundaryScroll = () => {
      const isCollapsed = heroPhaseRef.current === 'SECTION5' || heroPhaseRef.current === 'NORMAL_PAGE';
      const spacerHeight = isCollapsed 
        ? (section5ScrollTopRef.current + 1.2 * window.innerHeight) 
        : (14.4 * window.innerHeight);
      const startOfAbout = spacerHeight - window.innerHeight;

      const currentScrollY = window.scrollY;
      let progress = 0;
      if (currentScrollY > startOfAbout) {
        progress = (currentScrollY - startOfAbout) / window.innerHeight;
      }
      aboutScrollProgressVal.set(progress);

      const phase = heroPhaseRef.current;
      const goingDown = isScrollingDownRef.current;
      if (progress > 0 && phase === 'SECTION5') {
        transitionToRef.current('NORMAL_PAGE');
      } else if (progress <= 0 && phase === 'NORMAL_PAGE' && !goingDown) {
        transitionToRef.current('REVERSE_TRANSITION');
      }
    };
    window.addEventListener('scroll', handleBoundaryScroll, { passive: true });

    return () => {
      stopVideoRenderLoop();
      videoFor?.removeEventListener('loadeddata', handleLoadedData);
      videoFor?.removeEventListener('ended', handleEndedFor);
      videoRev?.removeEventListener('loadeddata', handleLoadedData);
      videoRev?.removeEventListener('ended', handleEndedRev);
      window.removeEventListener('scroll', handleBoundaryScroll);
    };
  }, []);


  function renderCanvas(progress: number, arr1 = images.length > 0 ? images : imagesRef.current, isLoopCall = false) {
    if (!canvasRef.current || arr1.length === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const phase = heroPhaseRef.current;
    const isTransitionPhase = phase === 'FORWARD_TRANSITION' || phase === 'REVERSE_TRANSITION';
    if (isTransitionPhase && !isLoopCall) {
      return;
    }
    if (phase === 'SECTION5' || phase === 'NORMAL_PAGE') {
      const video = videoForRef.current;
      if (video) {
        const maxW = isLowPerformance ? 800 : video.videoWidth || 1920;
        const aspectRatio = (video.videoHeight || 1080) / (video.videoWidth || 1920);
        const targetWidth = Math.min(video.videoWidth || 1920, maxW);
        const targetHeight = Math.round(targetWidth * aspectRatio);
        if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      return;
    }

    let f1 = Math.round(smoothFrameIndex1.get()) - 1;

    // Safety fallback
    if (f1 < 0) f1 = progress <= 0.35 ? Math.round((progress / 0.35) * (FRAME_COUNT - 1)) : FRAME_COUNT - 1;

    f1 = Math.min(Math.max(f1, 0), FRAME_COUNT - 1);

    let alpha1 = progress > 0.4 ? 0 : (progress < 0.35 ? 1 : seq1Opacity.get());
    let alpha2 = progress < 0.35 ? 0 : (progress > 0.4 ? 1 : seq2Opacity.get());

    const videoRev = videoRevRef.current;
    const isReversePlaying = activeVideoRef.current === 'reverse' && videoRev && !videoRev.paused && !videoRev.ended;
    if (isReversePlaying) {
      alpha1 = 0;
      alpha2 = 1;
    }

    // Mobile sliding window load/unload management
    if (isLowPerformance) {
      const activeStart = Math.max(0, f1 - MOBILE_WINDOW_BEHIND);
      const activeEnd = Math.min(FRAME_COUNT - 1, f1 + MOBILE_WINDOW_AHEAD);

      const keepStart = Math.max(0, activeStart - MOBILE_UNLOAD_BUFFER);
      const keepEnd = Math.min(FRAME_COUNT - 1, activeEnd + MOBILE_UNLOAD_BUFFER);

      for (let i = 0; i < FRAME_COUNT; i++) {
        if (i >= activeStart && i <= activeEnd) {
          if (!arr1[i]) {
            const img = new Image();
            img.src = `/sequence/frame_${String(i + 1).padStart(6, '0')}.webp`;
            img.decode().then(() => {
              arr1[i] = img;
              const currentF1 = Math.round(smoothFrameIndex1.get()) - 1;
              if (i === currentF1) {
                renderCanvas(scrollYProgress.get(), arr1, isLoopCall);
              }
            }).catch(() => {
              if (arr1[i] === img) arr1[i] = null as any;
            });
            arr1[i] = img;
          }
        } else if (i < keepStart || i > keepEnd) {
          if (arr1[i]) {
            arr1[i].src = "";
            arr1[i] = null as any;
          }
        }
      }
    }

    const video = activeVideoRef.current === 'forward' ? videoForRef.current : videoRev;
    const isVideoPlaying = video && !video.paused && !video.ended;

    const last = lastRenderRef.current;
    if (!isVideoPlaying && f1 === last.f1 && alpha1 === last.alpha1 && alpha2 === last.alpha2) {
      return;
    }
    lastRenderRef.current = { f1, alpha1, alpha2 };

    // Resolve nearest loaded fallback frame on mobile if current frame is loading
    let imgToDraw = arr1[f1];
    if (alpha1 > 0 && (!imgToDraw || !imgToDraw.complete)) {
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        const prevIdx = f1 - offset;
        const nextIdx = f1 + offset;
        if (prevIdx >= 0 && arr1[prevIdx] && arr1[prevIdx].complete) {
          imgToDraw = arr1[prevIdx];
          break;
        }
        if (nextIdx < FRAME_COUNT && arr1[nextIdx] && arr1[nextIdx].complete) {
          imgToDraw = arr1[nextIdx];
          break;
        }
      }
    }

    const img1 = imgToDraw || arr1[0];
    if (img1) {
      const maxW = isLowPerformance ? 800 : img1.width;
      const aspectRatio = img1.height / img1.width;
      const targetWidth = Math.min(img1.width, maxW);
      const targetHeight = Math.round(targetWidth * aspectRatio);

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (alpha1 > 0 && imgToDraw) {
      ctx.globalAlpha = alpha1;
      ctx.drawImage(imgToDraw, 0, 0, canvas.width, canvas.height);
    }

    if (alpha2 > 0 && video) {
      ctx.globalAlpha = alpha2;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    ctx.globalAlpha = 1.0;
  }

  const lastScrollYProgressRef = useRef(0);
  const isScrollingDownRef = useRef(true);

  // ── aboutScrollProgressVal is updated dynamically in our scroll listener ──
  // It goes 0→1 as the END of the spacer scrolls from the bottom of the viewport
  // to the top (i.e., one viewport-height worth of scroll past the spacer end).
  const aboutScrollProgressVal = useMotionValue(0);

  // Hide the entire fixed layer once it has scrolled completely off-screen (progress >= 1.0)
  const globeOpacity = useTransform(aboutScrollProgressVal, [0, 0.15], [1, 1]);
  const fixedLayerDisplay = useTransform(aboutScrollProgressVal, (progress) => progress >= 1.0 ? "none" as const : "block" as const);
  const globeDisplay = useTransform(aboutScrollProgressVal, (progress) => progress >= 1.0 ? "none" as const : "block" as const);

  useMotionValueEvent(smoothFrameIndex1, 'change', () => renderCanvas(scrollYProgress.get()));

  // ── Scroll handler — only emits phase transitions ──────────────────────────
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const prev = lastScrollYProgressRef.current;
    lastScrollYProgressRef.current = latest;
    const diff = latest - prev;
    if (Math.abs(diff) > 0.0003) isScrollingDownRef.current = diff > 0;
    const phase = heroPhaseRef.current;
    const goingDown = isScrollingDownRef.current;

    if (latest < 0.35) {
      // ── FRAMES zone ──
      // Do not interrupt the reverse transition while it is playing.
      // The transition back to FRAMES is handled by the reverse video's 'ended' event.
      if (phase !== 'FRAMES' && phase !== 'REVERSE_TRANSITION') {
        transitionTo('FRAMES');
      }
      renderCanvas(latest);
    } else {
      // ── Video / Section5 zone (0.35 – 1.0) ──
      if (latest >= 0.35 && phase === 'FRAMES' && goingDown) {
        transitionTo('FORWARD_TRANSITION');
      }
      if (phase === 'SECTION5' && !goingDown) {
        transitionTo('REVERSE_TRANSITION');
      }
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
  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 400, damping: 40, restDelta: 0.001 });
  const s4Opacity = useTransform(smoothScrollY, [0.273, 0.35], [0, 1]);
  const s4Y = useTransform(smoothScrollY, [0.273, 0.35], [24, 0]);


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
      {loadedCount < targetPreloadCount && (
        <div className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center overflow-hidden touch-none">
          <div className="loader-container">
            <motion.img
              src="/logoload.png"
              alt="Finpay Logo"
              className="mb-8 object-contain"
              style={{ width: '300px', height: 'auto', opacity: 0.95 }}
              animate={{
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="text-xl text-zinc-400">
              {(() => {
                const percent = Math.min(100, Math.round((loadedCount / targetPreloadCount) * 100));
                if (percent <= 25) return "Initializing FinPay Services...";
                if (percent <= 50) return "Verifying Exchange Services...";
                if (percent <= 75) return "Preparing Secure Transfer...";
                return "Almost Ready...";
              })()}{" "}
              {Math.min(100, Math.round((loadedCount / targetPreloadCount) * 100))}%
            </div>
            <div className="loader-bar-bg">
              <div className="loader-bar-fill" style={{ width: `${(loadedCount / targetPreloadCount) * 100}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Experience */}
      <div className="bg-[#050505] text-white w-full">


        {/* Spotlight Navigation Bar */}
        <Navbar scrollYProgress={scrollYProgress} />

        {/* FIXED MAIN CONTAINER */}
        <motion.div 
          className={`${
            (heroPhase === 'SECTION5' || heroPhase === 'NORMAL_PAGE') 
              ? 'absolute h-screen' 
              : 'fixed h-screen inset-0'
          } w-full z-10 pointer-events-none overflow-hidden`}
          style={{ 
            display: fixedLayerDisplay,
            top: (heroPhase === 'SECTION5' || heroPhase === 'NORMAL_PAGE') ? `${section5ScrollTop}px` : '0px'
          }}
        >

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
            style={{
              opacity: heroPhase === 'FRAMES' ? s4Opacity : 0,
              y: s4Y,
              transition: heroPhase === 'FRAMES' ? "none" : "opacity 0.6s ease-in-out"
            }}
          >
            <motion.h2 className="shiny-text font-[900] text-[clamp(4rem,7vw,9rem)] leading-[0.9] tracking-[-0.06em]">
              CONNECTED<br />WITHOUT BORDERS
            </motion.h2>
            <motion.p className="mt-6 text-[1.2rem] text-white/65 max-w-[480px] ml-auto">
              A unified infrastructure enabling secure financial interactions across markets, industries, and regions.
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute top-[20vh] left-[4vw] z-20 pointer-events-none"
            style={{
              opacity: heroPhase === 'FRAMES' ? s4Opacity : 0,
              y: s4Y,
              transition: heroPhase === 'FRAMES' ? "none" : "opacity 0.6s ease-in-out"
            }}
          >
            <div className="shiny-text font-numbers text-4xl font-[700] mb-2">150+</div>
            <div className="text-white/70 text-sm tracking-wide uppercase">Countries Connected</div>
          </motion.div>

          <motion.div
            className="absolute bottom-[10vh] left-[4vw] z-20 pointer-events-none"
            style={{
              opacity: heroPhase === 'FRAMES' ? s4Opacity : 0,
              y: s4Y,
              transition: heroPhase === 'FRAMES' ? "none" : "opacity 0.6s ease-in-out"
            }}
          >
            <div className="shiny-text font-numbers text-4xl font-[700] mb-2">Millions</div>
            <div className="text-white/70 text-sm tracking-wide uppercase">Transactions Enabled</div>
          </motion.div>

          <motion.div
            className="absolute bottom-[15vh] right-[4vw] z-20 text-right pointer-events-none"
            style={{
              opacity: heroPhase === 'FRAMES' ? s4Opacity : 0,
              y: s4Y,
              transition: heroPhase === 'FRAMES' ? "none" : "opacity 0.6s ease-in-out"
            }}
          >
            <div className="shiny-text font-numbers text-4xl font-[700] mb-2">24/7</div>
            <div className="text-white/70 text-sm tracking-wide uppercase">Always Active</div>
          </motion.div>

        {/* SECTION 05 - Independent Overlay */}
        {(heroPhase === 'SECTION5' || heroPhase === 'NORMAL_PAGE') && (
          <motion.div
            className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="w-full h-full relative pointer-events-none"
            >
              {/* Headline Layer */}
              <div className="absolute inset-0 w-full h-full z-30 pointer-events-none">
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
                {/* Left Side Icon 1: icon1.webp */}
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
                    src="/icon1.webp"
                    alt="Icon 1"
                    className="object-contain w-full h-full"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }}
                  />
                </motion.div>

                {/* Left Side Icon 3: icon3.webp */}
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
                    src="/icon3.webp"
                    alt="Icon 3"
                    className="object-contain w-full h-full"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }}
                  />
                </motion.div>

                {/* Left Side Icon 2: icon2.webp */}
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
                    src="/icon2.webp"
                    alt="Icon 2"
                    className="object-contain w-full h-full"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }}
                  />
                </motion.div>

                {/* Right Side Icon 2 Duplicate: icon2.webp */}
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
                    src="/icon2.webp"
                    alt="Icon 2 Duplicate"
                    className="object-contain w-full h-full"
                    style={{ filter: 'drop-shadow(0 0 12px rgba(0, 230, 167, 0.28))' }}
                  />
                </motion.div>

                {/* Right Side Icon 1 Duplicate: icon1.webp */}
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
                    src="/icon1.webp"
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
          </motion.div>
        )}

        </motion.div>

        {/* DUMMY SCROLL TRACK for the 3D Animation */}
        {/* Collapses once the video ends to give a 20vh gap before the About section starts entering */}
        <div 
          id="home" 
          ref={scrollTrackRef} 
          className="relative z-0 pointer-events-none"
          style={{
            height: (heroPhase === 'SECTION5' || heroPhase === 'NORMAL_PAGE') 
              ? `${section5ScrollTop + 1.2 * window.innerHeight}px` 
              : '1440vh'
          }}
        ></div>


        {/* SECTION 06 & 07 (Combined container in normal website flow) */}
        <div className="relative z-20 w-full bg-black pointer-events-auto">
          {/* About Section Group */}
          <div id="about" className="w-full">
            <FinPaySettlementsSection />
            <WhyChooseUsSection />
          </div>

          {/* Services Section Group */}
          <div id="services" className="w-full">
            <FinPayExchangeServicesSection />
            <FinPayCollectionSettlementSection />
            <FinPayMultiCurrencyExchangeSection />
          </div>

          {/* Solutions Section Group */}
          <div id="solutions" className="w-full">
            <FinPayBusinessSolutionsSection />
            <FinPayOperationalSupportSection />
            <FinPayContactSection />
            <GlobalPaymentsMap />
          </div>

          {/* FAQ Section Group */}
          <div id="faq" className="w-full">
            <FAQSection />
          </div>

          <Footer />
        </div>
      </div>
      {/* Hidden preloaded videos for scroll animation */}
      <video
        ref={videoForRef}
        src="/globescrollfor.mp4"
        muted
        playsInline
        preload="auto"
        style={{ display: 'none' }}
      />
      <video
        ref={videoRevRef}
        src="/globescrollrev.mp4"
        muted
        playsInline
        preload="auto"
        style={{ display: 'none' }}
      />
    </>
  );
}


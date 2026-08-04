import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

import ScrollSection1 from './ScrollSection1';
import ScrollSection4 from './ScrollSection4';
import ScrollSection5 from './ScrollSection5';
import LoadingScreen from './LoadingScreen';

gsap.registerPlugin(ScrollTrigger, Observer);

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const TOTAL_FRAMES = 202;

/** Section target frames: Section 1 = 0, Section 4 = 78 (79th frame), Section 5 = 201 */
const SECTION_FRAMES = [0, 78, 201];

/** URL for frame N (1-based, zero-padded to 4 digits) */
const frameSrc = (n: number) =>
  `/frames/frame_${String(n).padStart(4, '0')}.webp`;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ScrollVideoScene() {
  const trackRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sec1Ref   = useRef<HTMLDivElement>(null);
  const sec4Ref   = useRef<HTMLDivElement>(null);
  const sec5Ref   = useRef<HTMLDivElement>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded]       = useState(false);

  // Preloaded HTMLImageElement array
  const imageCache = useRef<HTMLImageElement[]>([]);

  // ── 1. Preload 202 frames ────────────────────────────────────────────────
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const loadAllFrames = async () => {
      const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            if (!isCancelled) {
              images[i] = img;
              loadedCount++;
              setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
            }
            resolve();
          };
          img.onerror = () => {
            if (!isCancelled) {
              images[i] = img;
              loadedCount++;
              setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
            }
            resolve();
          };
          img.src = frameSrc(i + 1);
        });
      });

      await Promise.all(promises);

      if (!isCancelled) {
        imageCache.current = images;
        setIsLoaded(true);
      }
    };

    loadAllFrames();

    return () => {
      isCancelled = true;
    };
  }, []);

  // ── 2. Canvas Render Function (Retina + object-cover math) ───────────────
  const renderFrame = (index: number) => {
    const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(index)));
    const img = imageCache.current[frameIdx];
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const targetWidth = window.innerWidth;
    const targetHeight = window.innerHeight;

    if (canvas.width !== targetWidth * dpr || canvas.height !== targetHeight * dpr) {
      canvas.width = targetWidth * dpr;
      canvas.height = targetHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, targetWidth, targetHeight);

    const imgWidth = img.naturalWidth || targetWidth;
    const imgHeight = img.naturalHeight || targetHeight;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = targetWidth / targetHeight;
    let drawWidth = targetWidth;
    let drawHeight = targetHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = targetWidth / imgRatio;
      offsetY = (targetHeight - drawHeight) / 2;
    } else {
      drawWidth = targetHeight * imgRatio;
      offsetX = (targetWidth - drawWidth) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  };

  // ── 3. Observer Controlled Section Video Playback ────────────────────────
  useEffect(() => {
    if (!isLoaded || !trackRef.current) return;

    renderFrame(0);
    document.documentElement.dataset.heroSection = '0';
    window.dispatchEvent(new CustomEvent('heroSectionChange', { detail: { index: 0 } }));

    const frameObj = { frame: 0 };
    let currentIndex = 0;
    let isAnimating = false;
    let cooldownUntil = 0;

    gsap.set(sec1Ref.current, { autoAlpha: 1, y: 0 });
    gsap.set([sec4Ref.current, sec5Ref.current], { autoAlpha: 0, y: 20 });

    const gotoSection = (index: number) => {
      if (isAnimating || Date.now() < cooldownUntil || index < 0 || index >= SECTION_FRAMES.length) return;
      isAnimating = true;

      document.documentElement.dataset.heroSection = String(index);
      window.dispatchEvent(new CustomEvent('heroSectionChange', { detail: { index } }));

      const targetFrame = SECTION_FRAMES[index];
      const frameDistance = Math.abs(targetFrame - frameObj.frame);
      const isPass1 = (index === 0 && currentIndex <= 1) || (index === 1 && currentIndex === 0);
      const perFrameTime = isPass1 ? 0.020 : 0.017;
      const stepDuration = Math.max(0.5, frameDistance * perFrameTime);

      // Calculate sequential text fade durations:
      const fadeOutDuration = 0.4;
      const fadeInDelay = 0.45;
      const fadeInDuration = Math.max(0.4, stepDuration - fadeInDelay);

      // 1. Play frame sequence at constant linear speed (zero slowdown at ending)
      gsap.to(frameObj, {
        frame: targetFrame,
        duration: stepDuration,
        ease: 'none',
        onUpdate: () => renderFrame(frameObj.frame),
        onComplete: () => {
          currentIndex = index;
          isAnimating = false;
          // Set 500ms cooldown buffer to swallow leftover wheel/trackpad inertia momentum
          cooldownUntil = Date.now() + 500;
        },
      });

      // 2. Sequential Section Text Fades
      if (index === 0) {
        gsap.to([sec4Ref.current, sec5Ref.current], {
          autoAlpha: 0,
          y: -20,
          duration: fadeOutDuration,
          ease: 'power2.in',
        });
        gsap.to(sec1Ref.current, {
          autoAlpha: 1,
          y: 0,
          duration: fadeInDuration,
          delay: fadeInDelay,
          ease: 'power2.out',
        });
      } else if (index === 1) {
        gsap.to([sec1Ref.current, sec5Ref.current], {
          autoAlpha: 0,
          y: -20,
          duration: fadeOutDuration,
          ease: 'power2.in',
        });
        gsap.to(sec4Ref.current, {
          autoAlpha: 1,
          y: 0,
          duration: fadeInDuration,
          delay: fadeInDelay,
          ease: 'power2.out',
        });
      } else if (index === 2) {
        gsap.to([sec1Ref.current, sec4Ref.current], {
          autoAlpha: 0,
          y: -20,
          duration: fadeOutDuration,
          ease: 'power2.in',
        });
        gsap.to(sec5Ref.current, {
          autoAlpha: 1,
          y: 0,
          duration: fadeInDuration,
          delay: fadeInDelay,
          ease: 'power2.out',
        });
      }
    };

    // ── Native Wheel Event Listener (Passive: false to prevent page scrub) ─
    const handleWheel = (e: WheelEvent) => {
      // Only intercept when at top of page in hero sequence
      if (window.scrollY > 5) return;

      if (e.deltaY > 0) {
        // Scrolling DOWN
        if (currentIndex < SECTION_FRAMES.length - 1) {
          e.preventDefault();
          if (!isAnimating && Date.now() >= cooldownUntil) {
            gotoSection(currentIndex + 1);
          }
        }
        // At Section 5 (currentIndex === 2), let default scroll proceed down to rest of page
      } else if (e.deltaY < 0) {
        // Scrolling UP
        if (currentIndex > 0) {
          e.preventDefault();
          if (!isAnimating && Date.now() >= cooldownUntil) {
            gotoSection(currentIndex - 1);
          }
        } else {
          // At Section 1 (currentIndex === 0) and scrolling UP: stay on Section 1!
          e.preventDefault();
        }
      }
    };

    // ── Touch Gesture Listeners (Mobile / Trackpad Swipe) ──────────────────
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY > 5) return;
      if (!touchStartY || e.touches.length === 0) return;

      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) < 30) return; // 30px swipe threshold

      if (deltaY > 0) {
        // Swiping UP -> Scroll DOWN action
        if (currentIndex < SECTION_FRAMES.length - 1) {
          if (e.cancelable) e.preventDefault();
          if (!isAnimating && Date.now() >= cooldownUntil) {
            touchStartY = touchEndY;
            gotoSection(currentIndex + 1);
          }
        }
      } else if (deltaY < 0) {
        // Swiping DOWN -> Scroll UP action
        if (currentIndex > 0) {
          if (e.cancelable) e.preventDefault();
          if (!isAnimating && Date.now() >= cooldownUntil) {
            touchStartY = touchEndY;
            gotoSection(currentIndex - 1);
          }
        } else {
          if (e.cancelable) e.preventDefault();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    const handleResize = () => renderFrame(frameObj.frame);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded]);

  return (
    <>
      <LoadingScreen progress={loadProgress} isComplete={isLoaded} />

      <div ref={trackRef} className="relative w-full h-screen overflow-hidden bg-black">

        {/* ── Frame Canvas (Full Viewport, High-DPI) ────────────────────── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block opacity-[0.88] z-0"
        />

        {/* ── Vignette Gradients ─────────────────────────────────────────── */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.52) 100%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.65) 100%)',
          }}
        />

        {/* ── Section Overlays ───────────────────────────────────────────── */}
        <div
          ref={sec1Ref}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        >
          <ScrollSection1 />
        </div>

        {/* Note: Section 2 & Section 3 files are preserved in repo for future use */}

        <div
          ref={sec4Ref}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        >
          <ScrollSection4 />
        </div>

        <div
          ref={sec5Ref}
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        >
          <ScrollSection5 />
        </div>

      </div>
    </>
  );
}

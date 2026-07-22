import { useEffect, useRef, useState } from 'react';
import ScrollSection1 from './ScrollSection1';
import ScrollSection2 from './ScrollSection2';
import ScrollSection3 from './ScrollSection3';
import ScrollSection4 from './ScrollSection4';
import ScrollSection5 from './ScrollSection5';
import LoadingScreen from './LoadingScreen';

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────

/** Total frames extracted: 8.13s × 24fps = 202 */
const TOTAL_FRAMES  = 202;

/** Determine initial preload count based on screen width: 100 for desktop, 60 for mobile */
const getPreloadCount = () => (window.innerWidth >= 768 ? 100 : 60);

/** URL for frame N (1-based, zero-padded to 4 digits) */
const frameSrc = (n: number) =>
  `/frames/frame_${String(n).padStart(4, '0')}.jpg`;

/**
 * Scroll-progress ranges [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd] over [0..1].
 * Each section fades out COMPLETELY to 0 opacity before the next section begins fading in.
 */
const SECTION_PHASES: [number, number, number, number][] = [
  [-0.05, -0.01,  0.14,  0.18], // Section 1 (starts visible, fades out 0.14->0.18)
  [ 0.18,  0.22,  0.34,  0.38], // Section 2 (fades in 0.18->0.22, fades out 0.34->0.38)
  [ 0.38,  0.42,  0.54,  0.58], // Section 3 (fades in 0.38->0.42, fades out 0.54->0.58)
  [ 0.58,  0.62,  0.74,  0.78], // Section 4 (fades in 0.58->0.62, fades out 0.74->0.78)
  [ 0.78,  0.82,  1.02,  1.05], // Section 5 (fades in 0.78->0.82, stays visible to end)
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ScrollVideoScene() {
  const trackRef    = useRef<HTMLDivElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null, null]);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded]         = useState(false);

  // Frame cache — indexed 0..(TOTAL_FRAMES-1)
  const frames  = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loaded  = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const drawnAt = useRef<number>(-1); // last frame index drawn to canvas

  useEffect(() => {
    const canvas = canvasRef.current;
    const track  = trackRef.current;
    if (!canvas || !track) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Canvas sizing (object-cover draw) ─────────────────────────────────
    function resize() {
      canvas!.width  = window.innerWidth;
      canvas!.height = window.innerHeight;
      if (drawnAt.current >= 0) drawFrame(drawnAt.current);
    }
    resize();
    window.addEventListener('resize', resize);

    // ── Draw a single frame (0-indexed) ───────────────────────────────────
    function drawFrame(idx: number) {
      const img = frames.current[idx];
      if (!img || !loaded.current[idx]) return;

      const cw = canvas!.width;
      const ch = canvas!.height;
      const iw = img.naturalWidth  || cw;
      const ih = img.naturalHeight || ch;

      // Replicate CSS object-cover
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx!.drawImage(img, dx, dy, dw, dh);
      drawnAt.current = idx;
    }

    // ── Load a single frame (0-indexed) ───────────────────────────────────
    function loadFrame(idx: number): Promise<void> {
      return new Promise((resolve) => {
        if (loaded.current[idx]) { resolve(); return; }
        const img = new Image();
        img.onload = () => {
          frames.current[idx] = img;
          loaded.current[idx] = true;
          resolve();
        };
        img.onerror = () => resolve();
        img.src = frameSrc(idx + 1); // file names are 1-based
      });
    }

    // ── Two-phase preload ──────────────────────────────────────────────────
    async function preload() {
      const preloadCount = getPreloadCount();
      const firstBatch = Math.min(preloadCount, TOTAL_FRAMES);
      let loadedCount = 0;

      await Promise.all(
        Array.from({ length: firstBatch }, (_, i) =>
          loadFrame(i).then(() => {
            loadedCount++;
            setLoadProgress(Math.floor((loadedCount / firstBatch) * 100));
          })
        )
      );
      drawFrame(0); // first paint — show frame 1
      setIsLoaded(true);

      // Background: sequential load to avoid bandwidth spikes
      for (let i = firstBatch; i < TOTAL_FRAMES; i++) {
        await loadFrame(i);
      }
    }
    preload();

    // ── RAF loop ──────────────────────────────────────────────────────────
    let rafId: number;

    function tick() {
      const rect     = track!.getBoundingClientRect();
      const trackH   = rect.height - window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / trackH));

      // Map [0..1] → [0..TOTAL_FRAMES-1]
      const targetIdx = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(progress * TOTAL_FRAMES)
      );

      if (targetIdx !== drawnAt.current) {
        if (loaded.current[targetIdx]) {
          drawFrame(targetIdx);
        } else {
          // Fall back to nearest already-loaded frame
          for (let i = targetIdx - 1; i >= 0; i--) {
            if (loaded.current[i]) { drawFrame(i); break; }
          }
        }
      }

      // ── Section overlays ────────────────────────────────────────────────
      overlayRefs.current.forEach((el, i) => {
        if (!el) return;
        const [inStart, inEnd, outStart, outEnd] = SECTION_PHASES[i];
        let opacity = 0;

        if (progress >= inStart && progress <= outEnd) {
          if (progress < inEnd) {
            opacity = Math.max(0, Math.min(1, (progress - inStart) / (inEnd - inStart)));
          } else if (progress <= outStart) {
            opacity = 1;
          } else {
            opacity = Math.max(0, Math.min(1, (outEnd - progress) / (outEnd - outStart)));
          }
        }

        el.style.opacity = String(opacity);
      });

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <LoadingScreen progress={loadProgress} isComplete={isLoaded} />

      <div ref={trackRef} style={{ height: '600vh', position: 'relative' }}>

        {/* Sticky Viewport */}
        <div
          style={{
            position : 'sticky',
            top      : 0,
            width    : '100%',
            height   : '100vh',
            overflow : 'hidden',
            background: '#000',
          }}
        >
          {/* ── Frame Canvas ──────────────────────────────────────────────── */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset   : 0,
              opacity : 0.88,
              display : 'block',
            }}
          />

          {/* ── Vignette ──────────────────────────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.52) 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.65) 100%)',
            }}
          />

          {/* ── Section Overlays ──────────────────────────────────────────── */}
          <div ref={(el) => { overlayRefs.current[0] = el; }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}>
            <ScrollSection1 />
          </div>

          <div ref={(el) => { overlayRefs.current[1] = el; }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}>
            <ScrollSection2 />
          </div>

          <div ref={(el) => { overlayRefs.current[2] = el; }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}>
            <ScrollSection3 />
          </div>

          <div ref={(el) => { overlayRefs.current[3] = el; }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}>
            <ScrollSection4 />
          </div>

          <div ref={(el) => { overlayRefs.current[4] = el; }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }}>
            <ScrollSection5 />
          </div>

        </div>
      </div>
    </>
  );
}


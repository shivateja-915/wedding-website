"use client";
import { useEffect, useRef } from "react";

const TOTAL_FRAMES = 137;
const FRAME_PATH = (n: number) =>
  `/frames/ezgif-frame-${String(n).padStart(3, "0")}.jpg`;

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cloud = cloudRef.current;
    const content = contentRef.current;
    const scrollHint = scrollHintRef.current;
    const spacer = spacerRef.current;
    if (!canvas || !cloud || !content || !scrollHint || !spacer) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frames: HTMLImageElement[] = [];
    let currentFrameIndex = 0;
    let targetFrameIndex = 0;
    let raf: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const idx = Math.round(currentFrameIndex);
      if (frames[idx]?.complete) drawFrame(frames[idx]);
    };

    const drawFrame = (img: HTMLImageElement) => {
      if (!img?.complete) return;
      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      if (!iw || !ih) return;
      const scale = Math.max(cw / iw, ch / ih);
      const sw = iw * scale, sh = ih * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - sw) / 2, (ch - sh) / 2, sw, sh);
    };

    const smoothFrameUpdate = () => {
      if (Math.abs(currentFrameIndex - targetFrameIndex) > 0.3) {
        currentFrameIndex += (targetFrameIndex - currentFrameIndex) * 0.18;
        const idx = Math.round(currentFrameIndex);
        if (frames[idx]?.complete) drawFrame(frames[idx]);
      }
      raf = requestAnimationFrame(smoothFrameUpdate);
    };

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = FRAME_PATH(1);
    firstImg.onload = () => {
      frames[0] = firstImg;
      resizeCanvas();
      drawFrame(firstImg);
      smoothFrameUpdate();
    };
    frames[0] = firstImg;

    // Load remaining frames
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      frames[i - 1] = img;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const updateHeroScroll = () => {
      if (!spacer) return;
      const spacerTop = spacer.getBoundingClientRect().top + window.scrollY;
      const spacerHeight = spacer.offsetHeight;
      const scrolled = window.scrollY - spacerTop + window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / spacerHeight));

      targetFrameIndex = Math.min(
        Math.round(Math.min(progress * 1.18, 1) * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      // Cloud fades in at 80–100% of hero scroll
      const cloudP = Math.max(0, (progress - 0.8) / 0.2);
      cloud.style.opacity = String(cloudP);

      // Hero text fades and lifts
      const fade = Math.max(0, 1 - progress * 3);
      content.style.opacity = String(fade);
      content.style.transform = `translate(-50%, calc(-50% + ${progress * -40}px))`;
      scrollHint.style.opacity = String(Math.max(0, 1 - progress * 10));
    };

    window.addEventListener("scroll", updateHeroScroll, { passive: true });
    updateHeroScroll();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", updateHeroScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleScrollClick = () => {
    const gallery = document.querySelector("#gallery");
    if (gallery) {
      const top = gallery.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Sticky Hero */}
      <section
        id="hero"
        className="hero-section"
        aria-label="Hero section"
      >
        {/* Frame animation canvas */}
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

        {/* Dark vignette overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Cloud overlay */}
        <div
          ref={cloudRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            opacity: 0,
            pointerEvents: "none",
            transition: "opacity 0.5s ease",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cloud-overlay.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              mixBlendMode: "screen",
              opacity: 0.8,
            }}
          />
        </div>

        {/* Hero Content */}
        <div
          ref={contentRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 5,
            width: "90%",
            maxWidth: "900px",
          }}
        >
          {/* Tagline */}
          <div
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.7rem",
              fontWeight: 300,
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "1.5rem",
              opacity: 0,
              animation: "fadeInUp 1.2s ease 0.5s forwards",
            }}
          >
            Wedding Photography
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text-primary)",
              marginBottom: "1.5rem",
              opacity: 0,
              animation: "fadeInUp 1.2s ease 0.8s forwards",
              textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            }}
          >
            Every love story
            <br />
            <em style={{ color: "var(--gold-light)", fontStyle: "italic" }}>
              deserves to be timeless
            </em>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              fontWeight: 300,
              color: "var(--text-secondary)",
              maxWidth: "560px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
              opacity: 0,
              animation: "fadeInUp 1.2s ease 1.1s forwards",
            }}
          >
            Capturing the moments that matter most — with cinematic beauty and heartfelt emotion.
          </p>

          {/* Single CTA — View Portfolio */}
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              opacity: 0,
              animation: "fadeInUp 1.2s ease 1.4s forwards",
            }}
          >
            <a
              href="#gallery"
              className="btn-gold"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#gallery");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              data-cursor-hover
            >
              <span>View Portfolio</span>
            </a>
          </div>

          {/* Gold ornament line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              marginTop: "2.5rem",
              opacity: 0,
              animation: "fadeInUp 1.2s ease 1.7s forwards",
            }}
          >
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, var(--gold))" }} />
            <div style={{ width: "6px", height: "6px", background: "var(--gold)", transform: "rotate(45deg)" }} />
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, var(--gold), transparent)" }} />
          </div>
        </div>

        {/* Scroll Hint */}
        <div
          ref={scrollHintRef}
          onClick={handleScrollClick}
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
            zIndex: 5,
            opacity: 0,
            animation: "fadeInUp 1s ease 2s forwards",
            cursor: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Scroll to explore
          </span>
          <div className="scroll-line">
            <div className="scroll-line-inner" />
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* Scroll spacer */}
      <div ref={spacerRef} className="hero-spacer" />
    </>
  );
}

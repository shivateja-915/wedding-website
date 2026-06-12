"use client";
import { useEffect, useRef } from "react";

const chapters = [
  {
    number: "01",
    title: "Engagement",
    subtitle: "The Beginning",
    description:
      "When two hearts choose each other. A quiet moment, a whispered yes, a promise that changes everything — captured in the golden light of a new beginning.",
    img: "/gallery/prewedding-1.png",
    accent: "rgba(201,168,76,0.6)",
  },
  {
    number: "02",
    title: "Pre-Wedding",
    subtitle: "The Journey",
    description:
      "Every stolen glance, every laughter shared before the grand day. Pre-wedding stories unfold in the most breathtaking locations, telling the story of who you are together.",
    img: "/gallery/prewedding-2.png",
    accent: "rgba(201,168,76,0.5)",
  },
  {
    number: "03",
    title: "Wedding Day",
    subtitle: "The Vow",
    description:
      "The moment time stands still. With family, flowers, and trembling hands — the day you become one. Every ritual, every tear, every joyful smile — preserved forever.",
    img: "/gallery/ceremony-1.png",
    accent: "rgba(201,168,76,0.6)",
  },
  {
    number: "04",
    title: "Reception",
    subtitle: "The Celebration",
    description:
      "When the world comes to celebrate your love. Dancing lights, joyful embraces, the first dance as one — the reception is where memories are made to last a lifetime.",
    img: "/gallery/reception-1.png",
    accent: "rgba(201,168,76,0.5)",
  },
];

export default function StoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const SCROLL_MULTIPLIER = 3;
    let horizX = 0;
    let targetX = 0;
    let raf: number;

    const update = () => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollIn = window.scrollY - sectionTop;
      if (scrollIn < 0) return;

      const maxShift = track.scrollWidth - window.innerWidth + 160;
      const totalScroll = window.innerWidth * SCROLL_MULTIPLIER;
      const progress = Math.max(0, Math.min(1, scrollIn / totalScroll));
      targetX = -(progress * maxShift);

      // Fade in header on approach
      if (titleRef.current) {
        const opacity = Math.min(1, scrollIn / 200);
        titleRef.current.style.opacity = String(opacity);
        titleRef.current.style.transform = `translateY(${Math.max(0, 30 - scrollIn * 0.2)}px)`;
      }
    };

    const animate = () => {
      horizX += (targetX - horizX) * 0.06;
      track.style.transform = `translateX(${horizX}px)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--dark-3)",
      }}
      aria-label="Wedding story timeline"
    >
      <div style={{ height: "calc(100vh + 300vw)", position: "relative" }}>
      {/* Sticky container */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Header */}
        <div
          ref={titleRef}
          style={{
            textAlign: "center",
            paddingTop: "2rem",
            marginBottom: "3rem",
            opacity: 0,
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="section-label">Our Journey</div>
          <h2 className="section-title">
            The Wedding <em>Story</em>
          </h2>
          <div className="gold-divider" style={{ marginTop: "1rem" }} />
        </div>

        {/* Horizontal Track */}
        <div style={{ overflow: "hidden", position: "relative" }}>
          {/* Connecting gold line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "200px",
              right: "200px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, var(--gold), var(--gold), transparent)",
              opacity: 0.3,
              transform: "translateY(-50%)",
              zIndex: 0,
            }}
          />

          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: "3rem",
              padding: "0 8rem",
              willChange: "transform",
            }}
          >
            {chapters.map((ch, i) => (
              <div
                key={ch.number}
                style={{
                  flex: "0 0 420px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  position: "relative",
                }}
              >
                {/* Chapter number + dot */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      background: "var(--gold)",
                      borderRadius: "50%",
                      boxShadow: "0 0 20px var(--gold-glow)",
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 2,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "0.75rem",
                      letterSpacing: "0.3em",
                      color: "var(--gold)",
                      textTransform: "uppercase",
                    }}
                  >
                    Chapter {ch.number}
                  </span>
                </div>

                {/* Image */}
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "2px",
                    border: "1px solid rgba(201,168,76,0.2)",
                    boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${ch.accent}`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ch.img}
                    alt={ch.title}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "240px",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.8s ease",
                    }}
                  />
                  {/* Gradient overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                    }}
                  />
                  {/* Big chapter number */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      right: "1.5rem",
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "5rem",
                      fontWeight: 700,
                      color: "rgba(201,168,76,0.15)",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {ch.number}
                  </div>
                </div>

                {/* Text */}
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "0.65rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {ch.subtitle}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.75rem",
                      fontStyle: "italic",
                      color: "var(--text-primary)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {ch.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1.05rem",
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "var(--text-secondary)",
                    }}
                  >
                    {ch.description}
                  </p>
                </div>

                {/* Gold separator (not on last) */}
                {i < chapters.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      right: "-1.5rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, transparent, var(--gold))" }} />
                    <div style={{ width: "6px", height: "6px", background: "var(--gold)", transform: "rotate(45deg)", opacity: 0.6 }} />
                    <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll progress indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div style={{ width: "1px", height: "30px", background: "rgba(201,168,76,0.3)" }} />
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Scroll to explore
          </span>
          <div style={{ width: "1px", height: "30px", background: "rgba(201,168,76,0.3)" }} />
        </div>
      </div>
    </section>
  );
}

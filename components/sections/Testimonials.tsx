"use client";
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "Eternal Frames didn't just photograph our wedding — they captured our souls. Every single image tells the story of our love better than words ever could.",
    couple: "Arjun & Priya",
    location: "Hyderabad",
    stars: 5,
  },
  {
    quote:
      "We cried watching our wedding film. The way they saw our day — the quiet moments, the stolen glances — it's like they captured the very heartbeat of our wedding.",
    couple: "Rohan & Meera",
    location: "Bangalore",
    stars: 5,
  },
  {
    quote:
      "Worth every rupee and then some. The photographs are so cinematic and beautiful that our family couldn't stop asking who shot them. Pure artistry.",
    couple: "Karan & Ananya",
    location: "Mumbai",
    stars: 5,
  },
  {
    quote:
      "They have an extraordinary gift for capturing emotion. Our album is a treasure we'll pass down through generations. Nothing short of breathtaking.",
    couple: "Dev & Simran",
    location: "Delhi",
    stars: 5,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsTransitioning(false);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Generate floating particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        bottom: -10px;
        animation-duration: ${Math.random() * 8 + 6}s;
        animation-delay: ${Math.random() * 5}s;
        opacity: ${Math.random() * 0.5 + 0.3};
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: ${Math.random() > 0.5 ? "var(--gold)" : "var(--gold-light)"};
      `;
      container.appendChild(p);
    }
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--dark-3)",
        padding: "8rem 4rem",
        overflow: "hidden",
      }}
      aria-label="Testimonials"
    >
      {/* Particle background */}
      <div
        ref={particlesRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
      />

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <div className="section-label">Love Stories</div>
          <h2 className="section-title">
            Words from Our <em>Couples</em>
          </h2>
          <div className="gold-divider" style={{ marginTop: "1.5rem" }} />
        </div>

        {/* Large quote */}
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: "4px",
            position: "relative",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "translateY(10px)" : "translateY(0)",
          }}
        >
          {/* Quote mark */}
          <div
            style={{
              position: "absolute",
              top: "-1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "var(--font-playfair), serif",
              fontSize: "6rem",
              color: "var(--gold)",
              opacity: 0.3,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            "
          </div>

          {/* Stars */}
          <div style={{ marginBottom: "1.5rem" }}>
            {"★".repeat(testimonials[activeIndex].stars)
              .split("")
              .map((s, i) => (
                <span key={i} style={{ color: "var(--gold)", fontSize: "1.2rem" }}>
                  {s}
                </span>
              ))}
          </div>

          {/* Quote text */}
          <p className="testimonial-quote" style={{ marginBottom: "2rem" }}>
            {testimonials[activeIndex].quote}
          </p>

          {/* Gold divider */}
          <div className="gold-divider" style={{ marginBottom: "1.5rem" }} />

          {/* Couple name */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "1.2rem",
                fontStyle: "italic",
                color: "var(--gold-light)",
                marginBottom: "0.3rem",
              }}
            >
              {testimonials[activeIndex].couple}
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              📍 {testimonials[activeIndex].location}
            </p>
          </div>
        </div>

        {/* Navigation dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.75rem",
            marginTop: "2.5rem",
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setActiveIndex(i);
                  setIsTransitioning(false);
                }, 400);
              }}
              data-cursor-hover
              style={{
                width: i === activeIndex ? "32px" : "8px",
                height: "8px",
                borderRadius: i === activeIndex ? "4px" : "50%",
                background: i === activeIndex ? "var(--gold)" : "rgba(201,168,76,0.3)",
                border: "none",
                cursor: "none",
                transition: "all 0.3s ease",
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Floating mini cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
            marginTop: "3rem",
          }}
        >
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setActiveIndex(i);
                  setIsTransitioning(false);
                }, 400);
              }}
              data-cursor-hover
              style={{
                padding: "1rem",
                background:
                  i === activeIndex
                    ? "rgba(201,168,76,0.08)"
                    : "rgba(255,255,255,0.02)",
                border: `1px solid ${i === activeIndex ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.1)"}`,
                textAlign: "left",
                cursor: "none",
                transition: "all 0.3s ease",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "0.9rem",
                  fontStyle: "italic",
                  color: i === activeIndex ? "var(--gold-light)" : "var(--text-secondary)",
                  marginBottom: "0.5rem",
                }}
              >
                {t.couple}
              </p>
              <p
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {t.location}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

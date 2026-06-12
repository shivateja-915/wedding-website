"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { target: 250, suffix: "+", label: "Weddings", icon: "💍" },
  { target: 8, suffix: "", label: "Years", icon: "⏳" },
  { target: 15, suffix: "+", label: "Cities", icon: "🏙️" },
  { target: 99, suffix: "%", label: "Happy Couples", icon: "💑" },
];

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          setAnimated(true);
          stats.forEach((stat, i) => {
            const duration = 2000;
            const start = performance.now();
            const animate = (now: number) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCounts((prev) => {
                const next = [...prev];
                next[i] = Math.round(eased * stat.target);
                return next;
              });
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [animated]);

  return (
    <section
      id="statistics"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--dark)",
        padding: "7rem 4rem",
        overflow: "hidden",
      }}
      aria-label="Statistics"
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Gold line top */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4rem" }}>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, var(--gold))" }} />
        <div
          style={{
            width: "10px",
            height: "10px",
            background: "var(--gold)",
            transform: "rotate(45deg)",
            margin: "0 1rem",
            boxShadow: "0 0 20px var(--gold-glow)",
          }}
        />
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, var(--gold), transparent)" }} />
      </div>

      {/* Section label */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <div className="section-label">By The Numbers</div>
        <h2 className="section-title">
          A Legacy of <em>Love Stories</em>
        </h2>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "3rem",
          maxWidth: "1000px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              textAlign: "center",
              position: "relative",
              padding: "2rem 1rem",
            }}
          >
            {/* Icon */}
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{stat.icon}</div>

            {/* Number */}
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "0.25rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  fontWeight: 400,
                  color: "var(--gold)",
                  lineHeight: 1,
                }}
              >
                {counts[i]}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  color: "var(--gold)",
                }}
              >
                {stat.suffix}
              </span>
            </div>

            {/* Label */}
            <div
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginTop: "0.75rem",
              }}
            >
              {stat.label}
            </div>

            {/* Vertical divider (not on last) */}
            {i < stats.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "25%",
                  bottom: "25%",
                  width: "1px",
                  background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Gold line bottom */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "center", marginTop: "4rem" }}>
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, var(--gold))" }} />
        <div
          style={{
            width: "10px",
            height: "10px",
            background: "var(--gold)",
            transform: "rotate(45deg)",
            margin: "0 1rem",
            boxShadow: "0 0 20px var(--gold-glow)",
          }}
        />
        <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, var(--gold), transparent)" }} />
      </div>
    </section>
  );
}

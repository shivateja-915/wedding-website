"use client";
import { useEffect, useRef } from "react";

const services = [
  {
    icon: "🎬",
    title: "Cinematic Films",
    subtitle: "Wedding Films",
    description:
      "Feature-length cinematic wedding films that tell your complete love story. Every frame crafted like a movie, every moment preserved for eternity.",
    features: ["4K Ultra HD", "Drone Footage", "Same-Day Edit"],
  },
  {
    icon: "📷",
    title: "Photography",
    subtitle: "Luxury Photography",
    description:
      "Premium wedding photography that captures raw emotion and timeless beauty. Each image is a masterpiece, each moment a painting.",
    features: ["500+ Edited Images", "Film & Digital", "Heirloom Albums"],
  },
  {
    icon: "🌸",
    title: "Pre-Wedding",
    subtitle: "Engagement Sessions",
    description:
      "Intimate pre-wedding shoots in stunning locations. Tell your love story before the wedding day with elegance and authenticity.",
    features: ["Location Scouting", "Outfit Styling", "Same-Day Preview"],
  },
  {
    icon: "✈️",
    title: "Destination",
    subtitle: "Travel Photography",
    description:
      "Destination weddings across India and beyond. From Rajasthan palaces to Kerala backwaters — your dream, our canvas.",
    features: ["Pan India", "International", "Full Package"],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = cardsRef.current;
            cards.forEach((card, i) => {
              if (card) {
                setTimeout(() => {
                  card.style.opacity = "1";
                  card.style.transform = "translateY(0)";
                }, i * 150);
              }
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -15;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 15;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(0) scale(1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--dark-2)",
        padding: "8rem 4rem",
        overflow: "hidden",
      }}
      aria-label="Services section"
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(201,168,76,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.05) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: "5rem", position: "relative" }}>
        <div className="section-label">What We Offer</div>
        <h2 className="section-title">
          Crafting <em>Memories</em>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "1.1rem",
            fontWeight: 300,
            color: "var(--text-secondary)",
            maxWidth: "500px",
            margin: "1.5rem auto 0",
            lineHeight: 1.7,
          }}
        >
          Every service is designed to capture the full beauty of your love story — from the first glance to the last dance.
        </p>
        <div className="gold-divider" style={{ marginTop: "1.5rem" }} />
      </div>

      {/* Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          maxWidth: "1300px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {services.map((service, i) => (
          <div
            key={service.title}
            ref={(el) => { cardsRef.current[i] = el; }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor-hover
            style={{
              padding: "2.5rem",
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(201,168,76,0.15)",
              borderRadius: "4px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              transformStyle: "preserve-3d",
              opacity: 0,
              transform: "translateY(40px)",
              position: "relative",
              overflow: "hidden",
              cursor: "none",
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
                opacity: 0.5,
              }}
            />

            {/* Icon */}
            <div
              style={{
                fontSize: "2.5rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "64px",
                height: "64px",
                background: "rgba(201,168,76,0.08)",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "4px",
              }}
            >
              {service.icon}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: "0.5rem",
              }}
            >
              {service.subtitle}
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "1.5rem",
                fontStyle: "italic",
                color: "var(--text-primary)",
                marginBottom: "1rem",
              }}
            >
              {service.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "1rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "var(--text-secondary)",
                marginBottom: "1.5rem",
              }}
            >
              {service.description}
            </p>

            {/* Features */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {service.features.map((f) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    letterSpacing: "0.05em",
                  }}
                >
                  <div
                    style={{
                      width: "4px",
                      height: "4px",
                      background: "var(--gold)",
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}
                  />
                  {f}
                </div>
              ))}
            </div>

            {/* Hover glow overlay */}
            <div
              className="service-hover-glow"
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
                opacity: 0,
                transition: "opacity 0.3s ease",
                pointerEvents: "none",
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        div[data-cursor-hover]:hover .service-hover-glow { opacity: 1 !important; }
        div[data-cursor-hover]:hover { box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.3) !important; }
      `}</style>
    </section>
  );
}

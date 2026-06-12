"use client";
import { useEffect, useRef } from "react";

const films = [
  {
    title: "Arjun & Priya",
    subtitle: "A Hyderabad Love Story",
    location: "Hyderabad, India",
    duration: "12 min",
    img: "/gallery/prewedding-1.png",
    category: "Wedding Film",
  },
  {
    title: "Karan & Ananya",
    subtitle: "Palace Romance",
    location: "Udaipur, Rajasthan",
    duration: "18 min",
    img: "/gallery/ceremony-2.png",
    category: "Destination Wedding",
  },
  {
    title: "Dev & Simran",
    subtitle: "Coastal Dreams",
    location: "Goa, India",
    duration: "15 min",
    img: "/gallery/reception-2.png",
    category: "Cinematic Film",
  },
];

export default function FeaturedFilms() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          cardsRef.current.forEach((card, i) => {
            if (card) {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0) scale(1)";
              }, i * 200);
            }
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <section
      id="films"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--dark)",
        padding: "8rem 4rem",
        overflow: "hidden",
      }}
      aria-label="Featured films"
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: "5rem", position: "relative" }}>
        <div className="section-label">Cinematic Works</div>
        <h2 className="section-title">
          Featured <em>Films</em>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "1.1rem",
            fontWeight: 300,
            color: "var(--text-secondary)",
            maxWidth: "480px",
            margin: "1.5rem auto 0",
            lineHeight: 1.7,
          }}
        >
          Love stories told in moving images. Each film is a cinematic journey through one of the most beautiful days of a lifetime.
        </p>
        <div className="gold-divider" style={{ marginTop: "1.5rem" }} />
      </div>

      {/* Film Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2.5rem",
          maxWidth: "1300px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {films.map((film, i) => (
          <div
            key={film.title}
            ref={(el) => { cardsRef.current[i] = el; }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            data-cursor-hover
            style={{
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(201,168,76,0.15)",
              cursor: "none",
              opacity: 0,
              transform: "translateY(40px) scale(0.97)",
              transition: "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease",
              transformStyle: "preserve-3d",
              aspectRatio: "16/10",
            }}
            className="film-card"
          >
            {/* Film image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={film.img}
              alt={film.title}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.8s ease",
              }}
              className="film-img"
            />

            {/* Dark overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
                zIndex: 2,
              }}
            />

            {/* Play button */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 3,
                width: "70px",
                height: "70px",
                border: "2px solid rgba(201,168,76,0.6)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              className="play-btn"
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "12px solid transparent",
                  borderBottom: "12px solid transparent",
                  borderLeft: "20px solid var(--gold)",
                  marginLeft: "4px",
                }}
              />
            </div>

            {/* Category badge */}
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                left: "1.5rem",
                zIndex: 4,
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--gold)",
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(201,168,76,0.3)",
                padding: "0.3rem 0.75rem",
                backdropFilter: "blur(6px)",
              }}
            >
              {film.category}
            </div>

            {/* Duration */}
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                zIndex: 4,
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                color: "var(--text-secondary)",
                background: "rgba(0,0,0,0.6)",
                padding: "0.3rem 0.75rem",
                backdropFilter: "blur(6px)",
              }}
            >
              ▶ {film.duration}
            </div>

            {/* Film info */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "2rem 1.75rem",
                zIndex: 4,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "1.4rem",
                  fontStyle: "italic",
                  color: "var(--gold-light)",
                  marginBottom: "0.3rem",
                }}
              >
                {film.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: "0.95rem",
                  color: "var(--text-secondary)",
                  marginBottom: "0.3rem",
                }}
              >
                {film.subtitle}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                📍 {film.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .film-card:hover .film-img { transform: scale(1.08); }
        .film-card:hover .play-btn {
          border-color: var(--gold) !important;
          background: rgba(201,168,76,0.15) !important;
          box-shadow: 0 0 30px rgba(201,168,76,0.3);
          transform: translate(-50%, -50%) scale(1.15) !important;
        }
        .film-card:hover {
          box-shadow: 0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.3) !important;
        }
        /* Film reel sprocket holes */
        .film-card::before, .film-card::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 20px;
          background: repeating-linear-gradient(
            90deg,
            transparent, transparent 10px,
            rgba(0,0,0,0.8) 10px, rgba(0,0,0,0.8) 14px
          );
          z-index: 5;
        }
        .film-card::before { top: 0; }
        .film-card::after { bottom: 0; }
      `}</style>
    </section>
  );
}

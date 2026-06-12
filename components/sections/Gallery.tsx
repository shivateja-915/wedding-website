"use client";
import { useEffect, useRef, useState } from "react";

const galleryData = [
  { couple: "Arjun & Priya", location: "Hyderabad", category: "pre-wedding", img: "/gallery/prewedding-1.png" },
  { couple: "Rohit & Sneha", location: "Bangalore", category: "pre-wedding", img: "/gallery/prewedding-2.png" },
  { couple: "Karan & Meera", location: "Udaipur", category: "pre-wedding", img: "/gallery/prewedding-3.png" },
  { couple: "Vivek & Ananya", location: "Mumbai", category: "ceremony", img: "/gallery/ceremony-1.png" },
  { couple: "Siddharth & Riya", location: "Hyderabad", category: "ceremony", img: "/gallery/ceremony-2.png" },
  { couple: "Aditya & Kavya", location: "Jaipur", category: "ceremony", img: "/gallery/ceremony-3.png" },
  { couple: "Nikhil & Pooja", location: "Chennai", category: "reception", img: "/gallery/reception-1.png" },
  { couple: "Dev & Ishaan", location: "Goa", category: "reception", img: "/gallery/reception-2.png" },
  { couple: "Raj & Simran", location: "Delhi", category: "reception", img: "/gallery/reception-3.png" },
];

type Category = "pre-wedding" | "ceremony" | "reception";

const categories: { key: Category; label: string }[] = [
  { key: "pre-wedding", label: "Pre-Wedding" },
  { key: "ceremony", label: "Ceremony" },
  { key: "reception", label: "Reception" },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Category>("pre-wedding");
  const [lightbox, setLightbox] = useState<(typeof galleryData)[0] | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Horizontal scroll driven by vertical page scroll
  useEffect(() => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    if (!track || !wrapper || !section) return;

    let galHorizX = 0;
    let galTargetX = 0;
    let raf: number;
    const EXTRA_SCROLL = 1400;

    // Add extra scroll height
    let spacer = section.querySelector(".gallery-spacer") as HTMLDivElement | null;
    if (!spacer) {
      spacer = document.createElement("div");
      spacer.className = "gallery-spacer";
      spacer.style.height = EXTRA_SCROLL + "px";
      spacer.style.pointerEvents = "none";
      section.appendChild(spacer);
    }

    const updateScroll = () => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollInSection = window.scrollY - sectionTop;
      if (scrollInSection < 0) return;

      const trackWidth = track.scrollWidth;
      const viewWidth = wrapper.offsetWidth;
      const maxShift = Math.max(0, trackWidth - viewWidth + 80);
      const progress = Math.max(0, Math.min(1, scrollInSection / EXTRA_SCROLL));
      galTargetX = -(progress * maxShift);
    };

    const animate = () => {
      galHorizX += (galTargetX - galHorizX) * 0.08;
      track.style.transform = `translateX(${galHorizX}px)`;
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      cancelAnimationFrame(raf);
    };
  }, [activeFilter]);

  // 3D tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -12;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 12;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  const filtered = galleryData.filter((d) => d.category === activeFilter);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--dark-2)",
        padding: "7rem 0 0",
        minHeight: "100vh",
        overflow: "hidden",
      }}
      aria-label="Portfolio gallery"
    >
      {/* Section Header */}
      <div ref={headerRef} style={{ textAlign: "center", marginBottom: "3rem", padding: "0 4rem" }}>
        <div className="section-label">Portfolio</div>
        <h2 className="section-title">
          Moments <em>Captured Forever</em>
        </h2>
        <div className="gold-divider" style={{ marginTop: "1.5rem" }} />
      </div>

      {/* Filter Buttons */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          marginBottom: "2.5rem",
          flexWrap: "wrap",
          padding: "0 4rem",
        }}
      >
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            data-cursor-hover
            style={{
              padding: "0.5rem 1.5rem",
              background: activeFilter === key ? "rgba(201,168,76,0.08)" : "transparent",
              border: `1px solid ${activeFilter === key ? "var(--gold)" : "rgba(201,168,76,0.2)"}`,
              color: activeFilter === key ? "var(--gold)" : "var(--text-muted)",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.7rem",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "none",
              transition: "all var(--transition)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Horizontal Scroll Wrapper */}
      <div
        ref={wrapperRef}
        style={{
          position: "sticky",
          top: "180px",
          overflow: "hidden",
          width: "100%",
          paddingLeft: "4rem",
          zIndex: 5,
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "2rem",
            willChange: "transform",
            transition: "none",
          }}
        >
          {filtered.map((item, i) => (
            <div
              key={`${item.couple}-${i}`}
              className="gallery-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setLightbox(item)}
              data-cursor-hover
              style={{
                flex: "0 0 420px",
                height: "560px",
                position: "relative",
                cursor: "none",
                overflow: "hidden",
                border: "1px solid rgba(201,168,76,0.12)",
                borderRadius: "2px",
                transformStyle: "preserve-3d",
                transition: "box-shadow 0.4s ease, transform 0.3s ease",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.img}
                alt={`${item.couple} — ${item.location}`}
                loading={i < 2 ? "eager" : "lazy"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.6s ease",
                  pointerEvents: "none",
                }}
              />

              {/* Category Tag */}
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  background: "rgba(0,0,0,0.6)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  padding: "0.3rem 0.7rem",
                  backdropFilter: "blur(6px)",
                }}
              >
                {item.category.replace("-", " ")}
              </div>

              {/* Hover Overlay */}
              <div
                className="gallery-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%)",
                  opacity: 0,
                  transition: "opacity 0.4s ease",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1.5rem",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1.15rem",
                      fontStyle: "italic",
                      color: "var(--gold-light)",
                      display: "block",
                    }}
                  >
                    {item.couple}
                  </span>
                  <div
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--text-secondary)",
                      marginTop: "0.3rem",
                    }}
                  >
                    📍 {item.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(20px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "none",
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              background: "none",
              border: "1px solid var(--gold)",
              color: "var(--gold)",
              width: "44px",
              height: "44px",
              fontSize: "1.2rem",
              cursor: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
          <div style={{ maxWidth: "80vw", maxHeight: "80vh", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.img}
              alt={lightbox.couple}
              style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain", border: "1px solid rgba(201,168,76,0.3)" }}
            />
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <p style={{ fontFamily: "var(--font-playfair), serif", fontSize: "1.5rem", fontStyle: "italic", color: "var(--gold-light)" }}>
                {lightbox.couple}
              </p>
              <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase", marginTop: "0.5rem" }}>
                {lightbox.location}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-card:hover .gallery-overlay { opacity: 1 !important; }
        .gallery-card:hover img { transform: scale(1.06); }
      `}</style>
    </section>
  );
}

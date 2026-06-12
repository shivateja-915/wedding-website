"use client";
import { useEffect, useRef } from "react";

const contactItems = [
  {
    icon: "📞",
    label: "Call Us",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    id: "contact-phone",
  },
  {
    icon: "📸",
    label: "Instagram",
    value: "@eternalframes.hyd",
    href: "https://instagram.com/eternalframes.hyd",
    id: "contact-instagram",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "hello@eternalframes.com",
    href: "mailto:hello@eternalframes.com",
    id: "contact-email",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  // Generate particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      p.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: var(--gold);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        bottom: -10px;
        opacity: ${Math.random() * 0.4 + 0.1};
        animation: particleFloat ${Math.random() * 10 + 8}s linear infinite;
        animation-delay: ${Math.random() * 6}s;
      `;
      container.appendChild(p);
    }
  }, []);

  // Reveal animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (leftRef.current) {
            leftRef.current.style.opacity = "1";
            leftRef.current.style.transform = "translateX(0)";
          }
          if (rightRef.current) {
            setTimeout(() => {
              if (rightRef.current) {
                rightRef.current.style.opacity = "1";
                rightRef.current.style.transform = "translateX(0)";
              }
            }, 300);
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--dark)",
        padding: "8rem 4rem",
        overflow: "hidden",
        minHeight: "60vh",
      }}
      aria-label="Contact section"
    >
      {/* Particle background */}
      <div
        ref={particlesRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
      />

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
          maxWidth: "1100px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
        className="contact-grid"
      >
        {/* Left — Text */}
        <div
          ref={leftRef}
          style={{
            opacity: 0,
            transform: "translateX(-40px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div className="section-label">Get in Touch</div>
          <h2
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "var(--text-primary)",
              marginBottom: "2rem",
            }}
          >
            "Your story
            <br />
            <em style={{ color: "var(--gold-light)", fontStyle: "italic" }}>begins here"</em>
          </h2>
          <div className="gold-divider-left" />
          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.1rem",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "var(--text-secondary)",
              marginBottom: "2.5rem",
            }}
          >
            Ready to begin the most beautiful chapter of your story? Reach out to us and let's create something extraordinary together.
          </p>

          {/* Gold ornament */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1rem",
              opacity: 0.5,
            }}
          >
            <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
            <div style={{ width: "6px", height: "6px", background: "var(--gold)", transform: "rotate(45deg)" }} />
            <div style={{ width: "40px", height: "1px", background: "var(--gold)" }} />
          </div>
        </div>

        {/* Right — Contact Info */}
        <div
          ref={rightRef}
          style={{
            opacity: 0,
            transform: "translateX(40px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {contactItems.map((item) => (
              <a
                key={item.id}
                id={item.id}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                data-cursor-hover
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  padding: "1.75rem 2rem",
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  cursor: "none",
                  transition: "all var(--transition)",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "2px",
                }}
                className="contact-link-card"
              >
                {/* Icon */}
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    border: "1px solid rgba(201,168,76,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    flexShrink: 0,
                    transition: "all var(--transition)",
                  }}
                  className="contact-icon-box"
                >
                  {item.icon}
                </div>

                {/* Text */}
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1.15rem",
                      fontWeight: 300,
                      color: "var(--text-primary)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {item.value}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div
                  style={{
                    marginLeft: "auto",
                    color: "var(--gold)",
                    fontSize: "1.2rem",
                    opacity: 0.4,
                    transition: "opacity var(--transition), transform var(--transition)",
                  }}
                  className="contact-arrow"
                >
                  →
                </div>

                {/* Hover shimmer */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, transparent, rgba(201,168,76,0.03), transparent)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    pointerEvents: "none",
                  }}
                  className="contact-shimmer"
                />
              </a>
            ))}

            {/* Availability badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                padding: "1rem 1.5rem",
                background: "rgba(201,168,76,0.05)",
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "2px",
                marginTop: "0.5rem",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  background: "#4ade80",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px rgba(74,222,128,0.5)",
                  animation: "pulse 2s ease-in-out infinite",
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.05em",
                }}
              >
                Currently accepting bookings for{" "}
                <span style={{ color: "var(--gold)" }}>2025–2026</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-link-card:hover {
          border-color: rgba(201,168,76,0.4) !important;
          background: rgba(201,168,76,0.04) !important;
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .contact-link-card:hover .contact-icon-box {
          border-color: var(--gold) !important;
          background: rgba(201,168,76,0.08);
        }
        .contact-link-card:hover .contact-arrow {
          opacity: 1 !important;
          transform: translateX(4px);
        }
        .contact-link-card:hover .contact-shimmer {
          opacity: 1 !important;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}

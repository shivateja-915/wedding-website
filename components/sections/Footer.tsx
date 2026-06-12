"use client";
import { useEffect, useRef } from "react";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/eternalframes.hyd", icon: "📸" },
  { label: "Phone", href: "tel:+919876543210", icon: "📞" },
  { label: "Email", href: "mailto:hello@eternalframes.com", icon: "✉️" },
  { label: "YouTube", href: "https://youtube.com", icon: "🎬" },
];

export default function Footer() {
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;

    // Generate stars
    for (let i = 0; i < 80; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const size = Math.random() * 2 + 1;
      star.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        animation-duration: ${Math.random() * 4 + 2}s;
        animation-delay: ${Math.random() * 4}s;
      `;
      container.appendChild(star);
    }
  }, []);

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--dark)",
        borderTop: "1px solid rgba(201,168,76,0.1)",
        overflow: "hidden",
      }}
      aria-label="Footer"
    >
      {/* Stars */}
      <div
        ref={starsRef}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
      />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "5rem 4rem 3rem",
          textAlign: "center",
        }}
      >
        {/* Gold ornament */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          <div style={{ flex: 1, maxWidth: "200px", height: "1px", background: "linear-gradient(90deg, transparent, var(--gold))" }} />
          <div style={{ width: "8px", height: "8px", background: "var(--gold)", transform: "rotate(45deg)", boxShadow: "0 0 15px var(--gold-glow)" }} />
          <div style={{ flex: 1, maxWidth: "200px", height: "1px", background: "linear-gradient(90deg, var(--gold), transparent)" }} />
        </div>

        {/* Logo */}
        <div
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "2.5rem",
            fontWeight: 400,
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
            letterSpacing: "0.05em",
          }}
        >
          Eternal{" "}
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Frames</em>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "var(--text-muted)",
            marginBottom: "2.5rem",
          }}
        >
          Every love story deserves to be timeless
        </p>

        {/* Social Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              data-cursor-hover
              aria-label={link.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.25rem",
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.2)",
                color: "var(--text-muted)",
                textDecoration: "none",
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "none",
                transition: "all var(--transition)",
                borderRadius: "2px",
              }}
              className="footer-social-link"
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        {/* Nav links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          {["Portfolio", "Story", "Services", "About", "Contact"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              data-cursor-hover
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                textDecoration: "none",
                cursor: "none",
                transition: "color var(--transition)",
              }}
              className="footer-nav-link"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: "60px",
            height: "1px",
            background: "var(--gold)",
            margin: "0 auto 2rem",
            opacity: 0.4,
          }}
        />

        {/* Copyright */}
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.7rem",
            fontWeight: 300,
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
          }}
        >
          © {new Date().getFullYear()} Eternal Frames Photography · Hyderabad & Beyond · All Rights Reserved
        </p>
      </div>

      <style>{`
        .footer-social-link:hover {
          border-color: var(--gold) !important;
          color: var(--gold) !important;
          background: rgba(201,168,76,0.06) !important;
          transform: translateY(-2px);
        }
        .footer-nav-link:hover {
          color: var(--gold-light) !important;
        }
      `}</style>
    </footer>
  );
}

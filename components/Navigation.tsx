"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Portfolio", href: "#gallery" },
  { label: "Story", href: "#timeline" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link href="/" className="nav-logo group" style={{ textDecoration: "none", cursor: "none" }}>
        <span
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "1.5rem",
            fontWeight: 400,
            color: "var(--text-primary)",
            letterSpacing: "0.05em",
          }}
        >
          Eternal{" "}
          <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Frames</em>
        </span>
      </Link>

      {/* Desktop Links */}
      <ul
        className="nav-links hidden md:flex"
        style={{ gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 }}
      >
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.8rem",
                fontWeight: 300,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                textDecoration: "none",
                transition: "color var(--transition)",
                position: "relative",
                cursor: "none",
              }}
              className="nav-link-item"
              data-cursor-hover
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        style={{ background: "none", border: "none", cursor: "none", padding: "4px" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: "var(--gold)",
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform:
                menuOpen
                  ? i === 0
                    ? "rotate(45deg) translate(4px, 4px)"
                    : i === 1
                    ? "scaleX(0)"
                    : "rotate(-45deg) translate(4px, -4px)"
                  : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8,8,8,0.97)",
            backdropFilter: "blur(20px)",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              background: "none",
              border: "none",
              color: "var(--gold)",
              fontSize: "1.5rem",
              cursor: "none",
            }}
          >
            ✕
          </button>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: "2rem",
                fontStyle: "italic",
                color: "var(--text-primary)",
                textDecoration: "none",
                letterSpacing: "0.05em",
                cursor: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width var(--transition);
        }
        .nav-link-item:hover {
          color: var(--gold-light) !important;
        }
        .nav-link-item:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}

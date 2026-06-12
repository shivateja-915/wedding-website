"use client";
import { useEffect, useRef } from "react";

const milestones = [
  { year: "2016", event: "Founded Eternal Frames" },
  { year: "2018", event: "100th Wedding Milestone" },
  { year: "2020", event: "Expanded to Destination Weddings" },
  { year: "2022", event: "Featured in Vogue India" },
  { year: "2024", event: "250+ Love Stories Captured" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (textRef.current) {
            textRef.current.style.opacity = "1";
            textRef.current.style.transform = "translateX(0)";
          }
          if (statsRef.current) {
            const items = statsRef.current.querySelectorAll(".milestone-item");
            items.forEach((item, i) => {
              setTimeout(() => {
                (item as HTMLElement).style.opacity = "1";
                (item as HTMLElement).style.transform = "translateX(0)";
              }, i * 200);
            });
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
      id="about"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 10,
        background: "var(--dark-3)",
        padding: "8rem 4rem",
        overflow: "hidden",
      }}
      aria-label="About the photographer"
    >
      {/* Background dot pattern */}
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
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: "6rem",
          alignItems: "center",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
        className="about-grid"
      >
        {/* Left — Photo + Milestones */}
        <div>
          {/* Photo frame */}
          <div
            style={{
              position: "relative",
              aspectRatio: "3/4",
              maxWidth: "380px",
              marginBottom: "3rem",
            }}
          >
            {/* Animated gold border */}
            <div
              style={{
                position: "absolute",
                inset: "-12px",
                border: "1px solid rgba(201,168,76,0.4)",
                pointerEvents: "none",
                animation: "frameFloat 4s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "8px",
                  border: "1px solid rgba(201,168,76,0.15)",
                }}
              />
            </div>

            {/* Photo placeholder with initials */}
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg, var(--dark-4), #1a1a2e)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(201,168,76,0.12)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "6rem",
                  fontStyle: "italic",
                  color: "var(--gold)",
                  opacity: 0.4,
                  lineHeight: 1,
                }}
              >
                EF
              </div>
              <div
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginTop: "1rem",
                }}
              >
                Lead Photographer
              </div>
            </div>
          </div>

          {/* Milestones timeline */}
          <div ref={statsRef}>
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="milestone-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  marginBottom: i < milestones.length - 1 ? "1.25rem" : 0,
                  opacity: 0,
                  transform: "translateX(-20px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      background: "var(--gold)",
                      borderRadius: "50%",
                      boxShadow: "0 0 10px var(--gold-glow)",
                      flexShrink: 0,
                    }}
                  />
                  {i < milestones.length - 1 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        width: "1px",
                        height: "calc(100% + 1.25rem - 10px)",
                        background: "linear-gradient(to bottom, var(--gold), transparent)",
                        opacity: 0.3,
                      }}
                    />
                  )}
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "1rem",
                      color: "var(--gold)",
                      marginRight: "0.75rem",
                    }}
                  >
                    {m.year}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-cormorant), serif",
                      fontSize: "1.05rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {m.event}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Text */}
        <div
          ref={textRef}
          style={{
            opacity: 0,
            transform: "translateX(40px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}
        >
          <div className="section-label">About the Artist</div>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>
            Turning <em>Moments</em>
            <br />
            Into Memories
          </h2>
          <div className="gold-divider-left" />

          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.1rem",
              fontWeight: 300,
              lineHeight: 1.9,
              color: "var(--text-secondary)",
              marginBottom: "1.5rem",
            }}
          >
            I believe every wedding holds a universe of emotion — a stolen glance, an unscripted laugh, a tearful embrace. My lens seeks the quiet poetry in between the grand gestures.
          </p>

          <p
            style={{
              fontFamily: "var(--font-cormorant), serif",
              fontSize: "1.1rem",
              fontWeight: 300,
              lineHeight: 1.9,
              color: "var(--text-secondary)",
              marginBottom: "2.5rem",
            }}
          >
            With over 8 years of experience shooting across Hyderabad and beyond, I bring both technical mastery and a deeply personal touch to every frame I capture. Your story is not just photographed — it is felt.
          </p>

          {/* Signature quote */}
          <div
            style={{
              padding: "1.5rem 2rem",
              borderLeft: "2px solid var(--gold)",
              background: "rgba(201,168,76,0.04)",
              marginBottom: "2.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontSize: "1.2rem",
                fontStyle: "italic",
                color: "var(--gold-light)",
                lineHeight: 1.6,
              }}
            >
              "I don't just take photographs. I preserve the heartbeats between the moments."
            </p>
          </div>

          {/* Quick stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            {[
              { n: "250+", l: "Weddings" },
              { n: "8 Yrs", l: "Experience" },
              { n: "15+", l: "Cities" },
            ].map((s) => (
              <div key={s.l} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: "2rem",
                    color: "var(--gold)",
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginTop: "0.4rem",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes frameFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(4px, -6px) rotate(0.3deg); }
          75% { transform: translate(-4px, 4px) rotate(-0.3deg); }
        }
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
